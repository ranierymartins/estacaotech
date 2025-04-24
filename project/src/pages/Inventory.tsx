import React, { useState, useEffect } from 'react';
import { useAuthStore } from '../store/authStore';
import { inventoryItems } from '../mockData';
import { InventoryItem } from '../types';
import StatusBadge from '../components/common/StatusBadge';
import { Package2, Search, Filter } from 'lucide-react';

const Inventory: React.FC = () => {
  const { user } = useAuthStore();
  const [items, setItems] = useState<InventoryItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedSchool, setSelectedSchool] = useState<string>('');
  
  // Get unique categories for filtering
  const categories = Array.from(new Set(inventoryItems.map(item => item.category)));
  
  // Get schools based on user role
  const userSchools = user?.role === 'secretary' 
    ? ['school1', 'school2', 'school3'] 
    : user?.schoolIds || [];
  
  useEffect(() => {
    if (user) {
      // Filter items based on user's role and assigned schools
      let filteredItems = [...inventoryItems];
      
      if (user.role !== 'secretary') {
        // If not secretary, only show items from user's school
        filteredItems = filteredItems.filter(item => 
          user.schoolIds.includes(item.schoolId)
        );
      }
      
      // Apply search filter
      if (searchTerm) {
        filteredItems = filteredItems.filter(item =>
          item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.category.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
      
      // Apply category filter
      if (selectedCategory) {
        filteredItems = filteredItems.filter(item => 
          item.category === selectedCategory
        );
      }
      
      // Apply school filter (only for secretary)
      if (user.role === 'secretary' && selectedSchool) {
        filteredItems = filteredItems.filter(item => 
          item.schoolId === selectedSchool
        );
      }
      
      setItems(filteredItems);
    }
  }, [user, searchTerm, selectedCategory, selectedSchool]);
  
  // Get status based on quantity vs minQuantity
  const getQuantityStatus = (quantity: number, minQuantity: number) => {
    if (quantity <= minQuantity * 0.5) {
      return 'critical';
    } else if (quantity <= minQuantity) {
      return 'low';
    } else {
      return 'normal';
    }
  };
  
  // For secretary, they should be able to see all schools
  const schoolOptions = user?.role === 'secretary' 
    ? [
        { id: 'school1', name: 'Escola Estação Central' },
        { id: 'school2', name: 'Escola Estação Norte' },
        { id: 'school3', name: 'Escola Estação Sul' },
      ]
    : [];
  
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Controle de Estoque</h1>
      <p className="text-gray-600 mb-8">
        Gerencie o estoque de itens da escola e visualize informações sobre disponibilidade.
      </p>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div className="relative w-full md:w-1/3">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={20} className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Pesquisar itens..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Filter size={20} className="text-gray-400" />
              </div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
              >
                <option value="">Todas as Categorias</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            
            {user?.role === 'secretary' && (
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Package2 size={20} className="text-gray-400" />
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
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Item
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Categoria
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Escola
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Quantidade
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Valor Unitário
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Valor Total
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {items.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="ml-0">
                        <div className="text-sm font-medium text-gray-900">{item.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{item.category}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {item.schoolId === 'school1' ? 'Escola Estação Central' :
                       item.schoolId === 'school2' ? 'Escola Estação Norte' :
                       'Escola Estação Sul'}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.quantity} unid. (min: {item.minQuantity})
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <StatusBadge 
                      status={getQuantityStatus(item.quantity, item.minQuantity)} 
                      text={
                        getQuantityStatus(item.quantity, item.minQuantity) === 'critical' 
                          ? 'Crítico' 
                          : getQuantityStatus(item.quantity, item.minQuantity) === 'low'
                            ? 'Baixo'
                            : 'Normal'
                      }
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    R$ {item.price.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                    R$ {(item.price * item.quantity).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {items.length === 0 && (
          <div className="py-8 text-center text-gray-500">
            Nenhum item encontrado com os filtros aplicados.
          </div>
        )}
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Resumo do Estoque</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
            <h3 className="text-sm font-medium text-blue-800 mb-1">Total de Itens</h3>
            <p className="text-3xl font-bold">{items.length}</p>
          </div>
          
          <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-100">
            <h3 className="text-sm font-medium text-yellow-800 mb-1">Itens com Estoque Baixo</h3>
            <p className="text-3xl font-bold">
              {items.filter(item => 
                getQuantityStatus(item.quantity, item.minQuantity) === 'low'
              ).length}
            </p>
          </div>
          
          <div className="bg-red-50 rounded-lg p-4 border border-red-100">
            <h3 className="text-sm font-medium text-red-800 mb-1">Itens em Estado Crítico</h3>
            <p className="text-3xl font-bold">
              {items.filter(item => 
                getQuantityStatus(item.quantity, item.minQuantity) === 'critical'
              ).length}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inventory;