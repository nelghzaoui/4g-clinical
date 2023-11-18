import { Injectable } from '@angular/core';
import { Robot } from '../models/robot.class';
import { Direction, Orientation } from '../models/direction.type';
import { TableService } from '../../table/services/table.service';
@Injectable({ providedIn: 'root' })
export class RobotService {
  robot: Robot | undefined;
  private isOffGrid = (x: number, y: number) =>
    x < 0 || x > 4 || y < 0 || y > 4;

  constructor(private readonly tableService: TableService) {}

  place(x: number, y: number, direction: Direction) {
    if (this.isOffGrid(x, y)) {
      throw new Error('Robot is off grid');
    }

    this.robot = new Robot(x, y, direction);
    this.tableService.setActiveTableItem(x, y);
  }

  move() {
    if (!this.robot) {
      throw new Error('Robot has not been placed yet');
    }

    switch (this.robot.direction) {
      case 'NORTH':
        this.isMoveForbidden(this.robot.x, this.robot.y + 1);
        this.tableService.resetActiveTableItem(this.robot.x, this.robot.y);
        this.tableService.setActiveTableItem(this.robot.x, this.robot.y + 1);
        this.robot.y++;
        break;
      case 'EAST':
        this.isMoveForbidden(this.robot.x + 1, this.robot.y);
        this.tableService.resetActiveTableItem(this.robot.x, this.robot.y);
        this.tableService.setActiveTableItem(this.robot.x + 1, this.robot.y);
        this.robot.x++;
        break;
      case 'SOUTH':
        this.isMoveForbidden(this.robot.x, this.robot.y - 1);
        this.tableService.resetActiveTableItem(this.robot.x, this.robot.y);
        this.tableService.setActiveTableItem(this.robot.x, this.robot.y - 1);
        this.robot.y--;
        break;
      case 'WEST':
        this.isMoveForbidden(this.robot.x - 1, this.robot.y);
        this.tableService.resetActiveTableItem(this.robot.x, this.robot.y);
        this.tableService.setActiveTableItem(this.robot.x - 1, this.robot.y);
        this.robot.x--;
        break;
      default:
        throw new Error('Invalid direction');
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
    const isOnCorner = (x === 0 || x === 4) && (y === 0 || y === 4);

    if (this.isOffGrid(x, y) || isOnCorner) {
      throw new Error('Forbidden move');
    }
  }
}
