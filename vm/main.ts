// import CPU from "./classes/cpu/CPU";
// import Memory from "./classes/memory/Memory";
// import EIDEC from "./enums/EIDEC";


// const memory = Memory.getInstance();

// const cpu = CPU.getInstance();


// memory.write(0x0000,0x1A);
// memory.write(0x0001,0x12);
// memory.write(0x0002,0x34);

// memory.write(0x0003,0x3B);
// memory.write(0x0004,0x56);
// memory.write(0x0005,0x78);

// memory.write(0x0006,0x0E);
// memory.write(0x5678,0x11);
// memory.write(0x5679,0x11);
// memory.write(0x1111,0xed);
// memory.write(0x1112,0xcb);




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

// console.log(memory.read(0x5678).toString(16).padStart(4,'0'));
// console.log(memory.read(0x5679).toString(16).padStart(4,'0'));


