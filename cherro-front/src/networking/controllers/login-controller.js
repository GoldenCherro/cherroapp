import { ApiService } from '../api-service';
import { API_ROUTES } from '../api-routes';
import { UserSerializer } from '../serializers/user-serializer';
import { LoginSerializer } from '../serializers/login-serializer';

class LoginController {
  static async logIn(nickname, password) {
    try {
      const response = await ApiService.post(API_ROUTES.LOGIN,
        { user: UserSerializer.deSerialize(nickname, password) });
      return LoginSerializer.serialize(response.data);
    } catch (err) {
      return { error: true, message: 'Pasó algo amiguito' };
    }
  }
}

export { LoginController };
