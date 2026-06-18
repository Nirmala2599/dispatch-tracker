import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">

        <Link className="navbar-brand" to="/">
          Dispatch Tracker
        </Link>

        <div>

          <Link
            className="btn btn-light me-2"
            to="/"
          >
            Dashboard
          </Link>

          <Link
            className="btn btn-light me-2"
            to="/add-po"
          >
            Add PO
          </Link>

          <Link
            className="btn btn-light"
            to="/po-list"
          >
            PO List
          </Link>

        </div>

      </div>
    </nav>
  );
}

export default Navbar;