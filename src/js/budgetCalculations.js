
function getInput() {

    var calc = document.querySelectorAll('input[type=number]');

    for (var i = 0; i < Object.keys( calc ).length; i++) {
        
        calc[i].addEventListener("blur", function() { 
            budgetApp.categories[budgetApp.currentCategory].inputs[this.getAttribute('data-idx')].amt = this.value;
        }, true);
    }
}



