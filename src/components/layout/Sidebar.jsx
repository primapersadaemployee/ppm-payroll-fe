import {
  CaretDown,
  Clock,
  CurrencyCircleDollar,
  Gear,
  Globe,
  HouseSimple,
  Note,
  Notification,
  Question,
  SidebarSimple,
  Users,
} from "phosphor-react";

import {
  Avatar,
  AvatarFallback,
  Sidebar,
  SidebarBody,
  SidebarFooter,
  SidebarItem,
  SidebarList,
  Dropdown,
  DropdownAction,
  DropdownContent,
  DropdownItem,
} from "keep-react";
import { Link, useLocation } from "react-router-dom";
import { BuildingOfficeIcon } from "@phosphor-icons/react";
import Logo from "/logo.png";
import { useState, useEffect } from "react";

export const SidebarComponent = () => {
  const [open, setIsOpen] = useState(false);
  const location = useLocation().pathname;

  useEffect(() => {
    const handleResize = () => {
      setIsOpen(window.innerWidth >= 1024);
    };

    // Set initial state based on screen size
    handleResize();

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Clean up event listener
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const sidebarMenus = [
    {
      name: "Beranda",
      link: "/dashboard",
      icon: <HouseSimple size={20} weight="bold" />,
    },
    {
      name: "Karyawan",
      link: "/employee",
      icon: <Users size={20} weight="bold" />,
    },
    {
      name: "Kehadiran",
      link: "/presence",
      icon: <Clock size={20} weight="bold" />,
    },
    {
      name: "Payroll",
      link: "/payroll",
      icon: <CurrencyCircleDollar size={20} weight="bold" />,
    },
    {
      name: "Pengumuman",
      link: "/announcement",
      icon: <Notification size={20} weight="bold" />,
    },
    {
      name: "Laporan",
      link: "/report",
      icon: <Note size={20} weight="bold" />,
    },
    {
      name: "Setting",
      link: "/setting",
      icon: <Gear size={20} weight="bold" />,
    },
    {
      name: "FAQ",
      link: "/faqs",
      icon: <Question size={20} weight="bold" />,
    },
  ];

  return (
    <>
      <Sidebar
        className={`${
          open
            ? "w-[60px] lg:w-[300px] px-1 lg:px-5 py-5"
            : "w-[50px] py-5 px-1"
        } h-[96dvh] bg-[#F5F5F5] transition-all duration-300 ease-in-out sticky top-3 z-50 lg:z-10 shrink-0`}
      >
        <SidebarBody>
          <div
            className={`${
              open ? "justify-between" : "justify-center"
            } flex items-center`}
          >
            {open && (
              <div className="flex gap-[6px] items-center">
                <img src={Logo} alt="Logo PPM" className="w-[40px] h-auto" />
                <h2 className="font-medium">PPM HR</h2>
              </div>
            )}
            <SidebarSimple
              className="cursor-pointer hover:scale-110 transition-all duration-300 ease-in-out hidden lg:block"
              size={20}
              color="#8897AE"
              weight="bold"
              onClick={() => setIsOpen(!open)}
            />
          </div>
          <hr />
          <SidebarList className="flex flex-col gap-1">
            {sidebarMenus.map((item) => (
              <Link key={item.name} to={item.link}>
                <SidebarItem
                  className={`${
                    location.startsWith(item.link)
                      ? "bg-primary text-white hover:bg-primary hover:text-white"
                      : "text-[#455468] hover:bg-primary hover:text-white"
                  }`}
                >
                  {item.icon}
                  {open && (
                    <span className="font-medium hidden lg:inline">
                      {item.name}
                    </span>
                  )}
                </SidebarItem>
              </Link>
            ))}
          </SidebarList>
        </SidebarBody>
        <div className="flex flex-col gap-2">
          {open && (
            <span className="text-[#8897AE] text-xs px-3 font-medium">
              USER
            </span>
          )}
          <SidebarList className="space-y-1">
            <SidebarItem className="text-[#455468] hover:bg-primary hover:text-white">
              <BuildingOfficeIcon size={20} weight="bold" />
              {open && (
                <span className="font-medium hidden lg:inline">PT PPM</span>
              )}
            </SidebarItem>
            <SidebarItem className="text-[#455468] hover:bg-primary hover:text-white">
              <Globe size={20} weight="bold" />
              {open && (
                <span className="font-medium hidden lg:inline">Indonesia</span>
              )}
            </SidebarItem>
          </SidebarList>
          <SidebarFooter>
            <Dropdown>
              <DropdownAction className="w-full">
                <div className="flex justify-between items-center w-full">
                  <div className="flex items-center gap-2">
                    <Avatar>
                      <AvatarFallback>KR</AvatarFallback>
                    </Avatar>
                    {open && (
                      <div className="hidden lg:block">
                        <p className="text-xs text-start font-medium text-[#455468]">
                          Dummy User
                        </p>
                        <p className="text-xs text-start font-normal line-clamp-1 text-[#8897AE]">
                          HR (Human Resources Development)
                        </p>
                      </div>
                    )}
                  </div>
                  {open && (
                    <CaretDown size={16} color="#455468" weight="bold" />
                  )}
                </div>
              </DropdownAction>
              <DropdownContent
                className={`${open ? "w-[200px]" : "w-[120px]"}`}
              >
                <DropdownItem>Profil</DropdownItem>
                <DropdownItem>Logout</DropdownItem>
              </DropdownContent>
            </Dropdown>
          </SidebarFooter>
        </div>
      </Sidebar>
    </>
  );
};
