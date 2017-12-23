// If budgetApp is undefined, assign new obj
// else use existing budgetApp obj
var budgetApp = budgetApp || {};

'use strict';

budgetApp.input = {

  nav : document.getElementById('budget-nav'),

  form: document.getElementById('test-form'),

  buttons : [...document.querySelectorAll(`.nav-btn`)],

	preventInvalid(e) {
		let key = e.key;

		if (key == '.') {
			e.preventDefault();
		} else if (key == 'e') {
			e.preventDefault();
		} else if (key == '+') {
			e.preventDefault();
		} else if (key == '-') {
			e.preventDefault();
		}
	},

	setMaxNumberLength(e) {
		if (e.target.value.length >= 12) {
			e.preventDefault();
		}
	},

	validateNumberInput(e) {
		budgetApp.input.preventInvalid(e);
		budgetApp.input.setMaxNumberLength(e);
	},

  updateBtns(){
    // If at first category
    if( budgetApp.currentCategory === 0 ){
      // Hide previous btn
        document
        .getElementsByClassName(`previous`)
        [0]
        .classList
        .add(`hidden`);
    // If at last category before `Add Category`
    } else if ( budgetApp.currentCategory 
                === (budgetApp.categories.length - 1) ) {
      // Hide next btn
        document
        .getElementsByClassName(`next`)
        [0]
        .classList
        .add(`hidden`);
    } else {
      // Show all
      budgetApp.input.buttons.forEach( button => {
      button.classList.remove(`hidden`);
      });
    }
  },

  btnCheck( btn ) {
    return btn.innerText;
  },

  btnHandler( e ) {
    e.preventDefault();

    // Get btn
    const btn  = e.target;

    // Check if next or previous
    const direction = budgetApp.input.btnCheck( btn );

    if( direction === 'Next' ) {
      // Set form to next
      let next = +budgetApp.currentCategory + 1;
      // Check for end of ul
      if( next > (budgetApp.categories.length - 1) ){
        budgetApp.currentCategory = (budgetApp.categories.length - 1);
      }  else {
        budgetApp.currentCategory = next;
      }

     } else {
      // Set form to previous 
       let prev = (+budgetApp.currentCategory - 1);

       // Check for beginning of ul
       if( prev < 0){
         budgetApp.currentCategory = 0;
       } else {
         budgetApp.currentCategory = prev;
       }
     }

    // Update btn display
    budgetApp.input.updateBtns();

    // Update form
    budgetApp.forms.updateForm();

    // Get current category idx
    const idx = budgetApp.currentCategory;

    // Update side nav display
    budgetApp.nav.updateNavDisplay( idx );
  }

};

