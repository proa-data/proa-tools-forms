/*!
 * Proa Tools Forms v1.1.13 (https://github.com/proa-data/proa-tools-forms)
 */

( function() {
angular.module( 'proaTools.forms', [] );
} )();
( function() {
angular
	.module( 'proaTools.forms' )
	.directive( 'formGroup', formGroup );

function formGroup() {
	var n = 1;

	return {
		restrict: 'C',
		compile: compile
	};

	function compile( tElement ) {
		var input = tElement.find( '.form-control, input[type="file"]' );
		if ( input.length ) {
			var id = input.prop( 'id' );
			if ( !id ) {
				id = 'form-control-' + n++;
				input.prop( 'id', id );
			}
			tElement.find( 'label' ).prop( 'for', id );

			var name = input.prop( 'name' );
			if ( !name ) {
				name = input.attr( 'ng-model' );
				input.prop( 'name', name ? _.kebabCase( name ) : id );
			}
		}
	}
}
} )();