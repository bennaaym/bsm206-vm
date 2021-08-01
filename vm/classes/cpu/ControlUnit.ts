import EREG from "../../enums/EREG";
import IControlUnit from "../../interfaces/cpu/IControlUnit";
import IRegister from "../../interfaces/cpu/IRegister";
import Registers from "./Registers";


class ControlUnit implements IControlUnit
{
    //Properties
    private PC:IRegister;
    private IR:IRegister;

    //Constructor
    constructor()
    {
        this.PC = Registers.getInstance().getRegister(EREG.PC);
        this.IR = Registers.getInstance().getRegister(EREG.IR);
    }

    //Methods

    public fetch = (): number => 0;
    
    public decode = (): {ADRMD:number,IDEC:number} => {return {'ADRMD':0,'IDEC':0}};

    public execute = (): void => console.log('execute');

}

export default ControlUnit;