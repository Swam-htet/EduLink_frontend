import Pagination from '@/components/common/Pagination';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PRIVATE_ENDPOINTS } from '@/ecosystem/PageEndpoints/Private';
import { ExamFilter } from '@/modules/ExamManagement/components/filters/ExamFilter';
import { ExamTable } from '@/modules/ExamManagement/components/tables/ExamTable';
import { ExamFilterFormData } from '@/modules/ExamManagement/schemas/exam.schema';
import { ExamManagementService } from '@/modules/ExamManagement/services/examManagement.service';
import type { Exam } from '@/modules/ExamManagement/types/exam.types';
import { getDefaultFilters } from '@/modules/ExamManagement/utils/getDefaultFilters';
import { useQuery } from '@tanstack/react-query';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const ExamManagementPage = () => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState<ExamFilterFormData>(getDefaultFilters());

  const examsQuery = useQuery({
    queryKey: ['exam-management', filters],
    queryFn: () => ExamManagementService.getExams(filters)
  });

  const handleViewDetails = (exam: Exam) => {
    navigate(`${PRIVATE_ENDPOINTS.EXAM_MANAGEMENT}/${exam.id}`);
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Exam Management</h1>
        <Button onClick={() => navigate(`${PRIVATE_ENDPOINTS.EXAM_CREATE}`)}>
          <Plus className="mr-2 h-4 w-4" />
          Create Exam
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <ExamFilter filters={filters} onFilterChange={setFilters} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Exam List</CardTitle>
        </CardHeader>
        <CardContent>
          <ExamTable
            data={examsQuery.data?.data || []}
            isLoading={examsQuery.isPending}
            onRowClick={handleViewDetails}
          />
          <div className="mt-4">
            <Pagination
              currentPage={filters.current_page ?? 1}
              totalCount={examsQuery.data?.meta?.total ?? 1}
              pageSize={filters.per_page ?? 15}
              pageSizeOptions={[15, 20, 30, 50]}
              onPageChange={(page) => {
                setFilters({
                  ...filters,
                  current_page: page
                });
              }}
              onPageSizeChange={(pageSize) => {
                setFilters({
                  ...filters,
                  per_page: pageSize,
                  current_page: 1
                });
              }}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
