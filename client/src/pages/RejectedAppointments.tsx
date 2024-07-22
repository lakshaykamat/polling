import axiosInstance from "../lib/axios";
import useSWR from "swr";
import { Appointment, Student } from "../types";
import { Card } from "../components/ui/card";
import { Calender } from "../assets/Icons";

const fetcher = (url: string) => axiosInstance.get(url).then((res) => res.data);
const RejectedAppointments = () => {
  const { data, error, isLoading } = useSWR("/appointments/", fetcher);

  if (isLoading) return <h1>Loading...</h1>;
  if (error) return <h1>Error</h1>;
  if (data) {
    const rejectedAppointments = data.filter(
      (item: Appointment) => item.status === "Rejected"
    );

    return (
      <Card className="max-w-3xl p-4 mx-auto my-7">
        <h1 className="my-4 text-2xl font-bold">Rejected Appointments</h1>

        {rejectedAppointments.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8">
            <Calender />

            <p className="mt-4 text-lg text-gray-600">
              No appointments pending at the moment.
            </p>
          </div>
        ) : (
          rejectedAppointments.map((appointment: Appointment) => (
            <AppointmentCardStudent
              key={appointment._id}
              student={appointment.student}
              date={appointment.date}
              time={appointment.time}
              status={appointment.status}
            />
          ))
        )}
      </Card>
    );
  }
};

export const AppointmentCardStudent = ({
  student,
  date,
  time,
}: {
  student: Student;
  date: string;
  time: string;
  status: string;
}) => {
  return (
    <div className="p-4 mb-4 bg-red-300 border border-gray-200 rounded-lg shadow-lg">
      <div className="flex items-center justify-between">
        <h3 className="mb-2 text-xl font-semibold">{student.name}</h3>
      </div>
      <p className="text-gray-700">
        <strong>Date Time:</strong> {new Date(date).toLocaleDateString()} {time}
      </p>
      <p className="text-gray-700">
        <strong>Grade:</strong> {student.grade}
      </p>
      <p className="text-gray-700">
        <strong>Phone no:</strong> {student.phone}
      </p>
    </div>
  );
};

export default RejectedAppointments;
