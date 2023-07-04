import { Struct, Poseidon, Field, Character } from 'snarkyjs';

export class Card extends Struct({
  color: Character,
  suit: Character,
  rank: Character,
}) {
  hash(): Field {
    return Poseidon.hash([
      this.rank.toField(),
      this.color.toField(),
      this.suit.toField(),
    ]);
  }
  get rank(): Character {
    return this.rank;
  }

  get suit(): Character {
    return this.suit;
  }

  toJson(): string {
    return JSON.stringify({
      color: this.color.toString(),
      suit: this.suit.toString(),
      rank: this.rank.toString(),
    });
  }
}

export enum CardColor {
  RED = 'R',
  BLACK = 'B',
}

export enum CardSuit {
  CLUB = 'c',
  DIAMOND = 'd',
  HEART = 'h',
  SPADE = 's',
}

export enum CardRank {
  ACE = 'A',
  KING = 'K',
  QUEEN = 'Q',
  JACK = 'J',
  TEN = 'T',
  NINE = '9',
  EIGHT = '8',
  SEVEN = '7',
  SIX = '6',
  FIVE = '5',
  FOUR = '4',
  THREE = '3',
  TWO = '2',
}
