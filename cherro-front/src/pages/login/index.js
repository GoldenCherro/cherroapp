import { withLayout, LAYOUT_TYPES } from '../../hocs/with-layout';
import { Login } from './login';

const WrappedLogin = withLayout(LAYOUT_TYPES.HOME, Login);

export { WrappedLogin as Login };
