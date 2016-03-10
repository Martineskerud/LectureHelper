var app = require('express')();
var http = require('http').Server(app);
var path = require('path');

var io = require('socket.io')(http);
var helpCounter=0;
var time = Date.now();

app.get('/admin', function(req, res){
	res.sendFile(path.resolve('./admin.html'));
});

app.get('/', function(req, res){
	res.sendFile(path.resolve('./index.html'));
});

app.get('/img/:file', function(req, res){
	res.sendFile(path.resolve('./img/'+req.param("file")));
});

http.listen(3000, function(){
	console.log('listening on *:3000');
});

io.on('connection', function(socket){
	console.log('user connected');
	socket.on('chat message', function(msg){
		io.emit('chat message', msg);
		console.log('chat message:' + msg);
	});
	socket.on('disconnect', function(){
		console.log('user disconnected');
	});


socket.on('reset', function(){
			helpCounter = 0;
			io.emit("adminTotalCount",helpCounter);
	});


	socket.on('help', function(){

		var timePressed = Date.now();
		//Users can only ask for help once
		if(timePressed > time+7500){
			helpCounter++;
			time=timePressed;
			io.emit("adminTotalCount",helpCounter);
		}

	});

});
