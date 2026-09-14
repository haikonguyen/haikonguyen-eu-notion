import { makeRouteHandler } from '@keystatic/next/route-handler';
import { isKeystaticAdminEnabled } from '@lib/keystatic/is-admin-enabled';
import { NextResponse } from 'next/server';
import config from '../../../../../keystatic.config';

const admin = makeRouteHandler({ config });

const notFoundResponse = () => new NextResponse(null, { status: 404 });

const guard =
  <TArgs extends unknown[], TResult>(handler: (...args: TArgs) => TResult) =>
  (...args: TArgs) => {
    if (!isKeystaticAdminEnabled()) {
      return notFoundResponse();
    }

    return handler(...args);
  };

export const GET = guard(admin.GET);
export const POST = guard(admin.POST);
