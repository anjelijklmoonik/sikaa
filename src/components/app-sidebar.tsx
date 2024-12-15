import {
  ChevronRight,
  ClipboardCheck,
  FileBadge,
  Home,
  LucideIcon,
  Moon,
  OctagonAlert,
  Scale,
  Sun,
  UserRound,
  Wallet,
} from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";
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
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "./ui/sidebar";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { useMemo } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";

export default function AppSidebar() {
  const { data: session } = useSession();
  const menus = useMemo(() => {
    if (session) return getMenus(session?.user.userId);
    else return [];
  }, [session]);
  return (
    <Sidebar variant="sidebar">
      <SidebarHeader>{/* <User /> */}</SidebarHeader>
      <SidebarContent>
        {menus.map((group, index) => (
          <SidebarGroup key={index}>
            <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item, index) =>
                  item.subMenus ? (
                    <Collapsible
                      key={index}
                      asChild
                      defaultOpen={item.isActive}
                      className="group/collapsible"
                    >
                      <SidebarMenuItem>
                        <CollapsibleTrigger asChild>
                          <SidebarMenuButton tooltip={item.title}>
                            {item.icon && <item.icon />}
                            <span>{item.title}</span>
                            <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                          </SidebarMenuButton>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <SidebarMenuSub>
                            {item.subMenus?.map((subItem) => (
                              <SidebarMenuSubItem key={subItem.title}>
                                <SidebarMenuSubButton asChild>
                                  <Link href={subItem.url}>
                                    <span>{subItem.title}</span>
                                  </Link>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            ))}
                          </SidebarMenuSub>
                        </CollapsibleContent>
                      </SidebarMenuItem>
                    </Collapsible>
                  ) : (
                    <SidebarMenuItem key={index}>
                      <SidebarMenuButton asChild>
                        <Link href={item.url}>
                          {item.icon && <item.icon />}
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )
                )}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      {/* <SidebarFooter>
        <DropdownMenu>
          <DropdownMenuTrigger asChild className="shadow-md w-full">
            <Button variant="outline" size="icon">
              <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuItem onClick={() => setTheme("light")}>
              Light
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("dark")}>
              Dark
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("system")}>
              System
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarFooter> */}
      {/* <SidebarRail /> */}
    </Sidebar>
  );
}

type Items = {
  title: string;
  url: string;
  icon?: LucideIcon;
  isActive?: boolean;
  subMenus?: Items[];
};

export type Menus = { title: string; items: Items[] }[];

const getMenus: (userId: string) => Menus = (userId) => [
  {
    title: "Menu",
    url: "",
    items: [
      {
        title: "Halaman Utama",
        url: "/home",
        icon: Home,
      },
      {
        title: "Profil",
        url: `/profil/${userId}`,
        icon: UserRound,
      },
      {
        title: "Keuangan",
        url: `/keuangan/${userId}`,
        icon: Wallet,
      },
      {
        title: "Nilai",
        url: `/nilai/${userId}`,
        icon: ClipboardCheck,
      },
      {
        title: "Pencapaian",
        url: `/pencapaian/${userId}`,
        icon: FileBadge,
      },
      {
        title: "Absen",
        url: `/absen/${userId}`,
        icon: OctagonAlert,
      },
      {
        title: "Aturan",
        url: `/aturan`,
        icon: Scale,
      },
    ],
  },
];
