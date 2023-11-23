import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Command, commands } from '../../models/command.type';
import { Direction, directions, Orientation, orientations } from '../../models/direction.type';
import { GameService } from '../../services/game/game.service';
import { CommandPattern } from '../../models/command-pattern.interface';
import { MoveCommand, PlaceCommand, ReportCommand, TurnCommand } from '../../models/commands.class';

@Component({
  selector: 'command-component',
  templateUrl: './command.component.html',
  styleUrls: ['./command.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommandComponent {
  /* Data */
  commands: Command[] = commands;
  directions: Direction[] = directions;
  orientations: Orientation[] = orientations;
  /* Forms values */
  command: Command = Command.PLACE;
  x: number = 0;
  y: number = 0;
  direction: Direction = Direction.SOUTH;
  orientation: Orientation = Orientation.LEFT;

  constructor(private readonly gameService: GameService) {}

  onSubmit(): void {
    let command: CommandPattern;

    switch (this.command) {
      case Command.PLACE:
        command = new PlaceCommand(this.gameService, this.x, this.y, this.direction);
        break;
      case Command.MOVE:
        command = new MoveCommand(this.gameService);
        break;
      case Command.TURN:
        const turnDirection = this.orientation === 'LEFT' ? 'LEFT' : 'RIGHT';
        command = new TurnCommand(this.gameService, turnDirection);
        break;
      case Command.REPORT:
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
    this.orientation = 'LEFT';
  }
}
