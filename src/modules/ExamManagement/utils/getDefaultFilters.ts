import type { ExamFilterParams } from '@/modules/ExamManagement/types/exam.types';

export const getDefaultFilters = (): ExamFilterParams => ({
  per_page: 15,
  sort_by: 'created_at',
  sort_direction: 'desc'
});
