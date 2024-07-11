import { useEffect, useState } from "react";
import { supabase } from "../utility/supabase";
import { User } from "../types/main.types";

export const useUser = (): User | null => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    (async () => {
      const { data: userData } = await supabase.auth.getUser();
      const { data } = await supabase
        .from("user")
        .select("*")
        .eq("email", userData?.user?.email);

      setUser(data[0]);
    })();
  }, []);

  return user;
};
