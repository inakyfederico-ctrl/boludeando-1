// Helper simple para hablar con nuestro backend (server.js).
// Como el frontend y el backend se sirven desde el mismo dominio en Render,
// no hace falta configurar una URL base: alcanza con rutas relativas "/api/...".

export type CharacterPayload = {
  name: string;
  age: string;
  background: string;
  appearance: string;
  selectedEyes: string[];
  selectedDefects: string[];
  selectedAuras: string[];
  selectedCompanion: string | null;
  abilityScores: Record<string, number>;
  skillProficiencies: Record<string, string>;
  saveProficiencies: Record<string, boolean>;
  hp: number;
  ac: number;
  speed: number;
  attacks: { id: string; name: string; bonus: string; damage: string }[];
};

export type Character = CharacterPayload & {
  _id: string;
  campaignCode: string;
  createdAt: string;
  updatedAt: string;
};

// Solo la respuesta de "crear personaje" trae el secretCode (una única vez)
export type CharacterWithSecret = Character & { secretCode: string };

// Credenciales que se mandan para poder editar o borrar un personaje:
// o el código secreto propio del personaje, o la contraseña de administrador.
export type Credentials = {
  secretCode?: string;
  adminPassword?: string;
};

export type Campaign = {
  _id: string;
  code: string;
  name: string;
};

async function handleResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || `Error ${res.status}`);
  }
  // DELETE devuelve 204 sin body
  if (res.status === 204) return undefined as unknown as T;
  return res.json();
}

// --- Campañas ---

export async function crearCampania(name?: string): Promise<Campaign> {
  const res = await fetch('/api/campaigns', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name }),
  });
  return handleResponse<Campaign>(res);
}

export async function buscarCampania(code: string): Promise<Campaign> {
  const res = await fetch(`/api/campaigns/${code}`);
  return handleResponse<Campaign>(res);
}

// --- Personajes ---

export async function listarPersonajes(campaignCode: string): Promise<Character[]> {
  const res = await fetch(`/api/campaigns/${campaignCode}/characters`);
  return handleResponse<Character[]>(res);
}

export async function obtenerPersonaje(id: string): Promise<Character> {
  const res = await fetch(`/api/characters/${id}`);
  return handleResponse<Character>(res);
}

export async function crearPersonaje(
  campaignCode: string,
  data: Partial<CharacterPayload>
): Promise<CharacterWithSecret> {
  const res = await fetch(`/api/campaigns/${campaignCode}/characters`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return handleResponse<CharacterWithSecret>(res);
}

export async function actualizarPersonaje(
  id: string,
  data: Partial<CharacterPayload>,
  credentials: Credentials
): Promise<Character> {
  const res = await fetch(`/api/characters/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...data, ...credentials }),
  });
  return handleResponse<Character>(res);
}

export async function borrarPersonaje(id: string, credentials: Credentials): Promise<void> {
  const res = await fetch(`/api/characters/${id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });
  return handleResponse<void>(res);
}