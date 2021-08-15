import EFLAG from "../../../enums/EFLAG";
import EREG from "../../../enums/EREG";
import IALU from "../../../interfaces/cpu/IALU";
import IRegisters from "../../../interfaces/cpu/IRegisters";
import IMemory from "../../../interfaces/memory/IMemory";
import Memory from "../../memory/Memory";
import ALU from "../ALU";
import Registers from "../Registers";
import ImmediateModeExecutor from "./factory/ImmediateModeExecutor";


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

    protected minCommonSteps   = () =>{};
    protected maxCommonSteps   = () =>{};

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

    protected SUB = () =>
    {
        this.maxCommonSteps();
        
        // T_LAST : AC <- AC + DR , C <- C_out
        const DR = this.registersRef.getRegister(EREG.DR);
        const AC = this.registersRef.getRegister(EREG.AC);
        const CCR = this.registersRef.getRegister(EREG.CCR);
        const {sub,carry} = this.ALURef.sub(DR.read(),AC.read(),0);
        AC.write(sub);
        CCR.setFlag(EFLAG.C,carry);
        CCR.setFlag(EFLAG.Z,this.ALURef.cmp(AC.read()));
    }

    protected SUBC = () =>
    {
        this.maxCommonSteps();
        // T_LAST : AC <- AC + DR + C, C <- C_out
        const DR = this.registersRef.getRegister(EREG.DR);
        const AC = this.registersRef.getRegister(EREG.AC);
        const CCR = this.registersRef.getRegister(EREG.CCR);
        const {sub,carry} = this.ALURef.sub(DR.read(),AC.read(),CCR.getFlag(EFLAG.C)!);
        AC.write(sub);
        CCR.setFlag(EFLAG.C,carry);
        CCR.setFlag(EFLAG.Z,this.ALURef.cmp(AC.read()));
    }


    protected DIV = () =>
    {
        this.maxCommonSteps();
        // T_LAST : AC <- AC + DR + C, C <- C_out
        const DR = this.registersRef.getRegister(EREG.DR);
        const AC = this.registersRef.getRegister(EREG.AC);
        const {quotient,remainder} = this.ALURef.div(AC.read(),DR.read());
        AC.write(quotient);
        DR.write(remainder);
    }

    protected MUL = () =>
    {
        this.maxCommonSteps();
        // T_LAST : AC <- AC + DR + C, C <- C_out
        const DR = this.registersRef.getRegister(EREG.DR);
        const AC = this.registersRef.getRegister(EREG.AC);
        const res = this.ALURef.mult(AC.readLSB(),DR.readLSB());
        AC.write(res);
    }


    protected AND = () =>
    {
        this.maxCommonSteps();

        // T_LAST : AC <- AC & DR
        const DR = this.registersRef.getRegister(EREG.DR);
        const AC = this.registersRef.getRegister(EREG.AC);
        const res = this.ALURef.and(AC.read(),DR.read());
        AC.write(res);
    }

    protected OR = () =>
    {
        this.maxCommonSteps();

        // T_LAST : AC <- AC & DR
        const DR = this.registersRef.getRegister(EREG.DR);
        const AC = this.registersRef.getRegister(EREG.AC);
        const res = this.ALURef.or(AC.read(),DR.read());
        AC.write(res);
    }

    protected XOR = () =>
    {
        this.maxCommonSteps();

        // T_LAST : AC <- AC & DR
        const DR = this.registersRef.getRegister(EREG.DR);
        const AC = this.registersRef.getRegister(EREG.AC);
        const res = this.ALURef.xor(AC.read(),DR.read());
        AC.write(res);
    }


    protected LDAX () 
    {
        this.minCommonSteps();

        // T_BEFORE_LAST : IX_H <- M[AR] , AR <- AR + 1
        const IX = this.registersRef.getRegister(EREG.IX);
        const AR = this.registersRef.getRegister(EREG.AR);
        let data = this.memoryRef.read(AR.read());
        IX.writeMSB(data);
        AR.increment();
        // T_LAST : IX_L <- M[AR]
        data = this.memoryRef.read(AR.read());
        IX.writeLSB(data);
    }

    protected STAX = () =>
    {
        this.minCommonSteps();

        // T_BEFORE_LAST :M[AR] <- IX_H , AR <- AR + 1
        const IX = this.registersRef.getRegister(EREG.IX);
        const AR = this.registersRef.getRegister(EREG.AR);
        this.memoryRef.write(AR.read(),IX.readMSB())
        AR.increment();
        // T_BEFORE_LAST :M[AR] <- IX_L 
        this.memoryRef.write(AR.read(),IX.readLSB())

    }   

}

export default BaseExecutor;