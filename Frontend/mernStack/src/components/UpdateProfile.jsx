/* eslint-disable react-hooks/set-state-in-effect */
import { Edit } from "lucide-react";
import { useEffect, useState } from "react";
import { useAuthStore } from "../AuthStore/Store";

const UpdateProfile = () => {
  const {
    user,
    updateUserProfile,
    profilePic,
    isLoading,
  } = useAuthStore();

  const [name, setName] = useState("");
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [avatarFile, setAvatarFile] = useState(null);
  const [changeName, setChangeName] = useState(false);


  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setAvatarPreview(user.profilePic || user.avatar || null);
    }
  }, [user]);

  // image select
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setAvatarFile(file);
    setAvatarPreview(URL.createObjectURL(file));
  };

  // submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    let avatarUrl = null;

    if (avatarFile) {
      const res = await profilePic(avatarFile);
      if (res?.profilePic) {
        avatarUrl = res.profilePic;
      }
    }

    await updateUserProfile(name, avatarUrl);

    setChangeName(false);
    setAvatarFile(null);
  };

  if (!user) return null;

  const isUnchanged =
    name === user.name && !avatarFile;

  return (
    <div className="glass rounded-2xl p-10 border border-white/10 w-full max-w-md flex flex-col gap-8">

      {/* Profile Image */}
      <div className="flex flex-col items-center gap-3">
        <div className="w-32 h-32 rounded-full border-2 border-purple-600 overflow-hidden">
          {avatarPreview ? (
            <img
              src={avatarPreview}
              alt="profile"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-white/60">
              No Image
            </div>
          )}
        </div>

        <label className="cursor-pointer text-sm text-purple-400 hover:text-purple-300">
          Change 
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />
        </label>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">

        {/* Name */}
        <div className="flex flex-col gap-2 relative">
          <label className="text-sm text-white/80">Name</label>

          <input
            type="text"
            value={name}
            readOnly={!changeName}
            onChange={(e) => setName(e.target.value)}
            className={`bg-white/5 border rounded-lg px-4 py-3 outline-none transition
              ${
                changeName
                  ? "border-purple-500 cursor-text"
                  : "border-white/10 cursor-not-allowed text-white/60"
              }`}
          />

          <button
            type="button"
            onClick={() => setChangeName((prev) => !prev)}
            className="absolute right-3 top-[65%] -translate-y-1/2 text-gray-400 hover:text-purple-400"
          >
            <Edit size={18} />
          </button>
        </div>

        {/* Email */}
        <div className="flex flex-col gap-2">
          <label className="text-sm text-white/80">Email</label>
          <div className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white/60">
            {user.email}
          </div>
        </div>

        {/* Button */}
        <button
          type="submit"
          disabled={isUnchanged || isLoading}
          className="mt-2 w-full bg-purple-600 hover:bg-purple-700 disabled:opacity-50 rounded-lg py-3 font-medium"
        >
          {isLoading ? "Updating..." : "Update Profile"}
        </button>
      </form>
    </div>
  );
};

export default UpdateProfile;