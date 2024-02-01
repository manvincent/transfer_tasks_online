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


// Specify image directories
var instructDir =  "/static/images/Instructions/";
var instrDir =  "/static/images/Instrumental/";
var extinctDir =  "/static/images/Extinction/";
var outcomeDir =  "/static/images/Outcomes/";
var pavDir =  "/static/images/Pavlovian/";
var pitDir =  "/static/images/Transfer/";

// Specify the trial types
var instr_trialType = Array(numInstrTrials).fill('instr_task');
var pav_trialType = Array(numPavTrials).fill('pav_task');
var pavCheck_trialType = Array(numPavTrials).fill('pav_check');
var pit_trialType = Array(numPITtrials).fill('pit_task');

// Do a coin flip to see if participant gets instrumental or pavlovian training first
var instrFirst = coinFlip()

// Define general fixation slide
var iti_page = [instrDir+"fix.png"];
jsPsych.pluginAPI.preloadImages(iti_page)

// INSTRUMENTAL SECTION
// Define instrumental slides
var instr_start = [instrDir+"instr_start_screen.png"];
var instr_blank = [instrDir+"instr_blank.png"];
jsPsych.pluginAPI.preloadImages(instr_start)
jsPsych.pluginAPI.preloadImages(instr_blank)

// Assign left/mid/right to low, high uncert, high cert
var doorAssign = jsPsych.randomization.shuffle(Array(0,1,2))
var lowOutPosition = doorAssign[0]
var uncertOutPosition = doorAssign[1]
var certOutPosition = doorAssign[2]

// Assign low outcome
var leftLowOut = false
var midLowOut = false
var rightLowOut = false
if (lowOutPosition == 0) {
  leftLowOut = true
  var lowOutSide = Array(numInstrTrials).fill('left');
} else if (lowOutPosition == 1) {
  midLowOut = true;
  var lowOutSide = Array(numInstrTrials).fill('mid')
} else if (lowOutPosition == 2) {
  rightLowOut = true;
  var lowOutSide = Array(numInstrTrials).fill('right');
}

// Assign high uncertain outcome
var leftUncertOut = false
var midUncertOut = false
var rightUncertOut = false
if (uncertOutPosition == 0) {
  leftUncertOut = true;
} else if (uncertOutPosition == 1) {
  midUncertOut = true;
} else if (uncertOutPosition == 2) {
  rightUncertOut = true;
}

// Assign high certain outcome
var leftCertOut = false
var midCertOut = false
var rightCertOut = false
if (certOutPosition == 0) {
  leftCertOut = true;
} else if (certOutPosition == 1) {
  midCertOut = true;
} else if (certOutPosition == 2) {
  rightCertOut = true;
}

// Get the number of unique outcomes for preloading outcome images
var coinColours = ["gold", "green", "pink"];
var uniqueOutcomes = magOutcomeLow.concat(magOutcomeHighUncert).concat(magOutcomeHighCert).filter((x, i, a) => a.indexOf(x) == i)
var numUniqueOutcomes = uniqueOutcomes.length;

// Assign outcome (colour <--> position) counterbalance
var cb_assignment = getRandomIntInclusive(1,6);
var colourAssign = cbProperties(coinColours, cb_assignment);
// The first three indices correspond to left/mid/right instrumental outcomes (respectively)
var leftOutColour = colourAssign[0];
var midOutColour = colourAssign[1];
var rightOutColour = colourAssign[2];
// Specify which of the (two high) instrumental colours will be paired with Pav case
// For 2 CS version (v0_5)
if (between_condition == 'pav_uncert') {
  if (leftUncertOut == true) {
    var pavOldColour = leftOutColour;
  } else if (midUncertOut == true) {
    var pavOldColour = midOutColour;
  } else if (rightUncertOut == true) {
    var pavOldColour = midOutColour;
  }
} else if (between_condition == 'pav_cert') {
  if (leftCertOut == true) {
    var pavOldColour = leftOutColour;
  } else if (midCertOut == true) {
    var pavOldColour = midOutColour;
  } else if (rightCertOut == true) {
    var pavOldColour = midOutColour;
  }
}
var pavOldColour_idx = indexOfAll(colourAssign,pavOldColour)
// Create arrays to store on each trial
// Make an array to encode the left/mid/right colours on each trial
var leftOutColour_array = Array(numInstrTrials).fill(leftOutColour);
var midOutColour_array = Array(numInstrTrials).fill(midOutColour);
var rightOutColour_array = Array(numInstrTrials).fill(rightOutColour);
// Make array to encode the index of the low magnitude door
var lowOutIdx_array = Array(numInstrTrials).fill(lowOutPosition);
var uncertOutIdx_array = Array(numInstrTrials).fill(uncertOutPosition);
var certOutIdx_array = Array(numInstrTrials).fill(certOutPosition);

