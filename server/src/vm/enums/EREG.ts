/**
 * This VM has 11 registers
 * IR and CCR registers are 8 bits registers
 * All the other registers are 16 bits registers
 */ 

enum EREG
{
    PC   =  'PC',     // Program Counter
    IR   =  'IR',     // Instruction Register (8 bits)
    DR   =  'DR',     // Data Register
    AR   =  'AR',     // Adress Register
    AC   =  'AC',     // Accumulator
    INR  =  'INR',    // Input Regiser
    OUTR =  'OUTR',   // Output Register
    TR   =  'TR',     // Temporary Regiser
    CCR  =  'CCR',    // Condition Code Regiset (8 bits)
    IX   =  'IX',     // Index Register
    SP   =  'SP',     // Stack Pointer
}

export default EREG;