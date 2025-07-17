"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useAuthStore } from "@/store/authStore";
import { usePropertyStore } from "@/store/propertyStore";
import { useBookingStore } from "@/store/bookingStore";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  HomeIcon,
  CalendarIcon,
  DollarSignIcon,
  UsersIcon,
  MessageSquareIcon,
  BarChart3Icon,
  SettingsIcon,
  PlusIcon,
  EyeIcon,
  EditIcon,
  TrashIcon,
  StarIcon,
  TrendingUpIcon,
  TrendingDownIcon,
} from "lucide-react";

export default function HostDashboardPage() {
  const { user } = useAuthStore();
  const { properties } = usePropertyStore();
  const { bookings } = useBookingStore();
  const [activeTab, setActiveTab] = useState("overview");

  // Mock data for demonstration
  const hostProperties = properties.filter((p) => p.hostId === user?.id);
  const hostBookings = bookings.filter((b) =>
    hostProperties.some((p) => p.id === b.propertyId)
  );

  const stats = {
    totalEarnings: 12450,
    monthlyEarnings: 3250,
    totalBookings: 47,
    monthlyBookings: 8,
    averageRating: 4.8,
    occupancyRate: 78,
  };

  const recentBookings = hostBookings.slice(0, 5);
  const upcomingBookings = hostBookings
    .filter((b) => new Date(b.checkIn) > new Date())
    .slice(0, 3);

  const navItems = [
    { id: "overview", label: "Overview", icon: BarChart3Icon },
    { id: "properties", label: "Properties", icon: HomeIcon },
    { id: "bookings", label: "Bookings", icon: CalendarIcon },
    { id: "earnings", label: "Earnings", icon: DollarSignIcon },
    { id: "messages", label: "Messages", icon: MessageSquareIcon },
    { id: "settings", label: "Settings", icon: SettingsIcon },
  ];

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Total Earnings
              </p>
              <p className="text-2xl font-bold text-green-600">
                ${stats.totalEarnings}
              </p>
            </div>
            <DollarSignIcon className="h-8 w-8 text-green-600" />
          </div>
          <div className="flex items-center mt-2">
            <TrendingUpIcon className="h-4 w-4 text-green-500 mr-1" />
            <span className="text-sm text-green-600">+12% from last month</span>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Monthly Bookings
              </p>
              <p className="text-2xl font-bold text-blue-600">
                {stats.monthlyBookings}
              </p>
            </div>
            <CalendarIcon className="h-8 w-8 text-blue-600" />
          </div>
          <div className="flex items-center mt-2">
            <TrendingUpIcon className="h-4 w-4 text-green-500 mr-1" />
            <span className="text-sm text-green-600">+3 from last month</span>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Average Rating
              </p>
              <p className="text-2xl font-bold text-yellow-600">
                {stats.averageRating}
              </p>
            </div>
            <StarIcon className="h-8 w-8 text-yellow-600" />
          </div>
          <div className="flex items-center mt-2">
            <span className="text-sm text-gray-600">
              Based on {stats.totalBookings} reviews
            </span>
          </div>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link href="/host/properties/new">
            <Button className="w-full flex flex-col items-center p-4 h-auto bg-rose-600 hover:bg-rose-700">
              <PlusIcon className="h-6 w-6 mb-2" />
              Add Property
            </Button>
          </Link>
          <Button
            variant="outline"
            className="w-full flex flex-col items-center p-4 h-auto"
          >
            <CalendarIcon className="h-6 w-6 mb-2" />
            Manage Calendar
          </Button>
          <Button
            variant="outline"
            className="w-full flex flex-col items-center p-4 h-auto"
          >
            <MessageSquareIcon className="h-6 w-6 mb-2" />
            Check Messages
          </Button>
          <Button
            variant="outline"
            className="w-full flex flex-col items-center p-4 h-auto"
          >
            <BarChart3Icon className="h-6 w-6 mb-2" />
            View Analytics
          </Button>
        </div>
      </Card>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Recent Bookings</h3>
          <div className="space-y-4">
            {recentBookings.map((booking) => (
              <div
                key={booking.id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div>
                  <p className="font-medium">
                    {booking.guest.firstName} {booking.guest.lastName}
                  </p>
                  <p className="text-sm text-gray-600">
                    {booking.property.title}
                  </p>
                  <p className="text-sm text-gray-500">
                    {booking.checkIn.toLocaleDateString()} -{" "}
                    {booking.checkOut.toLocaleDateString()}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-green-600">
                    ${booking.totalPrice}
                  </p>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      booking.status === "confirmed"
                        ? "bg-green-100 text-green-700"
                        : booking.status === "pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {booking.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Upcoming Check-ins</h3>
          <div className="space-y-4">
            {upcomingBookings.map((booking) => (
              <div
                key={booking.id}
                className="flex items-center justify-between p-3 bg-blue-50 rounded-lg"
              >
                <div>
                  <p className="font-medium">
                    {booking.guest.firstName} {booking.guest.lastName}
                  </p>
                  <p className="text-sm text-gray-600">
                    {booking.property.title}
                  </p>
                  <p className="text-sm text-blue-600 font-medium">
                    Checking in: {booking.checkIn.toLocaleDateString()}
                  </p>
                </div>
                <Button size="sm" variant="outline">
                  Contact Guest
                </Button>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );

  const renderProperties = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Your Properties</h2>
        <Link href="/host/properties/new">
          <Button className="bg-rose-600 hover:bg-rose-700">
            <PlusIcon className="h-4 w-4 mr-2" />
            Add New Property
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {hostProperties.map((property) => (
          <Card key={property.id} className="overflow-hidden">
            <div className="relative">
              <img
                src={property.images[0]}
                alt={property.title}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-2 right-2 flex space-x-1">
                <Button size="sm" variant="secondary" className="bg-white/90">
                  <EyeIcon className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="secondary" className="bg-white/90">
                  <EditIcon className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant="secondary"
                  className="bg-white/90 text-red-600"
                >
                  <TrashIcon className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-semibold mb-2">{property.title}</h3>
              <p className="text-sm text-gray-600 mb-2">
                {property.location.city}, {property.location.state}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <StarIcon className="h-4 w-4 text-yellow-400 mr-1" />
                  <span className="text-sm">
                    {property.rating} ({property.reviewCount})
                  </span>
                </div>
                <span className="font-semibold">
                  ${property.pricePerNight}/night
                </span>
              </div>
              <div className="mt-3 flex space-x-2">
                <Button size="sm" variant="outline" className="flex-1">
                  Manage Calendar
                </Button>
                <Button size="sm" variant="outline" className="flex-1">
                  View Stats
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderBookings = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Booking Management</h2>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">All Bookings</h3>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                Filter
              </Button>
              <Button variant="outline" size="sm">
                Export
              </Button>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Guest
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Property
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Dates
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {hostBookings.map((booking) => (
                <tr key={booking.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <img
                        className="h-8 w-8 rounded-full"
                        src={
                          booking.guest.avatar ||
                          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face"
                        }
                        alt=""
                      />
                      <div className="ml-3">
                        <div className="text-sm font-medium text-gray-900">
                          {booking.guest.firstName} {booking.guest.lastName}
                        </div>
                        <div className="text-sm text-gray-500">
                          {booking.guest.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {booking.property.title}
                    </div>
                    <div className="text-sm text-gray-500">
                      {booking.property.location.city}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {booking.checkIn.toLocaleDateString()}
                    </div>
                    <div className="text-sm text-gray-500">
                      to {booking.checkOut.toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        booking.status === "confirmed"
                          ? "bg-green-100 text-green-800"
                          : booking.status === "pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : booking.status === "cancelled"
                          ? "bg-red-100 text-red-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {booking.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ${booking.totalPrice}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        View
                      </Button>
                      <Button size="sm" variant="outline">
                        Message
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderEarnings = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Earnings & Analytics</h2>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600">
              ${stats.totalEarnings}
            </p>
            <p className="text-sm text-gray-600">Total Earnings</p>
          </div>
        </Card>
        <Card className="p-6">
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-600">
              ${stats.monthlyEarnings}
            </p>
            <p className="text-sm text-gray-600">This Month</p>
          </div>
        </Card>
        <Card className="p-6">
          <div className="text-center">
            <p className="text-2xl font-bold text-purple-600">
              {stats.occupancyRate}%
            </p>
            <p className="text-sm text-gray-600">Occupancy Rate</p>
          </div>
        </Card>
        <Card className="p-6">
          <div className="text-center">
            <p className="text-2xl font-bold text-orange-600">
              ${Math.round(stats.totalEarnings / stats.totalBookings)}
            </p>
            <p className="text-sm text-gray-600">Avg. per Booking</p>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Monthly Earnings Trend</h3>
          <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
            <p className="text-gray-500">
              Chart placeholder - Earnings over time
            </p>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Property Performance</h3>
          <div className="space-y-4">
            {hostProperties.slice(0, 3).map((property) => (
              <div
                key={property.id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div>
                  <p className="font-medium">{property.title}</p>
                  <p className="text-sm text-gray-600">
                    {property.reviewCount} bookings
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">
                    ${property.pricePerNight * property.reviewCount}
                  </p>
                  <p className="text-sm text-gray-600">Revenue</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return renderOverview();
      case "properties":
        return renderProperties();
      case "bookings":
        return renderBookings();
      case "earnings":
        return renderEarnings();
      case "messages":
        return (
          <div className="text-center py-12">
            <p className="text-gray-500">Messages feature coming soon</p>
          </div>
        );
      case "settings":
        return (
          <div className="text-center py-12">
            <p className="text-gray-500">Settings feature coming soon</p>
          </div>
        );
      default:
        return renderOverview();
    }
  };

  if (!user?.isHost) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="p-8 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Access Denied
          </h1>
          <p className="text-gray-600 mb-6">
            You need to be a host to access this dashboard.
          </p>
          <Link href="/become-host">
            <Button className="bg-rose-600 hover:bg-rose-700">
              Become a Host
            </Button>
          </Link>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-sm border-r min-h-screen">
          <div className="p-6">
            <h2 className="text-xl font-bold text-gray-900">Host Dashboard</h2>
            <p className="text-sm text-gray-600">
              Welcome back, {user.firstName}!
            </p>
          </div>

          <nav className="mt-6">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center px-6 py-3 text-left hover:bg-gray-50 transition-colors ${
                    activeTab === item.id
                      ? "bg-rose-50 text-rose-600 border-r-2 border-rose-600"
                      : "text-gray-700"
                  }`}
                >
                  <Icon className="h-5 w-5 mr-3" />
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">{renderContent()}</div>
      </div>
    </div>
  );
}
