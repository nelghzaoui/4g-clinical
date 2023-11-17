import { Injectable } from '@angular/core';
import { Robot } from '../models/robot.class';
import { Direction } from '../models/direction.type';

@Injectable({ providedIn: 'root' })
export class RobotService {
  robot: Robot | undefined;

  constructor() {}

  placeOrigin(x: number, y: number, direction: Direction) {
    this.robot = new Robot(x, y, direction);
  }

  move() {}

  turn() {}
}
