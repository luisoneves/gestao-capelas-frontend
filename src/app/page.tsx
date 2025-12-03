// src/app/page.tsx - NÃO MUDAR, já está bom
import { fetchAPI } from "../services/api";

interface TesteItem {
  id: number;
  attributes?: {
    titulo: string;
    descricao: string;
    slug: string;
  };
  titulo?: string;
  descricao?: string;
}

export default async function Page() {
  let titulo: string | null = null;
  let errorMsg: string | null = null;

  try {
    const response = await fetchAPI("/testes");
    console.log("DADOS RECEBIDOS:", JSON.stringify(response, null, 2));

    if (response.data && response.data.length > 0) {
      const item = response.data[0];
      if (item.attributes) {
        titulo = item.attributes.titulo;
      } else if (item.titulo) {
        titulo = item.titulo;
      }
    } else {
      errorMsg = "API conectada, mas nenhum conteúdo encontrado.";
    }
  } catch (err) {
    errorMsg = "Erro ao conectar com o Strapi. Verifique se ele está rodando.";
  }

  return (
    <main className="p-10 flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-lg w-full text-center">
        
        <p className="text-sm font-bold text-gray-400 uppercase mb-4 tracking-wider">
          Status da Integração
        </p>

        {titulo ? (
          <h1 className="text-4xl font-extrabold text-blue-600">{titulo}</h1>
        ) : (
          <div className="space-y-4">
            <h1 className="text-3xl font-bold text-red-500">
              {errorMsg ? "Atenção!" : "Carregando..."}
            </h1>
            <p className="text-gray-600">{errorMsg || "Buscando dados..."}</p>
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

      </div>
    </main>
  );
}
