import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import PropTypes from "prop-types";
import { useState } from "react";

const NoteInput = ({ onSubmit, loading }) => {
  const [formData, setFormData] = useState({ title: "", body: "" });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={onSubmitHandler} className="space-y-4">
      <div className="grid w-full text-start gap-1.5">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Title"
          className="w-full"
          disabled={loading}
        />
      </div>
      <div className="grid w-full text-start gap-1.5">
        <Label htmlFor="body">Description</Label>
        <Textarea
          id="body"
          name="body"
          value={formData.body}
          onChange={handleChange}
          placeholder="Description"
          rows="6"
          disabled={loading}
        />
      </div>
      <div>
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Loading..." : "Create"}
        </Button>
      </div>
    </form>
  );
};

NoteInput.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default NoteInput;
