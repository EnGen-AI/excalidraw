import React from "react";

export const UnauthScreen: React.FC = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        fontFamily: "system-ui, -apple-system, sans-serif",
        backgroundColor: "#121212",
        color: "#e0e0e0",
      }}
    >
      <h1 style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>
        EnGenAI Draw
      </h1>
      <p
        style={{
          fontSize: "1.1rem",
          opacity: 0.7,
          marginBottom: "2rem",
          textAlign: "center",
          maxWidth: "400px",
        }}
      >
        Please open a drawing from your EnGenAI workbench to start editing.
      </p>
      <a
        href="https://app.engenai.app/login"
        style={{
          padding: "0.75rem 2rem",
          backgroundColor: "#228be6",
          color: "#fff",
          borderRadius: "8px",
          textDecoration: "none",
          fontSize: "1rem",
        }}
      >
        Go to Workbench
      </a>
      <p
        style={{
          marginTop: "3rem",
          fontSize: "0.75rem",
          opacity: 0.4,
        }}
      >
        Powered by Excalidraw
      </p>
    </div>
  );
};
