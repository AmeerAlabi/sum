import { FiHeart } from "react-icons/fi"

export const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-4">
      <div className="container mx-auto px-4 text-center">
        <p className="flex items-center justify-center">
          Made with <FiHeart className="text-red-500 mx-1" /> for students
        </p>
        <p className="mt-2 text-sm text-gray-400">© {new Date().getFullYear()} StudySmart. All rights reserved.</p>
      </div>
    </footer>
  )
}

