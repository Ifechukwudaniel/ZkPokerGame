import {
  SmartContract,
  state,
  State,
  method,
  Permissions,
  UInt64,
  PublicKey,
  Signature,
  UInt32,
  Struct,
  Field,
  FlexibleProvablePure,
} from 'snarkyjs';

export class User extends Struct({
  value: [Field, Field, Field, Field, Field, Field],
}) {
  static fill(val: number) {
    return new AttemptArray({ value: Array(6).fill(Field(val)) });
  }

  hash() {
    return Poseidon.hash(this.value);
  }
}

export class PokerGame extends SmartContract {
  events: { winnerFound: FlexibleProvablePure<any> };
}
