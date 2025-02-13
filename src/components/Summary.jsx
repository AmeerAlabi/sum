import { FiCheckCircle } from "react-icons/fi"

export const Summary = ({ summary }) => {
  return (
    <div className="mt-8 bg-green-50 border border-green-200 rounded-lg p-6 animate-fadeIn">
      <div className="flex items-center mb-4">
        <FiCheckCircle className="text-green-500 text-2xl mr-2" />
        <h2 className="text-2xl font-semibold text-green-800">Summary</h2>
      </div>
      <p className="text-gray-700 leading-relaxed">{summary}</p>
    </div>
  )
}

