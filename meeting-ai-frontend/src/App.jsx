import UploadMeeting from "./components/UploadMeeting";
import MeetingList from "./components/MeetingList";
import "./App.css";

function App() {
  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "0 20px",
    }}>
      {/* Nav */}
      <nav style={{
        width: "100%", maxWidth: "720px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "24px 0", marginBottom: "16px",
        borderBottom: "1px solid #ffffff09",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{
            width: "34px", height: "34px", borderRadius: "10px",
            background: "linear-gradient(135deg, #7c6aff, #ff6a9e)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "16px", flexShrink: 0,
          }}>🎙️</div>
          <span style={{
            fontFamily: "'Syne', sans-serif", fontWeight: 700,
            fontSize: "15px", color: "#eeeeff", letterSpacing: "-0.01em",
          }}>MeetingAI</span>
        </div>
        <div style={{
          background: "#7c6aff18", border: "1px solid #7c6aff33",
          borderRadius: "99px", padding: "6px 14px",
          fontSize: "12px", color: "#a090ff", fontWeight: 500,
        }}>
          ● Live
        </div>
      </nav>

      {/* Hero */}
      <div style={{
        width: "100%", maxWidth: "720px",
        textAlign: "center", padding: "40px 0 48px",
      }}>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: "8px",
          background: "#7c6aff15", border: "1px solid #7c6aff30",
          borderRadius: "99px", padding: "6px 16px", marginBottom: "24px",
          fontSize: "12px", color: "#a090ff", fontWeight: 500,
          letterSpacing: "0.05em",
        }}>
          ✦ Powered by Groq-sdk
        </div>

        <h1 style={{
          fontFamily: "'Syne', sans-serif", fontWeight: 800,
          fontSize: "clamp(2.2rem, 6vw, 3.6rem)", lineHeight: 1.08,
          letterSpacing: "-0.03em",
          background: "linear-gradient(160deg, #ffffff 40%, #9080ff 75%, #ff6a9e)",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          marginBottom: "18px",
        }}>
          Turn meetings into<br />actionable insights
        </h1>

        <p style={{
          color: "#6060a0", fontSize: "16px", fontWeight: 300,
          lineHeight: 1.6, maxWidth: "440px", margin: "0 auto",
        }}>
          Upload any audio recording and get an instant transcript,
          AI summary, and extracted action items.
        </p>
      </div>

      {/* Main content */}
      <div style={{ width: "100%", maxWidth: "720px", paddingBottom: "80px" }}>
        <UploadMeeting />
        <MeetingList />
      </div>

      {/* Footer */}
      <footer style={{
        width: "100%", maxWidth: "720px",
        borderTop: "1px solid #ffffff08",
        padding: "24px 0", marginTop: "auto",
        textAlign: "center", color: "#3a3a6a", fontSize: "13px",
      }}>
        MeetingAI · Built with React + Node.js + GPT-4o
      </footer>
    </div>
  );
}

export default App;