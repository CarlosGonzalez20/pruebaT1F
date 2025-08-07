import "./loader.css";
import logo from "../../assets/Images/Logo_ASIELSA_01-11829bbd.webp?w=150&format=webp";

export default function Loader() {
  return (
    <div className="loader-container">
      <img src={logo} alt="Logo de Asielsa" className="loader-logo" />
      <p>Cargando contenido...</p>
    </div>
  );
}