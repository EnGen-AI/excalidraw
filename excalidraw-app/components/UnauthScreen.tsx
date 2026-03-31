import React from "react";

import { EnGenAIDrawLogo } from "./EnGenAIDrawLogo";

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
      <div style={{ marginBottom: "1rem", color: "#f3fffb" }}>
        <EnGenAIDrawLogo height={64} />
      </div>
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
    </div>
  );
};
