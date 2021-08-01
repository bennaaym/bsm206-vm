import EADRMD from "../../../enums/EADRMD";
import IExecutor from "../../../interfaces/cpu/IExecutor";
import DirectModeExecutor from "./factory/DirectModeExecutor";
import ImmediateModeExecutor from "./factory/ImmediateModeExecutor";
import IndexModeExecutor from "./factory/IndexModeExecutor";
import IndirectModeExecutor from "./factory/IndirectModeExecutor";
import InherentModeExecutor from "./factory/InherentModeExecutor";
import RelativeModeExecutor from "./factory/RelativeModeExecutor";

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