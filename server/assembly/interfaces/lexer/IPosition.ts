interface IPosition
{
    advance(current:string):void;
    getLine():number;
    getIndex():number;
    getColumn():number;
}

export default IPosition;