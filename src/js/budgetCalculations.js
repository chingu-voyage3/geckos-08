// Store user input as entered
function getInput() {

    const currentCategory = document.querySelectorAll('input[type=number]');

    for (var i = 0; i < Object.keys( currentCategory ).length; i++) {
        
        // Add listener to budget input fields
        currentCategory[i].addEventListener("blur", function() {

            // Add user input to budget category data
            if (!Number.isNaN(this.valueAsNumber)) {
                budgetApp.categories[budgetApp.currentCategory].inputs[this.getAttribute('data-idx')].amt = this.valueAsNumber;
            } else {
                budgetApp.categories[budgetApp.currentCategory].inputs[this.getAttribute('data-idx')].amt = undefined;
            }
            // Recalculate category total
            sumCategories();
        });
    }
}

// Sum all category inputs
function sumCategories() {
    
    budgetApp.categories[budgetApp.currentCategory].total = 0;

    budgetApp.categories[budgetApp.currentCategory].inputs.forEach(function(item){

        budgetApp.categories[budgetApp.currentCategory].total += item.amt ? item.amt : 0;
        
    });
}

