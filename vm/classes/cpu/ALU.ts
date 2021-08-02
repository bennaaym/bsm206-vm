import IALU from "../../interfaces/cpu/IALU";
import IFullAdder from "../../interfaces/cpu/IFullAdder";
import FullAdder from "./fullAdder/FullAdder";

class ALU implements IALU
{
    // Singleton instance
    private static instance:ALU;

    // Properties
    private fullAdder:IFullAdder;

    // Constructor  
    private constructor()
    {
        this.fullAdder = FullAdder.getInstance();
    }

    // Methods
    public static getInstance = (): ALU =>
    {
        if(!ALU.instance)
        {
            ALU.instance = new ALU();
        }

        return ALU.instance;
    }

    
    public add = (AC:number,DR:number,carry:number):{sum:number,carry:number} => this.fullAdder.add16Bits(AC,DR,carry);
    
}

export default ALU;