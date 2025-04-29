'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Farmer } from '@repo/types';
import { CalendarDays, Crop, MapPin, Phone, User } from 'lucide-react';
import Link from 'next/link';

type ProfileSummaryProps = {
  farmer: Farmer;
};

const ProfileSummary = ({ farmer }: ProfileSummaryProps) => {
  console.log('Farmer Profile Summary', farmer);

  // Get first name initial for avatar fallback
  const getInitials = (
    farmer: Farmer & {
      name: string;
    }
  ) => {
    if (!farmer?.name) return 'NA';
    const nameParts = farmer.name.trim().split(' ');
    const firstInitial = nameParts[0]?.charAt(0) || '';
    const lastInitial = nameParts[1]?.charAt(0) || '';
    return firstInitial + lastInitial;
  };

  return (
    <Card className="shadow-md">
      <CardHeader className="flex flex-col items-center pb-2 pt-6 space-y-3">
        <Avatar className="h-24 w-24 border-4 border-primary/20">
          <AvatarImage
            src={farmer.profileImageUrl || undefined}
            alt={farmer?.user?.name || 'Farmer'}
          />
          <AvatarFallback className="text-2xl">
            {getInitials(farmer as Farmer & { name: string })}
          </AvatarFallback>
        </Avatar>
        <div className="text-center space-y-1">
          <CardTitle>{farmer?.user?.name}</CardTitle>

          <p className="text-muted-foreground text-sm">{farmer.code}</p>
          <Badge
            variant="outline"
            className="bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400"
          >
            {farmer.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Crop className="h-4 w-4 text-primary" />
            <div>
              <p className="text-sm font-medium">Main Crop</p>
              <p className="text-sm text-muted-foreground">{farmer.mainCrop}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <MapPin className="h-4 w-4 text-primary" />
            <div>
              <p className="text-sm font-medium">Farm Location</p>
              <p className="text-sm text-muted-foreground">
                {farmer.physicalAddress || 'Not specified'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <CalendarDays className="h-4 w-4 text-primary" />
            <div>
              <p className="text-sm font-medium">Farm Size</p>
              <p className="text-sm text-muted-foreground">
                {farmer.farmSize} acres
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Phone className="h-4 w-4 text-primary" />
            <div>
              <p className="text-sm font-medium">Contact</p>
              <p className="text-sm text-muted-foreground">{farmer.phone}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <User className="h-4 w-4 text-primary" />
            <div>
              <p className="text-sm font-medium">Contact Person</p>
              <p className="text-sm text-muted-foreground">
                {farmer.contactPerson || 'Same as owner'}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="border-t pt-4 flex flex-col space-y-2">
        <Button variant="outline" className="w-full">
          <Link href="/dashboard/profile">Edit Profile</Link>
        </Button>
        <Button variant="default" className="w-full">
          <Link href="/dashboard/products/new">Add New Product</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProfileSummary;
