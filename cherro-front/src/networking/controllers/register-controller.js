import { ApiService } from '../api-service';
import { API_ROUTES } from '../api-routes';
import { UserSerializer } from '../serializers/user-serializer';

class RegisterController {
  static async register(user) {
    try {
      const serUser = UserSerializer.serialize(user);
      const response = await ApiService.post(API_ROUTES.REGISTER,
        { user: serUser });
      return response;
    } catch (err) {
      throw new Error({ error: true, message: err.message });
    }
  }
}

export { RegisterController };
