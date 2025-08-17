import './ListSearchInput.css';
import searchIcon from '@/Icons/svg/search.svg';

export default function ListSearchInput() {
    return (
        <div className="list-search-input">
            <img src={searchIcon} alt="search" />
            <input type="text" placeholder="Search" />
        </div>
        
    )
}