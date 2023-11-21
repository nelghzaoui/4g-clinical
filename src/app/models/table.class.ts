import { Location } from './location.class';
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

  private findTableItem(x: number, y: number): TableItem {
    const item = this.tableItems
      .flat()
      .find((item) => item.x === x && item.y === y);

    if (!item) {
      throw new Error('Table item not found');
    }

    return item;
  }

  updateTableItem(x: number, y: number, isActive: boolean): TableItem[][] {
    const item: TableItem = this.findTableItem(x, y);
    item.setActive(isActive);

    // Update the item in the array
    return this.tableItems;
    // this.tableItemsSubject$.next(this.table.tableItems);
  }

  hasLocation(location: Location): boolean {
    return this.isOffGrid(location.x, location.y);
  }

  isMoveForbidden(x: number, y: number): boolean {
    if (this.isOffGrid(x, y) && this.isOnCorner(x, y)) {
      return true;
    }
    return false;
  }

  private isOffGrid(x: number, y: number): boolean {
    return x < this.zero || x > this.width || y < this.zero || y > this.height;
  }

  private isOnCorner(x: number, y: number) {
    return (
      (x === this.zero || x === this.width - 1) &&
      (y === this.zero || y === this.height - 1)
    );
  }
}
