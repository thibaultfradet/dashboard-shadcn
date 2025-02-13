"use client";

import * as React from "react";
import { BarChart, Home, Map, PlusCircle, User } from "lucide-react";

import { NavUser } from "@/src/lib/components/nav-user";
import { TeamSwitcher } from "@/src/lib/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarTrigger,
} from "@/src/lib/components/ui/sidebar";
import { ModeToggle } from "./mode-toggle";

const data = {
  user: {
    name: "Tibo",
    email: "fradet.thibault23@gmail.com",
    // avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Tibo",
      logo: User,
      plan: "Administrateur",
    },
  ],
  navMain: [
    {
      title: "Home",
      url: "/",
      icon: Home,
    },
    {
      title: "Statistiques",
      url: "/statistiques",
      icon: BarChart,
    },
    {
      title: "Projets",
      url: "/projets",
      icon: Map,
    },
    {
      title: "Statuts",
      url: "/statuts",
      icon: PlusCircle,
    },
  ],
  // projects: [
  //   {
  //     title: "Playground",
  //     url: "#",
  //     icon: Home,
  //     isActive: true,
  //     items: [
  //       {
  //         title: "History",
  //         url: "#",
  //       },
  //       {
  //         title: "Starred",
  //         url: "#",
  //       },
  //       {
  //         title: "Settings",
  //         url: "#",
  //       },
  //     ],
  //   },
  //   {
  //     title: "Models",
  //     url: "#",
  //     icon: Home,
  //     items: [
  //       {
  //         title: "Genesis",
  //         url: "#",
  //       },
  //       {
  //         title: "Explorer",
  //         url: "#",
  //       },
  //       {
  //         title: "Quantum",
  //         url: "#",
  //       },
  //     ],
  //   },
  //   {
  //     title: "Documentation",
  //     url: "#",
  //     icon: Home,
  //     items: [
  //       {
  //         title: "Introduction",
  //         url: "#",
  //       },
  //       {
  //         title: "Get Started",
  //         url: "#",
  //       },
  //       {
  //         title: "Tutorials",
  //         url: "#",
  //       },
  //       {
  //         title: "Changelog",
  //         url: "#",
  //       },
  //     ],
  //   },
  //   {
  //     title: "Settings",
  //     url: "#",
  //     icon: Home,
  //     items: [
  //       {
  //         title: "General",
  //         url: "#",
  //       },
  //       {
  //         title: "Team",
  //         url: "#",
  //       },
  //       {
  //         title: "Billing",
  //         url: "#",
  //       },
  //       {
  //         title: "Limits",
  //         url: "#",
  //       },
  //     ],
  //   },
  // ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {data.navMain.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon className="mr-2 w-5 h-5" />
                      {item.title}
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      {/* <SidebarContent>
        <NavMain items={data.navMain} />
        {/* <NavProjects projects={data.projects} /> */}
      {/* </SidebarContent> */}
      <div className="flex flex-wrap items-center justify-center">
        <SidebarTrigger />
        <ModeToggle />
      </div>

      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
