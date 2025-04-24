'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'

// type SbItems = object[]
import type { KM_ITEM } from '@/lib/km_supabase'

export default function Page() {
    const [items, set_items] = useState<KM_ITEM[]>([])

    const [newItem, set_newItem] = useState('')
    const [newItemCode, set_newItemCode] = useState('')

    const fetchItems = async () => {
        const { data } = await supabase.from('assets').select('*')
        // .order('create_at', { ascending: false })
        console.log({ data })
        set_items(data || [])
    }
    const addItem = async () => {
        if (newItem.trim()) {
            await supabase.from('assets').insert({ name: newItem, code: newItemCode })
            set_newItem('')
            fetchItems()
        }
    }
    const deleteItem = async (id: string) => {
        await supabase.from('assets').delete().eq('id', id)
        fetchItems()
    }

    useEffect(() => {
        fetchItems()
    }, [])

    return (
        <div className="p-6 max-w-xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">Supabase CRUD</h1>

            <div className="flex gap-2 mb-4">
                <input
                    type="text"
                    value={newItem}
                    onChange={e => set_newItem(e.target.value)}
                    className="border px-2 py-1 w-full"
                    placeholder="New item name"
                />
                <input
                    type="text"
                    value={newItemCode}
                    onChange={e => set_newItemCode(e.target.value)}
                    className="border px-2 py-1 w-full"
                    placeholder="New item name"
                />
                <button onClick={addItem} className="bg-blue-500 text-white px-4 py-1 rounded">
                    Add
                </button>
            </div>


            <ul className="space-y-2">
                <li className="flex justify-between items-center border-b pb-2 text-blue-700 font-bold text-center">
                    <span>Item Name</span>
                    <span>Code</span>
                    <span>KM ID</span>
                    <span>Action</span>
                </li>
            </ul>
            <ul className="space-y-2">
                {items.map((item) => (
                    <li key={item.id} className="flex justify-between items-center border-b pb-2  text-center">
                        <span>{item.name}</span>
                        <span>{item.code}</span>
                        <span>{item.km_id}</span>
                        <button onClick={() => deleteItem(item.id)} className="text-red-500 font-extralight text-xs">Delete</button>
                    </li>
                ))}
            </ul>


        </div>
    )
}
