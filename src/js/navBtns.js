'use strict';

const navBtns = {
  buttons : [...document.querySelectorAll(`.nav-btn`)],

  btnCheck( btn ) {
    return btn.classList.item(1);
  },

  btnHandler( e ) {
    e.preventDefault();

    const btn  = e.target;
    // Check if next or previous
    const direction = navBtns.btnCheck( btn );

    // Store category
    const category = btn.parentNode
      .classList
      .item( 1 );

    if( direction === 'next' ) {
      // Get next anchor element
      let next = null;

      budgetInput.links.forEach( link => {
        let linkCategory = link.parentNode
          .classList
          .item( 1 );

        if( linkCategory === category ) {
          next = link.parentNode
            .nextElementSibling
            .querySelectorAll( 'a' )
            [0];
        }
      });

      // Set active link
      budgetInput.setActiveLink( null, next );

    } else {
      // Get previous anchor element
      let prev = null;

      budgetInput.links.forEach( link => {
        let linkCategory = link.parentNode
          .classList
          .item( 1 );

        if( linkCategory === category ) {
          prev = link.parentNode
            .previousElementSibling
            .querySelectorAll( 'a' )
            [0];
        }
      });

      // Set active link
      budgetInput.setActiveLink( null, prev );
    }
    
  },

  init() {
    navBtns.buttons.forEach( btn => {
      btn.addEventListener( `click`, navBtns.btnHandler );
    });
  }
};

