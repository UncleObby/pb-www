/*
peace-branch-participation.js
Copyright (C) 2015 O J Low
Version: 0.1 2015-05-19
JS functions for peace-branch-participation page
USES jquery
*/

/*pageInit is called when the page is loaded
*/
function pageInit(){
	//hide the sign-up form
	$( "#sign-up-form" ).hide();
	//when user clicks the "sign-up" anchor, show the form and get the country
	$( "a[name=sign-up]" ).click( function () { getCountryCode(); $( '#sign-up-form' ).show() } );

	//set changes to country input to update the flag and maybe change "postcode" to "zipcode"
	$('input[name="u_country"]').change( function(){ 
		//upper-case the input
		this.value=this.value.toUpperCase();
		//if user enetered 'UK' swap if for 'GB' (the ISO code for UK is 'GB'; 'UK' is an exceptionally reserved code)
		if (this.value=='UK') {
			this.value='GB'; 
		}
		//update the flag
		$('.country_flag').setFlagPosition(this.value);
		//update the input label to "zipcode" for US users
		if (this.value ==='US') {
			$('#label_u_postcode').text("zipcode");
		} else {
			$('#label_u_postcode').text("postcode");			
		}
	});
	//add the AJAX function to the sign-up button
	document.getElementById('signupbutton').addEventListener('click',submitSignUp);
	
}

/*getCountryCode()
looks up the user's country code based on their IP address
via ipinfo.io JSONP remote call 
*/
function getCountryCode() {
	$.get("http://ipinfo.io", function(response) {
		//change the input value and trigger the change event
		$('input[name="u_country"]').val(response.country).trigger("change"); 
	}, "jsonp");
}


/*set up the flag sprite usage in jquery 
fn by Robert Kules http://jsfiddle.net/roberkules/TxAhb/ 
*/
(function($) {
	// size = flag size + spacing
	var default_size = {w: 20, h: 15};
	//calc position based on ISO country code, first letter gives x, second letter gives y.
	function calcPos(letter, size) {
		return -(letter.toLowerCase().charCodeAt(0) - 97) * size;
	}
	$.fn.setFlagPosition = function(iso, size) {
		size || (size = default_size);
		//return 
		return $(this).css('background-position',
			[calcPos(iso[1], size.w), 'px ', calcPos(iso[0], size.h), 'px'].join(''));
	};
})(jQuery);

function submitSignUp(){
	//create XMLHttpRequest
	//get the form data
	var formdata = $('#sign-up-form').serialize();
	var xhr = $.ajax( { 
	    url: '/pb-sign-up.php',
		data: formdata,
		type: 'post',
		success: function(output) {
			alert(output);
		}
		
	} );
}

//initialise page when loaded
window.addEventListener('load',pageInit);