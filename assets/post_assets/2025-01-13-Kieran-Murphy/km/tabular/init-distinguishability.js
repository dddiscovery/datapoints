window.initDistinguishability = async function({sel, state}) {
  // Plot the frame
  matWidth = 100
  margins = {left: 30, right: 10, top: 15, bottom: 25}

  sel.append("p")
  .style("align-items", "center")
  .style("display", "inline-block")

  state.distSVGs = []

  for (let featureInd=0; featureInd<state.numberFeatures; featureInd++) {
    let matDim = Math.floor(Math.sqrt(state.distMatrices[featureInd][0].length))
    divSel = sel.append("div")
      .style("flex-direction", "column")
      .style("width", matWidth)
      .style("overflow", "auto")
      // .style("height", "100%")

    state.distSVGs.push(sel.append("svg")
        .attr("width", matWidth + margins.left + margins.right)
        .attr("height", matWidth + margins.top + margins.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margins.left + "," + margins.top + ")")
        .on('mouseover', () => {
        state.curveHighlighter = featureInd
        state.renderAll.curveHighlighter()
      }))

    // Build X scales and axis:
    distX = d3.scaleBand()
        .range([ 0, matWidth ])
        .domain(d3.range(matDim))
        .padding(0.01)

    distY = d3.scaleBand()
        .range([0, matWidth ])
        .domain(d3.range(matDim))
        .padding(0.01)

    state.distSVGs[featureInd].append('g')
      .translate([matWidth/2, matWidth+16])
      .append('text.axis-label')
      .text(state.featureLabels[featureInd])
      .at({textAnchor: 'middle', fill: '#000'})
    
    state.distSVGs[featureInd].selectAll()
      .data(state.distMatrices[featureInd][state.compressionInd])
      .enter()
      .append("rect")
      .attr("x", function(d) {return distX(d[0]) })
      .attr("y", function(d) { return distY(d[1]) })
      .attr("width", distX.bandwidth() )
      .attr("height", distY.bandwidth() )
      .style("fill", function(d) { return util.distinguishabilityColorMap(d[2])} )


    if (state.featureValueLabels[featureInd].length > 0) {
        yAxisGen = d3.axisLeft(distY).tickPadding(-2)
        yAxisGen.tickFormat(function(d, i) {
            if (state.featureValueLocs[featureInd].includes(i)) {
                tickIndex = state.featureValueLocs[featureInd].indexOf(i)
                return state.featureValueLabels[featureInd][tickIndex];
            } else {
                return '';
            }
        });
        state.distSVGs[featureInd].append('g').call(yAxisGen)
        .selectAll("text")
        .style("fill", '#999')

        xAxisGen = d3.axisTop(distX).tickPadding(-2)
        xAxisGen.tickFormat(function(d, i) {
            if (state.featureValueLocs[featureInd].includes(i)) {
                tickIndex = state.featureValueLocs[featureInd].indexOf(i)
                return state.featureValueLabels[featureInd][tickIndex];
            } else {
                return '';
            }
        });
        state.distSVGs[featureInd].append('g').call(xAxisGen)
        .selectAll("text")
        .style("fill", '#999')
      
    }
    state.distSVGs[featureInd].selectAll("path,line").remove();
  }

  
  state.renderAll.compressionLevel?.fns.push(redrawDistinguishability)

  state.renderAll.compressionLevel()

  async function redrawDistinguishability() {
    state.compressionLevelSVG
        .attr("x1", state.compressionLevelSVGX(state.infoLevels[state.compressionInd]))
        .attr("x2", state.compressionLevelSVGX(state.infoLevels[state.compressionInd]))
    for (let featureInd=0; featureInd<state.numberFeatures; featureInd++) {
        state.distSVGs[featureInd].selectAll("rect")
          .data(state.distMatrices[featureInd][state.compressionInd])
          .style("fill", function(d) { return util.distinguishabilityColorMap(d[2])} )
    }

  }

}