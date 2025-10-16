import db from "#db/client";

export async function createPlaylist(name, description, user_id) {
  const sql = `
  INSERT INTO playlists
    (name, description, owner_id)
  VALUES
    ($1, $2, $3)
  RETURNING *
  `;
  const {
    rows: [playlist],
  } = await db.query(sql, [name, description, user_id]);
  return playlist;
}

export async function getPlaylists(user_id) {
  const sql = `
  SELECT *
  FROM playlists
  WHERE owner_id = $1
  `;
  const { rows: playlists } = await db.query(sql, [user_id]);
  return playlists;
}

export async function getPlaylistById(id) {
  const sql = `
  SELECT *
  FROM playlists
  WHERE id = $1
  `;
  const {
    rows: [playlist],
  } = await db.query(sql, [id]);
  return playlist;
}

export async function getPlaylistByUserIdAndTrackId(user_id, track_id) {
  const sql = `
  SELECT playlists.*
  FROM
    playlists
    JOIN playlists_tracks ON playlists_tracks.playlist_id = playlists.id
    JOIN tracks ON tracks.id = playlists_tracks.track_id
  WHERE playlists.owner_id = $1 AND tracks.id = $2
  `;
  const { rows: playlists } = await db.query(sql, [user_id, track_id]);
  return playlists;
}
