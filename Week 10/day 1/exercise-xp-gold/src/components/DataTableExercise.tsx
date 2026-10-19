import { DataTable, type TableColumn } from './DataTable'

interface ProjectRecord {
  id: number
  project: string
  owner: string
  status: 'In progress' | 'Review' | 'Complete'
  updated: string
}

const projectData: ProjectRecord[] = [
  { id: 1, project: 'Atlas redesign', owner: 'Nora Chen', status: 'In progress', updated: 'Today' },
  { id: 2, project: 'Mobile checkout', owner: 'Leo Martin', status: 'Review', updated: 'Yesterday' },
  { id: 3, project: 'Design tokens', owner: 'Ava Patel', status: 'Complete', updated: 'Oct 14' },
  { id: 4, project: 'Billing portal', owner: 'Eli Brooks', status: 'In progress', updated: 'Oct 13' },
  { id: 5, project: 'Help center', owner: 'Mina Park', status: 'Review', updated: 'Oct 11' },
]

const columns: TableColumn<ProjectRecord>[] = [
  { key: 'project', title: 'PROJECT', sortable: true, filterValue: (row) => `${row.project} ${row.owner}` },
  { key: 'owner', title: 'OWNER', sortable: true },
  { key: 'status', title: 'STATUS', sortable: true, render: (row) => <span className={`status-pill status-${row.status.toLowerCase().replace(' ', '-')}`}>{row.status}</span> },
  { key: 'updated', title: 'UPDATED', sortable: true },
]

export function DataTableExercise() {
  return (
    <div className="exercise-view table-exercise-view">
      <div className="view-heading"><div><p className="exercise-kicker">EXERCISE 02 <span>·</span> GENERICS</p><h1>Project directory</h1></div><span className="view-index">02</span></div>
      <div className="table-explainer"><p>One table, any shape. Columns are constrained to keys on the row type; sorting, selection, and filtering stay reusable.</p><span><b>PROJECT RECORD</b> &nbsp;→&nbsp; <b>TABLE&lt;T&gt;</b></span></div>
      <DataTable data={projectData} columns={columns} />
      <p className="table-hint">SORT BY A COLUMN · SELECT ROWS · FILTER ANY FIELD</p>
    </div>
  )
}