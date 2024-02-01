// Create timeline variable
var memTimeline_var = [];
for (var trial = 0; trial < numMemTrials; trial++) {
  memTimeline_var.push({
    tv_memStimPath: mem_stimPath[trial],
    tv_memDesignNo: "memDesignNo" + (memDesignNo)
  });
}

var mem_iti = {
  type: "html-keyboard-response",
  stimulus:
  function() {
    var html =
    "<div><p style='color:black;font-size:60px;position:absolute;top:400;left:475'>+</p></div>"
    return html;
  },
  choices: jsPsych.NO_KEYS,
  trial_duration: ITIdur,
  response_ends_trial: false,
  data: {label: "mem_iti",
        memStim: jsPsych.timelineVariable("tv_memStimPath"),
        memDesignNo: jsPsych.timelineVariable("tv_memDesignNo"}
      }
};


var mem_cue = {
  type: "html-keyboard-response",
  choices: mem_keys,
  stimulus:
  function() {
    var prev_data = jsPsych.data.get().last(1).values()[0];
    var html = "<style>" +
    ".memStim { position: absolute; top:220; left:310; height:400; width:325}" +
    ".old { position: absolute; top:750; left:160; height:61; width:175}" +
    ".new { position: absolute; top:750; left:660; height:61; width:175}" +
    "</style>" +
    "<div>" +
    "<img src="+ prev_data.memStim + " class='memStim' />" +
    "<img src="+ old_unselected + " class='old' />" +
    "<img src="+ new_unselected + " class='new' />" +
    "</div>";
    return html;
  },
    trial_duration: cueDur,
    response_ends_trial: true,
    data: {label: "mem_cue"},
    on_finish: function(data) {
      data.respKey = jsPsych.pluginAPI.convertKeyCodeToKeyCharacter(data.key_press)
    }
  };


var mem_old_response = {
  type: "html-keyboard-response",
  choices: jsPsych.NO_KEYS,
  stimulus:
  function() {
    var prev_data = jsPsych.data.get().last(2).values()[0];
    var html = "<style>" +
    ".memStim { position: absolute; top:220; left:310; height:400; width:325}" +
    ".old { position: absolute; top:750; left:160; height:61; width:175}" +
    ".new { position: absolute; top:750; left:660; height:61; width:175}" +
    "</style>" +
    "<div>" +
    "<img src="+ prev_data.memStim + " class='memStim' />" +
    "<img src="+ old_selected + " class='old' />" +
    "<img src="+ new_unselected + " class='new' />" +
    "</div>";
    return html;
  },
  trial_duration: respDur,
  response_ends_trial: false,
  data: {label: "left_response"},
};

var mem_new_response = {
  type: "html-keyboard-response",
  choices: jsPsych.NO_KEYS,
  stimulus:
  function() {
    var prev_data = jsPsych.data.get().last(2).values()[0];
    var html = "<style>" +
    ".memStim { position: absolute; top:220; left:310; height:400; width:325}" +
    ".old { position: absolute; top:750; left:160; height:61; width:175}" +
    ".new { position: absolute; top:750; left:660; height:61; width:175}" +
    "</style>" +
    "<div>" +
    "<img src="+ prev_data.memStim + " class='memStim' />" +
    "<img src="+ old_unselected + " class='old' />" +
    "<img src="+ new_selected + " class='new' />" +
    "</div>";
    return html;
  },
  trial_duration: respDur,
  response_ends_trial: false,
  data: {label: "right_response"},
}

var mem_no_response = {
  type: 'html-keyboard-response',
  choice: jsPsych.NO_KEYS,
  stimulus: function() {
    var html =
    "<div><p style='color:black;font-size:60px;position:absolute;top:220;left:275'>Too slow to respond!</p></div>"
    return html;
  },
  trial_duration: respDur + outDur,
  response_ends_trial: false,
  data: {label: "NA"},
};

// ifnode - conditional to determine whether mini-timeline is run
// ifnode must come after the events called in the mini-timeline
var mem_oldResp_ifNode = {
  timeline: [mem_old_response],
  conditional_function: function() {
    var prev_data = jsPsych.data.get().last(1).values()[0];
    if (prev_data.key_press == oldMemKey) {
      return true;
    } else {
      return false;
    }
  }
};
// ifnode - conditional to determine whether mini-timeline is run
// ifnode must come after the events called in the mini-timeline
var mem_newResp_ifNode = {
  timeline: [mem_new_response],
  conditional_function: function() {
    var prev_data = jsPsych.data.get().last(1).values()[0];
    if (prev_data.key_press == newMemKey) {
      return true;
    } else {
      return false;
    }
  }
};

var mem_noResp_ifNode = {
  timeline: [mem_no_response],
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
var memory_trialProcedure = {
  timeline: [mem_iti, mem_cue, mem_oldResp_ifNode, mem_newResp_ifNode, mem_noResp_ifNode],
  timeline_variables: memTimeline_var,
};
