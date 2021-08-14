import IPosition from "../../interfaces/lexer/IPosition";
import IToken from "../../interfaces/lexer/IToken";

class Token implements IToken
{
    // Properties
    private type:string;
    private value:string|null;
    private position:IPosition;

    // Constructor
    constructor(type:string,position:IPosition,value:string|null=null)
    {
        this.type = type;
        this.value = value;
        this.position = position.copy();
    }

    // Methods

    public getType     =   (): string => this.type;
    public getValue    =   (): string|null => this.value;
    public getPosition =   ():IPosition => this.position;

}

export default Token;