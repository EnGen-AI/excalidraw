import { Footer } from "@excalidraw/excalidraw/index";
import React from "react";

import { DebugFooter, isVisualDebuggerEnabled } from "./DebugCanvas";
import { EncryptedIcon } from "./EncryptedIcon";

export const AppFooter = React.memo(
  ({ onChange }: { onChange: () => void }) => {
    return (
      <Footer>
        <div
          style={{
            display: "flex",
            gap: ".5rem",
            alignItems: "center",
          }}
        >
          {isVisualDebuggerEnabled() && <DebugFooter onChange={onChange} />}
          <EncryptedIcon />
          <a
            href="https://excalidraw.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontSize: "0.7rem",
              opacity: 0.6,
              textDecoration: "none",
              color: "inherit",
            }}
          >
            Powered by Excalidraw
          </a>
        </div>
      </Footer>
    );
  },
);
