import IToken from "../../interfaces/lexer/IToken";
import INode from "../../interfaces/parser/INode";

class Node implements INode
{
    // Properties
    private mnemonic:IToken;
    private ADRMD:IToken|null;
    private operand:IToken|null;

    // Constructor
    constructor(mnemonic:IToken,ADRMD:IToken|null= null,operand:IToken|null = null)
    {
        this.mnemonic = mnemonic;
        this.ADRMD = ADRMD;
        this.operand = operand;
    }

    // Merhods

    public getMnemonic = (): IToken => this.mnemonic;
    public getADRMD    = (): IToken|null => this.ADRMD;
    public getOperand  = (): IToken|null => this.operand;

}

export default Node;