import IMemory from "../../interfaces/memory/IMemory";

/**
 * This VM has 64 KB of memory  => min.adr:0x0000 - max.adr:0xFFFF)
 * Each memory location contains 1 byte (8 bits) of data
 */


class Memory implements IMemory
{   

    // Singleton instance
    private static instance:Memory;

    // Properties
    private view:DataView;
    
    // Constructor
    private constructor()
    {
        const arrayBuffer = new ArrayBuffer(65536);
        this.view = new DataView(arrayBuffer);
    }

    // Methods

    // Singleton factory method
    public static getInstance = (): Memory =>
    {
        if(!Memory.instance)
        {
            Memory.instance = new Memory();
        }

        return Memory.instance;
    }

    public read = (adr:number): number => this.view.getUint8(adr);
    public write = (adr:number,data:number): void => this.view.setUint8(adr,data);

    // Debug
    public debug = (): void =>
    {
        console.log(this.view);
    }
}

export default Memory;