import { useState, type ChangeEvent, type FormEvent } from "react";
// useEffect
// import { DatePicker } from "../shared/DatePicker/DatePicker"
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import useCheckOut from "@/hooks/useCheckOut";
import { useCheckInMutate } from "@/hooks/useCheckIn";
import { toast } from "sonner";

const ModalBooking = () => {
  // const [date, setDate] = useState<Date>();

  const { setModal, dataListId, setCheckList, setDataList } = useCheckOut();
  const { updateMutation } = useCheckInMutate({ id: dataListId as string });
  const [update, setUpdate] = useState({
    // dateList:"",
    charge: "",
  });

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (update.charge !== "") {
      setModal(false);
      const data = {
        id: dataListId,
        extraCharge: Number(update.charge),
        status: "Check-Out",
      };

      try {
        const res = await updateMutation.mutateAsync({ data });

        if (res.message === "Update Check-in/out Success!") {
          setUpdate({
            //  dateList:"",
            charge: "",
          });
          setCheckList(res.data.data);
          setDataList(res.data.data);
          toast(`${res.message}`, {
            position: "top-center",
            style: {
              backgroundColor: "#228B22",
              color: "white",
              border: "none",
              height: "60px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "16px",
            },
          });
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        toast(`${error?.response?.data?.message}`, {
          position: "top-center",
          style: {
            backgroundColor: "red",
            color: "white",
            border: "none",
            height: "60px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "16px",
          },
        });
      }
    }
  };

  // useEffect(()=>{
  //     const getDate = () =>{
  //         const year = date?.getFullYear().toString()
  //         const month = date?.getMonth().toString()
  //         const day = date?.getDate().toString()
  //         const dateList = `${year}-${month}-${day}`
  //         setUpdate((prev)=>(
  //             {...prev,dateList:dateList}
  //         ))
  //     }
  //     getDate()
  // },[date])

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUpdate((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <form
      className="max-w-[440px] mx-auto mt-15 shadow-lg p-3"
      onSubmit={handleSubmit}
    >
      <h3 className="text-2xl text-center">Update Booking</h3>
      {/* <div className="mt-10">
            <label htmlFor="Check-Out Date">Check-Out Date</label>
            <DatePicker date={date} setDate={setDate} />
        </div> */}
      <div className="mt-10">
        <label htmlFor="ExtraCharges">Extra Charges</label>
        <Input
          placeholder="Enter Extra Charges"
          className="mt-3"
          type="number"
          value={update.charge}
          onChange={handleChange}
          name="charge"
        />
      </div>
      <div className="mt-10">
        <Button className="cursor-pointer w-[100%]" type="submit">
          Update
        </Button>
      </div>
    </form>
  );
};

export default ModalBooking;
