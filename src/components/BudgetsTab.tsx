
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';
import { useBudgets } from '@/hooks/useBudgets';
import { useTransactions } from '@/hooks/useTransactions';
import { useToast } from '@/hooks/use-toast';
import { Plus, Trash2, AlertTriangle, Target } from 'lucide-react';

const BudgetsTab = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [category, setCategory] = useState('');
  const [limitAmount, setLimitAmount] = useState('');
  const [loading, setLoading] = useState(false);

  const { budgets, addBudget, deleteBudget } = useBudgets();
  const { expensesByCategory } = useTransactions();
  const { toast } = useToast();

  const expenseCategories = [
    'Alimentação',
    'Transporte',
    'Saúde',
    'Educação',
    'Lazer',
    'Casa',
    'Roupas',
    'Tecnologia',
    'Outros'
  ];

  const handleAddBudget = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!category || !limitAmount) {
      toast({
        title: "Erro",
        description: "Por favor, preencha todos os campos.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    
    const { error } = await addBudget({
      category,
      limit_amount: parseFloat(limitAmount),
    });

    if (error) {
      toast({
        title: "Erro",
        description: "Erro ao adicionar orçamento. Verifique se já não existe um orçamento para esta categoria.",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Sucesso!",
        description: "Orçamento adicionado com sucesso.",
      });
      
      setCategory('');
      setLimitAmount('');
      setIsAddModalOpen(false);
    }
    
    setLoading(false);
  };

  const handleDeleteBudget = async (id: string) => {
    const { error } = await deleteBudget(id);
    
    if (error) {
      toast({
        title: "Erro",
        description: "Erro ao deletar orçamento.",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Sucesso!",
        description: "Orçamento deletado com sucesso.",
      });
    }
  };

  const getBudgetProgress = (category: string, limit: number) => {
    const spent = expensesByCategory[category] || 0;
    const percentage = (spent / limit) * 100;
    return { spent, percentage: Math.min(percentage, 100) };
  };

  const getProgressColor = (percentage: number) => {
    if (percentage >= 100) return 'bg-red-500';
    if (percentage >= 80) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
            <Target className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Controle de Orçamentos</h2>
            <p className="text-gray-600">Gerencie seus gastos mensais por categoria</p>
          </div>
        </div>
        <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-500 hover:bg-blue-600 text-white">
              <Plus className="w-4 h-4 mr-2" />
              Novo Orçamento
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Adicionar Orçamento</DialogTitle>
            </DialogHeader>
            
            <form onSubmit={handleAddBudget} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="category">Categoria</Label>
                <Select value={category} onValueChange={setCategory} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione uma categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    {expenseCategories.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="limit">Limite (R$)</Label>
                <Input
                  id="limit"
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="R$ 0,00"
                  value={limitAmount}
                  onChange={(e) => setLimitAmount(e.target.value)}
                  required
                />
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <Button type="button" variant="outline" onClick={() => setIsAddModalOpen(false)}>
                  Cancelar
                </Button>
                <Button type="submit" disabled={loading}>
                  {loading ? 'Adicionando...' : 'Adicionar'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {budgets.map((budget) => {
          const { spent, percentage } = getBudgetProgress(budget.category, budget.limit_amount);
          const isOverBudget = percentage >= 100;
          const isNearLimit = percentage >= 80 && percentage < 100;
          const remaining = Math.max(budget.limit_amount - spent, 0);

          return (
            <Card key={budget.id} className={`transform hover:scale-105 transition-all duration-300 ${
              isOverBudget ? 'border-red-300 bg-red-50' : 
              isNearLimit ? 'border-yellow-300 bg-yellow-50' : 
              'border-green-300 bg-green-50'
            }`}>
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg font-bold">{budget.category}</CardTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteBudget(budget.id)}
                    className="text-red-500 hover:text-red-700 hover:bg-red-100"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm font-medium">
                    <span>Progresso</span>
                    <span className={`${isOverBudget ? 'text-red-600' : isNearLimit ? 'text-yellow-600' : 'text-green-600'}`}>
                      {percentage.toFixed(1)}%
                    </span>
                  </div>
                  
                  <div className="relative">
                    <Progress 
                      value={percentage} 
                      className="h-3"
                    />
                    <div 
                      className={`absolute top-0 left-0 h-3 rounded-full transition-all duration-500 ${getProgressColor(percentage)}`}
                      style={{ width: `${Math.min(percentage, 100)}%` }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="space-y-1">
                    <p className="text-gray-600">Gasto</p>
                    <p className={`font-bold ${isOverBudget ? 'text-red-600' : 'text-gray-900'}`}>
                      R$ {spent.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </p>
                  </div>
                  
                  <div className="space-y-1">
                    <p className="text-gray-600">Restante</p>
                    <p className={`font-bold ${remaining === 0 ? 'text-red-600' : 'text-green-600'}`}>
                      R$ {remaining.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </p>
                  </div>
                </div>

                <div className="pt-2 border-t border-gray-200">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-gray-500">
                      Limite: R$ {budget.limit_amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </span>
                    {(isOverBudget || isNearLimit) && (
                      <div className="flex items-center space-x-1">
                        <AlertTriangle className={`w-3 h-3 ${isOverBudget ? 'text-red-500' : 'text-yellow-500'}`} />
                        <span className={`font-medium ${isOverBudget ? 'text-red-600' : 'text-yellow-600'}`}>
                          {isOverBudget ? 'Excedido!' : 'Atenção!'}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
        
        {budgets.length === 0 && (
          <div className="col-span-full text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Target className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-gray-500 text-lg">Nenhum orçamento criado ainda</p>
            <p className="text-sm text-gray-400 mt-2">Clique em "Novo Orçamento" para começar a controlar seus gastos!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BudgetsTab;
