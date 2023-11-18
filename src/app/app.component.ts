import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { filter, take } from 'rxjs';
import { Command } from './models/command.type';
import { Direction } from './robot/models/direction.type';
import { RobotService } from './robot/services/robot.service';
import { TableService } from './table/services/table.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  x: number = 0; //TODO: Replace by form value
  y: number = 0; //TODO: Replace by form value
  d: Direction = 'SOUTH'; //TODO: Replace by form value

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
        this.listenToCommands('PLACE');
        this.listenToCommands('REPORT');
      });
  }

  private listenToCommands(command: Command) {
    switch (command) {
      case 'PLACE':
        this.robotService.place(this.x, this.y, this.d);
        this.tableService.setActiveTableItem(this.x, this.y);
        break;
      case 'MOVE':
        this.robotService.move();
        break;
      case 'LEFT':
        this.robotService.turn('LEFT');
        break;
      case 'RIGHT':
        this.robotService.turn('RIGHT');
        break;
      case 'REPORT':
        this.robotService.report();
        break;
    }
  }
}
