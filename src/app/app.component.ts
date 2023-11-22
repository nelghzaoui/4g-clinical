import { ChangeDetectionStrategy, Component } from '@angular/core';
import { GameService } from './services/game/game.service';

@Component({
  selector: 'app-root',
  template: `
    <div class="container">
      <div class="title">
        <h1 style="text-align: center">Mars robot game</h1>
        <button mat-fab color="primary">
          <mat-icon fontIcon="refresh"></mat-icon>
        </button>
      </div>

      <table-component></table-component>

      <command-component></command-component>
    </div>
  `,
  styles: [
    `
      :host {
        div.container {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          max-width: 800px;
          margin: 0 auto;
        }

        div.title {
          display: flex;
          justify-content: space-evenly;
          align-items: center;
          margin: 1rem;

          h1 {
            margin: 0;
          }
        }
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  constructor(private readonly gameService: GameService) {}

  reset() {
    this.gameService.reset();
  }
}
