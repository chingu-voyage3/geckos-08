var budgetApp = budgetApp || {};

budgetApp.dataManager = (function() {
  let data = [
    {
      name          : "Income",
      subcategories : [
        {
          name  : "Salary / Wages",
          value : 236
        },
        {
  				name  : 'Other',
          value : 46
  			}
      ]
    },
    {
  		name          : 'Housing',
  		subcategories : [
  			{
  				name  : 'Housing',
          value : 2340
  			},
  			{
  				name  : 'Utilities',
          value : 239
  			},
  			{
  				name  : 'Cable / Internet',
          value : 64
  			},
        {
  				name  : 'Insurance',
          value : 456
  			},
  			{
  				name  : 'Maintenance',
          value : 34
  			},
  		],
  	},
    {
  		name          : 'Transportation',
  		subcategories : [
  			{
  				name : 'Payment',
          value : 349
  			},
  			{
  				name : 'Insurance',
          value : 140
  			},
        {
  				name : 'Fuel',
          value : 100
  			},
  			{
  				name : 'Maintenance',
          value : 58
  			},
  		],
  	},
    {
  		name      : 'Education',
  		subcategories    : [
  			{
  				name  : 'Tuition',
  				value : 1200
  			},
  			{
  				name  : 'Supplies',
  				value : 234
  			},
  			{
  				name  : "Loans",
  				value : 6000
  			},
  		],
  	},

  	{
  		name      : 'Loans & Credit Cards',
  		subcategories    : [
  			{
  				name  : 'Loans Payment',
  				value : 83
  			},
  			{
  				name  : 'Credit Cards',
  				value : 130
  			},
  		],
  	},

  	{
  		name      : 'Savings & Investing',
  		subcategories    : [
  			{
  				name  : 'Retirement',
  				value : 45
  			},
  			{
  				name  : 'Emergency',
  				value : 25
  			},
  			{
  				name  : 'Stocks',
  				value : 65
  			},
  		],
  	},
  	{
  		name      : 'Miscellaneous',
  		subcategories    : [
  			{
  				name  : 'Entertainment',
  				value : 40
  			},
  			{
  				name  : 'Clothing',
  				value : 100
  			},
  			{
  				name  : 'Travel',
  				value : 100
  			},
  			{
  				name  : 'Medical',
  				value : 115
  			},
  			{
  				name  : 'Personal Care',
  				value : 30
  			},
  			{
  				name  : 'Pet Supplies',
  				value : 30
  			},
  		],
  	},
  ]

  function update() {
    // chrome.storage.sync.get();
  }

  function getCategory(index) {
    return data[index];
  }

  return {
    getCategory
  }
})();
