import { withLayout, LAYOUT_TYPES } from '../../hocs/with-layout';
import { Register } from './register';

const WrappedRegister = withLayout(LAYOUT_TYPES.REGISTER, Register);

export { WrappedRegister as Register };
