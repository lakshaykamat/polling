import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import { useAuth } from "../context/AuthContext";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { useToast } from "../components/ui/use-toast";
import { useEffect, useState } from "react";
import axiosInstance from "../lib/axios";
import { DialogClose } from "../components/ui/dialog";
import { Appointment, Teacher } from "../types";
import useSWR, { mutate } from "swr";

const fetcher = (url: string) => axiosInstance.get(url).then((res) => res.data);
const StudentHomePage: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [selectedTeacher, setSelectedTeacher] = useState("");
  //   const [yourAppointments, setYourAppointments] = useState([]);
  const { data, error, isLoading, mutate } = useSWR("/appointments", fetcher);

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await axiosInstance.get("/users");
        const teachers = response.data.filter(
          (user: any) => user.role === "Teacher"
        );
        setTeachers(teachers);
      } catch (error) {
        console.error("Error fetching teachers:", error);
      }
    };
    // const fetchYourAppointments = async () => {
    //   try {
    //     const response = await axiosInstance.get("/appointments");
    //     console.log(response.data);
    //     setYourAppointments(response.data);
    //   } catch (error) {
    //     console.log("Error fetching appointments");
    //   }
    // };

    // fetchYourAppointments();
    fetchTeachers();
  }, []);

  if (!user) return null;

  const createAppointment = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axiosInstance.post("/appointments", {
        // studentId: user._id,
        teacherId: selectedTeacher,
        date,
        time,
      });
      toast({
        title: "Appointment Created",
        description: `Your appointment is scheduled for ${date} at ${time} waiting for approval`,
      });
      mutate();
    } catch (error) {
      console.error("Error creating appointment:", error);
    }
  };

  return (
    <Card className="max-w-3xl p-4 mx-auto my-7">
      <div className="flex items-center justify-between">
        <h1 className="my-4 text-2xl font-bold">Welcome, {user.name}</h1>
        <Dialog>
          <DialogTrigger>
            <Button>Create Appointment</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create Appointment</DialogTitle>
              <DialogDescription>
                You can create an appointment with any teacher you want.
              </DialogDescription>
            </DialogHeader>
            <form className="flex flex-col gap-2" onSubmit={createAppointment}>
              <Label>Teacher</Label>
              <Select onValueChange={setSelectedTeacher}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Teacher" />
                </SelectTrigger>
                <SelectContent>
                  {teachers.map((teacher: Teacher) => (
                    <SelectItem key={teacher._id} value={teacher._id}>
                      {teacher.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Label>Date</Label>
              <Input
                value={date}
                onChange={(e) => setDate(e.target.value)}
                type="date"
                required
                placeholder="Enter Date"
              />
              <Label>Time</Label>
              <Input
                value={time}
                onChange={(e) => setTime(e.target.value)}
                type="time"
                required
                placeholder="Enter Time"
              />
              <DialogClose asChild>
                <Button type="submit">Create</Button>
              </DialogClose>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      <h3 className="text-xl font-bold">Appointments</h3>
      <div className="flex flex-col gap-3 my-3">
        {data &&
          data.map((appointment: Appointment) => (
            <AppointmentCard
              teacher={appointment.teacher}
              date={appointment.date}
              time={appointment.time}
              status={appointment.status}
            />
          ))}
      </div>
    </Card>
  );
};

const AppointmentCard = ({
  teacher,
  date,
  time,
  status,
}: {
  teacher: Teacher;
  date: string;
  time: string;
  status: string;
}) => {
  return (
    <div className="p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-lg">
      <div className="flex items-center justify-between">
        <h3 className="mb-2 text-xl font-semibold">{teacher.name}</h3>
        <div
          className={`px-3 py-1 ${status === "Pending" && "bg-yellow-400"} ${
            status === "Approved" && "bg-green-400"
          }  ${status === "Rejected" && "bg-red-400"} rounded`}
        >
          {status == "Approved" && "Approved"}
          {status == "Pending" && "Pending"}
          {status == "Rejected" && "Rejected"}
        </div>
      </div>
      <p className="text-gray-700">
        <strong>Date:</strong> {new Date(date).toLocaleDateString()}
      </p>
      <p className="text-gray-700">
        <strong>Time:</strong> {time}
      </p>
    </div>
  );
};

export default StudentHomePage;
