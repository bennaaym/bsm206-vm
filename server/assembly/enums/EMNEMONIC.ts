enum EMNEMONIC
{
    CLR     = 'CLR',      // clears the accumulator
    DECR    = 'DECR',     // decrements the accumulator by 1
    INCR    = 'INCR',     // increments the accumulator by 1
    DECX    = 'DECX',     // decrements the index register by 1
    INCX    = 'INCX',     // increments the index register by 1
    COM     = 'COM',      // takes the accumulator value, calculates its 1's complement and saves it again to the accumulator 
    NEG     = 'NEG',      // takes the accumulator value, calculates its 2's complement and saves it again to the accumulator 
    SAR     = 'SAR',      // shifts the accumulator 1 bit to right
    SAL     = 'SAL',      // shifts the accumulator 1 bit to left
    CLC     = 'CLC',      // clears the carry flag
    CLI     = 'CLI',      // clears the interrupt flag
    CLV     = 'CLV',      // clears the overflow flag
    STC     = 'STC',      // sets the carry flag
    STI     = 'STI',      // sets the interrupt flag
    STV     = 'STV',      // sets the overflow flag
    PSH     = 'PSH',      // pushes the accumulator content to the stack
    PUL     = 'PUL',      // pulls the data pointed by the stack pointer register and assigns it into the accumulator
    RTS     = 'RTS',      // return from subroutine
    NOP     = 'NOP',      // no operation, the program counter(PC) will be incremented by 1
    HLT     = 'HLT',      // stops the program

    LDA     = 'LDA',      // assigns the operand to the accumulator
    LDAX    = 'LDAX',     // assigns the operand to the index register(IX)
    STA     = 'STA',      // writes the value of the accumulator into memory
    STAX    = 'STAX',
    
    BSR     = 'BSR',      // unconditional branching to a subroutine (uses relative addressing)
    BRA     = 'BRA',      
    BCC     = 'BCC',
    BCS     = 'BCS',
    BZR     = 'BZR',
    BNE     = 'BNE',
    BMI     = 'BMI',
    BPL     = 'BPL',
    BVC     = 'BVC',
    BVS     = 'BVS',


    JSR     = 'JSR',       // unconditional jump to a subroutine (similar to BSR, however, uses relative addressing)
    JMP     = 'JMP', 

    // Arithmetic operations
    
    ADD     = 'ADD',
    ADDC    = 'ADDC',      // it considers the carry flag while adding 
    SUB     = 'SUB',
    SUBC    = 'SUBC',  
    DIV     = 'DIV',
    MUL     = 'MUL',

    // Logic operations

    AND     = 'AND',
    OR      = 'OR',
    XOR     = 'XOR',

}


export default EMNEMONIC;