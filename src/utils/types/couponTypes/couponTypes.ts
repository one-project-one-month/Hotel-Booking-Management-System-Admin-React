export interface CouponList {
  id: string;
  code: string;
  user_id: string;
  discount: number;
  expiry_date: string;
  is_active: boolean;
  created_at: string;
  is_claimed: boolean;
}
