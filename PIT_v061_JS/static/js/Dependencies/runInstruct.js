// Instrumental
var instr_pagenum = 0;    // holds current page number
var instr_choice = [];    // holds keys available from current page

// dummy event
var instr_initInstruct = {
    type: "html-keyboard-response",
    stimulus: function() {
        let htmlstr = "<body><div></div></body>";
        return htmlstr
    },
    choices: jsPsych.NO_KEYS,
    trial_duration: 0,
    response_ends_trial: false,
    data: {
        label: "instr_initInstruct",
        page_index: instr_pagenum,
        pageStep: 1,    // holds 1 if stepping to next page, -1 if stepping to previous
    },
};

// event to display instruction images
var instr_instruct_page = {
    type: "html-keyboard-response",
    // dummy stimulus and key choices are reset in on_start()
    stimulus: "<body><div></div></body>",
    choices: jsPsych.NO_KEYS,
    trial_duration: null,
    response_ends_trial: true,
    on_start: function (trial) {
        var prev_data = jsPsych.data.get().last(1).values()[0];
        instr_pagenum = prev_data.page_index + prev_data.pageStep;
        trial.stimulus = '<body><div class="centered"><img src=' + instr_instruct[instr_pagenum-1] + ' alt="instruction" width="100%"></div></body>';
        instr_choice = instr_choiceKey_array[instr_pagenum-1];
        trial.choices = instr_choice;     // set keys available from current page
    },
    on_finish: function (data) {
        data.page_index = instr_pagenum;
        // set pageStep, which will be added to page_index to compute the next instr_pagenum
        if (data.key_press == instr_choice[0]) {
            data.pageStep = 1
        } else if  (data.key_press == instr_choice[1]) {
            data.pageStep = -1
        }
        else throw new Error("invalid key press: " + data.key_press)
    }
};


// timeline for one trial, combine ifnodes and fixed events
var instr_instruct_trialLoop = {
    timeline: [instr_instruct_page],
    // use a loop function to play instruct_page event with different instruction pages
    // until all instruction pages have been shown
    loop_function: function (data) {
        var prev_data = data.values()[0];
        if (prev_data.pageStep < 0 || prev_data.page_index < instr_instruct_pages) {
            return true;
        }
        else {
            return false;
        }
    }
};

var instruct_instr_trialProcedure = {
    timeline: [instr_initInstruct, instr_instruct_trialLoop],
}


// Pavlovian instruction pages
var pav_pagenum = 0;    // holds current page number
var pav_choice = [];    // holds keys available from current page

// dummy event
var pav_initInstruct = {
    type: "html-keyboard-response",
    stimulus: function() {
        let htmlstr = "<body><div></div></body>";
        return htmlstr
    },
    choices: jsPsych.NO_KEYS,
    trial_duration: 0,
    response_ends_trial: false,
    data: {
        label: "pav_initInstruct",
        page_index: pav_pagenum,
        pageStep: 1,    // holds 1 if stepping to next page, -1 if stepping to previous
    },
};

// event to display instruction images
var pav_instruct_page = {
    type: "html-keyboard-response",
    // dummy stimulus and key choices are reset in on_start()
    stimulus: "<body><div></div></body>",
    choices: jsPsych.NO_KEYS,
    trial_duration: null,
    response_ends_trial: true,
    on_start: function (trial) {
        var prev_data = jsPsych.data.get().last(1).values()[0];
        pav_pagenum = prev_data.page_index + prev_data.pageStep;
        trial.stimulus = '<body><div class="centered"><img src=' + pav_instruct[pav_pagenum-1] + ' alt="instruction" width="100%"></div></body>';
        pav_choice = pav_choiceKey_array[pav_pagenum-1];
        trial.choices = pav_choice;     // set keys available from current page
    },
    on_finish: function (data) {
        data.page_index = pav_pagenum;
        // set pageStep, which will be added to page_index to compute the next instr_pagenum
        if (data.key_press == pav_choice[0]) {
            data.pageStep = 1
        } else if  (data.key_press == pav_choice[1]) {
            data.pageStep = -1
        }
        else throw new Error("invalid key press: " + data.key_press)
    }
};


// timeline for one trial, combine ifnodes and fixed events
var pav_instruct_trialLoop = {
    timeline: [pav_instruct_page],
    // use a loop function to play instruct_page event with different instruction pages
    // until all instruction pages have been shown
    loop_function: function (data) {
        var prev_data = data.values()[0];
        if (prev_data.pageStep < 0 || prev_data.page_index < pav_instruct_pages) {
            return true;
        }
        else {
            return false;
        }
    }
};

var instruct_pav_trialProcedure = {
    timeline: [pav_initInstruct, pav_instruct_trialLoop],
}




// PIT instruction pages
var pit_pagenum = 0;    // holds current page number
var pit_choice = [];    // holds keys available from current page

// dummy event
var pit_initInstruct = {
    type: "html-keyboard-response",
    stimulus: function() {
        let htmlstr = "<body><div></div></body>";
        return htmlstr
    },
    choices: jsPsych.NO_KEYS,
    trial_duration: 0,
    response_ends_trial: false,
    data: {
        label: "pit_initInstruct",
        page_index: pit_pagenum,
        pageStep: 1,    // holds 1 if stepping to next page, -1 if stepping to previous
    },
};

// event to display instruction images
var pit_instruct_page = {
    type: "html-keyboard-response",
    // dummy stimulus and key choices are reset in on_start()
    stimulus: "<body><div></div></body>",
    choices: jsPsych.NO_KEYS,
    trial_duration: null,
    response_ends_trial: true,
    on_start: function (trial) {
        var prev_data = jsPsych.data.get().last(1).values()[0];
        pit_pagenum = prev_data.page_index + prev_data.pageStep;
        trial.stimulus = '<body><div class="centered"><img src=' + pit_instruct[pit_pagenum-1] + ' alt="instruction" width="100%"></div></body>';
        pit_choice = pit_choiceKey_array[pit_pagenum-1];
        trial.choices = pit_choice;     // set keys available from current page
    },
    on_finish: function (data) {
        data.page_index = pit_pagenum;
        // set pageStep, which will be added to page_index to compute the next instr_pagenum
        if (data.key_press == pit_choice[0]) {
            data.pageStep = 1
        } else if  (data.key_press == pit_choice[1]) {
            data.pageStep = -1
        }
        else throw new Error("invalid key press: " + data.key_press)
    }
};


// timeline for one trial, combine ifnodes and fixed events
var pit_instruct_trialLoop = {
    timeline: [pit_instruct_page],
    // use a loop function to play instruct_page event with different instruction pages
    // until all instruction pages have been shown
    loop_function: function (data) {
        var prev_data = data.values()[0];
        if (prev_data.pageStep < 0 || prev_data.page_index < pit_instruct_pages) {
            return true;
        }
        else {
            return false;
        }
    }
};

var instruct_pit_trialProcedure = {
    timeline: [pit_initInstruct, pit_instruct_trialLoop],
}


var instructEnd = {
  type: "image-keyboard-response",
  choices: ['space'],
  stimulus: instruct_end,
  response_ends_trial: true,
  data: {label: "instruct_end"},
};
