import React, { useState } from 'react';
import { ChevronDown, ChevronUp, X } from 'lucide-react';

interface FilterOption {
  value: string;
  label: string;
}

interface FilterSection {
  name: string;
  options: FilterOption[];
}

interface ProductFiltersProps {
  categories: FilterOption[];
  priceRanges: FilterOption[];
  sizes?: FilterOption[];
  colors?: FilterOption[];
  onFilterChange: (filterType: string, value: string, isChecked: boolean) => void;
  activeFilters: Record<string, string[]>;
  onClearFilters: () => void;
}

const ProductFilters: React.FC<ProductFiltersProps> = ({
  categories,
  priceRanges,
  sizes,
  colors,
  onFilterChange,
  activeFilters,
  onClearFilters
}) => {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    'Category': true,
    'Price': true,
    'Size': false,
    'Color': false
  });

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const filterSections: FilterSection[] = [
    { name: 'Category', options: categories },
    { name: 'Price', options: priceRanges },
  ];

  if (sizes && sizes.length > 0) {
    filterSections.push({ name: 'Size', options: sizes });
  }

  if (colors && colors.length > 0) {
    filterSections.push({ name: 'Color', options: colors });
  }

  const activeFilterCount = Object.values(activeFilters).flat().length;

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium text-gray-900">Filters</h2>
        {activeFilterCount > 0 && (
          <button 
            onClick={onClearFilters}
            className="text-sm text-blue-600 hover:text-blue-800 transition-colors flex items-center"
          >
            Clear All <X size={14} className="ml-1" />
          </button>
        )}
      </div>

      {filterSections.map((section) => (
        <div key={section.name} className="mb-4 pb-4 border-b border-gray-200 last:border-0">
          <button
            className="w-full flex justify-between items-center text-left mb-2"
            onClick={() => toggleSection(section.name)}
          >
            <span className="font-medium text-gray-900">{section.name}</span>
            {expandedSections[section.name] ? (
              <ChevronUp size={18} className="text-gray-500" />
            ) : (
              <ChevronDown size={18} className="text-gray-500" />
            )}
          </button>
          
          {expandedSections[section.name] && (
            <div className="space-y-2 pl-1 mt-2">
              {section.options.map((option) => (
                <div key={option.value} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`${section.name}-${option.value}`}
                    checked={activeFilters[section.name.toLowerCase()]?.includes(option.value) || false}
                    onChange={(e) => onFilterChange(section.name.toLowerCase(), option.value, e.target.checked)}
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <label
                    htmlFor={`${section.name}-${option.value}`}
                    className="ml-2 text-sm text-gray-700"
                  >
                    {option.label}
                  </label>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ProductFilters;