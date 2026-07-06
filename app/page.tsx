"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Home() {
 const partidos = [
  { id: 1, equipoA: "", equipoB: "" },
  { id: 2, equipoA: "", equipoB: "" },
  { id: 3, equipoA: "", equipoB: "" },
];
  
  const [error, setError] = useState("");
  const [usuario, setUsuario] = useState("");
  const [predicciones, setPredicciones] = useState<any>({});
  const router = useRouter();
  const [legajo, setLegajo] = useState("");

  const handleChange = (partidoId: number, equipo: string, valor: string) => {
    setPredicciones((prev: any) => ({
      ...prev,
      [partidoId]: {
        ...prev[partidoId],
        [equipo]: valor,
      },
    }));
  };

  const guardarPredicciones = async () => {
    try {
      if (!usuario || !legajo) {
        setError("Ingresá nombre y legajo");
    return;
      }

      const data: any = {
        usuario: usuario,
        legajo: legajo,
      };

      partidos.forEach((partido, index) => {
        const p = predicciones[partido.id] || {};

        data[`partido_${index + 1}`] =
          `${partido.equipoA} vs ${partido.equipoB}`;

        data[`goles_a_${index + 1}`] = Number(p.golesA || 0);
        data[`goles_b_${index + 1}`] = Number(p.golesB || 0);
      });

      const res = await fetch("/api/guardar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Error backend");

      // 🔥 REDIRECCIÓN DIRECTA
      router.push("/chequeo");

    } catch (err) {
      console.error(err);
      alert("Error al guardar");
    }
  };

  return (
    <main
      style={{
        padding: "20px",
        maxWidth: "500px",
        margin: "0 auto",
        fontFamily: "Arial, sans-serif",
        backgroundImage: "url('/logo-mundial.png')",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "contain",
        minHeight: "100vh",
      }}
    >
      {/* LOGO */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "20px",
        }}
      >
        <img
          src="/logo.png"
          alt="Texproil"
          style={{ width: "180px", height: "auto" }}
        />
      </div>

      {/* TITULO */}
      <h1
        style={{
          textAlign: "center",
          justifyContent: "center",
          marginBottom: "20px",
          fontSize: "34px",
          fontWeight: "bold",
          color: "#000",
          textShadow: "0px 2px 6px rgba(255,255,255,0.8)",
          backgroundColor: "#ffffffc7",
        }}
      >
        Mundial 2026 ⚽
      </h1>

      <h2
        style={{
          display: "inline-block",
          justifyContent: "center",
          textAlign: "center",
          marginBottom: "10px",
          color: "#000000",
         textShadow: "0px 1px 4px rgba(255,255,255,0.8)",
        }}
      >
        Eliminatoria 8vos
      </h2>

      {/* USUARIO */}
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Apellido y nombre"
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
          style={{
            padding: "10px",
            width: "100%",
            borderRadius: "8px",
            border: "1px solid #ccc",
            backgroundColor: "#fff",
          }}
        />
      </div>

{/* n° de legajo */}
<div style={{ marginBottom: "20px" }}>
  <input
    type="text"
    placeholder="número de documento"
    value={legajo}
    onChange={(e) => setLegajo(e.target.value)}
    style={{
      padding: "10px",
      width: "100%",
      borderRadius: "8px",
      border: "1px solid #ccc",
      backgroundColor: "#fff",
    }}
  />
</div>

      {/* PARTIDOS */}
      {partidos.map((partido) => (
        <div
          key={partido.id}
          style={{
            marginBottom: "15px",
            padding: "15px",
            border: "1px solid #ff3c00",
            borderRadius: "10px",
            backgroundColor: "rgba(255,255,255,0.05)",
            backdropFilter: "blur(5px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span style={{ width: "120px" }}>{partido.equipoA}</span>

          <input
            type="number"
            min="0"
            max="9"
            style={{
              width: "50px",
              textAlign: "center",
              borderRadius: "6px",
              border: "2px solid #1100ff",
              backgroundColor: "#fff",
            }}
            onChange={(e) =>
              handleChange(partido.id, "golesA", e.target.value)
            }
          />

          <span>-</span>

          <input
            type="number"
            min="0"
            max="9"
            style={{
              width: "50px",
              textAlign: "center",
              borderRadius: "6px",
              border: "2px solid #1100ff",
              backgroundColor: "#fff",
            }}
            onChange={(e) =>
              handleChange(partido.id, "golesB", e.target.value)
            }
          />

          <span style={{ width: "120px", textAlign: "right" }}>
            {partido.equipoB}
          </span>
        </div>
      ))}

      {/* BOTÓN GUARDAR */}
      <button
        onClick={guardarPredicciones}
        style={{
          marginTop: "20px",
          padding: "12px",
          width: "100%",
          backgroundColor: "#f34d00",
          color: "white",
          border: "none",
          borderRadius: "8px",
          fontSize: "16px",
          cursor: "pointer",
        }}
      >
        Guardar palpitos
      </button>

      {/* BOTÓN VER */}
      <Link href="/chequeo">
        <button
          style={{
            marginTop: "10px",
            padding: "12px",
            width: "100%",
            backgroundColor: "#0400ff",
            color: "white",
            border: "none",
            borderRadius: "8px",
            fontSize: "16px",
            cursor: "pointer",
          }}
        >
          Ver palpitos
        </button>
      </Link>
    </main>
  );
}