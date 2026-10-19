import { useEffect, useMemo, useState, type ReactNode } from 'react'

export interface TableColumn<T extends { id: string | number }> {
  key: keyof T
  title: string
  sortable?: boolean
  render?: (row: T) => ReactNode
  filterValue?: (row: T) => string
}

interface DataTableProps<T extends { id: string | number }> {
  data: T[]
  columns: TableColumn<T>[]
  onSort?: (key: keyof T, direction: 'asc' | 'desc') => void
  onSelect?: (selectedRows: T[]) => void
}

interface SortConfig<T extends { id: string | number }> {
  key: keyof T
  direction: 'asc' | 'desc'
}

export function DataTable<T extends { id: string | number }>({ data, columns, onSort, onSelect }: DataTableProps<T>) {
  const [sortConfig, setSortConfig] = useState<SortConfig<T> | null>(null)
  const [selectedRows, setSelectedRows] = useState<Set<T['id']>>(() => new Set())
  const [filter, setFilter] = useState('')

  const visibleRows = useMemo(() => {
    const normalizedFilter = filter.trim().toLowerCase()
    const filtered = normalizedFilter
      ? data.filter((row) => columns.some((column) => {
          const value = column.filterValue?.(row) ?? String(row[column.key] ?? '')
          return value.toLowerCase().includes(normalizedFilter)
        }))
      : data
    if (!sortConfig) return filtered
    return [...filtered].sort((left, right) => {
      const leftValue = left[sortConfig.key]
      const rightValue = right[sortConfig.key]
      const comparison = typeof leftValue === 'number' && typeof rightValue === 'number'
        ? leftValue - rightValue
        : String(leftValue ?? '').localeCompare(String(rightValue ?? ''), undefined, { numeric: true })
      return sortConfig.direction === 'asc' ? comparison : -comparison
    })
  }, [columns, data, filter, sortConfig])

  useEffect(() => {
    onSelect?.(data.filter((row) => selectedRows.has(row.id)))
  }, [data, onSelect, selectedRows])

  const allVisibleSelected = visibleRows.length > 0 && visibleRows.every((row) => selectedRows.has(row.id))

  function toggleSort(key: keyof T) {
    const direction = sortConfig?.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc'
    setSortConfig({ key, direction })
    onSort?.(key, direction)
  }

  function toggleOne(id: T['id']) {
    setSelectedRows((current) => {
      const next = new Set(current)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  function toggleVisible() {
    setSelectedRows((current) => {
      const next = new Set(current)
      if (allVisibleSelected) visibleRows.forEach((row) => next.delete(row.id))
      else visibleRows.forEach((row) => next.add(row.id))
      return next
    })
  }

  return (
    <div className="table-frame">
      <div className="table-toolbar">
        <label className="table-search"><span aria-hidden="true">⌕</span><input value={filter} onChange={(event) => setFilter(event.target.value)} placeholder="Filter records" aria-label="Filter table records" /></label>
        <span className="selection-count">{selectedRows.size} SELECTED <b>·</b> {visibleRows.length} ROWS</span>
      </div>
      <div className="table-scroll">
        <table>
          <thead><tr>
            <th className="select-column"><input type="checkbox" checked={allVisibleSelected} onChange={toggleVisible} aria-label="Select all visible rows" /></th>
            {columns.map((column) => <th key={String(column.key)}>{column.sortable ? <button type="button" className="sort-button" onClick={() => toggleSort(column.key)}>{column.title}<span>{sortConfig?.key === column.key ? sortConfig.direction === 'asc' ? '↑' : '↓' : '↕'}</span></button> : column.title}</th>)}
          </tr></thead>
          <tbody>
            {visibleRows.map((row) => <tr key={row.id} className={selectedRows.has(row.id) ? 'row-selected' : ''}>
              <td className="select-column"><input type="checkbox" checked={selectedRows.has(row.id)} onChange={() => toggleOne(row.id)} aria-label={`Select row ${row.id}`} /></td>
              {columns.map((column) => <td key={String(column.key)}>{column.render ? column.render(row) : String(row[column.key] ?? '—')}</td>)}
            </tr>)}
            {visibleRows.length === 0 && <tr><td className="empty-table" colSpan={columns.length + 1}>No records match this filter.</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  )
}