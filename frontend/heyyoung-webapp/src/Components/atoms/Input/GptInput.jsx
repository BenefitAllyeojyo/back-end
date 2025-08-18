import { SearchBtn } from '../Button';
import './GptInput.css';
import searchIcon from '@/Icons/svg/search.svg';

export default function GptInput({placeholder="Search"}) {
    return (
        <div className="gpt-input">
            <input className="gpt-inputBox" type="text" placeholder={placeholder} />
            <SearchBtn></SearchBtn>
        </div>
    )
}