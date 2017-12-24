// If budgetApp is undefined, assign new obj
// else use existing budgetApp obj
var budgetApp = budgetApp || {};

`use strict`;

budgetApp.nav = {

  ul: document.getElementById(`budget-nav`),

  updateNav( e ) {

    // Get new category idx
    const newIdx = e.target.closest(`li`).getAttribute(`data-idx`);

    // Get old category idx
    const oldIdx =  +budgetApp.currentCategory;
    
    // Update state
    budgetApp.currentCategory = +newIdx;

    // Clear old active categories
    const inactives = budgetApp.nav.ul.querySelectorAll(`a`);
    inactives.forEach( anchor => {
      anchor.classList.remove(`active-link`);
    });

    // Set next category as active
    e.target.closest(`a`).className = `active-link`;
    
    // Update form
    budgetApp.forms.updateForm();

    // Update buttons
    budgetApp.input.updateBtns();
 },

  // For button events
  updateNavDisplay( idx ){
    // Get links
    const links = document.getElementById(`budget-nav`).querySelectorAll(`li`);

    // Get anchors
    const anchors = document.getElementById(`budget-nav`).querySelectorAll(`a`);

    // Clear active anchors
    anchors.forEach( anchor => {
      anchor.classList.remove( `active-link` );
    });

    // Assign active to current idx
    links.forEach( link => {
      let dataIdx = +link.getAttribute(`data-idx`);
      if( dataIdx === idx ){
        anchors[dataIdx].classList.add( `active-link` );
      }
    });

  },

};
