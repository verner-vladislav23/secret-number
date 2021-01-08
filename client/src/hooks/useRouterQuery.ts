// @ts-ignore
import queryString from 'query-string';
import { useLocation } from 'react-router-dom';

export function useRouterQuery(): Record<string, any> {
  const params = useLocation().search;
  return queryString.parse(params);
}
