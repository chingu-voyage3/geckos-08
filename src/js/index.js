// If budgetApp is undefined, assign new obj
// else use existing budgetApp obj
var budgetApp = budgetApp || {};

'use strict';

// Tracker for current category
budgetApp.currentCategory = 0;

budgetApp.onReady = () => {
  budgetApp.nav.createNav();
  budgetApp.forms.updateForm(0);
  budgetApp.nav.registerListeners();
};

// Check if the DOMContentLoaded has already been completed
if (document.readyState === 'complete' || document.readyState !== 'loading') {
  budgetApp.onReady();
} else {
  document.addEventListener('DOMContentLoaded', budgetApp.onReady);
}
