import IError from "../Error/IError";
import IToken from "../lexer/IToken";
import INode from "./INode";

interface IParser
{
    advance():void;
}

export default IParser;