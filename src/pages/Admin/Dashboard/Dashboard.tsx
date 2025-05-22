import { BedDouble, BellRing, LogIn, LogOut } from "lucide-react";
import DashboardStatCard from "@/components/Dashbord/DashboardStatCard/DashboardStatCard.tsx";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card.tsx";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table.tsx";
import {bookings, users} from "@/utils/dummy/dummy.ts";




const Dashboard = () => {
    return (
        <div>
            <div className="grid grid-cols-4 h-[25vh] gap-5 auto-rows-[100%] mt-10 px-5">
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
                    label={"Check In"}
                    Icon={(props) => <LogIn {...props} />}
                />
                <DashboardStatCard
                    bgColor={"bg-[#FF996B]"}
                    count={74}
                    label={"Check Out"}
                    Icon={(props) => <LogOut {...props} />}
                />
            </div>
            <div className="mt-10 px-5">
                <Card>
                    <CardHeader>
                        <CardTitle>Latest Bookings</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[50vh] overflow-auto rounded-md shadow-lg mt-[10px] px-[10px]">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-[150px] text-md">
                                            Customer Name
                                        </TableHead>
                                        <TableHead className="w-[100px] text-md">
                                            Room Number
                                        </TableHead>
                                        <TableHead className="w-[100px] text-md">
                                            Check_In
                                        </TableHead>
                                        <TableHead className="w-[100px] text-md">
                                            Check_Out
                                        </TableHead>
                                        <TableHead className="w-[100px] text-center text-md">
                                            Guest Count
                                        </TableHead>
                                        <TableHead className="w-[100px] text-md">
                                            Deposit Amount
                                        </TableHead>
                                        <TableHead className="w-[100px] text-md">
                                            Total Amount
                                        </TableHead>
                                        <TableHead className="w-[100px] text-md">Status</TableHead>
                                        <TableHead className="w-[100px] text-md">
                                            CreatedAt
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {
                                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                        bookings.map((booking: any) => {
                                            return (
                                                <TableRow>
                                                    <TableCell>{booking.customerName}</TableCell>
                                                    <TableCell>{booking.roomNo}</TableCell>
                                                    <TableCell>{booking.checkIn}</TableCell>
                                                    <TableCell>{booking.checkOut}</TableCell>
                                                    <TableCell className="text-center">
                                                        {booking.guestCount}
                                                    </TableCell>
                                                    <TableCell className="text-right">
                                                        {booking.depositAmount}
                                                    </TableCell>
                                                    <TableCell className="text-right">
                                                        {booking.totalAmount}
                                                    </TableCell>
                                                    <TableCell
                                                        className={
                                                            booking.status === "Pending"
                                                                ? "text-blue-500"
                                                                : booking.status === "Approved"
                                                                    ? "text-green-500"
                                                                    : "text-red-500"
                                                        }
                                                    >
                                                        {booking.status}
                                                    </TableCell>
                                                    <TableCell>{booking.createdAt}</TableCell>
                                                </TableRow>
                                            );
                                        })
                                    }
                                </TableBody>
                            </Table>
                        </div>
                    </CardContent>
                </Card>
            </div>
            <div className="mt-10 px-5">
                <Card>
                    <CardHeader>
                        <CardTitle>Newest Users </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[50vh] overflow-auto rounded-md shadow-lg mt-[10px] px-[10px]">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-[100px] text-center text-md">
                                            Profile
                                        </TableHead>
                                        <TableHead className="w-[100px] text-md">Name</TableHead>
                                        <TableHead className="w-[100px] text-md">Email</TableHead>
                                        <TableHead className="w-[100px] text-md">
                                            Ph Number
                                        </TableHead>
                                        <TableHead className="w-[100px] text-md">Role</TableHead>
                                        <TableHead className="w-[100px] text-md">Points</TableHead>
                                        <TableHead className="w-[100px] text-md">Coupon</TableHead>
                                        <TableHead className="w-[100px] text-md">
                                            CreatedAt
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {
                                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                        users.map((user: any) => {
                                            return (
                                                <TableRow>
                                                    <TableCell>
                                                        <div className="w-[30px] h-[30px]  rounded-md shadow-lg mx-auto">
                                                            <img
                                                                src={user.profile}
                                                                alt="user.profile"
                                                                className="w-full h-full rounded-md shadow-lg"
                                                            />
                                                        </div>
                                                    </TableCell>
                                                    <TableCell>{user.name}</TableCell>
                                                    <TableCell>{user.email}</TableCell>
                                                    <TableCell>{user.phNo}</TableCell>
                                                    <TableCell>{user.role}</TableCell>
                                                    <TableCell>{user.points}</TableCell>
                                                    <TableCell>{user.coupon}</TableCell>
                                                    <TableCell>{user.createdAt}</TableCell>
                                                </TableRow>
                                            );
                                        })
                                    }
                                </TableBody>
                            </Table>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/*<div className="grid grid-cols-2 mt-10">*/}
            {/*  <div> Quick Actions</div>*/}
            {/*  <div> Chart</div>*/}
            {/*</div>*/}
        </div>
    );
};

export default Dashboard;
