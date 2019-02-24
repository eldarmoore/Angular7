import {Component, OnInit} from '@angular/core';
import {Character} from './models/Character';
import {Items} from './services/items.service';
import {Weapon} from './models/Weapon';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public weaponSelected: string;
  public armorSelected: string;
  public player1CurrentAttack: number;
  public player2CurrentAttack: number;
  public player1: Character = new Character('Friendly', 12, 8, 25, 200, 200, 240, 40, 80, 0, 3.5);
  public player2: Character = new Character('Enemy', 18, 10, 1, 300, 300, 0, 0, 0, 0, 3.5);
  public status: string;
  public combatlog = [];
  public items: Items = new Items();

  constructor() {
    this.weaponSelected = 'Sword';
    console.log(this.items.weapons);
  }

  ngOnInit() {
  }

  resetStats() {
    this.player1.currentHealth = this.player1.health;
    this.player2.currentHealth = this.player2.health;
    this.combatlog = [];
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
      return false;
    }
  }

  playerCritTest(crit) {
    if (crit > 0) {
      return '*critically hit*';
    } else {
      return 'hit';
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

  // Generate random number between min - max
  randomAttack(minAttack, maxAttack) {
    // Math.floor(Math.random() * (max - min + 1)) + min
    return Math.floor(Math.random() * (maxAttack - minAttack) + 1) + minAttack;
  }

  returnHelthStatus(attacker, defenderHealth) {
    if (attacker >= 0) {
      if (defenderHealth - attacker > 0) {
        defenderHealth -= attacker;
        return defenderHealth;
      } else {
        defenderHealth = 0;
        return defenderHealth;
      }
    } else {
      console.log('Player1 attack is null');
    }
  }

  onFight() {

    if (this.combatlog.length > 0) {

      if (this.player1.currentHealth && this.player2.currentHealth > 0) {

        // Get Random Value
        this.player1CurrentAttack = this.randomAttack(this.player1.minAttack, this.player1.maxAttack);
        this.player2CurrentAttack = this.randomAttack(this.player2.minAttack, this.player2.maxAttack);

        // Critical strike chance
        const ifCritPlayer1 = this.critChance(this.player1.criticalStrikeChance, this.player1CurrentAttack, this.player1.critMultiplier);
        const ifCritPlayer2 = this.critChance(this.player2.criticalStrikeChance, this.player2CurrentAttack, this.player2.critMultiplier);

        console.log(ifCritPlayer1);

        if (ifCritPlayer1) {
          this.player1CurrentAttack = ifCritPlayer1;
        }
        if (ifCritPlayer2) {
          this.player2CurrentAttack = ifCritPlayer2;
        }

        // Attack after block and armor
        this.player1CurrentAttack = this.blockChance(this.player2.blockChance, this.armorMitigation(this.player1CurrentAttack, this.player2.armor), this.player2.block);
        this.player2CurrentAttack = this.blockChance(this.player1.blockChance, this.armorMitigation(this.player2CurrentAttack, this.player1.armor), this.player1.block);

        // Player1 turn
        this.player2.currentHealth = this.returnHelthStatus(this.player1CurrentAttack, this.player2.currentHealth);

        // Player2 turn
        this.player1.currentHealth = this.returnHelthStatus(this.player2CurrentAttack, this.player1.currentHealth);

        const log = this.player1.name + ' ' + this.playerCritTest(ifCritPlayer1) +  ' ' + this.player2.name + ' for ' + this.player1CurrentAttack.toString() + ' damage and get ' + this.playerCritTest(ifCritPlayer2) + ' by ' + this.player2CurrentAttack.toString() + ' damage.';
        this.combatlog.push(log);

        if (!this.player1.currentHealth && !this.player2.currentHealth) {
          this.combatlog.push('Match is even!');
        } else if (!this.player1.currentHealth) {
          this.combatlog.push(this.player2.name + ' has Won the Fight!');
        } else if (!this.player2.currentHealth) {
          this.combatlog.push(this.player1.name + ' has Won the Fight!');
        }
      }
    } else {
      this.combatlog.push('Fight Started!');
    }

  }
}
