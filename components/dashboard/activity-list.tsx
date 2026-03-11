import Card from "@/components/ui/card"

export default function ActivityList() {

  const activities = [
    {
      title: "Budi melakukan absensi",
      time: "5 menit lalu"
    },
    {
      title: "Pengajuan cuti oleh Andi",
      time: "20 menit lalu"
    },
    {
      title: "Material request proyek A",
      time: "1 jam lalu"
    },
    {
      title: "Update progress proyek Mall",
      time: "2 jam lalu"
    }
  ]

  return (
    <Card>

      <h2 className="text-lg font-semibold mb-4">
        Recent Activity
      </h2>

      <div className="space-y-4">

        {activities.map((item, index) => (

          <div
            key={index}
            className="flex justify-between text-sm"
          >

            <span className="text-gray-700">
              {item.title}
            </span>

            <span className="text-gray-400">
              {item.time}
            </span>

          </div>

        ))}

      </div>

    </Card>
  )
}