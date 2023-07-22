import { NextResponse } from 'next/server';
import type { TVillage } from '$/types';
import { nextError, readCsv } from '$/utils';

export async function GET(
   _request: Request,
   { params }: { params: { code: string } }
): Promise<NextResponse<TVillage[] | unknown>> {
   try {
      const data = await readCsv<TVillage>(
         `./data/villages.csv`,
         'district_code',
         params.code
      );
      return NextResponse.json(data);
   } catch (err: any) {
      return nextError(err.metadata, 500);
   }
}
