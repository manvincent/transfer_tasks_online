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
var conditionDur = 1000;
var observeOnDur = 2000;
var observeVidDur = 1500;

var ITIdur = 3000;
var cueDur = 4000;
var respDur = 1000;
var outDur = 2000;

// Set up clock
var d_start = new Date();
var t_start = 0;

// Specify image directories
var imageDir = "/static/images/";
var stimDir =  imageDir + "stimuli/";
var vidDir = imageDir + "videos/"
// Define paths to general images
var topBox = [stimDir + "top_box_observe.png"];
var bottomBox = [stimDir + "bottom_box_observe.png"];
var iti = [imageDir + "fix.png"];

// STORE DESIGN ID FOR EACH PARTICIPANT
// Load in design from csv file
var numDesigns = trial_lists.length
var designNo = getRandomIntInclusive(0,numDesigns-1)
var designMat = trial_lists[designNo]

// These variables will change depending on the task
var blockID =  Array(designMat.length).fill(0)
var trialID =  Array(designMat.length).fill(0)
var trialType = Array(designMat.length).fill(0)
var vidPaths =  [];
var leftStimPaths = [];
var midStimPaths = [];
var rightStimPaths = [];
var obsv_leftSelectPaths = [];
var obsv_midSelectPaths = [];
var obsv_rightSelectPaths = [];
var play_LResp_leftStim = [];
var play_LResp_midStim = [];
var play_LResp_rightStim = [];
var play_RResp_leftStim = [];
var play_RResp_midStim = [];
var play_RResp_rightStim = [];
var leftOutPaths = [];
var rightOutPaths = [];
var leftOutVal = Array(designMat.length).fill(0)
var rightOutVal = Array(designMat.length).fill(0)
var availableKeys = Array(designMat.length).fill(0)
var isBreak = Array(designMat.length).fill(0);

// Convert from JSON object to set of arrays
for (t = 0; t < designMat.length; t++) {
    blockID[t] = Number(designMat[t].runID)
    trialID[t] = Number(designMat[t].trialNb)
    trialType[t] = designMat[t].trTypeText
    leftStimPaths.push([imageDir + designMat[t].leftImPath]);
    midStimPaths.push([imageDir + designMat[t].midImPath]);
    rightStimPaths.push([imageDir + designMat[t].rightImPath]);
    availableKeys[t] = designMat[t].avKeys
    if (trialType[t] == "Observe") {
      vidPaths.push([imageDir + designMat[t].videoPath]);
      leftOutPaths.push(iti);
      rightOutPaths.push(iti);
      play_LResp_leftStim.push(iti);
      play_LResp_midStim.push(iti);
      play_LResp_rightStim.push(iti);
      play_RResp_leftStim.push(iti);
      play_RResp_midStim.push(iti);
      play_RResp_rightStim.push(iti);
      obsv_leftSelectPaths.push([imageDir + designMat[t].selectedIfLeft]);
      obsv_midSelectPaths.push([imageDir + designMat[t].selectedIfMid]);
      obsv_rightSelectPaths.push([imageDir + designMat[t].selectedIfRight]);
    } else if (trialType[t] == "Play") {
      vidPaths.push([vidDir + "empty.mp4"]);
      obsv_leftSelectPaths.push(iti);
      obsv_midSelectPaths.push(iti);
      obsv_rightSelectPaths.push(iti);
      if (availableKeys[t] == "LM") {
        play_LResp_leftStim.push([imageDir + designMat[t].selectedIfLeft]);
        play_LResp_midStim.push([imageDir + designMat[t].midImPath]);
        play_LResp_rightStim.push([imageDir + designMat[t].rightImPath]);
        play_RResp_leftStim.push([imageDir + designMat[t].leftImPath]);
        play_RResp_midStim.push([imageDir + designMat[t].selectedIfMid]);
        play_RResp_rightStim.push([imageDir + designMat[t].rightImPath]);
        leftOutPaths.push([imageDir + designMat[t].tokenIfLeft]);
        rightOutPaths.push([imageDir + designMat[t].tokenIfMid]);
        leftOutVal.push(Number(designMat[t].outcomeIfLeft))
        rightOutVal.push(Number(designMat[t].outcomeIfMid))
      } else if (availableKeys[t] == "LR") {
        play_LResp_leftStim.push([imageDir + designMat[t].selectedIfLeft]);
        play_LResp_midStim.push([imageDir + designMat[t].midImPath]);
        play_LResp_rightStim.push([imageDir + designMat[t].rightImPath]);
        play_RResp_leftStim.push([imageDir + designMat[t].leftImPath]);
        play_RResp_midStim.push([imageDir + designMat[t].midImPath]);
        play_RResp_rightStim.push([imageDir + designMat[t].selectedIfRight]);
        leftOutPaths.push([imageDir + designMat[t].tokenIfLeft]);
        rightOutPaths.push([imageDir + designMat[t].tokenIfRight]);
        leftOutVal.push(Number(designMat[t].outcomeIfLeft))
        rightOutVal.push(Number(designMat[t].outcomeIfRight))
      } else if (availableKeys[t] == "MR") {
        play_LResp_leftStim.push([imageDir + designMat[t].leftImPath]);
        play_LResp_midStim.push([imageDir + designMat[t].selectedIfMid]);
        play_LResp_rightStim.push([imageDir + designMat[t].rightImPath]);
        play_RResp_leftStim.push([imageDir + designMat[t].leftImPath]);
        play_RResp_midStim.push([imageDir + designMat[t].midImPath]);
        play_RResp_rightStim.push([imageDir + designMat[t].selectedIfRight]);
        leftOutPaths.push([imageDir + designMat[t].tokenIfMid]);
        rightOutPaths.push([imageDir + designMat[t].tokenIfRight]);
        leftOutVal.push(Number(designMat[t].outcomeIfMid))
        rightOutVal.push(Number(designMat[t].outcomeIfRight))
      }
    }
    isBreak[t] = Number(designMat[t].isBreak)
  }

