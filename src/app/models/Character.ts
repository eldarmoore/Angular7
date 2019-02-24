export class Character {
  constructor(
    public name: string,
    public maxAttack: number,
    public minAttack: number,
    public criticalStrikeChance: number,
    public health: number,
    public currentHealth: number,
    public armor: number,
    public blockChance: number,
    public block: number,
    public healthPercentage: number,
    public critMultiplier: number
  ) {}
}
