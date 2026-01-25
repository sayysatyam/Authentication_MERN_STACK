import { Loader } from 'lucide-react';
import { useAuthStore } from '../AuthStore/Store'
const Logout = () => {
    const {logOut,isLoading} = useAuthStore();
       const handleLogout = () => {
    logOut();
  };
  return (
    <div>
         <button onClick={handleLogout} className="flex gap-3 mb-2 text-[18px] w-full items-center justify-center
                   p-4 rounded-3xl bg-linear-to-r from-violet-600 to-purple-600
                   text-white font-semibold transition hover:scale-102 active:scale-98 hover:from-red-600 hover:to-red-500 cursor-pointer" >{isLoading ? <Loader className='animate-spin mx-auto w-8 h-8'/> : (<>Logout</>)}</button>
    </div>
  )
}

export default Logout
