import { supabase } from "../utility/supabase";
import { User } from "../types/main.types";
import { useQuery } from "@tanstack/react-query";
import userQueryKeys from "@/helpers/queryKeys/user";

export const useUser = (): User | undefined => {
  const { data } = useQuery({
    queryKey: userQueryKeys.userInfo,
    queryFn: async () => {
      const { data: userData } = await supabase.auth.getUser();
      const { data } = await supabase
        .from("user")
        .select("*")
        .eq("email", userData?.user?.email);

      return data[0] as User;
    },
  });

  return data;
};
