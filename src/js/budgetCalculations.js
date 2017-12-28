// Store user input as entered
function getInput() {

    const calc = document.querySelectorAll('input[type=number]');

    for (var i = 0; i < Object.keys( calc ).length; i++) {
        
        // Add listener to budget input fields
        calc[i].addEventListener("blur", function() {

            // Add user input to budget categories
            budgetApp.categories[budgetApp.currentCategory].inputs[this.getAttribute('data-idx')].amt = this.valueAsNumber;
        }, true);
    }
}



