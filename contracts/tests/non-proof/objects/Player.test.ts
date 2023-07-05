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

describe('Player', () => {
  describe('hash', () => {
    // it('returns the expected hash', async () => {
    //   let playerAddress = PrivateKey.random().toPublicKey()
    //   const newPlayer= new Player(1,playerAddress);
    //   let publicKeyHash = CircuitString.fromString(newPlayer.address.toJSON()).hash()
    //   expect(newPlayer.hash().toString()).toBe(
    //     Poseidon.hash([
    //       newPlayer.bet.value,
    //       newPlayer.raise.value,
    //       newPlayer.folded.toField(),
    //       newPlayer.showCards.toField(),
    //       newPlayer.left.toField(),
    //       publicKeyHash
    //     ]).toString()
    //   );
    // });
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
    it('it can add player card', async () => {
      console.log('djjdjd');
    });
  });
});
