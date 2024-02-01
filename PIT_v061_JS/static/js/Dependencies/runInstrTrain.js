// Instrumental trials
// Create timeline variable
var instrTimeline_var = [];
for (var trial = 0; trial < numInstrTrials; trial++) {
  instrTimeline_var.push({
    tv_activeDoors: trial_activeDoors[trial],
    tv_leftAllowable: left_allowableKey[trial],
    tv_rightAllowable: right_allowableKey[trial],
    tv_left_ResponseStim: trial_leftResp[trial],
    tv_right_ResponseStim: trial_rightResp[trial],
    tv_left_OutcomeStim: left_OutcomeStim[trial],
    tv_right_OutcomeStim: right_OutcomeStim[trial], // end of path-specifying vars
    tv_trialDoor_condition: shuffled_trialDoors[trial],
    tv_left_instrOutMag: left_instrOutMag[trial],
    tv_mid_instrOutMag: mid_instrOutMag[trial],
    tv_right_instrOutMag: right_instrOutMag[trial],
    tv_left_OutcomeColour: leftOutColour_array[trial],
    tv_mid_OutcomeColour: midOutColour_array[trial],
    tv_right_OutcomeColour: rightOutColour_array[trial],
    tv_lowOutIdx: lowOutIdx_array[trial],
    tv_uncertOutIdx: uncertOutIdx_array[trial],
    tv_certOutIdx: certOutIdx_array[trial],
    tv_instrITIdur: instrITIdur[trial],
    tv_lowOutSide: lowOutSide[trial],
    tv_trialType: instr_trialType[trial],
    tv_trialNo: "instr_"+(trial+1),
  });
}

var instrStart = {
  type: "image-keyboard-response",
  choices: ['space'],
  stimulus: instr_start,
  response_ends_trial: true,
  data: {
    label: "instrumental start",
    instrNet: 0 // tracking total winnings
  },
  on_finish: function(data) {
    data.leftNet = 0
    data.midNet = 0
    data.rightNet = 0
  }
};

var pre_iti = {
  type: "image-keyboard-response",
  stimulus: iti_page,
  choices: jsPsych.NO_KEYS,
  trial_duration: jsPsych.timelineVariable("tv_instrITIdur"),
  response_ends_trial: false,
  data: {label: "pre_iti",
        trialDoor: jsPsych.timelineVariable("tv_trialDoor_condition"),
        leftAllowKey: jsPsych.timelineVariable("tv_leftAllowable"),
        rightAllowKey: jsPsych.timelineVariable("tv_rightAllowable"),
        leftCoinColour: jsPsych.timelineVariable("tv_left_OutcomeColour"),
        midCoinColour: jsPsych.timelineVariable("tv_mid_OutcomeColour"),
        rightCoinColour: jsPsych.timelineVariable("tv_right_OutcomeColour"),
        lowOutIdx: jsPsych.timelineVariable("tv_lowOutIdx"),
        uncertOutIdx: jsPsych.timelineVariable("tv_uncertOutIdx"),
        certOutIdx: jsPsych.timelineVariable("tv_certOutIdx"),   
        leftOutMag: jsPsych.timelineVariable("tv_left_instrOutMag"),
        midOutMag: jsPsych.timelineVariable("tv_mid_instrOutMag"),
        rightOutMag: jsPsych.timelineVariable("tv_right_instrOutMag"),
        lowOutSide: jsPsych.timelineVariable("tv_lowOutSide"),
        trialType: jsPsych.timelineVariable("tv_trialType"),
        trialNo: jsPsych.timelineVariable("tv_trialNo")
      },
  on_finish: function(data) {
    var prev_data = jsPsych.data.get().last(2).values()[0];
    data.instrNet = prev_data.instrNet
    data.leftNet = prev_data.leftNet
    data.midNet = prev_data.midNet
    data.rightNet = prev_data.rightNet
  }
};

