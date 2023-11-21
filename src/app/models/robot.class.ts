import { Location } from './location.class';
import { Direction } from './direction.type';

export class Robot extends Location {
  constructor(x: number, y: number, public direction: Direction) {
    super(x, y);
  }

  override toString() {
    return `The robot is at ${this.x},${this.y} facing ${this.direction}`;
  }
}
