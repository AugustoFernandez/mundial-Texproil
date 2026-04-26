"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Page() {
  const [datos, setDatos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/palpitos")
      .then(async (res) => {
        if (!res.ok) return { data: [] };
        return res.json();
      })
      .then((json) => {
        const data = json?.data || [];

        const ordenado = data
          .filter((x: any) => x.fecha)
          .sort(
            (a: any, b: any) =>
              new Date(b.fecha).getTime() - new Date(a.fecha).getTime()
          );

        setDatos(ordenado);
      })
      .catch(() => {
        setDatos([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <main style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <h1 style={{ textAlign: "center" }}>
        Registro de palpitos ✅
      </h1>

      {loading && <p>Cargando...</p>}

      {!loading && datos.length === 0 && (
        <p style={{ marginTop: "20px" }}>
          No hay palpitos todavía
        </p>
      )}

      <div style={{ marginTop: "20px" }}>
        {datos.map((p, i) => (
          <p key={i} style={{ marginBottom: "10px" }}>
            <b>{p.usuario}</b>, se registró palpito ok, fecha:{" "}
            {p.fecha
              ? new Date(p.fecha).toLocaleString(undefined, {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })
              : "-"}
          </p>
        ))}
      </div>

      {/* BOTÓN VOLVER */}
      <Link href="/">
        <button
          style={{
            marginTop: "30px",
            padding: "12px",
            width: "100%",
            backgroundColor: "#555",
            color: "white",
            border: "none",
            borderRadius: "8px",
            fontSize: "16px",
            cursor: "pointer",
          }}
        >
          Volver a palpitos
        </button>
      </Link>
    </main>
  );
}