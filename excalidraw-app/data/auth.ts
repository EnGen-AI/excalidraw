/**
 * Auth module for EnGenAI Draw.
 *
 * Handles JWT token passed via URL fragment from the workbench.
 * Token is stored in sessionStorage (cleared on tab close).
 */

const TOKEN_KEY = "engenai_draw_token";
const PROJECT_KEY = "engenai_draw_project";
const PATH_KEY = "engenai_draw_path";

export interface DrawSession {
  token: string;
  projectId: string;
  filePath: string;
}

export function normalizeTokenValue(
  rawToken: string | null | undefined,
): string | null {
  if (!rawToken) {
    return null;
  }

  const trimmed = rawToken.trim();
  if (!trimmed) {
    return null;
  }

  try {
    const parsed = JSON.parse(trimmed) as { token?: unknown };
    if (typeof parsed.token === "string" && parsed.token.trim()) {
      return parsed.token;
    }
  } catch {
    // Raw JWTs are not JSON. Keep the original value.
  }

  return trimmed;
}

function readStoredToken(): string | null {
  const rawToken = sessionStorage.getItem(TOKEN_KEY);
  const normalizedToken = normalizeTokenValue(rawToken);

  if (!normalizedToken) {
    if (rawToken) {
      sessionStorage.removeItem(TOKEN_KEY);
    }
    return null;
  }

  if (rawToken !== normalizedToken) {
    sessionStorage.setItem(TOKEN_KEY, normalizedToken);
  }

  return normalizedToken;
}

export function parseFragmentAuth(): DrawSession | null {
  const hash = window.location.hash.slice(1);
  if (!hash) return null;

  const params = new URLSearchParams(hash);
  const token = normalizeTokenValue(params.get("token"));
  const projectId = params.get("project");
  const filePath = params.get("path");

  if (!token || !projectId) return null;

  window.history.replaceState(null, "", window.location.pathname);

  sessionStorage.setItem(TOKEN_KEY, token);
  sessionStorage.setItem(PROJECT_KEY, projectId);
  if (filePath) {
    sessionStorage.setItem(PATH_KEY, filePath);
  } else {
    sessionStorage.removeItem(PATH_KEY);
  }

  return { token, projectId, filePath: filePath || "" };
}

export function getSession(): DrawSession | null {
  const token = readStoredToken();
  const projectId = sessionStorage.getItem(PROJECT_KEY);
  if (!token || !projectId) return null;
  return {
    token,
    projectId,
    filePath: sessionStorage.getItem(PATH_KEY) || "",
  };
}

export function getToken(): string | null {
  return readStoredToken();
}

export function getProjectId(): string | null {
  return sessionStorage.getItem(PROJECT_KEY);
}

export function getFilePath(): string | null {
  return sessionStorage.getItem(PATH_KEY);
}

export function setFilePath(path: string): void {
  sessionStorage.setItem(PATH_KEY, path);
}

export function clearSession(): void {
  sessionStorage.removeItem(TOKEN_KEY);
  sessionStorage.removeItem(PROJECT_KEY);
  sessionStorage.removeItem(PATH_KEY);
}

export function isAuthenticated(): boolean {
  return !!readStoredToken();
}
