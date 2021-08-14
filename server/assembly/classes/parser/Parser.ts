import ESYMBOL from "../../enums/ESYMBOL";
import ETOKEN from "../../enums/ETOKEN";
import IError from "../../interfaces/Error/IError";
import IPosition from "../../interfaces/lexer/IPosition";
import IToken from "../../interfaces/lexer/IToken";
import INode from "../../interfaces/parser/INode";
import IParser from "../../interfaces/parser/IParser";
import SyntaxError from "../Error/SyntaxError";
import Node from "./Node";

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
        if(this.index < this.tokens.length) this.current = this.tokens[++this.index];
    }


    // parses an expression and returns a Node instance
    private expression = ():[INode|null,IError|null] =>
    {

        // checks new line tokens
        if(this.current.getType() === ETOKEN.NL)
        {
            this.advance();
            return [null,null];
        }

        // checks mnemonic tokens
        else if(this.current.getType() === ETOKEN.MNEMONIC)
        {
            const mnemonic:IToken = this.current;
            this.advance();
            
            switch(this.current.getType())
            {

                case ETOKEN.NL : 
                case ETOKEN.MNEMONIC:return this.makeNodeInherentMode(mnemonic);
                case ETOKEN.OPERAND : return this.makeNodeDirectMode(mnemonic);
                case ETOKEN.LPAREN : return this.makeNodeIndirectMode(mnemonic);
                case ETOKEN.TAG : 
                case ETOKEN.ASTERISK :
                case ETOKEN.TILDE :return this.makeNodeOtherModes(mnemonic);
            }
        }

        return [null,new SyntaxError(`expected a mnemonic`,this.current.getPositionStart())];
    }



    private makeNodeInherentMode = (mnemonic:IToken) : [INode|null,IError|null] =>
    {
        const node = new Node(mnemonic);
        const error = this.nextTokenIsNLOrEOF(mnemonic.getPositionEnd());
        if(error)  return [null,error];
        return [node,null];
    }

    private makeNodeDirectMode = (mnemonic:IToken):[INode|null,IError|null] =>
    {
        const node:INode = new Node(mnemonic,null,this.current);
        const error = this.nextTokenIsNLOrEOF();
        if(error) return [null,error];
        return [node,null];
    }


    private makeNodeIndirectMode = (mnemonic:IToken):[INode|null,IError|null] =>
    {
        const ADRMD:IToken = this.current;
        this.advance();

        if(this.current.getType() === ETOKEN.OPERAND)
        {
            const operand:IToken = this.current;
            this.advance();

            if(this.current.getType() === ETOKEN.RPAREN)
            {
                const node:INode = new Node(mnemonic,ADRMD,operand);
                const error = this.nextTokenIsNLOrEOF();
                if(error) return [null,error];
                return [node,null];
            }

            return [null,new SyntaxError(`expected '${ESYMBOL.RPAREN}'`,this.current.getPositionStart())]
        }

        return [null,new SyntaxError(`expected an operand`,this.current.getPositionStart())]
    }

    private makeNodeOtherModes = (mnemonic:IToken):[INode|null,IError|null] =>
    {
        const ADRMD:IToken = this.current;
        this.advance();

        if(this.current.getType() === ETOKEN.OPERAND)
        {
            const node:INode = new Node(mnemonic,ADRMD,this.current);
            const error = this.nextTokenIsNLOrEOF();
            if(error) return [null,error];
            return [node,null];
        }

        return [null,new SyntaxError(`expected an operand`,this.current.getPositionStart())]
    }

    // checks if the next token is a newline token or EOF token
    private nextTokenIsNLOrEOF = (position:IPosition = this.current.getPositionEnd()):IError|null =>
    {
        this.advance();
        if(this.current.getType() === ETOKEN.NL || this.current.getType() === ETOKEN.EOF) return null;
        return new SyntaxError(`expected a newline`,position);
    }
}

export default Parser;