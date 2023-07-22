import csvParser from 'csv-parser';
import fs from 'fs';

export const readCsv = <T extends object>(file: string, column?: 'province_code' | 'regency_code' | 'district_code', value?: string): Promise<T[]> => {
   return new Promise((resolve, reject) => {
     const results: T[] = [];

     fs.createReadStream(file, { encoding: 'utf-8' })
       .pipe(csvParser())
       .on('data', data => {
         if (data[column!] === value) {
           results.push(data);
         }
       })
       .on('end', () => resolve(results))
       .on('error', reject);
   });
 }
