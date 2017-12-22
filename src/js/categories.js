var budgetApp = budgetApp || {};

`use strict`;

budgetApp.categories = [
  {
    name: "Income",
    classname: "income",
    icons: "fa fa-money",
    form: [
      { name: "Income"}
    ]
  },
  {
    name: "Housing",
    classname: "housing",
    icons: "fa fa-home",
  },
  {
    name: "Transportation",
    classname: "transportation",
    icons: "fa fa-car",
  },
  {
    name: "Education",
    classname: "education",
    icons: "fa fa-graduation-cap",
  },
  {
    name: "Loans & Credit Cards",
    classname: "loans-credit-cards",
    icons: "fa fa-credit-card-alt",
  },
  {
    name: "Savings & Investing",
    classname: "savings-investing",
    icons: "fa fa-bank",
  },
  {
    name: "Miscellaneous",
    classname: "miscellaneous",
    icons: "fa fa-paperclip",
  },
  {
    name: "Add Category",
    classname: "add-item",
    icons: "fa fa-plus-square",
  }

];
