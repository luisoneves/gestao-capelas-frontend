// src/services/api.ts - VERSÃO MELHORADA
import { logger } from '../utils/logger';

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

export async function fetchAPI(path: string) {
  const url = `${STRAPI_URL}/api${path}`;
  
  try {
    logger.debug(`Making API request to: ${url}`);
    
    const res = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
      next: { 
        revalidate: 60 // ISR: Revalida a cada 60 segundos
      }
    });

    if (!res.ok) {
      logger.error(`API ${res.status}: ${url}`);
      
      // Para produção, não quebre a página
      if (process.env.NODE_ENV === 'production') {
        logger.warn(`Returning empty data for failed API call: ${path}`);
        return { data: [] };
      }
      
      throw new Error(`Erro na API: ${res.status} ${res.statusText}`);
    }

    const json = await res.json();
    logger.debug(`API response received from: ${path}`, {
      dataCount: json.data?.length || 0
    });
    
    return json;
    
  } catch (error: any) {
    logger.apiError(error, path);
    
    // Em produção, retorna vazio em vez de quebrar
    if (process.env.NODE_ENV === 'production') {
      return { data: [] };
    }
    
    throw error;
  }
}
