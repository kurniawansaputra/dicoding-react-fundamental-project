import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import PropTypes from "prop-types";
import { useState } from "react";

const RegisterInput = ({ register, loading }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    register(formData);
  };

  return (
    <form onSubmit={onSubmitHandler} className="space-y-4">
      <Input
        type="text"
        name="name"
        placeholder="Nama"
        value={formData.name}
        onChange={handleChange}
        className="w-full"
        disabled={loading}
      />
      <Input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        className="w-full"
        disabled={loading}
      />
      <Input
        type="password"
        name="password"
        placeholder="Password"
        autoComplete="current-password"
        value={formData.password}
        onChange={handleChange}
        className="w-full"
        disabled={loading}
      />
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Loading..." : "Register"}
      </Button>
    </form>
  );
};

RegisterInput.propTypes = {
  register: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default RegisterInput;
