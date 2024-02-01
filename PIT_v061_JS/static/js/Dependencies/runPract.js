
// Practice Instrumental trials
// Create timeline variable
var pract_instrTimeline_var = [];
for (var trial = 0; trial < numPractTrials_instr; trial++) {
  pract_instrTimeline_var.push({
    tv_activeDoors: pract_activeDoors[trial],
    tv_allowableKeys: pract_allowable_keys[trial],
    tv_left_ResponseStim: pract_trial_leftResp[trial],
    tv_right_ResponseStim: pract_trial_rightResp[trial],
    tv_left_OutcomeStim: pract_left_OutcomeStim[trial],
    tv_right_OutcomeStim: pract_right_OutcomeStim[trial]
  });
}

var pract_pre_iti = {
  type: "image-keyboard-response",
  stimulus: iti_page,
  choices: jsPsych.NO_KEYS,
  trial_duration: 1000,
  response_ends_trial: false,
  data: {label: "pract_pre_iti",
        trialRespKeys: jsPsych.timelineVariable("tv_allowableKeys"),
        trialType: jsPsych.timelineVariable("tv_trialType"),
      }
};

var pract_trial_start = {
  type: "image-keyboard-response",
  choices: jsPsych.NO_KEYS,
  stimulus: instr_blank,
  trial_duration: startDur,
  response_ends_trial: false,
  data: {label: "pract_trial_start"},
  on_finish: function(data) {
    var prev_data = jsPsych.data.get().last(2).values()[0];
    data.trialRespKeys = prev_data.trialRespKeys
  }
};

var pract_cue_on = {
  type: "image-keyboard-response",
  choices: jsPsych.timelineVariable("tv_allowableKeys"),
  stimulus: jsPsych.timelineVariable("tv_activeDoors"),
  trial_duration: cueDur,
  response_ends_trial: true,
  data: {label: "pract_cue_on"},
  on_finish: function(data) {
    var prev_data = jsPsych.data.get().last(2).values()[0];
    data.trialRespKeys = prev_data.trialRespKeys
    data.respKey = jsPsych.pluginAPI.convertKeyCodeToKeyCharacter(data.key_press)
  }
};

var pract_left_response = {
  type: "image-keyboard-response",
  choices: jsPsych.NO_KEYS,
  stimulus: jsPsych.timelineVariable("tv_left_ResponseStim"),
  trial_duration: function() { // filling up remainder of time window based on RT
    var prev_data = jsPsych.data.get().last(2).values()[0];
    return (cueDur-prev_data.rt+ISIdur);
  },
  response_ends_trial: false,
  data: {label: "pract_left_response"},
  on_finish: function(data) {
    var prev_data = jsPsych.data.get().last(2).values()[0];
    data.trialRespKeys = prev_data.trialRespKeys
  }
}

var pract_right_response = {
  type: "image-keyboard-response",
  choices: jsPsych.NO_KEYS,
  stimulus: jsPsych.timelineVariable("tv_right_ResponseStim"),
  trial_duration: function() { // filling up remainder of time window based on RT
    var prev_data = jsPsych.data.get().last(2).values()[0];
    return (cueDur-prev_data.rt+ISIdur);
  },
  response_ends_trial: false,
  data: {label: "pract_right_response"},
  on_finish: function(data) {
    var prev_data = jsPsych.data.get().last(2).values()[0];
    data.trialRespKeys = prev_data.trialRespKeys
  }
};

var pract_no_response = {
  type: 'html-keyboard-response',
  choices: jsPsych.NO_KEYS,
  stimulus: "<p>Too slow to respond!</p>",
  trial_duration: ISIdur + outDur,
  response_ends_trial: false,
  data: {label: "pract_no_response"},
  on_finish: function(data) {
    var prev_data = jsPsych.data.get().last(2).values()[0];
    data.trialRespKeys = prev_data.trialRespKeys
  }
};

var pract_leftOutcome = {
  type: "image-keyboard-response",
  choices: jsPsych.NO_KEYS,
  stimulus: jsPsych.timelineVariable("tv_left_OutcomeStim"),
  trial_duration: outDur,
  response_ends_trial: false,
  data: {label: "pract_leftOutcome",
      },
  on_finish: function(data) {
    var prev_data = jsPsych.data.get().last(2).values()[0];
    data.trialRespKeys = prev_data.trialRespKeys
    // Define the outcome magnitude
  }
};

var pract_rightOutcome = {
  type: "image-keyboard-response",
  choices: jsPsych.NO_KEYS,
  stimulus: jsPsych.timelineVariable("tv_right_OutcomeStim"),
  trial_duration: outDur,
  response_ends_trial: false,
  data: {label: "pract_rightOutcome",
       },
  on_finish: function(data) {
    var prev_data = jsPsych.data.get().last(2).values()[0];
    data.trialRespKeys = prev_data.trialRespKeys
  }
};

