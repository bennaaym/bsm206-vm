import EADRMD from "../../../enums/EADRMD";
import IExecutor from "../../../interfaces/cpu/IExecutor";
import DirectModeExecutor from "./DirectModeExecutor";
import ImmediateModeExecutor from "./ImmediateModeExecutor";
import IndexModeExecutor from "./IndexModeExecutor";
import IndirectModeExecutor from "./IndirectModeExecutor";
import InherentModeExecutor from "./InherentModeExecutor";
import RelativeModeExecutor from "./RelativeModeExecutor";

class ExecutorFactory 
{
    // Methods

    public getExecutor = (ADRMD:number,IDEC:number):IExecutor =>
    {
        switch(ADRMD)
        {
            case EADRMD.IMMEDIATE : return new ImmediateModeExecutor(IDEC);
            case EADRMD.DIRECT    : return new DirectModeExecutor(IDEC);
            case EADRMD.INDIRECT  : return new IndirectModeExecutor(IDEC);
            case EADRMD.INDEX     : return new IndexModeExecutor(IDEC);
            case EADRMD.RELATIVE  : return new RelativeModeExecutor(IDEC);
            default               : return new InherentModeExecutor(IDEC);
        }
    }
}

export default ExecutorFactory;