interface IMemory
{
    read(adr:number):number; // reads the byte located at the specified address 
    write(adr:number,data:number):void; // writes data into the specified address 
}

export default IMemory;