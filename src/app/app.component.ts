import {Component, OnInit} from '@angular/core';
import {CharacterModel} from './models/character.model';
import {Items} from './services/items.service';
import {Item} from './models/item.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public weaponSelected: string;
  public armorSelected: string;
  public player1FilteredAttack: number;
  public player2FilteredAttack: number;
  public player1: CharacterModel = new CharacterModel('Friendly', 2, 1, 0, 200, 200, 0, 0, 0, 4);
  public player2: CharacterModel = new CharacterModel('Enemy', 2, 1, 0, 200, 200, 0, 0, 0, 4);
  public status: string;
  public player1Crit: boolean;
  public player2Crit: boolean;
  friendlyCombatLog = [];
  enemyCombatLog = [];
  public chatlog = [];
  displayItem: Item[];
  items: Item[] = new Items().items;

  constructor() {
    this.weaponSelected = 'Sword';
    console.log();
  }

  ngOnInit() {
  }

  resetStats() {
    this.player1.currentHealth = this.player1.health;
    this.player2.currentHealth = this.player2.health;
    this.chatlog = [];
    this.status = '';
  }

  getItem(name) {
    const obj: Item[] = this.items.filter(function(node) {
      return node.name === name;
    });
    return obj;
    // this.displayItem = obj;
  }


  public playerCritTest(crit) {
    if (crit === true) {
      return '*critically hit*';
    } else {
      return 'hit';
    }
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

    if (this.player1.currentHealth && this.player2.currentHealth > 0) {

      // Generate random number between min - max
      // Math.floor(Math.random() * (max - min + 1)) + min
      const friendlyAttackBasic = Math.floor(Math.random() * ((this.player1.maxAttack + this.getItem(this.weaponSelected)[0].maxAttack) - (this.player1.minAttack + this.getItem(this.weaponSelected)[0].minAttack) + 1)) + (this.player1.minAttack + this.getItem(this.weaponSelected)[0].minAttack);

      // Critical strike chance
      const friendlyAttack = this.critChance((this.player1.criticalStrike + this.getItem(this.weaponSelected)[0].criticalStrike), friendlyAttackBasic, this.player1.critMultiplier);

      if (friendlyAttack !== friendlyAttackBasic) {
        this.player1Crit = true;
      } else {
        this.player1Crit = false;
      }

      if (friendlyAttack >= 0) {
        this.player1FilteredAttack = this.blockChance(this.player2.blockChance, this.armorMitigation(friendlyAttack, this.player2.armor), this.player2.block);
        if (this.player2.currentHealth - this.player1FilteredAttack > 0) {
          this.player2.currentHealth -= this.player1FilteredAttack;
          this.friendlyCombatLog.push(this.player1FilteredAttack);
        } else {
          this.player2.currentHealth = 0;
          this.friendlyCombatLog.push(this.player1FilteredAttack);
          this.status = 'Friendly player has WON!';
        }
      } else {
        console.log('Player1 attack is null');
      }

      // Generate random number between min - max
      // Math.floor(Math.random() * (max - min + 1)) + min
      const enemyAttackBasic = Math.floor(Math.random() * (this.player2.maxAttack - this.player2.minAttack + 1)) + this.player2.minAttack;

      // Critical strike chance
      const enemyAttack = this.critChance(this.player2.criticalStrike, enemyAttackBasic, this.player2.critMultiplier);
      if (enemyAttack !== enemyAttackBasic) {
        this.player2Crit = true;
        console.log(enemyAttackBasic);
        console.log(enemyAttack);
        console.log(this.player2Crit);
      } else {
        this.player2Crit = false;
      }
      if (enemyAttack >= 0) {
        this.player2FilteredAttack = this.blockChance(this.player1.blockChance, this.armorMitigation(enemyAttack, this.player1.armor), this.player1.armor);
        if (this.player1.currentHealth - this.player2FilteredAttack > 0) {
          this.player1.currentHealth -= this.player2FilteredAttack;
          this.enemyCombatLog.push(this.player2FilteredAttack);
        } else {
          this.player1.currentHealth = 0;
          this.enemyCombatLog.push(this.player2FilteredAttack);
          this.status = 'Enemy player has WON!';
        }
      } else {
        console.log('Player2 attack is null');
      }

      const log = 'You ' + this.playerCritTest(this.player1Crit) + ' your target for ' + this.player1FilteredAttack.toString() + ' damage and get ' + this.playerCritTest(this.player2Crit) + ' by ' + this.player2FilteredAttack.toString() + ' damage.';
      this.chatlog.push(log);
    }
  }
}
