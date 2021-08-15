import IError from "../../interfaces/error/IError";
import IPosition from "../../interfaces/lexer/IPosition";

abstract class Error implements IError 
{
   // Properties
    protected name:string;
    protected details:string;
    protected position:IPosition;

   // Constructor
    constructor(name:string,details:string,position:IPosition)
    {
        this.name = name;
        this.details = details;
        this.position = position.copy();
    }

   // Methods

   public get = (): string => `${this.name} : ${this.details} | line : ${this.position.getLine()}  column : ${this.position.getColumn()}`;
   
}


export default Error;