var trial_start = {
  type: "image-keyboard-response",
  choices: jsPsych.NO_KEYS,
  stimulus: instr_blank,
  trial_duration: startDur,
  response_ends_trial: false,
  data: {label: "trial_start"},
  on_finish: function(data) {
    var prev_data = jsPsych.data.get().last(2).values()[0];
    data.instrNet = prev_data.instrNet
    data.leftNet = prev_data.leftNet
    data.midNet = prev_data.midNet
    data.rightNet = prev_data.rightNet
    data.trialDoor = prev_data.trialDoor
    data.leftAllowKey = prev_data.leftAllowKey
    data.rightAllowKey = prev_data.rightAllowKey
  }
};

var cue_on = {
  type: "image-keyboard-response",
  choices: function(data) {
    var prev_data = jsPsych.data.get().last(2).values()[0];
    return [prev_data.leftAllowKey, prev_data.rightAllowKey]
  },
  stimulus: jsPsych.timelineVariable("tv_activeDoors"),
  trial_duration: cueDur,
  response_ends_trial: true,
  data: {label: "cue_on"},
  on_finish: function(data) {
    var prev_data = jsPsych.data.get().last(2).values()[0];
    data.instrNet = prev_data.instrNet
    data.leftNet = prev_data.leftNet
    data.midNet = prev_data.midNet
    data.rightNet = prev_data.rightNet
    data.trialDoor = prev_data.trialDoor
    data.leftAllowKey = prev_data.leftAllowKey
    data.rightAllowKey = prev_data.rightAllowKey
    data.respKey = jsPsych.pluginAPI.convertKeyCodeToKeyCharacter(data.key_press)
  }
};

var left_response = {
  type: "image-keyboard-response",
  choices: jsPsych.NO_KEYS,
  stimulus: jsPsych.timelineVariable("tv_left_ResponseStim"),
  trial_duration: function() { // filling up remainder of time window based on RT
    var prev_data = jsPsych.data.get().last(2).values()[0];
    return (cueDur-prev_data.rt+ISIdur);
  },
  response_ends_trial: false,
  data: {label: "left_response"},
  on_finish: function(data) {
    var prev_data = jsPsych.data.get().last(2).values()[0];
    data.instrNet = prev_data.instrNet
    data.leftNet = prev_data.leftNet
    data.midNet = prev_data.midNet
    data.rightNet = prev_data.rightNet
    data.trialDoor = prev_data.trialDoor
    data.leftAllowKey = prev_data.leftAllowKey
    data.rightAllowKey = prev_data.rightAllowKey
  }
}

var right_response = {
  type: "image-keyboard-response",
  choices: jsPsych.NO_KEYS,
  stimulus: jsPsych.timelineVariable("tv_right_ResponseStim"),
  trial_duration: function() { // filling up remainder of time window based on RT
    var prev_data = jsPsych.data.get().last(2).values()[0];
    return (cueDur-prev_data.rt+ISIdur);
  },
  response_ends_trial: false,
  data: {label: "right_response"},
  on_finish: function(data) {
    var prev_data = jsPsych.data.get().last(2).values()[0];
    data.instrNet = prev_data.instrNet
    data.leftNet = prev_data.leftNet
    data.midNet = prev_data.midNet
    data.rightNet = prev_data.rightNet
    data.trialDoor = prev_data.trialDoor
    data.leftAllowKey = prev_data.leftAllowKey
    data.rightAllowKey = prev_data.rightAllowKey
  }
};

var no_response = {
  type: 'html-keyboard-response',
  choices: jsPsych.NO_KEYS,
  stimulus: "<p>Too slow to respond!</p>",
  trial_duration: ISIdur + outDur,
  response_ends_trial: false,
  data: {label: "NA"},
  on_finish: function(data) {
    var prev_data = jsPsych.data.get().last(2).values()[0];
    data.instrNet = prev_data.instrNet
    data.leftNet = prev_data.leftNet
    data.midNet = prev_data.midNet
    data.rightNet = prev_data.rightNet
    data.trialDoor = prev_data.trialDoor
    data.leftAllowKey = prev_data.leftAllowKey
    data.rightAllowKey = prev_data.rightAllowKey
  }
};