// Make an array to encode the pavlovian outcome colour (if matching one of the instrumental outcomes)
var pavOldColour_array = Array(numPavTrials).fill(pavOldColour);
var pavOldIdx_array = Array(numPavTrials).fill(pavOldColour_idx)


// Assign active doors (LM/LR/MR) across trials
var shuffled_trialDoors = jsPsych.randomization.shuffle([].concat.apply([], Array(numInstrTrials/door_permute.length).fill(door_permute)));

// Have the first 12 trials always be the active doors between the two high-valued options
if (lowOutSide.filter((v, i, a) => a.indexOf(v) === i) == 'left') {
  for (i = 0; i < 12; i++) {
    replace_idx = indexOfAll(shuffled_trialDoors,"MR")
    shuffled_trialDoors.splice(replace_idx[Math.floor(Math.random() * replace_idx.length)],1)
  }
  shuffled_trialDoors.splice(0,0,"MR","MR","MR","MR","MR","MR","MR","MR","MR","MR","MR","MR")
} else if (lowOutSide.filter((v, i, a) => a.indexOf(v) === i) == 'mid') {
  for (i = 0; i < 12; i++) {
    replace_idx = indexOfAll(shuffled_trialDoors,"LR")
    shuffled_trialDoors.splice(replace_idx[Math.floor(Math.random() * replace_idx.length)],1)
  }
  shuffled_trialDoors.splice(0,0,"LR","LR","LR","LR","LR","LR","LR","LR","LR","LR","LR","LR")
} else if (lowOutSide.filter((v, i, a) => a.indexOf(v) === i) == 'right') {
  for (i = 0; i < 12; i++) {
    replace_idx = indexOfAll(shuffled_trialDoors,"LM")
    shuffled_trialDoors.splice(replace_idx[Math.floor(Math.random() * replace_idx.length)],1)
  }
  shuffled_trialDoors.splice(0,0,"LM","LM","LM","LM","LM","LM","LM","LM","LM","LM","LM","LM")
}

// Specify which keys are allowable given the active doors on each trial
var allowable_keys = []
var left_allowableKey = []
var right_allowableKey = []
for (t = 0; t < numInstrTrials; t++) {
  if (shuffled_trialDoors[t] == "LM") {
    allowable_keys.push([jsPsych.pluginAPI.convertKeyCharacterToKeyCode('1'),jsPsych.pluginAPI.convertKeyCharacterToKeyCode('2')])
    left_allowableKey.push(jsPsych.pluginAPI.convertKeyCharacterToKeyCode('1'))
    right_allowableKey.push(jsPsych.pluginAPI.convertKeyCharacterToKeyCode('2'))
  } else if (shuffled_trialDoors[t] == "LR") {
    allowable_keys.push([jsPsych.pluginAPI.convertKeyCharacterToKeyCode('1'),jsPsych.pluginAPI.convertKeyCharacterToKeyCode('3')])
    left_allowableKey.push(jsPsych.pluginAPI.convertKeyCharacterToKeyCode('1'))
    right_allowableKey.push(jsPsych.pluginAPI.convertKeyCharacterToKeyCode('3'))
  } else if (shuffled_trialDoors[t] == "MR") {
    allowable_keys.push([jsPsych.pluginAPI.convertKeyCharacterToKeyCode('2'),jsPsych.pluginAPI.convertKeyCharacterToKeyCode('3')])
    left_allowableKey.push(jsPsych.pluginAPI.convertKeyCharacterToKeyCode('2'))
    right_allowableKey.push(jsPsych.pluginAPI.convertKeyCharacterToKeyCode('3'))
  }
}


// Preload 'trial active' files
var instr_active_LM = [instrDir+"instr_active_LM.png"];
var instr_active_LR = [instrDir+"instr_active_LR.png"];
var instr_active_MR = [instrDir+"instr_active_MR.png"];
jsPsych.pluginAPI.preloadImages(instr_active_LM)
jsPsych.pluginAPI.preloadImages(instr_active_LR)
jsPsych.pluginAPI.preloadImages(instr_active_MR)

