/* Copyright 2023 Google LLC. All Rights Reserved.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
==============================================================================*/
window.util = (function(){

  var data = window.__datacache = window.__datacache || {}

  async function getFile(path, uploadData={}){
    var [slug, type] = path.replaceAll('..', '').split('.')

    var uploadDataStr = JSON.stringify(uploadData)
    slug = path + ' __ ' + uploadDataStr 
    // TODO: fix?
    if (data[slug + 'xxxxxx']){
      return data[slug]
    }

    // var res = await fetch('data/'+path)
    var res = await fetch('/assets/km/data/dddi\ post/'+path)

    if (type == 'csv'){
      var parsed = d3.csvParse(await res.text())
    } else if (type == 'npy'){
      var parsed = npyjs.parse(await(res).arrayBuffer())
    } else if (type == 'json'){
      var parsed = await res.json()
    } else{
      throw 'unknown type'
    }

    data[slug] = parsed
    return parsed 
  }

  var color = d3.interpolatePuOr

  var distinguishabilityColorMap = d3.scaleSequential(d3.interpolateBlues).domain([1, 0]);

  var colors = {
    distortion: '#000000',
    features: ['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd', '#8c564b', '#e377c2', '#7f7f7f', '#bcbd22', '#17becf', '#003f5c',
    '#F59F00', '#BF211E', '#489FB5'],
    highlight: '#b4cc16',
    bars: ['#1f77b4', '#ff7f0e'],
    towns: ['#69A3C9', '#E77377']
  }
  d3.entries(colors).forEach(({key, value}) => {
    d3.select('html').style('--color-' + key, value)
  })


  function addAxisLabel(c, xText, yText, y2Text=null, xOffset=40, yOffset=-30){
    if (c.isggPlot) xOffset -= 5

    c.svg.append('g')
      .translate([c.width/2, c.height + xOffset])
      .append('text.axis-label')
      .text(xText)
      .at({textAnchor: 'middle', fill: '#000'})

    c.svg
      .append('g')
      .translate([yOffset, c.height/2])
      .append('text.axis-label')
      .text(yText)
      .at({textAnchor: 'middle', fill: '#000', transform: 'rotate(-90)'})

    if (y2Text) {
      c.svg
        .append('g')
        .translate([xOffset+c.width, c.height/2])
        .append('text.axis-label')
        .text(y2Text)
        .at({textAnchor: 'middle', fill: '#000', transform: 'rotate(-90)'})
    }
  }

  function ggPlot(c, isBlack=false){
    c.svg.append('rect.bg-rect')
      .at({width: c.width, height: c.height, fill: isBlack ? '#000' : '#F1F3F4'}).lower()
    c.svg.selectAll('.domain').remove()
    c.isggPlot = true
    ggPlotUpdate(c)
  }

  function ggPlotUpdate(c){
    c.svg.selectAll('.tick').selectAll('line').remove()

    c.svg.selectAll('.y text').at({x: -3})
    c.svg.selectAll('.y .tick')
      .selectAppend('path').at({d: 'M 0 0 H ' + c.width, stroke: '#fff', strokeWidth: 1})

    c.svg.selectAll('.x text').at({y: 4})
    c.svg.selectAll('.x .tick')
      .selectAppend('path').at({d: 'M 0 0 V -' + c.height, stroke: '#fff', strokeWidth: 1})
  }

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  function npy2tfSlice(npyArray, stepIndex){
    var {data, shape} = npyArray
    var stepSize = shape[1]*shape[2]
    var slicedData = data.slice(stepSize*stepIndex, stepSize*(stepIndex + 1))
    slicedData = Float32Array.from(slicedData)
    return tf.tensor2d(slicedData, [shape[1], shape[2]])
  }

  function transpose(arr){
    return arr[0].map((_, i) => arr.map(row => row[i]))
  }

  function initRenderAll(fnLabels){
    var rv = {}
    fnLabels.forEach(label => {
      rv[label] = () => rv[label].fns.forEach(d => d())
      rv[label].fns = []
    })

    return rv
  }

  function addAria(array){
    array.forEach(d => {
      d3.select(d.selector).at({role: 'graphics-document', 'aria-label': d.label})
    })
  }

  function indexOfMinDistance(arr, val) {
    var minDist = 100;
    var minIndex = 0;

    for (var i = 1; i < arr.length; i++) {
        dist = Math.abs(arr[i]-val)
        if (dist < minDist) {
            minIndex = i;
            minDist = dist
        }
    }

    return minIndex;
}

  return {indexOfMinDistance, getFile, color, colors, distinguishabilityColorMap, addAxisLabel, ggPlot, ggPlotUpdate, sleep, npy2tfSlice, transpose, initRenderAll, addAria}

})()

