import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import defaultImage from "../../../assets/defaultSessionsImg.jpg";

// Simple skeleton loader animation
const SkeletonLoader = () => (
  <div style={{ width: '280px', padding: '10px', border: '1px solid #ddd', borderRadius: '10px', textAlign: 'left', boxShadow: '0px 4px 6px rgba(0,0,0,0.1)', marginBottom: '20px' }}>
    <div style={{ backgroundColor: '#e0e0e0', height: '150px', borderRadius: '10px' }}></div>
    <div style={{ marginTop: '10px', backgroundColor: '#e0e0e0', height: '20px', borderRadius: '5px' }}></div>
    <div style={{ marginTop: '10px', backgroundColor: '#e0e0e0', height: '15px', width: '60%', borderRadius: '5px' }}></div>
    <div style={{ marginTop: '10px', backgroundColor: '#e0e0e0', height: '15px', width: '40%', borderRadius: '5px' }}></div>
  </div>
);

const SpecificSession = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [sessions, setSessions] = useState([]);
  const [editingSession, setEditingSession] = useState(null); // Track session being edited
  const [editedData, setEditedData] = useState({ title: "", description: "", recordingUrl: "" });
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const fetchSessions = async () => {
      if (!courseId) {
        console.error("❌ Course ID is undefined!");
        return;
      }

      try {
        // Set loading to true before starting the request
        setLoading(true);

        // Fetch data
        const response = await axios.get(`http://localhost:5000/api/courses/${courseId}/sessions`, {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        });

        // Set course and sessions data
        setCourse(response.data.course);
        setSessions(response.data.sessions);
      } catch (error) {
        console.error("❌ Error fetching course sessions:", error);
      } finally {
        // Set loading to false when fetching is done
        setLoading(false);
      }
    };

    fetchSessions();
  }, [courseId]);

  const getSessionStatus = (timestamp) => {
    const sessionDate = new Date(timestamp);
    const now = new Date();
    const sessionEndTime = new Date(sessionDate.getTime() + 60 * 60 * 1000); // 1-hour session duration

    if (now >= sessionDate && now <= sessionEndTime) return { status: "Live Now", icon: "🟡" };
    return sessionDate < now ? { status: "Completed", icon: "🔴" } : { status: "Upcoming", icon: "🟢" };
  };

  /** ✅ Handle Edit Button Click **/
  const handleEdit = (session) => {
    setEditingSession(session._id);
    setEditedData({ title: session.title, description: session.description, recordingUrl: session.recordingUrl });
  };

  /** ✅ Handle Cancel Edit **/
  const cancelEdit = () => {
    setEditingSession(null);
    setEditedData({ title: "", description: "", recordingUrl: "" });
  };

  /** ✅ Handle Save Edit **/
  const saveEdit = async (sessionId) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/sessions/${sessionId}`,
        editedData,
        { headers: { "Content-Type": "application/json" }, withCredentials: true }
      );

      console.log("✅ Session Updated:", response.data);

      // ✅ Update the UI by modifying only the edited session
      setSessions((prevSessions) =>
        prevSessions.map((session) =>
          session._id === sessionId ? { ...session, ...editedData } : session
        )
      );

      setEditingSession(null); // ✅ Exit edit mode
    } catch (error) {
      console.error("❌ Error updating session:", error);
    }
  };

  /** ✅ Handle Delete Session **/
  const handleDelete = async (sessionId) => {
    if (!window.confirm("Are you sure you want to delete this session?")) return;

    try {
      // Check if the sessionId is valid
      console.log("Deleting session with ID:", sessionId);

      const response = await axios.delete(`http://localhost:5000/api/sessions/${sessionId}`, { withCredentials: true });
      setSessions(sessions.filter((session) => session._id !== sessionId));
      console.log("✅ Session Deleted");
    } catch (error) {
      console.error("❌ Error deleting session:", error);
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      {courseId ? (
        <>
          <h1 style={{ fontSize: "2rem", color: "#333", marginBottom: "10px" }}>
            {course?.title || "Course Details"}
          </h1>
          <h2 style={{ borderBottom: "2px solid #ddd", paddingBottom: "5px", display: "inline-block" }}>
            Sessions
          </h2>

          {/* Show skeleton loaders while data is loading */}
          {loading ? (
            <>
              <SkeletonLoader />
              <SkeletonLoader />
              <SkeletonLoader />
            </>
          ) : (
            <div style={{ display: "flex", gap: "20px", flexWrap: "wrap", justifyContent: "center", marginTop: "20px" }}>
              {sessions.length > 0 ? (
                sessions.map((session) => {
                  const { status, icon } = getSessionStatus(session.timestamp);
                  return (
                    <div
                      key={session._id}
                      style={{
                        border: "1px solid #ddd",
                        padding: "10px",
                        width: "280px",
                        borderRadius: "10px",
                        textAlign: "left",
                        boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
                      }}
                    >
                      <img
                        src={defaultImage}
                        alt={session.title}
                        style={{ width: "100%", height: "150px", objectFit: "cover", borderRadius: "10px" }}
                      />

                      {editingSession === session._id ? (
                        <div>
                          <input
                            type="text"
                            value={editedData.title}
                            onChange={(e) => setEditedData({ ...editedData, title: e.target.value })}
                            placeholder="Session Title"
                            style={{ width: "100%", marginTop: "10px" }}
                          />
                          <textarea
                            value={editedData.description}
                            onChange={(e) => setEditedData({ ...editedData, description: e.target.value })}
                            placeholder="Session Description"
                            style={{ width: "100%", marginTop: "5px" }}
                          />
                          <input
                            type="text"
                            value={editedData.recordingUrl}
                            onChange={(e) => setEditedData({ ...editedData, recordingUrl: e.target.value })}
                            placeholder="Recording URL"
                            style={{ width: "100%", marginTop: "5px" }}
                          />

                          <div style={{ marginTop: "10px" }}>
                            <button
                              onClick={() => saveEdit(session._id)}
                              style={{ backgroundColor: "green", color: "white", padding: "5px 10px", marginRight: "5px" }}
                            >
                              💾 Save
                            </button>
                            <button
                              onClick={cancelEdit}
                              style={{ backgroundColor: "gray", color: "white", padding: "5px 10px" }}
                            >
                              ❌ Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <>
                          <h3 style={{ margin: "10px 0", fontSize: "1.3rem" }}>{session.title}</h3>
                          <p style={{ fontSize: "0.9rem", color: "#666" }}>{session.description}</p>

                          <p style={{ fontWeight: "bold", marginTop: "5px" }}>
                            {icon} <span style={{ marginLeft: "5px" }}>{status}</span>
                          </p>

                          {session.recordingUrl && (
                            <a
                              href={session.recordingUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{
                                display: "block",
                                marginTop: "10px",
                                color: "#007BFF",
                                fontWeight: "bold",
                              }}
                            >
                              🎥 Watch Session
                            </a>
                          )}

                          <div style={{ marginTop: "10px", display: "flex", justifyContent: "space-between" }}>
                            <button
                              onClick={() => handleEdit(session)}
                              style={{ backgroundColor: "#007BFF", color: "white", padding: "5px 10px", borderRadius: "5px" }}
                            >
                              ✏️ Edit
                            </button>
                            <button
                              onClick={() => handleDelete(session._id)}
                              style={{ backgroundColor: "red", color: "white", padding: "5px 10px", borderRadius: "5px" }}
                            >
                              🗑️ Delete
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  );
                })
              ) : (
                <p>No sessions available.</p>
              )}
            </div>
          )}
        </>
      ) : (
        <p style={{ color: "red" }}>⚠️ Error: Course ID is missing!</p>
      )}
    </div>
  );
};

export default SpecificSession;
