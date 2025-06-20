import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useTransactions } from '@/hooks/useTransactions';
import { useToast } from '@/hooks/use-toast';
import { Minus } from 'lucide-react';
import { useCreditCards } from '@/contexts/CreditCardContext';

interface AddExpenseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdded?: () => void; // <-- adicione esta linha
}

const AddExpenseModal = ({ isOpen, onClose, onAdded }: AddExpenseModalProps) => {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [loading, setLoading] = useState(false);
  const [paymentType, setPaymentType] = useState('cash');
  const [selectedCard, setSelectedCard] = useState('');
  
  const { addTransaction } = useTransactions();
  const { toast } = useToast();
  const { cards } = useCreditCards();

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!amount || !category) {
      toast({
        title: "Erro",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    
    const { error } = await addTransaction({
      type: 'expense',
      category,
      amount: parseFloat(amount),
      description: description || undefined,
      date,
      paymentType,
      cardId: paymentType === 'credit' ? selectedCard : undefined,
    });

    if (error) {
      toast({
        title: "Erro",
        description: "Erro ao adicionar despesa. Tente novamente.",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Sucesso!",
        description: "Despesa adicionada com sucesso.",
      });
      
      setAmount('');
      setCategory('');
      setDescription('');
      setDate(new Date().toISOString().split('T')[0]);
      setPaymentType('cash');
      setSelectedCard('');
      onClose();
      if (onAdded) onAdded(); // <-- chame aqui!
    }
    
    setLoading(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Minus className="w-5 h-5 text-red-500" />
            <span>Adicionar Despesa</span>
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="amount">Valor *</Label>
            <Input
              id="amount"
              type="number"
              step="0.01"
              min="0"
              placeholder="R$ 0,00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Categoria *</Label>
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
            <Label htmlFor="description">Descrição</Label>
            <Textarea
              id="description"
              placeholder="Descrição da despesa (opcional)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="date">Data</Label>
            <Input
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>Tipo de Pagamento</Label>
            <select value={paymentType} onChange={e => setPaymentType(e.target.value)} className="w-full p-2 border rounded">
              <option value="cash">Dinheiro</option>
              <option value="credit">Cartão de Crédito</option>
            </select>
          </div>

          {paymentType === 'credit' && (
            <div className="space-y-2">
              <Label htmlFor="card">Cartão</Label>
              <select 
                id="card"
                value={selectedCard} 
                onChange={e => setSelectedCard(e.target.value)} 
                required
                className="w-full p-2 border rounded"
                disabled={cards.length === 0}
              >
                <option value="">
                  {cards.length === 0 ? 'Nenhum cartão cadastrado' : 'Selecione o cartão'}
                </option>
                {cards.map(card => (
                  <option key={card.id} value={card.id}>
                    {card.nameCard}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="flex justify-end space-x-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button 
              type="submit" 
              disabled={loading}
              className="bg-red-500 hover:bg-red-600 text-white"
            >
              {loading ? 'Adicionando...' : 'Adicionar Despesa'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddExpenseModal;
