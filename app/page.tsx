"use client";
import { useState } from "react";

export default function Home() {
  const partidos = [
    { id: 1, equipoA: "Argentina", equipoB: "Brasil" },
    { id: 2, equipoA: "Francia", equipoB: "Alemania" },
    { id: 3, equipoA: "España", equipoB: "Portugal" },
  ];

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
      const inserts = Object.entries(predicciones)
        .filter(([_, p]: any) => p.golesA !== undefined && p.golesB !== undefined)
        .map(([partidoId, p]: any) => ({
          partido_id: Number(partidoId),
          goles_a: Number(p.golesA || 0),
          goles_b: Number(p.golesB || 0),
          usuario: "augusto",
        }));

      console.log("INSERTS:", inserts);

      const res = await fetch("/api/guardar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inserts),
      });

      const result = await res.json();
      console.log("API RESPONSE:", result);

      if (!res.ok) throw new Error("Error backend");

      alert("Guardado OK 🚀");

    } catch (err) {
      console.error(err);
      alert("Error real");
    }
  };

  return (
    <main style={{ padding: "20px" }}>
      <h1>Prode Mundial ⚽</h1>

      {partidos.map((partido) => (
        <div key={partido.id} style={{ marginBottom: "15px" }}>
          <span>{partido.equipoA}</span>

          <input
            type="number"
            style={{ width: "50px", margin: "0 5px" }}
            onChange={(e) =>
              handleChange(partido.id, "golesA", e.target.value)
            }
          />

          <span>-</span>

          <input
            type="number"
            style={{ width: "50px", margin: "0 5px" }}
            onChange={(e) =>
              handleChange(partido.id, "golesB", e.target.value)
            }
          />

          <span>{partido.equipoB}</span>
        </div>
      ))}

      <button onClick={guardarPredicciones}>
        Guardar predicciones
      </button>
    </main>
  );
}