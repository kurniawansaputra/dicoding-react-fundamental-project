import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import NoteInput from "../components/inputs/NoteInput";
import { addNote } from "../utils/network-data";

const CreatePage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  async function onCreate(formData) {
    setLoading(true);
    const response = await addNote(formData);
    setLoading(false);

    if (!response.error) {
      navigate("/");
    } else {
      alert("Failed to add note. Please try again.");
    }
  }

  return (
    <section className="flex justify-center items-start">
      <Card className="max-w-md w-full mt-12">
        <CardHeader className="text-start">
          <CardTitle className="text-xl font-semibold">Create Note</CardTitle>
          <p className="text-sm text-gray-400">
            Capture your ideas and keep them organized in your notes.
          </p>
        </CardHeader>
        <CardContent>
          <NoteInput onSubmit={onCreate} loading={loading} />
        </CardContent>
      </Card>
    </section>
  );
};

export default CreatePage;
