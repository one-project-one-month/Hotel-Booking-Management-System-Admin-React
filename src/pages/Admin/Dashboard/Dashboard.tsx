import { BedDouble, BellRing, LogIn, LogOut } from "lucide-react";
import DashboardStatCard from "@/components/Dashbord/DashboardStatCard/DashboardStatCard.tsx";




const Dashboard = () => {
    return (
        <div>
            <div className="grid grid-cols-4 h-[120px] gap-5 mt-3 auto-rows-[100%] px-5">
                <DashboardStatCard
                    bgColor={"bg-[#59CBFF]"}
                    count={875}
                    label={"New Bookings"}
                    Icon={(props) => <BellRing {...props} />}
                />
                <DashboardStatCard
                    bgColor={"bg-[#52ED97] "}
                    count={1875}
                    label={"Available Rooms"}
                    Icon={(props) => <BedDouble {...props} />}
                />
                <DashboardStatCard
                    bgColor={"bg-[#FED077] "}
                    count={67}
                    label={"New UserList"}
                    Icon={(props) => <LogIn {...props} />}
                />
                <DashboardStatCard
                    bgColor={"bg-[#FF996B]"}
                    count={74}
                    label={"Used Coupon"}
                    Icon={(props) => <LogOut {...props} />}
                />
            </div>
        </div>
    );
};

export default Dashboard;
