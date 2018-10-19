/*!
 * Proa Tools Forms v1.0.0 (https://github.com/proa-data/proa-tools-forms)
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

	function compile() {
		return function( scope, iElement ) {
			var input = iElement.find( '.form-control, input[type="file"]' ),
				id = input.prop( 'id' );
			if ( !id ) {
				id = 'form-group-input-' + n++;
				input.prop( 'id', id );
			}
			iElement.find( 'label' ).prop( 'for', id );
		};
	}
}
} )();