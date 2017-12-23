// If budgetApp is undefined, assign new obj
// else use existing budgetApp obj
var budgetApp = budgetApp || {};

`use strict`;

budgetApp.nav = {

  ul: document.getElementById(`budget-nav`),

  createCategory( category, idx ) {
    // Create new li element
    const li = document.createElement( `li` );
          li.setAttribute( `data-idx`, idx );
          li.classList
            .add( 
              `budget-nav`, 
               category.classname );

    // Create new anchor element 
    const a = document.createElement( `a` );
          a.setAttribute( `href`, `#` );
    
    // Set to active if first category
    if( idx === 0 ) {
      a.classList.add( `active-link` );
    }

    // Create icon element
    const i = document.createElement( `i` );
          i.className = category.icon;
          i.setAttribute( `aria-hidden`, `true` );
          i.innerText = category.name;

    a.appendChild( i );
    li.appendChild( a );

    return li;
  },

  createNav() {
    // Iterate through categories
    budgetApp.categories.forEach( ( category, idx ) => {

      // Create new li element for category
      const newLi  = budgetApp.nav.createCategory( category, idx );

      // Get add item category
      const addItem = document.getElementsByClassName(`add-item`)[0];

      // Append to ul before add item category
      if(addItem.parentNode) {
        addItem.parentNode.insertBefore(newLi, addItem);
      }
    });

  },

  updateNav( e ) {

    // Get new category idx
    const newIdx = e.target.closest(`li`).getAttribute(`data-idx`);

    // Get old category idx
    const oldIdx =  budgetApp.currentCategory;
    
    // Update state
    budgetApp.currentCategory = newIdx;

    // Clear old active categories
    const inactives = budgetApp.nav.ul.querySelectorAll(`a`);
    inactives.forEach( anchor => {
      anchor.classList.remove(`active-link`);
    });

    // Set next category as active
    e.target.closest(`a`).className = `active-link`;
    
    // Update buttons
    budgetApp.input.updateBtns();

    // Update form
    budgetApp.forms.updateForm();
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
