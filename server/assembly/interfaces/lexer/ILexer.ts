import IError from "../Error/IError";
import IToken from "./IToken";

interface ILexer 
{
    advance():void;
    tokenize():[IToken[],IError|null];
}

export default ILexer;