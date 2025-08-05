# 💻 RealTime Code Editor – CollabCode

A real-time collaborative code editor built using [Monaco Editor](https://microsoft.github.io/monaco-editor/), powered by [Node.js](https://nodejs.org/), [Socket.IO](https://socket.io/), and [MongoDB](https://www.mongodb.com/docs/). This project allows multiple users to collaboratively edit code in real time with support for syntax highlighting, multiple languages, and live broadcasting of changes.

---

## 🚀 Features

- 🌐 Real-time collaborative editing with Socket.IO
- 🧠 Monaco Editor with syntax highlighting
- 🖥️ Support for multiple programming languages (e.g., JavaScript, Python, C++)
- 📡 WebSocket connection for instant code updates
- 🗃️ MongoDB for session and history storage
- 🧩 Modular backend with Node.js

---

## 🛠️ Tech Stack

| Layer    | Technology                                                                               |
| -------- | ---------------------------------------------------------------------------------------- |
| Frontend | [React](https://react.dev/), [Monaco Editor](https://microsoft.github.io/monaco-editor/) |
| Realtime | [Socket.IO](https://socket.io/docs/)                                                     |
| Backend  | [Node.js](https://nodejs.org/en/docs/)                                                   |
| Database | [MongoDB](https://www.mongodb.com/docs/)                                                 |

---

## 📂 Project Structure

```bash
collab-code-editor/
├── client/                 # Frontend React app with Monaco integration
│   ├── components/
│   └── App.jsx
├── scriptly/                 # Backend server (Node.js + Socket.IO)
│   ├── index.js
│   └── socketHandler.js
├── models/                 # Mongoose models still needed to make (IN PROGRESSION)
├── .env
├── package.json
└── README.md
```
