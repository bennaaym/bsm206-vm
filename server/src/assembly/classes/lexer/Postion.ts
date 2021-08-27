import IPosition from "../../interfaces/lexer/IPosition";

class Postion implements IPosition
{
    // Properties
    private index:number;
    private column:number;
    private line:number;

    // Constructor
    constructor(index:number = -1,column:number = -1,line:number = 1)
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
    public getIndex  = (): number => this.index;
    public getColumn = (): number => this.column;
    public copy = () : IPosition => new Postion(this.index,this.column,this.line);
}


export default Postion;