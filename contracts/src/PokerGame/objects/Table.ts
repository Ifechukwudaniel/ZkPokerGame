import {
  Struct,
  Poseidon,
  Field,
  Character,
  Int64,
  Bool,
  UInt32,
  PublicKey,
  CircuitString,
} from 'snarkyjs';
import { Player } from './Player';
import { Pot } from './Pot';

export class Table extends Struct({
  players: [Player],
  winners: [Player],
  pot: [Pot],
  winner: [Player],
  currentBet: UInt32,
  currentPosition: UInt32,
  dealerPosition: UInt32,
  currentRound: CircuitString,
  lastRaise: UInt32,
  lastPosition: UInt32,
  autoMoveDealer: Bool,
  buyIn: UInt32,
  smallBlind: UInt32,
}) {
  get actingPlayers() {
    return this.players.filter((player) => {
      return (
        player.folded.equals(false) && player.stack.greaterThan(UInt32.from(0))
      );
    });
  }
}

export enum BettingRound {
  PRE_FLOP = 'pre-flop',
  FLOP = 'flop',
  TURN = 'turn',
  RIVER = 'river',
}
