import IALU from "../../interfaces/cpu/IALU";

class ALU implements IALU
{
    // Singleton instance
    private static instance:ALU;

    // Constructor
    private constructor(){}

    // Methods
    public static getInstance = (): ALU =>
    {
        if(!ALU.instance)
        {
            ALU.instance = new ALU();
        }

        return ALU.instance;
    }

    public ADD = (AC:number,DR:number,carry:number): number => AC + DR + carry;
    
}

export default ALU;