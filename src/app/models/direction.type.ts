export const Direction = {
  NORTH: 'NORTH',
  EAST: 'EAST',
  SOUTH: 'SOUTH',
  WEST: 'WEST',
} as const;

export type Direction = (typeof Direction)[keyof typeof Direction];

export const directions: Direction[] = [
  Direction.NORTH,
  Direction.EAST,
  Direction.SOUTH,
  Direction.WEST,
];

export const Orientation = {
  LEFT: 'LEFT',
  RIGHT: 'RIGHT',
} as const;

export type Orientation = (typeof Orientation)[keyof typeof Orientation];

export const orientations = Object.values(Orientation);
