import { Injectable } from '@angular/core';
import { Robot } from '../models/robot.class';
import { Direction, Orientation } from '../models/direction.type';

@Injectable({ providedIn: 'root' })
export class RobotService {
  robot: Robot | undefined;

  constructor() {}

  place(x: number, y: number, direction: Direction) {
    this.robot = new Robot(x, y, direction);
  }

  move() {
    if (!this.robot) {
      throw new Error('Robot has not been placed yet');
    }

    switch (this.robot.direction) {
      case 'NORTH':
        this.isMoveForbidden(this.robot.x, this.robot.y + 1);
        this.robot.y++;
        break;
      case 'EAST':
        this.isMoveForbidden(this.robot.x + 1, this.robot.y);
        this.robot.x++;
        break;
      case 'SOUTH':
        this.isMoveForbidden(this.robot.x, this.robot.y - 1);
        this.robot.y--;
        break;
      case 'WEST':
        this.isMoveForbidden(this.robot.x - 1, this.robot.y);
        this.robot.x--;
        break;
    }
  }

  turn(orientation: Orientation) {
    if (!this.robot) {
      throw new Error('Robot has not been placed yet');
    }

    const directions: Direction[] = Object.values(Direction);
    let currentDirectionIndex = directions.indexOf(this.robot.direction);

    const newIndex =
      orientation === Orientation.LEFT
        ? (currentDirectionIndex + 1) % directions.length
        : (currentDirectionIndex - 1 + directions.length) % directions.length;

    this.robot.direction = directions[newIndex];
  }

  report() {
    if (!this.robot) {
      throw new Error('Robot has not been placed yet');
    }

    console.log(this.robot.toString());
  }

  isMoveForbidden(x: number, y: number) {
    const isOffGrid = x < 0 || x > 4 || y < 0 || y > 4;
    const isOnCorner = (x === 0 || x === 4) && (y === 0 || y === 4);

    if (isOffGrid || isOnCorner) {
      throw new Error('Forbidden move');
    }
  }
}
