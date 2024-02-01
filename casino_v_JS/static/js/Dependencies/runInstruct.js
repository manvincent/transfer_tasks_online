// Instruction  slides
// Create timeline variable
var instruct_timeline_var = [];
for (var trial = 0; trial < 31; trial++) {
  instruct_timeline_var.push({
    tv_instruct: instruct_pages[trial],
  });
}

var initInstruct = {
  type: "html-keyboard-response",
  stimulus: "<div></div>",
  choices: jsPsych.NO_KEYS,
  trial_duration:0,
  response_ends_trial: false,
  data: {label: "initInstruct",
        page_index:1
        },
};
timeline.push(initInstruct)

var instruct_page = {
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

var except7 = {
  type: "image-keyboard-response",
  stimulus:  except_page7,
  choices: [leftAllowKey],
  trial_duration: null,
  response_ends_trial: true,
  on_finish: function(data) {
    var prev_data = jsPsych.data.get().last(2).values()[0];
    data.page_index = prev_data.page_index + 1
    console.log(data.page_index)
  }
};

var except10 = {
  type: "image-keyboard-response",
  stimulus:  except_page10,
  choices: [rightAllowKey],
  trial_duration: null,
  response_ends_trial: true,
  on_finish: function(data) {
    var prev_data = jsPsych.data.get().last(2).values()[0];
    data.page_index = prev_data.page_index + 1
    console.log(data.page_index)
  }
};

var except20 = {
  type: "image-keyboard-response",
  stimulus:  except_page20,
  choices: [jsPsych.pluginAPI.convertKeyCharacterToKeyCode('k')],
  trial_duration: null,
  response_ends_trial: true,
  on_finish: function(data) {
    var prev_data = jsPsych.data.get().last(2).values()[0];
    data.page_index = prev_data.page_index + 1
    console.log(data.page_index)
  }
};

var except22 = {
  type: "image-keyboard-response",
  stimulus:  except_page22,
  choices: [jsPsych.pluginAPI.convertKeyCharacterToKeyCode('f')],
  trial_duration: null,
  response_ends_trial: true,
  on_finish: function(data) {
    var prev_data = jsPsych.data.get().last(2).values()[0];
    data.page_index = prev_data.page_index + 1
    console.log(data.page_index)
  }
};

var except24 = {
  type: "image-keyboard-response",
  stimulus:  except_page24,
  choices: [jsPsych.pluginAPI.convertKeyCharacterToKeyCode('j')],
  trial_duration: null,
  response_ends_trial: true,
  on_finish: function(data) {
    var prev_data = jsPsych.data.get().last(2).values()[0];
    data.page_index = prev_data.page_index + 1
    console.log(data.page_index)
  }
};

var except26 = {
  type: "image-keyboard-response",
  stimulus:  except_page26,
  choices: [jsPsych.pluginAPI.convertKeyCharacterToKeyCode('j')],
  trial_duration: null,
  response_ends_trial: true,
  on_finish: function(data) {
    var prev_data = jsPsych.data.get().last(2).values()[0];
    data.page_index = prev_data.page_index + 1
    console.log(data.page_index)
  }
};

var except28 = {
  type: "image-keyboard-response",
  stimulus:  except_page28,
  choices: [leftAllowKey],
  trial_duration: null,
  response_ends_trial: true,
  on_finish: function(data) {
    var prev_data = jsPsych.data.get().last(2).values()[0];
    data.page_index = prev_data.page_index + 1
    console.log(data.page_index)
  }
};

var except30 = {
  type: "image-keyboard-response",
  stimulus:  except_page30,
  choices: [rightAllowKey],
  trial_duration: null,
  response_ends_trial: true,
  on_finish: function(data) {
    var prev_data = jsPsych.data.get().last(2).values()[0];
    data.page_index = prev_data.page_index + 1
    console.log(data.page_index)
  }
};

var except7_ifNode = {
  timeline: [except7],
  conditional_function: function() {
    var prev_data = jsPsych.data.get().last(1).values()[0];
    if (prev_data.page_index == 7) {
      return true;
    } else {
      return false;
    }
  }
};

var except10_ifNode = {
  timeline: [except10],
  conditional_function:  function() {
    var prev_data = jsPsych.data.get().last(1).values()[0];
    if (prev_data.page_index == 10) {
      return true;
    } else {
      return false;
    }
  }
};

var except20_ifNode = {
  timeline: [except20],
  conditional_function:  function() {
    var prev_data = jsPsych.data.get().last(1).values()[0];
    if (prev_data.page_index == 20) {
      return true;
    } else {
      return false;
    }
  }
};

var except22_ifNode = {
  timeline: [except22],
  conditional_function: function() {
    var prev_data = jsPsych.data.get().last(1).values()[0];
    if (prev_data.page_index == 22) {
      return true;
    } else {
      return false;
    }
  }
};

var except24_ifNode = {
  timeline: [except24],
  conditional_function:  function() {
    var prev_data = jsPsych.data.get().last(1).values()[0];
    if (prev_data.page_index == 24) {
      return true;
    } else {
      return false;
    }
  }
};

var except26_ifNode = {
  timeline: [except26],
  conditional_function:  function() {
    var prev_data = jsPsych.data.get().last(1).values()[0];
    if (prev_data.page_index == 26) {
      return true;
    } else {
      return false;
    }
  }
};

var except28_ifNode = {
  timeline: [except28],
  conditional_function:  function() {
    var prev_data = jsPsych.data.get().last(1).values()[0];
    if (prev_data.page_index == 28) {
      return true;
    } else {
      return false;
    }
  }
};

var except30_ifNode = {
  timeline: [except30],
  conditional_function: function() {
    var prev_data = jsPsych.data.get().last(1).values()[0];
    if (prev_data.page_index == 30) {
      return true;
    } else {
      return false;
    }
  }
};

var instruct_ifNode = {
  timeline: [instruct_page],
  conditional_function: function() {
    var prev_data = jsPsych.data.get().last(1).values()[0];
    if (prev_data.page_index >= 33) {
      return false;
    } else {
      return true;
    }
  }
};

// timeline for one trial, combine ifnodes and fixed events
var instruct_trialProcedure = {
  timeline: [except7_ifNode,
            except10_ifNode,
            except20_ifNode,
            except22_ifNode,
            except24_ifNode,
            except26_ifNode,
            except28_ifNode,
            except30_ifNode,
            instruct_ifNode],
  timeline_variables: instruct_timeline_var,
};
