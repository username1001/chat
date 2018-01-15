var app = require("express")();
var http = require("http").Server(app);
var io = require("socket.io")(http);
var helmet = require("helmet");
var port = process.env.PORT || 3000;

app.use(helmet());

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", function(socket) {
  socket.on("chat message", function(msg) {
    io.emit("chat message", msg);
  });
});

io.of("/").clients((error, clients) => {
  if (error) throw error;
  console.log(clients);
});

http.listen(port, function() {
  console.log("listening on *:" + port);
});
