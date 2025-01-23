window.initProbabilitySliders = function({sel, state, hasColor=true}){
  displayTexts = ['P(stormy|c,c)', 'P(stormy|c,s)', 'P(stormy|s,c)', 'P(stormy|s,s)']
  var sliders = ['p00', 'p01', 'p10', 'p11'].map((key, i) => ({
    sel: sel.append('div.slider'),//.style("position", "relative").style("margin-left", "-150px"),
    key: displayTexts[i],
    i,
    getVal: _ => state[key],
    setVal: d => state[key] = +d
  }))

  sliders.forEach(slider => {
    slider.sel.html(`
      <div'>
        <b>${slider.key}:</b> <val></val>
      </div>
      <div>
        <input type=range class=pslider min=${state.min_slider_value} max=${state.max_slider_value} step=${state.slider_step_size} value=${slider.getVal()}></input>
      </div>
    `)

    slider.sel.select('input[type="range"]')
      .on('input', function () {
        slider.setVal(this.value)
        state.renderAll.modJoint()
      })
    slider.sel.select('val').text(slider.getVal())
    state.renderAll.modJoint.fns.push(() => {
      var value = slider.getVal()
      slider.sel.select('val').text(parseFloat(value).toFixed(2))
      slider.sel.select('input').node().value = value
    })

  })
}
window.initProbabilityButtons = function({sel, state, columnIndex}){
  const gateButtons = [
  ['AND', [0, 0, 0, 1]],
  ['OR', [0, 1, 1, 1]],
  ['XOR', [0, 1, 1, 0]],
  ['NAND', [1, 1, 1, 0]],
  ['Mirror1', [0, 0, 1, 1]],
  ['Mirror2', [0, 1, 0, 1]],
  ]
  if (columnIndex == 2) {
    gateButtons.slice(0, 3).forEach(stuff => {
      buttonSel = sel.append('div.button')//.style("position", "relative").style("margin-left", "800px"),
      buttonSel.html(`<input type="button" class="pbutton" value=${stuff[0]}>`)
      .on('click', function () {
        state.p00 = stuff[1][0]; state.p01 = stuff[1][1]; state.p10 = stuff[1][2]; state.p11 = stuff[1][3]
        state.renderAll.modJoint()
      })
    })
  }
  if (columnIndex == 1) {
    gateButtons.slice(4).forEach(stuff => {
      buttonSel = sel.append('div.button')//.style("position", "relative").style("margin-left", "800px"),
      buttonSel.html(`<input type="button" class="pbutton" value=${stuff[0]}>`)
      .on('click', function () {
        state.p00 = stuff[1][0]; state.p01 = stuff[1][1]; state.p10 = stuff[1][2]; state.p11 = stuff[1][3]
        state.renderAll.modJoint()
      })
    })

    // buttonSel = sel.append('br')

    buttonSel = sel.append('div.button')
    buttonSel.html(`<input type="button" class="pbutton" value="Random" id="random">`)
    .on('click', function () {
      state.p00 = Math.random(); state.p01 = Math.random(); state.p10 = Math.random(); state.p11 = Math.random()
      state.renderAll.modJoint()
    })
  }
  
}

window.initParetoDisplay = function({sel}){
  buttonSel = sel.append('div.switch')
  buttonSel.html(`<label class="switch">
  <input type="checkbox">
  <span class="slider round"></span>
</label>`)


}

window.initNoiseSlider = function({sel, state, hasColor=true}){
  var sliders = ['noise'].map((key, i) => ({
    sel: sel.append('div.slider'),
    key,
    i,
    getVal: _ => parseFloat(state[key]).toFixed(2),
    setVal: d => state[key] = Math.exp(d)
  }))

  sliders.forEach(slider => {
    slider.sel.html(`
      <div style='color:${hasColor ? util.colors[slider.key + 'Input'] : ''}'>
        Line noise (V): <val></val>
      </div>
      <div>
        <input type=range min=${Math.log(state.min_slider_value)} max=${Math.log(state.max_slider_value)} step=${state.slider_step_size} value=${slider.getVal()}></input>
      </div>
      <div style='color:${hasColor ? util.colors[slider.key + 'Input'] : ''}'>
        Transmitted information: <val2></val2> bits
      </div>
    `)

    slider.sel.select('input[type="range"]')
      .on('input', function () {
        slider.setVal(this.value)
        state.renderAll.modNoise()
      })
    slider.sel.select('val').text(slider.getVal())
    state.renderAll.modNoise.fns.push(() => {
      var value = slider.getVal()
      slider.sel.select('val').text(value)
      slider.sel.select('input').node().value = Math.log(value)
    })

  })
}

window.initTrainDIB = function({sel, state}) {
  buttonSel = sel.append('div.button')//.style("position", "relative").style("margin-left", "800px"),
  buttonSel.html(`<input type="button" class="pbutton" value="Train" id="train">`)
  .on('click', function () {
    state.renderAll.trainDIB()
  })
}

