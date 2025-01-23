window.initInfoPlane = async function({sel, state, isBig=true, lossLabel, width=null, title=null}){
  // Plot the frame
  var leftMargin = 50
  var rightMargin = 250 
  var topMargin = 25 
  var bottomMargin = 50
  var actualHeight = isBig ? 225 : 30
  var actualWidth = width || (isBig ? 450 : 50)
  var c = d3.conventions({
    sel: sel.html('').append('div'),
    width: actualWidth,
    height: actualHeight,
    margin: {left: leftMargin, right: rightMargin, top: topMargin, bottom: bottomMargin}
  })
  // Add the per-feature information axis
  c.y2 = d3.scaleLinear().domain([0, 4.3]).range([c.height, 0])
  c.y2Axis = d3.axisRight(c.y2).ticks(isBig ? 5 : 3)
  c.svg.append("g") 
        .attr("transform", `translate(${actualWidth},0)`) 
        .call(c.y2Axis) 
        
  c.x.domain([0, 16])
  c.y.domain([0, 200])  // change this for diff datasets; could create a plotting params json for each dataset

  c.yAxis.ticks(isBig ? 5 : 3)

  d3.drawAxis(c)
  c.svg.select('.y').lower()  // z order
  // util.ggPlot(c)  // just makes a gray background and puts grid lines

  // c.svg.append('text.chart-title').at({y: -7, fontSize: 16, textAnchor: 'middle', x: c.width/2})
  //   .text(title || 'Information decomposition')

  util.addAxisLabel(c, 'Total information used by model (bits)', lossLabel, y2Text='Information per feature (bits)')

  c.svg.append("defs")
      .append("clipPath")
      .attr("id", "clipDecompPlot")
      .append("rect")
      .attr("width", actualWidth) 
      .attr("height", actualHeight)
      .attr("x", 0)
      .attr("y", 0)

  var line = d3.line().x(d => c.x(d[d.length-2]))


  // Create the data curves
  var distortionPathSel = c.svg.append('path')
    .at({strokeWidth: 2, stroke: util.colors.distortion, fill: 'none'})
    .at("clip-path", "url(#clipDecompPlot)")

  distortionPathSel.at({d: line.y(d => c.y(d[d.length-1]))(state.info_decomp)})

  const inputFeatures = d3.range(state.info_decomp[0].length-2)

  // var textSel = c.svg.append('g.axis').append('text')
  //     .st({fill: 'k', fontWeight: 800, fontSize: 15})
  //     .at({x: c.width - 150, y: 30, dy: '.33em'})

  state.renderAll.curveHighlighter?.fns.push(() => {
    lineSel
      .classed('active', 0)
      .filter(d => d == state.curveHighlighter)
      .classed('active', 1)
      .raise()

    textSel
      .classed('active', 0)
      .filter(d => d == state.curveHighlighter)
      .classed('active', 1)

    for (let featureInd=0; featureInd<state.numberFeatures; featureInd++) {
      
      if (featureInd == state.curveHighlighter) {
        weight = 'bold'
        deco = 'underline'
      } else {
        weight = 'light'
        deco = null 
      } 
      // state.distSVGs[featureInd].selectAll('text').at({'font-weight': weight, 'text-decoration': deco})
      state.distSVGs[featureInd].selectAll('text').at({'font-weight': weight})
      state.distSVGs[featureInd].selectAll('text.axis-label').at({'font-weight': weight, 'text-decoration': deco})
    }
    if (state.curveHighlighter < 0) return

  })

  var lineSel = c.svg.appendMany('path.info-curve', inputFeatures)
      .at({fill: 'none', opacity: .4})
      .at("stroke", (d, i) => util.colors.features[i])
      .each(drawData)
      .on('mouseover', d => {
        state.curveHighlighter = d
        state.renderAll.curveHighlighter()
      })

  var textSel = c.svg.appendMany('text.feature-label', inputFeatures)
      .at({fill: 'k', fontWeight: 10, fontSize: 15})
      .each(placeText)
      .on('mouseover', d => {
        state.curveHighlighter = d 
        state.renderAll.curveHighlighter()
      })


  c.svg.on('mouseleave', () => {state.curveHighlighter = -1; state.renderAll.curveHighlighter() })
  state.compressionLevelSVGX = c.x
  state.compressionLevelSVG = c.svg.append("line")
    .attr("x1", c.x(2))
    .attr("y1", 0)
    .attr("x2", c.x(2))
    .attr("y2", actualHeight)
    .style("stroke-width", 2)
    .style("stroke", "black")
    .style("fill", "none")
    .style("stroke-dasharray", ("4, 4"))
    // .style("opacity", 0.5)

  function drawData(featureIndex) {
    var sel = d3.select(this)
    sel.at({d: line.y(d => c.y2(d[featureIndex]))(state.info_decomp)})
      .at("clip-path", "url(#clipDecompPlot)")
      // .at({stroke: util.colors.features[featureIndex]})
      
  }

  function placeText(featureIndex) {
    var sel = d3.select(this)
    sel.at({x: c.width + 75, y: c.height/2 - 100 + featureIndex*20}) //, dy: '.33em'})
    sel.text(state.featureLabels[featureIndex])
  }

}
  
// The label below the dotted line that follows the cursor... don't think we need this
// var hoverTick = c.svg.select('.x .tick')
//   .select(function(){ return this.parentNode.insertBefore(this.cloneNode(true), this.nextSibling) })
//   .st({opacity: 1}).classed('step-path', 1)
//   .raise()

// hoverTick.select('text').st({fill: '#000', fontWeight: 500})
// hoverTick.select('path').at({d: 'M 0 0 V ' + -c.height, stroke: '#000', strokeDasharray: '3 2'})

// state.renderAll.step.fns.push(d => {
//   var step = state.stepIndex*state.hyper.save_every

//   hoverTick.translate(c.x(step), 0)
//   hoverTick.select('text').text(d3.format(',')(step))
// })

// c.svg.append('rect')
//   .at({width: c.width, height: c.height + 30, fillOpacity: 0})
//   .on('mousemove touchmove', function(){
//     d3.event.preventDefault()

//     // last training run missing on some models
//     var mouseX = d3.clamp(0, d3.mouse(this)[0], c.width - .1)
//     state.stepIndex = Math.floor(c.x.clamp(1).invert(mouseX)) // state.hyper.save_every)
//     state.renderAll.step()
//   })

window.initTabular?.()



