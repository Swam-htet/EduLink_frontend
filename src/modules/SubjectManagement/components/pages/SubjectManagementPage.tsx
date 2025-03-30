import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SubjectFilter } from '@/modules/SubjectManagement/components/filters/SubjectFilter';
import { SubjectTable } from '@/modules/SubjectManagement/components/tables/SubjectTable';
import SubjectManagementService from '@/modules/SubjectManagement/services/SubjectManagement.service';
import type { Subject, SubjectFilterParams } from '@/modules/SubjectManagement/types/subject.types';
import { getDefaultFilters } from '@/modules/SubjectManagement/utils/getDefaultFilters';
import { useQuery } from '@tanstack/react-query';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const SubjectManagementPage = () => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState<SubjectFilterParams>(getDefaultFilters());

  const subjectManagementQuery = useQuery({
    queryKey: ['subjects', filters],
    queryFn: () => SubjectManagementService.getSubjects(filters)
  });

  const handleEdit = (subject: Subject) => {
    console.log(subject);
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Subject Management</h1>
        <Button onClick={() => navigate('/subject-management/new')}>
          <Plus className="mr-2 h-4 w-4" />
          Add Subject
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <SubjectFilter filters={filters} onFilterChange={setFilters} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Subject List</CardTitle>
        </CardHeader>
        <CardContent>
          <SubjectTable
            data={subjectManagementQuery.data?.data || []}
            isLoading={subjectManagementQuery.isPending}
            onRowClick={(subject) => navigate(`/subject-management/${subject.id}`)}
            onEdit={handleEdit}
          />
        </CardContent>
      </Card>
    </div>
  );
};
