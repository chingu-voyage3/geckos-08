'use strict';

const budgetInput = {

	links : [...document.querySelectorAll(`.budget-nav a`)],

	icons : [...document.querySelectorAll(`.budget-nav a i`)],

	forms : [...document.querySelectorAll(`.income-items form`)],

	numberInputs : [
		...document.querySelectorAll(`.income-items input[type="number"]`),
	],
  
	setActiveLink(e, anchor ) {
    let currentTarget = null;
    // For btn handler
    if( e === null) {
      currentTarget = anchor;
    } else {
      currentTarget = e.currentTarget;
    }

		budgetInput.links.forEach((link) => {
			link.classList.remove(`active-link`);
		});

		currentTarget.classList.add(`active-link`);

		budgetInput.forms.forEach((form) => {
			form.classList.remove(`active-form`);
		});

		budgetInput.forms.forEach((form) => {
			form.classList
				.item(0)
				.includes(currentTarget.parentNode.classList.item(1)) &&
				form.classList.add(`active-form`);
		});
	},
 
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
		budgetInput.preventInvalid(e);
		budgetInput.setMaxNumberLength(e);
	},

  init() {

    budgetInput.links.forEach((link) => {
      link.addEventListener(`click`, budgetInput.setActiveLink);
    });

    budgetInput.numberInputs.forEach((numberInput) => {
      numberInput.addEventListener(`keypress`, budgetInput.validateNumberInput, 
      false);
    });
  }
   
};

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

