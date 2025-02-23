let startCalc = document.getElementById("start"),

	budgetValue = document.getElementsByClassName("budget-value")[0],
	daybudgetValue = document.getElementsByClassName("daybudget-value")[0],
	levelValue = document.getElementsByClassName("level-value")[0],
	expensesValue = document.getElementsByClassName("expenses-value")[0],
	optionalexpensesValue = document.getElementsByClassName("optionalexpenses-value")[0],
	incomeValue = document.getElementsByClassName("income-value")[0],
	monthsavingsValue = document.getElementsByClassName("monthsavings-value")[0],
	yearsavingsValue = document.getElementsByClassName("yearsavings-value")[0],

	expensesItem = document.getElementsByClassName("expenses-item"),
	expensesBtn = document.getElementsByTagName("button")[0],
	optionalexpensesBtn = document.getElementsByTagName("button")[1],
	countBudgBtn = document.getElementsByTagName("button")[2],
	optExpenses = document.querySelectorAll(".optionalexpenses-item"),
	optionalexpensesItem = document.querySelectorAll(".optionalexpenses-item"),

	incomeItem = document.querySelector(".choose-income"),
	checkSaving = document.querySelector("#savings"),
	sumValue = document.querySelector(".choose-sum"),
	percentValue = document.querySelector(".choose-percent"),
	yearValue = document.querySelector(".year-value"),
	monthValue = document.querySelector(".month-value"),
	dayValue = document.querySelector(".day-value");

let money,
	time;

expensesBtn.disabled = true;
optionalexpensesBtn.disable = true;
countBudgBtn.disabled = true;

startCalc.addEventListener('click', function() {
	time = prompt("Введите дату в формате YYYY-MM-DD", "");
	money = +prompt("Ваш бюджет на месяц?", "");	

	while (isNaN(money) || money == "" || money == null) {
		money = +prompt("Ваш бюджет на месяц?", "");
	}
	appData.budget = money;
	appData.timeData = time;
	budgetValue.textContent = money.toFixed();
	yearValue.value = new Date(Date.parse(time)).getFullYear();
	monthValue.value = new Date(Date.parse(time)).getMonth() + 1;
	dayValue.value = new Date(Date.parse(time)).getDate();

	expensesBtn.disabled = false;
	optionalexpensesBtn.disabled = false;
	countBudgBtn.disabled = false;
});

expensesBtn.addEventListener('click', function() {
	let sum = 0;
	for (let i = 0; i < expensesItem.length; i++) {
		let a = expensesItem[i].value,
			b = expensesItem[++i].value;

		if ((typeof (a)) === 'string' && (typeof (a)) != null && (typeof (b) != null) &&
			a != '' && b != '' && a.length < 50) {
			appData.expenses[a] = b;
			sum += +b;			
		} else {
			i = i - 1;
		}
	}
	appData.sumOfCost = sum;
	expensesValue.textContent = sum;
});

optionalexpensesBtn.addEventListener('click', function () {
	for (let i = 0; i < optionalexpensesItem.length; i++) {
		let answer = optionalexpensesItem[i].value;
		appData.optionalExpenses[i] = answer;
		optionalexpensesValue.textContent += appData.optionalExpenses[i] + ' ';
	}
	console.log(optionalexpenses.length);
	console.log(appData.optionalExpenses[i]);
});

countBudgBtn.addEventListener('click', function () {
	if (appData.budget != undefined) {
		appData.moneyPerDay = ((appData.budget-appData.sumOfCost) / 30).toFixed();
		daybudgetValue.textContent = appData.moneyPerDay;
		if (appData.moneyPerDay < 100) {
			levelValue.textContent = "Минимальный уровень достатка";
		} else if (appData.moneyPerDay > 100 && appData.moneyPerDay < 2000) {
			levelValue.textContent = "Средний уровень достатка";
		} else if (appData.moneyPerDay > 2000) {
			levelValue.textContent = "Высокий уровень достатка";
		} else {
			levelValue.textContent = "Произошла ошибка";
		}
	}
	else{
		budgetValue.textContent = "Произошла ошибка";
	}
});

incomeItem.addEventListener('input', function(){
	let item = incomeItem.value;
	appData.income = item.split(', ');
	incomeValue.textContent = appData.income;
});

checkSaving.addEventListener('click', function(){
	if(appData.savings == true){
		appData.savings = false;
	}else{
		appData.savings = true;
	}
});

sumValue.addEventListener('input', function(){
	if(appData.savings == true){
		let sum = +sumValue.value,
			percent = +percentValue.value;

		appData.monthInCome = sum/100/12*percent;
		appData.yearInCome = sum / 100 * percent;
		monthsavingsValue.textContent = appData.monthInCome.toFixed(1);
		yearsavingsValue.textContent = appData.yearInCome.toFixed(1);
	}
});

percentValue.addEventListener('input', function () {
	if (appData.savings == true) {
		let sum = +sumValue.value,
			percent = +percentValue.value;

		appData.monthInCome = sum / 100 / 12 * percent;
		appData.yearInCome = sum / 100 * percent;
		monthsavingsValue.textContent = appData.monthInCome.toFixed(1);
		yearsavingsValue.textContent = appData.yearInCome.toFixed(1);
	}
});

let appData = {
	budget: money,
	timeData: time,
	expenses: {},
	optionalExpenses: {},
	income: [],
	savings: false
};