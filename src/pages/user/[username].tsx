import React from "react";

import MainLayout from "../../layouts/MainLayout";

const UserProfilePage = () => {
  return (
    <>
      <MainLayout />
      <div className="flex h-full w-full items-center justify-center p-10">
        <div className="flex w-full max-w-screen-lg flex-col gap-4">
          <div
            id="postimage"
            className="relative h-[60vh] w-full rounded-xl bg-gray-300 shadow-lg"
          >
            <div
              id="title"
              className="absolute  flex h-full w-full items-center justify-center text-4xl font-semibold"
            >
              <div className="rounded-md bg-white p-4">User Profile</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfilePage;
