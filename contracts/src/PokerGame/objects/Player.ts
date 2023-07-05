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
  Circuit,
  Provable,
} from 'snarkyjs';
import { Card } from './Card';

export class Player extends Struct({
  id: UInt32,
  bet: UInt32,
  raise: UInt32,
  holeCards: [Card, Card],
  stack: UInt32,
  folded: Bool,
  showCards: Bool,
  left: Bool,
  address: PublicKey,
}) {
  constructor(userNumber: number, address: PublicKey) {
    super({
      id: new UInt32(userNumber),
      bet: new UInt32(0),
      raise: new UInt32(0),
      stack: new UInt32(0),
      folded: Bool(false),
      showCards: Bool(false),
      holeCards: [],
      left: new Bool(false),
      address,
    });
  }

  hash(): Field {
    return Poseidon.hash([
      this.id.value,
      this.bet.value,
      this.raise.value,
      this.folded.toField(),
      this.showCards.toField(),
      this.left.toField(),
      this.address.x,
      this.address.isOdd.toField(),
    ]);
  }

  clone() {
    let data = {
      id: UInt32.from(this.id),
      bet: UInt32.from(this.bet),
      raise: UInt32.from(this.raise),
      folded: Bool.fromJSON(this.folded.toJSON()),
      showCards: Bool.fromJSON(this.showCards.toJSON()),
      left: Bool.fromJSON(this.left.toJSON()),
      address: PublicKey.fromBase58(this.address.toJSON()),
      stack: UInt32.from(this.stack),
    };
    let clone = new Player(
      parseInt(this.id.toString()),
      PublicKey.fromBase58(this.address.toJSON())
    );
    clone.bet = data.bet;
    clone.raise = data.raise;
    clone.folded = data.folded;
    clone.showCards = data.showCards;
    clone.left = data.left;
    clone.stack = this.stack;
    return clone;
  }

  setPlayerCard(card1: Card, card2: Card) {
    this.holeCards = [card1, card2];
  }

  clearPlayerCard() {
    this.holeCards = [];
  }

  setShowCard(show: boolean) {
    this.showCards = Bool(show);
  }

  cardToJson(): string {
    this.showCards.assertEquals(true);
    return JSON.stringify({
      card1: this.holeCards[0].toJson(),
      card2: this.holeCards[1].toJson(),
    });
  }
  toJson(): string {
    return JSON.stringify({
      id: this.id.toString(),
      bet: this.bet.toString(),
      raise: this.raise.toString(),
      folded: this.folded.toString(),
      showCards: this.showCards.toString(),
      left: this.left.toString(),
    });
  }
}
