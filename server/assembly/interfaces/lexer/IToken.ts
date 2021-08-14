import IPosition from "./IPosition";

interface IToken 
{
    getType():string;
    getValue():string|null;
    getPosition():IPosition;
}
export default IToken;