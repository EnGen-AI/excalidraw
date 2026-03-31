/**
 * Vault API client for EnGenAI Draw.
 *
 * All file operations go to the platform vault API at app.engenai.app.
 * Draw stores nothing — vault is the single source of truth.
 */

import { getToken } from "./auth";

const PLATFORM_API = "https://app.engenai.app/api/v1";

interface VaultFile {
  path: string;
  size_bytes: number;
  last_modified_at?: string;
  storage_type?: string;
}

interface VaultReadResponse {
  path: string;
  content: string;
  size_bytes: number;
  content_hash: string;
}

interface VaultWriteResponse {
  path: string;
  content_hash: string;
  size_bytes: number;
}

async function vaultFetch<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> {
  const token = getToken();
  if (!token) {
    throw new Error("Not authenticated");
  }

  const response = await fetch(`${PLATFORM_API}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...options.headers,
    },
  });

  if (response.status === 401) {
    window.location.href = "https://app.engenai.app/login";
    throw new Error("Session expired");
  }

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Vault API error ${response.status}: ${body}`);
  }

  return response.json();
}

export async function loadFromVault(
  projectId: string,
  path: string,
): Promise<{ content: string; etag: string }> {
  const data = await vaultFetch<VaultReadResponse>(
    `/projects/${projectId}/vault/read?path=${encodeURIComponent(path)}`,
  );
  return { content: data.content, etag: data.content_hash };
}

export async function saveToVault(
  projectId: string,
  path: string,
  content: string,
  etag?: string,
): Promise<{ etag: string }> {
  const headers: Record<string, string> = {};
  if (etag) {
    headers["If-Match"] = etag;
  }

  const data = await vaultFetch<VaultWriteResponse>(
    `/projects/${projectId}/vault/write?path=${encodeURIComponent(path)}`,
    {
      method: "PUT",
      headers,
      body: JSON.stringify({ content }),
    },
  );
  return { etag: data.content_hash };
}

export async function listVaultFiles(
  projectId: string,
): Promise<VaultFile[]> {
  const files = await vaultFetch<VaultFile[]>(
    `/projects/${projectId}/vault/ls`,
  );
  return files.filter((f) => f.path.endsWith(".excalidraw"));
}

export async function createInVault(
  projectId: string,
  path: string,
  content: string,
): Promise<{ etag: string }> {
  const data = await vaultFetch<VaultWriteResponse>(
    `/projects/${projectId}/vault/write?path=${encodeURIComponent(path)}`,
    {
      method: "PUT",
      body: JSON.stringify({ content }),
    },
  );
  return { etag: data.content_hash };
}
