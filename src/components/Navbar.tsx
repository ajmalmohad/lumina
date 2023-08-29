import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button, NavbarMenuToggle, NavbarMenu, NavbarMenuItem} from "@nextui-org/react";
import { useState } from "react";

export default function FullNavbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
  
    const menuItems = [
      "Profile",
      "Dashboard",
      "Activity",
      "Analytics",
      "System",
      "Deployments",
      "My Settings",
      "Team Settings",
      "Help & Feedback",
    ];
  
    return (
      <Navbar onMenuOpenChange={setIsMenuOpen}>
        <NavbarContent>
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="sm:hidden"
          />
          <NavbarBrand>
            <p className="font-bold text-inherit">Lumina</p>
          </NavbarBrand>
        </NavbarContent>
  
        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          <NavbarItem isActive>
            <Link href="#" className="text-white" aria-current="page">
              Dashboard
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link href="#">
              Settings
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link href="#">
              Block Explorer
            </Link>
          </NavbarItem>
        </NavbarContent>
        <NavbarContent justify="end">
          <NavbarItem className="hidden lg:flex">
            <Link href="#">Github</Link>
          </NavbarItem>
          <NavbarItem>
            <Button as={Link} color="primary" href="#" variant="flat">
              Donate
            </Button>
          </NavbarItem>
        </NavbarContent>
        <NavbarMenu>
          {menuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                className="w-full"
                href="#"
              >
                {item}
              </Link>
            </NavbarMenuItem>
          ))}
        </NavbarMenu>
      </Navbar>
    );
  }