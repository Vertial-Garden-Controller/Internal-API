export default class UserService {
  static async createUser(user) {
    const insertQuery = `
      INSERT INTO users (
        firstname,
        lastname,
        middlename,
        email
      ) VALUES (
        $1, $2, $3, $4
      )`;
    const insertParams = [
      user.firstname,
      user.lastname,
      user.middlename,
      user.email,
    ];
  }
}
