import path from "path";

export const uploadFile = (req, res) => {
    try {
      const file = req.file;
  
      if (!file) {
        return res.status(400).json({ error: "No file uploaded" });
      }
  
      const previewUrl = `${req.protocol}://${req.get("host")}/uploads/${file.filename}`;
  
      res.status(200).json({
        message: "File uploaded successfully",
        fileName: file.filename,
        filePath: file.path,
        previewUrl,
      });
    } catch (error) {
      console.error("File upload error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };