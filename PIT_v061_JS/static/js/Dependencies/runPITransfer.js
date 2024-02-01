// PIT trials
// Create timeline variable
var pitTimeline_var = [];
for (var trial = 0; trial < numPITtrials + numExtinctTrials; trial++) {
  pitTimeline_var.push({
    tv_blankDoors: pit_blank[trial],
    tv_activeDoors: pit_active[trial],
    tv_leftAllowable: pit_left_allowableKey[trial],
    tv_rightAllowable: pit_right_allowableKey[trial],
    tv_left_ResponseStim: pit_leftResp[trial],
    tv_right_ResponseStim: pit_rightResp[trial],
    tv_left_OutcomeStim: pit_leftOutcome[trial],
    tv_right_OutcomeStim: pit_rightOutcome[trial], // end of path-specifying vars
    tv_trialDoor_condition: pit_shuffled_trialDoors[trial],
    tv_pitCS_condition: pit_trialCondition[trial],
    tv_pitITIdur: pitITIdur[trial],
    tv_trialType: pit_trialType[trial],
    tv_trialNo: "pit_"+(trial+1),
  });
}

var pitStart = {
  type: "image-keyboard-response",
  choices: ['space'],
  stimulus: instr_start,
  response_ends_trial: true,
  data: {
    label: "pit start",
  },
};

var pit_pre_iti = {
  type: "image-keyboard-response",
  stimulus: iti_page,
  choices: jsPsych.NO_KEYS,
  trial_duration: jsPsych.timelineVariable("tv_pitITIdur"),
  response_ends_trial: false,
  data: {label: "pit_pre_iti",
        trialCondition: jsPsych.timelineVariable("tv_pitCS_condition"),
        trialDoor: jsPsych.timelineVariable("tv_trialDoor_condition"),
        leftAllowKey: jsPsych.timelineVariable("tv_leftAllowable"),
        rightAllowKey: jsPsych.timelineVariable("tv_rightAllowable"),
        trialType: jsPsych.timelineVariable("tv_trialType"),
        trialNo: jsPsych.timelineVariable("tv_trialNo")
      },
};

var pit_trial_start = {
  type: "image-keyboard-response",
  choices: jsPsych.NO_KEYS,
  stimulus: jsPsych.timelineVariable("tv_blankDoors"),
  trial_duration: startDur,
  response_ends_trial: false,
  data: {label: "pit_trial_start"},
  on_finish: function(data) {
    var prev_data = jsPsych.data.get().last(2).values()[0];
    data.trialDoor = prev_data.trialDoor
    data.leftAllowKey = prev_data.leftAllowKey
    data.rightAllowKey = prev_data.rightAllowKey
  }
};

var pit_cue_on = {
  type: "image-keyboard-response",
  choices: function(data) {
    var prev_data = jsPsych.data.get().last(2).values()[0];
    return [prev_data.leftAllowKey, prev_data.rightAllowKey]
  },
  stimulus: jsPsych.timelineVariable("tv_activeDoors"),
  trial_duration: cueDur,
  response_ends_trial: true,
  data: {label: "pit_cue_on"},
  on_finish: function(data) {
    var prev_data = jsPsych.data.get().last(2).values()[0];
    data.trialDoor = prev_data.trialDoor
    data.leftAllowKey = prev_data.leftAllowKey
    data.rightAllowKey = prev_data.rightAllowKey
    data.respKey = jsPsych.pluginAPI.convertKeyCodeToKeyCharacter(data.key_press)
  }
};

var pit_left_response = {
  type: "image-keyboard-response",
  choices: jsPsych.NO_KEYS,
  stimulus: jsPsych.timelineVariable("tv_left_ResponseStim"),
  trial_duration: function() { // filling up remainder of time window based on RT
    var prev_data = jsPsych.data.get().last(2).values()[0];
    return (cueDur-prev_data.rt+ISIdur);
  },
  response_ends_trial: false,
  data: {label: "pit_left_response"},
  on_finish: function(data) {
    var prev_data = jsPsych.data.get().last(2).values()[0];
    data.trialDoor = prev_data.trialDoor
    data.leftAllowKey = prev_data.leftAllowKey
    data.rightAllowKey = prev_data.rightAllowKey
  }
}

var pit_right_response = {
  type: "image-keyboard-response",
  choices: jsPsych.NO_KEYS,
  stimulus: jsPsych.timelineVariable("tv_right_ResponseStim"),
  trial_duration: function() { // filling up remainder of time window based on RT
    var prev_data = jsPsych.data.get().last(2).values()[0];
    return (cueDur-prev_data.rt+ISIdur);
  },
  response_ends_trial: false,
  data: {label: "pit_right_response"},
  on_finish: function(data) {
    var prev_data = jsPsych.data.get().last(2).values()[0];
    data.trialDoor = prev_data.trialDoor
    data.leftAllowKey = prev_data.leftAllowKey
    data.rightAllowKey = prev_data.rightAllowKey
  }
};

var pit_no_response = {
  type: 'html-keyboard-response',
  choices: jsPsych.NO_KEYS,
  stimulus: "<p>Too slow to respond!</p>",
  trial_duration: ISIdur + outDur,
  response_ends_trial: false,
  data: {label: "NA"},
  on_finish: function(data) {
    var prev_data = jsPsych.data.get().last(2).values()[0];
    data.trialDoor = prev_data.trialDoor
    data.leftAllowKey = prev_data.leftAllowKey
    data.rightAllowKey = prev_data.rightAllowKey
  }
};

var pit_leftOutcome = {
  type: "image-keyboard-response",
  choices: jsPsych.NO_KEYS,
  stimulus: jsPsych.timelineVariable("tv_left_OutcomeStim"),
  trial_duration: outDur,
  response_ends_trial: false,
  data: {label: "left pit_leftOutcome"},
  on_finish: function(data) {
    var prev_data = jsPsych.data.get().last(2).values()[0];
    data.trialDoor = prev_data.trialDoor
    data.leftAllowKey = prev_data.leftAllowKey
    data.rightAllowKey = prev_data.rightAllowKey
  }
};

var pit_rightOutcome = {
  type: "image-keyboard-response",
  choices: jsPsych.NO_KEYS,
  stimulus: jsPsych.timelineVariable("tv_right_OutcomeStim"),
  trial_duration: outDur,
  response_ends_trial: false,
  data: {label: "right pit_rightOutcome"},
  on_finish: function(data) {
    var prev_data = jsPsych.data.get().last(2).values()[0];
    data.trialDoor = prev_data.trialDoor
    data.leftAllowKey = prev_data.leftAllowKey
    data.rightAllowKey = prev_data.rightAllowKey
  }
};

// ifnode - conditional to determine whether mini-timeline is run
// ifnode must come after the events called in the mini-timeline
var pit_leftResp_ifNode = {
  timeline: [pit_left_response, pit_leftOutcome],
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
var pit_rightResp_ifNode = {
  timeline: [pit_right_response, pit_rightOutcome],
  conditional_function: function() {
    var prev_data = jsPsych.data.get().last(1).values()[0];
    if (prev_data.key_press == prev_data.rightAllowKey) {
      return true;
    } else {
      return false;
    }
  }
};

var pit_noResp_ifNode = {
  timeline: [pit_no_response],
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
var pit_trialProcedure = {
  timeline: [pit_pre_iti, pit_trial_start, pit_cue_on, pit_leftResp_ifNode, pit_rightResp_ifNode, pit_noResp_ifNode],
  timeline_variables: pitTimeline_var,
};
