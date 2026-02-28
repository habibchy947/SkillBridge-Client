import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface BookingsTableProps {
  bookings: any[];
}


export default function BookingsTable({ bookings }: BookingsTableProps) {
    const getStatusVariant = (status: string) => {
        if (status === "CONFIRMED") return "default";
        if (status === "COMPLETED") return "secondary";
        if (status === "CANCELLED") return "destructive";
        return "outline";
    };
    console.log(bookings)
    return (
        <Card className="rounded-sm shadow-sm">
            <CardHeader>
                <CardTitle className="text-lg">Bookings List</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="rounded-sm border overflow-hidden">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Student</TableHead>
                                <TableHead>Tutor</TableHead>
                                <TableHead>Category</TableHead>
                                <TableHead>Session Time</TableHead>
                                <TableHead>Price</TableHead>
                                <TableHead className="text-center">Status</TableHead>
                            </TableRow>
                        </TableHeader>
                      <TableBody>
              {bookings?.length > 0 ? (
                bookings.map((booking) => (
                  <TableRow key={booking.id}>
                    <TableCell>
                      <div className="flex flex-col">
                        <span>{booking.student?.name}</span>
                        <span className="text-xs text-muted-foreground">
                          {booking.student?.email}
                        </span>
                      </div>
                    </TableCell>

                    <TableCell>
                      <div className="flex flex-col">
                        <span>{booking.tutor?.user.name}</span>
                        <span className="text-xs text-muted-foreground">
                          {booking.tutor?.hourlyRate}$/hr
                        </span>
                      </div>
                    </TableCell>

                    <TableCell>
                      {booking.tutor?.category?.name}
                    </TableCell>

                    <TableCell>
                      {new Date(booking.sessionTime).toLocaleString()}
                    </TableCell>

                    <TableCell>${booking.price}</TableCell>

                    <TableCell className="text-center">
                      <Badge variant={getStatusVariant(booking.status)}>
                        {booking.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={8}
                    className="text-center py-10 text-muted-foreground"
                  >
                    No bookings found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
        
                    </Table>
                </div>
            </CardContent>
        </Card>
    )
}
