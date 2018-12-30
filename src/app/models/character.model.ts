export class CharacterModel {
  constructor(
    public name: string,
    public maxAttack: number,
    public minAttack: number,
    public criticalStrike: number,
    public health: number,
    public currentHealth: number,
    public armor: number,
    public blockChance: number,
    public block: number,
    public critMultiplier?: number,
    public healthPercentage?: number,
  ) { }
}
