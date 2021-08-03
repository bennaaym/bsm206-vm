import EFLAG from "../../../enums/EFLAG";
import EREG from "../../../enums/EREG";
import IALU from "../../../interfaces/cpu/IALU";
import IRegisters from "../../../interfaces/cpu/IRegisters";
import IMemory from "../../../interfaces/memory/IMemory";
import Memory from "../../memory/Memory";
import ALU from "../ALU";
import Registers from "../Registers";


abstract class BaseExecutor
{
    // Properties
    protected IDEC:number;
    protected memoryRef : IMemory;
    protected registersRef :IRegisters;
    protected ALURef:IALU;

    // Constructors
    constructor(IDEC:number)
    {
        this.memoryRef = Memory.getInstance();
        this.registersRef = Registers.getInstance();
        this.ALURef = ALU.getInstance();
        this.IDEC = IDEC;
    }

    // Methods

    protected minCommonSteps = () =>{};
    protected maxCommonSteps = () =>{};

    protected LDA = () =>
    {
       this.maxCommonSteps();

        // T_LAST : AC <- DR
        const DR = this.registersRef.getRegister(EREG.DR);
        this.registersRef.getRegister(EREG.AC).write(DR.read());
    }

    protected STA = () =>
    {
        this.minCommonSteps();

        // T_BEFORE_LAST : M[AR] <- AC_H, AR <- AR + 1
        const AC = this.registersRef.getRegister(EREG.AC) 
        const AR = this.registersRef.getRegister(EREG.AR);
        this.memoryRef.write(AR.read(),AC.readMSB());
        AR.increment();

        // T_LAST : M[AR] <- AC_L
        this.memoryRef.write(AR.read(),AC.readLSB());
    }

    protected ADD = () =>
    {
        this.maxCommonSteps();
        
        // T_LAST : AC <- AC + DR , C <- C_out
        const DR = this.registersRef.getRegister(EREG.DR);
        const AC = this.registersRef.getRegister(EREG.AC);
        const CCR = this.registersRef.getRegister(EREG.CCR);
        const {sum,carry} = this.ALURef.add(AC.read(),DR.read(),0);
        AC.write(sum);
        CCR.setFlag(EFLAG.C,carry);
    }

    protected ADDC = () =>
    {
        this.maxCommonSteps();
        // T_LAST : AC <- AC + DR + C, C <- C_out
        const DR = this.registersRef.getRegister(EREG.DR);
        const AC = this.registersRef.getRegister(EREG.AC);
        const CCR = this.registersRef.getRegister(EREG.CCR);
        const {sum,carry} = this.ALURef.add(AC.read(),DR.read(),CCR.getFlag(EFLAG.C)!);
        AC.write(sum);
        CCR.setFlag(EFLAG.C,carry);
    }
}

export default BaseExecutor;