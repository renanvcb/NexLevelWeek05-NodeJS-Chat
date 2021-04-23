import express from "express";
import { createServer } from "http";
import { Server, Socket } from "socket.io";
import path from "path";

import { routes } from "./routes";
import "./database";

const app = express();

app.use(express.static(path.join(__dirname, "..", "public")));
app.set("views", path.join(__dirname, "..", "public"));
app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");

app.get("/pages/client", (request, response) => {
  return response.render("html/client.html")
});

const http = createServer(app);//Setting HTTP Protocol
const io = new Server(http);//Setting Websocket (WS) Protocol

//Connecting to WS
io.on("connection", (socket: Socket) => {
  // console.log("Se conectou com ID: ", socket.id)
})

app.use(express.json());//Setting our app server to use JSON

app.use(routes);//Setting app routes

export { http, io };