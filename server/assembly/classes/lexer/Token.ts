import IToken from "../interfaces/IToken";

class Token implements IToken
{
    // Properties
    private type:string;
    private value:string;

    // Constructor
    constructor(type:string,value:string)
    {
        this.type = type;
        this.value = value;
    }

    // Methods

    public getType  = (): string => this.type;
    public getValue = (): string => this.value;

}

export default Token;