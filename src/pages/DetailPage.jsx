import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ArchiveButton from "../components/buttons/ArchiveButton";
import DeleteButton from "../components/buttons/DeleteButton";
import UnarchiveButton from "../components/buttons/UnarchiveButton";
import NoteDetailSkeleton from "../components/skeleton/NoteDetailSkeleton";
import {
  archiveNote,
  deleteNote,
  getNote,
  unarchiveNote,
} from "../utils/network-data";

const DetailPage = () => {
  const { noteId } = useParams();
  const navigate = useNavigate();
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    const fetchNote = async () => {
      setLoading(true);
      const response = await getNote(noteId);
      if (!response.error) {
        setNote(response.data);
      }
      setLoading(false);
    };

    fetchNote();
  }, [noteId]);

  const handleDelete = async () => {
    setActionLoading(true);
    const response = await deleteNote(noteId);
    setActionLoading(false);
    if (!response.error) {
      navigate(-1);
    }
  };

  const handleArchive = async () => {
    setActionLoading(true);
    const response = await archiveNote(noteId);
    setActionLoading(false);
    if (!response.error) {
      setNote((prevNote) => ({ ...prevNote, archived: true }));
    }
  };

  const handleUnarchive = async () => {
    setActionLoading(true);
    const response = await unarchiveNote(noteId);
    setActionLoading(false);
    if (!response.error) {
      setNote((prevNote) => ({ ...prevNote, archived: false }));
    }
  };

  if (loading) {
    return <NoteDetailSkeleton />;
  }

  if (!note) {
    return (
      <p className="text-lg text-gray-600 mt-12">
        Oops! The note you’re looking for doesn’t exist.
      </p>
    );
  }

  return (
    <div className="max-w-[1024px] mx-auto mt-8 text-start px-4">
      <h1 className="text-2xl font-semibold">{note.title}</h1>
      <p className="text-gray-600">
        {new Date(note.createdAt).toLocaleDateString()}
      </p>
      <div className="mt-4">
        <p>{note.body}</p>
      </div>
      <div className="mt-8 flex gap-4">
        {note.archived ? (
          <UnarchiveButton
            onUnarchive={handleUnarchive}
            loading={actionLoading}
          />
        ) : (
          <ArchiveButton onArchive={handleArchive} loading={actionLoading} />
        )}
        <DeleteButton onDelete={handleDelete} loading={actionLoading} />
      </div>
    </div>
  );
};

export default DetailPage;
