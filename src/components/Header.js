import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="bg-primary text-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">
          InnoCure
        </Link>
        <nav className="hidden md:flex space-x-8">
          <Link to="/" className="hover:text-secondary">Home</Link>
          <Link to="/upload" className="hover:text-secondary">AI Analysis</Link>
          <Link to="/consult" className="hover:text-secondary">Consult</Link>
          <Link to="/blog" className="hover:text-secondary">Blog</Link>
        </nav>
        <div className="flex space-x-4">
          <Link to="/login" className="px-4 py-2 bg-secondary rounded-md hover:bg-blue-600">
            Login
          </Link>
        </div>
      </div>
    </header>
  );
}