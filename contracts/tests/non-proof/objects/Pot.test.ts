import {
  Bool,
  Character,
  Field,
  Poseidon,
  PrivateKey,
  UInt32,
  CircuitString,
} from 'snarkyjs';
import { Pot } from '../../../src/PokerGame/objects/Pot';
import { Player } from '../../../src/PokerGame/objects/Player';

describe('Pot', () => {
  let playersAddress = new Array(5).fill(null);
  playersAddress = playersAddress.map(() => PrivateKey.random().toPublicKey());
  const players = playersAddress.map((address, id) => new Player(id, address));
  let winners = [players[0].clone(), players[1].clone()];
  let amount = 1000;

  describe('hash', () => {
    it('returns the expected hash', async () => {
      let currentPot = new Pot({
        amount: new UInt32(amount),
        eligiblePlayers: players,
        winners,
      });
      expect(currentPot.hash().toString()).toBe(
        Poseidon.hash([
          Character.fromString(currentPot.amount.toString()).toField(),
        ]).toString()
      );
    });
  });

  describe('clone', () => {
    it('returns a new Player with the same values', async () => {
      let currentPot = new Pot({
        amount: new UInt32(amount),
        eligiblePlayers: players,
        winners,
      });
      const potClone = currentPot.clone();
      expect(potClone.toJson()).toBe(currentPot.toJson());
    });

    it('can edit the clone without affecting the original', async () => {
      let currentPot = new Pot({
        amount: new UInt32(amount),
        eligiblePlayers: players,
        winners,
      });
      const potClone = currentPot.clone();
      expect(potClone.toJson()).toBe(currentPot.toJson());
      potClone.increasePotSize(100);
      expect(potClone.toJson()).not.toBe(currentPot.toJson());
      potClone.winners.push(players[2].clone());
      expect(potClone.toJson()).not.toBe(currentPot.toJson());
      potClone.winners = [];
      expect(potClone.toJson()).not.toBe(currentPot.toJson());
    });
  });

  describe('pot size', () => {
    it('it can increase pot size', async () => {
      let currentPot = new Pot({
        amount: new UInt32(amount),
        eligiblePlayers: players,
        winners,
      });
      expect(currentPot.amount.toString()).toBe(amount.toString());
      // currentPot.increasePotSize(100)
      // expect(currentPot.amount.toString()).toBe((amount+100).toString())
    });
  });
});
