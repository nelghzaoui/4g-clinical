import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { TableService } from '../../services/table.service';

@Component({
  selector: 'table-component',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent implements OnInit {
  table$ = this.tableService.table$;

  constructor(private readonly tableService: TableService) {}

  ngOnInit(): void {
    this.tableService.initialize();
  }
}
