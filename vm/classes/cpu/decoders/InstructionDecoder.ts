import EIDEC from "../../../enums/EIDEC";
import IDecoder from "../../../interfaces/cpu/IDecoder";

/**
 * In this VM the  0th, 1st, 2nd, 3rd ,and 7th bits of the opcode (reading from right to left) represent the instruction
 * 
 */

class InstructionDecoder implements IDecoder
{
    // Methods
    public decode = (opcode:number): number =>
    {
        const strOpcde = opcode.toString(2).padStart(8,'0');
        const IDEC:number = parseInt(strOpcde[0] + strOpcde.substr(4,7),2);

        switch(IDEC)
        {
            case EIDEC.CLR          :   return EIDEC.CLR;
            case EIDEC.DECR         :   return EIDEC.DECR;
            case EIDEC.INCR         :   return EIDEC.INCR;
            case EIDEC.COM          :   return EIDEC.COM;
            case EIDEC.NEG          :   return EIDEC.NEG;
            case EIDEC.SAR          :   return EIDEC.SAR;
            case EIDEC.SAL          :   return EIDEC.SAL;
            case EIDEC.CLC          :   return EIDEC.CLC;
            case EIDEC.CLI          :   return EIDEC.CLI;
            case EIDEC.CLV          :   return EIDEC.CLV;
            case EIDEC.STC          :   return EIDEC.STC;
            case EIDEC.STI          :   return EIDEC.STI;
            case EIDEC.STV          :   return EIDEC.STV;
            case EIDEC.HLT          :   return EIDEC.HLT;

            case EIDEC.LDA          :   return EIDEC.LDA;
            case EIDEC.STA          :   return EIDEC.STA;
            case EIDEC.LDAX         :   return EIDEC.LDAX;

            case EIDEC.ADD          :   return EIDEC.ADD;
            case EIDEC.ADDC         :   return EIDEC.ADDC;
            case EIDEC.SUB          :   return EIDEC.SUB;
            case EIDEC.SUBC         :   return EIDEC.SUBC;
            case EIDEC.DIV          :   return EIDEC.DIV;
            case EIDEC.MUL          :   return EIDEC.MUL;
            case EIDEC.AND          :   return EIDEC.AND;
            case EIDEC.OR           :   return EIDEC.OR;
            case EIDEC.XOR          :   return EIDEC.XOR;
            default                 :   return EIDEC.NOP;
            
            
        }
    }
}


export default InstructionDecoder;