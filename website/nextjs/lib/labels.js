export function StatusColour(status) {
  switch(status) {
    case "inactive": return "text-gray-400"
    case "complete": return "text-green-500"
    case "active": return "text-blue-500"
    default: return "text-black"
  }
}
