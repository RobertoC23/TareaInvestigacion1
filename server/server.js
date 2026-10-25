
const express = require("express");
const http = require("http");
const path = require("path");
const { Server } = require("socket.io");


const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = 3000;


app.use(express.static(path.join(__dirname, "../public")));


const usuarios = new Map();


io.on("connection", (socket) => {

    console.log("Cliente conectado:", socket.id);

    // Evento: usuario se une
    socket.on("user:join", (data) => {

        if (
            !data ||
            typeof data.user !== "string" ||
            !data.user.trim() ||
            data.user.length > 30
        ) {
            socket.emit("system:info", {
                level: "error",
                msg: "Nombre de usuario inválido"
            });
            return;
        }

        const nombre = data.user.trim();
        usuarios.set(socket.id, nombre);

        io.emit("system:info", {
            level: "info",
            msg: `${nombre} se ha conectado`
        });

        console.log(`${nombre} se unió al chat`);
    });

    // Evento: recibir mensaje
    socket.on("chat:message", (data) => {

        const nombre = usuarios.get(socket.id);

        if (!nombre) {
            socket.emit("system:info", {
                level: "error",
                msg: "Primero debes ingresar al chat"
            });
            return;
        }

        if (
            !data ||
            typeof data.text !== "string" ||
            !data.text.trim() ||
            data.text.length > 500
        ) {
            socket.emit("system:info", {
                level: "error",
                msg: "El mensaje es inválido"
            });
            return;
        }

        const mensaje = {
            user: nombre,
            text: data.text.trim(),
            ts: Date.now()
        };

        // Enviar mensaje a todos
        io.emit("chat:message", mensaje);

        console.log("Mensaje enviado:", mensaje);
    });

    // Evento: desconexión
    socket.on("disconnect", () => {

        const nombre = usuarios.get(socket.id);

        if (nombre) {
            usuarios.delete(socket.id);

            io.emit("user:leave", {
                user: nombre
            });

            io.emit("system:info", {
                level: "info",
                msg: `${nombre} se ha desconectado`
            });
        }

        console.log("Cliente desconectado:", socket.id);
    });
});

// Iniciar servidor
server.listen(PORT, () => {
    console.log(
        `Servidor ejecutándose en http://localhost:${PORT}`
    );
});
