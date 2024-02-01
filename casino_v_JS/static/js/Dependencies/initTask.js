// Initialize the timeline
var timeline = [];
// Force fullscreen
var go_full = {
  type: "fullscreen",
  fullscreen_mode: true,
  data: {
    label: "go_full",
  },
};
timeline.push(go_full);

// Set up trial event durations
var blockStartDur = 3000;
var ITIdur = 500;
var cueDur = 3000;
var respDur = 1000;
var outDur = 1000;

// Set up clock
var d_start = new Date();
var t_start = 0;

// Specify image directories
var imageDir = "/static/images/";
var instructDir =  imageDir + "casinoInstructions/";
var memInstructDir = imageDir + "memoryProbeInstructions/";
var taskDir = imageDir + "task/";
var practDir = imageDir + "practice/";
var memDir = imageDir + "memoryProbe/";

// Define paths to general images
var bandit = [imageDir + "slotMachine.png"];
var slotUnselected = [imageDir + "unselected_box.png"];
var banditSelected = [imageDir + "slotMachine_selected.png"];
var tokenLoss = [imageDir + "token_Loss.png"];
var tokenGain = [imageDir + "token_Win.png"];
var iti = [imageDir + "fix.png"];


jsPsych.pluginAPI.preloadImages(bandit)
jsPsych.pluginAPI.preloadImages(slotUnselected)
jsPsych.pluginAPI.preloadImages(banditSelected)
jsPsych.pluginAPI.preloadImages(tokenLoss)
jsPsych.pluginAPI.preloadImages(tokenGain)
jsPsych.pluginAPI.preloadImages(iti)

// STORE DESIGN ID FOR EACH PARTICIPANT

// Load in design from csv file
var numDesigns = 10
var designNo = getRandomIntInclusive(0,numDesigns-1)
var designMat = designArray[designNo]

// These variables will change depending on the task
var blockID =  Array(designMat.length).fill(0)
var trialID =  Array(designMat.length).fill(0)
var trialStimID_1 =  Array(designMat.length).fill(0)
var trialStimID_2 =  Array(designMat.length).fill(0)
var trialStimReward_1 =  Array(designMat.length).fill(0)
var trialStimReward_2 =  Array(designMat.length).fill(0)
var trialLeftOutPath = Array(designMat.length).fill(0)
var trialRightOutPath = Array(designMat.length).fill(0)
// Convert from JSON object to set of arrays
for (t = 0; t < designMat.length; t++) {
    blockID[t] = Number(designMat[t].blockID)
    trialID[t] = Number(designMat[t].trialID)
    trialStimID_1[t] = Number(designMat[t].trialStimID_1)
    trialStimID_2[t] = Number(designMat[t].trialStimID_2)
    trialStimReward_1[t] = Number(designMat[t].trialStimReward_1)
    trialStimReward_2[t] = Number(designMat[t].trialStimReward_2)
    // Create array holding outcome image paths conditional on boolean in matrix
    if (trialStimReward_1[t] == 1) {
      trialLeftOutPath[t] = tokenGain;
    } else if (trialStimReward_1[t] == 0) {
      trialLeftOutPath[t] = tokenLoss;
    }
    if (trialStimReward_2[t] == 1) {
      trialRightOutPath[t] = tokenGain;
    } else if (trialStimReward_2[t] == 0) {
      trialRightOutPath[t] = tokenLoss;
    }
  }

// Initialize task parameters
var numBlocks = unique(blockID).length;
var numBlockTrials = Math.max.apply(Math, trialID);
var numTotalTrials = designMat.length;
var numStims = 23

// Set up choice keys
var leftAllowKey = jsPsych.pluginAPI.convertKeyCharacterToKeyCode('1');
var rightAllowKey = jsPsych.pluginAPI.convertKeyCharacterToKeyCode('4');
var choice_keys = [leftAllowKey, rightAllowKey]
// Casino section
// Draw b number of casino images randomly, b = # blocks
var blockList = arange(0, numBlocks-1, 1, 0)
jointShuffle(blockList)

// Preload block casinos images
var blockPaths  = [];
for (t = 0; t < numTotalTrials; t++) {
  if (trialID[t] == 1) {
    currBlock = blockList.pop()
    blockPaths.push(taskDir + "/casinos/casino_" + currBlock + ".png")
  } else {
    blockPaths.push(imageDir+"/fix.png");
  }
}
jsPsych.pluginAPI.preloadImages(blockPaths)

// Preload casino images for the left (1) side
var leftStimPaths = [];
for (s = 0; s < trialStimID_1.length; s++) {
  leftStimPaths.push([taskDir + "stimuli/" + trialStimID_1[s] + ".bmp"]);
}
if (leftStimPaths.length !== numTotalTrials) {
  throw new RangeError("# stims in matrix not equal to total number of trials.");
}
jsPsych.pluginAPI.preloadImages(leftStimPaths)
// Preload casino images for the right (2) side
var rightStimPaths = [];
for (s = 0; s < trialStimID_1.length; s++) {
  rightStimPaths.push([taskDir + "stimuli/" + trialStimID_2[s] + ".bmp"]);
}
if (rightStimPaths.length !== numTotalTrials) {
  throw new RangeError("# stims in matrix not equal to total number of trials.");
}
jsPsych.pluginAPI.preloadImages(rightStimPaths)

// Preload the end of task slide
var task_end = [imageDir + "task_end.png"]
jsPsych.pluginAPI.preloadImages(task_end)
