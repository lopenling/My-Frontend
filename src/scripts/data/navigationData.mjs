export default function navigationData(currentPath) {
  return [
    {
      name: "Placeholder",
      href: "/dashboard",
      get current() {
        return this.href == currentPath ? true : false;
      },
    },
    {
      name: "Navigation",
      href: "/page-2",
      get current() {
        return this.href == currentPath ? true : false;
      },
    },
    {
      name: "Items",
      href: "/page-3",
      get current() {
        return this.href == currentPath ? true : false;
      },
    },
  ];
}
