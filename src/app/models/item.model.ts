export class Item {

  constructor(
    public name: string,
    public minAttack: number,
    public maxAttack: number,
    public criticalStrike: number,
    public health: number,
    public armor: number,
    public blockChance: number,
    public block: number,
    public itemType: number,
    public critMultiplier?: number,
  ) {}
}
