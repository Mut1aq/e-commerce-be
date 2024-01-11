import { OrderStatus } from '../enums/order-status.enum';

export interface TimelineI {
  status: OrderStatus;
  date: string;
  message?: string;
}
