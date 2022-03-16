//Strichpunkte sind empfohlen, aber nicht nötig

class BeispielClasse {
    beispielAttribut = 1;
}

class Tutorial {
    //name: typ;
    text: string;
    //statt "int" gibts "Number"
    zahl: number;
    //man kann beim deklarieren auch instanziieren
    wahrFalsch: boolean = true;

    //Attribute/Variablen können mehrere unterschiedlichen typen annehmen
    vieleTypen: string | boolean | number;
    //gibt man keinen dateityp an, nimmt ein attribut sie alle an
    alleTypen;
    //Attribute/Variablen können zu diskreten Werten gezwungen werden
    nur12OderÖ: 1 | 2 | "Ö";

    //attribute dürfen normalerweise nicht "null" oder "undefined" sein
    nullOderObjekt: BeispielClasse | null = null;
    undefinedOderObjekt: BeispielClasse | undefined = undefined;

    //Felder werden ohne "new" instanziiert
    //stattdessen schreibt man "feld = []"
    //die länge eines Feldes ist variabel
    stringFeld: string[] = [];
    //man kann Feldern beim instanziieren Werte geben
    booleanFeld: boolean[] = [true, false, true];


    //mehrdimensionales Feld mit diskreten Werten
    superFeld: ("a" | "b" | "c")[][][] = [ [ [ ] ] ];


    constructor() {
        //attribute müssen entweder beim deklarieren,
        //oder im Konstruktor instanziiert werden
        //wenn man ein Attribut/Methode aufruft braucht man IMMER "this."
        this.text = "d";
        this.zahl = 0;


        //Attribute/Variablen können mehrere unterschiedlichen typen annehmen
        this.vieleTypen = "a";
        this.vieleTypen = true;
        this.vieleTypen = 1;
        //this.vieleTypen == 1

        //gibt man keinen dateityp an, nimmt ein attribut sie alle an
        this.alleTypen = 28;
        this.alleTypen = "ahaha";
        this.alleTypen = window.AbortSignal.caller.prototype;

        //Attribute/Variablen können zu diskreten Werten gezwungen werden
        this.nur12OderÖ = 1;
        this.nur12OderÖ = 2;
        this.nur12OderÖ = "Ö";
        //"this.nur12OderÖ = 3" wird eine Fehlermeldung auslösen


        //attribute die "null" oder "undefined" sein können müssen vor dem aufrufen gecheckt werden
        //0, null, undefined gelten alle als false
        if (this.nullOderObjekt) this.nullOderObjekt.beispielAttribut = 200;
        if (this.undefinedOderObjekt) this.undefinedOderObjekt.beispielAttribut = 7;


        //feldern können normal mit Zahlen indexiert werden
        //Länge eines Feldes ist der letzte belegte Index + 1
        //this.stringFeld.length === 0
        //this.booleanFeld.length === 3
        //Felder können normal mit Zahlen indexiert werden
        this.booleanFeld[0] = false;
        //man kann Felder mit "for" füllen
        //man darf im "for" nicht die Länge geben
        //weil ein leeres Feld eine Länge von 0 hat
        for (let i = 0; i < 100; i++) {
            this.stringFeld[i] = "huso";
        }
        //man kann im allgemeinen bei den Feldern hier an Listen denken
        //so haben Felder auch Methoden wie .push()


        //mehrdimensionales Feld mit diskreten Werten
        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 10; j++) {
                for (let k = 0; k < 10; k++) {
                    //man muss zuerst die Felder im Feld instanziieren
                    this.superFeld[i] = [];
                    this.superFeld[i][j] = [];
                    this.superFeld[i][j][k] = "a";
                }
            }
        }
    }

    //methodenName(argument1: argumenttyp1, argument2: argumenttyp2): methodenReturn{...}
    addieren(zahl1: number, zahl2: number): number {
        //lokale variablen gehen mit:
        //let variablenName: variablenTyp;  oder
        //let variablenName: variablenTyp = variablenWert;
        let ergebniss: number = zahl1 + zahl2;

        //methodenAufrufe brauchen "this."
        this.popup(ergebniss);

        return ergebniss;
    }


    //sachen zum debuggen:

    //alert() funktioniert nur mit string, number, boolean, undefined und null
    popup(text: string | number | boolean | undefined | null): void {
        alert(text)
    }
    //console.log() kann jeden Datentyp (auch objekte) in der Konsole ausgeben
    konsoleAusgeben(ausgabe: any): void {
        console.log(ausgabe);
    }
}



//am Ende jeder datei muss "export default ..." stehen,
//damit man das was in der Datei geschrieben wurde auch in anderen Dateien benutzen kann
//wenn man das nicht macht wird sich TypeScript auch beschwehren
export default Tutorial;