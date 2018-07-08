/* global navigator */
/* global $ */

const player = document.getElementById('player');
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
const captureButton = document.getElementById('capture');
const constraints = { video: true };

captureButton.addEventListener('click', () => 
{
	// Draw the video frame to the canvas.
	context.drawImage(player, 0, 0, canvas.width, canvas.height);
	//stop video stream
	player.srcObject.getVideoTracks().forEach(track => track.stop());
});


// Attach the video stream to the video element and autoplay.
navigator.mediaDevices.getUserMedia(constraints).then((stream) => { player.srcObject = stream; });



/**
Grab user image upload from input of type file and display onto image element.

Example
<input type='file' onchange="readImageInput(this);" />
<img id="userUpload"/>
**/
function readImageInput(input) 
{
    if (input.files && input.files[0]) 
    {
	   	var reader = new FileReader();
	   	reader.onload = function (e) 
	   	{
	   		$('#userUpload').attr('src', e.target.result);
	    };
    	reader.readAsDataURL(input.files[0]);
	}
};
		  