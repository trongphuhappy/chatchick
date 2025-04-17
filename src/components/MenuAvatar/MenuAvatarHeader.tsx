/* eslint-disable @next/next/no-img-element */
'use client'
import { useAppSelector } from "@/stores/store";
import { Skeleton } from "@mui/material";
import { useRouter } from "next/navigation";

interface Props {
  hideMenuAvatar: () => void,
  onLogout: () => void,
}

export default function MenuAvatarHeader({ hideMenuAvatar, onLogout }: Props) {

  const userState = useAppSelector(state => state.userSlice);
  const router = useRouter();

  const handleNavigate = (option: string, value?: string) => {
    switch (option) {
      case "profile":
        hideMenuAvatar();
        return router.push("/profile");
      case "setting":
        hideMenuAvatar();
        return router.push("/setting-profile");
      case "logout":
        hideMenuAvatar();
        return onLogout();
      default:
        return;
    }
  };

  return (
    <div className="flex flex-col">
      <div className="pt-2">
        <div className="flex flex-col gap-3 px-5 pb-2">
          <div
            className="flex items-center gap-5 cursor-pointer select-none"
            onClick={() => handleNavigate("profile")}
          >
            {userState.user?.avatar ? <figure
              data-tooltip-id="header-avatar"
              style={{
                borderRadius: "50%",
                overflow: "hidden",
                width: "48px",
                height: "48px",
              }}
            >
              <img
                src={userState.user?.avatar}
                width={100}
                height={100}
                alt="avatar"
              />
            </figure> : <Skeleton width={"100%"} height={"100%"} className="rounded-full" />}
            <h4 className="text-gray-800 text-base font-semibold  transition-colors duration-200 hover:text-black">
              {userState.user?.fullName}
            </h4>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-200 pt-2">
        <div className="flex flex-col gap-3 px-5 py-2">
          <div
            className="cursor-pointer select-none text-gray-600 text-base font-normal transition-colors duration-200 hover:text-black"
            onClick={() => handleNavigate("profile")}
          >
            <p>Profile</p>
          </div>
          <div
            className="cursor-pointer select-none text-gray-600 text-base font-normal transition-colors duration-200 hover:text-black"
            onClick={() => handleNavigate("messages")}
          >
            <p>Messages</p>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-200 pt-2">
        <div className="flex flex-col gap-3 px-5 py-2">
          <div
            className="cursor-pointer select-none text-gray-600 text-base font-normal transition-colors duration-200 hover:text-black"
            onClick={() => handleNavigate("setting")}
          >
            <p>Setting</p>
          </div>
          <div
            className="cursor-pointer select-none text-gray-800 text-base font-bold transition-colors duration-200 hover:text-black"
            onClick={() => handleNavigate("logout")}
          >
            <p>Log out</p>
          </div>
        </div>
      </div>
    </div>
  );
}
