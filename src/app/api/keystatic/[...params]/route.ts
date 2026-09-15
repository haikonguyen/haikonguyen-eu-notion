import { makeRouteHandler } from '@keystatic/next/route-handler';
import { canAccessKeystaticAdmin } from '@lib/keystatic/assert-admin-access';
import config from '../../../../../keystatic.config';

const handler = makeRouteHandler({ config });

async function guard(request: Request, method: 'GET' | 'POST') {
  if (!(await canAccessKeystaticAdmin())) {
    return new Response(null, { status: 404 });
  }

  if (method === 'GET') {
    return handler.GET(request);
  }

  return handler.POST(request);
}

export function GET(request: Request) {
  return guard(request, 'GET');
}

export function POST(request: Request) {
  return guard(request, 'POST');
}
