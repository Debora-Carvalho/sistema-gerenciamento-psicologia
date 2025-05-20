import { FiSearch } from "react-icons/fi";
import "./SearchBar.css";

export default function SearchBar({ value, onChange }) {
    return (
        <div className="search-bar">
            <FiSearch size={20} />
            <input
                type="text"
                placeholder="Pesquisar paciente"
                value={value}
                onChange={onChange}
            />
        </div>
    );
}