import { Injectable } from '@angular/core';
import { RobotService } from '../robot/robot.service';
import { TableService } from '../table/table.service';
import { Direction, Orientation } from '../../models/direction.type';

@Injectable({ providedIn: 'root' })
export class GameService {
  constructor(
    private readonly robotService: RobotService,
    private readonly tableService: TableService
  ) {}

  placeRobot(x: number, y: number, direction: Direction): void {
    if (this.tableService.hasLocation(x, y)) {
      throw new Error('Robot is off grid');
    }

    this.robotService.place(x, y, direction);
    this.tableService.updateTableItem(x, y, true);
  }

  moveRobot(): void {
    const oldLocation = this.robotService.getCurrentLocation();
    const nextLocation = this.robotService.calculateNewLocation();

    if (!this.tableService.isMoveForbidden(nextLocation.x, nextLocation.y)) {
      this.robotService.move(nextLocation);
      this.tableService.simulateMovement(oldLocation, nextLocation);
    } else {
      throw new Error('Move is forbidden');
    }
  }

  turnRobot(orientation: Orientation): void {
    this.robotService.turn(orientation);
  }

  report(): string {
    return this.robotService.report();
  }

  reset(): void {
    this.robotService.reset();
    this.tableService.reset();
  }
}
