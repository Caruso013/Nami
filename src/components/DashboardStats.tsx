
import { TrendingUp, TrendingDown, Calendar, Target } from 'lucide-react';

interface DashboardStatsProps {
  todayTransactions: number;
  monthTransactions: number;
  highestExpense: {
    amount: number;
    category: string;
  };
  balance: number;
}

const DashboardStats = ({ 
  todayTransactions, 
  monthTransactions, 
  highestExpense,
  balance 
}: DashboardStatsProps) => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
      <div className="nami-card p-3 sm:p-4 animate-fade-in">
        <div className="flex items-center justify-between">
          <div className="min-w-0 flex-1">
            <p className="text-xs sm:text-sm text-gray-600 mb-1">Saldo Atual</p>
            <p className={`text-sm sm:text-xl font-bold truncate ${balance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              R$ {balance.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </p>
          </div>
          <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
            balance >= 0 ? 'bg-green-100' : 'bg-red-100'
          }`}>
            {balance >= 0 ? (
              <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
            ) : (
              <TrendingDown className="w-4 h-4 sm:w-5 sm:h-5 text-red-600" />
            )}
          </div>
        </div>
      </div>

      <div className="nami-card p-3 sm:p-4 animate-fade-in" style={{ animationDelay: '0.1s' }}>
        <div className="flex items-center justify-between">
          <div className="min-w-0 flex-1">
            <p className="text-xs sm:text-sm text-gray-600 mb-1">Transações Hoje</p>
            <p className="text-sm sm:text-xl font-bold text-gray-900">{todayTransactions}</p>
          </div>
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
            <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
          </div>
        </div>
      </div>

      <div className="nami-card p-3 sm:p-4 animate-fade-in" style={{ animationDelay: '0.2s' }}>
        <div className="flex items-center justify-between">
          <div className="min-w-0 flex-1">
            <p className="text-xs sm:text-sm text-gray-600 mb-1">Transações do Mês</p>
            <p className="text-sm sm:text-xl font-bold text-gray-900">{monthTransactions}</p>
          </div>
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
            <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" />
          </div>
        </div>
      </div>

      <div className="nami-card p-3 sm:p-4 animate-fade-in" style={{ animationDelay: '0.3s' }}>
        <div className="flex items-center justify-between">
          <div className="min-w-0 flex-1">
            <p className="text-xs sm:text-sm text-gray-600 mb-1">Maior Gasto</p>
            <p className="text-sm sm:text-lg font-bold text-red-600 truncate">
              R$ {Number(highestExpense.amount).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </p>
            <p className="text-xs text-gray-500 truncate">{highestExpense.category}</p>
          </div>
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
            <Target className="w-4 h-4 sm:w-5 sm:h-5 text-red-600" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardStats;
