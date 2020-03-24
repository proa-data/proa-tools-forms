( function() {
angular
	.module( 'app', [ 'proaTools.forms' ] )
	.controller( 'DemoController', DemoController );

function DemoController() {
	var vm = this;
	vm.isChecked = true;
	vm.option = 1;
}
} )();