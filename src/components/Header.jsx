import { FiBook } from "react-icons/fi"

export const Header = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex items-center">
        <FiBook className="text-3xl text-purple-600 mr-2" />
        <h1 className="text-xl font-bold text-gray-800">StudySmart</h1>
        <nav className="ml-auto">
          <ul className="flex space-x-4">
            <li>
              <a href="#" className="text-gray-600 hover:text-purple-600 transition-colors">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-600 hover:text-purple-600 transition-colors">
                About
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-600 hover:text-purple-600 transition-colors">
                Contact
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

