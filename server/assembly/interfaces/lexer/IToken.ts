import IPosition from "./IPosition";

interface IToken 
{
    getType():string;
    getValue():string;
    getPosition():IPosition;
}
export default IToken;