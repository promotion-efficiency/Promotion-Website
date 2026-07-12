type WorkViewToggleProps = {
  visible: boolean
  listMode: boolean
  onToggle: () => void
}

const toggleBoxClass =
  'border border-pe-gray/40 bg-pe-black/80 backdrop-blur-sm hover:border-pe-gray/55'

function ListViewIcon() {
  return (
    <svg
      width="22"
      height="17"
      viewBox="0 0 28 22"
      fill="none"
      aria-hidden
      className="shrink-0 text-pe-white"
    >
      {[4, 11, 18].map((y) => (
        <g key={y}>
          <line x1="0" y1={y} x2="18" y2={y} stroke="currentColor" strokeWidth="1.5" />
          <path d={`M20 ${y - 2.5} L25 ${y} L20 ${y + 2.5}`} fill="currentColor" />
        </g>
      ))}
    </svg>
  )
}

function GridViewIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      className="shrink-0 text-pe-white"
    >
      <rect x="2" y="2" width="8.5" height="8.5" stroke="currentColor" strokeWidth="1.5" />
      <rect x="13.5" y="2" width="8.5" height="8.5" stroke="currentColor" strokeWidth="1.5" />
      <rect x="2" y="13.5" width="8.5" height="8.5" stroke="currentColor" strokeWidth="1.5" />
      <rect x="13.5" y="13.5" width="8.5" height="8.5" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  )
}

export default function WorkViewToggle({ visible, listMode, onToggle }: WorkViewToggleProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={listMode ? 'Switch to grid view' : 'Switch to list view'}
      className={`fixed bottom-8 left-1/2 z-[100] hidden -translate-x-1/2 items-center gap-2 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-pe-white transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] md:flex ${toggleBoxClass} ${
        visible ? 'pointer-events-auto translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'
      }`}
    >
      <span className="flex flex-col text-left leading-[1.1]">
        {listMode ? (
          <>
            <span>Grid</span>
            <span>View</span>
          </>
        ) : (
          <>
            <span>List</span>
            <span>View</span>
          </>
        )}
      </span>
      {listMode ? <GridViewIcon /> : <ListViewIcon />}
    </button>
  )
}
