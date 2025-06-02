import { BedDouble, BellRing, PersonStanding , Ticket  } from "lucide-react";
import DashboardStatCard from "@/components/Dashbord/DashboardStatCard/DashboardStatCard.tsx";
import UserChart from "@/components/Dashbord/UserChart";
import BookingChart from "@/components/Dashbord/BookingChart";
import {useBooking} from "@/hooks/useBooking";
import { useUser } from "@/hooks/useUser";
import { useRoom } from "@/hooks/useRooms";




const Dashboard = () => {

    const {bookingQuery} = useBooking();
    const { userQuery } = useUser();

    const {getAllRoomsQuery} = useRoom()


    const {data:user} = userQuery;
    const {data:booking} = bookingQuery;
    const {data:room} = getAllRoomsQuery
    

    return (
        <div>
            <div className="grid grid-cols-4 h-[120px] gap-5 mt-5 auto-rows-[90%]">
                <DashboardStatCard
                    bgColor={"bg-[#59CBFF]"}
                    count={booking?.length || 0}
                    label={"New Bookings"}
                    Icon={(props) => <BellRing {...props} />}
                />
                <DashboardStatCard
                    bgColor={"bg-[#52ED97] "}
                    count={room?.length || 0}
                    label={"Available Rooms"}
                    Icon={(props) => <BedDouble {...props} />}
                />
                <DashboardStatCard
                    bgColor={"bg-[#FED077] "}
                    count={user?.length || 0}
                    label={"New UserList"}
                    Icon={(props) => <PersonStanding  {...props} />}
                />
                <DashboardStatCard
                    bgColor={"bg-[#FF996B]"}
                    count={74}
                    label={"Used Coupon"}
                    Icon={(props) => <Ticket  {...props} />}
                />
            </div>
            <div className="grid grid-cols-2 gap-5 mt-8">
                <div className="h-[calc(100vh-300px)] rounded-xl shadow-lg px-3">
                    <h3 className="p-3 text-2xl font-bold">User Lists</h3>
                    <UserChart />
                </div>
                <div  className="h-[calc(100vh-300px)] rounded-xl shadow-lg px-3">
                    <h3 className="p-3 text-2xl font-bold">Booking Lists</h3>
                    <BookingChart />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
