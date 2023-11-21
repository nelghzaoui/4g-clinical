import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { TableService } from '../../services/table/table.service';
import { Observable } from 'rxjs';
import { TableItem } from '../../models/table-item.class';

@Component({
  selector: 'table-component',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent implements OnInit {
  tableItems$: Observable<TableItem[][]> = this.tableService.tableItems$;

  constructor(private readonly tableService: TableService) {}

  ngOnInit(): void {
    this.tableService.initialize();
  }
}
