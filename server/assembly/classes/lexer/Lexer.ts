import EMNEMONIC from "../../enums/EMNEMONIC";
import ESYMBOL from "../../enums/ESYMBOL";
import ETOKEN from "../../enums/ETOKEN";
import IError from "../../interfaces/Error/IError";
import ILexer from "../../interfaces/lexer/ILexer";
import IPosition from "../../interfaces/lexer/IPosition";
import IToken from "../../interfaces/lexer/IToken";
import SyntaxError from "../Error/SyntaxError";
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

        while(this.current !== ETOKEN.EOF)
        {

            // checks mnemonics
            if(this.current.match(/[a-z]/i))
            {   
                let [token,error] = this.makeMnemonic();
                if(error) return [[],error];
                if(token) tokens.push(token);
            }

            // checks operands
            else if(this.current.match(/[0-9]/))
            {
                tokens.push(this.makeOperand());
            }

            // checks comments
            else if (this.current === ESYMBOL.SEMICOLON)
            {
                this.skipComment();
            }

            // checks special symbols
            else if((<any>Object).values(ESYMBOL).includes(this.current))
            {
                switch(this.current)
                {
                    case ESYMBOL.NL:        // checks new lines
                        tokens.push(new Token(ETOKEN.NL,this.position));
                        break;
                    
                    case ESYMBOL.TAG:       // checks tag symbols
                        tokens.push(new Token(ETOKEN.TAG,this.position));
                        break;

                    case ESYMBOL.ASTERISK:  // checks asterisk symbols
                        tokens.push(new Token(ETOKEN.ASTERISK,this.position));
                        break;

                    case ESYMBOL.TILDE:     // checks tilde sumbols
                        tokens.push(new Token(ETOKEN.TILDE,this.position));
                        break;

                    case ESYMBOL.LPAREN:    // checks left parenthesis
                        tokens.push(new Token(ETOKEN.LPAREN,this.position));
                        break;

                    case ESYMBOL.RPAREN:    // checks right parenthesis
                        tokens.push(new Token(ETOKEN.RPAREN,this.position));
                        break;    
                        
                    default: break;         // white spaces / tabs
                }

                this.advance();
            }

            // returns an error
            else
                return [[],new SyntaxError(`unexpected character '${this.current}'`,this.position)];
        }

        tokens.push(new Token(ETOKEN.EOF,this.position));
        return [tokens,null];
    }


    
    private makeMnemonic = () : [IToken|null,IError|null] =>
    {
        let mnemonic:string = '';
        const position:IPosition = this.position.copy();

        while(this.current !== ETOKEN.EOF && this.current.match(/[a-z]/i))
        {
            mnemonic += this.current;
            this.advance();
        }
        mnemonic = mnemonic.toUpperCase();

        // if the sequence of letters represents a mnemonic
        if((<any>Object).values(EMNEMONIC).includes(mnemonic))
        {
            return [new Token(ETOKEN.MNEMONIC,position,mnemonic),null];
        }

        return [null,new SyntaxError(`undefined mnemonic << ${mnemonic} >>`,position)];
    }

    private makeOperand = (): IToken =>
    {
        let operand:string = '';
        const position:IPosition = this.position.copy();

        while(this.current !== ETOKEN.EOF && this.current.match(/[0-9]/))
        {
            operand += this.current;
            this.advance();
        }
        return (new Token(ETOKEN.OPERAND,position,operand));
    }

    private skipComment = (): void =>
    {
        while(this.current !== ETOKEN.EOF && this.current !== ESYMBOL.NL) this.advance();
    }

}


export default Lexer;