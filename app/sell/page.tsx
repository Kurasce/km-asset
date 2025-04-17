"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function Sell() {
  const [data, set_data] = useState<object>([]);

  const fetchItems = async () => {
    const { data } = await supabase.from("assets").select("*");
    set_data(data || []);
  };

  useEffect(() => {
    fetchItems();
  }, []);
  return (
    <div className="container">
      <h1>Sell</h1>
      <div className="row-auto">
        <div className="col-end-1">
          <aside>
            <ul className="space-y-2">
              {data.map((item: any) => (
                <li
                  key={item.id}
                  className="flex justify-between items-center border-b pb-2"
                >
                  <span>{item.name}</span>
                  <span>{item.code}</span>
                  <span>{item.id}</span>
                  <button
                    onClick={() => deleteItem(item.id)}
                    className="text-red-500"
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          </aside>
        </div>
        <div className="col-span-2">1</div>
      </div>
    </div>
  );
}
