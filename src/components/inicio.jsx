import { useState } from "react"
import Stylo from "./incio.module.css"
import Generador from "./sections/generdaor/generador"
import Scanner from "./sections/escaner/escaneador"
import GeneradorConImagen from "./sections/generarAImegen/generrConImg"
import qrimges from "../img/qrimges.png"

function Inicio() {
    const [activarMenus, setActivarMenus] = useState(null)

    const renderizarMenus = () => {
        switch (activarMenus){
            case "generador":
                return <Generador />;
            case "scanner":
                return <Scanner />;
            case "generadorConImg":
                return <GeneradorConImagen />;
            default:
                return null;
        }
        
    }

  return (
    <div className={Stylo.inicio_contenedor}>
        <div className={Stylo.secCbeza}>
            <div className={Stylo.caja1}>
                <img src={qrimges} alt="logo" />
            </div>
            <div className={Stylo.caja2}>
                <h1>Escaner y Generador de Qr</h1>
                <p>“Genera y escanea los códigos QR al instante.
                <span>Rápido, seguro y fácil de usar,</span> todo en un solo lugar.”</p>
            </div>
        </div>
        <div className={Stylo.botones}>
            <button onClick={() => setActivarMenus("generador")}>Generador</button>
            <button onClick={() => setActivarMenus("generadorConImg")}>Generar/img</button>
            <button onClick={() => setActivarMenus("scanner")}>Escaner</button>
        </div>
        <main className={Stylo.main}>
            {renderizarMenus()}
        </main>
    </div>
  )
}

export default Inicio