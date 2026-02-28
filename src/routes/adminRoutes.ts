import { Route } from "@/types";

export const adminRoutes : Route[] = [
    {
      title: "Moderator",
      items: [
        {
          title: "Analytics",
          url: "/admin/analytics",
        },
        {
          title: "Bookings",
          url: "/admin/bookings",
        },  
        {
          title: "Users",
          url: "/admin/users",
        },  
        {
          title: "Categories",
          url: "/admin/categories",
        },  
      ],
    },
]