// Set up which doors (2/3) are active on each trial
var trial_activeDoors = [];
for (t = 0; t < numInstrTrials; t++) {
  if (shuffled_trialDoors[t] == "LM") {
    trial_activeDoors.push(instr_active_LM)
  } else if (shuffled_trialDoors[t] == "LR") {
    trial_activeDoors.push(instr_active_LR)
  } else if (shuffled_trialDoors[t] == "MR") {
    trial_activeDoors.push(instr_active_MR)
  }
}

// Preload 'response' files
var instr_choice_LM = Array(choice_options.length).fill(0);
var instr_choice_LR = Array(choice_options.length).fill(0);
var instr_choice_MR = Array(choice_options.length).fill(0);
for (c = 0; c < choice_options.length; c++) {
  instr_choice_LM[c] = [instrDir+"instr_choice_LM_" + choice_options[c] + ".png"];
  instr_choice_LR[c] = [instrDir+"instr_choice_LR_" + choice_options[c] + ".png"];
  instr_choice_MR[c] = [instrDir+"instr_choice_MR_" + choice_options[c] + ".png"];
}
jsPsych.pluginAPI.preloadImages(instr_choice_LM)
jsPsych.pluginAPI.preloadImages(instr_choice_LR)
jsPsych.pluginAPI.preloadImages(instr_choice_MR)
// Set up which files are presented conditional on active doors and responses
var trial_leftResp = [];
var trial_rightResp = [];
for (t = 0; t < numInstrTrials; t++) {
  if (shuffled_trialDoors[t] == "LM") {
    trial_leftResp.push(instr_choice_LM[0])
    trial_rightResp.push(instr_choice_LM[1])
  } else if (shuffled_trialDoors[t] == "LR") {
    trial_leftResp.push(instr_choice_LR[0])
    trial_rightResp.push(instr_choice_LR[1])
  } else if (shuffled_trialDoors[t] == "MR") {
    trial_leftResp.push(instr_choice_MR[0])
    trial_rightResp.push(instr_choice_MR[1])
  }
}


// Specify the outcome magnitudes behind each door
var left_instrOutMag = [];
var mid_instrOutMag = [];
var right_instrOutMag = [];
if (leftLowOut == true) {
  var left_instrOutMag = jsPsych.randomization.shuffle(makeRepeated(magOutcomeLow,numInstrTrials/magOutcomeLow.length));
} else if (midLowOut == true) {
  var mid_instrOutMag = jsPsych.randomization.shuffle(makeRepeated(magOutcomeLow,numInstrTrials/magOutcomeLow.length));
} else if (rightLowOut == true) {
  var right_instrOutMag = jsPsych.randomization.shuffle(makeRepeated(magOutcomeLow,numInstrTrials/magOutcomeLow.length));
}
if (leftUncertOut == true) {
  var left_instrOutMag = initmagOutcomeHighUncert.concat(jsPsych.randomization.shuffle(makeRepeated(magOutcomeHighUncert,(numInstrTrials-12)/magOutcomeHighUncert.length)));
} else if (midUncertOut == true) {
  var mid_instrOutMag = initmagOutcomeHighUncert.concat(jsPsych.randomization.shuffle(makeRepeated(magOutcomeHighUncert,(numInstrTrials-12)/magOutcomeHighUncert.length)));
} else if (rightUncertOut == true) {
  var right_instrOutMag = initmagOutcomeHighUncert.concat(jsPsych.randomization.shuffle(makeRepeated(magOutcomeHighUncert,(numInstrTrials-12)/magOutcomeHighUncert.length)));
}
if (leftCertOut == true) {
  var left_instrOutMag = initmagOutcomeHighCert.concat(jsPsych.randomization.shuffle(makeRepeated(magOutcomeHighCert,(numInstrTrials-12)/magOutcomeHighCert.length)));
} else if (midCertOut == true) {
  var mid_instrOutMag = initmagOutcomeHighCert.concat(jsPsych.randomization.shuffle(makeRepeated(magOutcomeHighCert,(numInstrTrials-12)/magOutcomeHighCert.length)));
} else if (rightCertOut == true) {
  var right_instrOutMag = initmagOutcomeHighCert.concat(jsPsych.randomization.shuffle(makeRepeated(magOutcomeHighCert,(numInstrTrials-12)/magOutcomeHighCert.length)));
}


