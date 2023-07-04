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
  AccountUpdate,
  Int64,
} from 'snarkyjs';

const tokenSymbol = 'Poker';

export class Token extends SmartContract {
  @state(UInt64) totalAmountInCirculation = State<UInt64>();
  @state(UInt32) mintNonce = State<UInt32>();

  deploy() {
    super.deploy();

    const permissionToEdit = Permissions.proof();

    this.account.permissions.set({
      ...Permissions.default(),
      editState: permissionToEdit,
      setTokenSymbol: permissionToEdit,
      send: permissionToEdit,
      receive: permissionToEdit,
    });
  }

  @method init() {
    super.init();
    this.account.tokenSymbol.set(tokenSymbol);
    this.totalAmountInCirculation.set(UInt64.zero);
  }

  @method mint(
    receiverAddress: PublicKey,
    amount: UInt64,
    adminSignature: Signature
  ) {
    let totalAmountInCirculation = this.totalAmountInCirculation.get();
    this.totalAmountInCirculation.assertEquals(totalAmountInCirculation);

    let newTotalAmountInCirculation = totalAmountInCirculation.add(amount);
    let nonce = this.mintNonce.get();
    this.mintNonce.assertEquals(nonce);

    adminSignature
      .verify(
        this.address,
        amount
          .toFields()
          .concat(...receiverAddress.toFields(), ...nonce.toFields())
      )
      .assertTrue();

    this.token.mint({
      address: receiverAddress,
      amount,
    });

    this.mintNonce.set(nonce.add(1));
    this.totalAmountInCirculation.set(newTotalAmountInCirculation);
  }

  @method sendTokens(
    senderAddress: PublicKey,
    receiverAddress: PublicKey,
    amount: UInt64
  ) {
    this.token.send({
      from: senderAddress,
      to: receiverAddress,
      amount,
    });
  }

  // let a zkapp do anything, provided the token supply stays constant
  @method approveUpdate(zkappUpdate: AccountUpdate) {
    this.approve(zkappUpdate); // TODO is this secretly approving other changes?

    // see if balance change is zero
    let balanceChange = Int64.fromObject(zkappUpdate.body.balanceChange);
    balanceChange.assertEquals(Int64.from(0));
  }

  // let a zkapp send tokens to someone, provided the token supply stays constant
  @method approveUpdateAndSend(
    zkappUpdate: AccountUpdate,
    to: PublicKey,
    amount: UInt64
  ) {
    this.approve(zkappUpdate); // TODO is this secretly approving other changes?

    // see if balance change cancels the amount sent
    let balanceChange = Int64.fromObject(zkappUpdate.body.balanceChange);
    balanceChange.assertEquals(Int64.from(amount).neg());
    // add same amount of tokens to the receiving address
    this.token.mint({ address: to, amount });
  }

  @method getBalance(publicKey: PublicKey): UInt64 {
    let accountUpdate = AccountUpdate.create(publicKey, this.token.id);
    let balance = accountUpdate.account.balance.get();
    accountUpdate.account.balance.assertEquals(
      accountUpdate.account.balance.get()
    );
    return balance;
  }
}
