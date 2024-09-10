// 导入必要的库
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// 定义组件
const Navbar = ({ isMenuOpen, toggleMenu }) => {
  // 初始化状态变量
  const [currentTime, setCurrentTime] = useState(new Date()); // 当前时间
  const [funFact, setFunFact] = useState(""); // 随机趣闻

  // 获取随机趣闻
  useEffect(() => {
    const fetchFunFact = async () => {
      try {
        // 从外部API获取趣闻数据
        const response = await fetch("https://uselessfacts.jsph.pl/random.json?language=en");
        const data = await response.json();
        setFunFact(data.text); // 更新趣闻状态
      } catch (error) {
        console.error("Error fetching fun fact:", error);
      }
    };

    // 初始加载时获取趣闻，并设置每10秒刷新一次
    fetchFunFact();
    const intervalID = setInterval(fetchFunFact, 10000);

    // 清除定时器，避免内存泄漏
    return () => clearInterval(intervalID);
  }, []);

  // 实时更新时间
  useEffect(() => {
    const updateTime = () => setCurrentTime(new Date()); // 更新当前时间

    // 设置每秒更新时间
    const intervalID = setInterval(updateTime, 1000);

    // 清除定时器，避免内存泄漏
    return () => clearInterval(intervalID);
  }, []);

  // 监听页面可见性变化
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        toggleMenu(); // 页面失去焦点时关闭菜单
      }
    };

    // 添加事件监听器
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // 移除事件监听器，避免内存泄漏
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [toggleMenu]);

  // 格式化日期
  const formatDate = (date) => {
    const options = { weekday: "long", month: "long", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };

  // 格式化时间
  const formatTime = (time) => {
    const options = { hour: "2-digit", minute: "2-digit", hour12: false };
    return time.toLocaleTimeString([], options);
  };

  // 渲染导航栏
  return (
    <motion.nav
      // 动画效果配置
      transition={{ type: "spring", damping: 200, stiffness: 1000 }}
      initial={{ y: "-100%" }}
      animate={{ y: isMenuOpen ? "0%" : "-110%" }}
      className="fixed inset-0 bg-black h-full w-full z-50"
      onClick={(e) => {
        e.stopPropagation(); // 阻止事件冒泡
        toggleMenu(); // 关闭菜单
      }}
      style={{!
        background: "url(https://images8.alphacoders.com/134/1346089.png)",
        backgroundSize: "cover",
      }}
    >
      <div className="relative flex flex-col justify-center h-full text-primary">
        <div className="absolute flex flex-col items-center w-full top-32 text-white">
          <div className="text-9xl font-bold">{formatTime(currentTime)}</div>
          <div className="font-semibold text-4xl mt-5">
            {formatDate(currentTime)}
          </div>
          <div className="font-semibold text-xl mt-40 w-72 flex flex-col items-center">
            Did you know?
            <div className="mt-3">{funFact}</div>
          </div>
        </div>
        <div className="absolute top-0 flex justify-between w-full h-full py-12 px-32 text-white">
          <a
            href="https://google.com"
            className="btn"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open Google"
          >
            <div className="material-symbols-outlined">search</div>
          </a>
          <a
            href="https://i.pinimg.com/564x/3a/08/4e/3a084e04a46b5f0cdf09fec54659dc07.jpg"
            className="btn"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open Photo"
          >
            <div className="material-symbols-outlined">photo_camera</div>
          </a>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;