"use client";

import { SignedIn, SignOutButton, useAuth } from "@clerk/nextjs";
// import { OrganizationSwitcher } from "@clerk/nextjs";
// import { dark } from "@clerk/themes";
import Image from "next/image";
import Link from "next/link";
import { sidebarLinks } from "@/constants";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { set } from "mongoose";


const Topbar = () => {
  const pathname = usePathname();
  const router = useRouter();

  const { userId } = useAuth();

  const [isOverlayVisible, setOverlayVisible] = useState(false);

  const toggleOverlay = () => {
    setOverlayVisible(true);
  };

  useEffect(() => {
    setOverlayVisible(false);
  }, [pathname]);

  return (
    <div>
    <nav className='topbar'>
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"/>
      <div className="w-1/6 flex flow-row justify-start">
        <Link href='/' className='flex items-center gap-4'>
          {/* <Image src='/logo.svg' alt='logo' width={28} height={28} /> */}
          <p className='text-heading3-bold text-light-1 max-xs:hidden'>Poster</p>
        </Link>
      </div>
      <div className='flex w-full flex-1 justify-center flex-row gap-1 px-6'>
        {sidebarLinks.map((link) => {
          const isActive =
            (pathname.includes(link.route) && link.route.length > 1) ||
            pathname === link.route;

          if (link.route === "/profile") link.route = `${link.route}/${userId}`;

          return (
            <Link
              // href={link.label !== 'Post' ? link.route : ''}
              href={link.route}
              key={link.label}
              className={`scale-anim-90 menu_link ${isActive && "text-light-1"}`}
              onClick={toggleOverlay}
              // onClick={link.label === 'Post' ? toggleOverlay : undefined}

            >
              {/* <Image
                src={link.imgURL}
                alt={link.label}
                width={24}
                height={24}
              /> */}
              <span className="material-icons">{link.materialIcon}</span>

              <p className='max-lg:hidden'>{link.label}</p>
            </Link>
          );
        })}
      </div>

      <div className="w-1/6 flex flow-row justify-end">
        <div className='px-6'>
          <SignedIn>
            {/* <SignOutButton signOutCallback={() => router.push("/sign-in")}>
              <div className='scale-anim-90 menu_link hover:text-light-1 flex items-center cursor-pointer'>
                <span className="material-icons icon-small">
                  logout
                </span>

                <p className='max-lg:hidden'>Logout</p>
              </div>
            </SignOutButton> */}
          <button onClick={() => {window.location.href = `/profile/${userId}`;}}>
              <div className='scale-anim-90 menu_link hover:text-light-1 flex items-center cursor-pointer'>
                <span className="material-icons">
                  person
                </span>
                <p className='max-lg:hidden'>Profile</p>
              </div>
            </button>
          </SignedIn>
        </div>
        <div className='flex items-center gap-1'>
          <div className='block md:hidden'>
            <SignedIn>
              <SignOutButton>
                <div className='flex cursor-pointer'>
                  <Image
                    src='/assets/logout.svg'
                    alt='logout'
                    width={24}
                    height={24}
                  />
                </div>
              </SignOutButton>
            </SignedIn>
          </div>

          {/* <OrganizationSwitcher
            appearance={{
              baseTheme: dark,
              elements: {
                organizationSwitcherTrigger: "py-2 px-4",
              },
            }}
          /> */}
        </div>
      </div>

    </nav>
    {/* {isOverlayVisible && (
        <div className="popup-overlay z-50">
          <div className="overlay-content">
            <button onClick={toggleOverlay}>Close</button>
            <p>Overlay Content Here</p>
          </div>
        </div>
      )} */}
      {false && (
        <div className="popup-overlay z-50">
          <div className="overlay-content flex flex-col">
            <span className="material-icons icon-large text-dark-2 spin-anim">
              sync
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

export default Topbar;
