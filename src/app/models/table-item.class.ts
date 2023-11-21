import { Location } from './location.class';

export class TableItem extends Location {
  constructor(x: number, y: number, public isActive: boolean) {
    super(x, y);
  }

  override toString() {
    return `Current location: ${this.x},${this.y}`;
  }
}
