import { beforeEach, describe, expect, it } from "vitest";

import {
  getSession,
  getToken,
  normalizeTokenValue,
  parseFragmentAuth,
} from "../data/auth";

describe("draw auth token handling", () => {
  beforeEach(() => {
    sessionStorage.clear();
    window.history.replaceState(null, "", "/");
  });

  it("normalizes wrapped customer auth blobs into raw JWTs", () => {
    expect(
      normalizeTokenValue(
        JSON.stringify({
          token: "jwt-abc-123",
          expires_at: 9999999999999,
        }),
      ),
    ).toBe("jwt-abc-123");
  });

  it("stores a normalized token from the fragment and clears the hash", () => {
    window.history.replaceState(
      null,
      "",
      "/#token=%7B%22token%22%3A%22jwt-abc-123%22%2C%22expires_at%22%3A9999999999999%7D&project=project-123&path=docs%2Fdiagram.excalidraw",
    );

    const session = parseFragmentAuth();

    expect(session).toEqual({
      token: "jwt-abc-123",
      projectId: "project-123",
      filePath: "docs/diagram.excalidraw",
    });
    expect(window.location.hash).toBe("");
    expect(sessionStorage.getItem("engenai_draw_token")).toBe("jwt-abc-123");
  });

  it("repairs previously stored wrapped tokens", () => {
    sessionStorage.setItem(
      "engenai_draw_token",
      JSON.stringify({
        token: "jwt-abc-123",
        expires_at: 9999999999999,
      }),
    );
    sessionStorage.setItem("engenai_draw_project", "project-123");
    sessionStorage.setItem("engenai_draw_path", "docs/diagram.excalidraw");

    expect(getToken()).toBe("jwt-abc-123");
    expect(getSession()).toEqual({
      token: "jwt-abc-123",
      projectId: "project-123",
      filePath: "docs/diagram.excalidraw",
    });
    expect(sessionStorage.getItem("engenai_draw_token")).toBe("jwt-abc-123");
  });
});
