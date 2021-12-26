const socket = io("http://localhost:8000");

const form = document.getElementById("message_form");
const message = document.getElementById("message_send");
const container = document.querySelector(".container");
const name = prompt("Enter your name");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  append_div(`you: ${message.value}`, "right");
  socket.emit("send", message.value);
  message.value = "";
});
const append_div = (message, position) => {
  const message_div = document.createElement("div");
  message_div.innerText = message;
  message_div.classList.add("message");
  message_div.classList.add(position);
  container.append(message_div);
};

socket.emit("new-user-joined", name);

socket.on("user-joined", (name) => {
  append_div(`${name} joined the chat`, "right");
});
socket.on("receive", (data) => {
  append_div(`${data.name} : ${data.message}`, "left");
});
socket.on("left", (name) => {
  append_div(`${name} left the chat`, "left");
});
