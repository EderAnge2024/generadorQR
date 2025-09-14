// Scanner.jsx
import React, { useRef, useState, useEffect } from "react";
import { BrowserQRCodeReader } from "@zxing/browser";

function Scanner() {
  const videoRef = useRef(null);
  const codeReader = useRef(new BrowserQRCodeReader());
  const [scannedUrl, setScannedUrl] = useState("");
  const [error, setError] = useState("");
  const [scanning, setScanning] = useState(false);

  // Escaneo desde la cámara
  useEffect(() => {
    let animationFrame;

    const scanLoop = async () => {
      if (!scanning || !videoRef.current) return;
      try {
        const result = await codeReader.current.decodeOnceFromVideoElement(videoRef.current);
        if (result) {
          setScannedUrl(result.getText());
          stopScan();
        }
      } catch (e) {
        // ignorar NotFoundException
      }
      animationFrame = requestAnimationFrame(scanLoop);
    };

    if (scanning) scanLoop();
    return () => cancelAnimationFrame(animationFrame);
  }, [scanning]);

  const startScan = async () => {
    setScannedUrl("");
    setError("");
    setScanning(true);

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.setAttribute("playsinline", true);
        videoRef.current.muted = true;
        await videoRef.current.play();
      }
    } catch (err) {
      console.error(err);
      setError("No se pudo acceder a la cámara. Revisa permisos.");
      setScanning(false);
    }
  };

  const stopScan = () => {
    setScanning(false);
    if (videoRef.current?.srcObject) {
      videoRef.current.srcObject.getTracks().forEach(track => track.stop());
    }
  };

  const resetScanner = () => {
    setScannedUrl("");
    setError("");
    setScanning(false);
  };

  // Escaneo desde imagen
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        // Crear imagen temporal en el DOM
        const img = document.createElement("img");
        img.src = event.target.result;
        img.style.display = "none";
        document.body.appendChild(img);

        const result = await codeReader.current.decodeFromImageElement(img);
        setScannedUrl(result.getText());
        setError("");

        // Remover imagen temporal
        document.body.removeChild(img);
      } catch (err) {
        console.error(err);
        setError("No se pudo leer el QR de la imagen.");
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Escanear QR</h1>

      {!scanning && !scannedUrl && (
        <button onClick={startScan} style={{ padding: "10px 20px", marginTop: "20px" }}>
          Iniciar Escaneo desde cámara
        </button>
      )}

      <p>O sube un QR como imagen:</p>
      <input type="file" accept="image/*" onChange={handleFileUpload} />

      {error && <p style={{ color: "red", marginTop: "20px" }}>{error}</p>}

      {scanning && (
        <div style={{ margin: "20px auto", width: "300px" }}>
          <video
            ref={videoRef}
            style={{ width: "300px", height: "300px", border: "2px solid #ccc", borderRadius: "8px" }}
            autoPlay
            playsInline
            muted
          />
          <p>Apunta la cámara al QR...</p>
        </div>
      )}

      {scannedUrl && (
        <div style={{ marginTop: "20px" }}>
          <h3>Contenido del QR:</h3>
          <a href={scannedUrl} target="_blank" rel="noopener noreferrer">
            {scannedUrl.startsWith("data:image") ? (
              <img
                src={scannedUrl}
                alt="QR Escaneado"
                style={{ maxWidth: "300px", maxHeight: "300px", border: "2px solid #ccc", borderRadius: "8px" }}
              />
            ) : (
              scannedUrl
            )}
          </a>
          <br />
          <button onClick={resetScanner} style={{ padding: "10px 20px", marginTop: "20px" }}>
            Escanear otro QR
          </button>
        </div>
      )}
    </div>
  );
}

export default Scanner;
