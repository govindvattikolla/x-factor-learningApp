import { useState } from "react";
import axios from "axios";
import { Button, Input, DatePicker } from "antd";

export default function UploadSession() {
  const [videoUrl, setVideoUrl] = useState(""); // State for URL input
  const [title, setTitle] = useState("");
  const [timestamp, setTimestamp] = useState(null);
  const [uploading, setUploading] = useState(false);

  // Handle upload
  const handleUpload = async () => {
    if (!videoUrl) {
      alert("Please enter a YouTube unlisted video URL");
      return;
    }

    setUploading(true);
    try {
      const formData = {
        title,
        timestamp: timestamp?.toISOString(),
        videoUrl, // Send URL
      };

      const response = await axios.post("http://localhost:5000/api/upload", formData);
      alert("Video uploaded successfully: " + response.data.videoUrl);
    } catch (error) {
      console.error("Upload error:", error);
      alert("Failed to upload video");
    }

    setUploading(false);
  };

  return (
    <div style={styles.container}>
      <div style={styles.formBox}>
        <h2 style={styles.title}>Upload Recordings</h2>

        {/* Title Input */}
        <label style={styles.label}>Title</label>
        <Input
          placeholder="Enter Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={styles.input}
        />

        {/* Timestamp Picker */}
        <label style={styles.label}>Select Date & Time</label>
        <DatePicker
          showTime
          placeholder="Select Timestamp"
          onChange={(date) => setTimestamp(date)}
          style={styles.input}
        />

        {/* Video URL Input */}
        <label style={styles.label}>YouTube Unlisted Video URL</label>
        <Input
          placeholder="Enter YouTube Unlisted Video URL"
          required
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
          style={styles.input}
        />

        {/* Upload Button */}
        <Button
          type="primary"
          loading={uploading}
          onClick={handleUpload}
          style={styles.button}
        >
          {uploading ? "Uploading..." : "Upload Video"}
        </Button>
      </div>
    </div>
  );
}

// Style for the form and container
const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#bbe4e9", 
    padding: "20px",
    marginTop:"-80px"
  },
  formBox: {
    maxWidth: "400px",
    width: "100%",
    backgroundColor: "white",
    padding: "24px",
    borderRadius: "10px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)", 
  },
  title: {
    textAlign: "center",
    fontSize: "22px",
    fontWeight: "bold",
    marginBottom: "20px",
    color: "#333",
  },
  label: {
    display: "block",
    fontSize: "14px",
    fontWeight: "500",
    color: "#555",
    marginBottom: "6px",
  },
  input: {
    width: "100%",
    padding: "8px",
    borderRadius: "6px",
    border: "1px solid #ddd",
    marginBottom: "16px",
  },
  button: {
    width: "100%",
    backgroundColor: "#1677ff",
    color: "white",
    padding: "10px",
    borderRadius: "6px",
    fontSize: "16px",
    fontWeight: "bold",
    transition: "background 0.3s",
  },
};

