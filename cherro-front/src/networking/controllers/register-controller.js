import { ApiService } from '../api-service';
import { API_ROUTES } from '../api-routes';
import { UserSerializer } from '../serializers/user-serializer';
import { ResponseSerializer } from '../serializers/response-serializer';

class RegisterController {
  static async register(user) {
    try {
      const serUser = UserSerializer.serialize(user);
      const response = await ApiService.post(API_ROUTES.REGISTER,
        { user: serUser });
      return ResponseSerializer.deSerialize(response.data);
    } catch (err) {
      throw new Error({ error: true, message: err.message });
    }
  }
}

export { RegisterController };
