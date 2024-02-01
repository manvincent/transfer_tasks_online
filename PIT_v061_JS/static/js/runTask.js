/*
 * Requires:
 *     psiturk.js
 *     utils.js
 */

// Initalize psiturk object
var psiTurk = new PsiTurk(uniqueId, adServerLoc, mode);

var mycondition = condition;  // these two variables are passed by the psiturk server process
var mycounterbalance = counterbalance;  // they tell you which condition you have been assigned to
// they are not used in the stroop code but may be useful to you

// All pages to be loaded
var instructionPages = [ // add as a list as many pages as you like
	"instructions/instruct-1.html",
	"instructions/instruct-ready.html"
];
psiTurk.preloadPages(instructionPages);

/********************
* HTML manipulation
*
* All HTML files in the templates directory are requested
* from the server when the PsiTurk object is created above. We
* need code to get those pages from the PsiTurk object and
* insert them into the document.
*
********************/

var runTask = function() {
  // Initialize task
	// initTask.js

  // Deliver the instructions (always in the order of: Instrument --> Extinction -- > Pavlovian)

	// Push instrumental instruction objects to the timeline
	timeline.push(instruct_instr_trialProcedure)
	timeline.push(pract_trialProcedure)

	// Push pavlovian instruction objects to the timeline
  timeline.push(instruct_pav_trialProcedure);
  timeline.push(pract_pav_trialProcedure)

	// Push final PIT instruction objects
  timeline.push(instruct_pit_trialProcedure);
	// Push end of instruction objects
  timeline.push(instructEnd)

  // Run the training sessions
  if (instrFirst == true) {
		// runInstrTrain.js
		// Push instrumental objects to the timeline
		timeline.push(instrStart);
		timeline.push(instr_trialProcedure)
		// runPavTrain.js
		// Push pavlovian trials to the timeline
		timeline.push(pavStart);
		timeline.push(pav_trialProcedure)
		// Push instrumental objects to the timeline
		timeline.push(instrStart);
		timeline.push(instr_trialProcedure)
		// Push pavlovian trials to the timeline
		timeline.push(pavStart);
		timeline.push(pav_trialProcedure)
		// Push instrumental objects to the timeline
		timeline.push(instrStart);
		timeline.push(instr_trialProcedure)
		// Push pavlovian trials to the timeline
		timeline.push(pavStart);
		timeline.push(pav_trialProcedure)
		// Always yoke pavCheck to last Pavlovian block
		timeline.push(pavCheck_trialProcedure)
  } else {
		// runPavTrain.js
		// Push pavlovian trials to the timeline
		timeline.push(pavStart);
		timeline.push(pav_trialProcedure)
		// runInstrTrain.js
		// Push instrumental objects to the timeline
		timeline.push(instrStart);
		timeline.push(instr_trialProcedure)
		// Push pavlovian trials to the timeline
		timeline.push(pavStart);
		timeline.push(pav_trialProcedure)
		// Push instrumental objects to the timeline
		timeline.push(instrStart);
		timeline.push(instr_trialProcedure)
		// Push pavlovian trials to the timeline
		timeline.push(pavStart);
		timeline.push(pav_trialProcedure)
		// Always yoke pavCheck to last Pavlovian block
		timeline.push(pavCheck_trialProcedure)
		// Push instrumental objects to the timeline
		timeline.push(instrStart);
		timeline.push(instr_trialProcedure)
	}

	// Run the transfer session
	// runPITtransfer.js
	// Push PIT objects to the timeline
	timeline.push(pitStart);
	timeline.push(pit_trialProcedure)

	// Run end-task
	timeline.push(endTask_procedure)

  // Run the timeline!
  finish = function() {
        psiTurk.completeHIT();
    };


    jsPsych.init({
        timeline: timeline,
        on_finish: function() {
        	psiTurk.recordUnstructuredData('BS_cond',between_condition)
        	psiTurk.recordUnstructuredData('instr_First',instrFirst)
        	psiTurk.recordUnstructuredData('instrTimeline_var',instrTimeline_var)
        	psiTurk.recordUnstructuredData('pavTimeline_var',pavTimeline_var)
        	psiTurk.recordUnstructuredData('pitTimeline_var',pitTimeline_var)
            psiTurk.saveData({
                  success: function() { psiTurk.computeBonus('compute_bonus', function(){finish()}); }
			});
			console.log('The experiment is over')
        },
        on_data_update: function(data) {
            psiTurk.recordTrialData(data);
        }
    });
}


// Task object to keep track of the current phase
var currentview;

/*******************
 * Run Task
 ******************/
$(window).load( function(){
    psiTurk.doInstructions(
    	instructionPages, // a list of pages you want to display in sequence
    	function() { currentview = new runTask(); } // what you want to do when you are done with instructions
    );
});
