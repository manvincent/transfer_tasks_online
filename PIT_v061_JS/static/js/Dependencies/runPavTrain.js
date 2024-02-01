// Pavlovian trials
// Create timeline variable
var pavTimeline_var = [];
for (var trial = 0; trial < numPavTrials; trial++) {
  pavTimeline_var.push({
    tv_pavStims: pavStims[trial],
    tv_pavStimID: pavStim_ID[trial],
    tv_pavOutBool: pavOutBool[trial],
    tv_pavOutcomeColour: pavOutcome_colour[trial],
    tv_pavOutcomeCondition: trial_PavOutcomeCondition[trial],
    tv_pavOutcome: pavOutcomes[trial],
    tv_pavITIdur: pavITIdur[trial],
    tv_trialType: pav_trialType[trial],
    tv_trialNo: "pav_"+(trial+1),
    tv_pavOutCol: pavOldColour_array[trial],
    tv_pavOutIdx: pavOldIdx_array[trial],
    })
};

var pavStart = {
  type: "image-keyboard-response",
  choices: ['space'],
  stimulus: pav_start,
  response_ends_trial: true,
  data: {
    label: "pavStart",
    pavNet: 0,
  },
};

var pav_pre_iti = {
  type: "image-keyboard-response",
  stimulus: iti_page,
  choices: jsPsych.NO_KEYS,
  trial_duration: jsPsych.timelineVariable("tv_pavITIdur"),
  response_ends_trial: false,
  data: {label: "pav_pre_iti",
        pavStim_ID: jsPsych.timelineVariable("tv_pavStimID"),
        csCondition: jsPsych.timelineVariable("tv_pavOutcomeCondition"),
        trial_type: jsPsych.timelineVariable("tv_trialType"),
        trialNo: jsPsych.timelineVariable("tv_trialNo"),
        pavOutCol: jsPsych.timelineVariable("tv_pavOutCol"),
        pavOutIdx: jsPsych.timelineVariable("tv_pavOutIdx"),
        pavOutBool: jsPsych.timelineVariable("tv_pavOutBool")
      },
  on_finish: function(data) {
    var prev_data = jsPsych.data.get().last(2).values()[0];
    data.pavNet = prev_data.pavNet
  }
};

var pav_response =  {
  type: "image-keyboard-response",
  choices: ['space'],
  stimulus: pavHall,
  trial_duration: pavRespDur,
  response_ends_trial: true,
  data: {label: "pav_response"},
  on_finish: function(data) {
    var prev_data = jsPsych.data.get().last(2).values()[0];
    data.pavOutBool = prev_data.pavOutBool
    data.pavNet = prev_data.pavNet
    data.trialNo = prev_data.trialNo
    data.respKey = jsPsych.pluginAPI.convertKeyCodeToKeyCharacter(data.key_press)
    }
};

var pav_isi = {
  type: "image-keyboard-response",
  choices: jsPsych.ALL_KEYS,
  stimulus: pavISI,
  trial_duration: function() {
    var prev_data = jsPsych.data.get().last(2).values()[0];
    return (pavRespDur - prev_data.rt + pavISIDur)
  },
  response_ends_trial: true,
  data: {label: "pav_isi"},
  on_finish: function(data) {
    var prev_data = jsPsych.data.get().last(2).values()[0];
    data.pavOutBool = prev_data.pavOutBool
    data.pavNet = prev_data.pavNet
  }
};

var pav_CS_on = {
  type: "image-keyboard-response",
  choices: jsPsych.NO_KEYS,
  stimulus: jsPsych.timelineVariable("tv_pavStims"),
  trial_duration: pavCSDur,
  response_ends_trial: false,
  data: {label: "pav_CS_on"},
  on_finish: function(data) {
    var prev_data = jsPsych.data.get().last(2).values()[0];
    data.pavOutBool = prev_data.pavOutBool
    data.pavNet = prev_data.pavNet
  }
};

var pav_outcome = {
  type: "image-keyboard-response",
  choices: jsPsych.NO_KEYS,
  stimulus: jsPsych.timelineVariable("tv_pavOutcome"),
  trial_duration: pavOutDur,
  response_ends_trial: false,
  data: {label: "pav_outcome",
        outColour: jsPsych.timelineVariable("tv_pavOutcomeColour"),
        outCondition: jsPsych.timelineVariable("tv_pavOutcomeCondition")
      },
  on_finish: function(data) {
    var prev_data = jsPsych.data.get().last(2).values()[0];
    data.pavOutBool = prev_data.pavOutBool
    if (data.pavOutBool == true) {
      data.pavNet = prev_data.pavNet + 1
    } else {
      data.pavNet = prev_data.pavNet
    }
  }
};

var pav_no_response = {
  type: 'html-keyboard-response',
  choices: jsPsych.NO_KEYS,
  stimulus: "<p>Too slow to respond!</p>",
  trial_duration:  pavISIDur + pavCSDur + pavOutDur,
  response_ends_trial: false,
  data: {label: "NA"},
  on_finish: function(data) {
    var prev_data = jsPsych.data.get().last(2).values()[0];
    data.pavNet = prev_data.pavNet
  }
};

var pav_isi_response = {
  type: 'html-keyboard-response',
  choices: jsPsych.NO_KEYS,
  stimulus: "<p>Error! Do not press any key while waiting!</p>",
  trial_duration: function() {
    var prev_data = jsPsych.data.get().last(2).values()[0];
    return (pavISIDur - prev_data.rt + pavCSDur + pavOutDur)
  },
  response_ends_trial: false,
  data: {label: "NA"},
  on_finish: function(data) {
    var prev_data = jsPsych.data.get().last(2).values()[0];
    data.pavNet = prev_data.pavNet
  }
};

var pavISI_noResp_ifNode = {
  timeline: [pav_CS_on, pav_outcome],
  conditional_function: function() {
    var prev_data = jsPsych.data.get().last(1).values()[0];
    if (prev_data.key_press == null) {
      return true;
    } else {
      return false;
    }
  }
}

var pavISI_Resp_ifNode = {
  timeline: [pav_isi_response],
  conditional_function: function() {
    var prev_data = jsPsych.data.get().last(2).values()[0];
    if (prev_data.key_press != null) {
      return true;
    } else {
      return false;
    }
  }
}

var pavResp_ifNode = {
  timeline: [pav_isi, pavISI_noResp_ifNode, pavISI_Resp_ifNode],
  conditional_function: function() {
    var prev_data = jsPsych.data.get().last(1).values()[0];
    if (prev_data.key_press != null) {
      return true;
    } else {
      return false;
    }
  }
}


var pavNoResp_ifNode = {
  timeline: [pav_no_response],
  conditional_function: function() {
    var prev_data = jsPsych.data.get().last(4).values()[0];
    if (prev_data.label == 'pav_pre_iti') {
      return false
    } else if (prev_data.label == 'pav_isi') {
      return true
    } else if (prev_data.label == 'instruct_end') {
      return true;
    } else if (prev_data.key_press == null) {
      return true;
    } else {
      return false;
    }
  }
}


// timeline for one trial, combine ifnodes and fixed events
var pav_trialProcedure = {
  timeline: [pav_pre_iti, pav_response, pavResp_ifNode, pavNoResp_ifNode],
  timeline_variables: pavTimeline_var,
};
