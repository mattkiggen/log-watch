import { SearchForm } from './components/SearchForm';
import { LogTable } from './components/Table';

export function App() {
  return (
    <>
      <header className='flex items-center justify-between p-4 bg-gray-100'>
        <SearchForm />
      </header>
      <LogTable />
    </>
  );
}
