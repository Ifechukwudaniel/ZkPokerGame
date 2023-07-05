import { SmartContract, State, UInt64, PublicKey, Signature, UInt32, AccountUpdate } from 'snarkyjs';
export declare class Token extends SmartContract {
    totalAmountInCirculation: State<UInt64>;
    mintNonce: State<UInt32>;
    deploy(): void;
    init(): void;
    mint(receiverAddress: PublicKey, amount: UInt64, adminSignature: Signature): void;
    sendTokens(senderAddress: PublicKey, receiverAddress: PublicKey, amount: UInt64): void;
    approveUpdateAndSend(zkappUpdate: AccountUpdate, to: PublicKey, amount: UInt64): void;
    getBalance(publicKey: PublicKey): UInt64;
}
