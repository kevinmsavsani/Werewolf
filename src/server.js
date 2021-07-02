const server = require("http").createServer();
const io = require("socket.io")(server, {
  transports: ["websocket", "polling"]
});
const users = {};
io.on("connection", client => {
  client.on("username", ({username,roomId}) => {
    const user = {
      name: username,
      id: client.id,
      roomId: roomId
    };
    users[client.id] = user;
    io.emit("users", Object.values(users));
  });

  client.on("disconnect", () => {
    const username = users[client.id];
    delete users[client.id];
    io.emit("disconnected", {id:client.id, users});
  });

  client.on("request", () => {
    io.emit("connectedUsers", Object.values(users));
  });
});
server.listen(8000);
