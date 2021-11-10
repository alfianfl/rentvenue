import React from "react";
import Link from "next/link";
import { useRouter } from "next/dist/client/router";

const navMenu = [
  {
    href: "/tenant/profile/accountProfile",
    title: "Account Profile",
  },
  {
    href: "/tenant/profile/persolnalInformation",
    title: "Personal Information",
  },
  // {
  //   href: "/tenant/profile/passwordManagement",
  //   title: "Password Management",
  // },
];
function SidebarProfile() {
  const {route} = useRouter();

  return (
    <div className="sidebar-profile">
      <ul>
        {navMenu.map((menu, index) => (
          <li key={index} className="cursor-pointer mt-6">
            <a className={route===menu.href ? `active` : 'inactive' }>
              {" "}
              <Link href={menu.href}>{menu.title}</Link>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SidebarProfile;
