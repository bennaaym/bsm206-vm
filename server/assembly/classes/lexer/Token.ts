import IPosition from "../../interfaces/lexer/IPosition";
import IToken from "../../interfaces/lexer/IToken";

class Token implements IToken
{
    // Properties
    private type:string;
    private value:string;
    private position:IPosition;

    // Constructor
    constructor(type:string,value:string,position:IPosition)
    {
        this.type = type;
        this.value = value;
        this.position = position;
    }

    // Methods

    public getType     =   (): string => this.type;
    public getValue    =   (): string => this.value;
    public getPosition =   ():IPosition => this.position;

}

export default Token;