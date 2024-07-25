// /app/components/Profile.tsx
import Image from "next/image";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

interface ProfileProps {
  avatarUrl: string;
  name: string;
  bio: string;
  onLogout: () => void;
}

const Profile: React.FC<ProfileProps> = ({
  avatarUrl,
  name,
  bio,
  onLogout,
}) => {
  return (
    <div className="relative group">
      <div className="flex items-center space-x-4 p-2 rounded-lg gap-2">
        <div className="flex flex-col h-full justify-center">
          <p className="text-xl font-bold">{name}</p>
          <p className="text-center">{bio}</p>
        </div>
        <div className="flex justify-center items-center gap-2">
          <Image
            src={avatarUrl}
            alt={`${name}'s avatar`}
            width={50}
            height={50}
            className="rounded-full"
          />
          <button
            className="flex items-center w-full px-4 py-2 text-left text-white"
            onClick={onLogout}
          >
            <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
