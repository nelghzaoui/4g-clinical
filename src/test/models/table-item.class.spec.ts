import { TableItem } from '../../app/models/table-item.class';

describe('TableItem', () => {
  let tableItem: TableItem;

  beforeEach(() => {
    tableItem = new TableItem(1, 2, true);
  });

  it('should create a new TableItem instance', () => {
    expect(tableItem).toBeInstanceOf(TableItem);
  });

  it('should set isActive property correctly', () => {
    expect(tableItem.isActive).toBe(true);
    tableItem.setActive(false);
    expect(tableItem.isActive).toBe(false);
  });

  it('should override toString method', () => {
    expect(tableItem.toString()).toBe(`Current location: ${tableItem.x},${tableItem.y}`);
  });
});
