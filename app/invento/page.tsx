'use client'
import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Html5QrcodeScanner } from 'html5-qrcode';

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);


type ASSETS = {
    name: string,
    type: string,
    status: string,
    location: string
}
export default function AssetScanner() {
    const [scannedCode, setScannedCode] = useState('');
    const [asset, setAsset] = useState<ASSETS | null>(null);

    useEffect(() => {
        const scanner = new Html5QrcodeScanner('qr-reader', {
            fps: 10,
            qrbox: 600,
        });

        scanner.render(
            async (decodedText) => {
                setScannedCode(decodedText);
                // const { data, error } = await supabase
                //     .from('assets')
                //     .select('*')
                //     .eq('code', decodedText)
                //     .single();

                // if (error) console.error(error);
                // else setAsset(data);
            },
            // (error) => {
            //     console.warn('Scan error', error);
            // }
        );

        return () => scanner.clear();
    }, []);

    return (
        <div className="p-4">
            <h1 className="text-xl font-bold mb-4">Scan Tool / Asset</h1>

            <div id="qr-reader" className="mb-4 rounded-3" />

            <div className="container">
                1235
            </div>

            {scannedCode && (
                <p className="text-green-600">Scanned Code: {scannedCode}</p>
            )}

            {asset && (
                <div className="mt-4 border p-4 rounded shadow">
                    <h1>Scanned</h1>
                    {/* <p><strong>Name:</strong> {asset.name}</p>
                    <p><strong>Type:</strong> {asset.type}</p>
                    <p><strong>Status:</strong> {asset.status}</p>
                    <p><strong>Location:</strong> {asset.location}</p> */}
                </div>
            )}
        </div>
    );
}
