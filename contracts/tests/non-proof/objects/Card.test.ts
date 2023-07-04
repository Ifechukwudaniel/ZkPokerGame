import { Character, Field, Poseidon, PrivateKey, UInt32 } from 'snarkyjs';
import {
  CardColor,
  CardRank,
  CardSuit,
  Card,
} from '../../../src/PokerGame/objects/Card';

describe('Card', () => {
  describe('hash', () => {
    it('returns the expected hash', async () => {
      const newCard = new Card({
        color: Character.fromString(CardColor.BLACK),
        suit: Character.fromString(CardSuit.CLUB),
        rank: Character.fromString(CardRank.ACE),
      });

      expect(newCard.hash().toString()).toBe(
        Poseidon.hash([
          Character.fromString(CardColor.BLACK).toField(),
          Character.fromString(CardSuit.CLUB).toField(),
          Character.fromString(CardRank.ACE).toField(),
        ]).toString()
      );
    });
  });

  describe('clone', () => {
    it('returns a new Piece with the same values', async () => {
      const newCard = new Card({
        color: Character.fromString(CardColor.BLACK),
        rank: Character.fromString(CardRank.ACE),
        suit: Character.fromString(CardSuit.CLUB),
      });
      const cardClone = newCard.clone();
      expect(cardClone.toJson()).toBe(newCard.toJson());
    });

    it('can edit the clone without affecting the original', async () => {
      const newCard = new Card({
        color: Character.fromString(CardColor.BLACK),
        rank: Character.fromString(CardRank.ACE),
        suit: Character.fromString(CardSuit.CLUB),
      });
      let cardClone = newCard.clone();
      expect(cardClone.toJson()).toBe(newCard.toJson());

      cardClone.color = Character.fromString(CardColor.RED);
      expect(cardClone.toJson()).not.toBe(newCard.toJson());

      cardClone.rank = Character.fromString(CardRank.FOUR);
      expect(cardClone.toJson()).not.toBe(newCard.toJson());

      cardClone.suit = Character.fromString(CardSuit.DIAMOND);
      expect(cardClone.toJson()).not.toBe(newCard.toJson());
    });
  });
});
