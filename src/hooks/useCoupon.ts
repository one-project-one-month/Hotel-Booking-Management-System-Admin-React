import Axios from "@/config/ApiConfig";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { CouponList } from "@/utils/types/couponTypes/couponTypes.ts";

const getAllCoupons = async (): Promise<CouponList[]> => {
  const response = await Axios.get("coupons?order_by=asc&sort_by=discount");
  return response.data.data;
};

const createCoupon = async (newCoupon: Partial<CouponList>) => {
  const response = await Axios.post("coupons", newCoupon);
  return response.data.data;
};

const updateCoupon = async (id: string, updatedCoupon: Partial<CouponList>) => {
  const response = await Axios.patch(`coupons/${id}`, updatedCoupon);
  return response.data.data;
};


const getCouponById = async (id: string) => {
  const response = await Axios.get(`coupons/${id}`);
  return response.data.data;
};

const deleteCoupon = async (id: string) => {
  await Axios.delete(`coupons/${id}`);
  return id;
};

export const useCoupon = () => {
  const queryClient = useQueryClient();

  const getAllCouponsQuery = useQuery({
    queryKey: ["coupons"],
    queryFn: getAllCoupons,
  });

  const createCouponMutation = useMutation({
    mutationKey: ["coupons"],
    mutationFn: createCoupon,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["coupons"] });
    },
  });

  return { getAllCouponsQuery, createCouponMutation };
};

interface Props {
  id: string;
}
export const useCouponById = ({ id }: Props) => {
  const queryClient = useQueryClient();

  const getCouponByIdQuery = useQuery({
    queryKey: ["coupons", id],
    queryFn: () => getCouponById(id),
  });

  const updateCouponMutation = useMutation({
    mutationKey: ["coupons", id],
    mutationFn: (updatedCoupon: Partial<CouponList>) => updateCoupon(id, updatedCoupon),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["coupons"] });
    },
  });


  const deleteCouponMutation = useMutation({
    mutationKey: ["coupons"],
    mutationFn: () => deleteCoupon(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["coupons"] });
    },
  });

  return {
    getCouponByIdQuery,
    updateCouponMutation,
    deleteCouponMutation,
  };
};
