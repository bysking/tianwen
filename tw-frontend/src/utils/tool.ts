import { INDEX_PATH } from '@/constants';
import { history } from '@umijs/max';

export const goWelcomePage = () => {
  history.replace(INDEX_PATH);
};
