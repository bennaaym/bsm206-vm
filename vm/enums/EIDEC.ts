/**
 * 60 different instructions can be defined on this VM 
 *
 */

enum EIDEC
{
    LDA     = 0B01010,      // assigns the operand to the accumulator
    STA     = 0B10000,      // writes the value of the accumulator into memory
    NOP     = 0B11001,      // no operation, the program counter(PC) will be incremented by 1
    HLT     = 0B01110,      // stops the program

    // Arithmetic operations
    
    ADD     = 0B00000,      
    
}


export default EIDEC;