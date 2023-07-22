import { NextResponse } from 'next/server';

export const nextError = (message: string, statusCode: number): NextResponse => {
   const errorResponse = {
      status: statusCode >= 500 ? 'error' : 'fail',
      message,
    };

    return new NextResponse(JSON.stringify(errorResponse), {
      status: statusCode,
      headers: { 'Content-Type': 'application/json' },
    });
}
