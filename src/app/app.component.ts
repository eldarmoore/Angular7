import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  friendlyMaxAttack = 156;
  friendlyMinAttack = 124;
  friendlyHealth = 2000;
  friendlyCurrentHealth: number;
  friendlyHealthPercentage: number;
  enemyMaxAttack = 120;
  enemyMinAttack = 105;
  enemyHealth = 2000;
  enemyCurrentHealth: number;
  enemyHealthPercentage: number ;
  status: string;
  friendlyCombatLog = [];
  enemyCombatLog = [];

  resetStats() {
    this.friendlyCurrentHealth = this.friendlyHealth;
    this.enemyCurrentHealth = this.enemyHealth;
    this.friendlyCombatLog = [];
    this.enemyCombatLog = [];
  }

  public prstHealth(health, currentHealth) {
    if (health > 0 && currentHealth > 0) {
      return currentHealth / (health / 100);
    } else {
      return 0;
    }
  }

  onFight() {
    if (this.friendlyCurrentHealth && this.enemyCurrentHealth > 0) {

      // Generate random number between min - max
      // Math.floor(Math.random() * (max - min + 1)) + min
      const friendlyAttack = Math.floor(Math.random() * (this.friendlyMaxAttack - this.friendlyMinAttack + 1)) + this.friendlyMinAttack;
      if (this.enemyCurrentHealth - friendlyAttack > 0) {
        this.enemyCurrentHealth -= friendlyAttack;
        this.friendlyCombatLog.push(friendlyAttack);
      } else {
        this.enemyCurrentHealth = 0;
        this.status = 'Friendly player has WON!';
      }

      // Generate random number between min - max
      // Math.floor(Math.random() * (max - min + 1)) + min
      const enemyAttack = Math.floor(Math.random() * (this.enemyMaxAttack - this.enemyMinAttack + 1)) + this.enemyMinAttack;
      if (this.friendlyCurrentHealth - enemyAttack > 0) {
        this.friendlyCurrentHealth -= enemyAttack;
        this.enemyCombatLog.push(enemyAttack);
      } else {
        this.friendlyCurrentHealth = 0;
        this.status = 'Enemy player has WON!';
      }
    }
  }
}
