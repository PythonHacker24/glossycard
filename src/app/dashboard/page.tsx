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

import { DataTable } from "@/components/ui/data-table"
import { columns, Payment } from "@/components/ui/columns"

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

  // Sample data - replace with actual API call if needed
  const data: Payment[] = [
    { name: "Aditya Patil", email: "aditya.patil@example.com", place: "California", cardlink: "test1" },
  { name: "Priya Sharma", email: "priya.sharma@example.com", place: "New York", cardlink: "test2" },
  { name: "Rahul Mehta", email: "rahul.mehta@example.com", place: "Texas", cardlink: "test3" },
  { name: "Sofia Rodriguez", email: "sofia.rodriguez@example.com", place: "Florida", cardlink: "test4" },
  { name: "Liam Anderson", email: "liam.anderson@example.com", place: "Washington", cardlink: "test5" },
  { name: "Emma Thompson", email: "emma.thompson@example.com", place: "Oregon", cardlink: "test6" },
  { name: "Noah Williams", email: "noah.williams@example.com", place: "Nevada", cardlink: "test7" },
  { name: "Olivia Martinez", email: "olivia.martinez@example.com", place: "Arizona", cardlink: "test8" },
  { name: "Ethan Brown", email: "ethan.brown@example.com", place: "Colorado", cardlink: "test9" },
  { name: "Ava Lee", email: "ava.lee@example.com", place: "Illinois", cardlink: "test10" },
  { name: "Mason Clark", email: "mason.clark@example.com", place: "Georgia", cardlink: "test11" },
  { name: "Isabella Davis", email: "isabella.davis@example.com", place: "Michigan", cardlink: "test12" },
  { name: "James Harris", email: "james.harris@example.com", place: "Virginia", cardlink: "test13" },
  { name: "Charlotte Lewis", email: "charlotte.lewis@example.com", place: "Ohio", cardlink: "test14" },
  { name: "Benjamin Walker", email: "benjamin.walker@example.com", place: "North Carolina", cardlink: "test15" },
  { name: "Harper Young", email: "harper.young@example.com", place: "Indiana", cardlink: "test16" },
  { name: "Lucas King", email: "lucas.king@example.com", place: "Minnesota", cardlink: "test17" },
  { name: "Mia Scott", email: "mia.scott@example.com", place: "Missouri", cardlink: "test18" },
  { name: "Elijah Hill", email: "elijah.hill@example.com", place: "Wisconsin", cardlink: "test19" },
  { name: "Amelia Green", email: "amelia.green@example.com", place: "Tennessee", cardlink: "test20" },
  { name: "Alexander Adams", email: "alexander.adams@example.com", place: "Kentucky", cardlink: "test21" },
  { name: "Evelyn Nelson", email: "evelyn.nelson@example.com", place: "Massachusetts", cardlink: "test22" },
  { name: "William Carter", email: "william.carter@example.com", place: "Maryland", cardlink: "test23" },
  { name: "Abigail Mitchell", email: "abigail.mitchell@example.com", place: "Oklahoma", cardlink: "test24" },
  { name: "Daniel Perez", email: "daniel.perez@example.com", place: "Iowa", cardlink: "test25" },
  { name: "Ella Roberts", email: "ella.roberts@example.com", place: "Louisiana", cardlink: "test26" },
  { name: "Matthew Turner", email: "matthew.turner@example.com", place: "Alabama", cardlink: "test27" },
  { name: "Scarlett Phillips", email: "scarlett.phillips@example.com", place: "Arkansas", cardlink: "test28" },
  { name: "Henry Campbell", email: "henry.campbell@example.com", place: "Mississippi", cardlink: "test29" },
  { name: "Chloe Parker", email: "chloe.parker@example.com", place: "Kansas", cardlink: "test30" },
  { name: "Jackson Evans", email: "jackson.evans@example.com", place: "Utah", cardlink: "test31" },
  { name: "Victoria Edwards", email: "victoria.edwards@example.com", place: "New Mexico", cardlink: "test32" },
  { name: "Sebastian Collins", email: "sebastian.collins@example.com", place: "Idaho", cardlink: "test33" },
  { name: "Aria Stewart", email: "aria.stewart@example.com", place: "Montana", cardlink: "test34" },
  { name: "David Sanchez", email: "david.sanchez@example.com", place: "South Carolina", cardlink: "test35" },
  { name: "Grace Morris", email: "grace.morris@example.com", place: "North Dakota", cardlink: "test36" },
  { name: "Carter Rogers", email: "carter.rogers@example.com", place: "South Dakota", cardlink: "test37" },
  { name: "Zoey Reed", email: "zoey.reed@example.com", place: "Nebraska", cardlink: "test38" },
  { name: "Owen Cook", email: "owen.cook@example.com", place: "West Virginia", cardlink: "test39" },
  { name: "Lily Morgan", email: "lily.morgan@example.com", place: "Maine", cardlink: "test40" },
  { name: "Jack Bell", email: "jack.bell@example.com", place: "Vermont", cardlink: "test41" },
  { name: "Hannah Murphy", email: "hannah.murphy@example.com", place: "New Hampshire", cardlink: "test42" },
  { name: "Gabriel Bailey", email: "gabriel.bailey@example.com", place: "Alaska", cardlink: "test43" },
  { name: "Zoe Rivera", email: "zoe.rivera@example.com", place: "Hawaii", cardlink: "test44" },
  { name: "Levi Cooper", email: "levi.cooper@example.com", place: "Delaware", cardlink: "test45" },
  { name: "Nora Richardson", email: "nora.richardson@example.com", place: "Connecticut", cardlink: "test46" },
  { name: "Wyatt Cox", email: "wyatt.cox@example.com", place: "Rhode Island", cardlink: "test47" },
  { name: "Penelope Howard", email: "penelope.howard@example.com", place: "District of Columbia", cardlink: "test48" },
  { name: "Julian Ward", email: "julian.ward@example.com", place: "Puerto Rico", cardlink: "test49" },
  { name: "Ella Foster", email: "ella.foster@example.com", place: "Guam", cardlink: "test50" },
  { name: "Caleb Brooks", email: "caleb.brooks@example.com", place: "California", cardlink: "test51" },
  { name: "Avery Powell", email: "avery.powell@example.com", place: "New York", cardlink: "test52" },
  { name: "Samuel Long", email: "samuel.long@example.com", place: "Texas", cardlink: "test53" },
  { name: "Luna Bennett", email: "luna.bennett@example.com", place: "Florida", cardlink: "test54" },
  { name: "Isaac Hughes", email: "isaac.hughes@example.com", place: "Washington", cardlink: "test55" },
  { name: "Layla Ross", email: "layla.ross@example.com", place: "Oregon", cardlink: "test56" },
  { name: "Nathan Price", email: "nathan.price@example.com", place: "Nevada", cardlink: "test57" },
  { name: "Camila Barnes", email: "camila.barnes@example.com", place: "Arizona", cardlink: "test58" },
  { name: "Thomas Jenkins", email: "thomas.jenkins@example.com", place: "Colorado", cardlink: "test59" },
  { name: "Aurora Perry", email: "aurora.perry@example.com", place: "Illinois", cardlink: "test60" },
  { name: "Christopher Russell", email: "christopher.russell@example.com", place: "Georgia", cardlink: "test61" },
  { name: "Savannah Butler", email: "savannah.butler@example.com", place: "Michigan", cardlink: "test62" },
  { name: "Eli Peterson", email: "eli.peterson@example.com", place: "Virginia", cardlink: "test63" },
  { name: "Stella Sanders", email: "stella.sanders@example.com", place: "Ohio", cardlink: "test64" },
  { name: "Hunter Morris", email: "hunter.morris@example.com", place: "North Carolina", cardlink: "test65" },
  { name: "Paisley Bryant", email: "paisley.bryant@example.com", place: "Indiana", cardlink: "test66" },
  { name: "Joshua Alexander", email: "joshua.alexander@example.com", place: "Minnesota", cardlink: "test67" },
  { name: "Brooklyn Kim", email: "brooklyn.kim@example.com", place: "Missouri", cardlink: "test68" },
  { name: "Andrew Hayes", email: "andrew.hayes@example.com", place: "Wisconsin", cardlink: "test69" },
  { name: "Leah James", email: "leah.james@example.com", place: "Tennessee", cardlink: "test70" },
  { name: "Christopher Wood", email: "christopher.wood@example.com", place: "Kentucky", cardlink: "test71" },
  { name: "Ellie Watson", email: "ellie.watson@example.com", place: "Massachusetts", cardlink: "test72" },
  { name: "Grayson Griffin", email: "grayson.griffin@example.com", place: "Maryland", cardlink: "test73" },
  { name: "Hazel West", email: "hazel.west@example.com", place: "Oklahoma", cardlink: "test74" },
  { name: "Jonathan Cole", email: "jonathan.cole@example.com", place: "Iowa", cardlink: "test75" },
  { name: "Riley Stone", email: "riley.stone@example.com", place: "Louisiana", cardlink: "test76" },
  { name: "Aaron Hunt", email: "aaron.hunt@example.com", place: "Alabama", cardlink: "test77" },
  { name: "Madison Elliott", email: "madison.elliott@example.com", place: "Arkansas", cardlink: "test78" },
  { name: "Dylan Lane", email: "dylan.lane@example.com", place: "Mississippi", cardlink: "test79" },
  { name: "Victoria Bishop", email: "victoria.bishop@example.com", place: "Kansas", cardlink: "test80" },
  { name: "Isaiah Walsh", email: "isaiah.walsh@example.com", place: "Utah", cardlink: "test81" },
  { name: "Lucy Kennedy", email: "lucy.kennedy@example.com", place: "New Mexico", cardlink: "test82" },
  { name: "Adam Spencer", email: "adam.spencer@example.com", place: "Idaho", cardlink: "test83" },
  { name: "Anna Holmes", email: "anna.holmes@example.com", place: "Montana", cardlink: "test84" },
  { name: "Christian Boyd", email: "christian.boyd@example.com", place: "South Carolina", cardlink: "test85" },
  { name: "Skylar Harper", email: "skylar.harper@example.com", place: "North Dakota", cardlink: "test86" },
  { name: "Brayden Mills", email: "brayden.mills@example.com", place: "South Dakota", cardlink: "test87" },
  { name: "Bella George", email: "bella.george@example.com", place: "Nebraska", cardlink: "test88" },
  { name: "Lincoln Sims", email: "lincoln.sims@example.com", place: "West Virginia", cardlink: "test89" },
  { name: "Claire Wheeler", email: "claire.wheeler@example.com", place: "Maine", cardlink: "test90" },
  { name: "Ezekiel Chapman", email: "ezekiel.chapman@example.com", place: "Vermont", cardlink: "test91" },
  { name: "Audrey Oliver", email: "audrey.oliver@example.com", place: "New Hampshire", cardlink: "test92" },
  { name: "Robert Morrison", email: "robert.morrison@example.com", place: "Alaska", cardlink: "test93" },
  { name: "Naomi Richards", email: "naomi.richards@example.com", place: "Hawaii", cardlink: "test94" },
  { name: "Parker Hudson", email: "parker.hudson@example.com", place: "Delaware", cardlink: "test95" },
  { name: "Sadie Nichols", email: "sadie.nichols@example.com", place: "Connecticut", cardlink: "test96" },
  { name: "Anthony Rose", email: "anthony.rose@example.com", place: "Rhode Island", cardlink: "test97" },
  { name: "Mila Newman", email: "mila.newman@example.com", place: "District of Columbia", cardlink: "test98" },
  { name: "Colton Barrett", email: "colton.barrett@example.com", place: "Puerto Rico", cardlink: "test99" },
  { name: "Eva Parsons", email: "eva.parsons@example.com", place: "Guam", cardlink: "test100" }
  ]

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
            <div className="flex flex-1 flex-col">
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h1 className="text-2xl font-bold text-gray-900">Manage Contacts</h1>
                      <p className="text-gray-600 mt-1">
                        Find contacts in your network here. All the people who exchanged cards with you are shown here. 
                      </p>
                    </div>
                    <div className="flex items-center space-x-3">
                    </div>
                  </div>
                </div>
              {/* <div className="flex items-center justify-center h-64">
                <p className="text-gray-500">Contacts feature coming soon</p>
              </div> */}
              <div className="container mx-auto py-10">
                <DataTable columns={columns} data={data} />
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
