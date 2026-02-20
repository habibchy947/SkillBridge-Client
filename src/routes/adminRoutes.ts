import { Route } from "@/types";

export const adminRoutes : Route[] = [
    {
      title: "Moderator",
      items: [
        {
          title: "Analytics",
          url: "/statistics",
        },
        {
          title: "Bookings",
          url: "/bookings",
        },  
        {
          title: "Users",
          url: "/users",
        },  
      ],
    },
]