import { useAuthStore } from "../AuthStore/Store";
import { formatDate } from "../utils/formatDate";
import Logout from "./Logout";

const DashboardPage = () => {
  const { user } = useAuthStore();

  return (
    <div
      className="
        w-full
        max-w-sm sm:max-w-md md:max-w-lg
        mx-auto
        mt-6 sm:mt-10
        flex flex-col gap-4 sm:gap-5
        p-5 sm:p-8
        bg-gray-900 bg-opacity-80 backdrop-blur-lg
        rounded-xl shadow-2xl border border-gray-800
        animate-fade-scale
      "
    >
      <h2
        className="
          text-2xl sm:text-3xl font-bold
          mb-4 sm:mb-6 text-center
          bg-linear-to-r from-purple-600 to-red-600
          text-transparent bg-clip-text
        "
      >
        Dashboard
      </h2>

      <div className="space-y-4 sm:space-y-6">
        {/* Profile Information */}
        <div
          className="
            p-4
            rounded-lg border border-purple-800/40
            bg-linear-to-br from-purple-950 to-gray-900
            animate-fade-up [animation-delay:0.2s]
          "
        >
          <h3 className="text-lg sm:text-xl font-semibold text-violet-400 mb-3">
            Profile Information
          </h3>
          <p className="text-gray-300 text-sm sm:text-base">
            Name: {user?.name}
          </p>
          <p className="text-gray-300 text-sm sm:text-base break-all">
            Email: {user?.email}
          </p>
        </div>

        {/* Account Activity */}
        <div
          className="
            p-4
            rounded-lg border border-purple-800/40
            bg-linear-to-br from-purple-950 to-gray-900
            animate-fade-up [animation-delay:0.4s]
          "
        >
          <h3 className="text-lg sm:text-xl font-semibold text-violet-400 mb-3">
            Account Activity
          </h3>

          <p className="text-gray-300 text-sm sm:text-base">
            <span className="font-semibold text-gray-400">
              Joined:{" "}
            </span>
            {new Date(user?.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>

          <p className="text-gray-300 text-sm sm:text-base">
            <span className="font-semibold text-gray-400">
              Last Login:{" "}
            </span>
            {formatDate(user?.lastLogin)}
          </p>
        </div>
      </div>

      <Logout />
    </div>
  );
};

export default DashboardPage;
