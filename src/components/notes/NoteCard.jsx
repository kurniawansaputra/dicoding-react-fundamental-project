import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const NoteCard = ({ note }) => {
  return (
    <Link to={`/notes/${note.id}`} className="relative">
      <Card className="h-full flex flex-col">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-left">
              <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                {note.title}
              </h4>
            </CardTitle>
          </div>
          <CardDescription className="text-left">
            <p className="leading-7 [&:not(:first-child)]:mt-6">
              {new Date(note.createdAt).toLocaleDateString()}
            </p>
          </CardDescription>
        </CardHeader>
        <CardContent className="text-left flex-1">
          <p className="leading-7 [&:not(:first-child)] line-clamp-3">
            {note.body}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
};

NoteCard.propTypes = {
  note: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
  }).isRequired,
};

export default NoteCard;
