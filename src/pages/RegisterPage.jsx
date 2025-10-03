import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import RegisterInput from "../components/inputs/RegisterInput";
import { register } from "../utils/network-data";

function RegisterPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  async function onRegisterHandler(user) {
    setLoading(true);
    const { error } = await register(user);
    setLoading(false);

    if (!error) {
      navigate("/");
    }
  }

  return (
    <section className="flex justify-center items-start">
      <Card className="max-w-md w-full mt-12">
        <CardHeader className="text-start">
          <CardTitle className="text-xl font-semibold">
            Create Your Account
          </CardTitle>
          <p className="text-sm text-gray-400">
            Create an account to start writing and managing your thoughts
            easily.
          </p>
        </CardHeader>
        <CardContent>
          <RegisterInput register={onRegisterHandler} loading={loading} />
          <p className="text-gray-400 text-center mt-4 text-sm">
            Already have an account?{" "}
            <Link to="/" className="underline hover:text-blue-500">
              Login
            </Link>
          </p>
        </CardContent>
      </Card>
    </section>
  );
}

export default RegisterPage;