// Assign  outcome parameters given the left/right -- high/low counterbalance
var left_OutcomeStim = []; // left_* and right_* refer to the response (not the door position)_
var right_OutcomeStim = [];
// Loop through trials and define what the outcome file path is, conditional on active doors, cb, and reward magnitude
for (t = 0; t < numInstrTrials; t++) {
  // Define the outcome image if left response
  if (shuffled_trialDoors[t] == "LM") {
    if (left_instrOutMag[t] == 0) {
      left_OutcomeStim.push(outcomeDir+"reward_0/counterBalance_"+cb_assignment+"/instr_win_LM_l.png");
    } else if (left_instrOutMag[t] == 2) {
      left_OutcomeStim.push(outcomeDir+"reward_2/counterBalance_"+cb_assignment+"/instr_win_LM_l.png");
    } else if (left_instrOutMag[t] == 5) {
      left_OutcomeStim.push(outcomeDir+"reward_5/counterBalance_"+cb_assignment+"/instr_win_LM_l.png");
    } else if (left_instrOutMag[t] == 10) {
      left_OutcomeStim.push(outcomeDir+"reward_10/counterBalance_"+cb_assignment+"/instr_win_LM_l.png");
    }
    if (mid_instrOutMag[t] == 0) {
      right_OutcomeStim.push(outcomeDir+"reward_0/counterBalance_" + cb_assignment + "/instr_win_LM_r.png");
    } else if (mid_instrOutMag[t] == 2) {
      right_OutcomeStim.push(outcomeDir+"reward_2/counterBalance_" + cb_assignment + "/instr_win_LM_r.png");
    } else if (mid_instrOutMag[t] == 5) {
      right_OutcomeStim.push(outcomeDir+"reward_5/counterBalance_" + cb_assignment + "/instr_win_LM_r.png");
    } else if (mid_instrOutMag[t] == 10) {
      right_OutcomeStim.push(outcomeDir+"reward_10/counterBalance_" + cb_assignment + "/instr_win_LM_r.png");
    }
  } else if (shuffled_trialDoors[t] == "LR") {
    if (left_instrOutMag[t] == 0) {
      left_OutcomeStim.push(outcomeDir+"reward_0/counterBalance_"+cb_assignment+"/instr_win_LR_l.png");
    } else if (left_instrOutMag[t] == 2) {
      left_OutcomeStim.push(outcomeDir+"reward_2/counterBalance_"+cb_assignment+"/instr_win_LR_l.png");
    } else if (left_instrOutMag[t] == 5) {
      left_OutcomeStim.push(outcomeDir+"reward_5/counterBalance_"+cb_assignment+"/instr_win_LR_l.png");
    } else if (left_instrOutMag[t] == 10) {
      left_OutcomeStim.push(outcomeDir+"reward_10/counterBalance_"+cb_assignment+"/instr_win_LR_l.png");
    }
    if (right_instrOutMag[t] == 0) {
      right_OutcomeStim.push(outcomeDir+"reward_0/counterBalance_" + cb_assignment + "/instr_win_LR_r.png");
    } else if (right_instrOutMag[t] == 2) {
      right_OutcomeStim.push(outcomeDir+"reward_2/counterBalance_" + cb_assignment + "/instr_win_LR_r.png");
    } else if (right_instrOutMag[t] == 5) {
      right_OutcomeStim.push(outcomeDir+"reward_5/counterBalance_" + cb_assignment + "/instr_win_LR_r.png");
    } else if (right_instrOutMag[t] == 10) {
      right_OutcomeStim.push(outcomeDir+"reward_10/counterBalance_" + cb_assignment + "/instr_win_LR_r.png");
    }
  } else if (shuffled_trialDoors[t] == "MR") {
    if (mid_instrOutMag[t] == 0) {
      left_OutcomeStim.push(outcomeDir+"reward_0/counterBalance_" + cb_assignment + "/instr_win_MR_l.png");
    } else if (mid_instrOutMag[t] == 2) {
      left_OutcomeStim.push(outcomeDir+"reward_2/counterBalance_" + cb_assignment + "/instr_win_MR_l.png");
    } else if (mid_instrOutMag[t] == 5) {
      left_OutcomeStim.push(outcomeDir+"reward_5/counterBalance_" + cb_assignment + "/instr_win_MR_l.png");
    } else if (mid_instrOutMag[t] == 10) {
      left_OutcomeStim.push(outcomeDir+"reward_10/counterBalance_" + cb_assignment + "/instr_win_MR_l.png");
    }
    if (right_instrOutMag[t] == 0) {
      right_OutcomeStim.push(outcomeDir+"reward_0/counterBalance_" + cb_assignment + "/instr_win_MR_r.png");
    } else if (right_instrOutMag[t] == 2) {
      right_OutcomeStim.push(outcomeDir+"reward_2/counterBalance_" + cb_assignment + "/instr_win_MR_r.png");
    } else if (right_instrOutMag[t] == 5) {
      right_OutcomeStim.push(outcomeDir+"reward_5/counterBalance_" + cb_assignment + "/instr_win_MR_r.png");
    } else if (right_instrOutMag[t] == 10) {
      right_OutcomeStim.push(outcomeDir+"reward_10/counterBalance_" + cb_assignment + "/instr_win_MR_r.png");
    }
  }
}
// Preload images
jsPsych.pluginAPI.preloadImages(left_OutcomeStim)
jsPsych.pluginAPI.preloadImages(right_OutcomeStim)



