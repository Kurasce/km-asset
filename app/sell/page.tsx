"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import type { KM_ITEM } from '@/lib/km_supabase'

export default function Sell() {
  const [data, set_data] = useState<KM_ITEM[] | []>([]);

  const fetchItems = async () => {
    const { data } = await supabase.from("assets").select("*");
    set_data(data || []);
  };

  const deleteItem = async (id: string) => {
    await supabase.from('assets').delete().eq('id', id)
    fetchItems()
  }

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
              {data.map((item) => (
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
