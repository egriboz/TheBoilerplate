"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Fragment, useState, useEffect } from "react";
import { Disclosure, Popover, Transition } from "@headlessui/react";
import { NavbarProps } from "@/utils/types";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import Container from "@/components/Container";
import LocaleSwitcher from "@/components/LocaleSwitcher";

export default function Navigation({ links }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (scrollY > 300) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const isEnPath = pathname.startsWith("/en/");

  return (
    <>
      <div className="lg:flex lg:justify-center">
        <div className="min-w-full">
          <Container>
            <nav
              className={`top-9 z-20 mx-auto flex items-center justify-between gap-48 rounded-lg transition-all duration-75 ease-in lg:px-4 ${
                isScrolled
                  ? "scrolled border  p-2"
                  : "border border-transparent p-4] "
              }`}
              aria-label="Global"
            >
              <div className="lg:flex-2 flex">
                <a href={isEnPath ? "/en" : "/tr"} className="-m-1.5 p-1.5 text-white">
                  <span className="sr-only">BRAND</span>
                  LOGOo
                </a>
              </div>
              <div className="flex lg:hidden">
                <button
                  type="button"
                  className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                  <span className="sr-only">Open main menu</span>
                  <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <Popover.Group className="hidden items-center lg:flex lg:gap-x-8">
                {links.map((menuItem) => (
                  <Popover key={menuItem.title} className="relative">
                    {({ open }) => (
                      <>
                        {menuItem.children ? (
                          <Popover.Button className="bg-gray-0 inline-flex w-full justify-center  rounded-md bg-opacity-20 px-0 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none ui-focus-visible:ring-2 ui-focus-visible:ring-offset-2">
                            {menuItem.title}
                            <ChevronDownIcon
                              className={
                                open
                                  ? "h-5 w-5 flex-none rotate-180 transform text-white"
                                  : "h-5 w-5 flex-none text-white"
                              }
                              aria-hidden="true"
                            />
                          </Popover.Button>
                        ) : (
                          <Link
                            href={menuItem.link}
                            target={menuItem.newtab ? "_blank" : "_self"}
                            rel={menuItem.newtab ? "noopener noreferrer" : ""}
                            className="text-sm font-semibold leading-6 text-white"
                          >
                            {menuItem.title}
                          </Link>
                        )}

                        {menuItem.children && (
                          <Transition
                            as={Fragment}
                            enter="transition ease-out duration-200"
                            enterFrom="opacity-0 translate-y-1"
                            enterTo="opacity-100 translate-y-0"
                            leave="transition ease-in duration-150"
                            leaveFrom="opacity-100 translate-y-0"
                            leaveTo="opacity-0 translate-y-1"
                          >
                            <Popover.Panel className="absolute left-1/2 z-10 mt-3 w-screen max-w-md -translate-x-1/2 transform px-2 sm:px-0">
                              <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-indigo-900 ring-opacity-5">
                                <div className="relative grid grid-cols-1 gap-6 bg-indigo-900 px-5 py-6 sm:gap-8 sm:p-4">
                                  {menuItem.children.map((submenuItem) => (
                                    <a
                                      key={submenuItem.title}
                                      href={submenuItem.link}
                                      target={menuItem.newtab ? "_blank" : "_self"}
                                      rel={menuItem.newtab ? "noopener noreferrer" : ""}
                                      className="group -m-3 flex items-start rounded-lg p-3 hover:bg-indigo-700"
                                    >
                                      <div className="ml-4">
                                        <p className="text-base font-medium text-white">
                                          {submenuItem.title}
                                        </p>
                                      </div>
                                    </a>
                                  ))}
                                </div>
                              </div>
                            </Popover.Panel>
                          </Transition>
                        )}
                      </>
                    )}
                  </Popover>
                ))}
              </Popover.Group>

              <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                <LocaleSwitcher />
              </div>
            </nav>
          </Container>
        </div>
        {/* mobile menu */}
        <section className="relative w-full">
          <Transition
            show={mobileMenuOpen}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="lg:hidden">
              <div className="space-y-1 bg-white px-4 pb-3 pt-2">
                {links.map((menuItem) => (
                  <div key={menuItem.title}>
                    {menuItem.children ? (
                      <Disclosure>
                        {({ open }) => (
                          <>
                            <Disclosure.Button className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900">
                              {menuItem.title}
                              <ChevronDownIcon
                                className={`${
                                  open ? "rotate-180 transform" : ""
                                } ml-1 h-5 w-5`}
                                aria-hidden="true"
                              />
                            </Disclosure.Button>
                            <Disclosure.Panel>
                              <div className="pl-4">
                                {menuItem.children?.map((submenuItem) => (
                                  <Link
                                    key={submenuItem.title}
                                    href={submenuItem.link}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                  >
                                    {submenuItem.title}
                                  </Link>
                                ))}
                              </div>
                            </Disclosure.Panel>
                          </>
                        )}
                      </Disclosure>
                    ) : (
                      <Link
                        href={menuItem.link}
                        onClick={() => setMobileMenuOpen(false)}
                        className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                      >
                        {menuItem.title}
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </Transition>
        </section>
        {/* mobile menu */}
      </div>
    </>
  );
}
