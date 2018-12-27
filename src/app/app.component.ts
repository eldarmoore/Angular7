import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  friendlyMaxAttack = 166;
  friendlyMinAttack = 110;
  friendlyCrit = 10;
  friendlyHealth = 3980;
  friendlyArmor = 24;
  friendlyCurrentHealth: number;
  friendlyHealthPercentage: number;
  friendlyCritMultiplier = 4;
  enemyMaxAttack = 166;
  enemyMinAttack = 110;
  enemyCrit = 10;
  enemyHealth = 3980;
  enemyArmor = 34;
  enemyCurrentHealth: number;
  enemyHealthPercentage: number ;
  enemyCritMultiplier = 4;
  status: string;
  friendlyCombatLog = [];
  enemyCombatLog = [];
  CombatLog = [
    ['friendly'],
    ['enemy']
  ];

  resetStats() {
    this.friendlyCurrentHealth = this.friendlyHealth;
    this.enemyCurrentHealth = this.enemyHealth;
    this.friendlyCombatLog = [];
    this.enemyCombatLog = [];
    this.status = '';
  }

  public prstHealth(health, currentHealth) {
    if (health > 0 && currentHealth > 0) {
      return currentHealth / (health / 100);
    } else {
      return 0;
    }
  }

  progressBar(value) {
    if (value > 60) {
      return 'progress-bar-success';
    } else if (value > 40) {
      return 'progress-bar-warning';
    } else {
      return 'progress-bar-danger';
    }
  }

  critChance(chance, damage, critMultiplier) {
    if (Math.random() * 100 < chance) {
      return damage * critMultiplier;
    } else {
      return damage;
    }
  }

  armorMitigation(armor) {
    return armor / 100;
  }

  onFight() {

    if (this.friendlyCurrentHealth && this.enemyCurrentHealth > 0) {

      // Generate random number between min - max
      // Math.floor(Math.random() * (max - min + 1)) + min
      let friendlyAttack = Math.floor(Math.random() * (this.friendlyMaxAttack - this.friendlyMinAttack + 1)) + this.friendlyMinAttack;

      // Critical strike chance
      friendlyAttack = this.critChance(this.friendlyCrit, friendlyAttack, this.friendlyCritMultiplier);
      if (this.enemyCurrentHealth - friendlyAttack > 0) {
        this.enemyCurrentHealth -= friendlyAttack;
        this.friendlyCombatLog.push(friendlyAttack);
      } else {
        this.enemyCurrentHealth = 0;
        this.friendlyCombatLog.push(friendlyAttack);
        this.status = 'Friendly player has WON!';
      }

      // Generate random number between min - max
      // Math.floor(Math.random() * (max - min + 1)) + min
      let enemyAttack = Math.floor(Math.random() * (this.enemyMaxAttack - this.enemyMinAttack + 1)) + this.enemyMinAttack;

      // Critical strike chance
      enemyAttack = this.critChance(this.enemyCrit, enemyAttack, this.enemyCritMultiplier);
      if (this.friendlyCurrentHealth - enemyAttack > 0) {
        this.friendlyCurrentHealth -= enemyAttack;
        this.enemyCombatLog.push(enemyAttack);
        // this.CombatLog['enemy'].push(enemyAttack);
      } else {
        this.friendlyCurrentHealth = 0;
        this.enemyCombatLog.push(enemyAttack);
        this.status = 'Enemy player has WON!';
      }
    }
  }
}
