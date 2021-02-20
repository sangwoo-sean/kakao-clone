"use strict"
const socket = io();

const nickname = document.querySelector("#nickname")
const chatlist = document.querySelector(".chatting-list")
const chatInput = document.querySelector(".chatting-input")
const sendButton = document.querySelector(".send-button")
const displayContainer = document.querySelector(".display-container")

chatInput.addEventListener("keypress", (e) => {
    if (e.keyCode === 13) {
        send();
    }
});

sendButton.addEventListener("click", send);

function send() {
    const valueLength = chatInput.value.length;
    if (valueLength) {
        const param = {
            name: nickname.value,
            msg: chatInput.value
        }
        socket.emit("chatting", param) // 채널 ID, 내용 으로 서버로 전송
    }
}


socket.on("chatting", ({ name, msg, time }) => { // 서버에서부터 데이터 받아오기
    const item = new LiModel(name, msg, time);
    item.makeLi();
    displayContainer.scrollTo(0, displayContainer.scrollHeight)
})

function LiModel(name, msg, time) {
    this.name = name;
    this.msg = msg;
    this.time = time;

    this.makeLi = () => {
        const li = document.createElement("li");
        li.classList.add(nickname.value === this.name ? "sent" : "received")
        const dom = `
        <span class="profile">
            <span class="user">${this.name}</span>
                <img class="image" src="https://placeimg.com/50/50/any" alt="any">
            </span>
            <span class="message">${this.msg}</span>
        <span class="time">${this.time}</span>`;
        li.innerHTML = dom;
        chatlist.appendChild(li);
        chatInput.value = "";
    }
}