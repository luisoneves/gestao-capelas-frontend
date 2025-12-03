// src/services/api.ts - VERSÃO CORRIGIDA
const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

export async function fetchAPI(path: string) {
  try {
    const url = `${STRAPI_URL}/api${path}`;
    
    const res = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
      // ⭐⭐ TROQUE cache: "no-store" POR next: { revalidate: 60 } ⭐⭐
      next: { 
        revalidate: 60 // Revalida a cada 60 segundos (Incremental Static Regeneration)
      }
      // ⚠️ REMOVA: cache: "no-store"
    });

    if (!res.ok) {
      // Para produção, não quebre a página
      if (process.env.NODE_ENV === 'production') {
        console.warn(`API ${res.status}: ${url}`);
        return { data: [] };
      }
      throw new Error(`Erro na API: ${res.status} ${res.statusText}`);
    }

    const json = await res.json();
    return json;
    
  } catch (error) {
    console.error("FetchAPI Error:", error);
    
    // Em produção, retorna vazio em vez de quebrar
    if (process.env.NODE_ENV === 'production') {
      return { data: [] };
    }
    
    throw error;
  }
}
