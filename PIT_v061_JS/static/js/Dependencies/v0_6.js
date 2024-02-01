
// Initialize task parameters
var numInstrTrials = 24;
var numPavStim = 2;
var numPavChecks = 2;
var numPavTrials = 20; //Should be a multiple of numPavStim above
var numExtinctTrials = 15;
var numPITtrials = 72; //Should be a multiple of numPavStim above and door_permute.length below
var pitBinSize = numPITtrials/8;

var numPractTrials_instr = 12;
var numPractTrials_pav = 8;

// Check that numPavTrials and numPITtrials are a multiple of numPavStim (for balanced design)
if (numPavTrials%numPavStim !== 0) {
  throw new RangeError("# Pav Trials not a multiple of stims.");
}
if (numPITtrials%numPavStim !== 0) {
  throw new RangeError("# PIT Trials not a multiple of stims.");
}

// Set up choice keys for pavlovian checks
var pavcheck_choice_keys = [jsPsych.pluginAPI.convertKeyCharacterToKeyCode('1'),
                   jsPsych.pluginAPI.convertKeyCharacterToKeyCode('2'),
                   jsPsych.pluginAPI.convertKeyCharacterToKeyCode('3'),
                   jsPsych.pluginAPI.convertKeyCharacterToKeyCode('4'),
                   jsPsych.pluginAPI.convertKeyCharacterToKeyCode('5')]

// Set up trial event durations
var pitITIdur = jsPsych.randomization.shuffle(linspace(400,1400,(numPITtrials + numExtinctTrials)));

// Instrumental timings
var instrITIdur = jsPsych.randomization.shuffle(linspace(400,1400,numInstrTrials));
var startDur = 100;
var cueDur = 1500;
var ISIdur = 500;
var outDur = 1000;

// Pavlovian timings
var pavITIdur = jsPsych.randomization.shuffle(linspace(500,1500,numPavTrials + numPavChecks));
var pavRespDur = 1000
var pavISIDur = 250
var pavCSDur = 500
var pavOutDur = 1250

// Set up practice trial parameters
var pract_numTrials = 6; // Needs to be a multiple of numPavStim for a balanced design
var pract_ITIdur = [500,1000];

// Define the possible outcome vector for low value responses
var magOutcomeLow = jsPsych.randomization.shuffle(Array(10).fill(2).concat(Array(2).fill(0)))
// Define the possible outcomes for high value responses
var magOutcomeHighUncert = jsPsych.randomization.shuffle(Array(5).fill(10).concat(Array(7).fill(0)))
var initmagOutcomeHighUncert = Array(10,10,0,0,10,10,0,0,0,0,10,0)
var magOutcomeHighCert = jsPsych.randomization.shuffle(Array(10).fill(5).concat(Array(2).fill(0)))
var initmagOutcomeHighCert = Array(5,0,5,5,5,5,5,0,5,5,5,5)

var uncertCond = coinFlip()
if (uncertCond == true) {
  var between_condition = 'pav_uncert'
} else {
  var between_condition = 'pav_cert'
}

// Specify file-name details given counterbalances / permutations
// Instrumental:
var choice_options = ["l","r"];
var door_permute = ["LM", "LR", "MR"];
if (numInstrTrials%door_permute.length !== 0) {
  throw new RangeError("# Instr Trials not a multiple of door permutations.");
}
