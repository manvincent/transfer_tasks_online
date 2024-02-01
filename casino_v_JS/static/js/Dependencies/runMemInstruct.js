// Create timeline variable
var memInstruct_timeline_var = [];
for (var trial = 0; trial < 9; trial++) {
  memInstruct_timeline_var.push({
    tv_instruct: mem_instruct_pages[trial],
  });
}

var mem_initInstruct = {
  type: "html-keyboard-response",
  stimulus: "<div></div>",
  choices: jsPsych.NO_KEYS,
  trial_duration:0,
  response_ends_trial: false,
  data: {label: "initInstruct",
        page_index:1
        },
};
timeline.push(mem_initInstruct)

var mem_instruct_page = {
  type: "image-keyboard-response",
  stimulus:  jsPsych.timelineVariable("tv_instruct"),
  choices: ['space'],
  trial_duration: null,
  response_ends_trial: true,
  on_finish: function(data) {
    var prev_data = jsPsych.data.get().last(2).values()[0];
    data.page_index = prev_data.page_index + 1
    console.log(data.page_index)
  }
};

var mem_except5 = {
  type: "image-keyboard-response",
  stimulus:  mem_except_page5,
  choices: [jsPsych.pluginAPI.convertKeyCharacterToKeyCode('f')],
  trial_duration: null,
  response_ends_trial: true,
  on_finish: function(data) {
    var prev_data = jsPsych.data.get().last(2).values()[0];
    data.page_index = prev_data.page_index + 1
    console.log(data.page_index)
  }
};

var mem_except7 = {
  type: "image-keyboard-response",
  stimulus:  mem_except_page7,
  choices: [jsPsych.pluginAPI.convertKeyCharacterToKeyCode('j')],
  trial_duration: null,
  response_ends_trial: true,
  on_finish: function(data) {
    var prev_data = jsPsych.data.get().last(2).values()[0];
    data.page_index = prev_data.page_index + 1
    console.log(data.page_index)
  }
};


var mem_except5_ifNode = {
  timeline: [mem_except5],
  conditional_function:  function() {
    var prev_data = jsPsych.data.get().last(1).values()[0];
    if (prev_data.page_index == 5) {
      return true;
    } else {
      return false;
    }
  }
};

var mem_except7_ifNode = {
  timeline: [mem_except7],
  conditional_function: function() {
    var prev_data = jsPsych.data.get().last(1).values()[0];
    if (prev_data.page_index == 7) {
      return true;
    } else {
      return false;
    }
  }
};


var mem_instruct_ifNode = {
  timeline: [mem_instruct_page],
  conditional_function: function() {
    var prev_data = jsPsych.data.get().last(1).values()[0];
    if (prev_data.page_index >= 10) {
      return false;
    } else {
      return true;
    }
  }
};

// timeline for one trial, combine ifnodes and fixed events
var memInstruct_trialProcedure = {
  timeline: [mem_except5_ifNode,
            mem_except7_ifNode,
            mem_instruct_ifNode],
  timeline_variables: memInstruct_timeline_var,
};
