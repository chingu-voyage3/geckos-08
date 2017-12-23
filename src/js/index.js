// If budgetApp is undefined, assign new obj
// else use existing budgetApp obj
var budgetApp = budgetApp || {};

'use strict';

// Tracker for current category
budgetApp.currentCategory = 0;

// Event listeners
budgetApp.listeners = {
  btnHandler: budgetApp.navBtns.btnHandler,
  updateNav: budgetApp.nav.updateNav,
  validateNumberInput: budgetApp.input.validateNumberInput,
};

budgetApp.init = ( listeners ) => {
  // Register update nav listener
  budgetApp
    .nav
    .ul
    .addEventListener( `click`, listeners.updateNav );

  // Register button listener
  budgetApp
    .navBtns
    .buttons
    .forEach( btn => {
    btn.addEventListener( `click`, listeners.btnHandler );
  });

  // Register input listeners
  budgetApp
    .input
    .form
    .addEventListener( 
      `keypress`,
      listeners.validateNumberInput,
      false);

},

budgetApp.onReady = () => {
  // Create nav
  budgetApp.nav.createNav();

  // Update form to show first nav category
  budgetApp.forms.updateForm( 0 );

  // Initialize listeners when ready
  budgetApp.init( budgetApp.listeners );

};

// Check if the DOMContentLoaded has already been completed
if (document.readyState === 'complete' || document.readyState !== 'loading') {
  budgetApp.onReady();
} else {
  document.addEventListener('DOMContentLoaded', budgetApp.onReady);
}
