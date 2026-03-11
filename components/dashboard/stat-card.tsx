import Card from "@/components/ui/card"
import { LucideIcon, TrendingUp, TrendingDown } from "lucide-react"

interface StatCardProps {
  title: string
  value: string | number
  icon: LucideIcon
  change?: number
}

export default function StatCard({
  title,
  value,
  icon: Icon,
  change
}: StatCardProps) {

  const positive = (change ?? 0) >= 0

  return (

    <Card className="flex items-center justify-between p-5 hover:shadow-md transition">

      <div className="flex flex-col gap-1">

        <span className="text-sm text-gray-500">
          {title}
        </span>

        <span className="text-2xl font-semibold">
          {value}
        </span>

        {change !== undefined && (

          <div className="flex items-center gap-1 text-xs">

            {positive ? (
              <TrendingUp size={14} className="text-green-600" />
            ) : (
              <TrendingDown size={14} className="text-red-600" />
            )}

            <span className={positive ? "text-green-600" : "text-red-600"}>
              {change}%
            </span>

            <span className="text-gray-400">
              vs last period
            </span>

          </div>

        )}

      </div>

      <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">

        <Icon size={20} className="text-gray-600" />

      </div>

    </Card>

  )
}