// End page slide
// Create timeline variable
var endTask_var = [];
for (var trial = 0; trial < 1; trial++) {
  endTask_var.push({
    tv_end_task: task_end[trial],
  });
}

var endTaskSlide = {
  type: "image-keyboard-response",
  stimulus:  jsPsych.timelineVariable("tv_end_task"),
  choices: ['space'],
  trial_duration: null,
  response_ends_trial: true,
};

// timeline for one trial, combine ifnodes and fixed events
var endTask_procedure = {
  timeline: [endTaskSlide],
  timeline_variables: endTask_var
};
