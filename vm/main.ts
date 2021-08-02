// import ControlUnit from "./classes/cpu/ControlUnit";
// import Memory from "./classes/memory/Memory";
// import Registers from "./classes/cpu/Registers";
// import EADRMD from "./enums/EADRMD";
// import EIDEC from "./enums/EIDEC";
// import EREG from "./enums/EREG";


// const cu = ControlUnit.getInstance();
// const meo = Memory.getInstance();
// const regs =Registers.getInstance();


// meo.write(0x0000,0x1A);
// meo.write(0x0001,0x12);
// meo.write(0x0002,0x34);
// meo.write(0x0003,0xA0);
// meo.write(0x0004,0x00);
// meo.write(0x0005,0x0A);
// meo.write(0x0006,0x0E);



// const cycle = () =>
// {
//     cu.fetch();
//     let {ADRMD,IDEC} = cu.decode();
//     cu.execute(ADRMD,IDEC);
//     regs.debug();
//     console.log(EADRMD[ADRMD],EIDEC[IDEC]);
// }




// while(true)
// {
//     try
//     {
//         cycle();
//     }
//     catch(error)
//     {
//         break;
//     }
// }
// console.log(meo.read(0x000A).toString(16).padStart(4,'0'))
// console.log(meo.read(0x000B).toString(16).padStart(4,'0'))