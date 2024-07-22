export interface Student {
  _id: string;
  name: string;
  email: string;
  phone: string;
  password: string;
  age: number;
  role: string;
  grade: string;
  schoolName: string;
  __v: number;
}

export interface Teacher {
  _id: string;
  name: string;
  email: string;
  phone: string;
  password: string;
  age: number;
  role: string;
  bio: string;
  maritalStatus: string;
  experience: number;
  schoolName: string;
  subjects: string[];
  __v: number;
}

export interface Appointment {
  _id: string;
  student: Student;
  teacher: Teacher;
  date: string;
  time: string;
  status: string;
  __v: number;
}
