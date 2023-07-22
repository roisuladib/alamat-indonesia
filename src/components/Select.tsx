import { Fragment, useState } from 'react';
import { Combobox, Transition } from '@headlessui/react';
import type { TRegional } from '$/types';

interface SelectProps<T> {
   onChange: (value: string) => void;
   data: T[];
}

export const Select = <T extends TRegional>({
   onChange,
   data,
}: SelectProps<T>) => {
   const [selected, setSelected] = useState(data[0]);
   const [query, setQuery] = useState('');

   const filtered =
      query === ''
         ? data
         : data?.filter(data =>
              data.name
                 .toLowerCase()
                 .replace(/\s+/g, '')
                 .includes(query.toLowerCase().replace(/\s+/g, ''))
           );

   return (
      <div>
         <Combobox
            value={selected}
            onChange={value => {
               setSelected(value);
               onChange(value.code);
            }}>
            <div className="relative mt-1">
               <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
                  <Combobox.Input
                     className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
                     displayValue={(data: any) => data.name}
                     onChange={event => setQuery(event.target.value)}
                  />
                  <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                     <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                        className="h-5 w-5 text-gray-400">
                        <path
                           fillRule="evenodd"
                           d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z"
                           clipRule="evenodd"
                        />
                     </svg>
                  </Combobox.Button>
               </div>
               <Transition
                  as={Fragment}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                  afterLeave={() => setQuery('')}>
                  <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                     {filtered.length === 0 && query !== '' ? (
                        <div className="relative cursor-default select-none px-4 py-2 text-gray-700">
                           Nothing found.
                        </div>
                     ) : (
                        filtered?.map(data => (
                           <Combobox.Option
                              key={data.code}
                              className={({ active }) =>
                                 `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                    active
                                       ? 'bg-teal-600 text-white'
                                       : 'text-gray-900'
                                 }`
                              }
                              value={data}>
                              {({ selected, active }) => (
                                 <>
                                    <span
                                       className={`block truncate ${
                                          selected
                                             ? 'font-medium'
                                             : 'font-normal'
                                       }`}>
                                       {data.name}
                                    </span>
                                    {selected ? (
                                       <span
                                          className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                             active
                                                ? 'text-white'
                                                : 'text-teal-600'
                                          }`}>
                                          <svg
                                             xmlns="http://www.w3.org/2000/svg"
                                             viewBox="0 0 20 20"
                                             fill="currentColor"
                                             aria-hidden="true"
                                             className="h-5 w-5">
                                             <path
                                                fillRule="evenodd"
                                                d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                                                clipRule="evenodd"
                                             />
                                          </svg>
                                       </span>
                                    ) : null}
                                 </>
                              )}
                           </Combobox.Option>
                        ))
                     )}
                  </Combobox.Options>
               </Transition>
            </div>
         </Combobox>
      </div>
   );
};
