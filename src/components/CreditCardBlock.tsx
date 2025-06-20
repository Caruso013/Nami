import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useCreditCards } from '@/contexts/CreditCardContext';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

type Expense = {
  card_id: string;
  amount: number;
  // outros campos se necessário
};

type CreditCardsBlockProps = {
  expenses: Expense[];
};

const CreditCardsBlock = ({ expenses }: CreditCardsBlockProps) => {
  const { cards, addCard, removeCard } = useCreditCards();
  const [nameCard, setNameCard] = useState('');
  const [creditLimit, setCreditLimit] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [bestDay, setBestDay] = useState('');
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nameCard || !creditLimit || !dueDate || !bestDay) return;
    setLoading(true);
    await addCard({
      nameCard,
      credit_limit: Number(creditLimit),
      due_date: Number(dueDate),
      best_day: Number(bestDay),
    });
    setNameCard('');
    setCreditLimit('');
    setDueDate('');
    setBestDay('');
    setLoading(false);
    setIsOpen(false);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Cartões de Crédito</CardTitle>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button size="sm" className="bg-blue-500 text-white hover:bg-blue-600">
              Adicionar Cartão
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Novo Cartão de Crédito</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleAdd} className="space-y-4">
              <div>
                <Label>Nome do Cartão</Label>
                <Input value={nameCard} onChange={e => setNameCard(e.target.value)} placeholder="Ex: Nubank" />
              </div>
              <div>
                <Label>Limite</Label>
                <Input type="number" min="1" value={creditLimit} onChange={e => setCreditLimit(e.target.value)} placeholder="Ex: 2000" />
              </div>
              <div>
                <Label>Data de Vencimento</Label>
                <Input type="number" min="1" max="31" value={dueDate} onChange={e => setDueDate(e.target.value)} placeholder="Ex: 10" />
              </div>
              <div>
                <Label>Melhor Dia de Compra</Label>
                <Input type="number" min="1" max="31" value={bestDay} onChange={e => setBestDay(e.target.value)} placeholder="Ex: 2" />
              </div>
              <Button type="submit" className="w-full bg-blue-500 text-white hover:bg-blue-600" disabled={loading}>
                {loading ? 'Adicionando...' : 'Adicionar Cartão'}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        <div className="mt-4">
          <h4 className="font-semibold mb-2">Meus Cartões</h4>
          <ul>
            {cards.map(card => {
              // Calcule o valor utilizado REAL do cartão:
              // Substitua este array pelo seu array real de despesas
              const expensesForCard = expenses
                ? expenses.filter(e => e.card_id === card.id)
                : [];
              const used = expensesForCard.reduce((sum, e) => sum + e.amount, 0);

              // Percentual utilizado
              const percent = Math.min(100, (used / card.credit_limit) * 100);

              // Barra começa verde (pouco utilizado), vai mudando conforme o uso
              let color = 'bg-green-500';
              if (percent >= 75) color = 'bg-red-500';
              else if (percent >= 50) color = 'bg-orange-500';
              else if (percent >= 25) color = 'bg-yellow-400';

              return (
                <li key={card.id} className="mb-4">
                  <div className="flex justify-between items-center">
                    <span>
                      {card.nameCard} - Limite: R$ {card.credit_limit} - Vencimento: {card.due_date} - Melhor dia: {card.best_day}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-red-500"
                      onClick={() => removeCard(card.id)}
                    >
                      Remover
                    </Button>
                  </div>
                  <div className="mt-2">
                    <div className="w-full h-3 bg-gray-200 rounded">
                      <div
                        className={`h-3 rounded transition-all duration-300 ${color}`}
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                    <span className="text-xs text-gray-600">
                      {percent.toFixed(0)}% do limite utilizado
                    </span>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default CreditCardsBlock;

