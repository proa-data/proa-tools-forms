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
			var input = iElement.find( '.form-control, input[type="file"], .form-check-input' );
			if ( input.length ) {
				var id = input.prop( 'id' );
				if ( !id ) {
					id = 'form-control-' + n++;
					input.prop( 'id', id );
				}
				iElement.find( 'label' ).prop( 'for', id );

				var name = input.prop( 'name' );
				if ( !name ) {
					name = input.attr( 'ng-model' );
					input.prop( 'name', name ? _.kebabCase( name ) : id );
				}
			}
		};
	}
}
} )();