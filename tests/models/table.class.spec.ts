import { Table } from '../../src/app/models/table.class';
import { TableItem } from '../../src/app/models/table-item.class';

describe('Table', () => {
  let table: Table;

  beforeEach(() => {
    table = new Table(5, 5);
  });

  it('should create a new Robot instance', () => {
    expect(table).toBeInstanceOf(Table);
  });

  describe('initialize', () => {
    it('should initialize a table with items', () => {
      // act
      table.initialize();
      // arrange
      expect(table.tableItems.length).toBe(5);
      expect(table.tableItems[0].length).toBe(5);
      expect(table.tableItems.every((row) => row.every((item) => item instanceof TableItem))).toBe(
        true
      );
    });

    it('should initialize a table with the correct coordinates', () => {
      // act
      table.initialize();
      // arrange
      expect(table.tableItems[0][0].x).toBe(0);
      expect(table.tableItems[0][0].y).toBe(4);
      expect(table.tableItems[4][4].x).toBe(4);
      expect(table.tableItems[4][4].y).toBe(0);
    });

    it('should set the origin at the bottom left', () => {
      // act
      table.initialize();
      // arrange
      expect(table.tableItems[4][0].x).toBe(0);
      expect(table.tableItems[4][0].y).toBe(0);
    });

    it('should check if every item is inactive', () => {
      // act
      table.initialize();
      // arrange
      expect(table.tableItems.every((row) => row.every((item) => item.isActive === false))).toBe(
        true
      );
    });
  });

  beforeEach(() => {
    table.initialize();
  });

  describe('updateTableItem', () => {
    it('should update the table item', () => {
      // arrange
      const x = 0;
      const y = 0;
      const isActive = true;
      const updatedItem = table['findTableItem'](x, y);
      // act
      const tableItems = table.updateTableItem(x, y, isActive);
      // assert
      expect(updatedItem.isActive).toBe(isActive);
      expect(tableItems).toStrictEqual(table.tableItems);
    });
  });

  describe('isOffTable', () => {
    it('should return true if the location is off the grid', () => {
      // arrange
      const x = -1;
      const y = -1;
      // act
      const result = table.isOffTable(x, y);
      // assert
      expect(result).toBe(true);
    });

    it('should return false if the location is on the grid', () => {
      // arrange
      const x = 0;
      const y = 0;
      // act
      const result = table.isOffTable(x, y);
      // assert
      expect(result).toBe(false);
    });
  });

  /* Private methods */
  describe('findTableItem', () => {
    it('should throw an error if the table item is not found', () => {
      // arrange
      const x = 10;
      const y = 10;
      // assert
      expect(() => table['findTableItem'](x, y)).toThrow('Table item not found');
    });

    it('should return a table item', () => {
      // arrange
      const x = 0;
      const y = 0;
      // act
      const item = table['findTableItem'](x, y);
      // assert
      expect(item instanceof TableItem).toBe(true);
    });
  });
});
