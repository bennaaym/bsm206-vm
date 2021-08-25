import {architecture} from "../../assembly/documentation/architecture.json";
import Table from "./Table";

const RegistersTable = () =>
{

    return(
        <Table 
            header={['symbol',...Object.keys(architecture.registers.AC)]}
            body={architecture.registers}
        />
    )
}
export default RegistersTable;