import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useHistory } from "react-router-dom";
import { Card } from "../components/ui/card";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Textarea } from "../components/ui/textarea";

const RegisterPage = () => {
  const [role, setRole] = useState<"Student" | "Teacher" | "">("");
  const [formData, setFormData] = useState<any>({});
  const { register } = useAuth();
  const history = useHistory();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
    await register(formData);
    history.push("/");
  };

  const handleRoleSelect = (selectedRole: "Student" | "Teacher") => {
    setRole(selectedRole);
    console.log(selectedRole);
    setFormData({ ...formData, role: selectedRole });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Card className="max-w-xl mx-auto my-4 p-7">
      <form onSubmit={handleSubmit}>
        <h2 className="mb-3 text-2xl font-semibold">Register</h2>
        {!role ? (
          <div className="flex items-center gap-3">
            <button
              className="flex flex-col items-center w-full transition-all p-14 hover:bg-secondary outline outline-1 outline-gray-300 dark:outline-gray-700"
              type="button"
              onClick={() => handleRoleSelect("Student")}
            >
              <svg
                className="w-12 h-12 dark:fill-white"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 640 512"
              >
                {/*!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.*/}
                <path d="M337.8 5.4C327-1.8 313-1.8 302.2 5.4L166.3 96 48 96C21.5 96 0 117.5 0 144L0 464c0 26.5 21.5 48 48 48l208 0 0-96c0-35.3 28.7-64 64-64s64 28.7 64 64l0 96 208 0c26.5 0 48-21.5 48-48l0-320c0-26.5-21.5-48-48-48L473.7 96 337.8 5.4zM96 192l32 0c8.8 0 16 7.2 16 16l0 64c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-64c0-8.8 7.2-16 16-16zm400 16c0-8.8 7.2-16 16-16l32 0c8.8 0 16 7.2 16 16l0 64c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-64zM96 320l32 0c8.8 0 16 7.2 16 16l0 64c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-64c0-8.8 7.2-16 16-16zm400 16c0-8.8 7.2-16 16-16l32 0c8.8 0 16 7.2 16 16l0 64c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-64zM232 176a88 88 0 1 1 176 0 88 88 0 1 1 -176 0zm88-48c-8.8 0-16 7.2-16 16l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16s-7.2-16-16-16l-16 0 0-16c0-8.8-7.2-16-16-16z" />
              </svg>
              <span>Student</span>
            </button>
            <button
              className="flex flex-col items-center w-full transition-all p-14 hover:bg-secondary outline outline-1 outline-gray-300 dark:outline-gray-700"
              type="button"
              onClick={() => handleRoleSelect("Teacher")}
            >
              <svg
                className="w-12 h-12 dark:fill-white"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 640 512"
              >
                {/*!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.*/}
                <path d="M160 64c0-35.3 28.7-64 64-64L576 0c35.3 0 64 28.7 64 64l0 288c0 35.3-28.7 64-64 64l-239.2 0c-11.8-25.5-29.9-47.5-52.4-64l99.6 0 0-32c0-17.7 14.3-32 32-32l64 0c17.7 0 32 14.3 32 32l0 32 64 0 0-288L224 64l0 49.1C205.2 102.2 183.3 96 160 96l0-32zm0 64a96 96 0 1 1 0 192 96 96 0 1 1 0-192zM133.3 352l53.3 0C260.3 352 320 411.7 320 485.3c0 14.7-11.9 26.7-26.7 26.7L26.7 512C11.9 512 0 500.1 0 485.3C0 411.7 59.7 352 133.3 352z" />
              </svg>
              <span>Teacher</span>
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            <div>
              <Label>Name</Label>
              <Input type="text" name="name" onChange={handleChange} />
            </div>
            <div>
              <Label>Email</Label>
              <Input type="email" name="email" onChange={handleChange} />
            </div>
            <div>
              <Label>Phone</Label>
              <Input type="text" name="phone" onChange={handleChange} />
            </div>
            <div>
              <Label>Password</Label>
              <Input type="password" name="password" onChange={handleChange} />
            </div>
            <div>
              <Label>Age</Label>
              <Input type="number" name="age" onChange={handleChange} />
            </div>
            {role === "Student" && (
              <>
                <div>
                  <Label>School Name</Label>
                  <Input
                    type="text"
                    name="schoolName"
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <Label>Grade</Label>
                  <Input type="text" name="grade" onChange={handleChange} />
                </div>
              </>
            )}
            {role === "Teacher" && (
              <>
                <div className="flex flex-col">
                  <Label>Bio</Label>
                  <Textarea name="bio" onChange={handleChange} />
                </div>
                <div>
                  <Label>Marital Status</Label>
                  <Input
                    type="text"
                    name="maritalStatus"
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <Label>Experience (years)</Label>
                  <Input
                    type="number"
                    name="experience"
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <Label>School Name</Label>
                  <Input
                    type="text"
                    name="schoolName"
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <Label>Subjects</Label>
                  <Input
                    type="text"
                    name="subjects"
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        subjects: e.target.value.split(","),
                      })
                    }
                  />
                </div>
              </>
            )}
            <Button className="mt-3" type="submit">
              Register
            </Button>
          </div>
        )}
      </form>
    </Card>
  );
};

export default RegisterPage;
