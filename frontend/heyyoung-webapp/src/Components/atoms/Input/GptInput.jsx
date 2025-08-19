import { SearchBtn } from '../Button';
import styles from './GptInput.module.css';

export default function GptInput({placeholder="Search"}) {
    return (
        <div className={styles.gptInput}>
            <input className={styles.gptInputBox} type="text" placeholder={placeholder} />
            <SearchBtn></SearchBtn>
        </div>
    )
}