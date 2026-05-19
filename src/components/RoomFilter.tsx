import React from 'react';
import { useResort } from '../context/ResortContext';
import { Filter, ArrowUpDown, CheckCircle } from 'lucide-react';

export const RoomFilter: React.FC = () => {
  const { filterState, setFilterState } = useResort();

  const handleTypeChange = (type: string) => {
    setFilterState(prev => ({ ...prev, type }));
  };

  const handleCapacityChange = (capacity: string) => {
    setFilterState(prev => ({ ...prev, capacity }));
  };

  const handlePriceChange = (priceRange: string) => {
    setFilterState(prev => ({ ...prev, priceRange }));
  };

  const handleStatusChange = (status: string) => {
    setFilterState(prev => ({ ...prev, status }));
  };

  const handleSortChange = (sortBy: string) => {
    setFilterState(prev => ({ ...prev, sortBy }));
  };

  const resetFilters = () => {
    setFilterState({
      type: 'All',
      capacity: 'All',
      priceRange: 'All',
      status: 'Available',
      sortBy: 'Lowest Price'
    });
  };

  return (
    <div id="accommodations-section" className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center pb-4 mb-6 border-b border-gray-100 gap-4">
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-emerald-600" />
          <h2 className="text-xl font-bold text-gray-900">Filter by:</h2>
        </div>
        <div className="flex items-center gap-4 w-full md:w-auto justify-between">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <ArrowUpDown className="w-4 h-4 text-emerald-600" />
            <span className="font-medium whitespace-nowrap">Sort by:</span>
            <select
              value={filterState.sortBy}
              onChange={(e) => handleSortChange(e.target.value)}
              className="bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-lg px-3 py-1.5 font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="Lowest Price">Lowest Price</option>
              <option value="Highest Price">Highest Price</option>
              <option value="Capacity">Capacity</option>
              <option value="Name">Name</option>
            </select>
          </div>
          <button
            onClick={resetFilters}
            className="text-xs text-emerald-600 hover:text-emerald-700 font-semibold underline cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Accommodation Type */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
            Accommodation Type
          </label>
          <div className="flex flex-wrap gap-2">
            {['All', 'Lodge', 'Cottage'].map(type => (
              <button
                key={type}
                onClick={() => handleTypeChange(type)}
                className={`px-3.5 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  filterState.type === type
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Capacity */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
            Capacity
          </label>
          <div className="flex flex-wrap gap-2">
            {['All', '2 guests', '4 guests', '6 guests', '8+ guests'].map(cap => {
              const val = cap === 'All' ? 'All' : cap.split(' ')[0];
              return (
                <button
                  key={cap}
                  onClick={() => handleCapacityChange(val)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    filterState.capacity === val
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {cap}
                </button>
              );
            })}
          </div>
        </div>

        {/* Price Range */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
            Price Range
          </label>
          <div className="space-y-1.5">
            {[
              { label: 'All Prices', val: 'All' },
              { label: '₱1,000 - ₱2,000', val: '1000-2000' },
              { label: '₱2,001 - ₱3,500', val: '2001-3500' },
              { label: '₱3,501 and above', val: '3501+' }
            ].map(item => (
              <button
                key={item.val}
                onClick={() => handlePriceChange(item.val)}
                className={`w-full text-left px-3 py-1.5 rounded-lg text-sm font-medium transition-colors block ${
                  filterState.priceRange === item.val
                    ? 'bg-emerald-600 text-white shadow-sm font-semibold'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* Status */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
            Status
          </label>
          <div className="flex gap-2">
            {['Available', 'All'].map(status => (
              <button
                key={status}
                onClick={() => handleStatusChange(status)}
                className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-1.5 transition-colors ${
                  filterState.status === status
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {status === 'Available' && <CheckCircle className="w-4 h-4" />}
                {status === 'Available' ? 'Available Only' : 'Show All'}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
