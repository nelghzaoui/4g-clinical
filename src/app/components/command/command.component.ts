import { ChangeDetectionStrategy, Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Command, Commands } from '../../models/command.type';
import {
  Direction,
  Directions,
  Orientation,
} from '../../models/direction.type';
import { RobotService } from '../../services/robot/robot.service';

@Component({
  selector: 'command-component',
  templateUrl: './command.component.html',
  styleUrls: ['./command.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommandComponent implements OnInit {
  commands: Command[] = Commands;
  directions: Direction[] = Directions;
  reportLabel: string = '';

  /* Forms values */
  command: Command = 'PLACE';
  x: number = 0;
  y: number = 0;
  direction: Direction = 'SOUTH';
  turnDirection: Orientation = 'LEFT';

  constructor(private readonly robotService: RobotService) {}

  ngOnInit(): void {}

  onSubmit(): void {
    switch (this.command) {
      case 'PLACE':
        if (
          this.x === undefined ||
          this.y === undefined ||
          this.direction === undefined
        ) {
          throw new Error('Invalid place command');
        }
        this.robotService.place(this.x, this.y, this.direction);
        break;
      case 'MOVE':
        this.robotService.move();
        break;
      case 'TURN':
        if (this.turnDirection === undefined) {
          throw new Error('Invalid turn command');
        }
        this.robotService.turn(
          this.turnDirection === 'LEFT' ? Orientation.LEFT : Orientation.RIGHT
        );
        break;
      case 'REPORT':
        this.reportLabel = this.robotService.report();
        break;
    }
  }
}
