import IToken from "../../interfaces/lexer/IToken";
import INode from "../../interfaces/parser/INode";

class Node implements INode
{
    // Properties
    private mnemonic:IToken;
    private ADRMD:IToken;
    private operand:IToken;

    // Constructor
    constructor(mnemonic:IToken,ADRMD:IToken,operand:IToken)
    {
        this.mnemonic = mnemonic;
        this.ADRMD = ADRMD;
        this.operand = operand;
    }

    // Merhods

    public getMnemonic = (): IToken => this.mnemonic;
    public getADRMD    = (): IToken => this.ADRMD;
    public getOperand  = (): IToken => this.operand;

}

export default Node;