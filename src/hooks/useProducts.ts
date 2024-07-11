import { useEffect, useState } from "react";
import { Product } from "../types/main.types";
import { supabase } from "../utility/supabase";

const useProdcuts = (): Product[] => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    (async () => {
      let { data: products } = await supabase.from("products").select("*");

      setProducts(products);
    })();
  }, []);

  return products;
};

export default useProdcuts;
