// Preload  instruction slides
var instruct_pages = [];
var exception_pageNo = [7,10,20,22,24,26,28,30];
for (s = 0; s < 32; s++) {
  slideNo = s + 1;
  if (! exception_pageNo.includes(slideNo)) {
    instruct_pages.push(instructDir + 'casinoInstruct_' + slideNo + '.png');
  }
}
jsPsych.pluginAPI.preloadImages(instruct_pages);
// Manually load in exception pages
var except_page7 = [instructDir + 'casinoInstruct_7.png'];
var except_page10 = [instructDir + 'casinoInstruct_10.png'];
var except_page20 = [instructDir + 'casinoInstruct_20.png'];
var except_page22 = [instructDir + 'casinoInstruct_22.png'];
var except_page24 = [instructDir + 'casinoInstruct_24.png'];
var except_page26 = [instructDir + 'casinoInstruct_26.png'];
var except_page28 = [instructDir + 'casinoInstruct_28.png'];
var except_page30 = [instructDir + 'casinoInstruct_30.png'];
jsPsych.pluginAPI.preloadImages(except_page7);
jsPsych.pluginAPI.preloadImages(except_page10);
jsPsych.pluginAPI.preloadImages(except_page20);
jsPsych.pluginAPI.preloadImages(except_page22);
jsPsych.pluginAPI.preloadImages(except_page24);
jsPsych.pluginAPI.preloadImages(except_page26);
jsPsych.pluginAPI.preloadImages(except_page28);
jsPsych.pluginAPI.preloadImages(except_page30);

// Load in design from csv file
var pract_designMat = pract_design;
var numPractTrials = pract_designMat.length;

// These variables will change depending on the task
var pract_blockID =  Array(pract_designMat.length).fill(0)
var pract_trialID =  Array(pract_designMat.length).fill(0)
var pract_trialStimID_1 =  Array(pract_designMat.length).fill(0)
var pract_trialStimID_2 =  Array(pract_designMat.length).fill(0)
var pract_trialStimReward_1 =  Array(pract_designMat.length).fill(0)
var pract_trialStimReward_2 =  Array(pract_designMat.length).fill(0)
var pract_trialLeftOutPath = Array(pract_designMat.length).fill(0)
var pract_trialRightOutPath = Array(pract_designMat.length).fill(0)
// Convert from JSON object to set of arrays
for (t = 0; t < pract_designMat.length; t++) {
    pract_blockID[t] = Number(pract_designMat[t].blockID)
    pract_trialID[t] = Number(pract_designMat[t].trialID)
    pract_trialStimID_1[t] = Number(pract_designMat[t].trialStimID_1)
    pract_trialStimID_2[t] = Number(pract_designMat[t].trialStimID_2)
    pract_trialStimReward_1[t] = Number(pract_designMat[t].trialStimReward_1)
    pract_trialStimReward_2[t] = Number(pract_designMat[t].trialStimReward_2)
    // Create array holding outcome image paths conditional on boolean in matrix
    if (pract_trialStimReward_1[t] == 1) {
      pract_trialLeftOutPath[t] = tokenGain;
    } else if (trialStimReward_1[t] == 0) {
      pract_trialLeftOutPath[t] = tokenLoss;
    }
    if (pract_trialStimReward_2[t] == 1) {
      pract_trialRightOutPath[t] = tokenGain;
    } else if (trialStimReward_2[t] == 0) {
      pract_trialRightOutPath[t] = tokenLoss;
    }
  }


// Preload block casinos images
var pract_numBlocks = unique(pract_blockID).length;
// Draw b number of casino images randomly, b = # blocks
var pract_blockList = arange(0, pract_numBlocks-1, 1, 0)
jointShuffle(pract_blockList)

var pract_blockPaths  = [];
for (t = 0; t < numPractTrials; t++) {
  if (pract_trialID[t] == 1) {
    currBlock = pract_blockList.pop()
    pract_blockPaths.push(practDir + "/casinos/casino_" + currBlock + ".png")
  } else {
    pract_blockPaths.push(imageDir+"/fix.png");
  }
}
jsPsych.pluginAPI.preloadImages(pract_blockPaths)

// Preload casino images for the left (1) side
var pract_leftStimPaths = [];
for (s = 0; s < pract_trialStimID_1.length; s++) {
  pract_leftStimPaths.push([taskDir + "stimuli/" + pract_trialStimID_1[s] + ".bmp"]);
}
if (pract_leftStimPaths.length !== numPractTrials) {
  throw new RangeError("# stims in matrix not equal to total number of trials (practice).");
}
jsPsych.pluginAPI.preloadImages(pract_leftStimPaths)
// Preload casino images for the right (2) side
var pract_rightStimPaths = [];
for (s = 0; s < pract_trialStimID_2.length; s++) {
  pract_rightStimPaths.push([taskDir + "stimuli/" + pract_trialStimID_2[s] + ".bmp"]);
}
if (pract_rightStimPaths.length !== numPractTrials) {
  throw new RangeError("# stims in matrix not equal to total number of trials (practice).");
}
jsPsych.pluginAPI.preloadImages(pract_rightStimPaths)
