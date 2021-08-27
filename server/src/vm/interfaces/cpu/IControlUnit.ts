interface IControlUnit
{
    fetch():void;
    decode():{ADRMD:number,IDEC:number};
    execute(ADRMD:number,IDEC:number):void;
}

export default IControlUnit;