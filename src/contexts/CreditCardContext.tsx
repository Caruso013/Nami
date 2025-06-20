import { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

type CreditCard = {
  id: string;
  user_id: string;
  nameCard: string;
  credit_limit: number;
  due_date: number;
  best_day: number;
  created_at: string;
};

type CreditCardContextType = {
  cards: CreditCard[];
  addCard: (card: Omit<CreditCard, 'id' | 'user_id' | 'created_at'>) => Promise<void>;
  removeCard: (id: string) => Promise<void>;
  refreshCards: () => void;
};

const CreditCardContext = createContext<CreditCardContextType>({
  cards: [],
  addCard: async () => {},
  removeCard: async () => {},
  refreshCards: () => {},
});

export const CreditCardProvider = ({ children }: { children: React.ReactNode }) => {
  const [cards, setCards] = useState<CreditCard[]>([]);
  const { user } = useAuth();

  const fetchCards = async () => {
    if (!user) return;
    const { data } = await supabase
      .from('credit_cards')
      .select('id, user_id, nameCard, credit_limit, due_date, best_day, created_at')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });
    setCards(data || []);
  };

  useEffect(() => {
    fetchCards();
    // eslint-disable-next-line
  }, [user]);

  const addCard = async (card: Omit<CreditCard, 'id' | 'user_id' | 'created_at'>) => {
    if (!user) return;
    await supabase.from('credit_cards').insert([{ ...card, user_id: user.id }]);
    fetchCards();
  };

  const removeCard = async (id: string) => {
    await supabase.from('credit_cards').delete().eq('id', id);
    fetchCards();
  };

  const refreshCards = fetchCards;

  return (
    <CreditCardContext.Provider value={{ cards, addCard, removeCard, refreshCards }}>
      {children}
    </CreditCardContext.Provider>
  );
};

export const useCreditCards = () => useContext(CreditCardContext);