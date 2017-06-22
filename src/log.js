class Log{
	constructor(newDate, newStart, newInterval, newStop, newComment) {
		this.date = newDate
		this.start = newStart
		this.interval = newInterval
		this.stop = newStop
		this.comment = newComment
		this.letEdit = false
		this.showEdit = false
	}
	
	editLog() {
		let setDate, geDate
		if (this.letEdit === false) {
			setDate = new Date(this.date)
			this.date = setDate
		}
		if (this.letEdit === true) {
			this.start = this.addSemi(this.start)
			this.stop = this.addSemi(this.stop)
			this.interval = this.addSemi(this.interval)
		}
		this.letEdit = !this.letEdit
	}
	
	addSemi(theTime) {
		let setTime, time, newTime
		if (!/:/g.test(theTime)) {
			time = theTime.split('')
			time.splice(time.length - 2, 0, ':')
			newTime = time.join()
			setTime = newTime.replace(/,/g, '')	
		} else {
			setTime = theTime
		}
		return setTime
	}
	
	getDelta() {
		let startH, startM, stopH, stopM, intH, intM, start, stop, interval, delta, preDelta, deltaH, deltaM, out
		delta = 0
		if (!this.letEdit) {
		start = this.start.split(':')
		stop = this.stop.split(':')
		interval = this.interval.split(':')
		startH = Number(start[0]) * 60
		startM = Number(start[1]) + startH
		stopH = Number(stop[0]) * 60
		stopM = Number(stop[1]) + stopH
		intH = Number(interval[0]) * 60
		intM = Number(interval[1]) + intH
		
		preDelta = stopM - startM - intM
		deltaH = parseInt(preDelta / 60)
		deltaM = preDelta % 60
		if (deltaM.toString().length < 2) {
			out = `${deltaH}:0${Math.abs(deltaM)}`
		} else {
			out = `${deltaH}:${Math.abs(deltaM)}`
		} 
		
		
		} else {
			out = '00:00'
		}
		return out
	}
	
	getData() {
		let delta, interval, x, y, xx, yy, xy, out
		if (!this.letEdit) {
			delta = Number(this.getDelta().replace(':', ''))
			interval = Number(this.interval.replace(':', ''))
			//console.log(interval)
			x = delta
			y = interval
			xx = Math.pow(x, 2)
			yy = Math.pow(y, 2)
			xy = x*y
			
		} else {
			x = 0
			y = 0
			xx = 0
			xy = 0
			yy = 0
		}
		return {x, y, xy, xx, yy}
	}
}







