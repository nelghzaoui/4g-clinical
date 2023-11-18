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
    //TODO: Move to the current direction
    throw new Error('Method not implemented.');
  }

  turn(orientation: Orientation) {
    //TODO: Rotate to 90 degrees in the given orientation
    throw new Error('Method not implemented.');
  }

  report() {
    if (this.robot) {
      console.log(this.robot.toString());
    }
  }
}
