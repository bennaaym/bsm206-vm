/**
 * 60 different instructions can be defined on this VM 
 *
 */

enum EIDEC
{
    CLR     = 0B00001,      // clears the accumulator
    DECR    = 0B00010,      // decrements the accumulator by 1
    INCR    = 0B00011,      // decrements the accumulator by 1
    COM     = 0B00100,      // takes the accumulator value, calculates its 1's complement and saves it again to the accumulator 
    NEG     = 0B00101,
    LDA     = 0B01010,      // assigns the operand to the accumulator
    STA     = 0B10000,      // writes the value of the accumulator into memory
    NOP     = 0B11001,      // no operation, the program counter(PC) will be incremented by 1
    HLT     = 0B01110,      // stops the program
    
    // Arithmetic operations
    
    ADD     = 0B00000,
    ADDC    = 0B00001,      // it considers the carry flag while adding 
    SUB     = 0B01110,
    SUBC    = 0B01111,  
    DIV     = 0B00101,
    MUL     = 0B10101,
    // Logic operations

    AND     = 0B00010,
    OR      = 0B01011,
    XOR     = 0B00110,

}


export default EIDEC;