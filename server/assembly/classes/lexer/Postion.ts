import IPosition from "../../interfaces/lexer/IPosition";

class Postion implements IPosition
{
    // Properties
    private index:number;
    private column:number;
    private line:number;

    // Constructor
    constructor(index:number = 0,column:number = 0,line:number = 0)
    {
        this.index = index;
        this.column = column;
        this.line = line;
    }

    // Methods

    public advance = (current:string): void =>
    {
        this.index++;
        this.column++;
        
        if(current === '\n')
        {
            this.line++;
            this.column = 0;
        } 
    }

    public getLine   = (): number => this.line;
    public getColumn = (): number => this.column;
}


export default Postion;