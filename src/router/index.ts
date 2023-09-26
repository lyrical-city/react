import { Router } from '@lyrical/react-router';
import { routes } from './constants';
import { ROUTE_MAP } from './enum';

const router = new Router({ map: ROUTE_MAP, routes: routes });

export default router;
