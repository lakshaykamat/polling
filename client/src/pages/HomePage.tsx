import StudentHomePage from "../components/StudentHomePage";
import TeacherHomePage from "../components/TeacherHomePage";
import { useAuth } from "../context/AuthContext";

const HomePage = () => {
  const { user } = useAuth();
  return user?.role === "Teacher" ? <TeacherHomePage /> : <StudentHomePage />;
};

export default HomePage;
