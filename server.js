import dotenv from "dotenv";
dotenv.config();

import express from "express";
import multer from "multer";
import mongoose from "mongoose";
import cors from "cors";
import Groq, { toFile } from "groq-sdk";
import fs from "fs";
import Meeting from "./models/Meeting.js";


mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB error:", err));

const app = express();
app.use(cors());
app.use(express.json());

const upload = multer({ dest: "uploads/" });

const client = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

app.post("/upload", upload.single("audio"), async (req, res) => {
  try {
    const fileBuffer = fs.readFileSync(req.file.path);
    const transcript = await client.audio.transcriptions.create({
      file: await toFile(
        fileBuffer,
        req.file.originalname
      ),
      model: "whisper-large-v3",
    });


    const summary = await client.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "user",
          content: `Summarize this meeting:\n${transcript.text}`
        }
      ]
    });

    const actionItems = await client.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "user",
          content: `From this meeting transcript extract action items with:
          - Person responsible
          - Task
          - Deadline (if mentioned)

          Transcript:
          ${transcript.text}`
        }
      ]
    });


    const meeting = new Meeting({
      transcript: transcript.text,
      summary: summary.choices[0].message.content,
      actionItems: actionItems.choices[0].message.content
    });
    await meeting.save();


    await fs.promises.unlink(req.file.path);

    res.json({
      transcript: transcript.text,
      summary: summary.choices[0].message.content,
      actionItems: actionItems.choices[0].message.content
    });

  } catch (error) {
    console.error("Upload error details:", error?.message || error);
    console.error("Full error:", JSON.stringify(error, null, 2));
    res.status(500).json({
      error: "Error processing audio",
      details: error?.message || "Unknown error"
    });
  }
});

app.get("/meetings", async (req, res) => {
  const meetings = await Meeting.find().sort({ createdAt: -1 });
  res.json(meetings);
});

app.delete("/meetings/:id", async (req, res) => {
  await Meeting.findByIdAndDelete(req.params.id);
  res.send("Meeting deleted");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
