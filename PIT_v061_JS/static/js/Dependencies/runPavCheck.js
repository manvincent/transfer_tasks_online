var pavCheckTimeline_var = [] ;
for (var trial = 0; trial < numPavChecks; trial++) {
  pavCheckTimeline_var.push({
    tv_pavChoices: pavChoices[trial],
    tv_pavCheckITIdur: pavITIdur[trial],
    tv_trialType: pavCheck_trialType[trial],
    tv_trialNo: "pav_"+(trial+1),
  })
}

var pavCheck_pre_iti = {
  type: "image-keyboard-response",
  stimulus: iti_page,
  choices: jsPsych.NO_KEYS,
  trial_duration: jsPsych.timelineVariable("tv_pavCheckITIdur"),
  response_ends_trial: false,
  data: {label: "pavCheck_pre_iti",
        trial_type: jsPsych.timelineVariable("tv_trialType"),
        trialNo: jsPsych.timelineVariable("tv_trialNo"),
      },
};

var pavCheck_prompt = {
  type: "image-keyboard-response",
  stimulus: pavCheck_prompt,
  choices: jsPsych.NO_KEYS,
  trial_duration: 5000,
  response_ends_trial: false,
  data: {label: "pavCheck_prompt"},
}

var pav_choiceTest = {
  type: "image-keyboard-response",
  stimulus: jsPsych.timelineVariable("tv_pavChoices"),
  choices: pavcheck_choice_keys,
  prompt: "<p>How much would you like to enter?</p>"+
  		    "<p>Press a key from 1 to 5</p>"+
          "<p>Press 1 if you very much DO NOT want to enter</p>"+
          "<p>Press 5 if you very much DO want to enter</p>",
  trial_duration: 15000,
  response_ends_trial: true,
  data: {label: "pav_choiceTest"},
  on_finish: function(data) {
    data.respKey = jsPsych.pluginAPI.convertKeyCodeToKeyCharacter(data.key_press)
    }
};

var pav_choiceConfirm = {
  type: 'html-keyboard-response',
  choices: jsPsych.NO_KEYS,
  stimulus: "<p>Thank you for responding.</p>"+
            "<p>Your response was recorded.</p>",
  trial_duration: function() { // filling up remainder of time window based on RT
    var prev_data = jsPsych.data.get().last(2).values()[0];
    return ((pavISIDur + pavCSDur + pavOutDur) - prev_data.rt);
  },
  response_ends_trial: false,
  data: {label: "pav_choiceConfirm"}
};

var pav_choice_no_response = {
  type: 'html-keyboard-response',
  choices: jsPsych.NO_KEYS,
  stimulus: "<p>Too slow to respond!</p>",
  trial_duration: 500,
  data: {label: "pav_choice_no_response"}
};

var pav_choice_responseNode = {
  timeline: [pav_choiceConfirm],
  conditional_function: function(data) {
    var prev_data = jsPsych.data.get().last(1).values()[0];
    if (prev_data.key_press !== null) {
      return true;
    } else {
      return false;
    }
  }
};

var pav_choice_noResponseNode = {
  timeline: [pav_choice_no_response],
  conditional_function: function(data) {
    var prev_data = jsPsych.data.get().last(2).values()[0];
    if (prev_data.key_press == null) {
      return true;
    } else {
      return false;
    }
  }
};


// timeline for one trial, combine ifnodes and fixed events
var pavCheck_trialProcedure = {
  timeline: [pavCheck_pre_iti, pavCheck_prompt, pav_choiceTest, pav_choice_responseNode, pav_choice_noResponseNode],
  timeline_variables: pavCheckTimeline_var,
};
