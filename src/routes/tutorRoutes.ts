import { Route } from "@/types";

export const tutorRoutes: Route[] = [
    {
      title: "Tutoring",
      items: [
        {
          title: "Stats",
          url: "/tutor",
        },
        {
          title: "Availability",
          url: "/tutor/availability",
        },
        {
          title: "Profile",
          url: "/tutor/profile",
        }
      ],
    },
]