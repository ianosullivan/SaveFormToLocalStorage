# SaveFormToLocalStorage
Save a Form to Local Storage during form input so if you refresh all data is still there.

Note you can submite the form with this JS code;
```javascript
$.post('action.cfm', JSON.parse(localStorage.local_form_data), function(data){
    console.log(data);
})
```

The action file will have FORM scroped values 
