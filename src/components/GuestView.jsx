import React, { useState } from "react";

export default function GuestView({ assignments, ads }) {
  const [name, setName] = useState("");
  const [foundTable, setFoundTable] = useState(null);

  const handleFind = () => {
    const key = name.trim();
    if (!key) return;
    if (assignments[key]) {
      setFoundTable(assignments[key]);
    } else {
      setFoundTable("not-found");
    }
  };

  return (
    <div className="flex flex-col flex-1">
      {/* Header */}
      <header className="bg-rose-100 py-8">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h1 className="text-5xl font-serif text-rose-800">
            Ali və Aygün Toy Məclisinə Xoş Gəlmisiniz!
          </h1>
          <p className="mt-2 text-gray-700">
            Tarix: 11 iyul 2025 &nbsp;|&nbsp; Əlaqə: +994 50 123 45 67
          </p>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 py-12">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 px-4">
          {/* A) Masanı tapın */}
          <section>
            <h2 className="text-4xl font-serif text-rose-800 mb-2">
              Masanızı Tapın
            </h2>
            <p className="text-gray-700 mb-6">
              Zəhmət olmasa adınızı və soyadınızı daxil edin.
            </p>

            <div className="space-y-4">
              <input
                type="text"
                className="w-full border border-rose-300 bg-white px-4 py-3 rounded focus:outline-none focus:ring-2 focus:ring-rose-200"
                placeholder="Ad Soyad"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleFind()}
              />
              <button
                className="w-full bg-rose-600 text-white py-3 rounded hover:bg-rose-700 transition"
                onClick={handleFind}
              >
                Masanı Tap
              </button>
            </div>

            {/* Nəticə */}
            {foundTable === "not-found" && (
              <p className="mt-4 text-red-600 font-medium">
                Ad tapılmadı, zəhmət olmasa dəqiqləşdirin.
              </p>
            )}
            {foundTable && foundTable !== "not-found" && (
              <p className="mt-4 text-green-700 font-semibold text-xl">
                Sizin masanız:{" "}
                <span className="underline">{foundTable}</span>
              </p>
            )}
          </section>

          {/* B) Reklamlar */}
          <aside>
            <div className="bg-white rounded-lg shadow-lg p-6">
              {ads.length > 0 ? (
                ads.map((ad, i) => (
                  <div key={i} className={i > 0 ? "mt-8" : ""}>
                    <h3 className="text-2xl font-serif text-rose-800 mb-2">
                      {ad.title}
                    </h3>
                    {ad.imageUrl && (
                      <img
                        src={ad.imageUrl}
                        alt={ad.title}
                        className="w-full h-40 object-cover rounded mb-4"
                      />
                    )}
                    <p className="text-gray-700 mb-2">{ad.description}</p>
                    <p className="text-gray-900 font-medium">{ad.contact}</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">Reklam tapılmadı.</p>
              )}
            </div>
          </aside>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-4">
        <div className="max-w-4xl mx-auto text-center px-4">
          <p>
            Əlaqə: +994 50 123 45 67 &nbsp;|&nbsp; @ToyMəclisiBaku
          </p>
          <p className="text-sm opacity-75">Təşəkkür edirik!</p>
        </div>
      </footer>
    </div>
  );
}
