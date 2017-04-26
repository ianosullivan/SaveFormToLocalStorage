
<cfmail from="json-test@wavteq.com" to="ian.osullivan@wavteq.com" subject="json test" type="html">
	<h1>cfdump form results</h1>

	<cfdump var="#form#">
	
	<hr>

	<p>This form was submitted via JS;</p>
	<code>
		$.post('action.cfm', <u><b>JSON.parse(localStorage.local_form_data)</b></u> );
	</code>

	<br/>

</cfmail>

Test