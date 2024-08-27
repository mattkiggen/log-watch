import { useState } from 'react';

const environments = [
  { label: 'dev', value: 'dev' },
  { label: 'int', value: 'int' },
  { label: 'qa', value: 'qa' },
  { label: 'prod', value: 'prod' },
];

export function SearchForm() {
  const [env, setEnv] = useState('dev');
  const [source, setSource] = useState('all');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Searching for data....');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className='flex flex-row items-end align-middle space-x-4'>
        <div className='w-40'>
          <label htmlFor='env' className='text-sm block mb-1'>
            Env
          </label>
          <select
            id='env'
            value={env}
            onChange={(e) => setEnv(e.target.value)}
            className='w-full rounded border border-gray-300 bg-white p-2 h-10'>
            {environments.map((x) => (
              <option key={x.value} value={x.value}>
                {x.label}
              </option>
            ))}
          </select>
        </div>
        <div className='w-40'>
          <label htmlFor='source' className='text-sm block mb-1'>
            Source
          </label>
          <select
            id='source'
            value={source}
            onChange={(e) => setSource(e.target.value)}
            className='w-full rounded border border-gray-300 bg-white p-2 h-10'>
            <option value='all'>All</option>
            <option value='log'>Log</option>
            <option value='event'>Event</option>
          </select>
        </div>
        <div className='w-40'>
          <label htmlFor='fromDate' className='text-sm block mb-1'>
            From Date
          </label>
          <input
            type='date'
            id='fromDate'
            value={fromDate}
            className='w-full rounded border border-gray-300 bg-white p-2 h-10'
            onChange={(e) => setFromDate(e.target.value)}
          />
        </div>
        <div className='w-40'>
          <label htmlFor='toDate' className='text-sm block mb-1'>
            To Date
          </label>
          <input
            type='date'
            id='toDate'
            value={toDate}
            className='w-full rounded border border-gray-300 bg-white p-2 h-10'
            onChange={(e) => setToDate(e.target.value)}
          />
        </div>
        <button
          type='submit'
          className='bg-blue-700 px-4 py-2 rounded text-white h-10'>
          Search
        </button>
      </div>
    </form>
  );
}
