
"use client";

import * as React from "react";
import Link from "next/link";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription
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
import { MoreHorizontal } from "lucide-react";
import { packages, agents } from "@/lib/data";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";

type PackageWithStatus = (typeof packages)[0] & {
    approvalStatus: "Approved" | "Pending" | "Rejected";
    isFeatured: boolean;
    agentName: string;
};

export default function SuperAdminPackagesPage() {
    const { toast } = useToast();
    const [packageList, setPackageList] = React.useState<PackageWithStatus[]>([]);

    React.useEffect(() => {
        const initialPackages = packages.map(pkg => ({
            ...pkg,
            approvalStatus: ["Approved", "Pending", "Rejected"][Math.floor(Math.random() * 3)] as "Approved" | "Pending" | "Rejected",
            isFeatured: Math.random() > 0.8,
            agentName: agents.find(a => a.id === pkg.agentId)?.name || 'Unknown Agent',
        }));
        setPackageList(initialPackages);
    }, []);

    const handleApprovalChange = (pkgId: number, status: PackageWithStatus['approvalStatus']) => {
        setPackageList(prev => prev.map(pkg => pkg.id === pkgId ? { ...pkg, approvalStatus: status } : pkg));
        toast({ title: `Package status set to ${status}` });
    };

    const handleFeatureToggle = (pkgId: number) => {
        const pkg = packageList.find(p => p.id === pkgId);
        if (pkg) {
            toast({ title: `Package ${pkg.isFeatured ? 'un-featured' : 'featured'}!` });
            setPackageList(prev => 
                prev.map(p => 
                    p.id === pkgId ? { ...p, isFeatured: !p.isFeatured } : p
                )
            );
        }
    };

    return (
        <>
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold font-headline">Package Management</h1>
                    <p className="text-muted-foreground">Review, approve, and manage all travel packages.</p>
                </div>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>All Packages</CardTitle>
                    <CardDescription>A list of all packages submitted by agents.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Package Title</TableHead>
                                <TableHead>Agent</TableHead>
                                <TableHead>Destination</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Approval Status</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {packageList.map((pkg) => (
                                <TableRow key={pkg.id}>
                                    <TableCell className="font-medium">{pkg.title}</TableCell>
                                    <TableCell>{pkg.agentName}</TableCell>
                                    <TableCell>{pkg.destination}</TableCell>
                                    <TableCell>
                                        {pkg.isFeatured && <Badge>Featured</Badge>}
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant={pkg.approvalStatus === 'Approved' ? "default" : (pkg.approvalStatus === 'Pending' ? "secondary" : "destructive")}
                                         className={pkg.approvalStatus === 'Approved' ? 'bg-green-100 text-green-800' : (pkg.approvalStatus === 'Pending' ? 'bg-amber-100 text-amber-800' : 'bg-red-100 text-red-800')}>
                                            {pkg.approvalStatus}
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
                                                    <Link href={`/packages/${pkg.id}`}>View Details</Link>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem onSelect={() => handleFeatureToggle(pkg.id)}>
                                                    {pkg.isFeatured ? 'Un-feature Package' : 'Feature Package'}
                                                </DropdownMenuItem>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem onSelect={() => handleApprovalChange(pkg.id, 'Approved')}>Approve</DropdownMenuItem>
                                                <DropdownMenuItem className="text-destructive" onSelect={() => handleApprovalChange(pkg.id, 'Rejected')}>Reject</DropdownMenuItem>
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
