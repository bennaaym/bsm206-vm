enum EToken
{
    MNEMONIC        = 'MNEMONIC', 
    OPERAND         = 'OPERAND', 
    TAG             = 'TAG',
    LPAREN          = 'LPAREN',
    RPAREN          = 'RPAREN',
    ASTERISK        = 'ASTERISK',
    TILDE           = 'TILDE',
    SEMICOLON       = 'SEMICOLON',
    NL              = 'NL',         // new line
    EOF             = 'EOF'         // end of file
}

export default EToken;