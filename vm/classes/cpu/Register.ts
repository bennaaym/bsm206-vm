import IRegister from "../../interfaces/cpu/IRegister";


class Register implements IRegister
{

    // Properties
    private view:DataView;
    
    // Constructor
    constructor(sizeInBytes:number = 2)
    {
        const arrayBuffer = new ArrayBuffer(sizeInBytes);
        this.view = new DataView(arrayBuffer);
    }

    // Methods
    public read     = (): number => (this.view.byteLength === 1)? this.view.getUint8(0) : this.view.getUint16(0);
    public readMSB  = (): number => this.view.getUint8(0);
    public readLSB  = (): number => (this.view.byteLength === 1)? this.view.getUint8(0) : this.view.getUint8(1);
    public write    = (data:number): void => (this.view.byteLength ===1)? this.view.setUint8(0,data) : this.view.setUint16(0,data);
    public writeMSB = (data:number): void => this.view.setInt8(0,data);
    public writeLSB = (data:number): void => (this.view.byteLength === 1)? this.view.setUint8(0,data) : this.view.setUint8(1,data);;
    public increment = (): void => this.write(this.read() + 1);
    public sizeInBytes = ():number => this.view.byteLength;
    
    //Debug
    public debug = ():void => console.log(this.view);
    
}

export default Register;