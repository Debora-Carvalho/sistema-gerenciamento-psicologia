import { FiMenu } from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";
import "./MobileHeader.css";

export default function MobileHeader() {
    return (
        <header className="mobile-header">
            
            <div className="user-info">
                <FaUserCircle size={50} className="avatar" />
                <div>
                    <span className="user-name">Ianara Holanda</span>
                    <span className="user-email">email@email.com</span>
                </div>
            </div>
        </header>
    );
}