import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs";

import UserCard from "@/components/cards/UserCard";
import Searchbar from "@/components/shared/Searchbar";
import Pagination from "@/components/shared/Pagination";
import ThreadCard from "@/components/cards/ThreadCard";

import { fetchUser, fetchUsers } from "@/lib/actions/user.actions";

async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect("/onboarding");

  const result = await fetchUsers({
    userId: user.id,
    searchString: searchParams.q,
    pageNumber: searchParams?.page ? + searchParams.page : 1,
    pageSize: 25,
  });

  return (
  <section className="flex flex-col items-center justify-center w-full">
    <div className="w-full max-w-screen-sm">
        {/* <h1 className='head-text mb-10'>Search</h1> */}

        <Searchbar routeType='search' />

        <div className='mt-14 flex flex-col gap-9'>
          {result.users.length === 0 ? (
            <p className='no-result'>No Result</p>
          ) : (
            <>
              {result.users.map((person) => (
                <UserCard
                  key={person.id}
                  id={person.id}
                  name={person.name}
                  username={person.username}
                  imgUrl={person.image}
                  personType='User'
                />
              ))}
            </>
          )}
        </div>

        <Pagination
          path='search'
          pageNumber={searchParams?.page ? +searchParams.page : 1}
          isNext={result.isNext}
        />
        
      </div>
    </section>
  );
}

export default Page;
