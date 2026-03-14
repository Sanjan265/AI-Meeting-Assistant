# AI Meeting Assistant 🎙️

Turn your meetings into actionable insights instantly! AI Meeting Assistant is a full-stack application that allows users to upload meeting audio recordings. It automatically transcribes the audio, generates a comprehensive summary, and extracts key action items using state-of-the-art AI models.

## ✨ Features
- **Audio Transcription**: Highly accurate speech-to-text using Groq's `whisper-large-v3`.
- **Intelligent Summarization**: Context-aware meeting summaries powered by `llama-3.3-70b-versatile`.
- **Action Item Extraction**: Automatically identifies tasks, assigned persons, and deadlines from the conversation.
- **Modern UI**: A sleek, dynamic, and responsive React frontend to manage and view all your meeting records.

## 🛠️ Tech Stack
- **Frontend**: React (Vite), CSS
- **Backend**: Node.js, Express.js, Multer (for file handling)
- **Database**: MongoDB & Mongoose
- **AI Integration**: Groq SDK

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) installed
- [MongoDB](https://www.mongodb.com/try/download/community) installed and running (or a MongoDB Atlas URI)
- A [Groq API Key](https://console.groq.com/) for AI inference

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Sanjan265/AI-Meeting-Assistant.git
   cd AI-Meeting-Assistant
   ```

2. **Backend Setup:**
   - Install dependencies in the root directory:
     ```bash
     npm install
     ```
   - Create a `.env` file in the root directory and add your Groq API key:
     ```env
     GROQ_API_KEY=your_groq_api_key_here
     ```
   - Start the backend server:
     ```bash
     node server.js
     ```

3. **Frontend Setup:**
   - Open a new terminal and navigate to the frontend folder:
     ```bash
     cd meeting-ai-frontend
     npm install
     ```
   - Start the React development server:
     ```bash
     npm run dev
     ```

4. **Open the App:**
   - Your frontend will be running at `http://localhost:5173`.
   - Your backend will be running at `http://localhost:5000`.

## 🤝 Contributing
Contributions, issues, and feature requests are welcome! Feel free to check the issues page.
