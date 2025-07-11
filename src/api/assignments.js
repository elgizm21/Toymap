const BASE = 'http://localhost:4000/api/assignments'

export async function getAssignments() {
  const res = await fetch(BASE)
  return res.json()
}

export async function assignGuest(guest, tableId) {
  const res = await fetch(BASE, {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify({ guest, tableId })
  })
  return res.json()
}

export async function deleteAssignment(guest) {
  await fetch(`${BASE}/${guest}`, { method: 'DELETE' })
}
