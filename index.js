var app = require('express')();
var http = require('http').Server(app);
let io = require('socket.io')(http);
//app.use(express.logger());

var lists = [];

app.get('/', function (req, res) {
	res.sendFile(__dirname + '/index.html');
});

http.listen (process.env.PORT || 5000, function () {
	console.log ('API app started');
});

io.on('connection', function (socket) {
	console.log('connected new client');
	socket.on('message', function (data) {
		lists.push(data);
		io.emit('new message', data);//Отправляем данные всем
		//socket.broadcast.emit('new message', data);//Отправляем данные всем, кроме себя
		//socket.id - уникальный индетификатор нового подключенного пользователя
		//socket.join - подключить клиента к определенной комнате
		//socket.leave - отключить клиента от определенной комнаты
	});
	socket.on('get', function (data) {
		io.emit('new message', lists);
	});
	socket.on('clear', function (data) {
		lists.splice(0,lists.length);
	});
});