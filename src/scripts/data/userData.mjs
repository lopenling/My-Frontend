export default function userData(role) {
  if (role === "admin") {
    return {
      name: "David Jones",
      email: "david.jones@example.com",
      initials: "DJ",
      imageUrl: "/images/avatars/admin.jpg",
    };
  } else {
    return {
      name: "Elizabeth Williams",
      email: "elizabeth.williams@example.com",
      initials: "EW",
      imageUrl: undefined,
    };
  }
}
