"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import StatusDialog from "@/components/ui/Status-Dialog";

export default function UsersTable({
  user,
  users,
}: any) {


  const currentUser = user?.data?.user
  // console.log(currentUser)
  const [selectedUser, setSelectedUser] = useState<any>(null);
  return (
    <div className="rounded-md border bg-background">
      {
        users.length === 0 ? <p className="p-5 text-center text-xl">No Users Found</p> :
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Joined</TableHead>
                <TableHead className="text-right pr-15">Action</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {users.map((user: any) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">
                    {user.name}
                  </TableCell>

                  <TableCell>{user.email}</TableCell>

                  <TableCell>
                    <Badge variant="secondary">{user.role}</Badge>
                  </TableCell>

                  <TableCell>
                    <Badge
                      variant={
                        user.status === "ACTIVE"
                          ? "default"
                          : "destructive"
                      }
                    >
                      {user.status}
                    </Badge>
                  </TableCell>

                  <TableCell>
                    {new Date(user.createdAt).toLocaleDateString()}
                  </TableCell>

                  <TableCell className="text-right flex justify-end gap-1">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setSelectedUser(user)}
                      disabled={user.role === currentUser.role}
                    >
                      Change Status
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
      }
      {selectedUser && (
        <StatusDialog
          user={selectedUser}
          open={!!selectedUser}
          onClose={() => setSelectedUser(null)}
        />
      )}
    </div>
  );
}