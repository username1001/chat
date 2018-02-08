const app = require("express")();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const helmet = require("helmet");
const port = process.env.PORT || 3000;

app.use(helmet());

app.get('/', function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", function(socket) {
  socket.on("chat message", function(msg) {
    io.emit("chat message", msg);
  });
});

io.clients((error, clients) => {
  if (error) throw error;
  console.log(clients);
});

http.listen(port, function() {
  console.log("listening on *:" + port);
});
