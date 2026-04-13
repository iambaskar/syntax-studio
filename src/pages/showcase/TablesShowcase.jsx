import React, { useState, useMemo } from 'react'
import { CustomizerPanel } from '../../Components/showcase/CustomizerPanel'
import '../../styles/showcase/TablesShowcase.css'

const VARIANTS = [
  { id: 'sortable', label: 'Sortable' },
  { id: 'striped', label: 'Striped' },
  { id: 'paginated', label: 'Paginated' },
]

const CONTROLS = [
  { key: 'bg', label: 'Preview BG', type: 'color' },
  { key: 'tableBg', label: 'Table BG', type: 'color' },
  { key: 'headerBg', label: 'Header BG', type: 'color' },
  { key: 'accent', label: 'Accent', type: 'color' },
  { key: 'stripeBg', label: 'Stripe BG', type: 'color' },
  { key: 'radius', label: 'Border Radius', type: 'range', min: 0, max: 16, unit: 'px' },
]

const DEFAULT = { bg: '#0f0f12', tableBg: '#1c1c1f', headerBg: '#161618', accent: '#7c6fff', stripeBg: '#1a1a1d', radius: '10' }

const COLUMNS = ['Name', 'Role', 'Status', 'Joined']
const RAW_DATA = [
  { Name: 'Alice Chen', Role: 'Engineer', Status: 'Active', Joined: '2022-03' },
  { Name: 'Bob Martin', Role: 'Designer', Status: 'Away', Joined: '2021-11' },
  { Name: 'Carol White', Role: 'PM', Status: 'Active', Joined: '2023-01' },
  { Name: 'David Kim', Role: 'Engineer', Status: 'Inactive', Joined: '2020-07' },
  { Name: 'Eva Torres', Role: 'Marketing', Status: 'Active', Joined: '2022-09' },
  { Name: 'Frank Lee', Role: 'Designer', Status: 'Active', Joined: '2023-06' },
  { Name: 'Grace Park', Role: 'Engineer', Status: 'Away', Joined: '2021-04' },
  { Name: 'Henry Wu', Role: 'PM', Status: 'Active', Joined: '2022-12' },
  { Name: 'Iris Patel', Role: 'Marketing', Status: 'Inactive', Joined: '2020-02' },
  { Name: 'Jake Brown', Role: 'Engineer', Status: 'Active', Joined: '2023-08' },
  { Name: 'Kara Ngo', Role: 'Designer', Status: 'Active', Joined: '2022-05' },
  { Name: 'Leo Diaz', Role: 'PM', Status: 'Away', Joined: '2021-09' },
]

const STATUS_COLORS = { Active: '#4ade80', Away: '#fbbf24', Inactive: '#555' }

const generateJSX = (variant) => {
  const codes = {
    sortable: `const SortableTable = ({ columns, data }) => {
  const [sortCol, setSortCol] = useState(null)
  const [sortDir, setSortDir] = useState('asc')

  const sorted = sortCol
    ? [...data].sort((a, b) => {
        const cmp = String(a[sortCol]).localeCompare(String(b[sortCol]))
        return sortDir === 'asc' ? cmp : -cmp
      })
    : data

  const toggle = (col) => {
    if (sortCol === col) setSortDir(d => d === 'asc' ? 'desc' : 'asc')
    else { setSortCol(col); setSortDir('asc') }
  }

  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            {columns.map(col => (
              <th key={col} onClick={() => toggle(col)}>
                {col} {sortCol === col ? (sortDir === 'asc' ? '↑' : '↓') : '↕'}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sorted.map((row, i) => (
            <tr key={i}>
              {columns.map(col => <td key={col}>{row[col]}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}`,
    striped: `const StripedTable = ({ columns, data }) => (
  <div className="table-wrap">
    <table>
      <thead>
        <tr>{columns.map(col => <th key={col}>{col}</th>)}</tr>
      </thead>
      <tbody>
        {data.map((row, i) => (
          <tr key={i} className={i % 2 === 1 ? 'striped' : ''}>
            {columns.map(col => <td key={col}>{row[col]}</td>)}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)`,
    paginated: `const PaginatedTable = ({ columns, data, pageSize = 5 }) => {
  const [page, setPage] = useState(0)
  const total = Math.ceil(data.length / pageSize)
  const rows = data.slice(page * pageSize, (page + 1) * pageSize)

  return (
    <div>
      <div className="table-wrap">
        <table>
          <thead><tr>{columns.map(c => <th key={c}>{c}</th>)}</tr></thead>
          <tbody>{rows.map((r, i) => (
            <tr key={i}>{columns.map(c => <td key={c}>{r[c]}</td>)}</tr>
          ))}</tbody>
        </table>
      </div>
      <div className="pagination">
        <button disabled={page === 0} onClick={() => setPage(p => p - 1)}>‹</button>
        {Array.from({ length: total }, (_, i) => (
          <button key={i} className={page === i ? 'active' : ''} onClick={() => setPage(i)}>{i + 1}</button>
        ))}
        <button disabled={page === total - 1} onClick={() => setPage(p => p + 1)}>›</button>
      </div>
    </div>
  )
}`,
  }
  return codes[variant]
}

