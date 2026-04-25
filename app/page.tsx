"use client";
import { useState } from "react";

export default function Home() {
  const partidos = [
    { id: 1, equipoA: "Argentina", equipoB: "Argelia" },
    { id: 2, equipoA: "Argentina", equipoB: "Austria" },
    { id: 3, equipoA: "Argentina", equipoB: "Jordania" },
  ];

  const [usuario, setUsuario] = useState("");
  const [predicciones, setPredicciones] = useState<any>({});

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
      if (!usuario) {
        alert("Ingresá tu nombre");
        return;
      }

      const inserts = Object.entries(predicciones)
        .filter(([_, p]: any) => p.golesA !== undefined && p.golesB !== undefined)
        .map(([partidoId, p]: any) => ({
          partido_id: Number(partidoId),
          goles_a: Number(p.golesA || 0),
          goles_b: Number(p.golesB || 0),
          usuario: usuario,
        }));

      if (inserts.length === 0) {
        alert("Cargá al menos un partido");
        return;
      }

      const res = await fetch("/api/guardar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inserts),
      });

      if (!res.ok) throw new Error("Error backend");

      alert("Guardado OK 🚀");

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
      }}
    >
      {/* LOGO */}
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <img src="/logo.png" alt="Logo" style={{ height: "60px" }} />
      </div>

      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
        Mundial 2026 ⚽
      </h1>

      {/* USUARIO */}
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Tu nombre"
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
          style={{
            padding: "10px",
            width: "100%",
            borderRadius: "8px",
            border: "1px solid #ccc",
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
            border: "1px solid #e5e5e5",
            borderRadius: "10px",
            backgroundColor: "#fafafa",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span style={{ width: "120px" }}>{partido.equipoA}</span>

          <input
            type="number"
            style={{
              width: "50px",
              padding: "5px",
              textAlign: "center",
              borderRadius: "6px",
              border: "1px solid #ccc",
            }}
            onChange={(e) =>
              handleChange(partido.id, "golesA", e.target.value)
            }
          />

          <span>-</span>

          <input
            type="number"
            style={{
              width: "50px",
              padding: "5px",
              textAlign: "center",
              borderRadius: "6px",
              border: "1px solid #ccc",
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

      {/* BOTÓN */}
      <button
        onClick={guardarPredicciones}
        style={{
          marginTop: "20px",
          padding: "12px",
          width: "100%",
          backgroundColor: "#f36100",
          color: "white",
          border: "none",
          borderRadius: "8px",
          fontSize: "16px",
          cursor: "pointer",
        }}
      >
        Guardar palpitos
      </button>
    </main>
  );
}