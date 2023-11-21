import { Location } from './location.class';
import { Direction, Orientation } from './direction.type';

export class Robot extends Location {
  constructor(x: number, y: number, public direction: Direction) {
    super(x, y);
    console.log('Robot created');
  }

  calculateNewLocation(): Location {
    switch (this.direction) {
      case 'NORTH':
        return { x: this.x, y: this.y + 1 };
      case 'EAST':
        return { x: this.x + 1, y: this.y };
      case 'SOUTH':
        return { x: this.x, y: this.y - 1 };
      case 'WEST':
        return { x: this.x - 1, y: this.y };
      default:
        throw new Error('Invalid direction');
    }
  }

  turn(orientation: Orientation) {
    const directions: Direction[] = Object.values(Direction);
    let currentDirectionIndex = directions.indexOf(this.direction);

    const newIndex =
      orientation === Orientation.LEFT
        ? (currentDirectionIndex + 1) % directions.length
        : (currentDirectionIndex - 1 + directions.length) % directions.length;

    this.direction = directions[newIndex];
  }

  override toString() {
    return `The robot is at ${this.x},${this.y} facing ${this.direction}`;
  }
}
