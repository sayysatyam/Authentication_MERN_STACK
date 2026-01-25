import { useAuthStore } from "../AuthStore/Store";
import { formatDate } from "../utils/formatDate";
import Logout from "./Logout";

const DashboardPage = () => {
  const { user } = useAuthStore();

  return (
    <div
      className="max-w-md w-full mx-auto mt-10 flex flex-col gap-5 p-8 
      bg-gray-900 bg-opacity-80 backdrop-blur-lg
      rounded-xl shadow-2xl border border-gray-800 animate-fade-scale"
    >
      <h2
        className="text-3xl font-bold mb-6 text-center
        bg-linear-to-r from-purple-600 to-red-600
        text-transparent bg-clip-text"
      >
        Dashboard
      </h2>

      <div className="space-y-6">
        
        <div
  className="p-4 rounded-lg border border-purple-800/40
  bg-linear-to-br from-purple-950 to-gray-900
  animate-fade-up [animation-delay:0.2s]"
>
  <h3 className="text-xl font-semibold text-violet-400 mb-3">
    Profile Information
  </h3>
  <p className="text-gray-300">Name: {user?.name}</p>
  <p className="text-gray-300">Email: {user?.email}</p>
</div>


   
      <div
  className="p-4 rounded-lg border border-purple-800/40
  bg-linear-to-br from-purple-950 to-gray-900
  animate-fade-up [animation-delay:0.4s]"
>
  <h3 className="text-xl font-semibold text-violet-400 mb-3">
    Account Activity
  </h3>

  <p className="text-gray-300">
    <span className="font-semibold text-gray-400">Joined: </span>
    {new Date(user?.createdAt).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })}
  </p>

  <p className="text-gray-300">
    <span className="font-semibold text-gray-400">Last Login: </span>
    {formatDate(user?.lastLogin)}
  </p>
</div>
      </div>

      
      <Logout />
    </div>
  );
};

export default DashboardPage;
