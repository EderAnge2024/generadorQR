import React, { useRef, useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import style from "./generdor.module.css"

const Generador = () => {
  const [text, setText] = useState(""); // Texto del input
  const qrRef = useRef();

  const handleDownload = () => {
    const canvas = qrRef.current.querySelector("canvas");
    const url = canvas.toDataURL("image/png");

    const link = document.createElement("a");
    link.href = url;
    link.download = "codigo_qr.png";
    link.click();
  };

  return (
    <div className={style.generador_contenedor}>
      <h2>Generar Código QR Dinámico</h2>

      <input
        type="text"
        placeholder="Escribe el texto o URL"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className={style.input}
      />

      <div ref={qrRef} style={{ display: "inline-block", margin: "20px" }}>
        {text && (
          <QRCodeCanvas
            value={text}
            size={256}
            bgColor="#ffffff"
            fgColor="#000000"
            level="H"
            includeMargin={true}
          />
        )}
      </div>

      <div className={style.botones}>
        <button
          onClick={handleDownload}
          className={style.button}
          disabled={!text} // Desactivar si no hay texto
        >
          Descargar QR
        </button>
      </div>
    </div>
  );
};

export default Generador;
