'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

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

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/users')
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {loading
        ? Array.from({ length: 6 }).map((_, index) => (
          <Skeleton key={index} className="h-32 w-full rounded-lg" />
        ))
        : users.map((user) => (
          <Card key={user.id} className="flex items-center p-4">
            <img src={user.avatar} alt={user.firstName} className="w-16 h-16 rounded-full mr-4" />
            <CardContent>
              <h3 className="text-lg font-semibold">
                {user.firstName} {user.lastName}
              </h3>
              <p className="text-sm text-gray-500">{user.email}</p>
              <p className="text-sm">{user.city} - {user.age} ans</p>
              <p className="text-sm font-medium">💰 {user.salary} €</p>
            </CardContent>
          </Card>
        ))}
    </div>
  );
}
