// src/app/page.tsx - VERSÃO PROFISSIONAL
import { fetchAPI } from "../services/api";
import { logger } from "../utils/logger";

interface ConteudoItem {
  id: number;
  attributes: {
    titulo: string;
    descricao: any; // Pode ser string ou array de blocos Rich Text
    slug: string;
  };
}

export default async function Page() {
  let titulo: string | null = null;
  let errorMsg: string | null = null;

  try {
    const endpoint = "/conteudos";
    logger.info(`Fetching data from API: ${endpoint}`);
    
    const response = await fetchAPI(endpoint);
    
    // Usa o logger profissional
    logger.api(response, endpoint);
    
    if (response.data && response.data.length > 0) {
      const item = response.data[0] as ConteudoItem;
      
      if (item.attributes?.titulo) {
        titulo = item.attributes.titulo;
        logger.debug(`Title found: "${titulo}"`);
      } else {
        logger.warn("Item has attributes but no title field");
        errorMsg = "Conteúdo encontrado, mas sem título definido.";
      }
    } else {
      logger.info("No content found in API response");
      errorMsg = "API conectada, mas nenhum conteúdo publicado.";
    }
  } catch (err: any) {
    logger.apiError(err, "/conteudos");
    errorMsg = "Erro temporário ao buscar dados. Tente novamente em alguns instantes.";
  }

  return (
    <main className="p-10 flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-lg w-full text-center">
        
        <p className="text-sm font-bold text-gray-400 uppercase mb-4 tracking-wider">
          Status da Integração
        </p>

        {titulo ? (
          <>
            <h1 className="text-4xl font-extrabold text-blue-600 mb-4">{titulo}</h1>
            <div className="mt-4 p-4 bg-green-50 rounded-lg border border-green-200">
              <p className="text-green-700 text-sm">
                ✅ <span className="font-semibold">Integração funcionando!</span>
              </p>
              <p className="text-green-600 text-xs mt-1">
                Strapi → Next.js → Vercel Analytics
              </p>
            </div>
          </>
        ) : (
          <div className="space-y-4">
            <h1 className="text-3xl font-bold text-red-500">
              {errorMsg ? "Atenção!" : "Carregando..."}
            </h1>
            <p className="text-gray-600">{errorMsg || "Buscando dados..."}</p>
            
            {errorMsg && (
              <div className="mt-4 p-3 bg-yellow-50 rounded border border-yellow-200">
                <p className="text-yellow-700 text-sm">
                  💡 Dica: Verifique se o Strapi está rodando e se há conteúdo publicado.
                </p>
              </div>
            )}
          </div>
        )}

        {/* Links para navegação */}
        <div className="mt-8 pt-6 border-t border-gray-100">
          <p className="text-gray-500 text-sm mb-3">
            Projeto de estudo para aprender deploy e monitoramento
          </p>
          <a 
            href="/sobre"
            className="inline-block text-blue-600 hover:text-blue-800 font-medium text-sm"
          >
            📊 Ir para página de teste →
          </a>
          <div className="mt-2">
            <a 
              href="https://vercel.com/1991lotavio-1655s-projects/gestao-capelas/analytics"
              target="_blank"
              className="inline-block text-green-600 hover:text-green-800 text-xs"
            >
              (ver analytics)
            </a>
          </div>
        </div>

        {/* Debug info (apenas desenvolvimento) */}
        {process.env.NODE_ENV === 'development' && (
          <div className="mt-6 pt-4 border-t border-gray-200">
            <p className="text-xs text-gray-400">
              🔧 Modo desenvolvimento | Logs no console
            </p>
          </div>
        )}

      </div>
    </main>
  );
}
