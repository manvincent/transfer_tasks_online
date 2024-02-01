// Bandit Trials
// Create timeline variable
var banditTimeline_var = [];
for (var trial = 0; trial < numTotalTrials; trial++) {
  banditTimeline_var.push({
    tv_leftStim: leftStimPaths[trial],
    tv_rightStim: rightStimPaths[trial],
    tv_leftOutBool: trialStimReward_1[trial],
    tv_rightOutBool: trialStimReward_2[trial],
    tv_leftOutPath: trialLeftOutPath[trial],
    tv_rightOutPath: trialRightOutPath[trial],
    tv_blockID: blockID[trial],
    tv_trialID: trialID[trial],
    tv_blockStim: blockPaths[trial],
    tv_designNo: "designNo_" + (designNo)
  });
}

// Dummy ITI
// Create a 'dummy' ITI object of duration = 0. This will store task attributes
// for conditionals later on
var initBlock = {
  type: "html-keyboard-response",
  stimulus: "<div></div>",
  choices: jsPsych.NO_KEYS,
  trial_duration:0,
  response_ends_trial: false,
  data: {label: "initBlock",
        blockID: jsPsych.timelineVariable("tv_blockID"),
        trialID: jsPsych.timelineVariable("tv_trialID"),
        blockStim: jsPsych.timelineVariable("tv_blockStim"),
      },
};

var blockStart = {
  type: "html-keyboard-response",
  choices: jsPsych.NO_KEYS,
  stimulus:
  function() {
    var prev_data = jsPsych.data.get().last(1).values()[0];
    var html = "<style>" +
    ".casino { position: absolute; top:220; left:310; height:190; width:375}" +
    "</style>" +
    "<div>" +
    "<img src='"+prev_data.blockStim+"' class='casino'>" +
    "</div>";
    return html;
  },
  response_ends_trial: false,
  trial_duration: blockStartDur,
  data: {
    label: "block_start",
  },
};

var blockStart_ifNode = {
  timeline: [blockStart],
  conditional_function: function() {
    var prev_data = jsPsych.data.get().last(1).values()[0];
    if (prev_data.trialID == 1) {
      return true;
    } else {
      return false;
    }
  }
};

var pre_iti = {
  type: "html-keyboard-response",
  stimulus:
  function() {
    var html =
    "<div><p style='color:black;font-size:60px;position:absolute;top:220;left:475'>+</p></div>"
    return html;
  },
  choices: jsPsych.NO_KEYS,
  trial_duration: ITIdur,
  response_ends_trial: false,
  data: {label: "pre_iti",
        leftOutBool: jsPsych.timelineVariable("tv_leftOutBool"),
        rightOutBool: jsPsych.timelineVariable("tv_rightOutBool"),
        leftStim: jsPsych.timelineVariable("tv_leftStim"),
        rightStim: jsPsych.timelineVariable("tv_rightStim"),
        leftOut: jsPsych.timelineVariable("tv_leftOutPath"),
        rightOut: jsPsych.timelineVariable("tv_rightOutPath"),
        designNo: jsPsych.timelineVariable("tv_designNo"}
      },
  on_finish: function(data) {
    data.trial_timeStamp = t - t_start - d_start
    t = new Date().getTime();
  }
};


var cue = {
  type: "html-keyboard-response",
  choices: choice_keys,
  stimulus:
  function() {
    var prev_data = jsPsych.data.get().last(1).values()[0];
    var html = "<style>" +
    ".leftBandit { position: absolute; top:120; left:120; height:400; width:325}" +
    ".rightBandit { position: absolute; top:120; left:620; height:400; width:325}" +
    ".leftSlot { position: absolute; top:180; left:160; height:61; width:175}" +
    ".rightSlot { position: absolute; top:180; left:660; height:61; width:175}" +
    ".leftStim { position: absolute; top:270; left:145; height:225; width:200}" +
    ".rightStim { position: absolute; top:270; left:645; height:225; width:200}" +
    ".leftOut { position: absolute; top:172; left:210; height:70; width:70}" +
    ".rightOut { position: absolute; top:172; left:710; height:70; width:70}" +
    "</style>" +
    "<div>" +
    "<img src="+ bandit + " class='leftBandit' />" +
    "<img src="+ slotUnselected + " class='leftSlot' />" +
    "<img src='"+prev_data.leftStim[0]+"' class='leftStim'>" +
    "<img src="+ bandit + " class='rightBandit' />" +
    "<img src="+ slotUnselected + " class='rightSlot' />" +
    "<img src='"+prev_data.rightStim[0]+"' class='rightStim'>";
    "</div>";
    return html;
  },
    trial_duration: cueDur,
    response_ends_trial: true,
    data: {label: "cue_on"},
    on_finish: function(data) {
      data.respKey = jsPsych.pluginAPI.convertKeyCodeToKeyCharacter(data.key_press)
    }
  };


