var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { SmartContract, state, State, method, Permissions, UInt64, PublicKey, Signature, UInt32, AccountUpdate, Int64 } from 'snarkyjs';
const tokenSymbol = 'Poker';
export class Token extends SmartContract {
    constructor() {
        super(...arguments);
        this.totalAmountInCirculation = State();
        this.mintNonce = State();
    }
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
    init() {
        super.init();
        this.account.tokenSymbol.set(tokenSymbol);
        this.totalAmountInCirculation.set(UInt64.zero);
    }
    mint(receiverAddress, amount, adminSignature) {
        let totalAmountInCirculation = this.totalAmountInCirculation.get();
        this.totalAmountInCirculation.assertEquals(totalAmountInCirculation);
        let newTotalAmountInCirculation = totalAmountInCirculation.add(amount);
        let nonce = this.mintNonce.get();
        this.mintNonce.assertEquals(nonce);
        adminSignature
            .verify(this.address, amount
            .toFields()
            .concat(...receiverAddress.toFields(), ...nonce.toFields()))
            .assertTrue();
        this.token.mint({
            address: receiverAddress,
            amount,
        });
        this.mintNonce.set(nonce.add(1));
        this.totalAmountInCirculation.set(newTotalAmountInCirculation);
    }
    sendTokens(senderAddress, receiverAddress, amount) {
        this.token.send({
            from: senderAddress,
            to: receiverAddress,
            amount,
        });
    }
    // let a zkapp send tokens to someone, provided the token supply stays constant
    approveUpdateAndSend(zkappUpdate, to, amount) {
        this.approve(zkappUpdate); // TODO is this secretly approving other changes?
        // see if balance change cancels the amount sent
        let balanceChange = Int64.fromObject(zkappUpdate.body.balanceChange);
        balanceChange.assertEquals(Int64.from(amount).neg());
        // add same amount of tokens to the receiving address
        this.token.mint({ address: to, amount });
    }
    getBalance(publicKey) {
        let accountUpdate = AccountUpdate.create(publicKey, this.token.id);
        let balance = accountUpdate.account.balance.get();
        accountUpdate.account.balance.assertEquals(accountUpdate.account.balance.get());
        return balance;
    }
}
__decorate([
    state(UInt64),
    __metadata("design:type", Object)
], Token.prototype, "totalAmountInCirculation", void 0);
__decorate([
    state(UInt32),
    __metadata("design:type", Object)
], Token.prototype, "mintNonce", void 0);
__decorate([
    method,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], Token.prototype, "init", null);
__decorate([
    method,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [PublicKey,
        UInt64,
        Signature]),
    __metadata("design:returntype", void 0)
], Token.prototype, "mint", null);
__decorate([
    method,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [PublicKey,
        PublicKey,
        UInt64]),
    __metadata("design:returntype", void 0)
], Token.prototype, "sendTokens", null);
__decorate([
    method,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [AccountUpdate,
        PublicKey,
        UInt64]),
    __metadata("design:returntype", void 0)
], Token.prototype, "approveUpdateAndSend", null);
__decorate([
    method,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [PublicKey]),
    __metadata("design:returntype", UInt64)
], Token.prototype, "getBalance", null);
//# sourceMappingURL=Token.js.map