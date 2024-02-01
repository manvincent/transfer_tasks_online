// Preload memory instruction slides
var mem_instruct_pages = [];
var mem_exception_pageNo = [5,7];
for (s = 0; s < 9; s++) {
  slideNo = s + 1;
  if (! mem_exception_pageNo.includes(slideNo)) {
    mem_instruct_pages.push(memInstructDir + 'probeInstruct_0' + slideNo + '.png');
  }
}
jsPsych.pluginAPI.preloadImages(mem_instruct_pages);
// Manually load in exception pages
var mem_except_page5 = [memInstructDir + 'probeInstruct_05.png'];
var mem_except_page7 = [memInstructDir + 'probeInstruct_07.png'];
jsPsych.pluginAPI.preloadImages(mem_except_page5);
jsPsych.pluginAPI.preloadImages(mem_except_page7);

// Load in design from csv file
var numMemDesigns = 2
var memDesignNo = getRandomIntInclusive(0,numMemDesigns-1)
var mem_designMat = mem_designArray[memDesignNo]
var numMemTrials = mem_designMat.length;

// Set up memory choice keys
var oldMemKey = jsPsych.pluginAPI.convertKeyCharacterToKeyCode('f');
var newMemKey = jsPsych.pluginAPI.convertKeyCharacterToKeyCode('j');
var mem_keys = [oldMemKey, newMemKey];

// These variables will change depending on the task
var mem_isNew =  Array(mem_designMat.length).fill(0)
var mem_stimPath = [];
// Convert from JSON object to set of arrays
for (t = 0; t < mem_designMat.length; t++) {
  mem_isNew[t] = Number(mem_designMat[t].isNew)
  currStimID = Number(mem_designMat[t].stimID)
  if (mem_isNew[t] == 1) {
    mem_stimPath.push([memDir + 'stimuli/' + currStimID +'.bmp'])
  } else {
    mem_stimPath.push([taskDir + 'stimuli/' + currStimID +'.bmp'])
  }
}
// Pre load old/new choice images
var old_unselected = [memDir + "old_unselected.png"];
var new_unselected = [memDir + "new_unselected.png"];
jsPsych.pluginAPI.preloadImages(old_unselected)
jsPsych.pluginAPI.preloadImages(new_unselected)

// Pre load old/new response images
var old_selected = [memDir + "old_selected.png"];
var new_selected = [memDir + "new_selected.png"];
jsPsych.pluginAPI.preloadImages(old_selected)
jsPsych.pluginAPI.preloadImages(new_selected)
