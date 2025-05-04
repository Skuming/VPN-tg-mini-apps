import pool from "./pool";

// interface DB {
//     userID: number;
// }

export async function GetUserInfo(userID: number) {
  const conn = await pool.getConnection();
  try {
    const [result]: any = await conn.query(
      "SELECT * FROM `users` WHERE user_id = ?",
      [userID]
    );
    return result[0];
  } catch (error) {
    console.log(error);
    conn.release();
    return null;
  } finally {
    conn.release();
  }
}
