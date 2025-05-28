import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { DatePicker } from "../shared/DatePicker/DatePicker"
import { Button } from "../ui/button"
import { Input } from "../ui/input"


const ModalBooking = () => {

    const [date, setDate] = useState<Date>();
    const [update,setUpdate] = useState({
        dateList:"",
        timeList:"",
        charge:""
    })



    const handleSubmit = (event:FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(update)
        localStorage.removeItem("updateBooking")
        setUpdate({
             dateList:"",
            timeList:"",
            charge:""
        })
    }

    useEffect(()=>{
        const getDate = () =>{
            const year = date?.getFullYear().toString()
            const month = date?.getMonth().toString()
            const day = date?.getDate().toString()
            const dateList = `${year}-${month}-${day}`
            setUpdate((prev)=>(
                {...prev,dateList:dateList}
            ))
        }
        getDate()
    },[date])

    const handleChange = (event:ChangeEvent<HTMLInputElement>) =>{
        setUpdate((prev)=>(
            {
                ...prev,[event.target.name]:event.target.value
            }
        ))
    }
    
    
  return (
    <form className="max-w-[440px] mx-auto mt-15 shadow-lg p-3" onSubmit={handleSubmit}>
        <h3 className="text-2xl text-center">Update Booking</h3>
        <div className="mt-10">
            <label htmlFor="Check-Out Date">Check-Out Date</label>
            <DatePicker date={date} setDate={setDate} />
        </div>
        <div className="mt-10">
            <label htmlFor="Check-Out Time">Check-Out Time</label>
            <Input placeholder="Enter Check-Out Time" type="time" value={update.timeList} onChange={handleChange} name="timeList"/>
        </div>
        <div className="mt-10">
            <label htmlFor="ExtraCharges">Extra Charges</label>
            <Input placeholder="Enter Extra Charges" type="number" value={update.charge} onChange={handleChange} name="charge"/>
        </div>
        <div className="mt-10">
            <Button className="cursor-pointer w-[100%]" type="submit">Update</Button>
        </div>
    </form>
  )
}

export default ModalBooking
