import IPosition from "../../interfaces/lexer/IPosition";
import IToken from "../../interfaces/lexer/IToken";

class Token implements IToken
{
    // Properties
    private type:string;
    private value:string;
    private position:IPosition;

    // Constructor
    constructor(type:string,position:IPosition,value:string='')
    {
        this.type = type;
        this.value = value;
        this.position = position.copy();
    }

    // Methods

    public getType     =   (): string => this.type;
    public getValue    =   (): string => this.value;
    public getPosition =   ():IPosition => this.position;

}

export default Token;