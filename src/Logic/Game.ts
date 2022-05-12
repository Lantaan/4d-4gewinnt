import React from "react";

import { Vector4 } from "three";

class Game {
    activeplayer: ("player1" | "player2") = "player1";
    board: ("no marker" | "player1" | "player2")[][][][] = [[[[]]]];
    constructor() {
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
    }

    turn(pos: Vector4): {winner: ("player1"|"player2"|null); turn: ("player1"|"player2"|null)}{
        if(this.board[pos.x][pos.y][pos.z][pos.w]!= "no marker"){
            return {winner: null, turn: null}
        }
        this.board[pos.x][pos.y][pos.z][pos.w]=this.activeplayer;
        if(this.checkcompleterow()){return {winner: this.activeplayer, turn: null}}
        if(this.activeplayer=="player1"){this.activeplayer="player2"}else{this.activeplayer="player1"}
        return {winner: null,turn: this.activeplayer}
    }

    checkcompleterow(): boolean {
        return false;
    }
    checkrow(pos: Vector4, direction: Vector4): string[]{
        let contents: string[] = [];
        while (pos.x<4 && pos.y<4 && pos.z<4 && pos.w<4){
        pos = pos.add(direction);
     }
        while (pos.x>-1 && pos.y>-1 && pos.z>-1 && pos.w>-1){
            
        }
        return contents;
    } 
    /*
    raycast(origin:Vector4, target:Vector4):string[]{
            const dist = target.addVectors(target, origin)
                //Wurzel
                const distMag = Math.sqrt(dist.x ** 2 + dist.y ** 2 + dist.z ** 2 + dist.w ** 2);

        if (distMag === 0) return [this.board[origin.x][origin.y][origin.z][origin.w]]

        const normalizedRayDirX = dist.x / distMag,
            normalizedRayDirY = dist.y / distMag,
            normalizedRayDirZ = dist.z / distMag,
            normalizedRayDirW = dist.w / distMag;

            //direction in which the algorithm will go
            //gibt +1, -1, oder 0
            const stepX = Math.sign(dist.x),
                stepY = Math.sign(dist.y),
                stepZ = Math.sign(dist.z),
                stepW = Math.sign(dist.w);
            //current index of pixel that the line goes through
            let indexX = (Math.floor(origin.x)),
                indexY = (Math.floor(origin.y)),
                indexZ = (Math.floor(origin.z)),
                indexW = (Math.floor(origin.w));


            //signs have to be irrelevant
            //Betrag
            const tDeltaX = Math.abs(1 / normalizedRayDirX),
                tDeltaY = Math.abs(1 / normalizedRayDirY),
                tDeltaZ = Math.abs(1 / normalizedRayDirZ);

            //its .5 because ray starts in center of origin pixel
            let tMaxX = .5 * tDeltaX,
                tMaxY = .5 * tDeltaY,
                tMaxZ = .5 * tDeltaZ;


            //~ aktiver Knoten
            //statt Index als zahl, index als Vektor
            let content: string = (this.board[indexX][indexY][indexZ][indexW]);
            let contents: string[] = [];
            while (content != "no marker" && content != undefined) {
                //kleinste Zahl aus 3 Zahlen
                const minCoordinate = Math.min(Math.min(tMaxX, tMaxY), tMaxZ);

                if (tMaxX === minCoordinate) {
                    if (tMaxX === tMaxY && tMaxX === tMaxZ) {
                        tMaxX += tDeltaX; tMaxY += tDeltaY; tMaxZ += tDeltaZ;
                        indexX += stepX; indexY += stepY; indexZ += stepZ;
    
                            //aktiver Knoten = nächster Knoten
                            content = this.board[indexX][indexY][indexZ][indexW]
                        
                    } else if (tMaxX === tMaxY) {
                        tMaxX += tDeltaX; tMaxY += tDeltaY;
                        indexX += stepX; indexY += stepY;

                        content = this.board[indexX][indexY][indexZ][indexW];
                        

                    } else if (tMaxX === tMaxZ) {
                        tMaxX += tDeltaX; tMaxZ += tDeltaZ;
                        indexX += stepX; indexZ += stepZ;

                        content = this.board[indexX][indexY][indexZ][indexW];
            

                    } else {
                        tMaxX += tDeltaX;
                        indexX += stepX;
                        content = this.board[indexX][indexY][indexZ][indexW];
                        }
                    


                } else if (tMaxY === minCoordinate) {
                    if (tMaxY === tMaxZ) {
                        tMaxY += tDeltaY; tMaxZ += tDeltaZ;
                        indexY += stepY; indexZ += stepZ;
                        content = this.board[indexX][indexY][indexZ][indexW];
                        

                    }
                     else {
                        tMaxY += tDeltaY;
                        indexY += stepY;
                        if (axisBeyondTarget(target.x, target.y, target.z, target.w, indexX, indexY, indexZ, stepX, stepY, stepZ) >= 3) break
                        else {
                            const stepAsIndexInNeighbourArray = (0 + 1) * 9 + (stepY + 1) * 3 + (0 + 1)
                            currentIndex = indexAndNeighbourArray[currentIndex][stepAsIndexInNeighbourArray]
                        }
                    }


                } else if (tMaxZ === minCoordinate) {
                    tMaxZ += tDeltaZ;
                    indexZ += stepZ;
                    if (axisBeyondTarget(targetX, targetY, targetZ, indexX, indexY, indexZ, stepX, stepY, stepZ) >= 3) break
                    else {
                        const stepAsIndexInNeighbourArray = (stepZ + 1) * 9 + (0 + 1) * 3 + (0 + 1)
                        currentIndex = indexAndNeighbourArray[currentIndex][stepAsIndexInNeighbourArray]
                    }
                }
                contents.push(content);
            
            }

            return contents;
        }
        */
    }  
        

export default Game
