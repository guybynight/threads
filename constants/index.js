export const sidebarLinks = [
  {
    materialIcon: "home",
    imgURL: "/assets/home.svg",
    route: "/",
    label: "Home",
  },
  {
    materialIcon: "search",
    imgURL: "/assets/search.svg",
    route: "/search",
    label: "Search",
  },
  {
    materialIcon: "favorite",
    imgURL: "/assets/heart.svg",
    route: "/activity",
    label: "Activity",
  },
  {
    materialIcon: "edit_square",
    imgURL: "/assets/create.svg",
    route: "/create-thread",
    label: "Post",
  },
  // {
  //   materialIcon: "group",
  //   imgURL: "/assets/community.svg",
  //   route: "/communities",
  //   label: "Communities",
  // },
  {
    materialIcon: "person",
    imgURL: "/assets/user.svg",
    route: "/profile",
    label: "Profile",
  },
];

export const profileTabs = [
  { value: "posts", label: "Posts", icon: "/assets/reply.svg",  materialIcon: "edit_square",},
  { value: "replies", label: "Replies", icon: "/assets/members.svg", materialIcon: "group",},
  // { value: "tagged", label: "Tagged", icon: "/assets/tag.svg" },
];

export const communityTabs = [
  { value: "threads", label: "Threads", icon: "/assets/reply.svg" },
  { value: "members", label: "Members", icon: "/assets/members.svg" },
  { value: "requests", label: "Requests", icon: "/assets/request.svg" },
];
