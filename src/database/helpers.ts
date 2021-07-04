import { findByLogin, save } from '../resources/users/user.service';
import { UserRequest } from '../resources/users/user.types';

export async function generateAdmin() {
  const adminDate: UserRequest = {
    name: 'admin',
    login: 'admin',
    password: 'admin',
  };

  const admin = await findByLogin(adminDate.login);

  // Create admin if not created
  if (!admin) {
    await save(adminDate);
  }
}
