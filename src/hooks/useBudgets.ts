
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

export interface Budget {
  id: string;
  user_id: string;
  category: string;
  limit_amount: number;
  created_at: string;
}

export const useBudgets = () => {
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchBudgets();
    }
  }, [user]);

  const fetchBudgets = async () => {
    try {
      const { data, error } = await supabase
        .from('budgets')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setBudgets(data || []);
    } catch (error) {
      console.error('Error fetching budgets:', error);
    } finally {
      setLoading(false);
    }
  };

  const addBudget = async (budget: Omit<Budget, 'id' | 'user_id' | 'created_at'>) => {
    try {
      const { data, error } = await supabase
        .from('budgets')
        .insert([{
          ...budget,
          user_id: user?.id
        }])
        .select()
        .single();

      if (error) throw error;
      setBudgets(prev => [data, ...prev]);
      return { data, error: null };
    } catch (error) {
      console.error('Error adding budget:', error);
      return { data: null, error };
    }
  };

  const updateBudget = async (id: string, updates: Partial<Budget>) => {
    try {
      const { data, error } = await supabase
        .from('budgets')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      setBudgets(prev => prev.map(budget => budget.id === id ? data : budget));
      return { data, error: null };
    } catch (error) {
      console.error('Error updating budget:', error);
      return { data: null, error };
    }
  };

  const deleteBudget = async (id: string) => {
    try {
      const { error } = await supabase
        .from('budgets')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setBudgets(prev => prev.filter(budget => budget.id !== id));
      return { error: null };
    } catch (error) {
      console.error('Error deleting budget:', error);
      return { error };
    }
  };

  return {
    budgets,
    loading,
    addBudget,
    updateBudget,
    deleteBudget,
    refetch: fetchBudgets
  };
};
