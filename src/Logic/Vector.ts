class Vector{
    x: number = 0;
    y: number = 0;
    z: number = 0;
    w: number = 0;

    apply(functionToBeApplied: (x: number)=>number){
        this.x = functionToBeApplied(this.x);
        this.y = functionToBeApplied(this.y);
    }

    multiplyWith2(){
        this.apply((x) => {return x*2})
    }
}


export default Vector;