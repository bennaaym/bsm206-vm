import IToken from "../../interfaces/lexer/IToken";
import IParser from "../../interfaces/parser/IParser";

class Parser implements IParser
{
    // Properties
    private tokens:IToken[];
    private current:IToken;
    private index:number;

    // Constructor
    constructor(tokens:IToken[])
    {
        this.tokens = tokens;
        this.index = -1;
        this.advance();
    }

    // Methods

    public advance = (): void =>
    {
        this.index++;
        if(this.index < this.tokens.length) this.current = this.tokens[this.index]  
    }
}

export default Parser;