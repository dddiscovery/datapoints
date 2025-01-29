window.tabularState = window.tabularStateX || {
  isLocked: false,
  dataset: 'bikeshare',
}

window.initTabular = async function(){

  var state = tabularState
  state.runPath = `${state.dataset}`
  state.renderAll = util.initRenderAll(['compressionLevel', 'curveHighlighter'])
  
  // Grab the information decomp and the distinguishability matrices
  state.feature_inds_used = [1, 0, 5, 3]
  feature_inds_ordered = [0, 1, 3, 5]
  reordering_annoyance = [1, 0, 3, 2]

  state.numberFeatures = state.feature_inds_used.length

  state.info_max_display = 10
  fileAppendix = '_' + feature_inds_ordered.join("")
  var almostParsedDecomp = await util.getFile(state.runPath + `_info_decomp${fileAppendix}.npy`)
  // stone age reshape
  var decompShape = almostParsedDecomp.shape
  var decompData = almostParsedDecomp.data
  var parsedDecomp = [];
  state.infoLevels = []
  state.rmseLevels = []
  for (i = 0; (i + decompShape[1]) <= decompData.length; i += decompShape[1]) {
    reordered_row = []
    for (let featureInd = 0; featureInd < state.numberFeatures; featureInd++) {
      reordered_row.push(decompData[i+reordering_annoyance[featureInd]])
    }
    reordered_row.push(decompData[i+4])
    reordered_row.push(decompData[i+5])
    parsedDecomp.push(reordered_row);
    state.infoLevels.push(decompData[i+4])
    state.rmseLevels.push(decompData[i+5])
    // }
  }
  state.info_decomp = parsedDecomp

  state.infoLevels = state.infoLevels.reverse() 
  state.rmseLevels = state.rmseLevels.reverse()

  stop_ind = 0
  for (var stop_ind = 0; stop_ind <= state.infoLevels.length; stop_ind++) {
    if (state.infoLevels[stop_ind]>state.info_max_display) {break}
  }
  state.infoLevels = state.infoLevels.slice(0, stop_ind+1)
  state.rmseLevels = state.rmseLevels.slice(0, stop_ind+1)

  state.featureLabels = ['season', 'year', 'month', 'hour', 'holiday?', 'day of week', 'working day?', 'weather', 'temperature', 'apparent temp.', 'humidity', 'wind']
  window.initInfoPlane({
    sel: d3.select('.tabular-decomp'),
    state,
    lossLabel: "Error (RMSE)",
  })

  state.distMatrices = []
  state.displayFeatureVals = []
  for (let featureIndInd=0; featureIndInd<state.numberFeatures; featureIndInd++) {
    featureInd = reordering_annoyance[featureIndInd]
    distMat = await util.getFile(state.runPath + `_feature${featureInd}_mats${fileAppendix}.npy`)
    
    matShape = distMat.shape
    matData = distMat.data
    parsedMat = [];
    let pointerIndex = 0
    for (let l=matData.length+1; (pointerIndex + matShape[1]*matShape[2]) < l; pointerIndex += matShape[1]*matShape[2]) {
      tempMat = []
      for (let j=0; j<matShape[1]; j++) {
        for (let k=0; k<matShape[2]; k++) {
          // tempMat.push(matData.slice(pointerIndex+j*matShape[2], pointerIndex + (j+1)*matShape[2]))
          tempMat.push([j, k, matData[pointerIndex+j*matShape[1]+k]])
        }
      }
      parsedMat.push(tempMat);
    }

    state.distMatrices.push(parsedMat.reverse())

    // rawFeatureVals = await util.getFile(state.runPath + `_feature${featureInd}_vals.npy`)

  }
  const featureValueLabels = [
    ['win','spr','sum','fall'],
    [2011, 2012],
    ['Mar','Jun','Sep','Dec'],
    ['6a','12p','6p','12a'],
    ['T','F'],
    ['M', 'W', 'F', 'Su'],
    ['T','F'],
    ['fair','mist','wet','bad'],
    [0, 10, 20, '30C'],
    [0, 10, 20, '30C'],
    [25, 50, 75, '90%'],
    [0, 10, 20],
  ]

  const featureValueLocs = [
    [0, 1, 2, 3],
    [0, 1],
    [2, 5, 8, 11],
    [5, 11, 17, 23],
    [0, 1],
    [0, 2, 4, 6],
    [0, 1],
    [0, 1, 2, 3],
    [2, 41, 78, 115], 
    [17, 43, 78, 115],
    [3, 36, 82, 112],
    [0, 55, 106],
  ]

  state.featureValueLabels = [];
  state.featureValueLocs = [];
  for (let i = 0; i < state.numberFeatures; i++) {
    state.featureValueLabels.push(featureValueLabels[state.feature_inds_used[i]]);
    state.featureValueLocs.push(featureValueLocs[state.feature_inds_used[i]]);
  }

  state.compressionInd = 15
  window.initDistinguishability({
    sel: d3.select('.distinguishability-mats'),
    state,
  })

  window.initCompressionLevelSlider({
    sel: d3.select('.compression-level-slider'),
    state,
  })

}

