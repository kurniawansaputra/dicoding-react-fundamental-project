import { Link } from "react-router-dom";

function Navigation() {
  return (
    <nav className="navigation">
      <ul className="flex items-center space-x-4">
        <li>
          <Link
            to="/create"
            className="flex items-center justify-center p-2 rounded-lg transition-all duration-300 text-gray-800 dark:text-gray-200"
          >
            Create
          </Link>
        </li>
        <li>
          <Link
            to="/archived"
            className="flex items-center justify-center p-2 rounded-lg transition-all duration-300 text-gray-800 dark:text-gray-200"
          >
            Archived
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
