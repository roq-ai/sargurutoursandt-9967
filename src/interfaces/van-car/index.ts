import { CompanyInterface } from 'interfaces/company';
import { BookingInterface } from 'interfaces/booking';
import { GetQueryInterface } from 'interfaces';

export interface VanCarInterface {
  id?: string;
  status: string;
  company_id?: string;
  booking_id?: string;
  created_at?: any;
  updated_at?: any;

  company?: CompanyInterface;
  booking?: BookingInterface;
  _count?: {};
}

export interface VanCarGetQueryInterface extends GetQueryInterface {
  id?: string;
  status?: string;
  company_id?: string;
  booking_id?: string;
}
