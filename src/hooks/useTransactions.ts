
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

export interface Transaction {
  id: string;
  user_id: string;
  type: 'income' | 'expense';
  category: string;
  amount: number;
  description?: string;
  date: string;
  created_at: string;
}

export const useTransactions = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchTransactions();
    }
  }, [user]);

  const fetchTransactions = async () => {
    try {
      const { data, error } = await supabase
        .from('transactions')
        .select('*')
        .order('date', { ascending: false });

      if (error) throw error;
      
      // Type assertion to ensure correct types
      const typedData = (data || []).map(item => ({
        ...item,
        type: item.type as 'income' | 'expense'
      })) as Transaction[];
      
      setTransactions(typedData);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    } finally {
      setLoading(false);
    }
  };

  const addTransaction = async (transaction: Omit<Transaction, 'id' | 'user_id' | 'created_at'>) => {
    try {
      const { data, error } = await supabase
        .from('transactions')
        .insert([{
          ...transaction,
          user_id: user?.id
        }])
        .select()
        .single();

      if (error) throw error;
      
      // Type assertion for the returned data
      const typedData = {
        ...data,
        type: data.type as 'income' | 'expense'
      } as Transaction;
      
      setTransactions(prev => [typedData, ...prev]);
      return { data: typedData, error: null };
    } catch (error) {
      console.error('Error adding transaction:', error);
      return { data: null, error };
    }
  };

  const deleteTransaction = async (id: string) => {
    try {
      const { error } = await supabase
        .from('transactions')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setTransactions(prev => prev.filter(t => t.id !== id));
      return { error: null };
    } catch (error) {
      console.error('Error deleting transaction:', error);
      return { error };
    }
  };

  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const balance = totalIncome - totalExpenses;

  const expensesByCategory = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + Number(t.amount);
      return acc;
    }, {} as Record<string, number>);

  // Novas estatísticas
  const today = new Date().toISOString().split('T')[0];
  const currentMonth = new Date().toISOString().slice(0, 7);

  const todayTransactions = transactions.filter(t => 
    new Date(t.date).toISOString().split('T')[0] === today
  );

  const monthTransactions = transactions.filter(t => 
    t.date.slice(0, 7) === currentMonth
  );

  const expenseTransactions = transactions.filter(t => t.type === 'expense');
  const highestExpense = expenseTransactions.length > 0 
    ? expenseTransactions.reduce((max, t) => Number(t.amount) > Number(max.amount) ? t : max)
    : { amount: 0, category: 'Nenhum' };

  // Dados para gráfico de linha (últimos 6 meses)
  const lineChartData = [];
  for (let i = 5; i >= 0; i--) {
    const date = new Date();
    date.setMonth(date.getMonth() - i);
    const monthKey = date.toISOString().slice(0, 7);
    
    const monthlyIncome = transactions
      .filter(t => t.type === 'income' && t.date.slice(0, 7) === monthKey)
      .reduce((sum, t) => sum + Number(t.amount), 0);
    
    const monthlyExpenses = transactions
      .filter(t => t.type === 'expense' && t.date.slice(0, 7) === monthKey)
      .reduce((sum, t) => sum + Number(t.amount), 0);

    lineChartData.push({
      month: date.toLocaleDateString('pt-BR', { month: 'short', year: '2-digit' }),
      income: monthlyIncome,
      expenses: monthlyExpenses,
      balance: monthlyIncome - monthlyExpenses
    });
  }

  return {
    transactions,
    loading,
    addTransaction,
    deleteTransaction,
    totalIncome,
    totalExpenses,
    balance,
    expensesByCategory,
    todayTransactions: todayTransactions.length,
    monthTransactions: monthTransactions.length,
    highestExpense,
    lineChartData,
    refetch: fetchTransactions
  };
};
