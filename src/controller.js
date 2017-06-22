/* jshint undef: false, unused: false, esversion: 6, asi: true */
/*globals Portfolio */
/*exported Controller*/

class Controller {
	constructor() {
		this.portfolio = new Portfolio()
	}
	
	inputLog(thePhase) {
		thePhase.addLog(...this.logArray)
	}
	
	changeContent() {
		let newStart, newStop, newInt
		newStart = this.addSemi(this.start)
		newStop = this.addSemi(this.stop)
		if (this.interval === undefined || this.interval === ':' || this.interval === '') {
			newInt = this.addSemi('0000')
		} else {
			newInt = this.addSemi(this.interval)
		}
		return {newStart, newStop, newInt}
	}
	
	addSemi(string) {
		let startString,aString, newString
		startString = string.split('')
		startString.splice(2,0, ':')
		aString = startString.join()
		newString = aString.replace(/,/g, '')
		return newString
	}
	
	submitContent() {
		let item
		item = this.changeContent()
		let project = this.portfolio.selectProject(this.project)
		let phase = this.portfolio.selectPhase(project, this.phase)
		phase.addLog(this.date, item.newStart, item.newInt, item.newStop, this.comment)
		console.log(phase)
		//this.project.addLog(this.phase, this.date, item.newStart, item.newInt, item.newStop, this.comment)
		this.clearText()
	}
	
	clearText() {
		this.phase = '' 
		this.date = ''
		this.start = ''
		this.interval = ''
		this.stop = ''
		this.comment = ''
	}
	
	show() {
		console.log(this.portfolio)
	}
		
 	showContent(fileContent) {
		let workSheetName = fileContent.SheetNames
		/*Get rid of the instructions sheet*/
		workSheetName.pop()
		for (let sheet of workSheetName) {
			let worksheet = fileContent.Sheets[sheet]
			let tableStart
			for (let [name, value] of Object.entries(worksheet)) {
				if (/Project/.test(value.w)) {
					tableStart = parseInt(name.substring(1))+1
				}
			}
			let project, phase
			this.logArray = []
			for (let [name, value] of Object.entries(worksheet)) {
				if (name.substring(1) >= tableStart && name.slice(0,1) === 'A') {
					project = this.portfolio.checkProject(`${sheet} ${value.w}`)
				}
				if (name.substring(1) >= tableStart && name.slice(0,1) === 'B') {
					phase = this.portfolio.checkPhase(project, value.w)
				}
				if (name.substring(1) >= tableStart && name.slice(0,1) === 'C') {
					let dValues = value.w.split('/')
					let newYear = Number(`20${dValues[2]}`) 
					let newDate = new Date(newYear, Number(dValues[0]) - 1, dValues[1])
					this.logArray.push(newDate)
				}
				if (name.substring(1) >= tableStart && name.slice(0,1) != 'A' && name.slice(0,1) != 'B' && name.slice(0,1) != 'C') {
					if (name.slice(0,1) === 'H') {
						this.logArray.push(value.w)
						this.inputLog(phase)
						this.logArray = []
					} else if (name.slice(0,1) != 'G') {
						this.logArray.push(value.w)
					}
				}
			}
		}
		//console.log(this.portfolio)
	}
	
}