import { DefaultSidebar } from "@excalidraw/excalidraw";

import "./AppSidebar.scss";

// Sidebar tabs (comments, presentation) removed for self-hosted EnGenAI Draw.
// These were Excalidraw+ promo features. Can be re-implemented with vault
// integration when collaboration features are built.
export const AppSidebar = () => {
  return <DefaultSidebar />;
};