// EXTINCTION SECTION
// Assign active doors (LM/LR/MR) across trials
var extinct_shuffled_trialDoors = jsPsych.randomization.shuffle([].concat.apply([], Array(numExtinctTrials/door_permute.length).fill(door_permute)));

// Set up the doors (2/3) that are active on each extinction trial
var extinct_activeDoors = [];
for (t = 0; t < numExtinctTrials; t++) {
  if (extinct_shuffled_trialDoors[t] == "LM") {
    extinct_activeDoors.push(instr_active_LM)
  } else if (extinct_shuffled_trialDoors[t] == "LR") {
    extinct_activeDoors.push(instr_active_LR)
  } else if (extinct_shuffled_trialDoors[t] == "MR") {
    extinct_activeDoors.push(instr_active_MR)
  }
}
// Set up the response indicators for each extinction trial_leftResp
var extinct_leftResp = [];
var extinct_rightResp = [];
for (t = 0; t < numExtinctTrials; t++) {
  if (extinct_shuffled_trialDoors[t] == "LM") {
    extinct_leftResp.push(instr_choice_LM[0])
    extinct_rightResp.push(instr_choice_LM[1])
  } else if (extinct_shuffled_trialDoors[t] == "LR") {
    extinct_leftResp.push(instr_choice_LR[0])
    extinct_rightResp.push(instr_choice_LR[1])
  } else if (extinct_shuffled_trialDoors[t] == "MR") {
    extinct_leftResp.push(instr_choice_MR[0])
    extinct_rightResp.push(instr_choice_MR[1])
  }
}

// Define extinction outcome_slides
var extinct_Outcome_LM = Array(choice_options.length).fill(0);
var extinct_Outcome_LR = Array(choice_options.length).fill(0);
var extinct_Outcome_MR = Array(choice_options.length).fill(0);
for (c = 0; c < choice_options.length; c++) {
  extinct_Outcome_LM[c] = [extinctDir+"instr_extinct_LM_" + choice_options[c] + ".png"];
  extinct_Outcome_LR[c] = [extinctDir+"instr_extinct_LR_" + choice_options[c] + ".png"];
  extinct_Outcome_MR[c] = [extinctDir+"instr_extinct_MR_" + choice_options[c] + ".png"];
}
jsPsych.pluginAPI.preloadImages(extinct_Outcome_LM)
jsPsych.pluginAPI.preloadImages(extinct_Outcome_LR)
jsPsych.pluginAPI.preloadImages(extinct_Outcome_MR)
// Set up extinction 'response' images, conditional on active doors and responses
var extinct_leftOutcome = [];
var extinct_rightOutcome = [];
for (t = 0; t < numExtinctTrials; t++) {
  if (extinct_shuffled_trialDoors[t] == "LM") {
    extinct_leftOutcome.push(extinct_Outcome_LM[0])
    extinct_rightOutcome.push(extinct_Outcome_LM[1])
  } else if (extinct_shuffled_trialDoors[t] == "LR") {
    extinct_leftOutcome.push(extinct_Outcome_LR[0])
    extinct_rightOutcome.push(extinct_Outcome_LR[1])
  } else if (extinct_shuffled_trialDoors[t] == "MR") {
    extinct_leftOutcome.push(extinct_Outcome_MR[0])
    extinct_rightOutcome.push(extinct_Outcome_MR[1])
  }
}

