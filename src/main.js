window.angular
	.module('timeLog', ['ui.mask'])
	.controller('Controller', Controller)
	.directive('timeLogTable', TimeLogTable.directiveFactory)
	.directive('onReadFile', OnReadFile.directiveFactory)
	.directive('modelValue', ModelValue.directiveFactory)