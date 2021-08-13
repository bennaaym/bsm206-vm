import ESYMBOL from "../../enums/ESYMBOL";
import ETOKEN from "../../enums/ETOKEN";
import IError from "../../interfaces/Error/IError";
import ILexer from "../../interfaces/lexer/ILexer";
import IPosition from "../../interfaces/lexer/IPosition";
import IToken from "../../interfaces/lexer/IToken";
import Postion from "./Postion";
import Token from "./Token";

class Lexer implements ILexer
{
    // Properties
    private input:string;
    private current:string;
    private position:IPosition;

    // Constructor
    constructor(input:string)
    {
        this.input = input;
        this.current = ETOKEN.EOF;
        this.position = new Postion();
        this.advance();
    }

    // Methods
    public advance = (): void =>
    {
        this.position.advance(this.current);
        this.current = (this.position.getIndex() < this.input.length)? this.input[this.position.getIndex()]:ETOKEN.EOF;
    }

    public tokenize = (): [IToken[]|[],IError|null] =>
    {
        let tokens:IToken[] = [];
        let error:IError|null = null;
        while(this.current !== ETOKEN.EOF)
        {
            // ignores white spaces and tabs
            if(this.current === ESYMBOL.WS || this.current === ESYMBOL.TAB)
                this.advance();
            
            // catches new lines
            if(this.current === ESYMBOL.NL)
            {
                tokens.push(new Token(ETOKEN.NL,this.position));
                this.advance();
            }

            else
                this.advance();

        }

        tokens.push(new Token(ETOKEN.EOF,this.position));
        return [tokens,error];
    }

}


export default Lexer;