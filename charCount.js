/**
 * Options:
 *  container (required) jQuery element to add char counter into
 *
 * @author Liz Lee liz at lizlux dot net
 *
 * @param $element {jQuery} should be a form element (i.e. textarea, input)
 * @param options {Object} must contain either a max or a min count as well as a jQuery container object where the counter will be inserted
 *
 * Sample css: 
 * .counter-success {
 * 	color: green;
 * }
 * .counter-fail {
 * 	color: red;
 * }
 */

( function( $ ) {
	var CharCounter = function( $element, options ){
		var defaults = {
			max: 0,
			min: 0,
			container: false, // at some point we can add a dynamic container, but for now, just get it from options
		};

		options = this.options = $.extend( defaults, options );

		if( !( options.container instanceof jQuery ) ) {
			throw "jQuery charCounter: You must specify a jQuery element for the character count.";
		}

		if( !options.max && !options.min ) {
			throw "jQuery charCounter: You must specify at least one max or min value that isn't 0.";
		}

		// Break out the more commonly used vars so we don't need "this.options..."
		this.max = this.options.max;
		this.min = this.options.min;
		this.$container = this.options.container;
		this.$elem = $element;
		this.init();
	};

	CharCounter.prototype = {
		init: function() {
			this.setCount();
			this.bindEvents();
		},
		bindEvents: function() {
			this.$elem.on( 'keyup', $.proxy( this.checkCount, this) );
		},
		checkCount: function() {
			this.setCount();

			if( ( this.max && this.currCount > this.max ) || ( this.min && this.currCount < this.min ) ) {
				this.showError();
			} else {
				this.showSuccess();
			}
		},
		setCount: function() {
			this.currCount = this.$elem.val().length;

			if( this.currCount === 0 ) {
				this.$container.slideUp();
			} else {
				this.$container.slideDown();
			}

			this.$container.text( this.currCount );
		},
		showError: function() {
			this.$container.addClass( 'counter-fail' )
				.removeClass( 'counter-success' );
		},
		showSuccess: function() {
			this.$container.removeClass( 'counter-fail' )
				.addClass( 'counter-success' );
		}
	};

	$.fn.charCounter = function( options ) {
		return this.each( function() {
			var $this = $( this );
			$this.data( "charCounter", new CharCounter( $this, options ))
		});
	}
})( jQuery );
