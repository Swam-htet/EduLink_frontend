import { SubjectFilterParams } from '@/modules/SubjectManagement/schemas/subject.schema';
import { SubjectSortBy } from '@/modules/SubjectManagement/types/subject.types';
import { SortDirection } from '@/shared/types';

export const getDefaultFilters = (): SubjectFilterParams => {
  return {
    sort_by: SubjectSortBy.CREATED_AT,
    sort_direction: SortDirection.Desc
  };
};