// PAVLOVIAN SECTION
// Preload static pavlovian images (hall and ISI)
var pav_start = [pavDir+"pav_start_screen.png"];
var pavHall = [pavDir + "pav_hall.png"]
var pavISI = [pavDir + "pav_darkISI.png"]
var pavCheck_prompt = [pavDir + "pavCheck_prompt.png"]

// Loop through and define different pav stimuli and assoc. outcomes
var pavStims = [];
var pavOutcomes = [];
var pavOutBool = [];
var pavOutcome_colour = [];
var pavStim_ID = [];
// Code for 2 CS (v0_3, v0_5)
var cs1_idx = getRandomIntInclusive(1,2);
var cs2_idx = getRandomIntInclusive(1,2);
while (cs1_idx == cs2_idx) {
  var cs2_idx = getRandomIntInclusive(1,2);
}
for (rep = 0; rep < Math.floor(numPavTrials/numPavStim); rep++) {
  // Assign pavlovian stim slides
  pavStims.push(pavDir+"cs"+(cs1_idx)+"_blank.png");
  pavStims.push(pavDir+"cs"+(cs2_idx)+"_blank.png");
  // Assign pavlovian outcome slides
  pavOutcomes.push(pavDir+"cs"+(cs1_idx)+"_"+pavOldColour+".png");
  pavOutcomes.push(pavDir+"cs"+(cs2_idx)+"_blank.png");
  // Create boolean for accumulating pavNet points
  pavOutBool.push(true)
  pavOutBool.push(false)
  // record pavolivan outcome colours
  pavOutcome_colour.push(pavOldColour)
  pavOutcome_colour.push('blank')
  // record pavlovian stims (to identify CS+, CS-)
  pavStim_ID.push("cs"+(cs1_idx));
  pavStim_ID.push("cs"+(cs2_idx));
};

jsPsych.pluginAPI.preloadImages(pavStims)
jsPsych.pluginAPI.preloadImages(pavOutcomes)
// Yoke shuffled pavlovian CS stims and assoc. outcome coin colours
jointShuffle(pavStims, pavOutcomes, pavOutBool, pavOutcome_colour, pavStim_ID);

// Identify which colours (and yoked Pav stims) are instr_high_uncertain, instr_high_certain, instr_low, or pav_new
if (leftLowOut == true) {
  var instr_low = leftOutColour;
} else if (midLowOut == true) {
  var instr_low = midOutColour;
} else if (rightLowOut == true) {
  var instr_low = rightOutColour;
}
if (leftUncertOut == true) {
  var instr_high_uncert = leftOutColour;
} else if (midUncertOut == true) {
  var instr_high_uncert = midOutColour;
} else if (rightUncertOut == true) {
  var instr_high_uncert = rightOutColour;
}
if (leftCertOut == true) {
  var instr_high_cert = leftOutColour;
} else if (midCertOut == true) {
  var instr_high_cert = midOutColour;
} else if (rightCertOut == true) {
  var instr_high_cert = rightOutColour;
}

// Create array denoting which outcome condition is presented on each pavlovian trial
var trial_PavOutcomeCondition = Array(numPavTrials).fill(0);
for (t = 0; t < numPavTrials; t++) {
  if (pavOutcome_colour[t] == instr_low) {
    trial_PavOutcomeCondition[t] = "instr_low";
  } else if (pavOutcome_colour[t] == instr_high_uncert) {
    trial_PavOutcomeCondition[t] = "instr_high_uncert";
  } else if (pavOutcome_colour[t] == instr_high_cert) {
    trial_PavOutcomeCondition[t] = "instr_high_cert";
  }
}

// Preload pavlovian choice check slides
var pavChoices = [];
pavChoices.push(pavDir+"cs"+(cs1_idx)+"_pavCheck.png");
pavChoices.push(pavDir+"cs"+(cs2_idx)+"_pavCheck.png");
jsPsych.pluginAPI.preloadImages(pavChoices);
jointShuffle(pavChoices);


