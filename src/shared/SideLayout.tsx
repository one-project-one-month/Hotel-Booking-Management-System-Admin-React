import { AvatarImage } from "@/components/ui/avatar"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { menuItem } from "@/utils/dummy/dummy.ts"
import { Avatar } from "@radix-ui/react-avatar"



const SideLayout = () => {

  const route = window.location.pathname;
  const {open} = useSidebar()

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          {
            open && (
               <Avatar className="flex justify-center items-center my-4 flex-col">
                <AvatarImage src="https://avatars.githubusercontent.com/u/70505132?v=4" className="w-[80px] h-[80px] rounded-full"/>
                <p className="mt-3 text-2xl font-semibold">Admin</p>
              </Avatar>
            )
          }
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItem.map((item) => (
                <SidebarMenuItem key={item.text}>
                  <SidebarMenuButton asChild isActive={route === item.route ? true:false}>
                    <a href={item.route} className="my-1 py-[25px]">
                        <img src={item.icon} alt="itemIcon" className="w-[20px] h-[20px] mr-3"/>
                        {
                          open && (
                            <span>{item.text}</span>
                          )
                        }
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
