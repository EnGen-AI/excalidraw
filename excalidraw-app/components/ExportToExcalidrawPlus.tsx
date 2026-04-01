/**
 * Export to Excalidraw+ stub for self-hosted EnGenAI Draw.
 *
 * The export-to-plus feature is disabled. These stubs maintain the
 * import graph so App.tsx builds without changes.
 */

import type { FC } from "react";

import type {
  NonDeletedExcalidrawElement,
} from "@excalidraw/element/types";
import type {
  AppState,
  BinaryFiles,
} from "@excalidraw/excalidraw/types";

export const exportToExcalidrawPlus = async (
  _elements: readonly NonDeletedExcalidrawElement[],
  _appState: Partial<AppState>,
  _files: BinaryFiles,
  _name: string,
) => {
  // No-op: Excalidraw+ export disabled in self-hosted mode
  console.info("Export to Excalidraw+ is not available in self-hosted mode.");
};

export const ExportToExcalidrawPlus: FC<{
  elements: readonly NonDeletedExcalidrawElement[];
  appState: Partial<AppState>;
  files: BinaryFiles;
  name: string;
  onError: (error: Error) => void;
  onSuccess: () => void;
}> = () => {
  // Hidden in self-hosted mode
  return null;
};
