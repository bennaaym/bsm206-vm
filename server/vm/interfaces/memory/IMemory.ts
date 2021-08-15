interface IMemory
{
    read(adr:number):number; // reads the byte located at the specified address 
    write(adr:number,data:number):void; // writes data into the specified address 
    sizeInBytes():number // returns the size of the register in bytes

}

export default IMemory;