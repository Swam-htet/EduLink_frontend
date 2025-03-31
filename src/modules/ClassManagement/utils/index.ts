import type { ClassFilterParams } from '../types/class.types';

export const createDefaultFilterParams = (): ClassFilterParams => ({
  per_page: 15,
  current_page: 1,
  sort_by: 'created_at',
  sort_direction: 'desc'
});
