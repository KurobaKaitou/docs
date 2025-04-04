export default [
  { text: "首页", link: "/" },
  { text: "前言", link: "/preview/" },
  {
    text: "前端",
    ariaLabel: "Frontend",
    children: [
      { text: "TypeScript", link: "/frontend/typescript/getting-start.md" },
      {
        text: "Promise",
        link: "/frontend/promise/",
      },
    ],
  },
  {
    text: "后端",
    ariaLabel: "Backend",
    children: [
      {
        text: "Netty",
        link: "/backend/netty/nio.md",
      },
      { text: "Docker", link: "/backend/docker/" },
    ],
  },
  {
    text: "更多",
    ariaLabel: "Other",
    children: [
      { text: "书签", link: "/bookmark/bookmark" },
      { text: "面试相关经验", link: "/bookmark/job/interview" },
      { text: "文件小屋", link: "https://www.zhilin.club/alist/" },
      {
        text: "站点",
        children: [
          { text: "Design Pattern", link: "https://java-design-patterns.com" },
        ],
      },
      {
        text: "友链",
        children: [
          { text: "Luffy's Blog", link: "https://dreamluffe.github.io/" },
          { text: "Lz's Blog", link: "https://lzangle.github.io/lzBlog/" },
        ],
      },
    ],
  },
  { text: "🚇 开往", link: "https://www.travellings.cn/go.html" },
];
