import IError from "../../../assembly/interfaces/error/IError";

abstract class Error implements IError
{
    // Properties
    private name:string;
    private details:string;
    // Constructor
    constructor(name:string,details:string)
    {
        this.name = name;
        this.details = details;
    }

    // Methods
    public get = (): string => `${this.name} : ${this.details}`;
   

}

export default Error;