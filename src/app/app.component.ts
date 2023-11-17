import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  private width = 5;
  private height = 5;

  table: Array<Location> = [];

  ngOnInit(): void {
    this.initialize();
  }

  initialize() {
    for (let row = 0; row < this.height; row++) {
      for (let colum = 0; colum < this.width; colum++) {
        this.table.push({ row, colum });
      }
    }

    console.log(this.table.length);

    console.log(this.table);
  }
}

export interface Location {
  row: number;
  colum: number;
}
