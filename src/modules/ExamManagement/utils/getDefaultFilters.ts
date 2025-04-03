import { ExamFilterFormData } from '@/modules/ExamManagement/schemas/exam.schema';
import { ExamSortBy } from '@/modules/ExamManagement/types/exam.types';
import { SortDirection } from '@/shared/types';

export const getDefaultFilters = (): ExamFilterFormData => ({
  per_page: 15,
  sort_by: ExamSortBy.CREATED_AT,
  sort_direction: SortDirection.Desc
});
