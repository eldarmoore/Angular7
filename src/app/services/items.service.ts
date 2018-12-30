import { Item } from '../models/item.model';

export class Items {
  items: Item[] = [];

  constructor() {
    this.items.push(new Item('Hatchet', 3, 6, 1, 0, 0, 0, 0, 0));
    this.items.push(new Item('Sword', 2, 4, 1, 0, 0, 0, 0, 0));
    this.items.push(new Item('Pike', 4, 8, 1, 0, 0, 0, 0, 0));
  }
}
