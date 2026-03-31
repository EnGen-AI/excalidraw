import React, { useEffect, useState } from "react";
import { listVaultFiles } from "../data/vault";
import { getProjectId, setFilePath } from "../data/auth";

interface VaultFilePickerProps {
  onSelect: (path: string) => void;
  onClose: () => void;
}

export const VaultFilePicker: React.FC<VaultFilePickerProps> = ({
  onSelect,
  onClose,
}) => {
  const [files, setFiles] = useState<
    { path: string; size_bytes: number; last_modified_at?: string }[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newFileName, setNewFileName] = useState("");

  useEffect(() => {
    const projectId = getProjectId();
    if (!projectId) {
      setError("No project selected");
      setLoading(false);
      return;
    }

    listVaultFiles(projectId)
      .then((result) => {
        setFiles(result);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const handleSelect = (path: string) => {
    setFilePath(path);
    onSelect(path);
  };

  const handleCreate = () => {
    if (!newFileName.trim()) return;
    const path = newFileName.endsWith(".excalidraw")
      ? newFileName
      : `${newFileName}.excalidraw`;
    setFilePath(path);
    onSelect(path);
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(0,0,0,0.5)",
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: "#1e1e1e",
          borderRadius: "12px",
          padding: "1.5rem",
          width: "450px",
          maxHeight: "500px",
          color: "#e0e0e0",
          fontFamily: "system-ui, sans-serif",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 style={{ margin: "0 0 1rem", fontSize: "1.2rem" }}>
          Open from Vault
        </h2>

        {loading && <p style={{ opacity: 0.6 }}>Loading files...</p>}
        {error && <p style={{ color: "#ff6b6b" }}>{error}</p>}

        {!loading && files.length === 0 && !error && (
          <p style={{ opacity: 0.6 }}>No .excalidraw files in this project.</p>
        )}

        <div style={{ maxHeight: "250px", overflowY: "auto", marginBottom: "1rem" }}>
          {files.map((file) => (
            <button
              key={file.path}
              onClick={() => handleSelect(file.path)}
              style={{
                display: "block",
                width: "100%",
                padding: "0.5rem 0.75rem",
                marginBottom: "4px",
                backgroundColor: "transparent",
                border: "1px solid #333",
                borderRadius: "6px",
                color: "#e0e0e0",
                cursor: "pointer",
                textAlign: "left",
                fontSize: "0.9rem",
              }}
            >
              {file.path}
              <span style={{ float: "right", opacity: 0.5, fontSize: "0.75rem" }}>
                {Math.round(file.size_bytes / 1024)}KB
              </span>
            </button>
          ))}
        </div>

        <div style={{ borderTop: "1px solid #333", paddingTop: "1rem" }}>
          <p style={{ fontSize: "0.85rem", marginBottom: "0.5rem", opacity: 0.7 }}>
            Or create a new drawing:
          </p>
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <input
              type="text"
              placeholder="docs/diagrams/my-diagram"
              value={newFileName}
              onChange={(e) => setNewFileName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleCreate()}
              style={{
                flex: 1,
                padding: "0.5rem",
                backgroundColor: "#2a2a2a",
                border: "1px solid #444",
                borderRadius: "6px",
                color: "#e0e0e0",
                fontSize: "0.9rem",
              }}
            />
            <button
              onClick={handleCreate}
              disabled={!newFileName.trim()}
              style={{
                padding: "0.5rem 1rem",
                backgroundColor: "#228be6",
                color: "#fff",
                border: "none",
                borderRadius: "6px",
                cursor: newFileName.trim() ? "pointer" : "not-allowed",
                opacity: newFileName.trim() ? 1 : 0.5,
              }}
            >
              Create
            </button>
          </div>
        </div>

        <button
          onClick={onClose}
          style={{
            marginTop: "1rem",
            padding: "0.4rem 1rem",
            backgroundColor: "transparent",
            border: "1px solid #555",
            borderRadius: "6px",
            color: "#aaa",
            cursor: "pointer",
            fontSize: "0.85rem",
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};
