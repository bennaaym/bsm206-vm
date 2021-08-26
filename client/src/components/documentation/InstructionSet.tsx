import InstructionsTable from "./InstructionsTable";
import styles from "../../assets/css/documentation.module.css";
const InstructionSet = () =>
{
    return(
        <section className={styles['section-wrapper']}>
            <h1>instruction set</h1>

            <section>
                <div>
                    <InstructionsTable/>
                </div>
            </section>
        </section>
    )
}

export default InstructionSet;