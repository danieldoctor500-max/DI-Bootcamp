const socket = io();

const joinScreen = document.getElementById("join-screen");
const chatScreen = document.getElementById("chat-screen");

const joinForm = document.getElementById("join-form");

const usernameInput =
    document.getElementById("username");

const roomInput =
    document.getElementById("room");

const joinError =
    document.getElementById("join-error");


const roomName =
    document.getElementById("room-name");

const activeUsers =
    document.getElementById("active-users");

const userCount =
    document.getElementById("user-count");

const messages =
    document.getElementById("messages");

const messageForm =
    document.getElementById("message-form");

const messageInput =
    document.getElementById("message-input");

const leaveButton =
    document.getElementById("leave-button");


joinForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const username = usernameInput.value.trim();
    const room = roomInput.value.trim();

    if (!username || !room) {
        joinError.textContent =
            "Username and room are required.";

        return;
    }

    joinError.textContent = "";

    socket.emit("joinRoom", {
        username,
        room
    });
});


socket.on("joinedRoom", ({ username, room }) => {

    joinScreen.classList.add("hidden");

    chatScreen.classList.remove("hidden");

    roomName.textContent =
        `Room: ${room}`;

    messageInput.focus();

    console.log(
        `${username} joined ${room}`
    );
});


socket.on("joinError", ({ message }) => {

    joinError.textContent = message;

});


socket.on("activeUsers", (users) => {

    activeUsers.innerHTML = "";

    userCount.textContent =
        `${users.length} ${
            users.length === 1
                ? "user"
                : "users"
        }`;

    users.forEach((username) => {

        const listItem =
            document.createElement("li");

        listItem.textContent = username;

        activeUsers.appendChild(listItem);

    });

});


messageForm.addEventListener("submit", (event) => {

    event.preventDefault();

    const message =
        messageInput.value.trim();

    if (!message) {
        return;
    }

    socket.emit(
        "sendMessage",
        message
    );

    messageInput.value = "";

    messageInput.focus();

});


socket.on("newMessage", (chatMessage) => {

    displayMessage(chatMessage);

});

function displayMessage(chatMessage) {

    const messageElement =
        document.createElement("div");

    messageElement.classList.add(
        "message"
    );


    const header =
        document.createElement("div");

    header.classList.add(
        "message-header"
    );


    const username =
        document.createElement("strong");

    username.textContent =
        chatMessage.username;


    const time =
        document.createElement("span");

    time.textContent =
        chatMessage.time;


    const messageText =
        document.createElement("p");

    messageText.textContent =
        chatMessage.message;


    header.appendChild(username);

    header.appendChild(time);

    messageElement.appendChild(header);

    messageElement.appendChild(messageText);

    messages.appendChild(messageElement);


    // Automatically scroll to latest message
    messages.scrollTop =
        messages.scrollHeight;

}



socket.on(
    "notification",
    ({ message }) => {

        displayNotification(message);

    }
);


function displayNotification(message) {

    const notification =
        document.createElement("div");

    notification.classList.add(
        "notification"
    );

    notification.textContent =
        message;

    messages.appendChild(notification);

    messages.scrollTop =
        messages.scrollHeight;

}


leaveButton.addEventListener(
    "click",
    () => {

        socket.emit("leaveRoom");

    }
);


socket.on("leftRoom", () => {

    chatScreen.classList.add("hidden");

    joinScreen.classList.remove("hidden");

    usernameInput.value = "";

    roomInput.value = "";

    messageInput.value = "";

    messages.innerHTML = "";

    activeUsers.innerHTML = "";

    userCount.textContent = "0 users";

    roomName.textContent = "Room: -";

    usernameInput.focus();

});



socket.on("connect", () => {

    console.log(
        "Connected to server:",
        socket.id
    );

});



socket.on("disconnect", () => {

    console.log(
        "Disconnected from server"
    );

});