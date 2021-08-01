interface IRegister
{
    read():number; // reads the data stored inside the register
    readMSB():number; // reads the most significant byte of the register
    readLSB():number; // reads the least significant byte of the register
    write(data:number):void // writes the data into the register
    writeMSB(data:number):void // writes the data into the most significant byte of the register 
    writeLSB(data:number):void // writes the data into the least significant byte of the register 
    increment():void // increments the content of the register by one
}

export default IRegister;