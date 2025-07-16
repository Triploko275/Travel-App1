"use client";

import * as React from "react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, PlusCircle } from "lucide-react";
import { agents } from "@/lib/data";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";

type AgentWithStatus = (typeof agents)[0] & {
  kycStatus: "Verified" | "Pending" | "Rejected";
  accountStatus: "Active" | "Suspended";
};

export default function SuperAdminAgentsPage() {
  const { toast } = useToast();
  const [agentList, setAgentList] = React.useState<AgentWithStatus[]>([]);

  React.useEffect(() => {
    const initialAgents = agents.map((agent) => ({
      ...agent,
      kycStatus: ["Verified", "Pending", "Rejected"][
        Math.floor(Math.random() * 3)
      ] as "Verified" | "Pending" | "Rejected",
      accountStatus: (Math.random() > 0.2 ? "Active" : "Suspended") as
        | "Active"
        | "Suspended",
    }));
    setAgentList(initialAgents);
  }, []);

  const handleKycStatusChange = (
    agentId: number,
    status: AgentWithStatus["kycStatus"],
  ) => {
    setAgentList((prev) =>
      prev.map((agent) =>
        agent.id === agentId ? { ...agent, kycStatus: status } : agent,
      ),
    );
    toast({ title: `Agent KYC set to ${status}` });
  };

  const handleAccountStatusChange = (
    agentId: number,
    status: AgentWithStatus["accountStatus"],
  ) => {
    setAgentList((prev) =>
      prev.map((agent) =>
        agent.id === agentId ? { ...agent, accountStatus: status } : agent,
      ),
    );
    toast({ title: `Agent account has been ${status}` });
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold font-headline">Agent Management</h1>
          <p className="text-muted-foreground">
            View, approve, and manage all travel agents.
          </p>
        </div>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Onboard New Agent
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>All Agents</CardTitle>
          <CardDescription>
            A list of all registered agents on the platform.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Agent Name</TableHead>
                <TableHead>Specialty</TableHead>
                <TableHead>KYC Status</TableHead>
                <TableHead>Account Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {agentList.map((agent) => (
                <TableRow key={agent.id}>
                  <TableCell className="font-medium">{agent.name}</TableCell>
                  <TableCell>{agent.specialty}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        agent.kycStatus === "Verified"
                          ? "default"
                          : agent.kycStatus === "Pending"
                            ? "secondary"
                            : "destructive"
                      }
                      className={
                        agent.kycStatus === "Verified"
                          ? "bg-green-100 text-green-800"
                          : agent.kycStatus === "Pending"
                            ? "bg-amber-100 text-amber-800"
                            : "bg-red-100 text-red-800"
                      }
                    >
                      {agent.kycStatus}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        agent.accountStatus === "Active"
                          ? "default"
                          : "destructive"
                      }
                    >
                      {agent.accountStatus}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem asChild>
                          <Link href={`/superadmin/agents/${agent.id}`}>
                            View Details
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link
                            href={`/superadmin/agents/${agent.id}/packages`}
                          >
                            View Packages
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuLabel>KYC</DropdownMenuLabel>
                        <DropdownMenuItem
                          onSelect={() =>
                            handleKycStatusChange(agent.id, "Verified")
                          }
                        >
                          Approve KYC
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-destructive"
                          onSelect={() =>
                            handleKycStatusChange(agent.id, "Rejected")
                          }
                        >
                          Reject KYC
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuLabel>Account</DropdownMenuLabel>
                        <DropdownMenuItem
                          onSelect={() =>
                            handleAccountStatusChange(agent.id, "Active")
                          }
                          disabled={agent.accountStatus === "Active"}
                        >
                          Re-activate Agent
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-destructive"
                          onSelect={() =>
                            handleAccountStatusChange(agent.id, "Suspended")
                          }
                          disabled={agent.accountStatus === "Suspended"}
                        >
                          Suspend Agent
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
}
