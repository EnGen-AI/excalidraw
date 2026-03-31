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
          <span
            style={{
              fontSize: "0.7rem",
              opacity: 0.6,
              color: "inherit",
            }}
          >
            EnGenAI Draw
          </span>
        </div>
      </Footer>
    );
  },
);
