import { ChangeDetectionStrategy, Component } from '@angular/core';
import { GameService } from './services/game/game.service';

@Component({
  selector: 'app-root',
  template: `
    <h1 style="text-align: center">Mars robot game</h1>

    <table-component></table-component>

    <command-component></command-component>

    <button (click)="reset()">Reset</button>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  constructor(private readonly gameService: GameService) {}

  reset() {
    this.gameService.reset();
  }
}
