import { useState, useRef } from "react";

function UploadMeeting() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [showTranscript, setShowTranscript] = useState(false);
  const [drag, setDrag] = useState(false);
  const inputRef = useRef();

  const handleUpload = async () => {
    if (!file) return alert("Please select an audio file");
    const formData = new FormData();
    formData.append("audio", file);
    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:5000"}/upload`, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) {
        alert(data.details || data.error || "Error processing audio");
        return;
      }
      setResult(data);
    } catch (err) {
      console.error(err);
      alert("Error uploading file. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDrag(false);
    const dropped = e.dataTransfer.files[0];
    if (dropped) setFile(dropped);
  };

  return (
    <div style={{ marginBottom: "56px" }}>

      {/* Section label */}
      <div style={{
        display: "flex", alignItems: "center", gap: "8px",
        marginBottom: "16px",
      }}>
        <div style={{ width: "3px", height: "16px", background: "linear-gradient(#7c6aff,#ff6a9e)", borderRadius: "2px" }} />
        <span style={{
          fontFamily: "'Syne', sans-serif", fontWeight: 700,
          fontSize: "11px", letterSpacing: "0.12em",
          textTransform: "uppercase", color: "#6060a0",
        }}>Upload Audio</span>
      </div>

      {/* Drop Zone */}
      <div
        onClick={() => inputRef.current.click()}
        onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
        onDragLeave={() => setDrag(false)}
        onDrop={handleDrop}
        style={{
          border: `1.5px dashed ${drag ? "#7c6aff" : file ? "#6affd4" : "#ffffff14"}`,
          borderRadius: "18px",
          padding: "48px 24px",
          textAlign: "center",
          cursor: "pointer",
          background: drag ? "#7c6aff08" : file ? "#6affd406" : "#10101a",
          transition: "all 0.2s ease",
          marginBottom: "14px",
        }}
      >
        <input
          ref={inputRef}
          type="file"
          accept="audio/*"
          style={{ display: "none" }}
          onChange={(e) => setFile(e.target.files[0])}
        />
        <div style={{ fontSize: "32px", marginBottom: "14px" }}>
          {file ? "🎵" : "🎧"}
        </div>
        {file ? (
          <>
            <div style={{ color: "#6affd4", fontWeight: 500, fontSize: "15px" }}>
              {file.name}
            </div>
            <div style={{ color: "#4a4a7a", fontSize: "13px", marginTop: "6px" }}>
              {(file.size / 1024 / 1024).toFixed(2)} MB · Click to change file
            </div>
          </>
        ) : (
          <>
            <div style={{ color: "#c0c0e0", fontWeight: 500, fontSize: "15px" }}>
              Drop your audio file here
            </div>
            <div style={{ color: "#4a4a7a", fontSize: "13px", marginTop: "6px" }}>
              or click to browse · MP3, WAV, M4A, WEBM supported
            </div>
          </>
        )}
      </div>

      {/* Upload Button */}
      <button
        onClick={handleUpload}
        disabled={loading || !file}
        style={{
          width: "100%",
          padding: "17px",
          borderRadius: "14px",
          border: "none",
          background: loading || !file
            ? "#1a1a28"
            : "linear-gradient(135deg, #7c6aff 0%, #ff6a9e 100%)",
          color: loading || !file ? "#3a3a6a" : "#fff",
          fontFamily: "'Syne', sans-serif",
          fontWeight: 700,
          fontSize: "15px",
          letterSpacing: "0.03em",
          cursor: loading || !file ? "not-allowed" : "pointer",
          transition: "all 0.25s ease",
          boxShadow: loading || !file ? "none" : "0 8px 32px #7c6aff33",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "10px",
        }}
      >
        {loading ? (
          <>
            <span style={{ display: "inline-block", animation: "spin 1s linear infinite" }}>⏳</span>
            Analyzing your meeting…
          </>
        ) : (
          "⚡ Upload & Analyze"
        )}
      </button>

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* Results */}
      {result && (
        <div style={{
          marginTop: "28px",
          display: "flex", flexDirection: "column", gap: "14px",
          animation: "fadeUp 0.4s ease",
        }}>
          {/* Summary */}
          <div style={{
            background: "#10101a",
            border: "1px solid #ffffff0d",
            borderRadius: "18px",
            padding: "24px 26px",
            borderLeft: "3px solid #7c6aff",
          }}>
            <div style={{
              fontFamily: "'Syne', sans-serif", fontWeight: 700,
              fontSize: "10px", letterSpacing: "0.14em",
              textTransform: "uppercase", color: "#7c6aff",
              marginBottom: "12px",
              display: "flex", alignItems: "center", gap: "6px",
            }}>
              <span>📋</span> Summary
            </div>
            <p style={{ color: "#b0b0d0", lineHeight: 1.75, fontSize: "14.5px" }}>
              {result.summary}
            </p>
          </div>

          {/* Action Items */}
          <div style={{
            background: "#10101a",
            border: "1px solid #ffffff0d",
            borderRadius: "18px",
            padding: "24px 26px",
            borderLeft: "3px solid #ff6a9e",
          }}>
            <div style={{
              fontFamily: "'Syne', sans-serif", fontWeight: 700,
              fontSize: "10px", letterSpacing: "0.14em",
              textTransform: "uppercase", color: "#ff6a9e",
              marginBottom: "12px",
              display: "flex", alignItems: "center", gap: "6px",
            }}>
              <span>✅</span> Action Items
            </div>
            <p style={{
              color: "#b0b0d0", lineHeight: 1.75, fontSize: "14.5px",
              whiteSpace: "pre-wrap",
            }}>
              {result.actionItems}
            </p>
          </div>

          {/* Transcript toggle */}
          <button
            onClick={() => setShowTranscript(!showTranscript)}
            style={{
              background: "transparent",
              border: "1px solid #ffffff0f",
              borderRadius: "12px", padding: "13px 20px",
              color: "#4a4a8a", cursor: "pointer",
              fontSize: "13px", fontFamily: "'DM Sans', sans-serif",
              transition: "all 0.2s", width: "100%",
              display: "flex", alignItems: "center", justifyContent: "center", gap: "6px",
            }}
          >
            {showTranscript ? "▲ Hide Transcript" : "▼ Show Full Transcript"}
          </button>

          {showTranscript && (
            <div style={{
              background: "#0c0c16",
              border: "1px solid #ffffff08",
              borderRadius: "14px", padding: "20px 24px",
              color: "#5a5a8a", fontSize: "13.5px",
              lineHeight: 1.85, maxHeight: "280px",
              overflowY: "auto", fontFamily: "monospace",
              animation: "fadeUp 0.3s ease",
            }}>
              {result.transcript}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default UploadMeeting;
