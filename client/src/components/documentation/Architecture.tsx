import {architecture} from "../../assembly/documentation/architecture.json";
import Table from "./Table";
import styles from "../../assets/css/documentation.module.css";

const Architecture = () =>
{
    return(
        <>
            <section className={styles['section-wrapper']}>
                <h1>
                    architecture
                </h1>
                <section>
                    <h4 className="">
                        cpu
                    </h4>
                    <p>
                        {architecture.cpu}
                    </p>
                </section>
                <section>
                    <h4 className="text-xl font-semibold uppercase">
                        memory
                    </h4>
                    <p>
                        total size : {architecture.memory.totalSize}
                    </p>
                    <p>
                        word size :{architecture.memory.wordSize} bits
                    </p>
                 </section>
                <section>
                    <h4 className="text-xl font-semibold uppercase">
                        registers
                    </h4>
                    <p>
                        total of {Object.keys(architecture.registers).length} registers
                    </p>
                    <div>
                        <Table 
                            header={['symbol',...(Object.keys(architecture.registers.AC).map(key => (key === 'size')? 'size (bits)':key))]}
                            body={architecture.registers}
                        />
                    </div>
                </section>
            </section>
        </>
    )
}

export default Architecture;