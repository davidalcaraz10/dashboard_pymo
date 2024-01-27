export default function Filter({ onFilterChange, filterStatus, onStatusChange }) {
  return (
    <div className="filter-container">
      <input
        className="border-[#5C7DF3] rounded-md w-64 px-2 py-1"
        type="text"
        placeholder="Buscar por nombre o ubicación"
        onChange={(e) => onFilterChange(e.target.value)}
      />
      <select 
        value={filterStatus} 
        onChange={(e) => onStatusChange(e.target.value)}
        className="ml-2 rounded-md text-slate-500 py-1"
      >
        <option value="">Todos los status</option>
        <option value="assigned">Asignado</option>
        <option value="viable">Viable</option>
        <option value="insufficient">Recursos insuficientes</option>
      </select>
    </div>
  )
}