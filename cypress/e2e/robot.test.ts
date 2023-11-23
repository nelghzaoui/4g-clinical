import { Robot } from '../../src/app/models/robot.class';
import { Direction, Orientation } from '../../src/app/models/direction.type';
import { Command } from '../../src/app/models/command.type';
import { haveText, onCommand } from './app.selector';

export class RobotTest extends Robot {
  constructor(x: number, y: number, direction: Direction) {
    super(x, y, direction);
  }

  place() {
    onCommand(Command.PLACE, this.x, this.y, this.direction);
  }

  move() {
    onCommand(Command.MOVE);
    const location = super.calculateNewLocation();
    return new RobotTest(location.x, location.y, this.direction);
  }

  override turn(orientation: Orientation) {
    onCommand(Command.TURN, orientation);
    super.turn(orientation);
  }

  report() {
    onCommand(Command.REPORT);
    haveText(this.toString());
  }
}
