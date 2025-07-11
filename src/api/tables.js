const BASE = 'http://localhost:4000/api/tables'

export async function getTables() {
  const res = await fetch(BASE)
  return res.json()
}

export async function createTable(table) {
  const res = await fetch(BASE, {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify(table)
  })
  return res.json()
}

export async function updateTable(id, updates) {
  const res = await fetch(`${BASE}/${id}`, {
    method: 'PUT',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify(updates)
  })
  return res.json()
}

export async function deleteTable(id) {
  await fetch(`${BASE}/${id}`, { method: 'DELETE' })
}
