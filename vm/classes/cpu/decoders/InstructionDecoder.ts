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
            case EIDEC.LDA          :   return EIDEC.LDA;
            case EIDEC.STA          :   return EIDEC.STA;
            case EIDEC.HLT          :   return EIDEC.HLT;
            case EIDEC.ADD          :   return EIDEC.ADD;
            case EIDEC.ADDC         :   return EIDEC.ADDC;
            default                 :   return EIDEC.NOP;
            
        }
    }
}


export default InstructionDecoder;