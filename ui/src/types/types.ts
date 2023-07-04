// import { PublicKey } from "snarkyjs"

export type FormValues = { username: string; intendedStack : number; setUsername: Function; setIntendedStack: Function; setFormPopup:Function; setSeatOccupied:Function };

export type Table = {
    gameID: string;
    poolPrize: number;
    winnerAddress:  string;
    totalRounds: number;
    totalParticipants: number;
}