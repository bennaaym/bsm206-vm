import EADRMD from "../../../enums/EADRMD";
import IDecoder from "../../../interfaces/cpu/IDecoder";

/**
 * 
 * In this VM the  4th, 5th ,and 6th bits of the opcode (reading from right to left) represent the addressing mode
 */

class AddressingModeDecoder implements IDecoder
{   
    // Methods
    public decode = (opcode:number): number =>
    {
        const ADRMD:number = parseInt(opcode.toString(2).padStart(8,'0').substr(1,3),2);

        switch(ADRMD)
        {
            case EADRMD.IMMEDIATE   :   return EADRMD.IMMEDIATE;
            case EADRMD.DIRECT      :   return EADRMD.DIRECT;
            case EADRMD.INDIRECT    :   return EADRMD.INDIRECT;
            case EADRMD.INDEX       :   return EADRMD.INDEX;
            case EADRMD.RELATIVE    :   return EADRMD.RELATIVE;
            default                 :   return EADRMD.INHERENT
        }
    }

}

export default AddressingModeDecoder;