'use strict';

const onReady = ( ) => {
  budgetApp.nav.createNav();
  budgetInput.init();
  navBtns.init();
};

// Check if the DOMContentLoaded has already been completed
if (document.readyState === 'complete' || document.readyState !== 'loading') {
  onReady();
} else {
  document.addEventListener('DOMContentLoaded', onReady);
}
