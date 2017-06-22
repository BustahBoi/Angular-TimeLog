class ModelValue {
	constructor() {
		this.require = 'ngModel'
	}
	
	link($scope, ele, attr, ctrl, ngModel) {
		let modelName = attr.ngModel
		//console.log(`this is the ngModel: ${ngModel.$viewValue}`)
		
		$scope.$watch(modelName, function() {
			console.log(modelName)
			let aValue = ele[0].value
			let change = aValue.replace(/[:m]/g, '')
			if (Number(change[0]) > 2) {
				ele[0].value = ''
			} else if (Number(change[0]) === 2 && Number(change[1]) > 3) {
				ele[0].value = ''
			} else if (Number(change[2]) > 5) {
				ele[0].value = ''
			}

		})
	}
	
	static directiveFactory() {
		ModelValue.instance = new ModelValue()
		return ModelValue.instance
	}
}