var left_response = {
  type: "html-keyboard-response",
  choices: jsPsych.NO_KEYS,
  stimulus:
  function() {
    var prev_data = jsPsych.data.get().last(2).values()[0];
    var html = "<style>" +
    ".leftBandit { position: absolute; top:120; left:120; height:400; width:325}" +
    ".rightBandit { position: absolute; top:120; left:620; height:400; width:325}" +
    ".leftSlot { position: absolute; top:180; left:160; height:61; width:175}" +
    ".rightSlot { position: absolute; top:180; left:660; height:61; width:175}" +
    ".leftStim { position: absolute; top:270; left:145; height:225; width:200}" +
    ".rightStim { position: absolute; top:270; left:645; height:225; width:200}" +
    ".leftOut { position: absolute; top:172; left:210; height:70; width:70}" +
    ".rightOut { position: absolute; top:172; left:710; height:70; width:70}" +
    "</style>" +
    "<div>" +
    "<img src="+ banditSelected + " class='leftBandit' />" +
    "<img src='"+prev_data.leftStim[0]+"' class='leftStim'>" +
    "<img src="+ bandit + " class='rightBandit' />" +
    "<img src="+ slotUnselected + " class='rightSlot' />" +
    "<img src='"+prev_data.rightStim[0]+"' class='rightStim'>";
    "</div>";
    return html;
  },
  trial_duration: respDur,
  response_ends_trial: false,
  data: {label: "left_response"},
};

var right_response = {
  type: "html-keyboard-response",
  choices: jsPsych.NO_KEYS,
  stimulus:
  function() {
    var prev_data = jsPsych.data.get().last(2).values()[0];
    var html = "<style>" +
    ".leftBandit { position: absolute; top:120; left:120; height:400; width:325}" +
    ".rightBandit { position: absolute; top:120; left:620; height:400; width:325}" +
    ".leftSlot { position: absolute; top:180; left:160; height:61; width:175}" +
    ".rightSlot { position: absolute; top:180; left:660; height:61; width:175}" +
    ".leftStim { position: absolute; top:270; left:145; height:225; width:200}" +
    ".rightStim { position: absolute; top:270; left:645; height:225; width:200}" +
    ".leftOut { position: absolute; top:172; left:210; height:70; width:70}" +
    ".rightOut { position: absolute; top:172; left:710; height:70; width:70}" +
    "</style>" +
    "<div>" +
    "<img src="+ bandit + " class='leftBandit' />" +
    "<img src="+ slotUnselected + " class='leftslot' />" +
    "<img src='"+prev_data.leftStim[0]+"' class='leftStim'>" +
    "<img src="+ banditSelected + " class='rightBandit' />" +
    "<img src='"+prev_data.rightStim[0]+"' class='rightStim'>";
    "</div>";
    return html;
  },
  trial_duration: respDur,
  response_ends_trial: false,
  data: {label: "right_response"},
}

var no_response = {
  type: 'html-keyboard-response',
  choices: jsPsych.NO_KEYS,
  stimulus: function() {
    var html =
    "<div><p style='color:black;font-size:60px;position:absolute;top:220;left:275'>Too slow to respond!</p></div>"
    return html;
  },
  trial_duration: respDur + outDur,
  response_ends_trial: false,
  data: {label: "NA"},
};

