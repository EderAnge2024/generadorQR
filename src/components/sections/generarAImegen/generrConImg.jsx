import React, { useState } from "react";
import { QRCodeCanvas } from "qrcode.react";

function QRDesdeRuta() {
  const [imagePath, setImagePath] = useState("");
  const [qrReady, setQrReady] = useState(false);

  const handleInputChange = (e) => {
    setImagePath(e.target.value);
    setQrReady(false);
  };

  const generateQR = () => {
    if (!imagePath) return;
    setQrReady(true);
  };

  const handleDownloadQR = () => {
    const canvas = document.getElementById("qrCanvas");
    const url = canvas.toDataURL("image/png");

    const link = document.createElement("a");
    link.href = url;
    link.download = "qr_imagen.png";
    link.click();
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Generar QR desde Ruta o URL de Imagen</h1>

      <input
        type="text"
        placeholder="Ingresa la ruta o URL de la imagen"
        value={imagePath}
        onChange={handleInputChange}
        style={{ width: "300px", padding: "5px", marginTop: "20px" }}
      />

      <br />
      <button
        onClick={generateQR}
        style={{ marginTop: "20px", padding: "10px 20px" }}
      >
        Generar QR
      </button>

      {qrReady && (
        <div style={{ marginTop: "30px" }}>
          <QRCodeCanvas
            id="qrCanvas"
            value={imagePath} // El QR contiene la ruta o URL
            size={256}
            bgColor="#ffffff"
            fgColor="#000000"
            level="H"
            includeMargin={true}
          />
          <p>Escanea el QR para abrir la imagen.</p>
          <button
            onClick={handleDownloadQR}
            style={{ marginTop: "10px", padding: "10px 20px" }}
          >
            Descargar QR
          </button>
        </div>
      )}
    </div>
  );
}

export default QRDesdeRuta;
