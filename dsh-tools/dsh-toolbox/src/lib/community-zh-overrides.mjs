// 中文页对词的覆盖：slug → 中文标题与首段答案句。只覆盖这 13 页。
export const ZH_OVERRIDES = {
  'dsh-market/dsh-plugin-market': {
    title: 'dsh 插件市场在哪？装完在界面里就能搜',
    cite: 'dshmarket 把插件市场做成 DSH 里的一个界面，装上之后搜索、安装都在界面里完成，不用记包名。',
  },
  'dshplugin/community-marketplace': {
    title: 'DeepSeek Harness 插件市场怎么用？一个插件带一个目录',
    cite: 'dsh-plugin 本身就是一个插件，装完多出一个社区插件目录，按名字找到包再装。',
  },
  'Han-1413141/cost-meter': {
    title: 'dsh 会话花了多少钱？按会话和按天都能看',
    cite: 'dsh-cost-meter 用你已配好的凭据读用量，把本次会话与当天的花费按服务商价格表折算出来。',
  },
  'MeteorNOX/balance-widget': {
    title: 'DeepSeek 余额怎么在 DSH 里看？右下角挂个小挂件',
    cite: 'dsh-whale-widget 在网页界面右下角放一个余额读数，顺带显示今日用量与峰谷价。',
  },
  'MichengAI/archive-manager': {
    title: 'dsh 会话太多怎么办？归档、恢复、永久删除',
    cite: 'archive-manager 把会话从活跃列表里移走而不动负载，要找回也能恢复，还能诊断坏掉的会话日志。',
  },
  'MYCF711/session-superagent': {
    title: 'dsh 会话能自动盯着 GitHub issue 吗？',
    cite: 'dsh-session-superagent 是一个会话级看护程序：盯住一个 GitHub issue，按状态继续做下去。',
  },
  'T-Auto/ops': {
    title: 'dsh 在 Windows 上缺原生命令怎么办？补一组工具',
    cite: 'dsh-ops 给 Windows x64 与 Linux x64 补上原生文件与进程操作工具，agent 才有得调。',
  },
  'regrevia/unlag': {
    title: 'DSH 桌面端改完插件要重启？装个刷新按钮',
    cite: 'dsh-unlag 给桌面端加一个刷新入口：改完插件不用重启，开久了卡也能点一下。',
  },
};
