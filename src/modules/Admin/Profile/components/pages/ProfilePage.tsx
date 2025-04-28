import { LoadingPage } from '@/components/pages';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatDate } from '@/lib/utils';
import { useAdminAuth } from '@/modules/Admin/Auth/hooks/useAdminAuth';
import { Briefcase, CalendarDays, GraduationCap, Mail, MapPin, Phone, User } from 'lucide-react';

interface Qualifications {
  degree: string;
  subject: string;
  experience: number;
}

export const ProfilePage = () => {
  const { adminUser } = useAdminAuth();

  if (!adminUser) {
    return <LoadingPage />;
  }

  return (
    <div className="container mx-auto space-y-6 p-6">
      {/* Profile Header */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col items-center gap-6 md:flex-row">
            <Avatar className="h-24 w-24">
              <AvatarImage src={adminUser.profile_photo || ''} alt={adminUser.first_name} />
              <AvatarFallback>
                {adminUser.first_name[0]}
                {adminUser.last_name[0]}
              </AvatarFallback>
            </Avatar>
            <div className="space-y-2 text-center md:text-left">
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold">
                  {adminUser.first_name} {adminUser.last_name}
                </h1>
                <span className="bg-primary/10 text-primary rounded-full px-3 py-1 text-xs font-medium capitalize">
                  {adminUser.role}
                </span>
              </div>
              <div className="flex items-center justify-center gap-2 md:justify-start">
                <Mail className="text-muted-foreground h-4 w-4" />
                <span>{adminUser.email}</span>
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
              <span>{adminUser.phone}</span>
            </div>
            <div className="flex items-center gap-2">
              <User className="text-muted-foreground h-4 w-4" />
              <span className="text-muted-foreground text-sm">Gender:</span>
              <span className="capitalize">{adminUser.gender}</span>
            </div>
            <div className="flex items-center gap-2">
              <CalendarDays className="text-muted-foreground h-4 w-4" />
              <span className="text-muted-foreground text-sm">Date of Birth:</span>
              <span>{formatDate(adminUser.date_of_birth)}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="text-muted-foreground h-4 w-4" />
              <span className="text-muted-foreground text-sm">Address:</span>
              <span>{adminUser.address}</span>
            </div>
            {adminUser.nrc && (
              <div className="flex items-center gap-2">
                <User className="text-muted-foreground h-4 w-4" />
                <span className="text-muted-foreground text-sm">NRC:</span>
                <span>{adminUser.nrc}</span>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Professional Information */}
        <Card>
          <CardHeader>
            <CardTitle>Professional Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-2">
              <Briefcase className="text-muted-foreground h-4 w-4" />
              <span className="text-muted-foreground text-sm">Role:</span>
              <span className="capitalize">{adminUser.role}</span>
            </div>
            <div className="flex items-center gap-2">
              <CalendarDays className="text-muted-foreground h-4 w-4" />
              <span className="text-muted-foreground text-sm">Joined Date:</span>
              <span>{formatDate(adminUser.joined_date)}</span>
            </div>
            {adminUser.qualifications && (
              <div className="flex items-start gap-2">
                <GraduationCap className="text-muted-foreground mt-1 h-4 w-4" />
                <span className="text-muted-foreground text-sm">Qualifications:</span>
                <span className="flex-1">
                  {typeof adminUser.qualifications === 'object'
                    ? `${(adminUser.qualifications as Qualifications).degree} in ${(adminUser.qualifications as Qualifications).subject} (${(adminUser.qualifications as Qualifications).experience} years experience)`
                    : adminUser.qualifications}
                </span>
              </div>
            )}
            <div className="flex items-center gap-2">
              <CalendarDays className="text-muted-foreground h-4 w-4" />
              <span className="text-muted-foreground text-sm">Account Created:</span>
              <span>{formatDate(adminUser.created_at)}</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
