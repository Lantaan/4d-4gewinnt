import React from "react";
class vector{
    x: number =0;
    y: number =0;
    z: number =0;
    w: number =0;
    constructor(a: number,b:number,c:number,d:number){
        this.x=a;
        this.y=b;
        this.z=c;
        this.w=d;
    }
}
function apply ( appliedfunction: (f: number) => void, v: vector ): void{
    appliedfunction(v.x);
    appliedfunction(v.y);
    appliedfunction(v.z);
    appliedfunction(v.w);
}
export default vector;