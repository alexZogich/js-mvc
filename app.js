var Model = function ( options ) {	
	return options;
}

var Controller = function (options) {
	this.opts = options;
	this.render();
	this.addEvents();
	this.checkModel();

}

Controller.prototype.addEvents = function () {
	for (var item in this.opts.clickHandlers) {
		document.getElementById(item.substring(1))
				.addEventListener("click",this.opts[this.opts.clickHandlers[item]].bind(this.opts));
	}
}

Controller.prototype.render = function () {
	document.getElementById(this.opts.elementId)
			.innerHTML = this.opts.render();
}

Controller.prototype.checkModel = function () {

	if(this.opts.model.changed === true) {
			document.getElementById(this.opts.elementId)
					.innerHTML = this.opts.render();
			this.render();
			this.addEvents();
			this.opts.model.changed = false;
			
		}
	setTimeout(this.checkModel.bind(this), 100);
}

////////////////////////////////////////////////////////////

var Student = new Model({
    name: 'John',
    age: 22,
    year: 5,
    examsTaken: 2,
    takeExam: function(){
        this.examsTaken++;
        this.changed = true;
    }
});

var StudentController = new Controller({
    model: Student,
    elementId: 'student-container',
    render: function(){
        return '<span>' + this.model.name + '</span><button id="student-exams-button">Increase exams taken</button>';
    },
    clickHandlers: {
        '#student-exams-button': 'updateExams'
    },
    updateExams: function(){
        this.model.takeExam();
    }
});
