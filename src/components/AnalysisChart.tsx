
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface AnalysisChartProps {
  data: Array<{
    month: string;
    income: number;
    expenses: number;
    balance: number;
  }>;
}

const AnalysisChart = ({ data }: AnalysisChartProps) => {
  if (data.length === 0) {
    return (
      <div className="h-80 flex items-center justify-center text-gray-500">
        Não há dados suficientes para análise
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis 
          tickFormatter={(value) => `R$ ${value.toLocaleString('pt-BR')}`}
        />
        <Tooltip 
          formatter={(value: number, name: string) => [
            `R$ ${value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`,
            name === 'income' ? 'Receitas' : name === 'expenses' ? 'Despesas' : 'Saldo'
          ]}
        />
        <Legend 
          formatter={(value) => 
            value === 'income' ? 'Receitas' : 
            value === 'expenses' ? 'Despesas' : 'Saldo'
          }
        />
        <Line 
          type="monotone" 
          dataKey="income" 
          stroke="#10B981" 
          strokeWidth={3}
          dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
        />
        <Line 
          type="monotone" 
          dataKey="expenses" 
          stroke="#EF4444" 
          strokeWidth={3}
          dot={{ fill: '#EF4444', strokeWidth: 2, r: 4 }}
        />
        <Line 
          type="monotone" 
          dataKey="balance" 
          stroke="#3B82F6" 
          strokeWidth={3}
          dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default AnalysisChart;
