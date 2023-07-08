import { BookingInterface } from 'interfaces/booking';
import { VanCarInterface } from 'interfaces/van-car';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface CompanyInterface {
  id?: string;
  description?: string;
  image?: string;
  name: string;
  created_at?: any;
  updated_at?: any;
  user_id: string;
  tenant_id: string;
  booking?: BookingInterface[];
  van_car?: VanCarInterface[];
  user?: UserInterface;
  _count?: {
    booking?: number;
    van_car?: number;
  };
}

export interface CompanyGetQueryInterface extends GetQueryInterface {
  id?: string;
  description?: string;
  image?: string;
  name?: string;
  user_id?: string;
  tenant_id?: string;
}
