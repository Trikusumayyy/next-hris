import Card from "@/components/ui/card"
import Table, { Column } from "@/components/ui/table"

type Data = {
  nama: string
  divisi: string
  status: string
}

export default function RecentTable() {

  const columns: Column<Data>[] = [
    { header: "Nama", accessor: "nama" },
    { header: "Divisi", accessor: "divisi" },
    { header: "Status", accessor: "status" },
  ]

  const data: Data[] = [
    {
      nama: "Budi Santoso",
      divisi: "Arsitek",
      status: "Hadir"
    },
    {
      nama: "Andi Pratama",
      divisi: "Interior",
      status: "Cuti"
    },
    {
      nama: "Siti Nurhaliza",
      divisi: "Finance",
      status: "Hadir"
    }
  ]

  return (
    <Card>

      <div className="mb-4">
        <h2 className="text-lg font-semibold">
          Aktivitas Terbaru
        </h2>
      </div>

      <Table<Data>
        columns={columns}
        data={data}
      />

    </Card>
  )
}