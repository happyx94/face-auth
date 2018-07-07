/**
Grab user image upload from input of type file and display onto image element.

Example
<input type='file' onchange="readImageInput(this);" />
<img id="userUpload"/>
**/
function readImageInput(input, userUpload) {
    if (input.files && input.files[0]) {
	   	var reader = new FileReader();
	   	reader.onload = function (e) {
	   		$('#userUpload').attr('src', e.target.result);
	    	};
    reader.readAsDataURL(input.files[0]);
	}
};