(function () {
  "use strict";

  var ROOT_ID = "mlp-mini-dashboard";
  var PLOTLY_SOURCES = [
    "https://cdn.plot.ly/plotly-2.35.2.min.js",
    "https://cdn.jsdelivr.net/npm/plotly.js-dist-min@2.35.2/plotly.min.js",
    "https://unpkg.com/plotly.js-dist-min@2.35.2/plotly.min.js",
  ];

  var METRIC_META = {
    civic: {
      label: "Civic space",
      key: "civic",
      colorscale: [
        [0, "#eef6ff"],
        [0.25, "#cbe3ff"],
        [0.5, "#8fc1ff"],
        [0.75, "#4a95ea"],
        [1, "#1f5ea8"],
      ],
      // High-contrast, colorblind-friendly-ish hues; keep red reserved for peak markers.
      lineColors: ["#2563eb", "#0d9488", "#7c3aed"],
      peakColor: "#ef4444",
    },
    rai: {
      label: "RAI",
      key: "rai",
      colorscale: [
        [0, "#fff7ed"],
        [0.25, "#fed7aa"],
        [0.5, "#fdba74"],
        [0.75, "#f97316"],
        [1, "#c2410c"],
      ],
      // Match civic palette for consistency; keep red reserved for peak markers.
      lineColors: ["#2563eb", "#0d9488", "#7c3aed"],
      peakColor: "#b91c1c",
    },
  };

  var state = {
    data: null,
    metric: "civic",
    selected: ["", "", ""],
    monthIndex: 0,
    showPeaks: true,
    indicatorByMetric: {
      civic: "",
      rai: "",
    },
    perN: 1000,
    countryToIndex: {},
    playing: false,
    timerId: null,
    mapClickBound: false,
  };

  function byId(id) {
    return document.getElementById(id);
  }

  function setStatus(message, tone) {
    var status = byId("mlp-dashboard-status");
    if (!status) {
      return;
    }
    status.textContent = message;
    status.classList.remove("is-ready", "is-error");
    if (tone === "ready") {
      status.classList.add("is-ready");
    } else if (tone === "error") {
      status.classList.add("is-error");
    }
  }

  function loadScript(src) {
    return new Promise(function (resolve, reject) {
      var script = document.createElement("script");
      script.src = src;
      script.async = true;
      script.onload = function () {
        resolve();
      };
      script.onerror = function () {
        reject(new Error("Failed to load " + src));
      };
      document.head.appendChild(script);
    });
  }

  function ensurePlotly() {
    if (window.Plotly) {
      return Promise.resolve(window.Plotly);
    }

    function tryIndex(index) {
      if (index >= PLOTLY_SOURCES.length) {
        return Promise.reject(new Error("Plotly could not be loaded from any source."));
      }
      return loadScript(PLOTLY_SOURCES[index]).then(function () {
        if (window.Plotly) {
          return window.Plotly;
        }
        return tryIndex(index + 1);
      }).catch(function () {
        return tryIndex(index + 1);
      });
    }

    return tryIndex(0);
  }

  function fetchData(url) {
    return fetch(url, { cache: "no-store" }).then(function (response) {
      if (!response.ok) {
        throw new Error("Data request failed (" + response.status + ").");
      }
      return response.json();
    });
  }

  function metricMeta() {
    return METRIC_META[state.metric];
  }

  function uniqueNonEmpty(values) {
    var seen = {};
    var out = [];
    values.forEach(function (value) {
      if (!value) {
        return;
      }
      if (!seen[value]) {
        seen[value] = true;
        out.push(value);
      }
    });
    return out;
  }

  function clamp(index, min, max) {
    if (index < min) {
      return min;
    }
    if (index > max) {
      return max;
    }
    return index;
  }

  function sanitizeSelected(nextSelected) {
    var countries = state.data ? state.data.countries : [];
    var valid = ["", "", ""];
    var seen = {};
    var i;

    for (i = 0; i < 3; i += 1) {
      var value = nextSelected[i];
      if (!value || !countries.includes(value) || seen[value]) {
        continue;
      }
      valid[i] = value;
      seen[value] = true;
    }

    for (i = 0; i < 2; i += 1) {
      if (!valid[i]) {
        var fallback = countries.find(function (country) {
          return !seen[country];
        });
        if (fallback) {
          valid[i] = fallback;
          seen[fallback] = true;
        }
      }
    }

    return valid;
  }

  function selectedCountries() {
    return uniqueNonEmpty(state.selected).slice(0, 3);
  }

  function getSeries(metricKey, country) {
    var indicatorId = currentIndicatorId();
    return getIndicatorSeries(metricKey, indicatorId, country);
  }

  function currentIndicatorId() {
    return state.indicatorByMetric[state.metric] || "";
  }

  function indicatorEntries(metricKey) {
    return (state.data.indicators && state.data.indicators[metricKey]) || [];
  }

  function indicatorLabelById(metricKey, indicatorId) {
    var entries = indicatorEntries(metricKey);
    var match = entries.find(function (entry) {
      return entry.id === indicatorId;
    });
    return match ? match.label : indicatorId;
  }

  function getIndicatorSeries(metricKey, indicatorId, country) {
    if (!state.data || !indicatorId) {
      return [];
    }
    var countryIndex = state.countryToIndex[country];
    if (countryIndex === undefined) {
      return [];
    }
    var metricObj = state.data.values && state.data.values[metricKey];
    var mat = metricObj && metricObj[indicatorId];
    return (mat && mat[countryIndex]) || [];
  }

  function shockMonthIdxs(metricKey, indicatorId, country) {
    if (!state.data || !indicatorId) {
      return [];
    }
    var countryIndex = state.countryToIndex[country];
    if (countryIndex === undefined) {
      return [];
    }
    var metricObj = state.data.shock_months && state.data.shock_months[metricKey];
    var byIndicator = metricObj && metricObj[indicatorId];
    return (byIndicator && byIndicator[countryIndex]) || [];
  }

  function isShockAtMonth(metricKey, indicatorId, country, monthIndex) {
    var months = shockMonthIdxs(metricKey, indicatorId, country);
    return months.indexOf(monthIndex) >= 0;
  }

  function defaultCountries(countries) {
    var preferred = ["Ukraine", "Turkey", "Belarus", "Niger", "Ethiopia", "Georgia"];
    var selected = [];

    preferred.forEach(function (country) {
      if (selected.length < 3 && countries.includes(country) && !selected.includes(country)) {
        selected.push(country);
      }
    });

    countries.forEach(function (country) {
      if (selected.length < 3 && !selected.includes(country)) {
        selected.push(country);
      }
    });

    while (selected.length < 3) {
      selected.push("");
    }
    return selected.slice(0, 3);
  }

  function buildCountryOptions(selectId, allowEmpty) {
    var select = byId(selectId);
    if (!select || !state.data) {
      return;
    }

    var options = [];
    if (allowEmpty) {
      options.push("<option value=''>None</option>");
    }
    state.data.countries.forEach(function (country) {
      options.push("<option value=\"" + country.replace(/\"/g, "&quot;") + "\">" + country + "</option>");
    });
    select.innerHTML = options.join("");
  }

  function buildIndicatorOptions() {
    var select = byId("mlp-surge-event-select");
    if (!select || !state.data) {
      return;
    }
    var entries = indicatorEntries(state.metric);
    var options = entries.map(function (entry) {
      return "<option value=\"" + entry.id.replace(/\"/g, "&quot;") + "\">" + entry.label + "</option>";
    });
    select.innerHTML = options.join("");
  }

  function syncIndicatorSelectValue() {
    var select = byId("mlp-surge-event-select");
    if (!select) {
      return;
    }
    select.value = currentIndicatorId();
  }

  function syncCountrySelectValues() {
    var c1 = byId("mlp-country-1");
    var c2 = byId("mlp-country-2");
    var c3 = byId("mlp-country-3");

    if (c1) {
      c1.value = state.selected[0] || "";
    }
    if (c2) {
      c2.value = state.selected[1] || "";
    }
    if (c3) {
      c3.value = state.selected[2] || "";
    }
  }

  function renderTimeSeries() {
    var plotEl = byId("mlp-ts-window");
    if (!plotEl || !window.Plotly || !state.data) {
      return;
    }

    var months = state.data.months;
    // Plotly auto-parses "YYYY-MM" as UTC midnight of the first day of the month.
    // In negative time zones (e.g. America/New_York) that can render as the prior day,
    // which shifts the displayed month. Using mid-month keeps month labels stable.
    var plotMonths = months.map(function (month) {
      return month + "-15";
    });
    var metric = metricMeta();
    var metricKey = metric.key;
    var metricLabel = metric.label;
    if (metricKey === "rai" && state.data.meta && state.data.meta.rai_influencer) {
      metricLabel = metricLabel + " (" + state.data.meta.rai_influencer + ")";
    }
    var indicatorId = currentIndicatorId();
    var indicatorLabel = indicatorLabelById(metricKey, indicatorId);
    var countries = selectedCountries();
    var traces = [];

    countries.forEach(function (country, index) {
      var values = getIndicatorSeries(metricKey, indicatorId, country);
      var scaledValues = values.map(function (v) {
        return (v || 0) * state.perN;
      });
      var color = metric.lineColors[index % metric.lineColors.length];

      traces.push({
        type: "scatter",
        mode: "lines",
        x: plotMonths,
        y: scaledValues,
        name: country,
        line: { width: 2.4, color: color },
        hovertemplate: "<b>" + country + "</b><br>%{x|%Y-%m}<br>" + indicatorLabel + ": %{y:.2f}<extra></extra>",
      });

      if (state.showPeaks) {
        var shockIdxs = shockMonthIdxs(metricKey, indicatorId, country);
        var peakMonths = shockIdxs.map(function (idx) { return plotMonths[idx]; });
        var peakValues = shockIdxs.map(function (idx) { return (scaledValues[idx] || 0); });

        if (peakMonths.length) {
          traces.push({
            type: "scatter",
            mode: "markers",
            x: peakMonths,
            y: peakValues,
            showlegend: false,
            marker: {
              symbol: "diamond",
              size: 7,
              color: metric.peakColor,
              line: { width: 1, color: color },
              opacity: 0.92,
            },
            hovertemplate: "<b>" + country + "</b><br>%{x|%Y-%m}<br>Indicator: " + indicatorLabel + "<br>Peak flag: 1<extra></extra>",
          });
        }
      }
    });

    var layout = {
      title: {
        text: metricLabel + " — " + indicatorLabel + " (articles per " + state.perN.toLocaleString() + ")"
          + (state.showPeaks ? "  |  Peak markers" : "")
          + "<br><span style='font-size:12px;color:rgba(71,85,105,0.95)'>Tip: drag to zoom (change the time window); double-click to reset.</span>",
        x: 0.01,
        xanchor: "left",
        font: { size: 17 },
      },
      font: {
        family: "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif",
        color: "rgba(15,23,42,0.95)",
      },
      paper_bgcolor: "rgba(0,0,0,0)",
      plot_bgcolor: "rgba(0,0,0,0)",
      margin: { t: 72, r: 18, b: 78, l: 56 },
      xaxis: {
        title: "Month",
        type: "date",
        tickformat: "%Y-%m",
        hoverformat: "%Y-%m",
        showgrid: true,
        gridcolor: "rgba(15,23,42,0.08)",
        rangeslider: { visible: false },
      },
      yaxis: {
        title: "Articles per " + state.perN.toLocaleString(),
        rangemode: "tozero",
        showgrid: true,
        gridcolor: "rgba(15,23,42,0.08)",
      },
      hovermode: "x unified",
      hoverlabel: {
        bgcolor: "rgba(15,23,42,0.92)",
        bordercolor: "rgba(255,255,255,0.16)",
        font: { color: "#f8fafc" },
      },
      legend: {
        orientation: "h",
        x: 0,
        xanchor: "left",
        y: -0.2,
        yanchor: "top",
        bgcolor: "rgba(248,250,252,0.82)",
        bordercolor: "rgba(15,23,42,0.12)",
        borderwidth: 1,
      },
    };

    var config = {
      responsive: true,
      displaylogo: false,
      modeBarButtonsToRemove: ["lasso2d", "select2d", "autoScale2d"],
    };

    window.Plotly.react(plotEl, traces, layout, config);
  }

  function renderMap() {
    var plotEl = byId("mlp-map-window");
    if (!plotEl || !window.Plotly || !state.data) {
      return;
    }

    var metric = metricMeta();
    var metricKey = metric.key;
    var metricLabel = metric.label;
    if (metricKey === "rai" && state.data.meta && state.data.meta.rai_influencer) {
      metricLabel = metricLabel + " (" + state.data.meta.rai_influencer + ")";
    }
    var indicatorId = currentIndicatorId();
    var indicatorLabel = indicatorLabelById(metricKey, indicatorId);
    var month = state.data.months[state.monthIndex];
    var countries = state.data.countries;
    var matrix = state.data.values && state.data.values[metricKey] && state.data.values[metricKey][indicatorId];
    var values = countries.map(function (_country, index) {
      if (!matrix || !matrix[index]) {
        return 0;
      }
      return (matrix[index][state.monthIndex] || 0) * state.perN;
    });
    var shockMatrix = state.data.shock_months && state.data.shock_months[metricKey] && state.data.shock_months[metricKey][indicatorId];
    var surges = countries.map(function (_country, index) {
      var idxs = shockMatrix && shockMatrix[index];
      return idxs && idxs.indexOf(state.monthIndex) >= 0 ? 1 : 0;
    });

    var mapTrace = {
      type: "choropleth",
      locationmode: "country names",
      locations: countries,
      z: values,
      colorscale: metric.colorscale,
      zmin: 0,
      zmax: ((state.data.meta && state.data.meta.max_values && state.data.meta.max_values[metricKey] && state.data.meta.max_values[metricKey][indicatorId]) || 1) * state.perN,
      marker: { line: { color: "rgba(255,255,255,0.7)", width: 0.4 } },
      colorbar: {
        title: "Articles per " + state.perN.toLocaleString(),
        thickness: 12,
        len: 0.72,
      },
      customdata: surges.map(function (surge) {
        return surge ? "1" : "0";
      }),
      hovertemplate: "<b>%{location}</b><br>" + indicatorLabel + ": %{z:.2f}<br>Peak flag (" + indicatorLabel + "): %{customdata}<extra></extra>",
    };

    var traces = [mapTrace];

    if (state.showPeaks) {
      var surgeCountries = countries.filter(function (_country, index) {
        return surges[index] === 1;
      });
      if (surgeCountries.length) {
        traces.push({
          type: "scattergeo",
          locationmode: "country names",
          locations: surgeCountries,
          mode: "markers",
          showlegend: false,
          marker: {
            size: 6,
            symbol: "x",
            color: metric.peakColor,
            opacity: 0.9,
          },
          hovertemplate: "<b>%{location}</b><br>Indicator: " + indicatorLabel + "<br>Peak flag: 1<extra></extra>",
        });
      }
    }

    var selected = selectedCountries();
    if (selected.length) {
      traces.push({
        type: "scattergeo",
        locationmode: "country names",
        locations: selected,
        mode: "markers",
        showlegend: false,
        marker: {
          size: 10,
          symbol: "circle-open",
          color: "#0f172a",
          line: { width: 1.4, color: "#0f172a" },
        },
        hovertemplate: "<b>%{location}</b><br>Selected for timeline<extra></extra>",
      });
    }

    var layout = {
      title: {
        text: metricLabel + " — " + indicatorLabel + " (" + month + ")",
        x: 0.01,
        xanchor: "left",
        font: { size: 17 },
      },
      font: {
        family: "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif",
        color: "rgba(15,23,42,0.95)",
      },
      paper_bgcolor: "rgba(0,0,0,0)",
      margin: { t: 56, r: 8, b: 8, l: 8 },
      geo: {
        projection: { type: "natural earth", scale: 1.18 },
        showland: true,
        landcolor: "#f8fafc",
        showocean: true,
        oceancolor: "#eef2ff",
        showlakes: true,
        lakecolor: "#eff6ff",
        showcountries: true,
        countrycolor: "rgba(148,163,184,0.5)",
        coastlinecolor: "rgba(100,116,139,0.6)",
        showframe: false,
        lataxis: { range: [-58, 84] },
        bgcolor: "rgba(0,0,0,0)",
      },
    };

    var config = {
      responsive: true,
      displaylogo: false,
      modeBarButtonsToRemove: ["lasso2d", "select2d", "autoScale2d", "zoom2d", "pan2d"],
    };

    window.Plotly.react(plotEl, traces, layout, config);

    if (!state.mapClickBound) {
      plotEl.on("plotly_click", function (eventData) {
        if (!eventData || !eventData.points || !eventData.points.length) {
          return;
        }
        var point = eventData.points[0];
        var country = point.location;
        if (!country || !state.data.countries.includes(country)) {
          return;
        }
        addCountryFromMap(country);
      });
      state.mapClickBound = true;
    }
  }

  function updateMonthLabel() {
    var label = byId("mlp-month-label");
    if (!label || !state.data) {
      return;
    }
    label.textContent = state.data.months[state.monthIndex] || "-";
  }

  function stopPlayback() {
    state.playing = false;
    if (state.timerId) {
      window.clearInterval(state.timerId);
      state.timerId = null;
    }
    var playBtn = byId("mlp-play-months");
    if (playBtn) {
      playBtn.textContent = "Play";
    }
  }

  function startPlayback() {
    if (!state.data || state.playing) {
      return;
    }
    state.playing = true;
    var playBtn = byId("mlp-play-months");
    if (playBtn) {
      playBtn.textContent = "Pause";
    }
    state.timerId = window.setInterval(function () {
      var slider = byId("mlp-month-slider");
      if (!slider || !state.data) {
        return;
      }
      var next = state.monthIndex + 1;
      if (next >= state.data.months.length) {
        next = 0;
      }
      state.monthIndex = next;
      slider.value = String(next);
      updateMonthLabel();
      renderMap();
    }, 750);
  }

  function addCountryFromMap(country) {
    if (state.selected.includes(country)) {
      return;
    }

    var next = state.selected.slice();
    var emptyIndex = next.findIndex(function (value) {
      return !value;
    });
    if (emptyIndex >= 0) {
      next[emptyIndex] = country;
    } else {
      next[2] = country;
    }

    state.selected = sanitizeSelected(next);
    syncCountrySelectValues();
    renderTimeSeries();
    renderMap();
  }

  function bindControls() {
    var metricSelect = byId("mlp-metric-select");
    var surgeEventSelect = byId("mlp-surge-event-select");
    var country1 = byId("mlp-country-1");
    var country2 = byId("mlp-country-2");
    var country3 = byId("mlp-country-3");
    var showPeaks = byId("mlp-show-peaks");
    var monthSlider = byId("mlp-month-slider");
    var playBtn = byId("mlp-play-months");
    var latestBtn = byId("mlp-latest-month");

    if (metricSelect) {
      metricSelect.addEventListener("change", function () {
        state.metric = metricSelect.value === "rai" ? "rai" : "civic";
        buildIndicatorOptions();
        if (!state.indicatorByMetric[state.metric]) {
          var entries = indicatorEntries(state.metric);
          state.indicatorByMetric[state.metric] = entries.length ? entries[0].id : "";
        }
        syncIndicatorSelectValue();
        renderTimeSeries();
        renderMap();
      });
    }

    if (surgeEventSelect) {
      surgeEventSelect.addEventListener("change", function () {
        state.indicatorByMetric[state.metric] = surgeEventSelect.value;
        renderTimeSeries();
        renderMap();
      });
    }

    function handleCountryChange() {
      state.selected = sanitizeSelected([
        country1 ? country1.value : "",
        country2 ? country2.value : "",
        country3 ? country3.value : "",
      ]);
      syncCountrySelectValues();
      renderTimeSeries();
      renderMap();
    }

    if (country1) {
      country1.addEventListener("change", handleCountryChange);
    }
    if (country2) {
      country2.addEventListener("change", handleCountryChange);
    }
    if (country3) {
      country3.addEventListener("change", handleCountryChange);
    }

    if (showPeaks) {
      showPeaks.addEventListener("change", function () {
        state.showPeaks = !!showPeaks.checked;
        renderTimeSeries();
        renderMap();
      });
    }

    if (monthSlider) {
      monthSlider.addEventListener("input", function () {
        stopPlayback();
        state.monthIndex = clamp(parseInt(monthSlider.value, 10) || 0, 0, state.data.months.length - 1);
        updateMonthLabel();
        renderMap();
      });
    }

    if (playBtn) {
      playBtn.addEventListener("click", function () {
        if (state.playing) {
          stopPlayback();
        } else {
          startPlayback();
        }
      });
    }

    if (latestBtn) {
      latestBtn.addEventListener("click", function () {
        stopPlayback();
        state.monthIndex = state.data.months.length - 1;
        if (monthSlider) {
          monthSlider.value = String(state.monthIndex);
        }
        updateMonthLabel();
        renderMap();
      });
    }
  }

  function bindHelpTooltips() {
    var root = byId(ROOT_ID);
    if (!root) {
      return;
    }

    var wraps = root.querySelectorAll(".mlp-help-wrap");
    if (!wraps || !wraps.length) {
      return;
    }

    function placeTooltip(wrap) {
      var box = wrap.querySelector(".mlp-help-box");
      if (!box) {
        return;
      }

      wrap.classList.remove("mlp-help-align-left", "mlp-help-align-right");

      // Measure in centered mode, then flip if the box would spill out of the viewport.
      // (The box is visibility:hidden by default but still measurable.)
      var margin = 12;
      var rect = box.getBoundingClientRect();

      if (rect.right > window.innerWidth - margin) {
        wrap.classList.add("mlp-help-align-right");
        rect = box.getBoundingClientRect();
      }

      if (rect.left < margin) {
        wrap.classList.remove("mlp-help-align-right");
        wrap.classList.add("mlp-help-align-left");
      }
    }

    for (var i = 0; i < wraps.length; i += 1) {
      (function (wrap) {
        var card = wrap.closest ? wrap.closest(".mlp-dashboard-card") : null;

        var handler = function () {
          // Defer so CSS hover/focus styles apply before we measure.
          window.requestAnimationFrame(function () {
            placeTooltip(wrap);
            if (card) {
              card.classList.add("mlp-card-raise");
            }
          });
        };
        var teardown = function () {
          if (card) {
            card.classList.remove("mlp-card-raise");
          }
        };

        wrap.addEventListener("mouseenter", handler);
        wrap.addEventListener("mouseleave", teardown);
        wrap.addEventListener("focus", handler, true);
        wrap.addEventListener("blur", teardown, true);
        wrap.addEventListener("touchstart", handler, { passive: true });
        wrap.addEventListener("touchend", teardown, { passive: true });
        wrap.addEventListener("touchcancel", teardown, { passive: true });
      })(wraps[i]);
    }
  }

  function initializeUi() {
    var monthSlider = byId("mlp-month-slider");
    var metricSelect = byId("mlp-metric-select");
    var showPeaks = byId("mlp-show-peaks");

    buildCountryOptions("mlp-country-1", false);
    buildCountryOptions("mlp-country-2", false);
    buildCountryOptions("mlp-country-3", true);

    state.selected = sanitizeSelected(defaultCountries(state.data.countries));
    syncCountrySelectValues();

    state.perN = (state.data.meta && state.data.meta.per_n_default) ? state.data.meta.per_n_default : 1000;
    state.countryToIndex = {};
    state.data.countries.forEach(function (country, idx) {
      state.countryToIndex[country] = idx;
    });

    var defaultConfig = (state.data.meta && state.data.meta.default_indicator) || {};
    var civicIndicators = indicatorEntries("civic");
    var raiIndicators = indicatorEntries("rai");
    state.indicatorByMetric.civic = defaultConfig.civic && civicIndicators.some(function (e) { return e.id === defaultConfig.civic; })
      ? defaultConfig.civic
      : (civicIndicators.length ? civicIndicators[0].id : "");
    state.indicatorByMetric.rai = defaultConfig.rai && raiIndicators.some(function (e) { return e.id === defaultConfig.rai; })
      ? defaultConfig.rai
      : (raiIndicators.length ? raiIndicators[0].id : "");

    buildIndicatorOptions();
    syncIndicatorSelectValue();

    // Start at the beginning of the series so "Play" animates forward in time by default.
    state.monthIndex = 0;
    if (monthSlider) {
      monthSlider.max = String(state.data.months.length - 1);
      monthSlider.value = String(state.monthIndex);
    }

    if (metricSelect) {
      metricSelect.value = state.metric;
    }
    if (showPeaks) {
      showPeaks.checked = state.showPeaks;
    }

    updateMonthLabel();
  }

  function init() {
    var root = byId(ROOT_ID);
    if (!root) {
      return;
    }

    var dataUrl = root.getAttribute("data-dashboard-data-url");
    if (!dataUrl) {
      setStatus("Interactive dashboard failed to initialize: missing data URL.", "error");
      return;
    }

    setStatus("Loading plot engine...");
    ensurePlotly()
      .then(function () {
        setStatus("Loading civic and RAI data...");
        return fetchData(dataUrl);
      })
      .then(function (data) {
        state.data = data;
        initializeUi();
        bindControls();
        bindHelpTooltips();
        renderTimeSeries();
        renderMap();
        setStatus(
          "Interactive windows ready. Peak markers use the event-level NormShock flag (binary). Data window: "
            + data.meta.start_month + " to " + data.meta.end_month + ".",
          "ready"
        );
      })
      .catch(function (error) {
        setStatus("Interactive dashboard failed to load: " + error.message, "error");
      });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