// jsPsych.pluginAPI.preloadImages(vidPaths)
jsPsych.pluginAPI.preloadImages(leftStimPaths)
jsPsych.pluginAPI.preloadImages(midStimPaths)
jsPsych.pluginAPI.preloadImages(rightStimPaths)
jsPsych.pluginAPI.preloadImages(obsv_leftSelectPaths)
jsPsych.pluginAPI.preloadImages(obsv_midSelectPaths)
jsPsych.pluginAPI.preloadImages(obsv_rightSelectPaths)
jsPsych.pluginAPI.preloadImages(play_LResp_leftStim)
jsPsych.pluginAPI.preloadImages(play_LResp_midStim)
jsPsych.pluginAPI.preloadImages(play_LResp_rightStim)
jsPsych.pluginAPI.preloadImages(play_RResp_leftStim)
jsPsych.pluginAPI.preloadImages(play_RResp_midStim)
jsPsych.pluginAPI.preloadImages(play_RResp_rightStim)
jsPsych.pluginAPI.preloadImages(leftOutPaths)
jsPsych.pluginAPI.preloadImages(rightOutPaths)


// Initialize task parameters
var numBlocks = blockID.filter(onlyUnique).length;
var numBlockTrials = Math.max.apply(Math, trialID);
var numTotalTrials = designMat.length;


// Specify which keys are allowable given the active doors on each trial
var allowable_keys = []
var left_allowableKey = []
var right_allowableKey = []
for (t = 0; t < numTotalTrials; t++) {
  if (availableKeys[t] == "LM") {
    allowable_keys.push([37,40])
    left_allowableKey.push(37)
    right_allowableKey.push(40)
  } else if (availableKeys[t] == "LR") {
    allowable_keys.push([37,39])
    left_allowableKey.push(37)
    right_allowableKey.push(39)
  } else if (availableKeys[t] == "MR") {
    allowable_keys.push([40,39])
    left_allowableKey.push(40)
    right_allowableKey.push(39)
  }
}

// Preload the end of task slide
var task_end = [imageDir + "task_end.png"]
jsPsych.pluginAPI.preloadImages(task_end)
