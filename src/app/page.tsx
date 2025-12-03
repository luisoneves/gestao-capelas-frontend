// src/app/page.tsx
import { fetchAPI } from "../services/api"; // Verifique se o caminho está correto para sua pasta

// Interface para tipar os dados (opcional, mas ajuda o VSCode)
interface TesteItem {
  id: number;
  attributes?: {
    titulo: string;
    descricao: string;
    slug: string;
  };
  titulo?: string; // Fallback para Strapi v5 sem 'attributes'
  descricao?: string;
}

export default async function Page() {
  let titulo: string | null = null;
  let errorMsg: string | null = null;

  try {
    // 1. Busca os dados na rota '/testes'
    const response = await fetchAPI("/testes");

    // LOG: Veja isso no terminal onde está rodando o 'npm run dev' do frontend
    console.log("DADOS RECEBIDOS:", JSON.stringify(response, null, 2));

    // 2. Verifica se tem dados
    if (response.data && response.data.length > 0) {
      const item = response.data[0];

      // Lógica para pegar o título (suporta Strapi v4 com 'attributes' e v5 simplificado)
      if (item.attributes) {
        titulo = item.attributes.titulo;
      } else if (item.titulo) {
        titulo = item.titulo;
      }
    } else {
      // Se o array data estiver vazio []
      errorMsg = "API conectada, mas nenhum conteúdo encontrado. Verifique se você criou e PUBLICOU o item no Strapi.";
    }

  } catch (err) {
    errorMsg = "Erro ao conectar com o Strapi. Verifique se ele está rodando.";
  }

  return (
    <main className="p-10 flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-lg w-full text-center">
        
        {/* Título da Seção */}
        <p className="text-sm font-bold text-gray-400 uppercase mb-4 tracking-wider">
          Status da Integração
        </p>

        {/* Lógica de Exibição */}
        {titulo ? (
          // SUCESSO
          <h1 className="text-4xl font-extrabold text-blue-600">
            {titulo}
          </h1>
        ) : (
          // FALHA OU CARREGANDO
          <div className="space-y-4">
            <h1 className="text-3xl font-bold text-red-500">
              {errorMsg ? "Atenção!" : "Carregando..."}
            </h1>
            <p className="text-gray-600">
              {errorMsg || "Buscando dados..."}
            </p>
          </div>
        )}

      </div>
    </main>
  );
}