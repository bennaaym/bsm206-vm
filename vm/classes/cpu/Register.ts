import EFLAG from "../../enums/EFLAG";
import EREG from "../../enums/EREG";
import IRegister from "../../interfaces/cpu/IRegister";


class Register implements IRegister
{

    // Properties
    private name:string;
    private view:DataView;
    
    // Constructor
    constructor(name:string)
    {
        const arrayBuffer = (name === EREG.IR || name === EREG.CCR)? new ArrayBuffer(1) : new ArrayBuffer(2);
        this.view = new DataView(arrayBuffer);
        this.name = name;
    }

    // Methods
    public read     = (): number => (this.view.byteLength === 1)? this.view.getUint8(0) : this.view.getUint16(0);
    public readMSB  = (): number => this.view.getUint8(0);
    public readLSB  = (): number => (this.view.byteLength === 1)? this.view.getUint8(0) : this.view.getUint8(1);
    public write    = (data:number): void => (this.view.byteLength ===1)? this.view.setUint8(0,data) : this.view.setUint16(0,data);
    public writeMSB = (data:number): void => this.view.setInt8(0,data);
    public writeLSB = (data:number): void => (this.view.byteLength === 1)? this.view.setUint8(0,data) : this.view.setUint8(1,data);
    public increment = (): void => this.write(this.read() + 1);
    public decrement = (): void => this.write(this.read() - 1);
    public sizeInBytes = ():number => this.view.byteLength;

    public getFlag  = (flag:number): number|void => 
    {
        if(this.name === EREG.CCR)
        {
            return ((this.read() & (1 << flag)) > 0)? 1 : 0;
        }
    };

    public setFlag = (flag:number,bit:number) : void =>
    {
        const CCR = this.read().toString(2).padStart(8,'0');
        let byte = '';
        
        for(let i = CCR.length - 1 ;i>=0;i--)
        {
            if(i === (CCR.length - flag - 1))
                byte = bit + byte;
            else
                byte = CCR[i] + byte;
        }

        this.write(parseInt(byte,2));
    };

    //Debug 
    public debug = ():void => console.log(this.view);
    
}

export default Register;