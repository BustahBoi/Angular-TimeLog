class Portfolio {
	constructor() {
		this.allMyProjects = []
	}
	
	saveProjects() {
		localStorage.setItem('Projects', JSON.stringify(this.allMyProjects))
	}
	
	/* loadProjects() {
		let projects, aProject, loadedProject, loadedPhase, loadedLog,aPhase, aLog
		
		projects = JSON.parse(localStorage.getItem('Projects'))
		//restore properties for the project object
		for (aProject of projects) {
			loadedProject = Object.assign(new Project, aProject)
			this.allMyProjects.push(loadedProject)
		}
		//restore properties for the phase object
		for (aProject of this.allMyProjects) {
			for (aPhase of aProject.allMyPhases) {
				loadedPhase = Object.assign(new Phase, aPhase)
				aProject.allMyPhases.splice(aProject.allMyPhases.indexOf(aPhase), 1, loadedPhase)
			}
		}
		//restore properties for the log object
		for (aProject of this.allMyProjects) {
			for (aPhase of aProject.allMyPhases) {
				for (aLog of aPhase.allMyLogs) {
				loadedLog = Object.assign(new Log, aLog)
				aPhase.allMyLogs.splice(aPhase.allMyLogs.indexOf(aLog), 1, loadedLog)
				}
			}
		}	
	} */
	
	//Refactored loadProjects
	
	loadProjects() {
		let projects, aProject, loadedProject, loadedPhase, loadedLog,aPhase, aLog
		
		projects = JSON.parse(localStorage.getItem('Projects'))

		for (aProject of projects) {
			loadedProject = Object.assign(new Project, aProject)
			this.allMyProjects.push(loadedProject)
			for (aPhase of aProject.allMyPhases) {
				loadedPhase = Object.assign(new Phase, aPhase)
				aProject.allMyPhases.splice(aProject.allMyPhases.indexOf(aPhase), 1, loadedPhase)
				for (aLog of aPhase.allMyLogs) {
				loadedLog = Object.assign(new Log, aLog)
				aPhase.allMyLogs.splice(aPhase.allMyLogs.indexOf(aLog), 1, loadedLog)
				}
			}
		}	
	}
	
	
	checkProject(newProject) {
		let aProject, project
		project = ''
		if (this.allMyProjects.length > 0) {
			for (aProject of this.allMyProjects) {
				if (newProject === aProject.name) {
					project = aProject
					break
				}
			}
			if (project === '') {
				this.addProject(newProject)
				project = this.allMyProjects[this.allMyProjects.length-1]
			}
		} else {
			this.addProject(newProject)
			project = this.allMyProjects[this.allMyProjects.length-1]
		}
		return project
	}
	
	selectProject(conProject) {
		let project, theProject
		project = ''
		theProject = this.allMyProjects
		//console.log(!theProject.length)
		if (conProject !== '' && conProject !== null) {
			project = this.checkProject(conProject)
			//console.log('Check Project: ',project)
		}
		
		if (this.project === null && !theProject.length) {
			console.log('should fix')
			project = 'Blue'
		}
		
		if (theProject.length && project === '') {
			project = theProject[theProject.length-1]
			console.log('Check Project array: ',project)
		}
		//console.log(project)
		return project
	}
	
	checkPhase(theProject, newPhase) {
		let aPhase, phase
		phase = ''
		if (theProject.allMyPhases.length > 0) {
			for (aPhase of theProject.allMyPhases) {
				if (newPhase == aPhase.name) {
					phase = aPhase
					break
				} 
			}
			if (phase === '') {
				theProject.addPhase(newPhase)
				phase = theProject.allMyPhases[theProject.allMyPhases.length - 1]
			} 
		} else {
			theProject.addPhase(newPhase)
			phase = theProject.allMyPhases[theProject.allMyPhases.length - 1]
		}
		return phase
	}

	selectPhase(theProject, conPhase) {
		let phase, thePhase
		thePhase = theProject.allMyPhases
		phase = ''
		if (conPhase !== '' && conPhase !== null) {
			phase = this.checkPhase(theProject, conPhase)
		}
		if (conPhase === null && !thePhase.length) {
			console.log('fix this')
			phase = 'Bleh'
		} 
		if (thePhase.length && phase === '') {
			phase = thePhase[thePhase.length-1]
		} 
		return phase
	
	}	
	
	addProject (newName) {
		let newProject
		newProject = new Project(newName)
		this.allMyProjects.push(newProject)
	}
	
	removeProject(project) {
		let aProject
		console.log(project)
		for (aProject of this.allMyProjects) {
			if (aProject === project) {
				this.allMyProjects.splice(this.allMyProjects.indexOf(project), 1)
			}
		}
	}	
	
	findProject (targetProject) {
		let project, aProject
		for (aProject of this.allMyProjects) {
			if (aProject.name === targetProject) {
				project = aProject
			}
		}
		return project
	}
	
	addPhase (targetProject, newPhase) {
		let project = this.findProject(targetProject)
		project.addPhase(newPhase)
	}
	
	addLog(theProject, thePhase, newDate, newStart, newInterval, newStop, newComment) {
		let project = this.findProject(theProject)
		let phase = project.findPhase(thePhase)
		phase.addLog(newDate, newStart, newInterval, newStop, newComment)
	}
}

