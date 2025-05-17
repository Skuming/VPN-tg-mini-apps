import pool from "./pool";

export async function GetUserInfo(userID: number) {
  async function GetUserFromDB() {
    const conn = await pool.getConnection();
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

  const userInfo = await GetUserFromDB();

  if (!userInfo) {
    await AddUserInDB(userID);
    return await GetUserFromDB();
  }

  return userInfo;
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

export async function ChangeBalance(userID: number, price: number) {
  const conn = await pool.getConnection();
  try {
    const [result]: any = await conn.query(
      "UPDATE `users` SET `balance` = balance - ? WHERE `user_id` = ?;",
      [price, userID]
    );
    console.log(result);

    return result[0];
  } catch (error) {
    conn.release();
    return null;
  } finally {
    conn.release();
  }
}
