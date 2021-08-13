interface IPosition
{
    advance(current:string):void;
    getLine():number;
    getIndex():number;
    getColumn():number;
    copy():IPosition;
}

export default IPosition;