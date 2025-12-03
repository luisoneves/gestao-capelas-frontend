// src/services/api.ts

// Define a URL base. Se não tiver no .env, usa o localhost.
const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

export async function fetchAPI(path: string) {
  try {
    // Monta a URL completa: http://localhost:1337/api/testes
    const url = `${STRAPI_URL}/api${path}`;
    
    const res = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store", // Garante que sempre pegue dados frescos (bom para dev)
    });

    if (!res.ok) {
      // Se der erro 403, 404, 500, lança um erro para o catch pegar
      throw new Error(`Erro na API: ${res.status} ${res.statusText}`);
    }

    const json = await res.json();
    return json;
    
  } catch (error) {
    console.error("FetchAPI Error:", error);
    // Retorna null ou lança erro dependendo de como você quer tratar
    throw error;
  }
}