
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

const CATEGORIES = [
  'Alimentação', 'Transporte', 'Saúde', 'Educação',
  'Lazer', 'Casa', 'Roupas', 'Tecnologia', 'Outros'
];

const getProgressColor = (percentage) => {
  if (percentage >= 100) return 'bg-red-500';
  if (percentage >= 80) return 'bg-yellow-500';
  return 'bg-green-500';
};

const BudgetsTab = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [category, setCategory] = useState('');
  const [limit, setLimit] = useState('');
  const [loading, setLoading] = useState(false);

  const { budgets, addBudget, deleteBudget } = useBudgets();
  const { expensesByCategory } = useTransactions();
  const { toast } = useToast();

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!category || !limit) return toast({ title: 'Erro', description: 'Preencha todos os campos.', variant: 'destructive' });

    setLoading(true);
    const { error } = await addBudget({ category, limit_amount: parseFloat(limit) });
    setLoading(false);

    if (error) return toast({ title: 'Erro', description: 'Categoria já possui orçamento.', variant: 'destructive' });

    toast({ title: 'Sucesso!', description: 'Orçamento adicionado com sucesso.' });
    setCategory('');
    setLimit('');
    setIsOpen(false);
  };

  const handleDelete = async (id) => {
    const { error } = await deleteBudget(id);
    toast({
      title: error ? 'Erro' : 'Sucesso!',
      description: error ? 'Erro ao excluir orçamento.' : 'Orçamento excluído.',
      variant: error ? 'destructive' : undefined
    });
  };

  const calculateBudget = (cat, lim) => {
    const spent = expensesByCategory[cat] || 0;
    const pct = Math.min((spent / lim) * 100, 100);
    return { spent, pct, remaining: Math.max(lim - spent, 0) };
  };

  return (
    <div className="space-y-6">
      <header className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
            <Target className="text-white w-5 h-5" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Orçamentos</h2>
            <p className="text-sm text-gray-600">Acompanhe seus gastos mensais por categoria</p>
          </div>
        </div>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-500 text-white hover:bg-blue-600">
              <Plus className="mr-2 w-4 h-4" /> Novo Orçamento
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Adicionar Orçamento</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleAdd} className="space-y-4">
              <div className="space-y-2">
                <Label>Categoria</Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione uma categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    {CATEGORIES.map((cat) => <SelectItem key={cat} value={cat}>{cat}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Limite (R$)</Label>
                <Input type="number" min="0" step="0.01" placeholder="Ex: 500.00" value={limit} onChange={e => setLimit(e.target.value)} required />
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <Button variant="outline" onClick={() => setIsOpen(false)}>Cancelar</Button>
                <Button type="submit" disabled={loading}>{loading ? 'Adicionando...' : 'Adicionar'}</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {budgets.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Target className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-gray-500 text-lg">Nenhum orçamento ainda</p>
            <p className="text-sm text-gray-400 mt-2">Clique em "Novo Orçamento" para começar</p>
          </div>
        ) : (
          budgets.map(({ id, category, limit_amount }) => {
            const { spent, pct, remaining } = calculateBudget(category, limit_amount);
            const color = getProgressColor(pct);
            const isOver = pct >= 100;
            const isNear = pct >= 80 && pct < 100;

            return (
              <Card key={id} className={`transition-transform hover:scale-[1.02] border ${isOver ? 'border-red-300 bg-red-50' : isNear ? 'border-yellow-300 bg-yellow-50' : 'border-green-300 bg-green-50'}`}>
                <CardHeader className="pb-2 flex justify-between">
                  <CardTitle className="text-lg font-bold">{category}</CardTitle>
                  <Button variant="ghost" size="sm" onClick={() => handleDelete(id)} className="text-red-500 hover:text-red-700">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm">
                      <span>Progresso</span>
                      <span className={`${isOver ? 'text-red-600' : isNear ? 'text-yellow-600' : 'text-green-600'}`}>{pct.toFixed(1)}%</span>
                    </div>
                    <div className="relative mt-1">
                      <Progress value={pct} className="h-3" />
                      <div className={`absolute top-0 left-0 h-3 rounded-full ${color}`} style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">Gasto</p>
                      <p className={`font-bold ${isOver ? 'text-red-600' : 'text-gray-900'}`}>R$ {spent.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Restante</p>
                      <p className={`font-bold ${remaining === 0 ? 'text-red-600' : 'text-green-600'}`}>R$ {remaining.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                    </div>
                  </div>
                  <div className="pt-2 border-t text-xs flex justify-between">
                    <span className="text-gray-500">Limite: R$ {limit_amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                    {(isOver || isNear) && (
                      <span className={`flex items-center gap-1 font-medium ${isOver ? 'text-red-600' : 'text-yellow-600'}`}>
                        <AlertTriangle className={`w-3 h-3 ${isOver ? 'text-red-500' : 'text-yellow-500'}`} />
                        {isOver ? 'Excedido!' : 'Atenção!'}
                      </span>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })
        )}
      </section>
    </div>
  );
};

export default BudgetsTab;
