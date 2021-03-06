import IControlUnit from "../../interfaces/cpu/IControlUnit";
import ICPU from "../../interfaces/cpu/ICPU";
import ControlUnit from "./ControlUnit";
import Registers from "./Registers";

class CPU implements ICPU
{
    // Singleton instance
    private static instance : CPU;

    // Properties
    private controlUnit:IControlUnit;

    // Constructor
    private constructor()
    {
        this.controlUnit = ControlUnit.getInstance();
    }

    // Methods
    public static getInstance = (): CPU =>
    {
        if(!CPU.instance)
        {
            CPU.instance = new CPU();
        }

        return CPU.instance;
    }

    public instructionCycle = (): void =>
    {
        this.controlUnit.fetch();
        const {ADRMD,IDEC} = this.controlUnit.decode();
        this.controlUnit.execute(ADRMD,IDEC);
    }

    public reset = (): ICPU => 
    {
        Registers.getInstance().reset();
        return CPU.instance;
    }
}

export default CPU;