import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useHistory } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const history = useHistory();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login({ email, password });
    history.push("/");
  };

  return (
    <Card className="max-w-xl mx-auto my-4 p-7">
      <form onSubmit={handleSubmit}>
        <h2 className="mb-3 text-2xl font-semibold">Login</h2>
        <div>
          <Label>Email</Label>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <Label>Password</Label>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <Button className="my-4" type="submit">
          Login
        </Button>
        <p className="font-medium text-red-500"></p>
      </form>
    </Card>
  );
};

export default LoginPage;
