export default function Container({ children }) {
  return <div className="container mx-auto px-5 flex-grow overflow-x-auto justify-between max-w-7xl">{children}</div>
}
