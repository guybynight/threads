"use client";
import { SignedIn, SignOutButton, useAuth } from "@clerk/nextjs";
// import { OrganizationSwitcher } from "@clerk/nextjs";
// import { dark } from "@clerk/themes";
import Image from "next/image";
import Link from "next/link";
import { sidebarLinks } from "@/constants";
import { usePathname, useRouter } from "next/navigation";


const Topbar = () => {
  const pathname = usePathname();
  const router = useRouter();

  const { userId } = useAuth();

  return (
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
              href={link.route}
              key={link.label}
              className={`scale-anim-90 menu_link ${isActive && "text-light-1"}`}
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
            <SignOutButton signOutCallback={() => router.push("/sign-in")}>
              <div className='flex cursor-pointer gap-4 p-4'>
                <Image
                  src='/assets/logout.svg'
                  alt='logout'
                  width={24}
                  height={24}
                />

                <p className='text-light-2 max-lg:hidden'>Logout</p>
              </div>
            </SignOutButton>
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
  );
}

export default Topbar;
