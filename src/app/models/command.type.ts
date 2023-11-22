export const Command = {
  PLACE: 'PLACE',
  MOVE: 'MOVE',
  TURN: 'TURN',
  REPORT: 'REPORT',
} as const;

export type Command = (typeof Command)[keyof typeof Command];

export const commands = Object.values(Command);
