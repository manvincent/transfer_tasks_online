
  // Instrumental trials
  // Create timeline variable
  var obsvImit_Timeline_var = [];
  for (var trial = 0; trial < numTotalTrials; trial++) {
      obsvImit_Timeline_var.push({
        tv_vidPath: vidPaths[trial],
        tv_leftStim: leftStimPaths[trial],
        tv_midStim: midStimPaths[trial],
        tv_rightStim: rightStimPaths[trial],
        tv_obsv_leftSelect: obsv_leftSelectPaths[trial],
        tv_obsv_midSelect: obsv_midSelectPaths[trial],
        tv_obsv_rightSelect: obsv_rightSelectPaths[trial],
        tv_play_LResp_leftStim : play_LResp_leftStim[trial],
        tv_play_LResp_midStim : play_LResp_midStim[trial],
        tv_play_LResp_rightStim : play_LResp_rightStim[trial],
        tv_play_RResp_leftStim : play_RResp_leftStim[trial],
        tv_play_RResp_midStim : play_RResp_midStim[trial],
        tv_play_RResp_rightStim : play_RResp_rightStim[trial],
        tv_leftOutVal: leftOutVal[trial],
        tv_rightOutVal: rightOutVal[trial],
        tv_leftOutPath: leftOutPaths[trial],
        tv_rightOutPath: rightOutPaths[trial],
        tv_allowable_keys: allowable_keys[trial],
        tv_leftAllowable: left_allowableKey[trial],
        tv_rightAllowable: right_allowableKey[trial],
        tv_blockID: blockID[trial],
        tv_trialID: trialID[trial],
        tv_trialType: trialType[trial],
        tv_isBreak: isBreak[trial],
        tv_designNo: "designNo_" + (designNo)
      });
    }

  // Dummy ITI
  // Create a 'dummy' ITI object of duration = 0. This will store task attributes
  // for conditionals later on
  var dummy = {
    type: "html-keyboard-response",
    stimulus: "<div></div>",
    choices: jsPsych.NO_KEYS,
    trial_duration:0,
    response_ends_trial: false,
    data: {label: "dummy",
          vidPath: jsPsych.timelineVariable("tv_vidPath"),
          leftStim: jsPsych.timelineVariable("tv_leftStim"),
          midStim: jsPsych.timelineVariable("tv_midStim"),
          rightStim: jsPsych.timelineVariable("tv_rightStim"),
          obsv_leftSelect: jsPsych.timelineVariable("tv_obsv_leftSelect"),
          obsv_midSelect: jsPsych.timelineVariable("tv_obsv_midSelect"),
          obsv_rightSelect: jsPsych.timelineVariable("tv_obsv_rightSelect"),
          play_LResp_leftStim : jsPsych.timelineVariable("tv_play_LResp_leftStim"),
          play_LResp_midStim : jsPsych.timelineVariable("tv_play_LResp_midStim"),
          play_LResp_rightStim : jsPsych.timelineVariable("tv_play_LResp_rightStim"),
          play_RResp_leftStim : jsPsych.timelineVariable("tv_play_RResp_leftStim"),
          play_RResp_midStim : jsPsych.timelineVariable("tv_play_RResp_midStim"),
          play_RResp_rightStim : jsPsych.timelineVariable("tv_play_RResp_rightStim"),
          leftOutVal: jsPsych.timelineVariable("tv_leftOutVal"),
          rightOutVal: jsPsych.timelineVariable("tv_rightOutVal"),
          leftOutPath: jsPsych.timelineVariable("tv_leftOutPath"),
          rightOutPath: jsPsych.timelineVariable("tv_rightOutPath"),
          allowableKeys: jsPsych.timelineVariable("tv_allowable_keys"),
          leftAllowKey: jsPsych.timelineVariable("tv_leftAllowable"),
          rightAllowKey: jsPsych.timelineVariable("tv_rightAllowable"),
          blockID: jsPsych.timelineVariable("tv_blockID"),
          trialID: jsPsych.timelineVariable("tv_trialID"),
          trialType: jsPsych.timelineVariable("tv_trialType"),
          isBreak: jsPsych.timelineVariable("tv_isBreak"),
          desigNo: jsPsych.timelineVariable("tv_designNo"),
        },
  };

  var conditionHeader  = {
    type: "html-keyboard-response",
    choices: jsPsych.NO_KEYS,
    trial_duration: conditionDur,
    stimulus:
    function() {
      var prev_data = jsPsych.data.get().last(1).values()[0];
      var html = "<style>" +
      "body {background-color: black;}" +
      "</style>" +
      "<h2 style='background-color:black;color:white;position:absolute;top:225;left:470'>" +
        prev_data.trialType +
      "</h2>"
      return html;
    },
    response_ends_trial: false,
    data: {
      label: "conditionHeader",
    },
  };

  var observeOn  = {
    type: "html-keyboard-response",
    choices: jsPsych.NO_KEYS,
    trial_duration: observeOnDur,
    stimulus:
    function() {
      var prev_data = jsPsych.data.get().last(2).values()[0];
      var html =
      "<style>" +
        "body {background-color: black;}" +
        ".leftBandit { position: absolute; top:120; left:120; height:411; width:205}" +
        ".midBandit { position: absolute; top:120; left:370; height:411; width:205}" +
        ".rightBandit { position: absolute; top:120; left:620; height:411; width:205}" +
        ".bigBox { position: absolute; top:80; left:70; height:475; width:850}" +
        ".smallBox { position: absolute; top:600; left:300; height:300; width:425}" +
      "</style>" +
      "<div>" +
      "<img src=" + bottomBox + " class='smallBox' />" +
      "<img src=" + topBox +" class='bigBox' />" +
      "<img src='" + prev_data.leftStim[0] + "' class='leftBandit' />" +
      "<img src='" + prev_data.midStim[0] + "' class='midBandit' />" +
      "<img src='" + prev_data.rightStim[0] + "' class='rightBandit' />" +
      "</div>"
      return html;
    },
    response_ends_trial: false,
    data: {label: "observeOn"},
};


  var observeVid  = {
    type: "html-keyboard-response",
    choices: jsPsych.NO_KEYS,
    trial_duration: observeVidDur,
    stimulus:
    function() {
      var prev_data = jsPsych.data.get().last(3).values()[0];
      var html =
      "<style>" +
        "body {background-color: black;}" +
        ".leftBandit { position: absolute; top:120; left:120; height:411; width:205}" +
        ".midBandit { position: absolute; top:120; left:370; height:411; width:205}" +
        ".rightBandit { position: absolute; top:120; left:620; height:411; width:205}" +
        ".bigBox { position: absolute; top:80; left:70; height:475; width:850}" +
        ".smallBox { position: absolute; top:600; left:300; height:300; width:425}" +
        ".video { position: absolute; top:630; left:350}" +
      "</style>" +
      "<div>" +
      "<img src=" + bottomBox + " class='smallBox' />" +
      "<img src=" + topBox +" class='bigBox' />" +
      "<img src='" + prev_data.leftStim[0] + "' class='leftBandit' />" +
      "<img src='" + prev_data.midStim[0] + "' class='midBandit' />" +
      "<img src='" + prev_data.rightStim[0] + "' class='rightBandit' />" +
      "<video width='320' height='240' class='video' autoplay muted>" +
        "<source src='" + prev_data.vidPath[0] + "' type='video/mp4' >" +
        "Your browser does not support the video tag." +
      "</video>" +
      "</div>"
      return html;
    },
    response_ends_trial: false,
    data: {label: "observeVid"},
};

  var observeSelected  = {
    type: "html-keyboard-response",
    choices: jsPsych.NO_KEYS,
    trial_duration: respDur,
    stimulus:
    function() {
      var prev_data = jsPsych.data.get().last(4).values()[0];
      var html =
      "<style>" +
        "body {background-color: black;}" +
        ".leftBandit { position: absolute; top:120; left:120; height:411; width:205}" +
        ".midBandit { position: absolute; top:120; left:370; height:411; width:205}" +
        ".rightBandit { position: absolute; top:120; left:620; height:411; width:205}" +
        ".bigBox { position: absolute; top:80; left:70; height:475; width:850}" +
        ".smallBox { position: absolute; top:600; left:300; height:300; width:425}" +
        ".video { position: absolute; top:630; left:350}" +
      "</style>" +
      "<div>" +
      "<img src=" + bottomBox + " class='smallBox' />" +
      "<img src=" + topBox + " class='bigBox' />" +
      "<img src='" + prev_data.obsv_leftSelect[0] + "' class='leftBandit' />" +
      "<img src='" + prev_data.obsv_midSelect[0] + "' class='midBandit' />" +
      "<img src='" + prev_data.obsv_rightSelect[0] + "' class='rightBandit' />" +
      "<video width='320' height='240' class='video'>" +
        "<source src='" + prev_data.vidPath[0] + "' type='video/mp4' >" +
        "Your browser does not support the video tag." +
      "</video>" +
      "</div>"
      return html;
    },
    response_ends_trial: false,
    data: {label: "observeSelected"},
  };


  var playOn  = {
    type: "html-keyboard-response",
    choices: function(data) {
      var prev_data = jsPsych.data.get().last(2).values()[0];
      return [prev_data.leftAllowKey, prev_data.rightAllowKey]
    },
    trial_duration: cueDur,
    stimulus:
    function() {
      var prev_data = jsPsych.data.get().last(2).values()[0];
      var html =
      "<style>" +
        "body {background-color: black;}" +
        ".leftBandit { position: absolute; top:120; left:120; height:411; width:205}" +
        ".midBandit { position: absolute; top:120; left:370; height:411; width:205}" +
        ".rightBandit { position: absolute; top:120; left:620; height:411; width:205}" +
      "</style>" +
      "<div>" +
      "<img src='" + prev_data.leftStim[0] + "' class='leftBandit' />" +
      "<img src='" + prev_data.midStim[0] + "' class='midBandit' />" +
      "<img src='" + prev_data.rightStim[0] + "' class='rightBandit' />" +
      "</div>"
      return html;
    },
    response_ends_trial: true,
    data: {label: "playOn"},

    };


  var left_response = {
    type: "html-keyboard-response",
    choices: jsPsych.NO_KEYS,
    stimulus:
    function() {
      var prev_data = jsPsych.data.get().last(3).values()[0];
      var html =
      "<style>" +
        "body {background-color: black;}" +
        ".leftBandit { position: absolute; top:120; left:120; height:411; width:205}" +
        ".midBandit { position: absolute; top:120; left:370; height:411; width:205}" +
        ".rightBandit { position: absolute; top:120; left:620; height:411; width:205}" +
      "</style>" +
      "<div>" +
      "<img src='" + prev_data.play_LResp_leftStim[0] + "' class='leftBandit' />" +
      "<img src='" + prev_data.play_LResp_midStim[0] + "' class='midBandit' />" +
      "<img src='" + prev_data.play_LResp_rightStim[0] + "' class='rightBandit' />" +
      "</div>"
      return html;
    },
    trial_duration: respDur,
    response_ends_trial: false,
    data: {label: "left_response"},
  }

  var right_response = {
    type: "html-keyboard-response",
    choices: jsPsych.NO_KEYS,
    stimulus:
    function() {
      var prev_data = jsPsych.data.get().last(3).values()[0];
      var html =
      "<style>" +
        "body {background-color: black;}" +
        ".leftBandit { position: absolute; top:120; left:120; height:411; width:205}" +
        ".midBandit { position: absolute; top:120; left:370; height:411; width:205}" +
        ".rightBandit { position: absolute; top:120; left:620; height:411; width:205}" +
      "</style>" +
      "<div>" +
      "<img src='" + prev_data.play_RResp_leftStim[0] + "' class='leftBandit' />" +
      "<img src='" + prev_data.play_RResp_midStim[0] + "' class='midBandit' />" +
      "<img src='" + prev_data.play_RResp_rightStim[0] + "' class='rightBandit' />" +
      "</div>"
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
      "<style> body {background-color: black;} </style>" +
      "<div><p style=';color:white;font-size:30px;position:absolute;top:220;left:275'>" +
      "Missed response! Wait until next trial..." +
      "</p></div>"
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
      var prev_data = jsPsych.data.get().last(4).values()[0];
      var html = "<style>" +
      "body {background-color: black;}" +
      ".token { position: absolute; top:220; left:380; height:230; width:230}" +
      "</style>" +
      "<div>" +
      "<img src='" + prev_data.leftOutPath[0] + "' class='token'>";
      "</div>";
      return html;
    },
    trial_duration: outDur,
    response_ends_trial: false,
    data: {label: "left_outcome"},
    on_finish: function(data) {
      var prev_data = jsPsych.data.get().last(5).values()[0];
      // Update iterative variables (net gains)
      data.currOutcome =  prev_data.leftOutVal
    }
  };


  var rightOutcome = {
    type: "html-keyboard-response",
    choices: jsPsych.NO_KEYS,
    stimulus:
    function() {
      var prev_data = jsPsych.data.get().last(4).values()[0];
      var html = "<style>" +
      "body {background-color: black;}" +
      ".token { position: absolute; top:220; left:380; height:230; width:230}" +
      "</style>" +
      "<div>" +
      "<img src='" + prev_data.rightOutPath[0] + "' class='token'>";
      "</div>";
      return html;
    },
    trial_duration: outDur,
    response_ends_trial: false,
    data: {label: "right_outcome"},
    on_finish: function(data) {
      var prev_data = jsPsych.data.get().last(5).values()[0];
      // Update iterative variables (net gains)
      data.currOutcome =  prev_data.rightOutVal
    }
  };


  var leftResp_ifNode = {
    timeline: [left_response, leftOutcome],
    conditional_function: function() {
      var prev_data = jsPsych.data.get().last(1).values()[0];
      var dummy_data = jsPsych.data.get().last(3).values()[0];
      if (prev_data.key_press == dummy_data.leftAllowKey) {
        return true;
      } else {
        return false;
      }
    }
  };

  var rightResp_ifNode = {
    timeline: [right_response, rightOutcome],
    conditional_function: function() {
      var ifLeft_playOn_data =  jsPsych.data.get().last(3).values()[0];
      var ifLeft_dummy_data =  jsPsych.data.get().last(5).values()[0];
      var prev_data = jsPsych.data.get().last(1).values()[0];
      var dummy_data = jsPsych.data.get().last(3).values()[0];
      console.log(ifLeft_playOn_data.key_press == ifLeft_dummy_data.leftAllowKey)
      console.log(ifLeft_playOn_data)
      console.log(ifLeft_dummy_data)
      if (ifLeft_playOn_data.key_press === ifLeft_dummy_data.leftAllowKey) {
        return false;
      }
      if (prev_data.key_press == dummy_data.rightAllowKey) {
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



  var iti = {
    type: "html-keyboard-response",
    stimulus:
    function() {
      var html =
      "<style> body {background-color: black;} </style>" +
      "<div><p style=';color:white;font-size:60px;position:absolute;top:210;left:480'>+</p></div>"
      return html;
    },
    choices: jsPsych.NO_KEYS,
    trial_duration: ITIdur,
    response_ends_trial: false,
    data: {label: "iti"},
    on_finish: function(data) {
      data.trial_timeStamp = t - t_start - d_start
      t = new Date().getTime();
    }
  };



  var observe_ifNode = {
    timeline: [observeOn, observeVid, observeSelected],
    conditional_function: function() {
      var prev_data = jsPsych.data.get().last(2).values()[0];
      if (prev_data.trialType == "Observe") {
        return true;
      } else {
        return false;
      }
    }
  };

  var play_ifNode = {
    timeline: [playOn, leftResp_ifNode, rightResp_ifNode, noResp_ifNode],
    conditional_function: function() {
      var prev_data = jsPsych.data.get().last(2).values()[0];
      if (prev_data.trialType == "Play") {
        return true;
      } else {
        return false;
      }
    }
  };

  var obsvImit_trialProcedure = {
    timeline: [dummy, conditionHeader, observe_ifNode, play_ifNode, iti],
    timeline_variables: obsvImit_Timeline_var,
  };
