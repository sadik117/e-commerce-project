import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../authentication/AuthProvider";


export default function useUserRole() {
  const { user } = useContext(AuthContext);
  const [role, setRole] = useState(null);
  const [roleLoading, setRoleLoading] = useState(true);

  useEffect(() => {
    const fetchUserRole = async () => {
      if (!user?.email) {
        setRole(null);
        setRoleLoading(false);
        return;
      }

      try {
        setRoleLoading(true);
        // 🔥 Your backend API URL here
        const res = await axios.get(`http://localhost:3000/users/role/${user.email}`);
        setRole(res.data?.role || null);
      } catch (error) {
        console.error("Failed to fetch user role:", error);
        setRole(null);
      } finally {
        setRoleLoading(false);
      }
    };

    fetchUserRole();
  }, [user]);

  return { role, roleLoading };
}
