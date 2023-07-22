import { NextResponse } from 'next/server';
import type { TProvince } from '$/types';
import { nextError, readCsv } from '$/utils';

export async function GET(): Promise<NextResponse<TProvince[] | unknown>> {
   try {
      const data = await readCsv<TProvince>('./data/provinces.csv');
      return NextResponse.json(data);
   } catch (err: any) {
      return nextError(err.metadata, 500);
   }
}
