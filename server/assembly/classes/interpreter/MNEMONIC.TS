export const MNEMONICS:{[key:string]:{[key:string]:number}} = 
{
    INHERENT:
    {
        string  : 0B00001,      
        DECR    : 0B00010,      
        INCR    : 0B00011,      
        DECX    : 0B01010,      
        INCX    : 0B01011,
        COM     : 0B00100,      
        NEG     : 0B00101,      
        SAR     : 0B01000,      
        SAL     : 0B01001,      
        CLC     : 0B10011,      
        CLI     : 0B10100,      
        CLV     : 0B10101,      
        STC     : 0B10110,      
        STI     : 0B10111,      
        STV     : 0B11000,      
        PSH     : 0B00110,      
        PUL     : 0B00111,      
        RTS     : 0B11010,      
        NOP     : 0B11001,      
        HLT     : 0B01110,      
    
    },

    IMMEDIATE:
    {
        LDA     : 0B01010,      
        LDAX    : 0B10001,      
        ADD     : 0B00000,
        ADDC    : 0B00001,       
        SUB     : 0B01110,
        SUBC    : 0B01111,  
        DIV     : 0B00101,
        MUL     : 0B10101,
        AND     : 0B00010,
        OR      : 0B01011,
        XOR     : 0B00110,
    },

    DIRECT:
    {
        LDA     : 0B01010,      
        LDAX    : 0B10001,  
        STA     : 0B10000,      
        STAX    : 0B10011,    
        ADD     : 0B00000,
        ADDC    : 0B00001,       
        SUB     : 0B01110,
        SUBC    : 0B01111,  
        DIV     : 0B00101,
        MUL     : 0B10101,
        AND     : 0B00010,
        OR      : 0B01011,
        XOR     : 0B00110,
    },

    INDIRECT:
    {
        LDA     : 0B01010,      
        LDAX    : 0B10001,  
        STA     : 0B10000,      
        STAX    : 0B10011,    
        ADD     : 0B00000,
        ADDC    : 0B00001,       
        SUB     : 0B01110,
        SUBC    : 0B01111,  
        DIV     : 0B00101,
        MUL     : 0B10101,
        AND     : 0B00010,
        OR      : 0B01011,
        XOR     : 0B00110,
    },

    INDEX:
    {
        JSR     : 0B01101,       
        JMP     : 0B01100, 
    },

    RELATIVE:
    {
        BSR     : 0B01111,      
        BRA     : 0B00000,      
        BCC     : 0B00001,
        BCS     : 0B00010,
        BZR     : 0B00011,
        BNE     : 0B01011,
        BMI     : 0B01010,
        BPL     : 0B01110,
        BVC     : 0B01100,
        BVS     : 0B01101,
    },
}