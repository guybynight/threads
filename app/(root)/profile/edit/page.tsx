import { SignedIn, SignOutButton, useAuth } from "@clerk/nextjs";

import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { fetchUser } from "@/lib/actions/user.actions";
import AccountProfile from "@/components/forms/AccountProfile";

// Copy paste most of the code as it is from the /onboarding

async function Page() {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect("/onboarding");

  const userData = {
    id: user.id,
    objectId: userInfo?._id,
    username: userInfo ? userInfo?.username : user.username,
    name: userInfo ? userInfo?.name : user.firstName ?? "",
    bio: userInfo ? userInfo?.bio : "",
    image: userInfo ? userInfo?.image : user.imageUrl,
  };

  return (
    <>
      <h1 className='head-text'>Edit Profile</h1>
      {/* <p className='mt-3 text-base-regular text-light-2'>Make any changes</p> */}

      <section className='mt-12'>
        <AccountProfile user={userData} btnTitle='Save' />
        <SignedIn>
              <SignOutButton>
                  <div className='mt-8 btn-secondary w-fit text-light-1'>
                    <span className="material-icons">
                      logout
                    </span>
                    <p className='max-lg:hidden'>Sing out</p>
                  </div>
              </SignOutButton>
        </SignedIn>
      </section>
    </>
  );
}

export default Page;
