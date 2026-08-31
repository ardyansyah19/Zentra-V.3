import { useEffect, useState } from 'react';
import api from '../lib/api';
import Topbar from '../components/Topbar';

export default function Customers() {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    api.get('/users').then(({ data }) => setCustomers(data));
  }, []);

  return (
    <div>
      <Topbar title="Pelanggan" subtitle={`${customers.length} pelanggan terdaftar`} />
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {customers.map((c) => (
          <div key={c.id} className="card p-4 flex items-center gap-3">
            <img src={c.avatar} className="w-12 h-12 rounded-full object-cover" alt="" />
            <div className="min-w-0">
              <p className="font-semibold text-navy-900 truncate">{c.name}</p>
              <p className="text-xs text-plum-500 truncate">{c.email}</p>
              <p className="text-xs text-plum-400 mt-0.5">{c.phone || 'Tanpa nomor telepon'}</p>
            </div>
          </div>
        ))}
        {customers.length === 0 && <p className="text-plum-500 text-sm col-span-full text-center py-10">Belum ada pelanggan terdaftar.</p>}
      </div>
    </div>
  );
}
