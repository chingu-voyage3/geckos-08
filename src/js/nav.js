var budgetApp = budgetApp || {};

`use strict`;

budgetApp.nav = {

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
          i.className = category.icons;
          i.setAttribute( `aria-hidden`, `true` );
          i.innerText = category.name;

    a.appendChild( i );
    li.appendChild( a );

    return li;
  },

  createNav() {
    // Get ul element
    const ul = document.getElementById('budget-nav'); 

    // Iterate through categories
    budgetApp.categories.forEach( ( category, idx ) => {

      // Create new li element for category
      const newLi  = budgetApp.nav.createCategory( category, idx );

      // Append to ul
      ul.appendChild( newLi ); 
    });

  }

};
