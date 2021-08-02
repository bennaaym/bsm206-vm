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

    
    public add = (reg_1:number,reg_2:number,carry:number):{sum:number,carry:number} => this.fullAdder.add16Bits(reg_1,reg_2,carry);
    public neg = (reg:number): {complement:number,carry:number} =>
    {
        const {sum,carry} = this.fullAdder.add16Bits((0xFFFF ^ reg),1,0);
        return {complement:sum,carry}
    }
}

export default ALU;