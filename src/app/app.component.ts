import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  friendlyMaxAttack = 24;
  friendlyMinAttack = 16;
  friendlyCrit = 10;
  friendlyHealth = 300;
  friendlyArmor = 286;
  friendlyBlockChance = 33;
  friendlyBlock = 96;
  friendlyCurrentHealth: number;
  friendlyHealthPercentage: number;
  friendlyCritMultiplier = 4;
  friendlyFilteredAttack: number;
  enemyMaxAttack = 14;
  enemyMinAttack = 8;
  enemyCrit = 10;
  enemyHealth = 300;
  enemyArmor = 96;
  enemyBlockChance = 10;
  enemyBlock = 30;
  enemyCurrentHealth: number;
  enemyHealthPercentage: number;
  enemyCritMultiplier = 4;
  enemyFilteredAttack: number;
  status: string;
  friendlyCombatLog = [];
  enemyCombatLog = [];
  combatLog: number[][] = new Array<number[]>();

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
    } else if (value > 20) {
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

  blockChance(chance, damage, blockValue) {
    if (Math.random() * 100 < chance) {
      if (damage < blockValue) {
        return 0;
      } else {
        return damage - blockValue;
      }
    } else {
      return damage;
    }
  }

  armorMitigation(damage, armor) {
    return Math.round((1 - (armor / 1000)) * damage);
  }

  onFight() {
    if (this.friendlyCurrentHealth && this.enemyCurrentHealth > 0) {

      // Generate random number between min - max
      // Math.floor(Math.random() * (max - min + 1)) + min
      let friendlyAttack = Math.floor(Math.random() * (this.friendlyMaxAttack - this.friendlyMinAttack + 1)) + this.friendlyMinAttack;

      // Critical strike chance
      friendlyAttack = this.critChance(this.friendlyCrit, friendlyAttack, this.friendlyCritMultiplier);
      if (this.enemyCurrentHealth - friendlyAttack > 0) {
        this.friendlyFilteredAttack = this.blockChance(this.enemyBlockChance, this.armorMitigation(friendlyAttack, this.enemyArmor), this.enemyBlock);
        console.log('Friendly Attack: ' + friendlyAttack + ' after mitigation ' + this.friendlyFilteredAttack);
        this.enemyCurrentHealth -= this.friendlyFilteredAttack;
        this.friendlyCombatLog.push(this.friendlyFilteredAttack);
      } else {
        this.enemyCurrentHealth = 0;
        this.friendlyCombatLog.push(this.friendlyFilteredAttack);
        this.status = 'Friendly player has WON!';
      }

      // Generate random number between min - max
      // Math.floor(Math.random() * (max - min + 1)) + min
      let enemyAttack = Math.floor(Math.random() * (this.enemyMaxAttack - this.enemyMinAttack + 1)) + this.enemyMinAttack;

      // Critical strike chance
      enemyAttack = this.critChance(this.enemyCrit, enemyAttack, this.enemyCritMultiplier);
      if (this.friendlyCurrentHealth - enemyAttack > 0) {
        this.enemyFilteredAttack = this.blockChance(this.friendlyBlockChance, this.armorMitigation(enemyAttack, this.friendlyArmor), this.friendlyBlock);
        console.log('Enemy Attack: ' + enemyAttack + ' after mitigation ' + this.enemyFilteredAttack);
        this.friendlyCurrentHealth -= this.enemyFilteredAttack;
        this.enemyCombatLog.push(this.enemyFilteredAttack);
      } else {
        this.friendlyCurrentHealth = 0;
        this.enemyCombatLog.push(this.enemyFilteredAttack);
        this.status = 'Enemy player has WON!';
      }
    }
  }
}
