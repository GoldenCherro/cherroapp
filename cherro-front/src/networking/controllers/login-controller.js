import { ApiService } from '../api-service';
import { API_ROUTES } from '../api-routes';

/*
  NOTE: this file serves only as an example and is not used.
  You can remove it altogether or repurpose it by changing its name.
  Learn more about our networking architecture on:
  https://blog.xmartlabs.com/2020/07/09/frontend-architecture-and-best-practices/
*/
class LoginController {
  static async logIn(email, password) {
    try {
      const response = await ApiService.post(API_ROUTES.LOGIN,
        { user: { email, password } });
      return response.data;
    } catch (err) {
      return { error: true, message: 'Pasó algo amiguito' };
    }
  }
}

export { LoginController };
