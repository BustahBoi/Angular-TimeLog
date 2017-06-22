class Phase {
	constructor(newName) {
		this.name = newName
		this.allMyLogs = []
		this.letEdit = false
	}
	
	removeLog(log) {
		let aLog
		for (aLog of this.allMyLogs) {
			if (aLog === log) {
				this.allMyLogs.splice(this.allMyLogs.indexOf(log), 1)
				
			}
		}
	}
	
	addLog (newDate, newStart, newInterval, newStop, newComment) {
		let newLog = new Log(newDate, newStart, newInterval, newStop, newComment);
		this.allMyLogs.push(newLog)
    }
	
	getClass() {
		let theClass, select
		select = {Planning: "bg-success", Analysis: "bg-info", Design: "bg-warning", Coding: "bg-danger", Testing: "bg-primary"}
		theClass = select[this.name]
		return theClass
	}
	
}
