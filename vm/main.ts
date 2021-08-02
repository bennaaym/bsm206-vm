import ALU from "./classes/cpu/ALU";


const alu = ALU.getInstance();


console.log(alu.com(0x1234).toString(16).padStart(4,'0'))