class Calendar {
	constructor() {

		this.monthList = [
			"January",
			"February",
			"March",
			"April",
			"May",
			"June",
			"July",
			"August",
			"September",
			"October",
			"November",
			"December"
		];

		this.currDate = new Date();
		this.headerMonth = document.querySelector(".cal-header__month p");
		this.prevButton = document.querySelector(".cal-header__prev-button");
		this.nextButton = document.querySelector(".cal-header__next-button");
		this.calHeaderDate = document.querySelector(".cal-header__date");
		this.calDays = document.querySelector(".cal-days");

		this.init();

	}

	init() {
		this.events();
		this.setCurrentMonth();
		this.setHeaderDate();
		this.drawCalendar();
	}

	events() {
		this.prevButton.addEventListener("click", () => this.getPrevMonth());
		this.nextButton.addEventListener("click", () => this.getNextMonth());
	}

	setCurrentMonth() {
		this.headerMonth.innerHTML = this.monthList[this.currDate.getMonth()];
	}

	setHeaderDate() {
		this.calHeaderDate.innerHTML = this.currDate.toDateString();
	}

	getPrevMonth() {
		this.currDate.setMonth(this.currDate.getMonth() - 1); 
		this.setCurrentMonth();
		this.drawCalendar();
	}

	getNextMonth() {
		this.currDate.setMonth(this.currDate.getMonth() + 1); 
		this.setCurrentMonth();
		this.drawCalendar();
	}

	drawCalendar() {
		let firstDayOfMonth = new Date(this.currDate.getFullYear(), this.currDate.getMonth());
		let lastDayOfThisMonth = new Date(this.currDate.getFullYear(), this.currDate.getMonth() + 1, 0);
		let lastDayOfPrevMonth = new Date(this.currDate.getFullYear(), this.currDate.getMonth(), 0);
		let thisMonth = new Date().getMonth();
		let dateCells = "";
		let currDateCells = "";
		let prevDateCells = "";
		let prevDatesPopulated = false;

		for (let i = 1; i <= lastDayOfThisMonth.getDate(); i++){
			if (firstDayOfMonth.getDay() !== 0 && !prevDatesPopulated){
				prevDateCells = this.populatePrevMonthDays(firstDayOfMonth, lastDayOfPrevMonth);
				prevDatesPopulated = true;
			}
			if (this.currDate.getDate() == i && this.currDate.getMonth() == thisMonth){
				currDateCells += `<div class="cal-days--today">${i}</div>`;
			}
			currDateCells += `<div>${i}</div>`;
		}
		
		dateCells = prevDateCells + currDateCells;
		this.calDays.innerHTML = dateCells;



	}

	populatePrevMonthDays(firstDayOfCurrMonth, lastDayOfPrevMonth) {
		let dateCells = "";
		let beginPrevDays = parseInt(lastDayOfPrevMonth.getDate()) - parseInt(firstDayOfCurrMonth.getDay() - 1);

		for (let i = beginPrevDays; i <= lastDayOfPrevMonth.getDate(); i++){
			dateCells += `<div class="cal-days--prev-month">${i}</div>`;
			
		}

		return dateCells;
	}
}

export default Calendar;
