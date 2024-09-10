import React, { useState, useEffect } from "react";

// UserProfile 组件用于显示用户的头像或用户名的首字母缩写
function UserProfile({ name }) {
  // 使用 useState 钩子来存储用户的首字母缩写
  const [userInitials, setUserInitials] = useState("");

  // 使用 useEffect 钩子在 name 属性变化时更新用户的首字母缩写
  useEffect(() => {
    if (name) {
      setUserInitials(generateInitials(name));
    }
  }, [name]);

  return (
    <div className="flex items-center justify-center w-36 h-full bg-blue-500 rounded-full text-white text-2xl font-bold select-none">
      {name ? (
        // 如果 name 存在，显示用户的首字母缩写
        <div className="text-white text-4xl font-normal">{userInitials}</div>
      ) : (
        // 如果 name 不存在，显示默认的 GIF 图像
        <div className="avatar">
          <div className="w-24 rounded-full">
            <img
              src="https://giffiles.alphacoders.com/532/53236.gif"
              alt="Profile"
            />
          </div>
        </div>
      )}
    </div>
  );
}

// generateInitials 函数用于生成用户名的首字母缩写
function generateInitials(name) {
  const words = name.split(" ");
  const initials = words
    .map((word) => word.charAt(0))
    .join("")
    .toUpperCase();
  return initials;
}

export { UserProfile, generateInitials };