import * as React from "react"

import { SearchForm } from "@/components/layout/search-form"
import { VersionSwitcher } from "@/components/layout/version-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import Link from "next/link"
import { adminRoutes } from "@/routes/adminRoutes"
import { studentRoutes } from "@/routes/studentRoutes"
import { tutorRoutes } from "@/routes/tutorRoutes"
import { Route } from "@/types"
import { Roles } from "@/constant/role"

// This is sample data.
// const data = {
//   versions: ["1.0.1", "1.1.0-alpha", "2.0.0-beta1"],
//   navMain: [
//     {
//       title: "Getting Started",
//       items: [
//         {
//           title: "Admin",
//           url: "/admin",
//         },
//         {
//           title: "Student",
//           url: "/dashboard",
//         },  
//         {
//           title: "Tutor",
//           url: "/tutor",
//         },  
//       ],
//     },
//     // {
//     //   title: "Build Your Application",
//     //   url: "#",
//     //   items: [
//     //     {
//     //       title: "Routing",
//     //       url: "#",
//     //     },
//     //     {
//     //       title: "Data Fetching",
//     //       url: "#",
//     //       isActive: true,
//     //     },
//     //     {
//     //       title: "Rendering",
//     //       url: "#",
//     //     },
//     //     {
//     //       title: "Caching",
//     //       url: "#",
//     //     },
//     //     {
//     //       title: "Styling",
//     //       url: "#",
//     //     },
//     //     {
//     //       title: "Optimizing",
//     //       url: "#",
//     //     },
//     //     {
//     //       title: "Configuring",
//     //       url: "#",
//     //     },
//     //     {
//     //       title: "Testing",
//     //       url: "#",
//     //     },
//     //     {
//     //       title: "Authentication",
//     //       url: "#",
//     //     },
//     //     {
//     //       title: "Deploying",
//     //       url: "#",
//     //     },
//     //     {
//     //       title: "Upgrading",
//     //       url: "#",
//     //     },
//     //     {
//     //       title: "Examples",
//     //       url: "#",
//     //     },
//     //   ],
//     // },
//     // {
//     //   title: "API Reference",
//     //   url: "#",
//     //   items: [
//     //     {
//     //       title: "Components",
//     //       url: "#",
//     //     },
//     //     {
//     //       title: "File Conventions",
//     //       url: "#",
//     //     },
//     //     {
//     //       title: "Functions",
//     //       url: "#",
//     //     },
//     //     {
//     //       title: "next.config.js Options",
//     //       url: "#",
//     //     },
//     //     {
//     //       title: "CLI",
//     //       url: "#",
//     //     },
//     //     {
//     //       title: "Edge Runtime",
//     //       url: "#",
//     //     },
//     //   ],
//     // },
//     // {
//     //   title: "Architecture",
//     //   url: "#",
//     //   items: [
//     //     {
//     //       title: "Accessibility",
//     //       url: "#",
//     //     },
//     //     {
//     //       title: "Fast Refresh",
//     //       url: "#",
//     //     },
//     //     {
//     //       title: "Next.js Compiler",
//     //       url: "#",
//     //     },
//     //     {
//     //       title: "Supported Browsers",
//     //       url: "#",
//     //     },
//     //     {
//     //       title: "Turbopack",
//     //       url: "#",
//     //     },
//     //   ],
//     // },
//   ],
// }

export function AppSidebar({ user, ...props }: { user: { role: string } & React.ComponentProps<typeof Sidebar>;
}) {

  let routes: Route[] = [];

  switch (user.role) {
    case Roles.ADMIN:
      routes = adminRoutes;
      break;
    case Roles.STUDENT:
      routes = studentRoutes;
      break;
    case Roles.TUTOR:
      routes = tutorRoutes;
      break;
  
    default:
      routes = [];
      break;
  }
  return (
    <Sidebar {...props}>
      {/* <SidebarHeader>
        <VersionSwitcher
          versions={data.versions}
          defaultVersion={data.versions[0]}
        />
        <SearchForm />
      </SidebarHeader> */}
      <SidebarContent>
        {/* We create a SidebarGroup for each parent. */}
        {routes.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild >
                      <Link href={item.url}>{item.title}</Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
