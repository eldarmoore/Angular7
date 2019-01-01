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
  public player2: CharacterModel = new CharacterModel('Enemy', 22, 14, 0, 800, 800, 0, 0, 0, 4);
  public status: string;
  public player1CritTrigger: boolean;
  public player2CritTrigger: boolean;
  public combatlog = [];
  displayItem: Item[];
  items: Item[] = new Items().items;

  public player1_minAttack = 0;
  public player1_maxAttack = 0;
  public player1_criticalStrike = 0;
  public player1_critMultiplier = 0;
  public player1_health = 0;
  public player1_currentHealth = 0;

  constructor() {
    console.log(this.combatlog.length);
    this.weaponSelected = 'Sword';
  }

  getItem(name) {
    const obj: Item[] = this.items.filter(function(node) {
      return node.name === name;
    });
    return obj;
  }

  ngOnInit() {
  }

  resetStats() {
    this.player1_currentHealth = this.player1.health + this.getItem(this.weaponSelected)[0].health;
    this.player2.currentHealth = this.player2.health;
    this.combatlog = [];
    this.status = '';
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

    if (this.combatlog.length > 0) {

      if (this.player1_health && this.player2.currentHealth > 0) {

        // Generate random number between min - max
        // Math.floor(Math.random() * (max - min + 1)) + min
        const friendlyAttackBasic = Math.floor(Math.random() * (this.player1_maxAttack - this.player1_minAttack) + 1) + this.player1_minAttack;

        // Critical strike chance
        const friendlyAttack = this.critChance(this.player1_criticalStrike, friendlyAttackBasic, this.player1_critMultiplier);
        console.log(this.player1_criticalStrike);
        console.log(this.player1CritTrigger);
        if (friendlyAttack !== friendlyAttackBasic) {
          this.player1CritTrigger = true;
        } else {
          this.player1CritTrigger = false;
        }

        if (friendlyAttack >= 0) {
          this.player1FilteredAttack = this.blockChance(this.player2.blockChance, this.armorMitigation(friendlyAttack, this.player2.armor), this.player2.block);
          if (this.player2.currentHealth - this.player1FilteredAttack > 0) {
            this.player2.currentHealth -= this.player1FilteredAttack;
          } else {
            this.player2.currentHealth = 0;
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
          this.player2CritTrigger = true;
          console.log(enemyAttackBasic);
          console.log(enemyAttack);
          console.log(this.player1CritTrigger);
        } else {
          this.player1CritTrigger = false;
        }
        if (enemyAttack >= 0) {
          this.player2FilteredAttack = this.blockChance(this.player1.blockChance, this.armorMitigation(enemyAttack, this.player1.armor), this.player1.armor);
          if (this.player1_currentHealth - this.player2FilteredAttack > 0) {
            this.player1_currentHealth -= this.player2FilteredAttack;
          } else {
            this.player1_currentHealth = 0;
            this.status = 'Enemy player has WON!';
          }
        } else {
          console.log('Player2 attack is null');
        }

        const log = 'You ' + this.playerCritTest(this.player1CritTrigger) + ' your target for ' + this.player1FilteredAttack.toString() + ' damage and get ' + this.playerCritTest(this.player2CritTrigger) + ' by ' + this.player2FilteredAttack.toString() + ' damage.';
        this.combatlog.push(log);
      }
    } else {
      this.player1_minAttack = this.player1.minAttack + this.getItem(this.weaponSelected)[0].minAttack;
      this.player1_maxAttack = this.player1.maxAttack + this.getItem(this.weaponSelected)[0].maxAttack;
      this.player1_criticalStrike = this.player1.criticalStrike + this.getItem(this.weaponSelected)[0].criticalStrike;
      this.player1_critMultiplier = this.player1.critMultiplier + this.getItem(this.weaponSelected)[0].critMultiplier;
      this.player1_health = this.player1.health + this.getItem(this.weaponSelected)[0].health;
      this.player1_currentHealth = this.player1.health + this.getItem(this.weaponSelected)[0].health;

      this.combatlog.push('Fight Started!');
    }

  }
}
