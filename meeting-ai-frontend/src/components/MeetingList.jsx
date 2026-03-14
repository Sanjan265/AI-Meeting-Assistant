import { useState, useEffect } from "react";

function MeetingList() {
  const [meetings, setMeetings] = useState([]);
  const [expanded, setExpanded] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/meetings")
      .then((res) => res.json())
      .then((data) => setMeetings(data))
      .catch((err) => console.error(err));
  }, []);

  const handleDelete = async (id) => {
    await fetch(`http://localhost:5000/meetings/${id}`, { method: "DELETE" });
    setMeetings(meetings.filter((m) => m._id !== id));
  };

  const accentColors = ["#7c6aff", "#ff6a9e", "#6affd4", "#ffb86a", "#6aaeff"];

  return (
    <div>
      {/* Section Header */}
      <div style={{
        display: "flex", alignItems: "center",
        justifyContent: "space-between", marginBottom: "16px",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div style={{ width: "3px", height: "16px", background: "linear-gradient(#6affd4,#6aaeff)", borderRadius: "2px" }} />
          <span style={{
            fontFamily: "'Syne', sans-serif", fontWeight: 700,
            fontSize: "11px", letterSpacing: "0.12em",
            textTransform: "uppercase", color: "#6060a0",
          }}>Meeting History</span>
        </div>
        <div style={{
          background: "#6affd410", border: "1px solid #6affd425",
          borderRadius: "99px", padding: "4px 12px",
          fontSize: "12px", color: "#6affd4", fontWeight: 500,
        }}>
          {meetings.length} {meetings.length === 1 ? "meeting" : "meetings"}
        </div>
      </div>

      {meetings.length === 0 ? (
        <div style={{
          background: "#10101a",
          border: "1.5px dashed #ffffff0d",
          borderRadius: "18px", padding: "56px 24px",
          textAlign: "center",
        }}>
          <div style={{ fontSize: "36px", marginBottom: "14px", opacity: 0.5 }}>🎙️</div>
          <div style={{ color: "#3a3a6a", fontSize: "14px", fontWeight: 500 }}>
            No meetings analyzed yet
          </div>
          <div style={{ color: "#2a2a4a", fontSize: "13px", marginTop: "6px" }}>
            Upload your first audio file above to get started.
          </div>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {meetings.map((meeting, i) => {
            const color = accentColors[i % accentColors.length];
            const isOpen = expanded === meeting._id;
            return (
              <div key={meeting._id} style={{
                background: "#10101a",
                border: `1px solid ${isOpen ? color + "33" : "#ffffff0d"}`,
                borderRadius: "18px", overflow: "hidden",
                transition: "border-color 0.2s",
              }}>
                {/* Card Header */}
                <div
                  onClick={() => setExpanded(isOpen ? null : meeting._id)}
                  style={{
                    padding: "18px 22px", cursor: "pointer",
                    display: "flex", alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                    <div style={{
                      width: "38px", height: "38px", borderRadius: "11px", flexShrink: 0,
                      background: color + "18", border: `1px solid ${color}33`,
                      display: "flex", alignItems: "center",
                      justifyContent: "center", fontSize: "17px",
                    }}>🗒️</div>
                    <div>
                      <div style={{
                        fontFamily: "'Syne', sans-serif", fontWeight: 600,
                        fontSize: "14px", color: "#d0d0f0",
                      }}>
                        Meeting #{meetings.length - i}
                      </div>
                      <div style={{ color: "#3a3a6a", fontSize: "12px", marginTop: "3px" }}>
                        {new Date(meeting.createdAt).toLocaleDateString("en-US", {
                          month: "short", day: "numeric", year: "numeric",
                          hour: "2-digit", minute: "2-digit",
                        })}
                      </div>
                    </div>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <button
                      onClick={(e) => { e.stopPropagation(); handleDelete(meeting._id); }}
                      style={{
                        background: "#ff4a4a12", border: "1px solid #ff4a4a28",
                        borderRadius: "8px", padding: "6px 12px",
                        color: "#ff5a5a", cursor: "pointer",
                        fontSize: "12px", fontFamily: "'DM Sans', sans-serif",
                        transition: "all 0.15s",
                      }}
                    >Delete</button>
                    <div style={{
                      width: "24px", height: "24px", borderRadius: "6px",
                      background: "#ffffff07",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      color: "#3a3a6a", fontSize: "11px",
                    }}>
                      {isOpen ? "▲" : "▼"}
                    </div>
                  </div>
                </div>

                {/* Expanded */}
                {isOpen && (
                  <div style={{ padding: "0 22px 22px" }}>
                    <div style={{ height: "1px", background: "#ffffff07", marginBottom: "20px" }} />
                    <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
                      <div>
                        <div style={{
                          fontSize: "10px", letterSpacing: "0.12em",
                          textTransform: "uppercase", color: "#7c6aff",
                          fontWeight: 700, marginBottom: "8px",
                          fontFamily: "'Syne', sans-serif",
                        }}>📋 Summary</div>
                        <p style={{ color: "#8080b0", fontSize: "14px", lineHeight: 1.75 }}>
                          {meeting.summary}
                        </p>
                      </div>
                      <div>
                        <div style={{
                          fontSize: "10px", letterSpacing: "0.12em",
                          textTransform: "uppercase", color: "#ff6a9e",
                          fontWeight: 700, marginBottom: "8px",
                          fontFamily: "'Syne', sans-serif",
                        }}>✅ Action Items</div>
                        <p style={{
                          color: "#8080b0", fontSize: "14px", lineHeight: 1.75,
                          whiteSpace: "pre-wrap",
                        }}>
                          {meeting.actionItems}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default MeetingList;