import { ExamFilterFormData } from '@/modules/Admin/ExamManagement/schemas/exam.schema';
import { ExamSortBy } from '@/modules/Admin/ExamManagement/types/exam.types';
import { SortDirection } from '@/types';

export const getDefaultFilters = (): ExamFilterFormData => ({
  per_page: 15,
  sort_by: ExamSortBy.CREATED_AT,
  sort_direction: SortDirection.Desc
});
