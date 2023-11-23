import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Robot } from '../../models/robot.class';
import { Direction, Orientation } from '../../models/direction.type';
import { Location } from '../../models/location.class';
@Injectable({ providedIn: 'root' })
export class RobotService {
  private robot?: Robot;

  constructor(private readonly matSnackBar: MatSnackBar) {}

  place(x: number, y: number, direction: Direction) {
    this.robot = new Robot(x, y, direction);
  }

  calculateNewLocation(): Location {
    if (!this.robot) {
      throw new Error('Robot has not been placed yet');
    }

    return this.robot.calculateNewLocation();
  }

  move(nextLocation: Location) {
    if (!this.robot) {
      throw new Error('Robot has not been placed yet');
    }

    this.robot = this.robot.moveTo(nextLocation);
  }

  turn(orientation: Orientation) {
    if (!this.robot) {
      throw new Error('Robot has not been placed yet');
    }

    this.robot.turn(orientation);
  }

  report(): void {
    if (!this.robot) {
      throw new Error('Robot has not been placed yet');
    }

    this.matSnackBar.open(this.robot.toString(), 'Close', {
      duration: 20000,
      data: {
        ['attr.data-cy']: 'snackbar',
      },
    });
  }

  getCurrentLocation(): Location {
    if (!this.robot) {
      throw new Error('Robot has not been placed yet');
    }

    return { x: this.robot.x, y: this.robot.y };
  }

  reset() {
    this.robot = undefined;
  }
}
