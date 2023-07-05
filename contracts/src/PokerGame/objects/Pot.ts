import {
  Struct,
  Poseidon,
  Field,
  Character,
  Int64,
  Bool,
  UInt32,
  PublicKey,
} from 'snarkyjs';
import { Player } from './Player';

export class Pot extends Struct({
  amount: UInt32,
  eligiblePlayers: [Player],
  winners: [Player],
}) {
  hash(): Field {
    return Poseidon.hash([
      Character.fromString(this.amount.toString()).toField(),
    ]);
  }

  clone(): Pot {
    let players = this.eligiblePlayers.map((player) => player.clone());
    let winners = this.winners.map((winner) => winner.clone());
    let potClone = new Pot({
      amount: UInt32.from(0),
      eligiblePlayers: [],
      winners: [],
    });
    potClone.amount = UInt32.from(this.amount.toString());
    potClone.eligiblePlayers = players;
    potClone.winners = winners;
    return potClone;
  }

  increasePotSize(increase: number) {
    this.amount = this.amount.add(increase);
  }

  toJson(): string {
    return JSON.stringify({
      amount: this.amount.toString(),
      eligiblePlayers: this.eligiblePlayers
        .map((player) => player.toJson())
        .toString(),
      winners: this.winners.map((winner) => winner.toJson()).toString(),
    });
  }
}

export enum BettingRound {
  PRE_FLOP = 'pre-flop',
  FLOP = 'flop',
  TURN = 'turn',
  RIVER = 'river',
}
