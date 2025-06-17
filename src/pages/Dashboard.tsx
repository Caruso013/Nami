
import { useState } from 'react';
import { TrendingUp, TrendingDown, Plus, Minus, BarChart3, PieChart, LogOut, Download, FileText, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/hooks/useAuth';
import { useTransactions } from '@/hooks/useTransactions';
import { useBudgets } from '@/hooks/useBudgets';
import AddIncomeModal from '@/components/AddIncomeModal';
import AddExpenseModal from '@/components/AddExpenseModal';
import BudgetsTab from '@/components/BudgetsTab';
import ExpenseChart from '@/components/ExpenseChart';
import AnalysisChart from '@/components/AnalysisChart';
import DashboardStats from '@/components/DashboardStats';
import { exportToCSV, generatePDFReport } from '@/utils/exportUtils';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [showAddIncomeModal, setShowAddIncomeModal] = useState(false);
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
  const { signOut, user } = useAuth();
  const { 
    transactions, 
    totalIncome, 
    totalExpenses, 
    balance, 
    expensesByCategory,
    todayTransactions,
    monthTransactions,
    highestExpense,
    lineChartData,
    deleteTransaction,
    loading 
  } = useTransactions();
  const { budgets } = useBudgets();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const handleExportCSV = () => {
    if (transactions.length === 0) {
      toast({
        title: "Aviso",
        description: "Não há transações para exportar.",
        variant: "destructive",
      });
      return;
    }
    
    exportToCSV(transactions);
    toast({
      title: "Sucesso!",
      description: "Arquivo CSV exportado com sucesso.",
    });
  };

  const handleGeneratePDF = () => {
    generatePDFReport(
      transactions,
      budgets,
      totalIncome,
      totalExpenses,
      balance,
      expensesByCategory
    );
    toast({
      title: "Sucesso!",
      description: "Relatório PDF gerado com sucesso.",
    });
  };

  const handleDeleteTransaction = async (id: string) => {
    const { error } = await deleteTransaction(id);
    
    if (error) {
      toast({
        title: "Erro",
        description: "Erro ao deletar transação.",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Sucesso!",
        description: "Transação deletada com sucesso.",
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Mobile-First */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="container mx-auto px-3 sm:px-4 py-3 sm:py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <h1 className="text-lg sm:text-2xl font-bold text-gray-900 truncate">
              <span className="hidden sm:inline">Dashboard - </span>
              <span className="text-sm sm:text-inherit">{user?.email}</span>
            </h1>
            <div className="flex flex-wrap items-center gap-2 sm:gap-4">
              <Button variant="outline" size="sm" onClick={handleExportCSV} className="flex-1 sm:flex-none text-xs sm:text-sm">
                <Download className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                <span className="hidden xs:inline">Exportar </span>CSV
              </Button>
              <Button variant="outline" size="sm" onClick={handleGeneratePDF} className="flex-1 sm:flex-none text-xs sm:text-sm">
                <FileText className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                <span className="hidden xs:inline">Relatório </span>PDF
              </Button>
              <Button variant="outline" size="sm" onClick={handleSignOut} className="flex-1 sm:flex-none text-xs sm:text-sm">
                <LogOut className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                Sair
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-8 max-w-7xl">
        {/* Estatísticas do Header */}
        <DashboardStats 
          todayTransactions={todayTransactions}
          monthTransactions={monthTransactions}
          highestExpense={highestExpense}
          balance={balance}
        />

        {/* Botões de Ação - Mobile Responsive */}
        <div className="flex flex-col gap-3 sm:gap-4 mb-6 sm:mb-8 animate-fade-in">
          <Button 
            onClick={() => setShowAddIncomeModal(true)}
            className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold py-3 sm:py-4 px-6 sm:px-8 rounded-xl flex items-center justify-center space-x-2 sm:space-x-3 transform hover:scale-[1.02] transition-all duration-300 shadow-lg text-base sm:text-lg"
          >
            <Plus className="w-5 h-5 sm:w-6 sm:h-6" />
            <span>Adicionar Renda</span>
          </Button>
          
          <Button 
            onClick={() => setShowAddExpenseModal(true)}
            className="w-full bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white font-semibold py-3 sm:py-4 px-6 sm:px-8 rounded-xl flex items-center justify-center space-x-2 sm:space-x-3 transform hover:scale-[1.02] transition-all duration-300 shadow-lg text-base sm:text-lg"
          >
            <Minus className="w-5 h-5 sm:w-6 sm:h-6" />
            <span>Adicionar Despesa</span>
          </Button>
        </div>

        {/* Abas - Mobile Responsive */}
        <Tabs defaultValue="dashboard" className="space-y-6 sm:space-y-8">
          <TabsList className="grid w-full grid-cols-3 h-auto p-1">
            <TabsTrigger value="dashboard" className="text-xs sm:text-sm py-2 sm:py-3">Dashboard</TabsTrigger>
            <TabsTrigger value="budgets" className="text-xs sm:text-sm py-2 sm:py-3">Orçamentos</TabsTrigger>
            <TabsTrigger value="analysis" className="text-xs sm:text-sm py-2 sm:py-3">Análise</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6 sm:space-y-8">
            {/* Seção de Gráficos - Mobile Responsive */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 mb-6 sm:mb-8">
              <div className="nami-card p-4 sm:p-6 animate-fade-in">
                <div className="flex items-center justify-between mb-4 sm:mb-6">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900">Gastos por Categoria</h3>
                  <PieChart className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
                </div>
                <div className="h-64 sm:h-80">
                  <ExpenseChart expensesByCategory={expensesByCategory} />
                </div>
              </div>

              <div className="nami-card p-4 sm:p-6 animate-fade-in">
                <div className="flex items-center justify-between mb-4 sm:mb-6">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900">Controle de Orçamentos</h3>
                  <BarChart3 className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
                </div>
                <div className="space-y-3 max-h-64 sm:max-h-80 overflow-y-auto">
                  {budgets.length > 0 ? (
                    budgets.map((budget) => {
                      const spent = expensesByCategory[budget.category] || 0;
                      const percentage = (spent / budget.limit_amount) * 100;
                      const isOverBudget = percentage >= 100;
                      
                      return (
                        <div key={budget.id} className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-xs sm:text-sm font-medium truncate mr-2">{budget.category}</span>
                            <span className={`text-xs sm:text-sm font-bold flex-shrink-0 ${isOverBudget ? 'text-red-600' : 'text-gray-700'}`}>
                              {percentage.toFixed(1)}%
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full transition-all duration-500 ${
                                isOverBudget ? 'bg-red-500' : percentage >= 80 ? 'bg-yellow-500' : 'bg-green-500'
                              }`}
                              style={{ width: `${Math.min(percentage, 100)}%` }}
                            />
                          </div>
                          <div className="flex justify-between text-xs text-gray-500">
                            <span>R$ {spent.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                            <span>R$ {budget.limit_amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <p className="text-gray-500 text-center py-8 text-sm sm:text-base">Nenhum orçamento criado ainda</p>
                  )}
                </div>
              </div>
            </div>

            {/* Transações Recentes - Mobile Responsive */}
            <div className="nami-card p-4 sm:p-6 animate-fade-in">
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900">Transações Recentes</h3>
              </div>
              <div className="space-y-2 sm:space-y-4">
                {transactions.slice(0, 10).map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between py-2 sm:py-3 border-b border-gray-100 hover:bg-gray-50 rounded px-2 transition-colors">
                    <div className="flex items-center space-x-2 sm:space-x-3 flex-1 min-w-0">
                      <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                        transaction.type === 'income' ? 'bg-green-100' : 'bg-red-100'
                      }`}>
                        {transaction.type === 'income' ? (
                          <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
                        ) : (
                          <TrendingDown className="w-4 h-4 sm:w-5 sm:h-5 text-red-600" />
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="font-medium text-gray-900 text-sm sm:text-base truncate">
                          {transaction.description || transaction.category}
                        </p>
                        <p className="text-xs sm:text-sm text-gray-500 truncate">
                          {new Date(transaction.date).toLocaleDateString('pt-BR')} • {transaction.category}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 sm:space-x-3 flex-shrink-0">
                      <span className={`font-semibold text-sm sm:text-base ${
                        transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {transaction.type === 'income' ? '+' : '-'}R$ {Number(transaction.amount).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteTransaction(transaction.id)}
                        className="text-red-500 hover:text-red-700 hover:bg-red-100 p-1 sm:p-2"
                      >
                        <Trash2 className="w-3 h-3 sm:w-4 sm:h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
                
                {transactions.length === 0 && (
                  <div className="text-center py-8">
                    <p className="text-gray-500 text-sm sm:text-base">Nenhuma transação encontrada</p>
                    <p className="text-xs sm:text-sm text-gray-400 mt-2">Adicione sua primeira transação para começar!</p>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="budgets">
            <BudgetsTab />
          </TabsContent>

          <TabsContent value="analysis">
            <div className="nami-card p-4 sm:p-6">
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900">Análise Financeira</h3>
                  <p className="text-gray-600 text-sm sm:text-base">Evolução das suas finanças nos últimos 6 meses</p>
                </div>
                <BarChart3 className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
              </div>
              <div className="h-80 sm:h-96">
                <AnalysisChart data={lineChartData} />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <AddIncomeModal 
        isOpen={showAddIncomeModal}
        onClose={() => setShowAddIncomeModal(false)}
      />
      
      <AddExpenseModal 
        isOpen={showAddExpenseModal}
        onClose={() => setShowAddExpenseModal(false)}
      />
    </div>
  );
};

export default Dashboard;
