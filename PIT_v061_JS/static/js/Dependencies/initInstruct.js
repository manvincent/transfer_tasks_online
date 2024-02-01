// Specify instruction keys
var choice_keys = {
    "prev": jsPsych.pluginAPI.convertKeyCharacterToKeyCode('leftarrow'),
    "next": jsPsych.pluginAPI.convertKeyCharacterToKeyCode('rightarrow'),
    "one": jsPsych.pluginAPI.convertKeyCharacterToKeyCode('1'),
    "two": jsPsych.pluginAPI.convertKeyCharacterToKeyCode('2'),
    "three": jsPsych.pluginAPI.convertKeyCharacterToKeyCode('3'),
    "space": jsPsych.pluginAPI.convertKeyCharacterToKeyCode('space')
};

// pages from which key(s) other than left/right arrows are used for flipping slides
var instr_except_pages = {
    1: [choice_keys.next],
    13: [choice_keys.three, choice_keys.prev],
    18: [choice_keys.one, choice_keys.prev],
    19: [choice_keys.next],
    20: [choice_keys.next],
    22: [choice_keys.two, choice_keys.prev],
    23: [choice_keys.next],
    24: [choice_keys.next],
    32: [choice_keys.three],
    33: [choice_keys.space]
};
let prev_next = [choice_keys.next, choice_keys.prev];
var instr_choiceKey_array = [];   // array holding valid keys for each instruction page

// Preload instrumental instruction slides
var instr_instruct = [];
var instr_instruct_pages = 33
for (s = 0; s < instr_instruct_pages; s++) {
  slideNo = s + 1;

  // add options from exception_pages for instructions with questions
  if (! (slideNo in instr_except_pages)) {
     instr_choiceKey_array.push(prev_next);
  } else {
    instr_choiceKey_array.push(instr_except_pages[slideNo]);
  }

  instr_instruct.push(instructDir + 'instruct_instr/instruct_' + slideNo + '.png');
}
jsPsych.pluginAPI.preloadImages(instr_instruct)




// pages from which key(s) other than left/right arrows are used for flipping slides
var pav_except_pages = {
    2: [choice_keys.next, choice_keys.prev],
    3: [choice_keys.space],
    7: [choice_keys.three],
    8: [choice_keys.space],
    12: [choice_keys.space]
};
let next= [choice_keys.next];
var pav_choiceKey_array = [];   // array holding valid keys for each instruction page

// Preload instrumental instruction slides
var pav_instruct = [];
var pav_instruct_pages = 12
for (s = 0; s < pav_instruct_pages; s++) {
  slideNo = s + 1;

  // add options from exception_pages for instructions with questions
  if (! (slideNo in  pav_except_pages)) {
    pav_choiceKey_array.push(next);
  } else {
    pav_choiceKey_array.push(pav_except_pages[slideNo]);
  }

  pav_instruct.push(instructDir + 'instruct_pav/instruct_' + slideNo + '.png');
}
jsPsych.pluginAPI.preloadImages(pav_instruct)



// pages from which key(s) other than left/right arrows are used for flipping slides
var pit_except_pages = {
    1: [choice_keys.next],
    4: [choice_keys.three, choice_keys.prev],
    5: [choice_keys.next],
    6: [choice_keys.next],
    7: [choice_keys.space]
};
var pit_choiceKey_array = [];   // array holding valid keys for each instruction page

// Preload instrumental instruction slides
var pit_instruct = [];
var pit_instruct_pages = 6
for (s = 0; s < pit_instruct_pages; s++) {
  slideNo = s + 1;

  // add options from exception_pages for instructions with questions
  if (! (slideNo in pit_except_pages)) {
    pit_choiceKey_array.push(prev_next);
  } else {
    pit_choiceKey_array.push(pit_except_pages[slideNo]);
  }

  pit_instruct.push(instructDir + 'instruct_PIT/instruct_' + slideNo + '.png');
}
jsPsych.pluginAPI.preloadImages(pit_instruct)



// Set up practice instrumental trials
// Assign active doors (LM/LR/MR) across trials
var pract_shuffled_trialDoors = jsPsych.randomization.shuffle([].concat.apply([], Array(numPractTrials_instr/door_permute.length).fill(door_permute)));

