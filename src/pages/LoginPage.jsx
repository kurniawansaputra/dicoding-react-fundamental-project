import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import PropTypes from "prop-types";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LoginInput from "../components/inputs/LoginInput";
import { login } from "../utils/network-data";

function LoginPage({ loginSuccess }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  async function onLogin({ email, password }) {
    setLoading(true);
    const { error, data } = await login({ email, password });
    setLoading(false);

    if (!error) {
      loginSuccess(data);
      navigate("/");
    }
  }

  return (
    <section className="flex justify-center items-start">
      <Card className="max-w-md w-full mt-12">
        <CardHeader className="text-start">
          <CardTitle className="text-xl font-semibold">
            Login to Your Account
          </CardTitle>
          <p className="text-sm text-gray-400">
            Enter your credentials to access your account and start managing
            your notes.
          </p>
        </CardHeader>
        <CardContent>
          <LoginInput login={onLogin} loading={loading} />
          <p className="text-gray-400 text-center mt-4 text-sm">
            Don&apos;t have an account?{" "}
            <Link to="/register" className="underline hover:text-blue-500">
              Register
            </Link>
          </p>
        </CardContent>
      </Card>
    </section>
  );
}

LoginPage.propTypes = {
  loginSuccess: PropTypes.func.isRequired,
};

export default LoginPage;
