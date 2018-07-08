const { spawn } = require('child_process');

function addModel(id, imgurl, callback)
{
	const proc = spawn('./python/face.py', ['-a', id, imgurl]);
	var result;

	proc.stdout.on('data', function(data) 
	{
		result = data;
	});

	proc.on('close', function(code) 
	{
  		callback(!code, result);
	});
}

function verify(id, imgurl, callback)
{
	const proc = spawn('./python/face.py', ['-i', id, imgurl]);
	var result;

	proc.stdout.on('data', function(data) 
	{
		result = data;
	});

	proc.on('close', function(code) 
	{
  		callback(!code, result);
	});
}

function recognize(imgurl, callback)
{
	const proc = spawn('./python/face.py', ['-s', imgurl]);
	var result;

	proc.stdout.on('data', function(data) 
	{
		result = data;
	});

	proc.on('close', function(code) 
	{
  		callback(!code, result);
	});
}
module.exports = mongoose.model("face-recognition", { addModel: addModel, verify: verify, recognize: recognize});
