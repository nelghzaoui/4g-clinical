import { TestBed } from '@angular/core/testing';
import { TableService } from './table.service';
import { TableItem } from '../models/table-item.class';

describe('TableService', () => {
  let service: TableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('initialize', () => {
    it('should initialize the table with dimension 5 x 5', () => {
      // act
      service.initialize();
      // assert
      service.tableItems$.subscribe((tableItems) => {
        expect(tableItems.length).toEqual(5);
        expect(tableItems[0].length).toEqual(5);
      });
    });

    it('should set the origin at the bottom left corner', () => {
      // arrange
      const expectValue: TableItem = new TableItem(0, 0, false);
      // act
      service.initialize();
      // assert
      service.tableItems$.subscribe((tableItems) => {
        console.log(tableItems[0][4], expectValue);
        expect(tableItems[0][4]).toStrictEqual(expectValue);
      });
    });
  });

  beforeEach(() => {
    service.initialize();
  });

  describe('setActiveTableItem', () => {
    it('should set the active table item at the specified coordinates', () => {
      testUpdateTableItem(2, 3, true);
    });
  });

  describe('resetActiveTableItem', () => {
    it('should reset the active table item at the specified coordinates', () => {
      testUpdateTableItem(2, 3, false);
    });
  });

  describe('findTableItem', () => {
    it('should return the table item at the specified coordinates', () => {
      testFindTableItem(2, 3, false);
    });

    it('should throw an error if the table item is not found', () => {
      testFindTableItem(-1, 0, true);
    });
  });

  function testFindTableItem(x: number, y: number, shouldThrow: boolean) {
    // arrange
    const expectValue: TableItem = new TableItem(x, y, false);
    // act
    const result = () => service['findTableItem'](x, y);
    // assert
    if (shouldThrow) {
      expect(result).toThrowErrorMatchingSnapshot('Table item not found');
    } else {
      expect(result()).toStrictEqual(expectValue);
    }
  }

  describe('updateTableItem', () => {
    it('should update the table item at the specified coordinates', () => {
      // arrange
      const x = 2;
      const y = 3;
      const expectValue: TableItem = new TableItem(x, y, true);
      // act
      service['updateTableItem'](x, y, true);
      // assert
      service.tableItems$.subscribe((tableItems) => {
        expect(tableItems[x][y]).toEqual(expectValue);
      });
    });
  });

  function testUpdateTableItem(x: number, y: number, isActive: boolean) {
    // arrange
    const expectValue: TableItem = new TableItem(x, y, isActive);
    // act
    service['updateTableItem'](x, y, isActive);
    // assert
    service.tableItems$.subscribe((tableItems) => {
      expect(tableItems[x][y]).toEqual(expectValue);
    });
  }
});
