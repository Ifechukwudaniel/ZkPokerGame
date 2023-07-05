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
    let playersHash = this.eligiblePlayers.map((player) => player.hash());
    let winners = this.winners.map((winner) => winner.hash());
    return Poseidon.hash([this.amount.value, ...playersHash, ...winners]);
  }

  clone(): Pot {
    let players = this.eligiblePlayers.map((player) => player.clone());
    let winners = this.winners.map((winner) => winner.clone());
    return new Pot({
      amount: UInt32.from(this.amount),
      eligiblePlayers: players,
      winners,
    });
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
