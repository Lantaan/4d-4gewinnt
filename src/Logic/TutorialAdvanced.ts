//let = Variable
//const = Konstante
let i = 0;
i++;
const j = 0;
//"j++;" löst einenn Fehler aus, weil Konstante


//Funktion = Methode, die keinem Objekt angehört
//Funktionen können überall in der Datei aufgerufen werden
function popup(text: string | number | boolean | undefined | null): void {
    alert(text)
}
//beim aufrufen von Funktionen (anders als bei Methoden) kein "this."
popup("hahahahahaha");


//dasselbe wie:
/*
function konsoleAusgeben(ausgabe: any): void {
        console.log(ausgabe);
    }
*/
const konsoleAusgeben: (ausgabe: any) => void = (ausgabe: any) => {
    console.log(ausgabe)
}
konsoleAusgeben("ugaugaugauga");


//objekte müssen nicht Klassen angehören
//man macht das mit: variable = {...}
const beispielObjekt: { zahl: number, text: string } = {
    //name: wert
    zahl: 1,
    text: "aaaaa"
}
beispielObjekt.zahl = 3.5
popup(beispielObjekt.zahl)//zeigt 3.5 an


//objekte ohne klassen können Methoden haben
const beispielObjektMitMethoden: {
    zahl: number,
    addieren: (zahl1: number, zahl2: number) => number
} = {
    zahl: -4,
    addieren: (zahl1: number, zahl2: number) => { return zahl1 + zahl2 }
}
console.log(beispielObjektMitMethoden.addieren(1, 4))//gibt 5 aus


//funktionenn und Methoden können als argumente
//für andere Funktionen verwendet werden
function andereFunktionOderMethodeAusführen(
    auszuführendeFunktion: () => void
) {
    auszuführendeFunktion();
}

let aaa = 0;
function leereFunktion() {
    aaa = 3;
}
andereFunktionOderMethodeAusführen(leereFunktion);
//a === 3


const hörAufDichZubeschwerenTypescript = undefined;
export default hörAufDichZubeschwerenTypescript;