interface IPosition
{
    advance(current:string):void;
    getLine():number;
    getColumn():number;
}

export default IPosition;