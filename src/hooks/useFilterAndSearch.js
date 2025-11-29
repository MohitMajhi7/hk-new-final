import { useMemo } from 'react';

export function useFilterAndSearch(list, { q = '', status = '', category = '' }) {
  return useMemo(() => {
    if (!list) return [];

    return list.filter(item => {
      // Search filter
      const searchLower = q.toLowerCase();
      const matchesSearch = !q || 
        item.title?.toLowerCase().includes(searchLower) ||
        item.category?.toLowerCase().includes(searchLower);

      // Status filter
      const matchesStatus = !status || item.status === status;

      // Category filter
      const matchesCategory = !category || item.category === category;

      return matchesSearch && matchesStatus && matchesCategory;
    });
  }, [list, q, status, category]);
}
