import React from "react";
class Game{
    activeplayer: ("player1" | "player2") = "player1";
    board: ("no marker"|"player1" |"player2") [][][][]=[[[[]]]];
    constructor(){
        //am Anfang sind alle Felder leer
        for (let a: number =0; a<4; a++) {
            for (let b: number =0; b<4; b++) {
                for (let c: number =0; c<4; c++) {
                    for (let d: number =0; d<4; d++) {
                        this.board[a]=[];
                        this.board[a][b]=[];
                        this.board[a][b][c]=[];
                        this.board[a][b][c][d]="no marker";
                    }
                }
            }
        }
    }
    turn(x:number, y:number, z:number, w:number): string{
        if(this.board[x][y][z][w]!= "no marker"){return "Das Feld ist schon voll"}
        this.board[x][y][z][w]=this.activeplayer;
        if(this.activeplayer="player1"){this.activeplayer="player2"}else{this.activeplayer="player1"}
        if(this.checkcompleterow() == true){return "congratulations " + this.activeplayer + " won"}
        return this.activeplayer + ", it's your turn!";
    }
    checkcompleterow():boolean{
        return false;
    }
}
export default Game