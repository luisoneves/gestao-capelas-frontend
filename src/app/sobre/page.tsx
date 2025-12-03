// src/app/sobre/page.tsx - VERSÃO SIMPLES E FUNCIONAL
import Link from 'next/link';

const TEST_IMAGES = [
  {
    url: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&h=400&fit=crop',
    alt: 'Código fonte',
    title: 'Aprendizado Contínuo'
  },
  {
    url: 'https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=600&h=400&fit=crop',
    alt: 'Trabalho em equipe',
    title: 'Colaboração'
  },
  {
    url: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=600&h=400&fit=crop',
    alt: 'Deploy',
    title: 'Deploy Automático'
  }
];

export default function SobrePage() {
  return (
    <main className="p-6 md:p-10 min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-4xl mx-auto">
        
        {/* Cabeçalho */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            📚 Sobre este Projeto
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Um projeto de estudo focado em aprender desenvolvimento fullstack moderno
            com foco em boas práticas e deploy automatizado.
          </p>
        </div>

        {/* Grid de imagens */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {TEST_IMAGES.map((img, index) => (
            <div 
              key={index}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative h-48 w-full">
                <img
                  src={img.url}
                  alt={img.alt}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-800 mb-2">{img.title}</h3>
                <p className="text-sm text-gray-600">
                  {img.alt} - Imagem de teste para analytics
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Estatísticas */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-10">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">📊 Dados para Teste</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Páginas', value: '2' },
              { label: 'Imagens', value: '3' },
              { label: 'Componentes', value: '5+' },
              { label: 'Tecnologias', value: '4' }
            ].map((stat, index) => (
              <div key={index} className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-3xl font-bold text-blue-600">{stat.value}</div>
                <div className="text-sm text-gray-600 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Botões SEGUROS (sem onClick) */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/"
            className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition text-center"
          >
            ← Voltar para Home
          </Link>
          
          {/* Link normal, sem onClick */}
          <a 
            href="/sobre" 
            className="px-6 py-3 bg-gray-200 text-gray-800 font-medium rounded-lg hover:bg-gray-300 transition text-center"
          >
            🔄 Recarregar (clique F5)
          </a>
          
          <a 
            href="https://vercel.com/1991lotavio-1655s-projects/gestao-capelas/analytics"
            target="_blank"
            className="px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition text-center"
          >
            📊 Ver Analytics
          </a>
        </div>

        {/* Nota */}
        <div className="mt-10 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-yellow-800 text-sm">
            💡 <strong>Dica:</strong> Navegue entre Home e Sobre várias vezes para testar Analytics.
            Para recarregar, use F5 ou o botão de recarregar do navegador.
          </p>
        </div>

      </div>
    </main>
  );
}