// Specify which keys are allowable given the active doors on each trial
var pract_allowable_keys = []
for (t = 0; t < numInstrTrials; t++) {
  if (pract_shuffled_trialDoors[t] == "LM") {
    pract_allowable_keys.push([jsPsych.pluginAPI.convertKeyCharacterToKeyCode('1'),jsPsych.pluginAPI.convertKeyCharacterToKeyCode('2')])
  } else if (pract_shuffled_trialDoors[t] == "LR") {
    pract_allowable_keys.push([jsPsych.pluginAPI.convertKeyCharacterToKeyCode('1'),jsPsych.pluginAPI.convertKeyCharacterToKeyCode('3')])
  } else if (pract_shuffled_trialDoors[t] == "MR") {
    pract_allowable_keys.push([jsPsych.pluginAPI.convertKeyCharacterToKeyCode('2'),jsPsych.pluginAPI.convertKeyCharacterToKeyCode('3')])
  }
}

var pract_activeDoors = [];
for (t = 0; t < numPractTrials_instr; t++) {
  if (pract_shuffled_trialDoors[t] == "LM") {
    pract_activeDoors.push(instr_active_LM)
  } else if (pract_shuffled_trialDoors[t] == "LR") {
    pract_activeDoors.push(instr_active_LR)
  } else if (pract_shuffled_trialDoors[t] == "MR") {
    pract_activeDoors.push(instr_active_MR)
  }
}

var pract_trial_leftResp = [];
var pract_trial_rightResp = [];
for (t = 0; t < numPractTrials_instr; t++) {
  if (pract_shuffled_trialDoors[t] == "LM") {
    pract_trial_leftResp.push(instr_choice_LM[0])
    pract_trial_rightResp.push(instr_choice_LM[1])
  } else if (pract_shuffled_trialDoors[t] == "LR") {
    pract_trial_leftResp.push(instr_choice_LR[0])
    pract_trial_rightResp.push(instr_choice_LR[1])
  } else if (pract_shuffled_trialDoors[t] == "MR") {
    pract_trial_leftResp.push(instr_choice_MR[0])
    pract_trial_rightResp.push(instr_choice_MR[1])
  }
}



// Assign  outcome parameters given the left/right -- high/low counterbalance
var pract_left_OutcomeStim = []; // left_* and right_* refer to the response (not the door position)_
var pract_right_OutcomeStim = [];
// Loop through trials and define what the outcome file path is, conditional on active doors, cb, and reward magnitude
for (t = 0; t < numPractTrials_instr; t++) {
  if (t == 4 || t == 10) {
    if (pract_shuffled_trialDoors[t] == "LM") {
      pract_left_OutcomeStim.push(extinctDir+"instr_extinct_LM_l.png");
      pract_right_OutcomeStim.push(extinctDir+"instr_extinct_LM_r.png");
    } else if (pract_shuffled_trialDoors[t] == "LR") {
      pract_left_OutcomeStim.push(extinctDir+"instr_extinct_LR_l.png");
      pract_right_OutcomeStim.push(extinctDir+"instr_extinct_LR_r.png");
    } else if (pract_shuffled_trialDoors[t] == "MR") {
      pract_left_OutcomeStim.push(extinctDir+"instr_extinct_MR_l.png");
      pract_right_OutcomeStim.push(extinctDir+"instr_extinct_MR_r.png");
    }
  } else {
    if (pract_shuffled_trialDoors[t] == "LM") {
      pract_left_OutcomeStim.push(outcomeDir+"practice/instr_win_LM_l.png");
      pract_right_OutcomeStim.push(outcomeDir+"practice/instr_win_LM_r.png");
    } else if (pract_shuffled_trialDoors[t] == "LR") {
      pract_left_OutcomeStim.push(outcomeDir+"practice/instr_win_LR_l.png");
      pract_right_OutcomeStim.push(outcomeDir+"practice/instr_win_LR_r.png");
    } else if (pract_shuffled_trialDoors[t] == "MR") {
      pract_left_OutcomeStim.push(outcomeDir+"practice/instr_win_MR_l.png");
      pract_right_OutcomeStim.push(outcomeDir+"practice/instr_win_MR_r.png");
    }
  }
}
jsPsych.pluginAPI.preloadImages(pract_left_OutcomeStim)
jsPsych.pluginAPI.preloadImages(pract_right_OutcomeStim)


var pract_pavStims = [];
var pract_pavOutcomes = [];
for (rep = 0; rep < numPractTrials_pav; rep++) {
  // Assign pavlovian stim slides
  pract_pavStims.push(pavDir+"cs3_blank.png");
  // Assign pavlovian outcome slides
  pract_pavOutcomes.push(pavDir+"cs3_pract.png");
};
pract_pavOutcomes[numPractTrials_pav-2] = pavDir+"cs3_blank.png"
jsPsych.pluginAPI.preloadImages(pract_pavStims)
jsPsych.pluginAPI.preloadImages(pract_pavOutcomes)
