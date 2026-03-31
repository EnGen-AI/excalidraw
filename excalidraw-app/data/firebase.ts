/**
 * Firebase stubs for self-hosted EnGenAI Draw.
 *
 * Firebase SDK has been removed. These no-op functions maintain the import
 * graph so the rest of the codebase builds without changes.
 * Phase 3 (Storage API) will replace these with draw-api calls.
 */

import { getSceneVersion } from "@excalidraw/element";

import type {
  ExcalidrawElement,
  FileId,
  OrderedExcalidrawElement,
} from "@excalidraw/element/types";
import type {
  BinaryFileData,
} from "@excalidraw/excalidraw/types";

import type { SyncableExcalidrawElement } from ".";
import type Portal from "../collab/Portal";

export const loadFirebaseStorage = async (): Promise<null> => {
  return null;
};

export const isSavedToFirebase = (
  _portal: Portal,
  _elements: readonly ExcalidrawElement[],
): boolean => {
  // No Firebase — consider always saved (prevents unload warning)
  return true;
};

export const saveFilesToFirebase = async ({
  prefix: _prefix,
  files,
}: {
  prefix: string;
  files: { id: FileId; buffer: Uint8Array }[];
}): Promise<{ savedFiles: FileId[]; erroredFiles: FileId[] }> => {
  // No-op: files not persisted until Phase 3
  return { savedFiles: [], erroredFiles: files.map((f) => f.id) };
};

export const saveToFirebase = async (
  _portal: Portal,
  _elements: readonly SyncableExcalidrawElement[],
  _appState?: any,
): Promise<null> => {
  return null;
};

export const loadFromFirebase = async (
  _roomId: string,
  _roomKey: string,
  _socket?: any,
): Promise<null> => {
  return null;
};

export const loadFilesFromFirebase = async (
  _prefix: string,
  _decryptionKey: string,
  filesIds: readonly FileId[],
): Promise<{ loadedFiles: BinaryFileData[]; erroredFiles: Map<FileId, true> }> => {
  const erroredFiles = new Map<FileId, true>();
  return { loadedFiles: [], erroredFiles };
};
