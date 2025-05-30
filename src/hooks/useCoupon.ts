// import Axios from "@/config/ApiConfig";
//
// import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// import type { Room } from "@/utils/types/couponTypes/roomTypes.ts";
//
// const getAllRooms = async (): Promise<Room[]> => {
//   const response = await Axios.get("room");
//   return response.data.data;
// };
//
// const createRoom = async (newRoom: Partial<Room>) => {
//   const response = await Axios.post("room", newRoom);
//   return response.data.data;
// };
//
// const updateRoom = async (id: string, patchedRoom: Partial<Room>) => {
//   const response = await Axios.patch(`room/${id}`, patchedRoom);
//   return response.data.data;
// };
//
// const updateRoomStatus = async (id: string, status: string) => {
//   const response = await Axios.patch(`room/${id}/status`, { status });
//   return response.data;
// };
//
// const updateIsFeatured = async (id: string, isFeatured: boolean) => {
//   const response = await Axios.patch(`room/${id}/is_featured`, { isFeatured });
//   return response.data;
// };
//
// const getRoomById = async (id: string) => {
//   const response = await Axios.get(`room/${id}`);
//   return response.data.data;
// };
//
// const deleteRoom = async (id: string) => {
//   await Axios.delete(`room/${id}`);
//   return id;
// };
//
// export const useRoom = () => {
//   const queryClient = useQueryClient();
//
//   const getAllRoomsQuery = useQuery({
//     queryKey: ["rooms"],
//     queryFn: getAllRooms,
//   });
//
//   const createRoomMutation = useMutation({
//     mutationKey: ["rooms"],
//     mutationFn: createRoom,
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["rooms"] });
//     },
//   });
//
//   const patchIsFeaturedMutation = useMutation({
//     mutationKey: ["rooms"],
//     mutationFn: ({ id, isFeatured }: { id: string; isFeatured: boolean }) =>
//       updateIsFeatured(id, isFeatured),
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["rooms"] });
//     },
//   });
//
//   return { getAllRoomsQuery, createRoomMutation, patchIsFeaturedMutation };
// };
//
// interface Props {
//   id: string;
// }
// export const useRoomById = ({ id }: Props) => {
//   const queryClient = useQueryClient();
//
//   const getRoomByIdQuery = useQuery({
//     queryKey: ["rooms", id],
//     queryFn: () => getRoomById(id),
//   });
//
//   const patchRoomMutation = useMutation({
//     mutationKey: ["rooms", id],
//     mutationFn: (patchedRoom: Partial<Room>) => updateRoom(id, patchedRoom),
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["rooms"] });
//     },
//   });
//
//   const patchRoomStatusMutation = useMutation({
//     mutationKey: ["rooms", id],
//     mutationFn: (status: string) => updateRoomStatus(id, status),
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["rooms"] });
//     },
//   });
//
//   const deleteRoomMutation = useMutation({
//     mutationKey: ["rooms"],
//     mutationFn: () => deleteRoom(id),
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["rooms"] });
//     },
//   });
//
//   return {
//     getRoomByIdQuery,
//     patchRoomMutation,
//     patchRoomStatusMutation,
//
//     deleteRoomMutation,
//   };
// };
