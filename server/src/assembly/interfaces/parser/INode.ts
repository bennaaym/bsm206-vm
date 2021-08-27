import IToken from "../lexer/IToken";

interface INode
{
    getMnemonic():IToken;
    getADRMD():IToken|null;
    getOperand():IToken|null;
}

export default INode;