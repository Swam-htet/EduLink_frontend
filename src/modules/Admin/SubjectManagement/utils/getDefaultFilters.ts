import { SubjectFilterParams } from '@/modules/Admin/SubjectManagement/schemas/subject.schema';
import { SubjectSortBy } from '@/modules/Admin/SubjectManagement/types/subject.types';
import { SortDirection } from '@/shared/types';

export const getDefaultFilters = (): SubjectFilterParams => {
  return {
    sort_by: SubjectSortBy.CREATED_AT,
    sort_direction: SortDirection.Desc
  };
};
