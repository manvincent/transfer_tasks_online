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

  // Execute code
  timeline.push(obsvImit_trialProcedure)
  timeline.push(endTask_procedure)

  // Run the timeline!
  finish = function() {
        psiTurk.completeHIT();
    };


    jsPsych.init({
        timeline: timeline,
        on_finish: function() {
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
