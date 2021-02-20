const express = require("express")
const http = require("http")
const app = express();
const path = require("path")
const server = http.createServer(app); // express가 http를 통해서 실행될 수 있도록
const socketIO = require("socket.io")
const moment = require("moment")

const io = socketIO(server);


app.use(express.static(path.join(__dirname, "src")))

const PORT = process.env.PORT || 5000; //process.env.PORT가 있으면 사용, 없으면 5000

io.on("connection", (socket) => {
    socket.on("chatting", (data) => { // 소켓을 이용해서 프론트로부터 chatting ID의 data를 받아옴
        const { name, msg } = data;

        io.emit("chatting", {
            name,
            msg,
            time: moment(new Date()).format("h:mm A") // A는 오전오후
        }) // 서버로 데이터 보내기
    })
})





server.listen(PORT, () => console.log(`server is ${PORT}`))