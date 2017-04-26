function SaveToLocalStorage(){
	var local_form_data = JSON.stringify( $('form').serializeArray() );
	//console.log( data );	

	localStorage.setItem('local_form_data', local_form_data);

}

function PopulateFormFromLocalStorage(){

	//If there is some local storage
	if(localStorage.local_form_data !== undefined) {

		var local_form_data = JSON.parse(localStorage.local_form_data);
		//console.log(local_form_data);

		//Loop through the local storage objects (if any)
		local_form_data.forEach( function (local_item){

		    //Loop through each form input element type and populate the corresponding matching local storage object
		    //Note we only want to selec the select elements that are NOT multiple as these are a special case
		    $('form input, form select:not([multiple]), form textarea').each(function() {

		    	// get the name of the current element
		    	var element_name = this.name;
		    	// What type of element is this? We can use this to better populate the values
		    	var element_type = this.type;

		    	// Note: select elements are returned as 'select_one' or 'select_multiple'
				//console.log( 'type: ' + element_type );

				// if the local storage element matches the form element then populate the form element value with the matching local storage matching value
				if(local_item.name == element_name){

					if (element_type != 'checkbox' && element_type != 'radio') {
				    	//Set the value of the dom element to the local storage value
				    	this.value = local_item.value;

				    	//console.log( Date.now() );
				    	return false; //break out of DOM selection loop as we have found a match for this singular type
					}
					else if (element_type == 'checkbox' || element_type == 'radio') {
						/*
						console.log(element_name);
						console.log(this.value);
						console.log(local_item.value);
						*/

						//Check if the element value matches the local storage value. If so set it to true and break out
						if(this.value == local_item.value){
							this.checked = true;
						}
					}
				}
		    });

		});

		    
	    //Now do the special case for multi selects
	    $('form select[multiple]').each(function() {
	    	var select_name = this.name;
	    	var value_array = []; //This will be populated with the values from local storage

	    	//Loop through the local storage now to find any matches to this multi select element
			local_form_data.forEach( function (item){
				// if the local storage element matches the form element then populate the form element value with the matching local storage value
				if(item.name == select_name){
					value_array.push( item.value );
				}
			});

			//Set the multi select. I couldn't figure out how to do this with pure JS so I used jQuery
			$(this).val(value_array);
	    });
	} // End local storage test
}


$(function(){
	PopulateFormFromLocalStorage();

	$('form input, form select, form textarea').on('change', function(){
		SaveToLocalStorage();
	});
});

/*
	// Example JSON from - https://www.sitepoint.com/customer-form-json-file-example/
	
	{
	     "firstName": "John",
	     "lastName": "Smith",
	     "age": 25,
	     "address":
	     {
	         "streetAddress": "21 2nd Street",
	         "city": "New York",
	         "state": "NY",
	         "postalCode": "10021"
	     },
	     "phoneNumber":
	     [
	         {
	           "type": "home",
	           "number": "212 555-1234"
	         },
	         {
	           "type": "fax",
	           "number": "646 555-4567"
	         }
	     ]
	}
*/
