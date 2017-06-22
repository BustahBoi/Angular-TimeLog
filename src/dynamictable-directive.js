class TimeLogTable {
	constructor() {
		this.restrict = 'E'
		
		this.template = `
		<h2 data-ng-if="con.portfolio">Time Log Report</h2>
		<div data-ng-repeat="project in con.portfolio.allMyProjects">
			<h3 ng-mouseover="">{{project.name}}</h3>
			<div data-ng-if="project">
			<fieldset><strong>Project Details</strong>	<br>		
				Delta Average = {{project.getDeltaAvg()}}<br>
				Delta Sum = {{project.getDeltaSum()}}<br>
				Int Average = {{project.getIntAvg()}}<br>
				Int Sum = {{project.getIntSum()}}<br>
				Correlation Coefficiency = {{project.getCoefficient()}}
			</fieldset>
			</div>
			<div data-ng-repeat="phase in project.allMyPhases">
			<h3>{{phase.name}}</h3>
			<div ng-class="phase.getClass()">
			<table class="table table-bordered">
				<tr>
				
					<th>Date</th>
					<th>Start</th>
					<th>Int Time</th>
					<th>Stop</th>
					<th>Delta</th>
					<th>Comments</th>
					<th>Options</th>
				</tr>
				
				<tr data-ng-repeat="log in phase.allMyLogs">

					<td data-ng-if="!log.letEdit">{{log.date | date:'dd/MM/yy'}}</td>
					<td data-ng-if="log.letEdit"><input type="date" ng-model="log.date" class="form-control" /></td>
					
					<td data-ng-if="!log.letEdit">{{log.start}}</td>
					<td data-ng-if="log.letEdit"><input type="text" ui-mask="99:99" placeholder="HH:mm"  ng-model="log.start" class="form-control" model-value /></td>
					
					<td data-ng-if="!log.letEdit">{{log.interval}}</td>
					<td data-ng-if="log.letEdit"><input type="text" ui-mask="99:99" placeholder="HH:mm" ng-model="log.interval" class="form-control" model-value /></td>
					
					<td data-ng-if="!log.letEdit">{{log.stop}}</td>
					<td data-ng-if="log.letEdit"><input type="text" ui-mask="99:99" placeholder="HH:mm" ng-model="log.stop" class="form-control" model-value /></td>
					
					<td>{{log.getDelta(log.start, log.stop, log.interval)}}</td>
									
					<td data-ng-if="!log.letEdit">{{log.comment}}</td>
					<td data-ng-if="log.letEdit"> <input type="text" ng-model="log.comment" class="form-control" /> </td>
					
					<td>
					
					<button type="button" class="btn btn-default btn-sm" ng-click="phase.removeLog(log)" >
					  <span class="glyphicon glyphicon-remove" aria-hidden="true"></span>
					</button>
					
					<button type="button"  class="btn btn-default btn-sm" ng-click="log.editLog()" >
					  <span class="glyphicon glyphicon-pencil" aria-hidden="true"></span>
					</button>

					</td>
					
				</tr>
			</table>
			</div>
			</div>
		</div>
		`
	}
	
	static directiveFactory() {
		TimeLogTable.instance = new TimeLogTable()
		return TimeLogTable.instance
	}
}
//ng-model="log.date" 