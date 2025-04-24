import React, { useState, useEffect } from 'react';
import { useAuthStore } from '../store/authStore';
import { financialRecords } from '../mockData';
import { FinancialRecord } from '../types';
import { DollarSign, TrendingUp, TrendingDown, Filter, Download } from 'lucide-react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell
} from 'recharts';

const COLORS = ['#10B981', '#EF4444', '#F59E0B', '#3B82F6'];

const Finance: React.FC = () => {
  const { user } = useAuthStore();
  const [records, setRecords] = useState<FinancialRecord[]>([]);
  const [selectedSchool, setSelectedSchool] = useState<string>('');
  const [selectedType, setSelectedType] = useState<string>('');
  const [selectedPeriod, setSelectedPeriod] = useState<string>('month');
  const [summary, setSummary] = useState({
    totalIncome: 0,
    totalExpense: 0,
    balance: 0
  });
  
  // Check if user is allowed to access this page
  const canAccessFinancial = user?.role === 'secretary' || user?.role === 'director';
  
  // Get schools based on user role
  const userSchools = user?.role === 'secretary' 
    ? ['school1', 'school2', 'school3'] 
    : user?.schoolIds || [];
  
  useEffect(() => {
    if (user && canAccessFinancial) {
      // Filter records based on user's role and assigned schools
      let filteredRecords = [...financialRecords];
      
      if (user.role !== 'secretary') {
        // If not secretary, only show records from user's school
        filteredRecords = filteredRecords.filter(record => 
          user.schoolIds.includes(record.schoolId)
        );
      }
      
      // Apply school filter (only for secretary)
      if (user.role === 'secretary' && selectedSchool) {
        filteredRecords = filteredRecords.filter(record => 
          record.schoolId === selectedSchool
        );
      }
      
      // Apply type filter
      if (selectedType) {
        filteredRecords = filteredRecords.filter(record => 
          record.type === selectedType
        );
      }
      
      // Sort by date (newest first)
      filteredRecords.sort((a, b) => 
        new Date(b.date).getTime() - new Date(a.date).getTime()
      );
      
      setRecords(filteredRecords);
      
      // Calculate summary
      const income = filteredRecords
        .filter(record => record.type === 'income')
        .reduce((sum, record) => sum + record.amount, 0);
      
      const expense = filteredRecords
        .filter(record => record.type === 'expense')
        .reduce((sum, record) => sum + record.amount, 0);
      
      setSummary({
        totalIncome: income,
        totalExpense: expense,
        balance: income - expense
      });
    }
  }, [user, selectedSchool, selectedType, canAccessFinancial]);
  
  // Prepare data for charts
  const prepareChartData = () => {
    const categoryData = records.reduce((acc, record) => {
      const existing = acc.find(item => item.name === record.category);
      if (existing) {
        existing.value += record.amount;
      } else {
        acc.push({
          name: record.category,
          value: record.amount
        });
      }
      return acc;
    }, [] as Array<{ name: string; value: number }>);
    
    const timelineData = records.reduce((acc, record) => {
      const date = new Date(record.date);
      const key = date.toLocaleDateString('pt-BR', { month: 'short', year: 'numeric' });
      
      if (!acc[key]) {
        acc[key] = { date: key, income: 0, expense: 0 };
      }
      
      if (record.type === 'income') {
        acc[key].income += record.amount;
      } else {
        acc[key].expense += record.amount;
      }
      
      return acc;
    }, {} as Record<string, { date: string; income: number; expense: number }>);
    
    return {
      categoryData,
      timelineData: Object.values(timelineData)
    };
  };
  
  const chartData = prepareChartData();
  
  // For secretary, they should be able to see all schools
  const schoolOptions = user?.role === 'secretary' 
    ? [
        { id: 'school1', name: 'Escola Estação Central' },
        { id: 'school2', name: 'Escola Estação Norte' },
        { id: 'school3', name: 'Escola Estação Sul' },
      ]
    : [];
  
  if (!canAccessFinancial) {
    return (
      <div className="p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Financeiro</h1>
        <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200 text-yellow-800">
          <p>Você não possui acesso ao módulo financeiro.</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Gerenciamento Financeiro</h1>
          <p className="text-gray-600">
            Visualize e acompanhe receitas e despesas da instituição.
          </p>
        </div>
        
        <button
          onClick={() => {/* Implement export logic */}}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Download className="w-5 h-5 mr-2" />
          Exportar Relatório
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-4">
            <div className="rounded-full bg-green-100 p-3 mr-4">
              <TrendingUp className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Receitas</p>
              <h3 className="text-2xl font-bold text-gray-900">
                R$ {summary.totalIncome.toFixed(2)}
              </h3>
            </div>
          </div>
          <div className="h-2 bg-gray-100 rounded-full">
            <div
              className="h-2 bg-green-500 rounded-full"
              style={{
                width: `${(summary.totalIncome / (summary.totalIncome + summary.totalExpense)) * 100}%`
              }}
            />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-4">
            <div className="rounded-full bg-red-100 p-3 mr-4">
              <TrendingDown className="h-6 w-6 text-red-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Despesas</p>
              <h3 className="text-2xl font-bold text-gray-900">
                R$ {summary.totalExpense.toFixed(2)}
              </h3>
            </div>
          </div>
          <div className="h-2 bg-gray-100 rounded-full">
            <div
              className="h-2 bg-red-500 rounded-full"
              style={{
                width: `${(summary.totalExpense / (summary.totalIncome + summary.totalExpense)) * 100}%`
              }}
            />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-4">
            <div className="rounded-full bg-blue-100 p-3 mr-4">
              <DollarSign className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Saldo</p>
              <h3 className={`text-2xl font-bold ${summary.balance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                R$ {summary.balance.toFixed(2)}
              </h3>
            </div>
          </div>
          <div className="h-2 bg-gray-100 rounded-full">
            <div
              className={`h-2 rounded-full ${summary.balance >= 0 ? 'bg-green-500' : 'bg-red-500'}`}
              style={{
                width: '100%'
              }}
            />
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold mb-6">Distribuição por Categoria</h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData.categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {chartData.categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold mb-6">Evolução Financeira</h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData.timelineData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="income"
                  stroke="#10B981"
                  name="Receitas"
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="expense"
                  stroke="#EF4444"
                  name="Despesas"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <h2 className="text-lg font-semibold">Histórico Financeiro</h2>
          
          <div className="flex flex-col md:flex-row gap-4">
            {user?.role === 'secretary' && (
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Filter size={20} className="text-gray-400" />
                </div>
                <select
                  value={selectedSchool}
                  onChange={(e) => setSelectedSchool(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                >
                  <option value="">Todas as Escolas</option>
                  {schoolOptions.map((school) => (
                    <option key={school.id} value={school.id}>
                      {school.name}
                    </option>
                  ))}
                </select>
              </div>
            )}
            
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Filter size={20} className="text-gray-400" />
              </div>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
              >
                <option value="">Todos os Tipos</option>
                <option value="income">Receitas</option>
                <option value="expense">Despesas</option>
              </select>
            </div>
            
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Filter size={20} className="text-gray-400" />
              </div>
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
              >
                <option value="month">Este Mês</option>
                <option value="quarter">Este Trimestre</option>
                <option value="year">Este Ano</option>
              </select>
            </div>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Data
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tipo
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Categoria
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Descrição
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Escola
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Valor
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {records.map((record) => (
                <tr key={record.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {new Date(record.date).toLocaleDateString('pt-BR')}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {record.type === 'income' ? (
                      <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        Receita
                      </span>
                    ) : (
                      <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                        Despesa
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{record.category}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{record.description}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {record.schoolId === 'school1' ? 'Escola Estação Central' :
                     record.schoolId === 'school2' ? 'Escola Estação Norte' :
                     'Escola Estação Sul'}
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${
                    record.type === 'income' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    R$ {record.amount.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {records.length === 0 && (
          <div className="py-8 text-center text-gray-500">
            Nenhum registro financeiro encontrado com os filtros aplicados.
          </div>
        )}
      </div>
    </div>
  );
};

export default Finance;