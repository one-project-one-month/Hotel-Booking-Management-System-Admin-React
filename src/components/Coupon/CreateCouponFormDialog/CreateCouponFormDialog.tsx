import { Form } from "@/components/ui/form";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog.tsx";

import { Label } from "@/components/ui/label.tsx";
import CreateNewButton from "@/components/shared/CustomButtons/CreateNewButton/CreateNewButton.tsx";
import { DatePicker } from "@/components/shared/DatePicker/DatePicker.tsx";
import SubmitButton from "@/components/shared/CustomButtons/SubmitButton/SubmitButton.tsx";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import * as React from "react";
import InputFormField from "@/components/shared/FormFields/inputFormField.tsx";
import SelectUserFormField from "@/components/Coupon/SelectUserFormField/SelectUserFormField.tsx";

export interface User {
    id: number;
    name: string;
    email: string;
    "ph no": string;
    password: string;
    role: "user" | "admin" | "moderator";
    created_at: string;
    profile_img: string;
    points: number;
    coupon: number[];
}

export const users: User[] = [
    {
        id: 1,
        name: "Alice Johnson",
        email: "alice.johnson@example.com",
        "ph no": "09451234567",
        password: "hashed_pass_1",
        role: "user",
        created_at: "2025-04-10T10:32:00Z",
        profile_img: "/images/users/alice.jpg",
        points: 150,
        coupon: [3, 7],
    },
    {
        id: 2,
        name: "Bob Smith",
        email: "bob.smith@example.com",
        "ph no": "09231234567",
        password: "hashed_pass_2",
        role: "admin",
        created_at: "2025-04-12T14:10:00Z",
        profile_img: "/images/users/bob.jpg",
        points: 500,
        coupon: [1, 4, 8],
    },
    {
        id: 3,
        name: "Charlie Green",
        email: "charlie.green@example.com",
        "ph no": "09765432109",
        password: "hashed_pass_3",
        role: "user",
        created_at: "2025-03-30T09:05:00Z",
        profile_img: "/images/users/charlie.png",
        points: 75,
        coupon: [],
    },
    {
        id: 4,
        name: "Diana Lee",
        email: "diana.lee@example.com",
        "ph no": "09987654321",
        password: "hashed_pass_4",
        role: "moderator",
        created_at: "2025-05-01T13:00:00Z",
        profile_img: "/images/users/diana.jpg",
        points: 200,
        coupon: [2],
    },
    {
        id: 5,
        name: "Edward King",
        email: "edward.king@example.com",
        "ph no": "09612345678",
        password: "hashed_pass_5",
        role: "user",
        created_at: "2025-04-28T11:20:00Z",
        profile_img: "/images/users/edward.jpg",
        points: 0,
        coupon: [],
    },
    {
        id: 6,
        name: "Fiona Blake",
        email: "fiona.blake@example.com",
        "ph no": "09482345678",
        password: "hashed_pass_6",
        role: "user",
        created_at: "2025-05-10T08:44:00Z",
        profile_img: "/images/users/fiona.jpg",
        points: 320,
        coupon: [6, 9, 12],
    },
    {
        id: 7,
        name: "George Wells",
        email: "george.wells@example.com",
        "ph no": "09321234567",
        password: "hashed_pass_7",
        role: "user",
        created_at: "2025-04-05T18:00:00Z",
        profile_img: "/images/users/george.jpg",
        points: 125,
        coupon: [],
    },
    {
        id: 8,
        name: "Helen Carter",
        email: "helen.carter@example.com",
        "ph no": "09775678901",
        password: "hashed_pass_8",
        role: "admin",
        created_at: "2025-04-03T07:45:00Z",
        profile_img: "/images/users/helen.jpg",
        points: 999,
        coupon: [10],
    },
    {
        id: 9,
        name: "Ian Parker",
        email: "ian.parker@example.com",
        "ph no": "09532145678",
        password: "hashed_pass_9",
        role: "user",
        created_at: "2025-03-28T16:30:00Z",
        profile_img: "/images/users/ian.png",
        points: 45,
        coupon: [4, 7],
    },
    {
        id: 10,
        name: "Jenny Moore",
        email: "jenny.moore@example.com",
        "ph no": "09123456789",
        password: "hashed_pass_10",
        role: "moderator",
        created_at: "2025-05-15T09:00:00Z",
        profile_img: "/images/users/jenny.jpg",
        points: 210,
        coupon: [11],
    },
    {
        id: 11,
        name: "Kevin Stone",
        email: "kevin.stone@example.com",
        "ph no": "09298765432",
        password: "hashed_pass_11",
        role: "user",
        created_at: "2025-04-18T15:25:00Z",
        profile_img: "/images/users/kevin.jpg",
        points: 90,
        coupon: [],
    },
    {
        id: 12,
        name: "Laura Adams",
        email: "laura.adams@example.com",
        "ph no": "09654321098",
        password: "hashed_pass_12",
        role: "user",
        created_at: "2025-04-21T12:40:00Z",
        profile_img: "/images/users/laura.jpg",
        points: 300,
        coupon: [5, 9],
    },
    {
        id: 13,
        name: "Michael Scott",
        email: "michael.scott@example.com",
        "ph no": "09345678901",
        password: "hashed_pass_13",
        role: "user",
        created_at: "2025-04-09T10:10:00Z",
        profile_img: "/images/users/michael.jpg",
        points: 65,
        coupon: [],
    },
    {
        id: 14,
        name: "Natalie Brooks",
        email: "natalie.brooks@example.com",
        "ph no": "09765432100",
        password: "hashed_pass_14",
        role: "moderator",
        created_at: "2025-04-11T13:15:00Z",
        profile_img: "/images/users/natalie.jpg",
        points: 420,
        coupon: [2, 6],
    },
    {
        id: 15,
        name: "Oscar Newton",
        email: "oscar.newton@example.com",
        "ph no": "09198765432",
        password: "hashed_pass_15",
        role: "user",
        created_at: "2025-05-01T10:00:00Z",
        profile_img: "/images/users/oscar.jpg",
        points: 0,
        coupon: [],
    },
    {
        id: 16,
        name: "Paula White",
        email: "paula.white@example.com",
        "ph no": "09567890123",
        password: "hashed_pass_16",
        role: "user",
        created_at: "2025-04-15T09:45:00Z",
        profile_img: "/images/users/paula.jpg",
        points: 185,
        coupon: [3, 8, 10],
    },
    {
        id: 17,
        name: "Quentin Black",
        email: "quentin.black@example.com",
        "ph no": "09432145678",
        password: "hashed_pass_17",
        role: "user",
        created_at: "2025-04-17T08:30:00Z",
        profile_img: "/images/users/quentin.jpg",
        points: 95,
        coupon: [],
    },
    {
        id: 18,
        name: "Rachel Young",
        email: "rachel.young@example.com",
        "ph no": "09245678901",
        password: "hashed_pass_18",
        role: "admin",
        created_at: "2025-04-26T14:55:00Z",
        profile_img: "/images/users/rachel.jpg",
        points: 670,
        coupon: [12, 13],
    },
    {
        id: 19,
        name: "Steve Rogers",
        email: "steve.rogers@example.com",
        "ph no": "09311122334",
        password: "hashed_pass_19",
        role: "user",
        created_at: "2025-05-03T11:11:00Z",
        profile_img: "/images/users/steve.jpg",
        points: 145,
        coupon: [5],
    },
    {
        id: 20,
        name: "Tina Hall",
        email: "tina.hall@example.com",
        "ph no": "09712349876",
        password: "hashed_pass_20",
        role: "user",
        created_at: "2025-04-14T12:10:00Z",
        profile_img: "/images/users/tina.jpg",
        points: 230,
        coupon: [1, 4, 7],
    },
];

