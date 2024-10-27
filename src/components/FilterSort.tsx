import React from 'react';

interface FilterSortProps {
  onFilterChange: (filter: string) => void;
  onSortChange: (sort: string) => void;
}

const FilterSort: React.FC<FilterSortProps> = ({ onFilterChange, onSortChange }) => {
  return (
    <div className="flex space-x-4 mb-4">
      <select onChange={(e) => onFilterChange(e.target.value)} className="border p-2 rounded">
        <option value="">All</option>
        <option value="Pending">Pending</option>
        <option value="Approved">Approved</option>
        <option value="Rejected">Rejected</option>
      </select>
      <select onChange={(e) => onSortChange(e.target.value)} className="border p-2 rounded">
        <option value="date">Date</option>
        <option value="title">Title</option>
      </select>
    </div>
  );
};

export default FilterSort;

