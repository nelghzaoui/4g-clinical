import { Location } from './location.class';
import { Direction, Orientation, directions } from './direction.type';

export class Robot extends Location {
  constructor(x: number, y: number, public direction: Direction) {
    super(x, y);
  }

  moveTo(location: Location) {
    return new Robot(location.x, location.y, this.direction);
  }

  calculateNewLocation(): Location {
    switch (this.direction) {
      case Direction.NORTH:
        return { x: this.x, y: this.y + 1 };
      case Direction.EAST:
        return { x: this.x + 1, y: this.y };
      case Direction.SOUTH:
        return { x: this.x, y: this.y - 1 };
      case Direction.WEST:
        return { x: this.x - 1, y: this.y };
      default:
        throw new Error('Invalid direction');
    }
  }

  turn(orientation: Orientation) {
    let currentDirectionIndex = directions.indexOf(this.direction);

    const newIndex =
      orientation === Orientation.LEFT
        ? (currentDirectionIndex - 1 + directions.length) % directions.length
        : (currentDirectionIndex + 1) % directions.length;

    this.direction = directions[newIndex];
  }

  override toString() {
    return `The robot is at ${this.x},${this.y} facing ${this.direction}`;
  }
}
