import { TestBed } from '@angular/core/testing';
import { TableService } from './table.service';
import { Location } from '../../models/location.class';

describe('TableService', () => {
  let service: TableService;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [TableService] });
    service = TestBed.inject(TableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize table', () => {
    service.initialize();
    // Assert that tableItems$ is initialized with tableItems
    service.tableItems$.subscribe((tableItems) => {
      expect(tableItems).toEqual(service['table'].tableItems);
    });
  });

  it('should check if move is forbidden', () => {
    jest.spyOn(service['table'], 'isOffTable');

    service.isOffTable(0, 0);

    expect(service['table'].isOffTable).toHaveBeenCalledWith(0, 0);
  });

  it('should simulate movement', () => {
    const currentPos: Location = { x: 0, y: 0 };
    const nextPos: Location = { x: 1, y: 1 };
    jest.spyOn(service, 'updateTableItem');

    service.simulateMovement(currentPos, nextPos);

    expect(service['updateTableItem']).toHaveBeenCalledWith(currentPos.x, currentPos.y, false);
    expect(service['updateTableItem']).toHaveBeenCalledWith(nextPos.x, nextPos.y, true);
  });

  it('should update table item', () => {
    const x = 0;
    const y = 0;
    const isActive = true;
    jest.spyOn(service['table'], 'updateTableItem');

    service.updateTableItem(x, y, isActive);

    expect(service['table'].updateTableItem).toHaveBeenCalledWith(x, y, isActive);
    service.tableItems$.subscribe((tableItems) => {
      expect(tableItems).toStrictEqual(service['table'].tableItems);
    });
  });

  it('should reset table', () => {
    jest.spyOn(service['table'], 'initialize');

    service.reset();

    expect(service['table'].initialize).toHaveBeenCalled();
    service.tableItems$.subscribe((tableItems) => {
      expect(tableItems).toStrictEqual(service['table'].tableItems);
    });
  });
});