// ifnode - conditional to determine whether mini-timeline is run
// ifnode must come after the events called in the mini-timeline
var pract_leftResp_ifNode = {
  timeline: [pract_left_response, pract_leftOutcome],
  conditional_function: function() {
    var prev_data = jsPsych.data.get().last(1).values()[0];
    if (prev_data.key_press == prev_data.trialRespKeys[0]) {
      return true;
    } else {
      return false;
    }
  }
};
// ifnode - conditional to determine whether mini-timeline is run
// ifnode must come after the events called in the mini-timeline
var pract_rightResp_ifNode = {
  timeline: [pract_right_response, pract_rightOutcome],
  conditional_function: function() {
    var prev_data = jsPsych.data.get().last(1).values()[0];
    if (prev_data.key_press == prev_data.trialRespKeys[1]) {
      return true;
    } else {
      return false;
    }
  }
};

var pract_noResp_ifNode = {
  timeline: [pract_no_response],
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
var pract_trialProcedure = {
  timeline: [pract_pre_iti, pract_trial_start, pract_cue_on, pract_leftResp_ifNode, pract_rightResp_ifNode, pract_noResp_ifNode],
  timeline_variables: pract_instrTimeline_var,
};



// Pavlovian Practice trials
// Create timeline variable
var pract_pavTimeline_var = [];
for (trial = 0; trial < numPractTrials_pav; trial++) {
  pract_pavTimeline_var.push({
    tv_pavStims: pract_pavStims[trial],
    tv_pavOutcome: pract_pavOutcomes[trial],
    })
};

var pract_pav_pre_iti = {
  type: "image-keyboard-response",
  stimulus: iti_page,
  choices: jsPsych.NO_KEYS,
  trial_duration: 1000,
  response_ends_trial: false,
  data: {label: "pract_pav_pre_iti"},
};

var pract_pav_response =  {
  type: "image-keyboard-response",
  choices: ['space'],
  stimulus: pavHall,
  trial_duration: pavRespDur,
  response_ends_trial: true,
  data: {label: "pract_pav_response"}
};

var pract_pav_isi = {
  type: "image-keyboard-response",
  choices: jsPsych.ALL_KEYS,
  stimulus: pavISI,
  trial_duration: function() {
    var prev_data = jsPsych.data.get().last(2).values()[0];
    return (pavRespDur - prev_data.rt + pavISIDur)
  },
  response_ends_trial: true,
  data: {label: "pract_pav_isi"}
};

var pract_pav_CS_on = {
  type: "image-keyboard-response",
  choices: jsPsych.NO_KEYS,
  stimulus: jsPsych.timelineVariable("tv_pavStims"),
  trial_duration: pavCSDur,
  response_ends_trial: false,
  data: {label: "pract_pav_CS_on"}
};

var pract_pav_outcome = {
  type: "image-keyboard-response",
  choices: jsPsych.NO_KEYS,
  stimulus: jsPsych.timelineVariable("tv_pavOutcome"),
  trial_duration: pavOutDur,
  response_ends_trial: false,
  data: {label: "pract_pav_outcome"}
};

var pract_pav_no_response = {
  type: 'html-keyboard-response',
  choices: jsPsych.NO_KEYS,
  stimulus: "<p>Too slow to respond!</p>",
  trial_duration:  pavISIDur + pavCSDur + pavOutDur,
  response_ends_trial: false,
  data: {label: "pract_pav_no_response"}
};

var pract_pav_isi_response = {
  type: 'html-keyboard-response',
  choices: jsPsych.NO_KEYS,
  stimulus: "<p>Error!</p>"+
            "<p>Do not press any key while waiting!</p>",
  trial_duration: function() {
    var prev_data = jsPsych.data.get().last(2).values()[0];
    return (pavISIDur - prev_data.rt + pavCSDur + pavOutDur)
  },
  response_ends_trial: false,
  data: {label: "NA"},
};

var pract_pavISI_noResp_ifNode = {
  timeline: [pract_pav_CS_on, pract_pav_outcome],
  conditional_function: function() {
    var prev_data = jsPsych.data.get().last(1).values()[0];
    if (prev_data.key_press == null) {
      return true;
    } else {
      return false;
    }
  }
}

var pract_pavISI_Resp_ifNode = {
  timeline: [pract_pav_isi_response],
  conditional_function: function() {
    var prev_data = jsPsych.data.get().last(2).values()[0];
    if (prev_data.key_press != null) {
      return true;
    } else {
      return false;
    }
  }
}

var pract_pavResp_ifNode = {
  timeline: [pract_pav_isi, pract_pavISI_noResp_ifNode, pract_pavISI_Resp_ifNode],
  conditional_function: function() {
    var prev_data = jsPsych.data.get().last(1).values()[0];
    if (prev_data.key_press != null) {
      return true;
    } else {
      return false;
    }
  }
}

var pract_pavNoResp_ifNode = {
  timeline: [pract_pav_no_response],
  conditional_function: function() {
    var prev_data = jsPsych.data.get().last(4).values()[0];
    if (prev_data.label == 'pract_pav_pre_iti') {
      return false
    } else if (prev_data.label != 'pract_pav_response') {
      return true;
    } else if (prev_data.key_press == null) {
      return true;
    } else {
      return false;
    }
  }
}

// timeline for one trial, combine ifnodes and fixed events
var pract_pav_trialProcedure = {
  timeline: [pract_pav_pre_iti, pract_pav_response, pract_pavResp_ifNode, pract_pavNoResp_ifNode],
  timeline_variables: pract_pavTimeline_var,
};
