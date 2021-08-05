/**
 * 60 different instructions can be defined on this VM 
 *
 */

enum EIDEC
{
    CLR     = 0B00001,      // clears the accumulator
    DECR    = 0B00010,      // decrements the accumulator by 1
    INCR    = 0B00011,      // increments the accumulator by 1
    DECX    = 0B01010,      // decrements the index register by 1
    INCX    = 0B01011,      // increments the index register by 1
    COM     = 0B00100,      // takes the accumulator value, calculates its 1's complement and saves it again to the accumulator 
    NEG     = 0B00101,      // takes the accumulator value, calculates its 2's complement and saves it again to the accumulator 
    SAR     = 0B01000,      // shifts the accumulator 1 bit to right
    SAL     = 0B01001,      // shifts the accumulator 1 bit to left
    CLC     = 0B10011,      // clears the carry flag
    CLI     = 0B10100,      // clears the interrupt flag
    CLV     = 0B10101,      // clears the overflow flag
    STC     = 0B10110,      // sets the carry flag
    STI     = 0B10111,      // sets the interrupt flag
    STV     = 0B11000,      // sets the overflow flag
    PSH     = 0B00110,      // pushes the accumulator content to the stack
    PUL     = 0B00111,      // pulls the data pointed by the stack pointer register and assigns it into the accumulator
    RTS     = 0B11010,      //return from subroutine
    NOP     = 0B11001,      // no operation, the program counter(PC) will be incremented by 1
    HLT     = 0B01110,      // stops the program

    LDA     = 0B01010,      // assigns the operand to the accumulator
    LDAX    = 0B10001,      // assigns the operand to the index register(IX)
    STA     = 0B10000,      // writes the value of the accumulator into memory
    STAX    = 0B10011,
    
    BSR     = 0B01111,      // unconditional branching to a subroutine
    

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