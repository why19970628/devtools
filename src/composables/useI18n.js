import { ref } from 'vue'

const LANG_KEY = 'devtools_lang'
const STORAGE = typeof localStorage !== 'undefined' ? localStorage : null

const lang = ref(STORAGE && STORAGE.getItem(LANG_KEY) === 'en' ? 'en' : 'zh')

function set(next) {
  lang.value = next === 'en' ? 'en' : 'zh'
  if (STORAGE) STORAGE.setItem(LANG_KEY, lang.value)
}

function toggle() {
  set(lang.value === 'zh' ? 'en' : 'zh')
}

const dict = {
  zh: {
    brandBadge: '开发者在线效率工具箱',
    searchPlaceholder: '搜索工具、类别、路径...',
    favorites: '收藏',
    favoritesTitle: '我的收藏',
    clear: '清空',
    favEmpty: '还没有收藏任何工具，点击工具卡片的 ☆ 即可收藏',
    siteMenu: '全站菜单',
    settings: '设置',
    navExpand: '展开',
    navCollapse: '收起',
    allTools: '全部工具',
    toolsSuffix: '个工具',
    itemsSuffix: '个',
    footerBrand: '🔧 DevTools 开发者工具箱',
    footerCount: '线上 {{n}} 款工具',
    footerLocal: '纯前端实现，数据不出本地',
    footerRights: 'Copyright © 2011-2026 开发者在线工具 All rights reserved.',
    fav: '收藏',
    unfav: '取消收藏',
    favTooltip: '收藏',
    unfavTooltip: '取消收藏',
    searchHint: '输入关键词检索全站 {{n}} 个工具，或按 Ctrl + K 快速弹出',
    searchEmpty: '未找到与 "{{kw}}" 匹配的工具',
    select: '选择',
    open: '打开',
    close: '关闭',
    results: '共 {{n}} 个结果',
    settingsTitle: '⚙︎ 设置',
    themeLabel: '外观主题',
    themeAuto: '跟随时间',
    themeLight: '浅色',
    themeDark: '深色',
    langTitle: '中文 / English 切换',
    menuTitle: '☰ 全站工具导航',
    heroTitle: '🔧 DevTools 开发者工具箱',
    heroSub: '开发者在线效率工具箱 · {{n}} 款纯前端工具，无需后端服务，数据不出本地',
    heroTip: '按 Ctrl + K 快速检索全站工具，点击卡片右侧 ☆ 收藏常用工具',
  },
  en: {
    brandBadge: 'Online Dev Productivity Toolbox',
    searchPlaceholder: 'Search tools, categories, paths...',
    favorites: 'Favorites',
    favoritesTitle: 'My Favorites',
    clear: 'Clear',
    favEmpty: 'No favorites yet — click ☆ on any tool card to save it',
    siteMenu: 'Site menu',
    settings: 'Settings',
    navExpand: 'Expand',
    navCollapse: 'Collapse',
    allTools: 'All Tools',
    toolsSuffix: 'tools',
    itemsSuffix: '',
    footerBrand: '🔧 DevTools Toolbox',
    footerCount: '{{n}} online tools',
    footerLocal: 'Pure front-end, data stays in your browser',
    footerRights: 'Copyright © 2011-2026 DevTools Online. All rights reserved.',
    fav: 'Add to favorites',
    unfav: 'Remove from favorites',
    favTooltip: 'Favorite',
    unfavTooltip: 'Unfavorite',
    searchHint: 'Search across all {{n}} tools, or press Ctrl + K',
    searchEmpty: 'No tool matches "{{kw}}"',
    select: 'select',
    open: 'open',
    close: 'close',
    results: '{{n}} results',
    settingsTitle: '⚙︎ Settings',
    themeLabel: 'Appearance theme',
    themeAuto: 'Auto (time-based)',
    themeLight: 'Light',
    themeDark: 'Dark',
    langTitle: '切换 中文 / English',
    menuTitle: '☰ Site-wide Tool Navigation',
    heroTitle: '🔧 DevTools Toolbox',
    heroSub: 'Online productivity toolbox — {{n}} pure front-end tools, no backend, data never leaves your browser',
    heroTip: 'Press Ctrl + K to search all tools; click ☆ on a card to favorite it',
  },
}

function t(key, params) {
  let s = dict[lang.value][key] ?? dict.zh[key] ?? key
  if (params) {
    for (const [k, v] of Object.entries(params)) {
      s = s.split('{{' + k + '}}').join(String(v))
    }
  }
  return s
}

export const toolName = (tool) => (lang.value === 'en' && tool.nameEn ? tool.nameEn : tool.name)
export const toolDesc = (tool) => (lang.value === 'en' && tool.descEn ? tool.descEn : tool.desc)
export const categoryName = (cat) => (lang.value === 'en' && cat.nameEn ? cat.nameEn : cat.name)

export function useI18n() {
  return { lang, set, toggle, t }
}