console.log('== Octopus Project ==');
var express = require("express");
var app = express();
var path = require('path');

var http = require('http').Server(app);
var io = require("socket.io")(http);
var port = 3000;

console.log('\nLibs imported');

app.engine('html', require('ejs').renderFile);
app.set("view options", {layout: false});

app.use(express.static(path.join(__dirname, 'www/'))); //  "public" off of current is root

app.get('/', function(req, res){
	res.render("index.html");
});

console.log('FrontEnd initialized');


io.sockets.on('connection', function(socket){     

	console.log('-' + socket.id);
	/// Saludo hacia quien se conecte al nodo
        socket.emit('Welcome', {Message: 'Welcome to Octopus'});
        

        /// Command from Hydra (Python) to Koh.js (WinJS)
        socket.on('command.Hy.KohJS', function(data){
                io.sockets.emit('command.KohJS', {Command: data.Command, Values:  data.Values });
        });

        /// Command from Koh.js (WinJS) to Hydra (Python)
        socket.on('command.KohJS.Hy', function(data){
                io.sockets.emit('command.Hydra', {Command: data.Command, Values:  data.Values });
        });

        /// Template for socket event
	//socket.on('', function(data){
        //	io.sockets.emit('Name', data);
        // socket.emit('ID', {Command: 'ID', Values:[{ID: socket.id}]});
        //});

});
console.log('Socket.io initialized')

io.listen(app.listen(port));
console.log('Listening on port 3000');