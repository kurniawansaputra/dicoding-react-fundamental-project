import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SearchInput from "../components/inputs/SearchInput";
import NotesList from "../components/notes/NoteList";
import { getActiveNotes } from "../utils/network-data";
import NoteListSkeleton from "../components/skeleton/NoteListSkeleton";

const HomePage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const initialSearchQuery = queryParams.get("search") || "";

  const [notes, setNotes] = useState([]);
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      setLoading(true);
      const response = await getActiveNotes();
      if (!response.error) {
        setNotes(response.data);
      }
      setLoading(false);
    };

    fetchNotes();
  }, []);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    setSearchQuery(queryParams.get("search") || "");
  }, [location.search]);

  const handleSearchChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);

    const queryParams = new URLSearchParams(location.search);
    if (query) {
      queryParams.set("search", query);
    } else {
      queryParams.delete("search");
    }

    navigate({ pathname: location.pathname, search: queryParams.toString() });
  };

  const getFilteredNotes = () => {
    if (!searchQuery) return notes;
    return notes.filter(
      (note) =>
        note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        note.body.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const filteredNotes = getFilteredNotes();

  return (
    <section>
      <div className="max-w-[1024px] mx-auto text-start mt-12">
        <h1 className="px-4 text-xl font-semibold">Active Notes</h1>
        <div className="px-4 mt-4 mb-4">
          <SearchInput
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search notes..."
          />
        </div>

        {loading ? (
          <NoteListSkeleton count={6} />
        ) : filteredNotes.length === 0 ? (
          <p className="text-lg text-center text-gray-600 mt-6">No Data</p>
        ) : (
          <NotesList notes={filteredNotes} />
        )}
      </div>
    </section>
  );
};

export default HomePage;
