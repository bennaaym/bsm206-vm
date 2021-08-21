import * as CONFIG from "./config";
import * as MARKUPIFY from "./markupify";

export const highLightCode = (code:string,isLight:boolean):string =>
{
    let output = CONFIG.EMPTY_CHAR;

    // split input code into lines
    const lines = code.split(CONFIG.NEW_LINE);

    // process the code line by line
    for(let i = 0 ;i<lines.length;i++)
    {
        const commands = lines[i].split(CONFIG.WHITE_SPACE);

        // process line
        for(let j=0;j<commands.length;j++)
        {
            const command = commands[j];
            
            // white spaces
            if(command === CONFIG.EMPTY_CHAR)
            {
                output+= MARKUPIFY.whiteSpace();
                continue;
            }

            // comments 
            if(command[0] === CONFIG.COMMENT_CHAR)
            {
                output += MARKUPIFY.highLightComment(commands.slice(j,commands.length).join(CONFIG.WHITE_SPACE),isLight);
                break;
            }

            // comments at the middle or end of a keyword or a number
            if(command.includes(CONFIG.COMMENT_CHAR))
            {
                
                const splittedCommand = command.split(';');
                const prev = splittedCommand[0];
                const next = splittedCommand[1];
                
                
                // keyword
                if(CONFIG.KEYWORDS.includes(prev))
                {
                    output += MARKUPIFY.highLighKeyword(prev,isLight);
                }
                
                
                else if (CONFIG.ADRMD_CHARS.includes(prev[0]))
                {
                    const ADR_CHAR = prev[0];
                    const next = prev.slice(1,prev.length);
                    
                    output += MARKUPIFY.highLightAddressingChar(ADR_CHAR,isLight);

                    if(next.match(CONFIG.HEX_NUMBER_REGEX))
                    {
                        output += MARKUPIFY.highLightHexValue(next,isLight);
                    }

                }

                // hex value
                else if(prev.match(CONFIG.HEX_NUMBER_REGEX))
                {
                    output += MARKUPIFY.highLightHexValue(prev,isLight);
                }

                else 
                    output += prev

                const comment = CONFIG.COMMENT_CHAR + next +  CONFIG.WHITE_SPACE + commands.slice(j+1,commands.length).join(' ');
                output += MARKUPIFY.highLightComment(comment,isLight);
                break;
            }
            
    
            // keywords
            if(CONFIG.KEYWORDS.includes(command))
            {
                output += MARKUPIFY.highLighKeyword(command,isLight);
                output += MARKUPIFY.whiteSpace();
                continue;
            }

            // addressing characters 
            if(CONFIG.ADRMD_CHARS.includes(command[0]))
            {

                output += MARKUPIFY.highLightAddressingChar(command[0],isLight);

                if(command.length === 1)
                {
                    output += MARKUPIFY.whiteSpace();
                    continue;
                }

                // in case the addressing char is concatenated with a hex value
                const next = command.substring(1,command.length);
                
                if(next.match(CONFIG.HEX_NUMBER_REGEX))
                {
                    output += MARKUPIFY.highLightHexValue(next,isLight);
                    output += MARKUPIFY.whiteSpace();
                    continue;
                }

                output += next;
                output += MARKUPIFY.whiteSpace();
                continue;
            }

            // hex values
            if(command.match(CONFIG.HEX_NUMBER_REGEX))
            {
                output += MARKUPIFY.highLightHexValue(command,isLight);
                output += MARKUPIFY.whiteSpace();
                continue;
            }

            
            // else
            output += command;
            output += MARKUPIFY.whiteSpace();
        }

        output += MARKUPIFY.newLine();
    }

    return output;
}

