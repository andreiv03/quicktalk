# QuickTalk

QuickTalk is a **real-time instant messaging web application** designed to facilitate smooth, **secure**, and **scalable** communication for a large number of concurrent users. It is built with **Next.js, TypeScript, WebSockets (Socket.io), and Redis** for high performance and responsiveness.

## ✨ Features

🔥 Real-Time Messaging
- Instant messaging powered by WebSockets (Socket.io).
- Typing indicators to show when a user is composing a message.
- Read receipts to confirm message delivery and visibility.
- Message auto-deletion after 24 hours for enhanced privacy.

👥 Group Conversations
- Private and group chats with dynamic participant management.
- Group creation, invitation, and removal features.
- Group admin controls for managing members.

🟢 User Presence & Status
- Live user status updates (online, offline, typing, etc.).
- Active session tracking using Redis for real-time efficiency.

🚀 Scalable & Optimized Performance
- Redis caching to optimize real-time message delivery.
- Efficient WebSocket event handling to reduce server load.
- Optimized queries and indexing for fast database operations.

🔐 Secure Authentication & Data Protection
- JWT authentication with refresh tokens for secure sessions.
- Argon2 password hashing for strong encryption.
- Role-based access control (RBAC) for user permissions.
- Rate limiting & CSRF protection against abuse.

🎨 User Experience Enhancements
- Responsive UI built with SCSS Modules.
- Optimized image handling with Next.js.

## ⚡ Technology Stack

- **Next.js** – React framework for performance and SEO.
- **TypeScript** – Strong type safety and better DX.
- **Socket.io** – Real-time WebSockets for instant messaging.
- **Redis** – In-memory caching for fast event handling.
- **MongoDB + Mongoose** – NoSQL database for storing conversations.
- **Node.js + Express** – Backend API with authentication and routing.
- **SCSS Modules** – Modular and reusable styles.
- **ESLint & Prettier** – Code quality and consistency.

## ⚙️ Build & Installation

### Prerequisites

Before installing the project, ensure you have the following installed:

- **Node.js (16+)** – Required to run Next.js.
- **npm** or **yarn** – To install dependencies and run scripts.
- **MongoDB** – NoSQL database for storing messages.
- **Redis** – For user presence tracking and caching.

### Installation Instructions

Follow these steps to clone, build, and run QuickTalk:
```sh
# Clone the repository
git clone https://github.com/andreiv03/quicktalk.git
cd quicktalk

# Install dependencies for server
cd server && npm install

# Create a .env file in the root directory and configure your settings
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_secret_key

# Start the development server
npm run dev

# Open another terminal
# Install dependencies for client
cd client && npm install

# Start the development server
npm run dev
```
The app will be accessible at [http://localhost:3000](http://localhost:3000).

## 🤝 Contributing

Contributions are welcome! If you'd like to enhance the project, follow these steps:

1. **Fork** the repository
2. Create a **feature branch** (`git checkout -b feature-branch`)
3. **Commit** your changes (`git commit -m "feat: add new feature"`)
4. **Push** your changes (`git push origin feature-branch`)
5. Open a **Pull Request** 🚀

For suggestions or bug reports, feel free to open an issue with the appropriate label.

⭐ **If you find this project useful, consider giving it a star!** ⭐

## 📜 License

Distributed under the **MIT License**. See `LICENSE` for details.