// TRANSFER SECTION
// Create array of 24 high-door, 12 low-door pairings (x2 CS)
if (leftLowOut) {
  highDoor_array = Array(numPITtrials / numPavStim * (2/door_permute.length)).fill("MR")
  lowDoor_array1 = Array(numPITtrials / numPavStim * ((door_permute.length - 2)/door_permute.length)/2).fill("LM")
  lowDoor_array2 = Array(numPITtrials / numPavStim * ((door_permute.length - 2)/door_permute.length)/2).fill("LR")
} else if (midLowOut) {
  highDoor_array = Array(numPITtrials / numPavStim * (2/door_permute.length)).fill("LR")
  lowDoor_array1 = Array(numPITtrials / numPavStim * ((door_permute.length - 2)/door_permute.length)/2).fill("LM")
  lowDoor_array2 = Array(numPITtrials / numPavStim * ((door_permute.length - 2)/door_permute.length)/2).fill("MR")
} else if (rightLowOut) {
  highDoor_array = Array(numPITtrials / numPavStim * (2/door_permute.length)).fill("LM")
  lowDoor_array1 = Array(numPITtrials / numPavStim * ((door_permute.length - 2)/door_permute.length)/2).fill("MR")
  lowDoor_array2 = Array(numPITtrials / numPavStim * ((door_permute.length - 2)/door_permute.length)/2).fill("LR")
}

// Assign transfer shuffled doors
var pit_shuffled_trialDoors = [].concat.apply([],Array(2).fill(highDoor_array.concat(lowDoor_array1).concat(lowDoor_array2)));

// Loop through and define different PIT stimuli and assoc. responses
var pit_blank = [];
var pit_active = [];
var pit_leftResp = [];
var pit_rightResp = [];
var pit_leftOutcome = [];
var pit_rightOutcome = [];
var pit_trialCondition = [];

// First randomise the order of the CS presentation
var pit_CSorder = [].concat.apply([], Array(numPITtrials/numPavStim).fill(cs1_idx).concat(Array(numPITtrials/numPavStim).fill(cs2_idx)));

// Assign the trial-wise stims
for (t = 0; t < numPITtrials; t++) {
  var curr_pitCS = pit_CSorder[t];
  var curr_pitDoors = pit_shuffled_trialDoors[t];
  // Assign PIT blank slides
  pit_blank.push(pitDir+"PIT_cs"+curr_pitCS+"_blank.png");
  // Assign PIT active slides
  pit_active.push(pitDir+"PIT_cs"+curr_pitCS+"_active_"+curr_pitDoors+".png");
  // Assign PIT response slides
  pit_leftResp.push(pitDir+"PIT_cs"+curr_pitCS+"_choice_"+curr_pitDoors+"_l.png");
  pit_rightResp.push(pitDir+"PIT_cs"+curr_pitCS+"_choice_"+curr_pitDoors+"_r.png");
  // Assign PIT outcome outcome slides
  pit_leftOutcome.push(pitDir+"PIT_cs"+curr_pitCS+"_extinct_"+curr_pitDoors+"_l.png");
  pit_rightOutcome.push(pitDir+"PIT_cs"+curr_pitCS+"_extinct_"+curr_pitDoors+"_r.png");
  // Create vector of what PIT condition the trial is in
  if (curr_pitCS == cs1_idx) {
    pit_trialCondition.push("cs" + cs1_idx + "_cs+")
  } else if (curr_pitCS == cs2_idx) {
    pit_trialCondition.push("cs" + cs2_idx + "_cs-")
  }
}
jsPsych.pluginAPI.preloadImages(pit_blank)
jsPsych.pluginAPI.preloadImages(pit_active)
jsPsych.pluginAPI.preloadImages(pit_leftResp)
jsPsych.pluginAPI.preloadImages(pit_rightResp)
jsPsych.pluginAPI.preloadImages(pit_leftOutcome)
jsPsych.pluginAPI.preloadImages(pit_rightOutcome)
// Shuffle the PIT trials
jointShuffle(pit_shuffled_trialDoors, pit_CSorder, pit_blank, pit_active, pit_leftResp, pit_rightResp, pit_leftOutcome, pit_rightOutcome, pit_trialCondition);

