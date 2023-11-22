export interface CommandPattern {
  execute(): void;
  validate(): void;
}
