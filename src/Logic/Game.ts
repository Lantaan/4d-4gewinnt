import React from 'react';

import {Vector4} from 'three';

class Game {
    activeplayer: 'player1' | 'player2' = 'player1';
    board: ('no marker' | 'player1' | 'player2')[][][][] = [[[[]]]];
    p1: number = 0;
    p2: number = 0;
    //werden benutzt um die Anzeige für die Punkte zu updaten
    updateDisplayPointsP1: React.Dispatch<React.SetStateAction<number>> | undefined = undefined;
    updateDisplayPointsP2: React.Dispatch<React.SetStateAction<number>> | undefined = undefined;
    turnnumber: number = 0;
    safe: number = 0;
    maxTurnnumber: number;

    constructor(maxTurnnumber: number) {
        //am Anfang sind alle Felder leer

        for (let a: number = 0; a < 4; a++) {
            this.board[a] = [];
            for (let b: number = 0; b < 4; b++) {
                this.board[a][b] = [];
                for (let c: number = 0; c < 4; c++) {
                    this.board[a][b][c] = [];
                    for (let d: number = 0; d < 4; d++) {
                        this.board[a][b][c][d] = 'no marker';
                    }
                }
            }
        }

        this.maxTurnnumber = maxTurnnumber;
    }

    turn(pos: Vector4): { newlyFilledRows: Vector4[][] } | null | { winner: 'player1' | 'player2' | 'tie' } {
        //winner: ob und wer das Spiel gewonnen wurde, turn: wer dran ist
        //Feld ist schon besetzt, daher
        if (this.board[pos.x][pos.y][pos.z][pos.w] != 'no marker') {
            return null;
        }
        //Einer der Spieler hat eine Reihe voll, Spiel endet
        this.board[pos.x][pos.y][pos.z][pos.w] = this.activeplayer;
        let newlyFilledRows = this.checkifcompleterow(pos);
        if (newlyFilledRows.length > 0) {
            //Punktzahl wird abgerechnet
            if (this.activeplayer == 'player1') {
                this.p1 += newlyFilledRows.length;
                if (this.updateDisplayPointsP1) this.updateDisplayPointsP1(this.p1);
            } else {
                this.p2 += newlyFilledRows.length;
                if (this.updateDisplayPointsP2) this.updateDisplayPointsP2(this.p2);
            }
        }

        //Keins der beiden trifft ein, Spiel geht normal weiter
        if (this.activeplayer == 'player1') {
            this.activeplayer = 'player2';
        } else {
            this.activeplayer = 'player1';
        }

        this.turnnumber++;
        //bei Punkten wird nach 40 Runden das Spiel beendet
        if (this.turnnumber == this.maxTurnnumber) {
            if (this.p1 > this.p2) {
                return {winner: 'player1'};
            } else if (this.p2 > this.p1) {
                return {winner: 'player2'};
            } else {
                return {winner: 'tie'};
            }
        }else{
            return {newlyFilledRows: newlyFilledRows};
        }
    }

    checkifcompleterow(pos: Vector4): Vector4[][] {
        let dir = new Vector4(0, 0, 0, 0);
        let newlyFilledRows: Vector4[][] = [];
        //checkrow wird mit allen verschiedenen Richtungen durchgeführt
        for (let i = 0; i < 2; i++) {
            dir.setX(i);
            for (let j = 0; j < 2; j++) {
                dir.setY(j);
                for (let k = 0; k < 2; k++) {
                    dir.setZ(k);
                    for (let l = 0; l < 2; l++) {
                        dir.setW(l);
                        if (dir.x != 0 || dir.y != 0 || dir.z != 0 || dir.w != 0) {
                            const filledRow = this.checkrow(pos.clone(), dir);
                            if (filledRow) {
                                newlyFilledRows.push(filledRow)
                            }
                        }
                    }
                }
            }
        }

        return newlyFilledRows;
    }

    checkrow(position: Vector4, direction: Vector4): Vector4[] | null {
        let pos = position.clone();
        let contents: string[] = [];
        let row: Vector4[] = [];
        while (pos.x < 4 && pos.x > -1 && pos.y > -1 && pos.y < 4 && pos.z < 4 && pos.z > -1 && pos.w > -1 && pos.w < 4) {
            //die Reihe wird bis zu einem Ende durchgegangen
            pos = pos.add(direction);
        }
        pos.sub(direction);
        while (pos.x < 4 && pos.x > -1 && pos.y > -1 && pos.y < 4 && pos.z < 4 && pos.z > -1 && pos.w > -1 && pos.w < 4) {
            //danach wird die Reihe bis zum anderen Ende durchgegangen, alle Inhalte werden gespeichert
            contents.push(this.board[pos.x][pos.y][pos.z][pos.w]);
            row.push(pos.clone());
            pos = pos.sub(direction);
        }
        //Wenn einer der Spieler die Reihe voll hat, wird true zurückgegeben
        if (
            contents[0] == contents[3] &&
            contents[0] == contents[2] &&
            contents[0] == contents[1] &&
            contents[0] != 'no marker' &&
            contents[0] != undefined
        ) {
            return row;
        }
        return null;
    }
}

export default Game;
