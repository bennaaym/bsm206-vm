import IExecutor from "../../../interfaces/cpu/IExecutor";

class ImmediateModeExecutor implements IExecutor
{
    // Properties
    private IDEC:number;

    // Constructor  
    constructor(IDEC:number)
    {
        this.IDEC = IDEC;
    }
    // Methods

    public execute = (): void => console.log('immediate mode executor');
}

export default ImmediateModeExecutor;