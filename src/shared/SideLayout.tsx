import { AvatarImage } from "@/components/ui/avatar"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { menuItem } from "@/utils/dummy"
import { Avatar } from "@radix-ui/react-avatar"



const SideLayout = () => {

  const route = window.location.pathname;

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <Avatar className="flex justify-center items-center my-4 flex-col">
            <AvatarImage src="https://avatars.githubusercontent.com/u/70505132?v=4" className="w-[80px] h-[80px] rounded-full"/>
            <p className="mt-3 text-2xl font-semibold">Admin</p>
          </Avatar>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItem.map((item) => (
                <SidebarMenuItem key={item.text}>
                  <SidebarMenuButton asChild isActive={route === item.route ? true:false}>
                    <a href={item.route} className="my-1 py-[25px]">
                        <img src={item.icon} alt="itemIcon" className="w-[25px] h-[25px] mr-3"/>
                        <span>{item.text}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}

export default SideLayout
