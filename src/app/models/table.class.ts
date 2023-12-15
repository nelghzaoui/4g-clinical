import { TableItem } from './table-item.class';

export class Table {
  private readonly zero: number = 0;
  tableItems: TableItem[][] = [];

  constructor(private readonly width: number, private readonly height: number) {
    this.initialize();
  }

  initialize(): void {
    for (let r = 0; r < this.height; r++) {
      this.tableItems[r] = [];
      for (let c = 0; c < this.width; c++) {
        // Set the origin at the bottom left corner
        this.tableItems[r][c] = new TableItem(c, this.height - 1 - r, false);
      }
    }
  }

  updateTableItem(x: number, y: number, isActive: boolean): TableItem[][] {
    const item: TableItem = this.findTableItem(x, y);
    item.setActive(isActive);

    return this.tableItems;
  }

  isOffTable(x: number, y: number): boolean {
    return x < this.zero || x >= this.width || y < this.zero || y >= this.height;
  }

  private findTableItem(x: number, y: number): TableItem {
    for (const row of this.tableItems) {
      for (const item of row) {
        if (item.x === x && item.y === y) {
          return item;
        }
      }
    }

    throw new Error('Table item not found');
  }
}
