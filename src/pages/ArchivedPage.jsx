import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SearchInput from "../components/inputs/SearchInput";
import NotesList from "../components/notes/NoteList";
import { getArchivedNotes } from "../utils/network-data";
import NoteListSkeleton from "../components/skeleton/NoteListSkeleton";

const ArchivedPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const initialSearchQuery = queryParams.get("search") || "";

  const [archivedNotes, setArchivedNotes] = useState([]);
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchNotes() {
      setLoading(true);
      const { error, data } = await getArchivedNotes();
      if (!error) {
        setArchivedNotes(data);
      }
      setLoading(false);
    }
    fetchNotes();
  }, []);

  useEffect(() => {
    const newQuery = new URLSearchParams(location.search).get("search") || "";
    setSearchQuery(newQuery);
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
    if (!searchQuery) return archivedNotes;
    return archivedNotes.filter(
      (note) =>
        note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        note.body.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const filteredArchivedNotes = getFilteredNotes();

  return (
    <section>
      <div className="max-w-[1024px] mx-auto text-start mt-12">
        <h1 className="px-4 text-xl font-semibold">Archived Notes</h1>
        <div className="px-4 mt-4 mb-4">
          <SearchInput
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search archived notes..."
          />
        </div>

        {loading ? (
          <NoteListSkeleton count={6} />
        ) : filteredArchivedNotes.length === 0 ? (
          <p className="text-lg text-center text-gray-600 mt-6">No Data</p>
        ) : (
          <NotesList notes={filteredArchivedNotes} />
        )}
      </div>
    </section>
  );
};

export default ArchivedPage;