// The extinct (non-PIT) trials are distributed along the PIT section according
// to ceil(exp(trialBin * -0.5)*(binSize-1))
var pitBins = arange(0,numPITtrials/pitBinSize-1,1,0);
var extinctDistr = [];
var newCount = [];
var counter = 0;
for (e = 0; e < pitBins.length; e++) {
  var newCount = Math.ceil(Math.exp(pitBins[e]*-0.5)*(pitBinSize-1));
  counter = counter + newCount;
  if (counter < numExtinctTrials + 1) {
    extinctDistr.push(newCount);
  } else if ((counter > numExtinctTrials) && (arrSum(extinctDistr) < numExtinctTrials)) {
    extinctDistr.push(numExtinctTrials - arrSum(extinctDistr));
  } else {
    extinctDistr.push(0);
  }
}

// Insert extinction Trials
// Initialize array that guarantees first trials in PIT section are all extinction (non-PIT) trials
var pitExtinctBool = Array(extinctDistr[0]).fill(1).concat(Array(pitBinSize).fill(0));
// Then loop through and shuffle the number of extinct trials in each PIT-section bin, according to extinctDistr
for (b = 1; b < pitBins.length; b++) {
  currBin = [];
  currBin = Array(extinctDistr[b]).fill(1).concat(Array(pitBinSize).fill(0));
  jointShuffle(currBin);
  pitExtinctBool = pitExtinctBool.concat(currBin);
}

// Insert paths to the extinction images for where pitExtinctBool == 1
for (i = 0; i < indexOfAll(pitExtinctBool,1).length; i++) {
  currIndex = [];
  currIndex = indexOfAll(pitExtinctBool,1)[i];
  pit_shuffled_trialDoors.splice(currIndex,0,extinct_shuffled_trialDoors[i]);
  pit_blank.splice(currIndex,0,instr_blank[0]);
  pit_active.splice(currIndex,0,extinct_activeDoors[i][0]);
  pit_leftResp.splice(currIndex,0,extinct_leftResp[i][0]);
  pit_rightResp.splice(currIndex,0,extinct_rightResp[i][0]);
  pit_leftOutcome.splice(currIndex,0,extinct_leftOutcome[i][0]);
  pit_rightOutcome.splice(currIndex,0,extinct_rightOutcome[i][0]);
  pit_trialType.splice(currIndex,0,'extinct');
  pit_trialCondition.splice(currIndex,0,'extinct')
}
// Specify which keys are allowable given the active doors on each trial
var pit_allowable_keys = []
var pit_left_allowableKey = []
var pit_right_allowableKey = []
for (t = 0; t < numPITtrials + numExtinctTrials; t++) {
  if (pit_shuffled_trialDoors[t] == "LM") {
    pit_allowable_keys.push([jsPsych.pluginAPI.convertKeyCharacterToKeyCode('1'),jsPsych.pluginAPI.convertKeyCharacterToKeyCode('2')])
    pit_left_allowableKey.push(jsPsych.pluginAPI.convertKeyCharacterToKeyCode('1'))
    pit_right_allowableKey.push(jsPsych.pluginAPI.convertKeyCharacterToKeyCode('2'))
  } else if (pit_shuffled_trialDoors[t] == "LR") {
    pit_allowable_keys.push([jsPsych.pluginAPI.convertKeyCharacterToKeyCode('1'),jsPsych.pluginAPI.convertKeyCharacterToKeyCode('3')])
    pit_left_allowableKey.push(jsPsych.pluginAPI.convertKeyCharacterToKeyCode('1'))
    pit_right_allowableKey.push(jsPsych.pluginAPI.convertKeyCharacterToKeyCode('3'))
  } else if (pit_shuffled_trialDoors[t] == "MR") {
    pit_allowable_keys.push([jsPsych.pluginAPI.convertKeyCharacterToKeyCode('2'),jsPsych.pluginAPI.convertKeyCharacterToKeyCode('3')])
    pit_left_allowableKey.push(jsPsych.pluginAPI.convertKeyCharacterToKeyCode('2'))
    pit_right_allowableKey.push(jsPsych.pluginAPI.convertKeyCharacterToKeyCode('3'))
  }
}


// Preload the end of instructions slide
var instruct_end = [instructDir + "instruct_end.png"]
jsPsych.pluginAPI.preloadImages(instruct_end)

// Preload the end of task slide
var task_end = ["/static/images/task_end.png"]
jsPsych.pluginAPI.preloadImages(task_end)
