class Project {
	constructor(newName) {
		this.name = newName
		this.allMyPhases = []
	}
	
	addPhase (newName) {
		let newPhase
		newPhase = new Phase(newName)
		this.allMyPhases.push(newPhase)
	}
	
	findPhase (targetPhase) {
		let phase, aPhase
		for (aPhase of this.allMyProjects) {
			if (aPhase.name === targetPhase) {
				phase = aPhase
			}
		}
		return phase
	}
	
	removePhase(phase) {
		let aPhase
		for (aPhase of this.allMyPhases) {
			if (aPhase === phase) {
				this.allMyPhases.splice(this.allMyPhases.indexOf(phase), 1)
			}
		}
	}
	
	addLog (thePhase, newDate, newStart, newInterval, newStop, newComment) {
		let phase = this.findPhase(thePhase)
		phase.addLog(newDate, newStart, newInterval, newStop, newComment)
	}
	
	getIntSum() {
		let aLog, intItem, intSum, intTotal, interval, hours, mins, aPhase
		intTotal = 0
		for (aPhase of this.allMyPhases) {
			for (aLog of aPhase.allMyLogs) {
				if (!aLog.letEdit){
				intItem = aLog.interval.split(':')
				hours = Number(intItem[0])
				mins = Number(intItem[1])
				interval = mins + (hours * 60)
				
				intTotal += interval
				}
			}
		}
		return intTotal
	}
	
	getDeltaSum() {
		let aLog, deltaItem, deltaSum, deltaTotal, delta, hours, mins, aPhase
		deltaTotal = 0
		for (aPhase of this.allMyPhases) {
			for (aLog of aPhase.allMyLogs) {
				deltaItem = aLog.getDelta().split(':')
				hours = Number(deltaItem[0])
				mins = Number(deltaItem[1])
				delta = mins + (hours * 60)
				
				deltaTotal += delta	
			}
		}
		
		return deltaTotal
	}
	
	getIntAvg() {
		let aPhase, intSum, intCount, average
		intCount = 0
		intSum = this.getIntSum()
		for (aPhase of this.allMyPhases) {
			intCount += aPhase.allMyLogs.length
		}
		
		average = intSum/intCount	
		return average
	}
	
	getDeltaAvg() {
		let aPhase, deltaSum, deltaCount, average
		deltaSum = this.getDeltaSum()
		deltaCount = 0
		for (aPhase of this.allMyPhases) {
			deltaCount += aPhase.allMyLogs.length
		}
		
		average = deltaSum/deltaCount	
		return average
	}
	
	getCoefficient() {
		let aLog, aPhase, item, x, y, xx, yy, xy, r, n, thing, thing2, thing3, thing4
		x = 0
		xx = 0
		xy = 0
		y = 0
		yy = 0
		n = 0
		for (aPhase of this.allMyPhases) {
			for (aLog of aPhase.allMyLogs) {
				item = aLog.getData()
				x += item.x
				y += item.y
				xx += item.xx
				yy += item.yy
				xy += item.xy
			}
		}
		for (aPhase of this.allMyPhases) {
			n += aPhase.allMyLogs.length
		}
		thing = n*(xy) - (x)*(y)
		thing2 = n * xx - Math.pow(x, 2)
		thing3 = n * yy - Math.pow(y, 2)
		thing4 = Math.sqrt(thing2 * thing3)
		r = thing / thing4
		return r.toFixed(2)
	}
	
}