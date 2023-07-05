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
import { Pot } from './Pot';

export class Table extends Struct({
  players: [Player],
  winners: [Player],
  pot: [Pot],
}) {}

export enum BettingRound {
  PRE_FLOP = 'pre-flop',
  FLOP = 'flop',
  TURN = 'turn',
  RIVER = 'river',
}
