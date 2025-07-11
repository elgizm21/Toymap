// client/src/components/AdminPanel.jsx
import React, { useState, useEffect } from 'react';

// Kart komponenti: başlıq + qolonu əhatə edir
function Card({ title, children }) {
  return (
    <section className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
      <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
        {title}
      </h2>
      {children}
    </section>
  );
}

export default function AdminPanel({
  tables, setTables,
  assignments, setAssignments,
  ads, setAds
}) {
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState('');

  // yeni masa üçün
  const [newTable, setNewTable]         = useState({ id: '', x: 0, y: 0 });
  // yeni tə’yinat üçün
  const [guestName, setGuestName]       = useState('');
  const [guestTable, setGuestTable]     = useState('');
  // yeni reklam üçün
  const [newAd, setNewAd] = useState({
    id: '',
    title: '',
    imageUrl: '',
    description: '',
    contact: ''
  });

  // 1) İlkin yükləmə: tables, assignments, ads
  useEffect(() => {
    async function loadAll() {
      try {
        setLoading(true);
        setError('');
        const [t, a, r] = await Promise.all([
          fetch('/api/tables').then(res => res.json()),
          fetch('/api/assignments').then(res => res.json()),
          fetch('/api/ads').then(res => res.json())
        ]);
        setTables(t);
        setAssignments(a);
        setAds(r);
      } catch {
        setError('Məlumat yüklənərkən xəta baş verdi.');
      } finally {
        setLoading(false);
      }
    }
    loadAll();
  }, [setTables, setAssignments, setAds]);

  // — Masa idarəsi funksiyaları (əvvəlki kimi) —
  const handleAddTable = async () => {
    if (!newTable.id.trim()) return;
    const created = await fetch('/api/tables', {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify(newTable)
    }).then(r => r.json());
    setTables(prev => [...prev, created]);
    setNewTable({ id: '', x: 0, y: 0 });
  };
  const handleDeleteTable = async id => {
    if (!confirm(`Masa "${id}" silinsin?`)) return;
    await fetch(`/api/tables/${id}`, { method:'DELETE' });
    setTables(prev => prev.filter(t => t.id !== id));
    const fresh = await fetch('/api/assignments').then(r=>r.json());
    setAssignments(fresh);
  };

  // — Qonaq tə’yinatı funksiyaları —
  const handleAddAssignment = async () => {
    if (!guestName.trim()||!guestTable) return;
    const created = await fetch('/api/assignments', {
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({guest:guestName.trim(),tableId:guestTable})
    }).then(r=>r.json());
    setAssignments(prev=>({...prev,...created}));
    setGuestName(''); setGuestTable('');
  };
  const handleDeleteAssignment = async guest => {
    if (!confirm(`"${guest}" tə’yinatını silmək istədiyinizə əminsiniz?`)) return;
    await fetch(`/api/assignments/${guest}`, { method:'DELETE' });
    setAssignments(prev=>{
      const c = { ...prev };
      delete c[guest];
      return c;
    });
  };

  // — Reklam idarəsi funksiyaları —
  const handleAddAd = async () => {
    if (!newAd.id.trim() || !newAd.title.trim()) return;
    const created = await fetch('/api/ads', {
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify(newAd)
    }).then(r=>r.json());
    setAds(prev=>[...prev, created]);
    setNewAd({ id:'',title:'',imageUrl:'',description:'',contact:'' });
  };
  const handleDeleteAd = async id => {
    if (!confirm(`Reklam "${id}" silinsin?`)) return;
    await fetch(`/api/ads/${id}`,{ method:'DELETE' });
    setAds(prev=>prev.filter(ad=>ad.id!==id));
  };

  if (loading) return <p className="p-6">Yüklənir…</p>;
  if (error)   return <p className="p-6 text-red-600">{error}</p>;

  return (
    <div className="max-w-7xl mx-auto p-6 grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* 1) Masa İdarəsi */}
      <Card title="Masa İdarəsi">
        <ul className="space-y-2 mb-4">
          {tables.map(t => (
            <li key={t.id} className="flex items-center justify-between p-3 border rounded hover:shadow">
              <span className="text-gray-800 dark:text-gray-200">
                <strong>{t.id}</strong> — x: {t.x}, y: {t.y}
              </span>
              <button className="text-red-600 hover:underline" onClick={()=>handleDeleteTable(t.id)}>
                Sil
              </button>
            </li>
          ))}
          {tables.length===0 && <li className="text-gray-500">Heç bir masa yoxdur.</li>}
        </ul>
        <div className="flex flex-wrap gap-2">
          <input
            className="border px-3 py-2 rounded flex-1"
            placeholder="ID"
            value={newTable.id}
            onChange={e=>setNewTable({...newTable,id:e.target.value})}
          />
          <input
            type="number"
            className="border px-3 py-2 rounded w-24"
            placeholder="X"
            value={newTable.x}
            onChange={e=>setNewTable({...newTable,x:+e.target.value})}
          />
          <input
            type="number"
            className="border px-3 py-2 rounded w-24"
            placeholder="Y"
            value={newTable.y}
            onChange={e=>setNewTable({...newTable,y:+e.target.value})}
          />
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
            onClick={handleAddTable}
            disabled={!newTable.id.trim()}
          >
            Əlavə et
          </button>
        </div>
      </Card>

      {/* 2) Qonaq Təyinatı */}
      <Card title="Qonaq Təyinatı">
        <ul className="space-y-2 mb-4">
          {Object.entries(assignments).map(([guest,table])=>(
            <li key={guest} className="flex items-center justify-between p-3 border rounded hover:shadow">
              <span className="text-gray-800 dark:text-gray-200">
                {guest} → Masa {table}
              </span>
              <button className="text-red-600 hover:underline" onClick={()=>handleDeleteAssignment(guest)}>
                Sil
              </button>
            </li>
          ))}
          {Object.keys(assignments).length===0 && (
            <li className="text-gray-500">Heç bir tə’yinat yoxdur.</li>
          )}
        </ul>
        <div className="flex flex-wrap gap-2">
          <input
            className="border px-3 py-2 rounded flex-1"
            placeholder="Ad Soyad"
            value={guestName}
            onChange={e=>setGuestName(e.target.value)}
          />
          <select
            className="border px-3 py-2 rounded w-32"
            value={guestTable}
            onChange={e=>setGuestTable(e.target.value)}
          >
            <option value="">Masa seç</option>
            {tables.map(t=>(
              <option key={t.id} value={t.id}>{t.id}</option>
            ))}
          </select>
          <button
            className="bg-green-600 text-white px-4 py-2 rounded disabled:opacity-50"
            onClick={handleAddAssignment}
            disabled={!guestName.trim()||!guestTable}
          >
            Təyin et
          </button>
        </div>
      </Card>

      {/* 3) Reklamlar */}
      <Card title="Reklamlar">
        <ul className="space-y-2 mb-4">
          {ads.map(ad=>(
            <li key={ad.id} className="p-3 border rounded hover:shadow flex justify-between">
              <div>
                <strong>{ad.title}</strong><br/>
                <small className="text-gray-600">{ad.contact}</small>
              </div>
              <button className="text-red-600 hover:underline" onClick={()=>handleDeleteAd(ad.id)}>
                Sil
              </button>
            </li>
          ))}
          {ads.length===0 && <li className="text-gray-500">Heç bir reklam yoxdur.</li>}
        </ul>
        <div className="space-y-2">
          <input
            className="border px-3 py-2 rounded w-full"
            placeholder="ID"
            value={newAd.id}
            onChange={e=>setNewAd({...newAd,id:e.target.value})}
          />
          <input
            className="border px-3 py-2 rounded w-full"
            placeholder="Başlıq"
            value={newAd.title}
            onChange={e=>setNewAd({...newAd,title:e.target.value})}
          />
          <input
            className="border px-3 py-2 rounded w-full"
            placeholder="Şəkil URL"
            value={newAd.imageUrl}
            onChange={e=>setNewAd({...newAd,imageUrl:e.target.value})}
          />
          <textarea
            className="border px-3 py-2 rounded w-full"
            placeholder="Təsvir"
            rows={2}
            value={newAd.description}
            onChange={e=>setNewAd({...newAd,description:e.target.value})}
          />
          <input
            className="border px-3 py-2 rounded w-full"
            placeholder="Əlaqə"
            value={newAd.contact}
            onChange={e=>setNewAd({...newAd,contact:e.target.value})}
          />
          <button
            className="bg-purple-600 text-white px-4 py-2 rounded w-full disabled:opacity-50"
            onClick={handleAddAd}
            disabled={!newAd.id.trim()||!newAd.title.trim()}
          >
            Əlavə et
          </button>
        </div>
      </Card>
    </div>
  );
}
