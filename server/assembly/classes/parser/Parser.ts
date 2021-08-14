import ESYMBOL from "../../enums/ESYMBOL";
import ETOKEN from "../../enums/ETOKEN";
import IError from "../../interfaces/Error/IError";
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
        this.index++;
        if(this.index < this.tokens.length) this.current = this.tokens[this.index];
    }

    private expression = ():[INode|null,IError|null] =>
    {

        // checks new line tokens
        if(this.current.getType() === ETOKEN.NL) return [null,null];

        // checks mnemonic tokens
        else if(this.current.getType() === ETOKEN.MNEMONIC)
        {
            const mnemonic:IToken = this.current;
            this.advance();
            
            switch(this.current.getType())
            {
                case ETOKEN.NL : return this.makeNodeInherentMode(mnemonic);
                case ETOKEN.OPERAND : return this.makeNodeDirectMode(mnemonic);
                case ETOKEN.TAG : return this.makeNodeImmediateMode(mnemonic);
                case ETOKEN.ASTERISK :return this.makeNodeIndexMode(mnemonic);
                case ETOKEN.TILDE :return this.makeNodeRelativeMode(mnemonic);
                case ETOKEN.LPAREN : return this.makeNodeIndirectMode(mnemonic);
            }
        }

        return [null,null];
    }


    private makeNodeInherentMode = (mnemonic:IToken) : [INode|null,IError|null] =>
    {
        return [new Node(mnemonic),null];
    }

    private makeNodeDirectMode = (mnemonic:IToken):[INode|null,IError|null] =>
    {
        return [new Node(mnemonic,null,this.current),null];
    }

    private makeNodeImmediateMode = (mnemonic:IToken):[INode|null,IError|null] =>
    {
        const ADRMD:IToken = this.current;
        this.advance();

        if(this.current.getType() === ETOKEN.OPERAND)
        {
            return [new Node(mnemonic,ADRMD,this.current),null];
        }

        return [null,new SyntaxError(`expected an operand`,this.current.getPosition())]
    }

    private makeNodeIndexMode = this.makeNodeImmediateMode;
    private makeNodeRelativeMode = this.makeNodeImmediateMode;

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
                return [new Node(mnemonic,ADRMD,operand),null];
            }

            return [null,new SyntaxError(`expected '${ESYMBOL.RPAREN}'`,this.current.getPosition())]
        }

        return [null,new SyntaxError(`expected an operand`,this.current.getPosition())]

    }
}

export default Parser;