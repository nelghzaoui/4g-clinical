import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Direction } from 'models/direction.type';
import { RobotService } from './services/robot.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  x: number = 0;
  y: number = 0;
  d: Direction = 'SOUTH';

  constructor(private readonly robotService: RobotService) {}

  ngOnInit(): void {
    this.listenToCommands('PLACE');
    this.listenToCommands('REPORT');
  }

  listenToCommands(command: Command) {
    switch (command) {
      case 'PLACE':
        this.robotService.place(this.x, this.y, this.d);
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

export type Command = 'PLACE' | 'MOVE' | 'LEFT' | 'RIGHT' | 'REPORT';
