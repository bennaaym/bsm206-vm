/**
 * This VM has 5 addressing modes
 * Inherent
 * immediate
 * direct
 * indirect
 * index
 * relative
 */
enum EADRMD
{
    INHERENT    = 0B000,
    IMMEDIATE   = 0B001,  
    DIRECT      = 0B010, 
    INDIRECT    = 0B011,
    INDEX       = 0B100,
    RELATIVE    = 0B101,
}


export default EADRMD;