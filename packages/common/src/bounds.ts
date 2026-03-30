import type { Radians } from "@excalidraw/math";

/**
 * x and y position of top left corner, x and y position of bottom right corner
 */
export type Bounds = readonly [
  minX: number,
  minY: number,
  maxX: number,
  maxY: number,
] & { _brand: "excalidraw__bounds" };

export type RotatedBounds = readonly [
  minX: number,
  minY: number,
  maxX: number,
  maxY: number,
  angle: Radians,
] & {
  _brand_rotated: "excalidraw__rotated_bounds";
};

export const bounds = <T extends Radians | undefined = undefined>(
  minX: number,
  minY: number,
  maxX: number,
  maxY: number,
  angle: T = undefined as T,
) => {
  return (
    angle
      ? ([minX, minY, maxX, maxY, angle] as unknown)
      : ([minX, minY, maxX, maxY] as unknown)
  ) as T extends Radians ? RotatedBounds : Bounds;
};

export const isBounds = (box: unknown): box is Bounds =>
  Array.isArray(box) &&
  box.length === 4 &&
  typeof box[0] === "number" &&
  typeof box[1] === "number" &&
  typeof box[2] === "number" &&
  typeof box[3] === "number";

export const isRotatedBounds = (box: unknown): box is RotatedBounds =>
  Array.isArray(box) &&
  box.length === 5 &&
  typeof box[0] === "number" &&
  typeof box[1] === "number" &&
  typeof box[2] === "number" &&
  typeof box[3] === "number" &&
  typeof box[4] === "number";
