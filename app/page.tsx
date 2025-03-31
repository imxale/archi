"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { SiShadcnui } from "react-icons/si";
import { RiMenuFill } from "react-icons/ri";
import { filterUsers, generateUsers } from "@/services/userService";

const navigationLinks = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About" },
    { path: "services", label: "Services" },
    { path: "contact", label: "Contact" },
];

interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    city: string;
    age: number;
    salary: number;
    avatar: string;
}

function UsersPage() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const pathname = usePathname();
    const [filteredUsers, setFilteredUsers] = useState<User[]>([]);

    useEffect(() => {
        fetch("/api/users")
            .then((res) => res.json())
            .then((data) => {
                setUsers(data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    const [filters, setFilters] = useState({
        city: "",
        minAge: "",
        maxAge: "",
        minSalary: "",
        maxSalary: "",
    });

    useEffect(() => {
        const generatedUsers = generateUsers(50);
        setUsers(generatedUsers);
        setFilteredUsers(generatedUsers);
        setLoading(false);
    }, []);

    useEffect(() => {
        const filtered = filterUsers(users, {
            city: filters.city,
            minAge: filters.minAge ? parseInt(filters.minAge) : undefined,
            maxAge: filters.maxAge ? parseInt(filters.maxAge) : undefined,
            minSalary: filters.minSalary
                ? parseInt(filters.minSalary)
                : undefined,
            maxSalary: filters.maxSalary
                ? parseInt(filters.maxSalary)
                : undefined,
        });
        setFilteredUsers(filtered);
    }, [filters, users]);

    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFilters((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    return (
        <>
            <header className="flex h-20 w-full shrink-0 items-center px-4 md:px-6">
                <Sheet>
                    <SheetTrigger asChild>
                        <Button
                            variant="outline"
                            size="icon"
                            className="lg:hidden"
                        >
                            <RiMenuFill />
                            <span className="sr-only">
                                Toggle navigation menu
                            </span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left">
                        <Link href="/" className="mr-6 hidden lg:flex">
                            <SiShadcnui />
                            <span className="sr-only">Acme Inc</span>
                        </Link>
                        <div className="grid gap-2 py-6">
                            {navigationLinks.map((link) => (
                                <Link
                                    key={link.path}
                                    href={link.path}
                                    className={`flex w-full items-center py-2 text-lg font-semibold ${
                                        pathname === link.path
                                            ? "text-blue-500"
                                            : ""
                                    }`}
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>
                    </SheetContent>
                </Sheet>
                <Link href="/" className="mr-6 hidden lg:flex">
                    <SiShadcnui />
                    <span className="sr-only">Acme Inc</span>
                </Link>
                <nav className="ml-auto hidden lg:flex gap-6">
                    {navigationLinks.map((link) => (
                        <Link
                            key={link.path}
                            href={link.path}
                            className={`group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 ${
                                pathname === link.path ? "text-blue-500" : ""
                            }`}
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>
            </header>
            <div className="mx-24 my-6">
                <h2 className="text-2xl font-semibold mb-4">
                    Filtrer les utilisateurs
                </h2>
                <div className="space-y-6">
                    <div className="space-y-2">
                        <input
                            type="text"
                            name="city"
                            value={filters.city}
                            onChange={handleFilterChange}
                            placeholder="Filtrer par ville"
                            className="w-full border border-gray-300 rounded-lg p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="flex gap-6">
                        <div className="w-1/2 space-y-2">
                            <label
                                htmlFor="minAge"
                                className="text-sm font-medium"
                            >
                                Âge minimum
                            </label>
                            <input
                                type="number"
                                name="minAge"
                                value={filters.minAge}
                                onChange={handleFilterChange}
                                id="minAge"
                                placeholder="Âge minimum"
                                className="w-full border border-gray-300 rounded-lg p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div className="w-1/2 space-y-2">
                            <label
                                htmlFor="maxAge"
                                className="text-sm font-medium"
                            >
                                Âge maximum
                            </label>
                            <input
                                type="number"
                                name="maxAge"
                                value={filters.maxAge}
                                onChange={handleFilterChange}
                                id="maxAge"
                                placeholder="Âge maximum"
                                className="w-full border border-gray-300 rounded-lg p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>
                    <div className="flex gap-6">
                        <div className="w-1/2 space-y-2">
                            <label
                                htmlFor="minSalary"
                                className="text-sm font-medium"
                            >
                                Salaire minimum
                            </label>
                            <input
                                type="number"
                                name="minSalary"
                                value={filters.minSalary}
                                onChange={handleFilterChange}
                                id="minSalary"
                                placeholder="Salaire minimum"
                                className="w-full border border-gray-300 rounded-lg p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div className="w-1/2 space-y-2">
                            <label
                                htmlFor="maxSalary"
                                className="text-sm font-medium"
                            >
                                Salaire maximum
                            </label>
                            <input
                                type="number"
                                name="maxSalary"
                                value={filters.maxSalary}
                                onChange={handleFilterChange}
                                id="maxSalary"
                                placeholder="Salaire maximum"
                                className="w-full border border-gray-300 rounded-lg p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mx-24">
                {loading ? (
                    Array.from({ length: 6 }).map((_, index) => (
                        <Skeleton
                            key={index}
                            className="h-32 w-full rounded-lg"
                        />
                    ))
                ) : filteredUsers.length === 0 ? (
                    <p className="w-full col-span-3 text-center text-lg text-gray-500">
                        Aucun résultat trouvé
                    </p>
                ) : (
                    filteredUsers.map((user) => (
                        <Card key={user.id} className="flex items-center p-4">
                            <img
                                src={user.avatar}
                                alt={user.firstName}
                                className="w-16 h-16 rounded-full mr-4"
                            />
                            <CardContent>
                                <h3 className="text-lg font-semibold">
                                    {user.firstName} {user.lastName}
                                </h3>
                                <p className="text-sm text-gray-500">
                                    {user.email}
                                </p>
                                <p className="text-sm">
                                    {user.city} - {user.age} ans
                                </p>
                                <p className="text-sm font-medium">
                                    💰 {user.salary} €
                                </p>
                            </CardContent>
                        </Card>
                    ))
                )}
            </div>
        </>
    );
}

export default UsersPage;
