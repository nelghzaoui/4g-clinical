import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { filter, take } from 'rxjs';
import { Command } from './models/command.type';
import { Orientation } from './robot/models/direction.type';
import { RobotService } from './robot/services/robot.service';
import { TableService } from './table/services/table.service';
import { Robot } from 'robot/models/robot.class';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  constructor(
    private readonly tableService: TableService,
    private readonly robotService: RobotService
  ) {}

  ngOnInit(): void {
    this.tableService.tableReady$
      .pipe(
        filter((isReady) => !!isReady),
        take(1)
      )
      .subscribe(() => {
        this.listenToCommands('PLACE', { x: 0, y: 0, direction: 'EAST' });
        this.listenToCommands('REPORT');
        this.listenToCommands('RIGHT');
        this.listenToCommands('REPORT');
        setTimeout(() => {
          this.listenToCommands('MOVE');
          this.listenToCommands('REPORT');
        }, 1000);
        setTimeout(() => {
          this.listenToCommands('MOVE');
          this.listenToCommands('REPORT');
        }, 2000);
        setTimeout(() => {
          this.listenToCommands('MOVE');
          this.listenToCommands('REPORT');
        }, 3000);
        setTimeout(() => {
          this.listenToCommands('RIGHT');
          this.listenToCommands('MOVE');
        }, 4000);
      });
  }

  private listenToCommands(command: Command, robot?: Robot) {
    switch (command) {
      case 'PLACE':
        if (robot === undefined) {
          throw new Error('Robot is undefined');
        }
        this.robotService.place(robot.x, robot.y, robot.direction);
        break;
      case 'MOVE':
        this.robotService.move();
        break;
      case 'LEFT':
        this.robotService.turn(Orientation.LEFT);
        break;
      case 'RIGHT':
        this.robotService.turn(Orientation.RIGHT);
        break;
      case 'REPORT':
        this.robotService.report();
        break;
    }
  }
}
