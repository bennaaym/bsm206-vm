import IError from "../error/IError";
import IToken from "../lexer/IToken";
import INode from "./INode";

interface IParser
{
    advance():void;
    parse():[INode[],IError|null]
}

export default IParser;