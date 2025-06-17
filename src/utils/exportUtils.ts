
import jsPDF from 'jspdf';
import { Transaction } from '@/hooks/useTransactions';
import { Budget } from '@/hooks/useBudgets';

export const exportToCSV = (transactions: Transaction[]) => {
  const headers = ['Data', 'Tipo', 'Categoria', 'Valor', 'Descrição'];
  
  const csvContent = [
    headers.join(','),
    ...transactions.map(transaction => [
      new Date(transaction.date).toLocaleDateString('pt-BR'),
      transaction.type === 'income' ? 'Receita' : 'Despesa',
      transaction.category,
      `R$ ${Number(transaction.amount).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`,
      `"${transaction.description || ''}"`
    ].join(','))
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `transacoes_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};

export const generatePDFReport = (
  transactions: Transaction[],
  budgets: Budget[],
  totalIncome: number,
  totalExpenses: number,
  balance: number,
  expensesByCategory: Record<string, number>
) => {
  const doc = new jsPDF();
  
  // Título
  doc.setFontSize(20);
  doc.text('Relatório Financeiro - Nami', 20, 30);
  
  // Data do relatório
  doc.setFontSize(12);
  doc.text(`Data: ${new Date().toLocaleDateString('pt-BR')}`, 20, 45);
  
  // Resumo financeiro
  doc.setFontSize(16);
  doc.text('Resumo Financeiro', 20, 65);
  
  doc.setFontSize(12);
  doc.text(`Saldo Atual: R$ ${balance.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`, 20, 80);
  doc.text(`Total Receitas: R$ ${totalIncome.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`, 20, 95);
  doc.text(`Total Despesas: R$ ${totalExpenses.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`, 20, 110);
  
  // Gastos por categoria
  doc.setFontSize(16);
  doc.text('Gastos por Categoria', 20, 135);
  
  let yPosition = 150;
  doc.setFontSize(12);
  
  Object.entries(expensesByCategory).forEach(([category, amount]) => {
    doc.text(`${category}: R$ ${amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`, 20, yPosition);
    yPosition += 15;
  });
  
  // Orçamentos
  if (budgets.length > 0) {
    yPosition += 10;
    doc.setFontSize(16);
    doc.text('Orçamentos', 20, yPosition);
    yPosition += 15;
    
    doc.setFontSize(12);
    budgets.forEach(budget => {
      const spent = expensesByCategory[budget.category] || 0;
      const percentage = ((spent / budget.limit_amount) * 100).toFixed(1);
      
      doc.text(`${budget.category}:`, 20, yPosition);
      doc.text(`Limite: R$ ${budget.limit_amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`, 80, yPosition);
      doc.text(`Gasto: R$ ${spent.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} (${percentage}%)`, 140, yPosition);
      yPosition += 15;
    });
  }
  
  // Transações recentes
  if (transactions.length > 0) {
    yPosition += 10;
    doc.setFontSize(16);
    doc.text('Últimas Transações', 20, yPosition);
    yPosition += 15;
    
    doc.setFontSize(10);
    const recentTransactions = transactions.slice(0, 10);
    
    recentTransactions.forEach(transaction => {
      const type = transaction.type === 'income' ? 'Receita' : 'Despesa';
      const amount = `R$ ${Number(transaction.amount).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
      const date = new Date(transaction.date).toLocaleDateString('pt-BR');
      
      doc.text(`${date} - ${type} - ${transaction.category}: ${amount}`, 20, yPosition);
      yPosition += 12;
      
      if (yPosition > 280) {
        doc.addPage();
        yPosition = 20;
      }
    });
  }
  
  // Salvar o PDF
  doc.save(`relatorio_financeiro_${new Date().toISOString().split('T')[0]}.pdf`);
};
