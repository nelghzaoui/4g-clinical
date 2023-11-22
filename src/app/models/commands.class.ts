import { CommandPattern } from './command-pattern.interface';
import { GameService } from '../services/game/game.service';
import { Direction, Orientation } from './direction.type';

export class PlaceCommand implements CommandPattern {
  constructor(
    private readonly gameService: GameService,
    private readonly x: number,
    private readonly y: number,
    private readonly direction: Direction
  ) {}

  execute(): void {
    this.gameService.placeRobot(this.x, this.y, this.direction);
  }

  validate(): void {
    if (!this.x || !this.y || !this.direction) {
      throw new Error('Invalid place command');
    }
  }
}

export class MoveCommand implements CommandPattern {
  constructor(private readonly gameService: GameService) {}

  execute(): void {
    this.gameService.moveRobot();
  }

  validate(): void {}
}

export class TurnCommand implements CommandPattern {
  constructor(
    private readonly gameService: GameService,
    private readonly orientation: Orientation
  ) {}

  execute(): void {
    this.gameService.turnRobot(this.orientation);
  }

  validate(): void {
    if (!this.orientation) {
      throw new Error('Invalid turn command');
    }
  }
}

export class ReportCommand implements CommandPattern {
  constructor(private readonly gameService: GameService) {}

  execute(): void {
    this.gameService.report();
  }

  validate(): void {}
}
