import { Direction } from './direction.type';
import { Robot } from './robot.class';

export class RobotFactory {
  createRobot(x: number, y: number, direction: Direction): Robot {
    return new Robot(x, y, direction);
  }
}
