import DashboardHeader from "@/components/layout/DashboardHeader"
import StatisticsDashboard from "@/components/modules/adminDashboard/Statistics/StatisticsDashboard"
import { statisticsService } from "@/services/statistics.service"

export default async function AnalyticsPage() {
    const res = await statisticsService.getStatistics()
    const statistics = res?.data?.data
  return (
    <div className="space-y-3">
        <DashboardHeader title="SkillBridge Analytics" description="A comprehenshive administrative overview."/>
        <StatisticsDashboard data={statistics}/>
    </div>
  )
}