var leftOutcome = {
  type: "image-keyboard-response",
  choices: jsPsych.NO_KEYS,
  stimulus: jsPsych.timelineVariable("tv_left_OutcomeStim"),
  trial_duration: outDur,
  response_ends_trial: false,
  data: {label: "left outcome",
        leftMag: jsPsych.timelineVariable("tv_left_instrOutMag"),
        midMag: jsPsych.timelineVariable("tv_mid_instrOutMag")
      },
  on_finish: function(data) {
    var prev_data = jsPsych.data.get().last(2).values()[0];
    data.trialDoor = prev_data.trialDoor
    data.leftAllowKey = prev_data.leftAllowKey
    data.rightAllowKey = prev_data.rightAllowKey
    // Define the outcome magnitude
    data.leftNet = prev_data.leftNet
    data.midNet = prev_data.midNet
    data.rightNet = prev_data.rightNet
    if (data.trialDoor == "LM") {
      data.outMag = data.leftMag
      data.leftNet = data.leftNet + data.leftMag
    } else if (data.trialDoor == "LR") {
      data.outMag = data.leftMag
      data.leftNet = data.leftNet + data.leftMag
    } else if (data.trialDoor = "MR") {
      data.outMag = data.midMag
      data.midNet = data.midNet + data.midMag
    }
    // Update iterative variables (net gains)
    data.instrNet = prev_data.instrNet + data.outMag
  }
};

var rightOutcome = {
  type: "image-keyboard-response",
  choices: jsPsych.NO_KEYS,
  stimulus: jsPsych.timelineVariable("tv_right_OutcomeStim"),
  trial_duration: outDur,
  response_ends_trial: false,
  data: {label: "right outcome",
         midMag: jsPsych.timelineVariable("tv_mid_instrOutMag"),
         rightMag: jsPsych.timelineVariable("tv_right_instrOutMag")
       },
  on_finish: function(data) {
    var prev_data = jsPsych.data.get().last(2).values()[0];
    data.trialDoor = prev_data.trialDoor
    data.leftAllowKey = prev_data.leftAllowKey
    data.rightAllowKey = prev_data.rightAllowKey
    // Define the outcome magnitude
    data.leftNet = prev_data.leftNet
    data.midNet = prev_data.midNet
    data.rightNet = prev_data.rightNet
    if (data.trialDoor == "LM") {
      data.outMag = data.midMag
      data.midNet = data.midNet + data.midMag
    } else if (data.trialDoor == "LR") {
      data.outMag = data.rightMag
      data.rightNet = data.rightNet + data.rightMag
    } else if (data.trialDoor = "MR") {
      data.outMag = data.rightMag
      data.rightNet = data.rightNet + data.rightMag
    }
    // Update iterative variables (net gains)
    data.instrNet = prev_data.instrNet + data.outMag
  }
};

// ifnode - conditional to determine whether mini-timeline is run
// ifnode must come after the events called in the mini-timeline
var leftResp_ifNode = {
  timeline: [left_response, leftOutcome],
  conditional_function: function() {
    var prev_data = jsPsych.data.get().last(1).values()[0];
    if (prev_data.key_press == prev_data.leftAllowKey) {
      return true;
    } else {
      return false;
    }
  }
};
// ifnode - conditional to determine whether mini-timeline is run
// ifnode must come after the events called in the mini-timeline
var rightResp_ifNode = {
  timeline: [right_response, rightOutcome],
  conditional_function: function() {
    var prev_data = jsPsych.data.get().last(1).values()[0];
    if (prev_data.key_press == prev_data.rightAllowKey) {
      return true;
    } else {
      return false;
    }
  }
};

var noResp_ifNode = {
  timeline: [no_response],
  conditional_function: function(data) {
    var prev_data = jsPsych.data.get().last(3).values()[0];
    if (prev_data.key_press == null) {
      return true;
    } else {
      return false;
    }
  }
};

// timeline for one trial, combine ifnodes and fixed events
var instr_trialProcedure = {
  timeline: [pre_iti, trial_start, cue_on, leftResp_ifNode, rightResp_ifNode, noResp_ifNode],
  timeline_variables: instrTimeline_var,
};
