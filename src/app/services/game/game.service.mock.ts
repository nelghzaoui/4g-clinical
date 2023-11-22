import { Injectable } from '@angular/core';
import { GameService } from './game.service';
import { MockRobotService } from '../robot/robot.service.mock';
import { MockTableService } from '../table/table.service.mock';

@Injectable()
export class MockGameService extends GameService {
  constructor() {
    super(new MockRobotService(), new MockTableService());
  }

  override placeRobot() {}
  override moveRobot() {}
  override turnRobot() {}
  override report() {}
  override reset() {}
}
