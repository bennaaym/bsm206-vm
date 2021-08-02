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

    
    // Arithmetic operations
    public add = (reg_1:number,reg_2:number,carry:number):{sum:number,carry:number} => this.fullAdder.add16Bits(reg_1,reg_2,carry);
    public mult = (reg_1:number,reg_2:number): number => reg_1 * reg_2;
    public div = (reg_1:number,reg_2:number): {quotient:number,remainder:number} => 
    {
        return {
            quotient: Math.floor(reg_1 / reg_2),
            remainder: reg_1 % reg_2
        }   
    }


    // Logic operations
    public neg = (reg:number): number =>
    {
        const {sum:complement} = this.fullAdder.add16Bits((0xFFFF ^ reg),1,0);
        return complement;  
    }

    public com = (reg:number): number => 0xFFFF ^ reg;
    public and = (reg_1:number,reg_2:number): number => reg_1 & reg_2;
    public or = (reg_1:number,reg_2:number): number => reg_1 | reg_2;
    public xor = (reg_1:number,reg_2:number): number => reg_1 ^ reg_2;
    public shl = (reg:number): number => reg << 1;
    public shr = (reg:number): number => reg >>> 1;
    
}

export default ALU;