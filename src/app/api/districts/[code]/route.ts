import { NextResponse } from 'next/server';
import type { TDistrict } from '$/types';
import { nextError, readCsv } from '$/utils';

export async function GET(
   _request: Request,
   { params }: { params: { code: string } }
): Promise<NextResponse<TDistrict[] | unknown>> {
   try {
      const data = await readCsv<TDistrict>(
         `./data/districts.csv`,
         'regency_code',
         params.code
      );
      return NextResponse.json(data);
   } catch (err: any) {
      return nextError(err.metadata, 500);
   }
}
