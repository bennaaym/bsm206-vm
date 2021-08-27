import IPosition from "../../interfaces/lexer/IPosition";
import IToken from "../../interfaces/lexer/IToken";

class Token implements IToken
{
    // Properties
    private type:string;
    private value:string|null;
    private positionStart:IPosition;
    private positionEnd:IPosition;

    // Constructor
    constructor(type:string,positionStart:IPosition,positionEnd:IPosition,value:string|null=null)
    {
        this.type = type;
        this.value = value;
        this.positionStart = positionStart.copy();
        this.positionEnd = positionEnd.copy();
    }

    // Methods

    public getType          =   (): string      => this.type;
    public getValue         =   (): string|null => this.value;
    public getPositionStart =   (): IPosition   => this.positionStart;
    public getPositionEnd   =   (): IPosition   => this.positionEnd

}

export default Token;