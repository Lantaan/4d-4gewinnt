import React from "react";
import Tutorial from "./Tutorial";
class Game{
    board: number[][][][]=[[[[]]]];
    constructor(){
        let yay: Tutorial = new Tutorial()
        for (let a: number =0; a<4; a++) {
            for (let b: number =0; b<4; b++) {
                for (let c: number =0; c<4; c++) {
                    for (let d: number =0; d<4; d++) {
                        this.board[a]=[];
                        this.board[a][b]=[];
                        this.board[a][b][c][d]=0;
                    }
                }
            }
        }
    }
}
export default Game