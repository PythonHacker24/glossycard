'use client'

import { AppSidebar } from "@/components/app-sidebar"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { ArrowUpRight } from "lucide-react"
import { useState } from "react"
import DigitalBusinessCardsDashboard from "@/components/manage-cards"
import DigitalPaymentCardsDashboard from "@/components/manage-payments"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Area,
  AreaChart,
} from "recharts"

// Sample data for charts
const scansOverTimeData = [
  { day: "Mon", scans: 140 },
  { day: "Tue", scans: 200 },
  { day: "Wed", scans: 180 },
  { day: "Thu", scans: 250 },
  { day: "Fri", scans: 300 },
  { day: "Sat", scans: 400 },
  { day: "Sun", scans: 360 },
]

const topCitiesData = [
  { city: "New York", scans: 420 },
  { city: "London", scans: 350 },
  { city: "Tokyo", scans: 300 },
  { city: "Berlin", scans: 200 },
  { city: "Paris", scans: 180 },
]

export default function DashboardPage() {
  const [currentView, setCurrentView] = useState<'analytics' | 'manage' | 'payments' | 'contacts'>('analytics')

  const AnalyticsOverview = () => (
    <>
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Analytics Overview</h1>
            <p className="text-gray-600 mt-1">
            Track scans, engagement, and where your cards perform best.
            </p>
          </div>
        </div>
      </div>

      {/* Stats Cards Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* Total Scans */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Scans</CardTitle>
            <span className="flex items-center text-green-600 text-xs font-semibold">
              <ArrowUpRight className="mr-1 h-3 w-3" /> +12.5%
            </span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12,483</div>
            <CardDescription className="text-green-600 flex items-center">
              +8% vs last week <ArrowUpRight className="ml-1 h-3 w-3" />
            </CardDescription>
          </CardContent>
        </Card>

        {/* Unique Visitors */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Unique Visitors</CardTitle>
            <span className="flex items-center text-green-600 text-xs font-semibold">
              <ArrowUpRight className="mr-1 h-3 w-3" /> +5%
            </span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7,902</div>
            <CardDescription className="text-green-600 flex items-center">
              Growth from last week <ArrowUpRight className="ml-1 h-3 w-3" />
            </CardDescription>
          </CardContent>
        </Card>

        {/* Cards Shared */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cards Shared</CardTitle>
            <span className="flex items-center text-green-600 text-xs font-semibold">
              <ArrowUpRight className="mr-1 h-3 w-3" /> +12%
            </span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,238</div>
            <CardDescription className="text-green-600 flex items-center">
              Strong engagement <ArrowUpRight className="ml-1 h-3 w-3" />
            </CardDescription>
          </CardContent>
        </Card>

        {/* Conversion Rate */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
            <span className="flex items-center text-green-600 text-xs font-semibold">
              <ArrowUpRight className="mr-1 h-3 w-3" /> +0.4pp
            </span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3.9%</div>
            <CardDescription className="text-green-600 flex items-center">
              Steady performance increase <ArrowUpRight className="ml-1 h-3 w-3" />
            </CardDescription>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid gap-4 lg:grid-cols-10">
        {/* Line Chart - 3 columns wide */}
        <Card className="lg:col-span-6">
          <CardHeader>
            <CardTitle className="text-2xl">Scans Over Time</CardTitle>
          </CardHeader>
          <CardContent className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={scansOverTimeData}>
                <defs>
                  <linearGradient id="blueGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0.05}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" strokeOpacity={0.8} />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Area 
                  type="monotone" 
                  dataKey="scans" 
                  stroke="#3c74ed" 
                  strokeWidth={1}
                  fill="url(#blueGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Bar Chart - 1 column wide */}
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle className="text-2xl">Top Cities</CardTitle>
          </CardHeader>
          <CardContent className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topCitiesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" strokeOpacity={0.8} />
                <XAxis dataKey="city" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="scans" fill="#3c74ed" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </>
  )

  return (
    <SidebarProvider>
      <AppSidebar onViewChange={setCurrentView} currentView={currentView} />
      <SidebarInset>
        <div className="flex flex-1 flex-col gap-4 p-4">
          {currentView === 'analytics' ? (
            <AnalyticsOverview />
          ) : currentView === 'manage' ? (
            <DigitalBusinessCardsDashboard />
          ) : currentView === 'payments' ? (
            <DigitalPaymentCardsDashboard />
          ) : currentView === 'contacts' ? (
            <div className="flex flex-1 flex-col gap-4">
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">Contacts</h1>
                    <p className="text-gray-600 mt-1">
                      Manage your business contacts and connections.
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center h-64">
                <p className="text-gray-500">Contacts feature coming soon</p>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-64">
              <p className="text-gray-500">Page not found</p>
            </div>
          )}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
