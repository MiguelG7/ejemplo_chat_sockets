const express = require('express');
const app = express();
const PORT = 3000;
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

const app_name = "CHAT! by Miguel"


app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.static('public'));

app.get("/", (req,res) => {
    res.render("index.ejs", {titulo_app: app_name} );
})

io.on('connection', (socket) => {

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
    
    socket.on('chat message', (msg) => {
          io.emit('chat message', msg);
          console.log('message: ' + msg);
    });

});

server.listen(PORT, (err) => {
    if (err) console.log("Error in server setup");
    console.log(`http://localhost:${PORT}`);
});

//io.emit('some event', { someProperty: 'some value', otherProperty: 'other value' }); // This will emit the event to all connected sockets

