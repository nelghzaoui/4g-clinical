import { Location } from './location.interface';
import { Direction } from './direction.type';

export class Robot {
  location: Location;

  constructor(x: number, y: number, public direction: Direction) {
    this.location = { row: x, colum: y, isActive: true };
  }

  toString() {
    return `The robot is at ${this.location.row},${this.location.colum} facing ${this.direction}`;
  }
}
