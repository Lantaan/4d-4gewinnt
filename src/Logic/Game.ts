import React from 'react';

import { Vector4 } from 'three';

class Game {
    punkte: boolean = false;
    activeplayer: ("player1" | "player2") = "player1";
    board: ("no marker" | "player1" | "player2")[][][][] = [[[[]]]];
    p1: number =0;
    p2: number =0;
    turnnumber: number =0;
    safe: number =0;
    constructor(punkte: boolean) {
        //am Anfang sind alle Felder leer

        for (let a: number =0; a<4; a++) {
            this.board[a]=[];
            for (let b: number =0; b<4; b++) {
                this.board[a][b]=[];
                for (let c: number =0; c<4; c++) {
                    this.board[a][b][c]=[];
                    for (let d: number =0; d<4; d++) {
                        this.board[a][b][c][d]="no marker";
                    }
                }
            }
        }
        this.punkte = punkte;

    }

    turn(pos: Vector4): {winner: ("player1"|"player2"|null); turn: ("player1"|"player2"|null)}{
        //winner: ob und wer das Spiel gewonnen wurde, turn: wer dran ist 
        //Feld ist schon besetzt, daher 
        if(this.board[pos.x][pos.y][pos.z][pos.w]!= "no marker"){
            return {winner: null, turn: null}
        }
        //Einer der Spieler hat eine Reihe voll, Spiel endet
        this.board[pos.x][pos.y][pos.z][pos.w]=this.activeplayer;
        if(this.checkifcompleterow(pos)){return {winner: this.activeplayer, turn: null}}
       //Punktzahl wird abgerechnet
       if(this.activeplayer=="player1"){this.p1=this.p1 + this.safe/2}else{this.p2=this.p2+this.safe/2}
        //Keins der beiden trifft ein, Spiel geht normal weiter
        if(this.activeplayer=="player1"){this.activeplayer="player2"}else{this.activeplayer="player1"}
        this.turnnumber++;
        //bei Punkten wird nach 40 Runden das Spiel beendet
        if(this.punkte && this.turnnumber == 40){
            if (this.p1>this.p2){return {winner: "player1", turn: null}}
        else {return{winner: "player2", turn: null}
    } 
    
        }
        return {winner: null,turn: this.activeplayer}
    }

    checkifcompleterow(pos:Vector4): boolean {
        this.safe=0;
        let dir = new Vector4(0,0,0,0);
        //checkrow wird mit allen verschiedenen Richtungen durchgeführt
for (let i=-1; i<2; i++){
    dir.setX(i);
    for (let j=-1; j<2; j++){
        dir.setY(j);
        for (let k=-1; k<2; k++){
            dir.setZ(k);
            for (let l=-1; l<2;l++)
            dir.setW(l);
            if (dir.x==dir.y&&dir.z==dir.w&&dir.w==dir.x&&dir.x==0){}
            //wenn das Spiel auf Punkte gestellt ist, werden die vollen Reihen nur gespeichert
            else if (!this.punkte){
            if (this.checkrow(pos.clone(),dir))return true;
            }else{
                if (this.checkrow(pos.clone(),dir)){this.safe++}
        }
        } 
    }
}
        return false;
    }
    checkrow(position: Vector4, direction: Vector4): boolean{
        let pos =position.clone();
        let contents: string[] = [];
        while (pos.x<4 && pos.y<4 && pos.z<4 && pos.w<4){
            //die Reihe wird bis zu einem Ende durchgegangen
        pos = pos.add(direction);
     }
        while (pos.x>-1 && pos.y>-1 && pos.z>-1 && pos.w>-1){
            //danach wird die Reihe bis zum anderen Ende durchgegangen, alle Inhalte werden gespeichert
         contents.push(this.board[pos.x][pos.y][pos.z][pos.w])
         pos = pos.sub(direction);   
        }
        //Wenn einer der Spieler die Reihe voll hat, wird true zurückgegeben
        if(contents[0] == contents[3] && contents[1]==contents[2] && contents[1] == contents[0] && contents[0] != "no marker")
        {return true}
        return false
    }
    test(){
        this.board[0][0][0][0] = "player1";
        this.board[1][0][1][0] = "player1";
        this.board[2][0][2][0] = "player1";
        this.board[3][0][3][0] = "player1";
        let  pos = new Vector4(2,0,2,0);
        console.log(this.checkifcompleterow(pos));
   }
    }  
export default Game
