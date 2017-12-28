// Store user input as entered
function getInput() {

    const calc = document.querySelectorAll('input[type=number]');

    for (var i = 0; i < Object.keys( calc ).length; i++) {
        
        // Add listener to budget input fields
        calc[i].addEventListener("blur", function() {

            // Add user input to budget categories
            budgetApp.categories[budgetApp.currentCategory].inputs[this.getAttribute('data-idx')].amt = this.valueAsNumber;
            sumCategories();
        }, true);
    }
}

function sumCategories() {
    
        budgetApp.categories[budgetApp.currentCategory].total = 0;    
        budgetApp.categories[budgetApp.currentCategory].inputs.forEach(function(item){
        budgetApp.categories[budgetApp.currentCategory].total += item.amt;
        
    });
    }

