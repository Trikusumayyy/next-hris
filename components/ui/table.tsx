"use client"

import React, { useState } from "react"
import Spinner from "./spinner"
import Input from "./input"
import Button from "./button"


export interface Column<T> {
  header: string
  accessor?: keyof T
  render?: (row: T) => React.ReactNode
}

interface DataTableProps<T> {
  columns: Column<T>[]
  data: T[]
  loading?: boolean
  pageSize?: number
}

export default function DataTable<T>({
  columns,
  data,
  loading = false,
  pageSize = 10,
}: DataTableProps<T>) {

  const [search, setSearch] = useState("")
  const [page, setPage] = useState(1)

  const filtered = data.filter((row) =>
    JSON.stringify(row).toLowerCase().includes(search.toLowerCase())
  )

  const totalPages = Math.ceil(filtered.length / pageSize)

  const paginated = filtered.slice(
    (page - 1) * pageSize,
    page * pageSize
  )

  return (
    <div className="space-y-4">

      {/* Search */}

      <div className="flex justify-between items-center">
        <div className="w-75">
          <Input className="border-gray-500"
            placeholder="Search..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value)
              setPage(1)
              
            }}
          />
        </div>
      </div>

      {/* Table */}

      <div className="border border-(--ui-border) rounded-lg overflow-hidden bg-white">

        <table className="w-full text-sm">

          <thead className="bg-gray-50 border-b border-(--ui-border)">
            <tr>
              {columns.map((col, index) => (
                <th
                  key={index}
                  className="text-left px-4 py-3 font-medium text-gray-600"
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>

            {loading && (
              <tr>
                <td colSpan={columns.length}>
                  <div className="flex justify-center py-6">
                    <Spinner />
                  </div>
                </td>
              </tr>
            )}

            {!loading && paginated.length === 0 && (
              <tr>
                <td
                  colSpan={columns.length}
                  className="text-center py-6 text-gray-500"
                >
                  Tidak ada data
                </td>
              </tr>
            )}

            {!loading &&
              paginated.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  className="border-t border-(--ui-border) hover:bg-gray-50"
                >
                  {columns.map((col, colIndex) => (
                    <td key={colIndex} className="px-4 py-3">

                      {col.render
                        ? col.render(row)
                        : (row[col.accessor as keyof T] as React.ReactNode)}

                    </td>
                  ))}
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}

      {totalPages > 1 && (
        <div className="flex justify-between items-center">

          <p className="text-sm text-gray-500">
            Page {page} of {totalPages}
          </p>

          <div className="flex gap-2">

            <Button
              variant="outline"
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
            >
              Prev
            </Button>

            <Button
              variant="outline"
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
            >
              Next
            </Button>

          </div>
        </div>
      )}

    </div>
  )
}