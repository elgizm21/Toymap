// client/src/components/GuestView.jsx
import React, { useState, useMemo } from 'react';

export default function GuestView({ assignments, ads }) {
  // local state: searchTerm
  const [searchTerm, setSearchTerm] = useState('');

  // assignments: { guestName: tableId, ... }
  //  ➡️ transform to array of { guest, tableId }
  const assignmentList = useMemo(
    () => Object.entries(assignments).map(([guest, tableId]) => ({ guest, tableId })),
    [assignments]
  );

  // filter based on searchTerm (case‑insensitive, substring)
  const filtered = useMemo(() => {
    if (!searchTerm.trim()) return assignmentList;
    const term = searchTerm.trim().toLowerCase();
    return assignmentList.filter(a => a.guest.toLowerCase().includes(term));
  }, [searchTerm, assignmentList]);

  // group by tableId: { [tableId]: [guest1, guest2, ...], ... }
  const byTable = useMemo(() => {
    const map = {};
    filtered.forEach(({ guest, tableId }) => {
      if (!map[tableId]) map[tableId] = [];
      map[tableId].push(guest);
    });
    return map;
  }, [filtered]);

  return (
    <div className="p-4 max-w-xl mx-auto">
      {/* Başlıq */}
      <h1 className="text-3xl font-bold text-center mb-6">
        Ali və Aygün Toy Məclisinə Xoş Gəlmisiniz!
      </h1>

      {/* Axtarış qutusu */}
      <div className="mb-8">
        <input
          type="text"
          placeholder="Ad Soyad axtarın..."
          className="w-full border rounded px-3 py-2"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Masalar və qonaqlar */}
      <div className="space-y-6">
        {Object.keys(byTable).length === 0 ? (
          <p className="text-center text-gray-500">Heç bir nəticə tapılmadı.</p>
        ) : (
          Object.entries(byTable).map(([tableId, guests]) => (
            <div key={tableId} className="border rounded p-4">
              <h2 className="font-semibold mb-2">Masa {tableId}</h2>
              <ul className="list-disc list-inside">
                {guests.map(guest => (
                  <li key={guest}>{guest}</li>
                ))}
              </ul>
            </div>
          ))
        )}
      </div>

      {/* Reklamlar */}
      {ads.length > 0 && (
        <div className="mt-12 space-y-4">
          {ads.map(ad => (
            <a
              key={ad.id}
              href={ad.link || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-center"
            >
              {ad.imageUrl && (
                <img src={ad.imageUrl} alt={ad.title} className="mx-auto mb-2 max-h-32" />
              )}
              <span className="text-blue-600 hover:underline">{ad.title}</span>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