const createCuponFormSchema = z.object({
    // code: z.string().min(1, { message: "Code is required" }),
    userId: z.string().min(1, { message: "UserId is required" }),
    discount_pct: z.string().min(1, { message: "Discount Price is required" }),
    expiry_date: z.string().min(1, { message: "Expiry date is required" }),
});

export function CreateCouponFormDialog() {
    const [date, setDate] = React.useState<Date>();

    const form = useForm({
        resolver: zodResolver(createCuponFormSchema),
        mode: "onChange",
    });

    const onSubmit = (values: z.infer<typeof createCuponFormSchema>) => {
        console.log(values);
    };

    useEffect(() => {
        const getExpDate = () => {
            const year = date?.getFullYear().toString();
            const month = date?.getMonth().toString();
            const day = date?.getDate();

            const expDate = `${year}-${month}-${day}`;

            form.setValue("expiry_date", expDate);
            console.log(expDate)
        };

        getExpDate();
    }, [date,form]);
    return (
        <Dialog modal={false}>
            <DialogTrigger asChild>
                <CreateNewButton  />
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Create Cupon</DialogTitle>
                    {/*<DialogDescription>*/}
                    {/*  Make changes to your profile here. Click save when you're done.*/}
                    {/*</DialogDescription>*/}
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="grid gap-4 py-4">
                            <SelectUserFormField
                                control={form.control}
                                name={"userId"}
                                label={"User"}
                                users={users}
                                placeholder={"Select User"}
                            />
                            <InputFormField
                                control={form.control}
                                type={"number"}
                                name={"discount_pct"}
                                placeholder={"Enter Discount Price"}
                                label={"Discount Price"}
                            />

                            <div className="grid gap-2">
                                <Label> Expiry Date</Label>
                                <DatePicker date={date} setDate={setDate} />
                            </div>
                        </div>
                        <DialogFooter>
                            <SubmitButton text={"Create"} />
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
