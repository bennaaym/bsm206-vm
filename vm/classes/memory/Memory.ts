import IMemory from "../../interfaces/IMemory";

/**
 * This VM has 64 KB of memory  => min.adr:0x0000 - max.adr:0xFFFF)
 * Each memory location contains 1 byte (8 bits) of data
 */


class Memory implements IMemory
{
    //Properties
    private view:DataView;
    
    //Methods
    constructor()
    {
        const arrayBuffer = new ArrayBuffer(65536);
        this.view = new DataView(arrayBuffer);
    }

    public read = (adr:number): number => this.view.getUint8(adr);
    public write = (adr:number,data:number): void => this.view.setUint8(adr,data);
}

export default Memory;