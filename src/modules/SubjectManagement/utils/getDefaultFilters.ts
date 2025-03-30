import type { SubjectFilterParams } from '../types/subject.types';

export const getDefaultFilters = (): SubjectFilterParams => {
  return {
    sort_by: 'created_at',
    sort_direction: 'desc'
  };
};
