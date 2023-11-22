import { Injectable } from '@angular/core';
import { TableService } from './table.service';

@Injectable()
export class MockTableService extends TableService {
  override isOffTable() {
    return false;
  }
  override updateTableItem() {}
  override simulateMovement() {}
  override reset() {}
}
