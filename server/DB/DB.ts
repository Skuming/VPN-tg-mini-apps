import pool from "./pool";

export async function GetUserInfo(userID: number) {
  const conn = await pool.getConnection();
  await AddUserInDB(userID);
  try {
    const [result]: any = await conn.query(
      "SELECT * FROM `users` WHERE user_id = ?",
      [userID]
    );
    return result[0];
  } finally {
    conn.release();
  }
}

export async function AddUserInDB(userID: number) {
  const conn = await pool.getConnection();
  try {
    const [result]: any = await conn.query(
      "INSERT INTO users (user_id) VALUES (?);",
      [userID]
    );
    return result[0];
  } catch (error) {
    conn.release();
    return null;
  } finally {
    conn.release();
  }
}
