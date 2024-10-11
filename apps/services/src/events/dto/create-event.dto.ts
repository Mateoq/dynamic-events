export class CreateEventDto {
  title: string;
  description: string;
  city: string;
  startYear: string;
  startMonth: string;
  startDate: string;
  endYear: string;
  endMonth: string;
  endDate: string;
  startTime?: string;
  endTime?: string;
  fullDay?: boolean;
  color: string;
  userId: string;
}
