"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  DollarSignIcon,
  UsersIcon,
  ShieldCheckIcon,
  StarIcon,
  TrendingUpIcon,
  MessageSquareIcon,
  ChevronRightIcon,
  CheckIcon,
} from "lucide-react";

export default function BecomeHostPage() {
  const { user, updateProfile } = useAuthStore();
  const router = useRouter();
  const [isStarting, setIsStarting] = useState(false);

  const handleStartHosting = async () => {
    if (!user) {
      router.push("/login?redirect=/become-host");
      return;
    }

    setIsStarting(true);

    // Update user to host status
    await updateProfile({ isHost: true });
    router.push("/host/onboarding");
  };

  const benefits = [
    {
      icon: <DollarSignIcon className="h-8 w-8 text-emerald-600" />,
      title: "Earn extra income",
      description:
        "Turn your extra space into extra income. Set your own schedule and pricing.",
    },
    {
      icon: <ShieldCheckIcon className="h-8 w-8 text-blue-600" />,
      title: "Host with confidence",
      description:
        "$1M+ Host Guarantee and comprehensive Host protection insurance.",
    },
    {
      icon: <UsersIcon className="h-8 w-8 text-purple-600" />,
      title: "Meet amazing guests",
      description:
        "Connect with travelers from around the world and create lasting memories.",
    },
    {
      icon: <TrendingUpIcon className="h-8 w-8 text-orange-600" />,
      title: "Grow your business",
      description:
        "Access professional tools and resources to optimize your hosting success.",
    },
  ];

  const steps = [
    {
      number: "1",
      title: "Tell us about your place",
      description:
        "Share basic info like location, how many guests you can accommodate, and photos.",
    },
    {
      number: "2",
      title: "Make it stand out",
      description:
        "Add 5 or more photos plus a title and description—we'll help you out.",
    },
    {
      number: "3",
      title: "Finish and publish",
      description:
        "Choose a starting price, verify a few details, then publish your listing.",
    },
  ];

  const features = [
    "24/7 customer support",
    "Secure payment processing",
    "Professional photography service",
    "Smart pricing recommendations",
    "Guest screening and verification",
    "Instant booking options",
    "Multi-calendar management",
    "Performance analytics",
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 pt-16 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl font-bold text-gray-900 mb-6">
                Become a Host and start earning
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Turn your extra space into extra income. Join millions of hosts
                worldwide and create amazing experiences for travelers.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button
                  onClick={handleStartHosting}
                  disabled={isStarting}
                  className="bg-rose-600 hover:bg-rose-700 text-white px-8 py-3 text-lg font-semibold"
                >
                  {isStarting ? "Starting..." : "Start hosting today"}
                </Button>
                <Button
                  variant="outline"
                  className="border-gray-300 text-gray-700 px-8 py-3 text-lg"
                >
                  Learn more
                </Button>
              </div>

              <div className="flex items-center space-x-8 text-sm text-gray-600">
                <div className="flex items-center">
                  <StarIcon className="h-5 w-5 text-yellow-400 mr-1" />
                  <span>4.8/5 host satisfaction</span>
                </div>
                <div className="flex items-center">
                  <UsersIcon className="h-5 w-5 text-blue-500 mr-1" />
                  <span>1M+ active hosts</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <img
                  src="https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=400&h=300&fit=crop"
                  alt="Beautiful home"
                  className="rounded-lg shadow-lg"
                />
                <img
                  src="https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&h=300&fit=crop"
                  alt="Cozy apartment"
                  className="rounded-lg shadow-lg mt-8"
                />
              </div>
              <div className="absolute -bottom-4 -left-4 bg-white p-4 rounded-lg shadow-lg">
                <p className="text-2xl font-bold text-green-600">$1,200</p>
                <p className="text-sm text-gray-600">avg. monthly earnings</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why host with Nestly?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join a community of hosts who have earned over $180 billion
              hosting unique spaces around the world.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <Card
                key={index}
                className="p-6 text-center hover:shadow-lg transition-shadow"
              >
                <div className="flex justify-center mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {benefit.title}
                </h3>
                <p className="text-gray-600">{benefit.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              It&apos;s easy to get started on Nestly
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 bg-rose-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {step.number}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Professional hosting tools included
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Get everything you need to manage your listing and provide an
                exceptional guest experience.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <CheckIcon className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <Link
                  href="/host/dashboard"
                  className="inline-flex items-center text-rose-600 hover:text-rose-700 font-semibold"
                >
                  Explore host tools
                  <ChevronRightIcon className="h-4 w-4 ml-1" />
                </Link>
              </div>
            </div>

            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=400&fit=crop"
                alt="Host dashboard"
                className="rounded-lg shadow-xl"
              />
              <div className="absolute -top-4 -right-4 bg-white p-4 rounded-lg shadow-lg">
                <MessageSquareIcon className="h-8 w-8 text-blue-500 mb-2" />
                <p className="text-sm font-semibold">24/7 Support</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-rose-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to start earning?
          </h2>
          <p className="text-xl text-rose-100 mb-8">
            Join millions of hosts worldwide and turn your space into income.
          </p>
          <Button
            onClick={handleStartHosting}
            disabled={isStarting}
            className="bg-white text-rose-600 hover:bg-gray-100 px-8 py-3 text-lg font-semibold"
          >
            {isStarting ? "Starting..." : "Get started today"}
          </Button>
        </div>
      </section>
    </div>
  );
}
