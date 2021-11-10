/* This example requires Tailwind CSS v2.0+ */
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/solid'
import {

    UserCircleIcon,


} from '@heroicons/react/solid';
import Link from "next/link";
import {useRouter} from "next/router";
import Cookies from "js-cookie";

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}
const navMenu = [
    {  
        href: "/tenant/listVenue",
        title: "List Venue",
    },
    {
      href: "/tenant/profile/persolnalInformation",
      title: "Account Setting",
    },
    {
      href: "/tenant/transaksi",
      title: "Transaction",
    },
  ];
export default function Dropdown({childern}) {
    const router = useRouter();
    const logoutHandler = () =>{
        Cookies.remove("jwt", { path: "" });
        router.push({
            pathname: "/tenant/login"
        })
    }
  return (
    <Menu as="div" className="relative inline-block text-left outline-none">
      <div>
        <Menu.Button className="outline-none inline-flex justify-center w-full rounded-md border border-gray-300 px-4 py-2 bg-white text-sm font-medium">
         {childern}
         <UserCircleIcon className="h-6" />
          <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
              {
                  navMenu.map(menu =>(
                    <Menu.Item>
                    {({ active }) => (
                        <Link href={menu.href}>
                            <a
                            href="#"
                            className={classNames(
                                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                'block px-4 py-2 text-sm'
                            )}
                            >
                                {menu.title}
                            </a>
                        </Link>
                    )}
                    </Menu.Item>
                  ))
                  
              }
                    <Menu.Item>
                    {({ active }) => (
                        <div onClick={logoutHandler}>
                            <a
                            href="#"
                            className={classNames(
                                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                'block px-4 py-2 text-sm'
                            )}
                            >
                                Logout
                            </a>
                        </div>
                    )}
                    </Menu.Item>              
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}