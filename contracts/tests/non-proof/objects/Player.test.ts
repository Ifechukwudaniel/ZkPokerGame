import {
  Bool,
  Character,
  Field,
  Poseidon,
  PrivateKey,
  UInt32,
  CircuitString,
} from 'snarkyjs';
import { Player } from '../../../src/PokerGame/objects/Player';
import {
  Card,
  CardColor,
  CardRank,
  CardSuit,
} from '../../../src/PokerGame/objects/Card';

describe('Player', () => {
  describe('hash', () => {
    it('returns the expected hash', async () => {
      let playerAddress = PrivateKey.random().toPublicKey();
      const newPlayer = new Player(1, playerAddress);
      // console.log(newPlayer.hash())
      // expect(newPlayer.hash().toString()).toBe(
      //   Poseidon.hash([
      //     newPlayer.id.value,
      //     newPlayer.bet.value,
      //     newPlayer.raise.value,
      //     newPlayer.folded.toField(),
      //     newPlayer.showCards.toField(),
      //     newPlayer.left.toField(),
      //     playerAddress.x,
      //     playerAddress.isOdd.toField()
      //   ]).toString()
      // );
    });
  });

  describe('clone', () => {
    it('returns a new Player with the same values', async () => {
      let playerAddress = PrivateKey.random().toPublicKey();
      const newPlayer = new Player(1, playerAddress);
      const playerClone = newPlayer.clone();
      expect(playerClone.toJson()).toBe(newPlayer.toJson());
    });

    it('can edit the clone without affecting the original', async () => {
      let playerAddress = PrivateKey.random().toPublicKey();
      const newPlayer = new Player(1, playerAddress);
      const playerClone = newPlayer.clone();
      expect(playerClone.toJson()).toBe(newPlayer.toJson());

      playerClone.left = Bool(true);
      expect(playerClone.toJson()).not.toBe(newPlayer.toJson());

      playerClone.bet = new UInt32(100);
      expect(playerClone.toJson()).not.toBe(newPlayer.toJson());

      playerClone.showCards = Bool(true);
      expect(playerClone.toJson()).not.toBe(newPlayer.toJson());
    });
  });

  describe('add player card', () => {
    it('it can set player card', async () => {
      const card1 = new Card({
        color: Character.fromString(CardColor.BLACK),
        rank: Character.fromString(CardRank.ACE),
        suit: Character.fromString(CardSuit.CLUB),
      });

      const card2 = new Card({
        color: Character.fromString(CardColor.BLACK),
        rank: Character.fromString(CardRank.ACE),
        suit: Character.fromString(CardSuit.CLUB),
      });

      let playerAddress = PrivateKey.random().toPublicKey();
      const newPlayer = new Player(1, playerAddress);
      expect(newPlayer.holeCards.length).toBe(0);
      newPlayer.setPlayerCard(card1, card2);
      expect(newPlayer.holeCards.length).toBe(2);
    });

    it('if showed card  is true and can export to json', async () => {
      const card1 = new Card({
        color: Character.fromString(CardColor.BLACK),
        rank: Character.fromString(CardRank.ACE),
        suit: Character.fromString(CardSuit.CLUB),
      });

      const card2 = new Card({
        color: Character.fromString(CardColor.BLACK),
        rank: Character.fromString(CardRank.ACE),
        suit: Character.fromString(CardSuit.CLUB),
      });

      let playerAddress = PrivateKey.random().toPublicKey();
      const newPlayer = new Player(1, playerAddress);
      expect(newPlayer.showCards).toEqual(Bool(false));
      await newPlayer.setShowCard(true);
      expect(newPlayer.showCards).toEqual(Bool(true));
      newPlayer.setPlayerCard(card1, card2);
      expect(newPlayer.holeCards.length).toBe(2);
      let cardsAsString = JSON.stringify({
        card1: card1.toJson(),
        card2: card2.toJson(),
      });
      let cardJson = newPlayer.cardToJson();
      expect(cardJson).toBe(cardsAsString);
    });
  });
});
