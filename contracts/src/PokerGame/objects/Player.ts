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
import { Card } from './Card';

export class Player extends Struct({
  id: UInt32,
  bet: UInt32,
  raise: UInt32,
  holeCards: [Card, Card],
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
      folded: Bool(false),
      showCards: Bool(false),
      holeCards: [],
      left: new Bool(false),
      address,
    });
  }
  hash(): Field {
    let publicKeyHash = CircuitString.fromString(this.address.toJSON());
    return Poseidon.hash([
      this.bet.value,
      this.raise.value,
      this.folded.toField(),
      this.showCards.toField(),
      this.left.toField(),
      publicKeyHash.hash(),
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
    return clone;
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
