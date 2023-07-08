import { VanCarInterface } from 'interfaces/van-car';
import { BookingManagerInterface } from 'interfaces/booking-manager';
import { CompanyInterface } from 'interfaces/company';
import { GetQueryInterface } from 'interfaces';

export interface BookingInterface {
  id?: string;
  status: string;
  booking_manager_id?: string;
  company_id?: string;
  created_at?: any;
  updated_at?: any;
  van_car?: VanCarInterface[];
  booking_manager?: BookingManagerInterface;
  company?: CompanyInterface;
  _count?: {
    van_car?: number;
  };
}

export interface BookingGetQueryInterface extends GetQueryInterface {
  id?: string;
  status?: string;
  booking_manager_id?: string;
  company_id?: string;
}
