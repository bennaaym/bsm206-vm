// import CPU from "./classes/cpu/CPU";
// import Memory from "./classes/memory/Memory";
// import EIDEC from "./enums/EIDEC";


// const memory = Memory.getInstance();

// const cpu = CPU.getInstance();


// memory.write(0x0000,0x2A);
// memory.write(0x0001,0x00);
// memory.write(0x0002,0x04);
// memory.write(0x0003,0x0E);
// memory.write(0x0004,0x56);
// memory.write(0x0005,0x34);



// while(true)
// {
//     try
//     {
//         cpu.instructionCycle();
//         cpu.debug();
//     }
//     catch(error)
//     {
//         if(error === EIDEC.HLT) break;
//     }
// }