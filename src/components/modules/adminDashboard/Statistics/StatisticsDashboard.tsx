"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ChartCard from "./ChartCard";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  CartesianGrid,
  Legend,
} from "recharts";

export default function StatisticsDashboard({ data }: any) {
    const kpis = [
        { title: "Total Users", value: data?.users?.totalUsers || 0 },
        { title: "Total Bookings", value: data?.bookings?.totalBookings || 0 },
        { title: "Total Revenue", value: `$${data?.revenue?.totalRevenue || 0}` },
        { title: "Total Reviews", value: data?.reviews?.totalReviews || 0 },
    ];
    console.log(data)
    const usersData = [
        { name: "Students", value: data?.users?.totalStudent || 0 },
        { name: "Tutors", value: data?.users?.totalTutor || 0 },
        { name: "Admin", value: data?.users?.adminCount || 0 },
    ];

    const bookingStatus = [
        { name: "Completed", value: data?.bookings?.completedBooking || 0 },
        { name: "Confirmed", value: data?.bookings?.confirmedBookings || 0 },
        { name: "Cancelled", value: data?.bookings?.cancelledBookings || 0 }
    ];

    const revenueData = [
        { name: "Total", value: data?.revenue?.totalRevenue || 0 },
        { name: "This Month", value: data?.revenue?.monthlyRevenue || 0 },
    ]

    const categoryData =
        data?.categories?.map((cat: any) => ({
            name: cat.name,
            tutors: cat.totalTutors,
        })) || [];

    const topTutorRating =
        data?.topTutor?.map((tutor: any) => ({
            name: tutor.user?.name,
            rating: tutor.rating
        }))


    return (
        <div className="space-y-3">
            {/* kpi card */}
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {
                    kpis.map((item, idx) => (
                        <Card key={idx} className="rounded-sm shadow-sm">
                            <CardHeader>
                                <CardTitle className="text-sm text-muted-foreground font-medium">{item.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-3xl font-bold">{item.value}</p>
                            </CardContent>
                        </Card>
                    ))
                }
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                {/* Users Chart */}
                <ChartCard title="User Distribution">
                    <ResponsiveContainer width="100%" height={320}>
                        <BarChart data={usersData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="value" />
                        </BarChart>
                    </ResponsiveContainer>
                </ChartCard>

                {/* bookings chart */}
                <ChartCard title="Booking Status">
                    <ResponsiveContainer width="100%" height={320}>
                        <PieChart>
                            <Pie
                                data={bookingStatus}
                                dataKey="value"
                                nameKey="name"
                                outerRadius={110}
                                label
                            >
                                {bookingStatus.map((_, index) => (
                                    <Cell key={index} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </ChartCard>

                {/* revenue chart */}
                <ChartCard title="Revenue Overview">
                    <ResponsiveContainer width="100%" height={320}>
                        <BarChart data={revenueData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="value" />
                        </BarChart>
                    </ResponsiveContainer>
                </ChartCard>

                {/* Category Chart */}
                <ChartCard title="Category Distribution">
                    <ResponsiveContainer width="100%" height={320}>
                        <BarChart data={categoryData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="tutors" />
                        </BarChart>
                    </ResponsiveContainer>
                </ChartCard>

                {/* Top Tutor Chart */}
                <ChartCard title="Top Tutor Ratings">
                    <ResponsiveContainer width="100%" height={320}>
                        <LineChart data={topTutorRating}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis domain={[0, 5]} />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="rating" />
                        </LineChart>
                    </ResponsiveContainer>
                </ChartCard>
            </div>
        </div >
    )
}
