import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Command, Commands } from '../../models/command.type';
import { Direction, Directions, Orientation, Orientations } from '../../models/direction.type';
import { GameService } from '../../services/game/game.service';
import {
  CommandPattern,
  MoveCommand,
  PlaceCommand,
  ReportCommand,
  TurnCommand,
} from '../../models/command-pattern.interface';

@Component({
  selector: 'command-component',
  templateUrl: './command.component.html',
  styleUrls: ['./command.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommandComponent {
  commands: Command[] = Commands;
  directions: Direction[] = Directions;
  orientations: Orientation[] = Orientations;
  reportLabel: string = '';

  /* Forms values */
  command: Command = 'PLACE';
  x: number = 0;
  y: number = 0;
  direction: Direction = 'SOUTH';
  turnDirection: Orientation = 'LEFT';

  constructor(private readonly gameService: GameService) {}

  onSubmit(): void {
    let command: CommandPattern;

    switch (this.command) {
      case 'PLACE':
        command = new PlaceCommand(this.gameService, this.x, this.y, this.direction);
        break;
      case 'MOVE':
        command = new MoveCommand(this.gameService);
        break;
      case 'TURN':
        const turnDirection = this.turnDirection === 'LEFT' ? 'LEFT' : 'RIGHT';
        command = new TurnCommand(this.gameService, turnDirection);
        break;
      case 'REPORT':
        command = new ReportCommand(this.gameService);
        break;
      default:
        this.resetForm();
        throw new Error('Invalid command');
    }

    command.validate();
    command.execute();
  }

  private resetForm(): void {
    this.command = 'PLACE';
    this.x = 0;
    this.y = 0;
    this.direction = 'SOUTH';
    this.turnDirection = 'LEFT';
  }
}
