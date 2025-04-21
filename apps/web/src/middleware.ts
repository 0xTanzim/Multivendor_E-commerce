import { chain } from '@/middlewares/chain';
import { withAuthMiddleware } from './middlewares/withAuthMiddleware';

export default chain([withAuthMiddleware]);

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};

// export const config = {
//   matcher: [
//     '/dashboard/:path*',
//     '/profile/:path*',
//     '/orders/:path*',
//     '/checkout',
//     '/order-confirmation/:path*',
//   ],
// };
