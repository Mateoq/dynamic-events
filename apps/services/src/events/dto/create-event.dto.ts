export class CreateEventDto {
  title: string;
  description: string;
  city: string;
  startYear: number;
  startMonth: number;
  startDate: number;
  endYear: number;
  endMonth: number;
  endDate: number;
  time: number;
  fullDay?: boolean;
  color: string;
  userId: string;
}
