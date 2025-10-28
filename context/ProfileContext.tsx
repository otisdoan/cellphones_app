import React, { createContext, useMemo, useState } from "react";

export type Profile = {
  name: string;
  bio: string;
  avatarUrl?: string;
};

type ProfileContextValue = {
  profile: Profile;
  setProfile: React.Dispatch<React.SetStateAction<Profile>>;
};

export const ProfileContext = createContext<ProfileContextValue | undefined>(
  undefined
);

export function ProfileProvider({ children }: { children: React.ReactNode }) {
  const [profile, setProfile] = useState<Profile>({
    name: "Otis Doan",
    bio: "Tech enthusiast. Building a sleek shopping experience.",
    avatarUrl: undefined,
  });

  const value = useMemo(() => ({ profile, setProfile }), [profile]);

  return (
    <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
  );
}

export function useProfile() {
  const ctx = React.useContext(ProfileContext);
  if (!ctx) throw new Error("useProfile must be used within ProfileProvider");
  return ctx;
}
