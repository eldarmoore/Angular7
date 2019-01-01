import { Item } from '../models/item.model';

export class Items {
  items: Item[] = [];

  constructor() {
    this.items.push(new Item('Hatchet', 3, 6, 0, 0, 0, 0, 0, 1));
    this.items.push(new Item('Sword', 2, 4, 0, 0, 0, 0, 0, 1));
    this.items.push(new Item('Pike', 4, 8, 0, 0, 0, 0, 0, 1));
    this.items.push(new Item('Axe', 8, 16, 0, 0, 0, 0, 0, 1));
    this.items.push(new Item('Gladius', 24, 48, 12, 20, 0, 0, 0, 1));
    this.items.push(new Item('Excalibur', 124, 188, 22, 128, 0, 0, 0, 1));
    this.items.push(new Item('Dress', 24, 48, 12, 20, 0, 0, 0, 2));
    this.items.push(new Item('Cloths', 24, 48, 12, 20, 0, 0, 0, 2));
    this.items.push(new Item('Leather', 24, 48, 12, 20, 0, 0, 0, 2));
  }
}
