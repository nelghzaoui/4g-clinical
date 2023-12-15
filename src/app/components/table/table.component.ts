import { AfterViewInit, ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { TableService } from '../../services/table/table.service';
import { Observable } from 'rxjs';
import { TableItem } from '../../models/table-item.class';
import { Direction } from '../../models/direction.type';
import { GameService } from '../../services/game/game.service';

@Component({
  selector: 'table-component',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent implements OnInit, AfterViewInit {
  tableItems$: Observable<TableItem[][]> = this.tableService.tableItems$;

  constructor(private readonly tableService: TableService, readonly gameService: GameService) {}

  ngOnInit(): void {
    this.tableService.initialize();
  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
  }
}
