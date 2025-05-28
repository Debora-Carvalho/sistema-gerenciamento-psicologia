import { FiMenu } from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";
import "./MobileHeader.css";
import useUsuarios from "../../hooks/useUsuarios";
import FotoPerfil from "../../features/PaginaPerfil/FotoPerfil";

export default function MobileHeader() {
    const { usuario } = useUsuarios();

    if (!usuario) return null;

    return (
        <header className="mobile-header">

            <div className="user-info">
                <div className="avatar"><FotoPerfil userId={usuario._id} /></div>
                <div>
                    <span className="user-name">{usuario.username}</span>
                    <span className="user-email">{usuario.email}</span>
                </div>
            </div>
        </header>
    );
}