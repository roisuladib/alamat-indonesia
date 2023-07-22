import { NextResponse } from 'next/server';
import type { TRegency } from '$/types';
import { nextError, readCsv } from '$/utils';

export async function GET(
   _request: Request,
   { params }: { params: { code: string } }
): Promise<NextResponse<TRegency[] | unknown>> {
   try {
      const data = await readCsv<TRegency>(
         `./data/regencies.csv`,
         'province_code',
         params.code
      );
      return NextResponse.json(data);
   } catch (err: any) {
      return nextError(err.metadata, 500);
   }
}
