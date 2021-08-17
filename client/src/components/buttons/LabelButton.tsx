interface IProps
{
    styles:string,
    label:string,
    onClickAction:()=>void
}
const LabelButton: React.FC<IProps>= ({styles,label,onClickAction}) => {

    return (
        <>
            <button 
                className={styles}
                onClick={onClickAction}
            >
                {label}
            </button>
        </>
    );
}
 
export default LabelButton;