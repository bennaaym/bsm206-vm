import IPosition from "./IPosition";

interface IToken 
{
    getType():string;
    getValue():string|null;
    getPositionStart():IPosition;
    getPositionEnd():IPosition;
}
export default IToken;