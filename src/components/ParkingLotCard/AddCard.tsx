import { ViewGridAddIcon } from '@heroicons/react/outline';
import { useRouter } from 'next/router';

const AddCard: React.FC = () => {
  const router = useRouter();
  return (
    <button
      className="group h-80 text-indigo-600 hover:bg-indigo-50 hover:text-indigo-700 duration-500 px-6 pt-4 border rounded-md max-w-xs shrink-0 w-full"
      onClick={() => router.push('scheduled/create')}
    >
      <div className="flex justify-center sm:group-hover:-rotate-90 duration-500">
        <ViewGridAddIcon className="h-1/4 w-1/4" aria-hidden="true" />
      </div>
    </button>
  );
};

export default AddCard;
