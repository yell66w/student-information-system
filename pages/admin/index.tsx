import { useSession } from "next-auth/react";
import React, { useEffect } from "react";

const Admin = () => {
  const { data: session } = useSession();
  return <div>Hello, {session?.user?.username} </div>;
};

export default Admin;
