import mongoose from "mongoose";

const MeetingSchema = new mongoose.Schema({
  transcript: String,
  summary: String,
  actionItems: String
}, { timestamps: true });

const Meeting = mongoose.model("Meeting", MeetingSchema);

export default Meeting;