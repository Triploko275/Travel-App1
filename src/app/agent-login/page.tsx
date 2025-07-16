"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Building2, Mail, Lock, Eye, EyeOff, LogIn, Info } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

// Demo agent credentials
const demoAgents = [
  {
    id: "agent_001",
    email: "demo@agent.com",
    password: "demo123",
    name: "Travel Pro Agency",
    plan: "growth",
  },
  {
    id: "agent_002",
    email: "trial@agent.com",
    password: "trial123",
    name: "New Agent Trial",
    plan: "trial",
  },
  {
    id: "agent_003",
    email: "pro@agent.com",
    password: "pro123",
    name: "Premium Travel Co",
    plan: "pro",
  },
];

export default function AgentLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Check demo credentials
    const agent = demoAgents.find(
      (a) => a.email === email && a.password === password,
    );

    if (agent) {
      // In a real app, this would set proper authentication tokens
      localStorage.setItem(
        "agent_session",
        JSON.stringify({
          id: agent.id,
          name: agent.name,
          plan: agent.plan,
          email: agent.email,
        }),
      );

      router.push("/agent-dashboard");
    } else {
      setError(
        "Invalid email or password. Please use the demo credentials provided.",
      );
    }

    setIsLoading(false);
  };

  const handleDemoLogin = (agent: (typeof demoAgents)[0]) => {
    setEmail(agent.email);
    setPassword(agent.password);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-4 sm:py-12 px-4 sm:px-6 lg:px-8 overflow-auto">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="mx-auto h-12 w-12 bg-blue-600 rounded-lg flex items-center justify-center">
            <Building2 className="h-6 w-6 text-white" />
          </div>
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            Agent Dashboard Login
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Sign in to your agent account to manage packages and bookings
          </p>
        </div>

        {/* Demo Credentials Info */}
        <Alert>
          <Info className="h-4 w-4" />
          <AlertDescription>
            <strong>Demo Login Available:</strong> Use any of the demo
            credentials below to explore the agent dashboard features.
          </AlertDescription>
        </Alert>

        {/* Demo Accounts */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Demo Accounts</CardTitle>
            <CardDescription>
              Click on any account to auto-fill login credentials
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {demoAgents.map((agent) => (
              <div
                key={agent.id}
                className="flex items-center justify-between p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => handleDemoLogin(agent)}
              >
                <div>
                  <p className="font-medium text-sm">{agent.name}</p>
                  <p className="text-xs text-gray-500">{agent.email}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge
                    variant={
                      agent.plan === "trial"
                        ? "secondary"
                        : agent.plan === "growth"
                          ? "default"
                          : "outline"
                    }
                  >
                    {agent.plan}
                  </Badge>
                  <span className="text-xs text-gray-400">•••</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Login Form */}
        <Card>
          <CardHeader>
            <CardTitle>Sign In</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="pl-10 pr-10"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Signing in...
                  </div>
                ) : (
                  <>
                    <LogIn className="h-4 w-4 mr-2" />
                    Sign In
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Additional Links */}
        <div className="text-center space-y-2">
          <p className="text-sm text-gray-600">
            Don't have an agent account?{" "}
            <Link
              href="/agent-dashboard/registration"
              className="text-blue-600 hover:underline"
            >
              Register as Agent
            </Link>
          </p>
          <p className="text-sm text-gray-600">
            <Link href="/" className="text-blue-600 hover:underline">
              ← Back to Main Site
            </Link>
          </p>
        </div>

        {/* System Requirements */}
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4">
            <h3 className="font-medium text-blue-900 mb-2">Demo System Info</h3>
            <div className="text-sm text-blue-800 space-y-1">
              <p>• Full agent dashboard with 7 sections</p>
              <p>• Package management (CRUD operations)</p>
              <p>• Booking inbox with status tracking</p>
              <p>• Payout request system</p>
              <p>• Analytics dashboard with metrics</p>
              <p>• Subscription plan management</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
