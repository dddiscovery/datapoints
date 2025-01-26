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
    <div style="margin:auto;width:50%;margin-bottom:-5px; text-align: center;">
      <input type=range min=0 max=${state.infoLevels.length-1} value=${state.compressionInd} style="width: 50%"></input>
    </div>
    <div style="text-align:center;margin-bottom:-10px">
      Error (RMSE): <valRMSE></valRMSE>
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