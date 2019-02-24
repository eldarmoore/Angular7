import { Weapon } from '../models/Weapon';

export class Items {
  weapons: Weapon[] = [];

  constructor() {
    this.weapons.push(new Weapon('Hatchet', 3, 6, 0, 0, 0, 0, 0, 1));
    this.weapons.push(new Weapon('Sword', 2, 4, 0, 0, 0, 0, 0, 1));
    this.weapons.push(new Weapon('Pike', 4, 8, 0, 0, 0, 0, 0, 1));
    this.weapons.push(new Weapon('Axe', 8, 16, 0, 0, 0, 0, 0, 1));
    this.weapons.push(new Weapon('Gladius', 24, 48, 12, 20, 0, 0, 0, 1));
    this.weapons.push(new Weapon('Excalibur', 124, 188, 22, 128, 0, 0, 0, 1));
  }
}
