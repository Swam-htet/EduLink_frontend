import { LoadingPage } from '@/components/pages';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatDate } from '@/lib/utils';
import { selectCurrentStudentUser } from '@/modules/Student/Auth/store/auth.slice';
import { Calendar, CalendarDays, Mail, MapPin, Phone, User, Users } from 'lucide-react';
import { useSelector } from 'react-redux';

export const ProfilePage = () => {
  const studentUser = useSelector(selectCurrentStudentUser);

  if (!studentUser) {
    return <LoadingPage />;
  }

  return (
    <div className="container mx-auto space-y-6 p-6">
      {/* Profile Header */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col items-center gap-6 md:flex-row">
            <Avatar className="h-24 w-24">
              <AvatarImage src={studentUser.profile_photo || ''} alt={studentUser.first_name} />
              <AvatarFallback>
                {studentUser.first_name[0]}
                {studentUser.last_name[0]}
              </AvatarFallback>
            </Avatar>
            <div className="space-y-2 text-center md:text-left">
              <h1 className="text-2xl font-bold">
                {studentUser.first_name} {studentUser.last_name}
              </h1>
              <p className="text-muted-foreground">Student ID: {studentUser.student_id}</p>
              <div className="flex items-center justify-center gap-2 md:justify-start">
                <Mail className="h-4 w-4" />
                <span>{studentUser.email}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Personal Information */}
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-2">
              <Phone className="text-muted-foreground h-4 w-4" />
              <span className="text-muted-foreground text-sm">Phone:</span>
              <span>{studentUser.phone}</span>
            </div>
            <div className="flex items-center gap-2">
              <User className="text-muted-foreground h-4 w-4" />
              <span className="text-muted-foreground text-sm">Gender:</span>
              <span className="capitalize">{studentUser.gender}</span>
            </div>
            <div className="flex items-center gap-2">
              <CalendarDays className="text-muted-foreground h-4 w-4" />
              <span className="text-muted-foreground text-sm">Date of Birth:</span>
              <span>{formatDate(studentUser.date_of_birth)}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="text-muted-foreground h-4 w-4" />
              <span className="text-muted-foreground text-sm">Address:</span>
              <span>{studentUser.address}</span>
            </div>
            {studentUser.nrc && (
              <div className="flex items-center gap-2">
                <User className="text-muted-foreground h-4 w-4" />
                <span className="text-muted-foreground text-sm">NRC:</span>
                <span>{studentUser.nrc}</span>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Guardian Information */}
        <Card>
          <CardHeader>
            <CardTitle>Guardian Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-2">
              <Users className="text-muted-foreground h-4 w-4" />
              <span className="text-muted-foreground text-sm">Name:</span>
              <span>{studentUser.guardian_info.name}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="text-muted-foreground h-4 w-4" />
              <span className="text-muted-foreground text-sm">Phone:</span>
              <span>{studentUser.guardian_info.phone}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="text-muted-foreground h-4 w-4" />
              <span className="text-muted-foreground text-sm">Relationship:</span>
              <span className="capitalize">{studentUser.guardian_info.relationship}</span>
            </div>
          </CardContent>
        </Card>

        {/* Enrollment Information */}
        <Card>
          <CardHeader>
            <CardTitle>Enrollment Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-2">
              <Calendar className="text-muted-foreground h-4 w-4" />
              <span className="text-muted-foreground text-sm">Enrollment Date:</span>
              <span>{formatDate(studentUser.enrollment_date)}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="text-muted-foreground h-4 w-4" />
              <span className="text-muted-foreground text-sm">Joined:</span>
              <span>{formatDate(studentUser.created_at)}</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
