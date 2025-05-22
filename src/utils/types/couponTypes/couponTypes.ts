export interface Coupon {
    id: number;
    code: string;
    discount_pct: number;
    expiry_date: string;
    is_active: boolean;
    created_at: string;
    is_claimed: boolean;
}
