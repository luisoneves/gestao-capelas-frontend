// src/services/api.ts
import { logger } from '../utils/logger';

// SISTEMA DE AMBIENTES
const STRAPI_URL = 
  process.env.NEXT_PUBLIC_STRAPI_URL_PRODUCTION ||
  process.env.NEXT_PUBLIC_STRAPI_URL_LOCAL ||
  "http://localhost:1337";

logger.debug(`Strapi URL configurada: ${STRAPI_URL}`);
logger.debug(`Ambiente: ${process.env.NODE_ENV}`);

export async function fetchAPI(path: string) {
  const url = `${STRAPI_URL}/api${path}`;
  
  try {
    logger.debug(`Making API request to: ${url}`);
    
    const res = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
      next: { 
        revalidate: 60
      }
    });

    if (!res.ok) {
      logger.error(`API ${res.status}: ${url}`);
      
      if (process.env.NODE_ENV === 'production') {
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
    
    if (process.env.NODE_ENV === 'production') {
      return { data: [] };
    }
    
    throw error;
  }
}