const generateCSS = (variant, v) => `/* Table wrapper */
.table-wrap {
  width: 100%;
  overflow-x: auto;
  border-radius: ${v.radius}px;
  border: 1px solid #2a2a2e;
}

table {
  width: 100%;
  border-collapse: collapse;
  background: ${v.tableBg};
  font-size: 0.82rem;
}

thead th {
  background: ${v.headerBg};
  padding: 0.65rem 1rem;
  text-align: left;
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: #888;
  border-bottom: 1px solid #2a2a2e;
  ${variant === 'sortable' ? 'cursor: pointer; user-select: none;' : ''}
}
${variant === 'sortable' ? `thead th:hover { color: ${v.accent}; }` : ''}

tbody td {
  padding: 0.65rem 1rem;
  border-bottom: 1px solid #1e1e22;
  color: #ccc;
}
tbody tr:last-child td { border-bottom: none; }
${variant === 'striped' ? `tbody tr:nth-child(even) { background: ${v.stripeBg}; }` : ''}
tbody tr:hover { background: #222226; }`

const PAGE_SIZE = 5

export const TablesShowcase = () => {
  const [active, setActive] = useState('sortable')
  const [values, setValues] = useState(DEFAULT)
  const [sortCol, setSortCol] = useState(null)
  const [sortDir, setSortDir] = useState('asc')
  const [page, setPage] = useState(0)
  const onChange = (key, val) => setValues(v => ({ ...v, [key]: val }))
  const onReset = () => setValues(DEFAULT)

  const handleSort = (col) => {
    if (sortCol === col) setSortDir(d => d === 'asc' ? 'desc' : 'asc')
    else { setSortCol(col); setSortDir('asc') }
  }

  const sorted = useMemo(() => {
    if (!sortCol) return RAW_DATA
    return [...RAW_DATA].sort((a, b) => {
      const cmp = a[sortCol].localeCompare(b[sortCol])
      return sortDir === 'asc' ? cmp : -cmp
    })
  }, [sortCol, sortDir])

  const totalPages = Math.ceil(RAW_DATA.length / PAGE_SIZE)
  const paged = RAW_DATA.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE)

  const r = values.radius + 'px'

  const renderTable = (rows, sortable = false, striped = false) => (
    <div className="tbl-wrap" style={{ borderRadius: r, background: values.tableBg }}>
      <table>
        <thead>
          <tr style={{ background: values.headerBg }}>
            {COLUMNS.map(col => (
              <th key={col} onClick={sortable ? () => handleSort(col) : undefined}
                style={{ cursor: sortable ? 'pointer' : 'default', color: sortable && sortCol === col ? values.accent : undefined }}>
                {col}
                {sortable && sortCol === col && <span style={{ marginLeft: 4 }}>{sortDir === 'asc' ? '↑' : '↓'}</span>}
                {sortable && sortCol !== col && <span style={{ marginLeft: 4, opacity: 0.2 }}>↕</span>}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} style={striped && i % 2 === 1 ? { background: values.stripeBg } : {}}>
              <td style={{ fontWeight: 500, color: '#e0e0e0' }}>{row.Name}</td>
              <td>{row.Role}</td>
              <td>
                <span className="tbl-status" style={{ color: STATUS_COLORS[row.Status], background: STATUS_COLORS[row.Status] + '18' }}>
                  {row.Status}
                </span>
              </td>
              <td style={{ fontFamily: 'var(--mono)', fontSize: '0.75rem' }}>{row.Joined}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )

  return (
    <div className="showcase-page">
      <div className="showcase-header">
        <div className="showcase-header-text">
          <h1>Tables</h1>
          <p>Sortable, striped, and paginated table variants.</p>
        </div>
      </div>
      <div className="showcase-variant-tabs">
        {VARIANTS.map(v => (
          <button key={v.id} className={`variant-tab ${active === v.id ? 'active' : ''}`}
            onClick={() => setActive(v.id)}>{v.label}</button>
        ))}
      </div>
      <div className="showcase-body">
        <div className="showcase-preview" style={{ background: values.bg, alignItems: 'flex-start', padding: '2rem 1.5rem' }}>
          <div style={{ width: '100%' }}>
            {active === 'sortable' && renderTable(sorted, true, false)}
            {active === 'striped' && renderTable(RAW_DATA.slice(0, 7), false, true)}
            {active === 'paginated' && (
              <div>
                {renderTable(paged)}
                <div className="tbl-pagination">
                  <span className="tbl-page-info">
                    {page * PAGE_SIZE + 1}–{Math.min((page + 1) * PAGE_SIZE, RAW_DATA.length)} of {RAW_DATA.length}
                  </span>
                  <div className="tbl-page-btns">
                    <button className="tbl-page-btn" disabled={page === 0} onClick={() => setPage(0)}>«</button>
                    <button className="tbl-page-btn" disabled={page === 0} onClick={() => setPage(p => p - 1)}>‹</button>
                    {Array.from({ length: totalPages }, (_, i) => (
                      <button key={i} className={`tbl-page-btn ${page === i ? 'active' : ''}`}
                        style={page === i ? { background: values.accent, color: '#fff', borderColor: values.accent } : {}}
                        onClick={() => setPage(i)}>{i + 1}</button>
                    ))}
                    <button className="tbl-page-btn" disabled={page === totalPages - 1} onClick={() => setPage(p => p + 1)}>›</button>
                    <button className="tbl-page-btn" disabled={page === totalPages - 1} onClick={() => setPage(totalPages - 1)}>»</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <CustomizerPanel controls={CONTROLS} values={values} onChange={onChange} onReset={onReset}
          cssCode={generateCSS(active, values)} jsxCode={generateJSX(active)} />
      </div>
    </div>
  )
}
