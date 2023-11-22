import { Injectable } from '@angular/core';
import { RobotService } from './robot.service';
import { Location } from '../../models/location.class';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class MockRobotService extends RobotService {
  constructor() {
    super({} as MatSnackBar);
  }

  override place() {}
  override calculateNewLocation(): Location {
    return { x: 0, y: 1 };
  }
  override move() {}
  override turn() {}
  override report() {}
  override getCurrentLocation(): Location {
    return { x: 0, y: 0 };
  }
  override reset() {}
}