var leftOutcome = {
  type: "html-keyboard-response",
  choices: jsPsych.NO_KEYS,
  stimulus:
  function() {
    var prev_data = jsPsych.data.get().last(3).values()[0];
    var html = "<style>" +
    ".leftBandit { position: absolute; top:120; left:120; height:400; width:325}" +
    ".rightBandit { position: absolute; top:120; left:620; height:400; width:325}" +
    ".leftSlot { position: absolute; top:180; left:160; height:61; width:175}" +
    ".rightSlot { position: absolute; top:180; left:660; height:61; width:175}" +
    ".leftStim { position: absolute; top:270; left:145; height:225; width:200}" +
    ".rightStim { position: absolute; top:270; left:645; height:225; width:200}" +
    ".leftOut { position: absolute; top:172; left:210; height:70; width:70}" +
    ".rightOut { position: absolute; top:172; left:710; height:70; width:70}" +
    "</style>" +
    "<div>" +
    "<img src="+ banditSelected + " class='leftBandit' />" +
    "<img src='"+prev_data.leftStim[0]+"' class='leftStim'>" +
    "<img src='"+prev_data.leftOut[0]+"' class='leftOut'>" +
    "<img src="+ bandit + " class='rightBandit' />" +
    "<img src="+ slotUnselected + " class='rightSlot' />" +
    "<img src='"+prev_data.rightStim[0]+"' class='rightStim'>";
    "</div>";
    return html;
  },
  trial_duration: outDur,
  response_ends_trial: false,
  data: {label: "left outcome"},
  on_finish: function(data) {
    var prev_data = jsPsych.data.get().last(4).values()[0];
    // Update iterative variables (net gains)
    data.currOutcome =  prev_data.leftOutBool
  }
};

var rightOutcome = {
  type: "html-keyboard-response",
  choices: jsPsych.NO_KEYS,
  stimulus:
  function() {
    var prev_data = jsPsych.data.get().last(3).values()[0];
    var html = "<style>" +
    ".leftBandit { position: absolute; top:120; left:120; height:400; width:325}" +
    ".rightBandit { position: absolute; top:120; left:620; height:400; width:325}" +
    ".leftSlot { position: absolute; top:180; left:160; height:61; width:175}" +
    ".rightSlot { position: absolute; top:180; left:660; height:61; width:175}" +
    ".leftStim { position: absolute; top:270; left:145; height:225; width:200}" +
    ".rightStim { position: absolute; top:270; left:645; height:225; width:200}" +
    ".leftOut { position: absolute; top:172; left:210; height:70; width:70}" +
    ".rightOut { position: absolute; top:172; left:710; height:70; width:70}" +
    "</style>" +
    "<div>" +
    "<img src="+ bandit + " class='leftBandit' />" +
    "<img src="+ slotUnselected + " class='leftslot' />" +
    "<img src='"+prev_data.leftStim[0]+"' class='leftStim'>" +
    "<img src="+ banditSelected + " class='rightBandit' />" +
    "<img src='"+prev_data.rightStim[0]+"' class='rightStim'>" +
    "<img src='"+prev_data.rightOut[0]+"' class='rightOut'>" +
    "</div>";
    return html;
  },
  trial_duration: outDur,
  response_ends_trial: false,
  data: {label: "left outcome"},
  on_finish: function(data) {
    var prev_data = jsPsych.data.get().last(4).values()[0];
    // Update iterative variables (net gains)
    data.currOutcome =  prev_data.rightOutBool
  }
};

// ifnode - conditional to determine whether mini-timeline is run
// ifnode must come after the events called in the mini-timeline
var leftResp_ifNode = {
  timeline: [left_response, leftOutcome],
  conditional_function: function() {
    var prev_data = jsPsych.data.get().last(1).values()[0];
    if (prev_data.key_press == leftAllowKey) {
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
    if (prev_data.key_press == rightAllowKey) {
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
var bandit_trialProcedure = {
  timeline: [initBlock, blockStart_ifNode, pre_iti, cue, leftResp_ifNode, rightResp_ifNode, noResp_ifNode],
  timeline_variables: banditTimeline_var,
};
