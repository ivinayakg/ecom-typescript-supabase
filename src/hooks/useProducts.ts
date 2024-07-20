import { useEffect, useState } from "react";
import { Product } from "../types/main.types";
import { supabase } from "../utility/supabase";
import productQueryKeys from "@/helpers/queryKeys/product";
import { useQuery } from "@tanstack/react-query";

const useProdcuts = (): Product[] => {
  const { data: products } = useQuery({
    queryKey: productQueryKeys.products,
    queryFn: async () => {
      const { data: products } = await supabase.from("products").select("*");
      return products;
    },
  });
  return products;
};

export default useProdcuts;