window.initPixelButtons = function({sel, state, columnIndex}){
    if (columnIndex == 4) {
      buttonSel = sel.append('div.button')
      buttonSel.html(`<input type="button" class="pbutton" value="Checker">`)
      .on('click', function () {

        for (let i=0; i<state.originalDims[0]; i++) {
          for (let j=0; j<state.originalDims[1]; j++) {
            val = (i+j)%2
            state.boardValues[i][j] = val;
            state.d3ReadableBoardValues[i*state.originalDims[0]+j] = [state.rowLabels[i], state.colLabels[j], val];
          }
        }
        state.renderAll.redraw()
      })

      buttonSel = sel.append('div.button')
      buttonSel.html(`<input type="button" class="pbutton" value="In/Out">`)
      .on('click', function () {

        for (let i=0; i<state.originalDims[0]; i++) {
          for (let j=0; j<state.originalDims[1]; j++) {
            val = (i==0) || (i==state.originalDims[0]-1) || (j==0) || (j==state.originalDims[1]-1)
            state.boardValues[i][j] = val;
            state.d3ReadableBoardValues[i*state.originalDims[0]+j] = [state.rowLabels[i], state.colLabels[j], val];
          }
        }
        state.renderAll.redraw()
      })
    } else if (columnIndex == 3) {
      buttonSel = sel.append('div.button')
      buttonSel.html(`<input type="button" class="pbutton" value="Half">`)
      .on('click', function () {

        for (let i=0; i<state.originalDims[0]; i++) {
          for (let j=0; j<state.originalDims[1]; j++) {
            val = (i<2)
            state.boardValues[i][j] = val;
            state.d3ReadableBoardValues[i*state.originalDims[0]+j] = [state.rowLabels[i], state.colLabels[j], val];
          }
        }
        state.renderAll.redraw()
      })

      buttonSel = sel.append('div.button')
      buttonSel.html(`<input type="button" class="pbutton" value="Diag">`)
      .on('click', function () {

        for (let i=0; i<state.originalDims[0]; i++) {
          for (let j=0; j<state.originalDims[1]; j++) {
            val = (i+j)<4
            state.boardValues[i][j] = val;
            state.d3ReadableBoardValues[i*state.originalDims[0]+j] = [state.rowLabels[i], state.colLabels[j], val];
          }
        }
        state.renderAll.redraw()
      })
    } else {
      presetBoardValues = [[0, 0, 0, 0], [1, 1, 1, 1], [1, 0, 0, 0], [1, 1, 1, 1]]
      buttonSel = sel.append('div.button')
      buttonSel.html(`<input type="button" class="pbutton" value="Preset">`)
      .on('click', function () {

        for (let i=0; i<state.originalDims[0]; i++) {
          for (let j=0; j<state.originalDims[1]; j++) {
            
            state.boardValues[i][j] = presetBoardValues[i][j];
            state.d3ReadableBoardValues[i*state.originalDims[0]+j] = [state.rowLabels[i], state.colLabels[j], presetBoardValues[i][j]];
          }
        }
        state.renderAll.redraw()
      })

      buttonSel = sel.append('div.button')
      buttonSel.html(`<input type="button" class="pbutton" value="Random" id="random2">`)
      .on('click', function () {

        for (let i=0; i<state.originalDims[0]; i++) {
          for (let j=0; j<state.originalDims[1]; j++) {
            randValue = Math.floor(Math.random()*2)
            state.boardValues[i][j] = randValue;
            state.d3ReadableBoardValues[i*state.originalDims[0]+j] = [state.rowLabels[i], state.colLabels[j], randValue];
          }
        }
        state.renderAll.redraw()
      })
    }
    
}


window.initTrainingProgressSlider = function({sel, state}){
  slider = {
    sel: sel.append('div.slider'),
    getVal: _ => state.trainingStepDisplayIndex,
    setVal: d => state.trainingStepDisplayIndex = d
  }
  
  slider.sel.html(`
    <div>
      Training step: <val></val>/${state.numberTrainingSteps}
    </div>
    <div style="margin-bottom:0px;">
      <input type=range min=0 max=1 value=0 id=sliderStep></input>
    </div>
  `)

  slider.sel.select('input[type="range"]')
    .on('input', function () {
      slider.setVal(this.value)
      slider.sel.select('input').node().value = this.value
      state.trainingStepDisplayIndex = this.value
      state.manualOverride = true
      state.renderAll.varyTrainingStep()
    })
  slider.sel.select('val').text(slider.getVal()*state.displayEvery)
  state.renderAll.varyTrainingStep.fns.push(() => {
    var value = slider.getVal()
    slider.sel.select('#sliderStep').property("max", state.trainingBoards.length-1)
    slider.sel.select('input').node().value = value
    slider.sel.select('val').text(slider.getVal()*state.displayEvery)
  })

}

window.initCompressionLevelSlider = function({sel, state}){
  var slider = {
    sel: sel.append('div.slider'),
    getVal: _ => state.compressionInd,
    setVal: d => state.compressionInd = d
  }
  
  slider.sel.html(`
    <div style="text-align:center">
      Total information (bits): <val></val>
    </div>
    <div style="margin:auto;width:50%;margin-bottom:-5px">
      <input type=range min=0 max=${state.infoLevels.length-2} value=${state.compressionInd}></input>
    </div>
    <div style="text-align:center;margin-bottom:-10px">
      RMSE: <valRMSE></valRMSE>
    </div>

  `)

  slider.sel.select('input[type="range"]')
    .on('input', function () {
      slider.setVal(this.value)
      slider.sel.select('input').node().value = this.value
      state.renderAll.compressionLevel()
    })
  slider.sel.select('val').text(parseFloat(state.infoLevels[slider.getVal()]).toFixed(1))
  slider.sel.select('valRMSE').text(parseFloat(state.rmseLevels[slider.getVal()]).toFixed(1))
  state.renderAll.compressionLevel.fns.push(() => {
    var value = slider.getVal()
    slider.sel.select('val').text(parseFloat(state.infoLevels[value]).toFixed(1))
    slider.sel.select('valRMSE').text(parseFloat(state.rmseLevels[value]).toFixed(1))
    slider.sel.select('input').node().value = value
  })

}