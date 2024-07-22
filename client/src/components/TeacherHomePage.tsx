import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { useAuth } from "../context/AuthContext";
import axiosInstance from "../lib/axios";
import { Check, X } from "lucide-react";
import { Appointment, Student } from "../types";
import useSWR, { KeyedMutator } from "swr";
import { Skeleton } from "./ui/skeleton";
import { Calender } from "../assets/Icons";

const fetcher = (url: string) => axiosInstance.get(url).then((res) => res.data);
const TeacherHomePage = () => {
  const { user } = useAuth();
  const { data, isLoading, error, mutate } = useSWR("/appointments", fetcher);
  if (!user) return;

  if (isLoading) return;
  <Skeleton className="mx-auto my-7 max-w-3xl h-[500px] rounded" />;

  if (error) return <h1>Error</h1>;

  const pendingAppointments = data.filter(
    (appointment: Appointment) => appointment.status === "Pending"
  );

  return (
    <Card className="max-w-3xl p-4 mx-auto my-7">
      <h1 className="my-4 text-2xl font-bold">Welcome, {user.name}</h1>
      <h3 className="text-lg font-bold">Your Appointments</h3>
      {pendingAppointments.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-8">
          <Calender />

          <p className="mt-4 text-lg text-gray-600">
            No appointments pending at the moment.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-3 my-3">
          {pendingAppointments.map((appointment: Appointment) => (
            <AppointmentCardStudent
              mutate={mutate}
              id={appointment._id}
              key={appointment._id}
              student={appointment.student}
              date={appointment.date}
              time={appointment.time}
              status={appointment.status}
            />
          ))}
        </div>
      )}
    </Card>
  );
};

const AppointmentCardStudent = ({
  student,
  id,
  date,
  time,
  mutate,
}: {
  mutate: KeyedMutator<any>;
  student: Student;
  id: string;
  date: string;
  time: string;
  status: string;
}) => {
  const approveAppointment = async (appointmentId: string) => {
    await axiosInstance.patch(`/appointments/approve/${appointmentId}`);
    mutate();
  };
  const rejectAppointment = async (appointmentId: string) => {
    await axiosInstance.patch(`/appointments/reject/${appointmentId}`);
    mutate();
  };
  return (
    <div className="p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-lg">
      <div className="flex items-center justify-between">
        <h3 className="mb-2 text-xl font-semibold">{student.name}</h3>
        <div className="flex gap-3">
          <Button
            className="bg-green-500 hover:bg-green-600"
            onClick={() => approveAppointment(id)}
          >
            <Check />
          </Button>
          <Button onClick={() => rejectAppointment(id)} variant={"destructive"}>
            <X />
          </Button>
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

export default TeacherHomePage;
