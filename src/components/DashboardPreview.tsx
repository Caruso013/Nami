
import { TrendingUp, TrendingDown, Wallet, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const DashboardPreview = () => {
  const navigate = useNavigate();

  const handleViewDashboard = () => {
    navigate('/dashboard');
  };

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Dashboard que{' '}
                <span className="nami-gradient-text">Fala por Si</span>
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                Veja todas suas informações financeiras de forma clara e organizada. 
                Gráficos interativos, cards animados e dados sempre atualizados.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-gray-700">Saldo atual em tempo real</span>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="text-gray-700">Gráficos de receitas e despesas</span>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                <span className="text-gray-700">Botão destacado para adicionar renda</span>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                <span className="text-gray-700">Alertas visuais de orçamento</span>
              </div>
            </div>

            <Button className="nami-button-primary" onClick={handleViewDashboard}>
              Ver Dashboard Completo
            </Button>
          </div>

          {/* Dashboard Mockup */}
          <div className="relative">
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-6 shadow-2xl">
              {/* Header */}
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-white font-bold text-xl">Meu Dashboard</h3>
                <div className="flex space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
              </div>

              {/* Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 animate-pulse-soft">
                  <div className="flex items-center justify-between mb-2">
                    <Wallet className="w-5 h-5 text-blue-400" />
                    <TrendingUp className="w-4 h-4 text-green-400" />
                  </div>
                  <p className="text-gray-300 text-sm">Saldo Atual</p>
                  <p className="text-white font-bold text-lg">R$ 8.247,00</p>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 animate-pulse-soft" style={{ animationDelay: '0.5s' }}>
                  <div className="flex items-center justify-between mb-2">
                    <TrendingUp className="w-5 h-5 text-green-400" />
                    <span className="text-xs text-green-400">+12%</span>
                  </div>
                  <p className="text-gray-300 text-sm">Receitas</p>
                  <p className="text-white font-bold text-lg">R$ 12.500,00</p>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 animate-pulse-soft" style={{ animationDelay: '1s' }}>
                  <div className="flex items-center justify-between mb-2">
                    <TrendingDown className="w-5 h-5 text-red-400" />
                    <span className="text-xs text-red-400">-8%</span>
                  </div>
                  <p className="text-gray-300 text-sm">Despesas</p>
                  <p className="text-white font-bold text-lg">R$ 4.253,00</p>
                </div>
              </div>

              {/* Add Income Button */}
              <div className="mb-6">
                <button className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold py-4 rounded-xl flex items-center justify-center space-x-2 hover:from-green-600 hover:to-emerald-700 transition-all duration-300 transform hover:scale-[1.02]">
                  <Plus className="w-5 h-5" />
                  <span>Adicionar Renda</span>
                </button>
              </div>

              {/* Chart Placeholder */}
              <div className="bg-white/5 rounded-2xl p-4 h-32 flex items-center justify-center">
                <div className="text-gray-400 text-sm">Gráfico de Transações</div>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-blue-500 rounded-full opacity-20 animate-float"></div>
            <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-purple-500 rounded-full opacity-20 animate-float" style={{ animationDelay: '2s' }}></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DashboardPreview;
