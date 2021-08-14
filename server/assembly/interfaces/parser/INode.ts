import IToken from "../lexer/IToken";

interface INode
{
    getMnemonic():IToken;
    getADRMD():IToken;
    getOperand():IToken;
}

export default INode;