export const categories = [
  { id: 'json', name: 'JSON 工具', nameEn: 'JSON Tools', icon: '📄' },
  { id: 'enc', name: '编码 / 加密', nameEn: 'Encoding / Encryption', icon: '🔐' },
  { id: 'format', name: '代码格式化', nameEn: 'Code Formatting', icon: '💻' },
  { id: 'convert', name: '常用转换', nameEn: 'Common Conversions', icon: '🔄' },
  { id: 'frontend', name: '前端 / UI 工具', nameEn: 'Frontend / UI Tools', icon: '🎨' },
  { id: 'backend', name: '后端 / 数据库', nameEn: 'Backend / Database', icon: '🗄️' },
  { id: 'network', name: '网络工具', nameEn: 'Network Tools', icon: '🌐' },
  { id: 'docs', name: '开发速查文档', nameEn: 'Dev Quick Reference', icon: '📚' },
  { id: 'othertools', name: '常用开发辅助', nameEn: 'Dev Utilities', icon: '🛠️' },
  { id: 'iot', name: '物联网 / 嵌入式', nameEn: 'IoT / Embedded', icon: '📡' },
  { id: 'openplatform', name: '开放平台与调试', nameEn: 'Open Platform & Debug', icon: '🔌' },
  { id: 'resources', name: '开发文档与资源', nameEn: 'Docs & Resources', icon: '📖' },
]

export const tools = [
  { id: 'json-format', name: 'JSON 格式化校验', nameEn: 'JSON Formatter & Validator', category: 'json', path: '/json/format', desc: '支持语法校验、代码着色、压缩、转义/去转义、Unicode转中文、转GET参数、历史记录', descEn: 'Syntax validation, highlighting, minify, escape/unescape, Unicode to Chinese, GET-param conversion, history', icon: '📄' },
  { id: 'json-viewer', name: 'JSON 树形视图查看器', nameEn: 'JSON Tree View', category: 'json', path: '/json/viewer', desc: '多层级树状交互式查看 JSON 结构，支持层级折叠展开、类型着色与快速复制', descEn: 'Interactive multi-level JSON tree with collapse/expand, type coloring and quick copy', icon: '🌳' },
  { id: 'json-diff', name: 'JSON 对比工具', nameEn: 'JSON Diff', category: 'json', path: '/json/diff', desc: '两段 JSON 结构差异对比，高亮标记增删改字段', descEn: 'Compare two JSON structures, highlighting added, removed and changed fields', icon: '🔀' },
  { id: 'json-pojo', name: 'JSON 转实体类', nameEn: 'JSON to POJO', category: 'json', path: '/json/pojo', desc: '自动分析 JSON 结构，一键生成 Java POJO / C# 实体类', descEn: 'Analyze JSON and generate Java POJO / C# entity classes in one click', icon: '☕' },
  { id: 'json-convert', name: 'JSON / XML / YAML 互转', nameEn: 'JSON / XML / YAML Converter', category: 'json', path: '/json/convert', desc: 'JSON 与 XML、YAML、GET 参数互相转换', descEn: 'Convert between JSON, XML, YAML and GET params', icon: '🔄' },
  { id: 'json-remove-blank', name: 'JSON 移除空属性', nameEn: 'JSON Remove Empty Fields', category: 'json', path: '/json/remove-blank', desc: '递归清理 JSON 中值为 null、空字符串、空数组或空对象的属性', descEn: 'Recursively remove null, empty string, empty array or empty object properties', icon: '🧹' },
  { id: 'json-sort', name: 'JSON 键名排序', nameEn: 'JSON Key Sorter', category: 'json', path: '/json/sort', desc: '递归对 JSON 键名执行 A-Z 升序或降序重新排列', descEn: 'Recursively sort JSON keys A-Z ascending or descending', icon: '📶' },
  { id: 'json-table', name: 'JSON 表格视图', nameEn: 'JSON Table View', category: 'json', path: '/json/table', desc: '将包含对象的 JSON 列表渲染为交互式多列数据表格', descEn: 'Render a list of JSON objects as an interactive multi-column table', icon: '📊' },
  { id: 'json-to-excel', name: 'JSON 转 CSV / Excel', nameEn: 'JSON to CSV / Excel', category: 'json', path: '/json/to-excel', desc: '将对象列表型 JSON 快速转换为带 BOM UTF-8 的 CSV 电子表格', descEn: 'Convert object-list JSON to BOM UTF-8 CSV spreadsheets', icon: '📑' },

  { id: 'base64', name: 'Base64 编解码', nameEn: 'Base64 Encode/Decode', category: 'enc', path: '/enc/base64', desc: '文本或图片文件的 Base64 编码与解码转换', descEn: 'Base64 encode/decode for text or image files', icon: '🔤' },
  { id: 'crypto-hash', name: '哈希计算 (MD5/SHA)', nameEn: 'Hash Calculator (MD5/SHA)', category: 'enc', path: '/enc/hash', desc: 'MD5、SHA-1、SHA-256、SHA-512 在线哈希散列计算', descEn: 'Online hashing with MD5, SHA-1, SHA-256, SHA-512', icon: '#️⃣' },
  { id: 'aes-des', name: 'AES / DES 对称加解密', nameEn: 'AES / DES Encryption', category: 'enc', path: '/enc/aes-des', desc: '支持 AES、DES 算法，多种工作模式（CBC/ECB）与填充方式', descEn: 'Symmetric AES/DES with CBC/ECB modes and multiple padding options', icon: '🔒' },
  { id: 'jwt-decode', name: 'JWT 在线解码', nameEn: 'JWT Decoder', category: 'enc', path: '/enc/jwt', desc: 'JSON Web Token (JWT) 头部与 Payload 荷载高亮解析', descEn: 'Decode and highlight JSON Web Token (JWT) header and payload', icon: '🎫' },
  { id: 'url-encode', name: 'URL 编码 / 解码', nameEn: 'URL Encode / Decode', category: 'enc', path: '/enc/url', desc: 'URL 地址及参数 encodeURIComponent / decodeURIComponent', descEn: 'encodeURIComponent / decodeURIComponent for URLs and params', icon: '🔗' },
  { id: 'unicode-chinese', name: 'Unicode 中文互转', nameEn: 'Unicode / Chinese Converter', category: 'enc', path: '/enc/unicode', desc: '\\u4e2d\\u6587 形式与普通中文字符串互相转换', descEn: 'Convert between \\uXXXX escapes and plain Chinese text', icon: '🇨🇳' },
  { id: 'escape', name: 'Escape / Unescape', nameEn: 'Escape / Unescape', category: 'enc', path: '/enc/escape', desc: 'JavaScript escape 与 unescape 字符转义互转', descEn: 'JavaScript escape and unescape character conversion', icon: '🔣' },
  { id: 'morse', name: '摩斯密码在线转换', nameEn: 'Morse Code Converter', category: 'enc', path: '/enc/morse', desc: '英文/数字与摩斯电码 (· 与 -) 互相编码与解码', descEn: 'Encode/decode text and numbers to Morse code (· and -)', icon: '📡' },
  { id: 'random-password', name: '强密码随机生成器', nameEn: 'Random Password Generator', category: 'enc', path: '/enc/random-password', desc: '高强度随机安全密码批量生成', descEn: 'Generate strong random secure passwords in batch', icon: '🛡️' },
  { id: 'rsa', name: 'RSA 公私钥加解密与签名', nameEn: 'RSA Encrypt/Decrypt & Sign', category: 'enc', path: '/enc/rsa', desc: '纯前端生成 1024/2048 位 RSA 密钥对，支持 RSA-OAEP 加解密与 RSA-PSS 签名验签', descEn: 'Generate 1024/2048-bit RSA key pairs in-browser; RSA-OAEP encrypt/decrypt and RSA-PSS sign/verify', icon: '🔑' },

  { id: 'sql-format', name: 'SQL 格式化美化', nameEn: 'SQL Formatter', category: 'format', path: '/format/sql', desc: '支持 MySQL、PostgreSQL、Oracle 等 SQL 语句美化排版与压缩', descEn: 'Beautify and minify SQL for MySQL, PostgreSQL, Oracle and more', icon: '💾' },
  { id: 'code-format', name: 'HTML / JS / CSS 格式化', nameEn: 'HTML / JS / CSS Formatter', category: 'format', path: '/format/code', desc: 'HTML、JavaScript、CSS 代码美化与紧凑压缩', descEn: 'Beautify and minify HTML, JavaScript and CSS', icon: '💻' },
  { id: 'xml-format', name: 'XML 格式化 / 压缩', nameEn: 'XML Formatter / Minifier', category: 'format', path: '/format/xml', desc: '在线 XML 语法校验、缩进排版美化、极简压缩、实体转义、XML转JSON及文件导出', descEn: 'XML validation, pretty-print, minify, entity escape, XML-to-JSON and export', icon: '📰' },

  { id: 'timestamp', name: 'Unix 时间戳互转', nameEn: 'Unix Timestamp Converter', category: 'convert', path: '/convert/timestamp', desc: '秒/毫秒时间戳与北京时间、UTC互转，支持当前实时时钟', descEn: 'Convert between seconds/milliseconds timestamps and Beijing/UTC time with a live clock', icon: '⏱️' },
  { id: 'radix-convert', name: '多进制转换', nameEn: 'Radix Converter', category: 'convert', path: '/convert/radix', desc: '2进制、8进制、10进制、16进制实时联动转换', descEn: 'Live conversion among binary, octal, decimal and hexadecimal', icon: '🔢' },
  { id: 'case-convert', name: '命名风格 / 大小写转换', nameEn: 'Case / Naming Style Converter', category: 'convert', path: '/convert/case', desc: '驼峰 (camelCase)、帕斯卡 (PascalCase)、下划线 (snake_case)、中划线 (kebab-case) 与大小写转换', descEn: 'Convert between camelCase, PascalCase, snake_case, kebab-case and letter case', icon: '🔠' },
  { id: 'color-convert', name: 'RGB / HEX 颜色互转', nameEn: 'RGB / HEX Color Converter', category: 'convert', path: '/convert/color', desc: 'HEX 16进制与 RGB / RGBA 互转，集成实时取色器与调色板', descEn: 'Convert between HEX and RGB/RGBA with a live color picker and palette', icon: '🎨' },
  { id: 'qrcode', name: '二维码生成器', nameEn: 'QR Code Generator', category: 'convert', path: '/convert/qrcode', desc: '文本或网址转二维码，支持自定义尺寸与一键下载保存', descEn: 'Generate QR codes from text or URLs with custom size and one-click download', icon: '📱' },
  { id: 'pinyin', name: '汉字转拼音', nameEn: 'Chinese to Pinyin', category: 'convert', path: '/convert/pinyin', desc: '汉字快速转全拼拼音或首字母缩写', descEn: 'Convert Chinese characters to full pinyin or initials', icon: '🀄' },
  { id: 'chinese-convert', name: '简繁体中文互转', nameEn: 'Simplified / Traditional Chinese', category: 'convert', path: '/convert/chinese', desc: '简体中文与繁体中文在线互相转换', descEn: 'Convert between simplified and traditional Chinese online', icon: '🈶' },
  { id: 'num-to-rmb', name: '数字转人民币大写金额', nameEn: 'Number to RMB Uppercase', category: 'convert', path: '/convert/num-to-rmb', desc: '阿拉伯数字金额一键转标准财务发票大写', descEn: 'Convert Arabic numbers to standard financial invoice uppercase Chinese', icon: '💰' },
  { id: 'full-half', name: '全角 / 半角字符互转', nameEn: 'Full-width / Half-width Converter', category: 'convert', path: '/convert/full-half', desc: '全角字母数字标点与标准半角字符转换', descEn: 'Convert between full-width letters, digits, punctuation and standard half-width', icon: '↔️' },
  { id: 'filesize', name: '文件大小单位换算', nameEn: 'File Size Converter', category: 'convert', path: '/convert/filesize', desc: 'Bytes, KB, MB, GB, TB, PB 实时多单位联动换算', descEn: 'Live conversion among Bytes, KB, MB, GB, TB, PB', icon: '💾' },
  { id: 'hex-ascii', name: '16进制与 ASCII 互转', nameEn: 'Hex / ASCII Converter', category: 'convert', path: '/convert/hex-ascii', desc: '文本字符串与 16 进制 Hex 编码双向转换', descEn: 'Bidirectional conversion between text strings and hexadecimal hex encoding', icon: '🧬' },
  { id: 'string-concat', name: '多语言字符串拼接', nameEn: 'Multi-language String Concatenation', category: 'convert', path: '/convert/string-concat', desc: '拼接为 Java StringBuilder、SQL IN、JS 数组、Python 列表', descEn: 'Join strings into Java StringBuilder, SQL IN, JS array, Python list', icon: '⛓️' },
  { id: 'data-masking', name: '敏感数据脱敏工具', nameEn: 'Data Masking Tool', category: 'convert', path: '/convert/data-masking', desc: '手机号、身份证号、姓名、邮箱、银行卡一键掩码脱敏', descEn: 'One-click masking of phone numbers, ID numbers, names, emails and bank cards', icon: '🎭' },
  { id: 'properties-convert', name: 'Properties / Unicode 互转', nameEn: 'Properties / Unicode Converter', category: 'convert', path: '/convert/properties', desc: 'Java .properties 配置文件中文与 \\u 转义互转', descEn: 'Convert between Java .properties Chinese values and \\u escapes', icon: '☕' },
  { id: 'html-markdown', name: 'HTML 与 Markdown 互转', nameEn: 'HTML / Markdown Converter', category: 'convert', path: '/convert/html-markdown', desc: 'HTML 富文本标记与 Markdown 语法双向转换', descEn: 'Bidirectional conversion between HTML rich text and Markdown', icon: '📝' },
  { id: 'coordinate-convert', name: '经纬度坐标系转换', nameEn: 'Coordinate System Converter', category: 'convert', path: '/convert/coordinate', desc: 'WGS84、GCJ-02 (高德/腾讯)、BD-09 (百度) 互转', descEn: 'Convert between WGS84, GCJ-02 (AMap/Tencent) and BD-09 (Baidu)', icon: '🗺️' },
  { id: 'ip2int', name: 'IP 与 32位整数互转', nameEn: 'IP / 32-bit Integer Converter', category: 'convert', path: '/convert/ip2int', desc: 'IPv4 点分十进制地址与 32 位整型互转', descEn: 'Convert between dotted-decimal IPv4 and 32-bit integers', icon: '🌐' },
  { id: 'html-js', name: 'HTML 与 JS 字符串互转', nameEn: 'HTML / JS String Converter', category: 'convert', path: '/convert/html-js', desc: 'HTML 源码快速转换为 JS 变量拼接与反向还原', descEn: 'Convert HTML source to JS variable concatenation and back', icon: '📜' },
  { id: 'html-ubb', name: 'HTML 与 UBB 代码互转', nameEn: 'HTML / UBB Converter', category: 'convert', path: '/convert/html-ubb', desc: '论坛 UBB 代码与 HTML 标签双向转换及实时渲染预览', descEn: 'Convert between forum UBB code and HTML tags with live preview', icon: '💬' },
  { id: 'ascii-art', name: '字符线条艺术字', nameEn: 'ASCII Art Text', category: 'convert', path: '/convert/ascii-art', desc: '将英文和数字转换为经典 ASCII 字符线条艺术字', descEn: 'Turn letters and numbers into classic ASCII art', icon: '🎨' },
  { id: 'short-url', name: '在线短网址生成与还原', nameEn: 'Short URL Generator', category: 'convert', path: '/convert/shorturl', desc: '长链接快速缩短为简易短网址，并支持短网址防钓鱼安全反查', descEn: 'Shorten long links and safely reverse-check short URLs against phishing', icon: '🔗' },
  { id: 'i18n-convert', name: 'i18n 属性文件互转', nameEn: 'i18n Properties Converter', category: 'convert', path: '/convert/i18n', desc: '前端 vue-i18n/react-i18next 的 JSON 扁平键值对与 Java Properties 互转', descEn: 'Convert flat JSON key-values (vue-i18n/react-i18next) to Java Properties and back', icon: '🌐' },
  { id: 'gif2frame', name: '在线 GIF 转成帧图片', nameEn: 'GIF to Frames', category: 'convert', path: '/convert/gif2frame', desc: '纯前端本地解析 GIF 动图并提取所有分帧', descEn: 'Parse GIF in-browser and extract every frame locally', icon: '🎞️' },
  { id: 'video2frame', name: '在线视频转成帧图片', nameEn: 'Video to Frames', category: 'convert', path: '/convert/video2frame', desc: '纯前端提取视频关键帧，支持自定义提取频率', descEn: 'Extract video keyframes in-browser with configurable frequency', icon: '🎬' },
  { id: 'sqlconvertsql', name: 'SQL 转 SQL (不同数据库互转)', nameEn: 'SQL to SQL (Cross-DB Converter)', category: 'convert', path: '/convert/sqlconvertsql', desc: '支持 Oracle、MySQL、MSSQL、PostgreSQL、MongoDB、SQLite 语法一键互相转换', descEn: 'Convert syntax among Oracle, MySQL, MSSQL, PostgreSQL, MongoDB, SQLite', icon: '🔁' },

  { id: 'px-to-rem', name: 'PX 与 REM / EM 换算', nameEn: 'PX to REM / EM Converter', category: 'frontend', path: '/uitools/px-to-rem', desc: '输入 PX 实时计算 REM，支持整段 CSS 样式代码批量换算', descEn: 'Convert PX to REM live, with batch conversion of whole CSS blocks', icon: '📏' },
  { id: 'safe-color', name: 'WEB 安全色速查表', nameEn: 'Web Safe Colors', category: 'frontend', path: '/uitools/safe-color', desc: '216 种跨平台标准网页安全色调色板', descEn: '216 cross-platform standard web-safe color palette', icon: '🌈' },
  { id: 'device-screen', name: '主流设备屏幕尺寸规范', nameEn: 'Device Screen Sizes', category: 'frontend', path: '/uitools/device-screen', desc: 'iPhone、iPad、主流 Android 旗舰屏幕物理与逻辑分辨率、DPR 速查', descEn: 'Physical/logical resolution and DPR cheat sheet for iPhone, iPad and Android flagships', icon: '🖥️' },
  { id: 'pornhub-logo', name: 'Pornhub 风格 Logo 生成器', nameEn: 'Pornhub-style Logo Generator', category: 'frontend', path: '/uitools/pornhub-logo', desc: '黑底白字加圆角橙黄背景标志性双段 Logo 在线生成与高清 PNG 下载', descEn: 'Generate the iconic two-segment black-on-orange logo and download HD PNG', icon: '🟧' },
  { id: 'youtube-logo', name: 'YouTube 风格 Logo 生成器', nameEn: 'YouTube-style Logo Generator', category: 'frontend', path: '/uitools/youtube-logo', desc: 'YouTube 经典红底白字矩形圆角 Logo 在线定制与 PNG 图片导出', descEn: 'Customize the classic rounded red-on-white YouTube logo and export PNG', icon: '🟥' },
  { id: 'image-invert', name: '图片反相反色在线工具', nameEn: 'Image Invert Tool', category: 'frontend', path: '/uitools/image-invert', desc: '纯前端本地 Canvas 极速像素颜色反转，生成底片负片效果并支持下载', descEn: 'Invert pixel colors instantly on Canvas in-browser and download the negative', icon: '🌓' },
  { id: 'border-radius-image', name: '在线生成圆角图片与头像', nameEn: 'Rounded Corner / Avatar Maker', category: 'frontend', path: '/uitools/border-radius-image', desc: '图片快速裁切为自定义圆角矩形或圆形头像，输出透明通道 PNG', descEn: 'Crop images to rounded rectangles or circular avatars with transparent PNG output', icon: '🔘' },
  { id: 'ico-maker', name: 'ICO 图标制作与转换', nameEn: 'ICO Maker / Converter', category: 'frontend', path: '/uitools/ico-maker', desc: '将普通图片转换为包含多尺寸的标准 favicon.ico', descEn: 'Convert ordinary images into multi-size standard favicon.ico', icon: '🌟' },
  { id: 'image-process', name: '图片综合处理工作台', nameEn: 'Image Processing Workbench', category: 'frontend', path: '/uitools/image-process', desc: '纯前端本地图片裁剪、质量压缩、格式转换与尺寸大小调整', descEn: 'Local image crop, quality compress, format convert and resize, all in-browser', icon: '🖼️' },
  { id: 'svg-editor', name: 'SVG 在线编辑与实时预览', nameEn: 'SVG Editor & Live Preview', category: 'frontend', path: '/uitools/svg-editor', desc: 'SVG 矢量源码实时编辑排版、即时画布缩放预览', descEn: 'Edit SVG source with real-time scaled canvas preview', icon: '📐' },
  { id: 'openweb', name: '弹出窗口 (window.open) 生成器', nameEn: 'window.open Generator', category: 'frontend', path: '/uitools/openweb', desc: '图形化配置弹出窗口尺寸、位置与参数，生成原生 window.open 调用代码', descEn: 'Configure popup size, position and params visually to generate native window.open code', icon: '🪟' },

  { id: 'sql-param-replace', name: 'SQL 占位符参数还原', nameEn: 'SQL Placeholder Replacer', category: 'backend', path: '/backend/sql-param-replace', desc: '自动将 MyBatis / JPA 日志中的 Preparing 问号 SQL 与 Parameters 参数还原为可执行 SQL', descEn: 'Rebuild executable SQL from MyBatis/JPA "Preparing ...?" logs and Parameters', icon: '🧩' },
  { id: 'properties-yaml', name: 'Properties 与 YAML 互转', nameEn: 'Properties / YAML Converter', category: 'backend', path: '/backend/properties-yaml', desc: 'Spring Boot 配置文件 application.properties 与 application.yml 双向转换', descEn: 'Convert between Spring Boot application.properties and application.yml', icon: '🍃' },
  { id: 'sql2pojo', name: 'SQL 建表转 POJO / C# 实体类', nameEn: 'SQL to POJO / C# Entity', category: 'backend', path: '/backend/sql2pojo', desc: '解析 MySQL CREATE TABLE 建表语句，自动生成 Lombok/JPA 或 C# Model 实体类', descEn: 'Parse MySQL CREATE TABLE and generate Lombok/JPA or C# Model classes', icon: '🧱' },
  { id: 'install-jar', name: 'Maven 本地 Jar 安装命令生成', nameEn: 'Maven Install-Jar Command', category: 'backend', path: '/backend/installjar', desc: '快速生成 mvn install:install-file 命令行及对应 pom.xml 的 dependency 依赖', descEn: 'Generate the mvn install:install-file command and matching pom.xml dependency', icon: '☕' },
  { id: 'sqlview', name: '数据库插入、修改字段视图', nameEn: 'SQL INSERT/UPDATE Field View', category: 'backend', path: '/backend/sqlview', desc: '可视化解析并对应 INSERT / UPDATE 复杂语句的字段与数值', descEn: 'Visually parse INSERT/UPDATE statements into readable fields and values', icon: '📋' },

  { id: 'websocket-tester', name: 'WebSocket 在线测试', nameEn: 'WebSocket Tester', category: 'network', path: '/httputil/websocket', desc: '在线测试 ws:// 或 wss:// 连接、发送消息与历史收发流', descEn: 'Test ws:// or wss:// connections, send messages and review history', icon: '🔌' },
  { id: 'subnet-calc', name: 'IP 与子网掩码计算', nameEn: 'IP / Subnet Calculator', category: 'network', path: '/httputil/subnet', desc: 'CIDR 掩码计算、网络地址、广播地址、可用主机数与范围计算', descEn: 'CIDR masks, network address, broadcast address, usable hosts and ranges', icon: '💻' },
  { id: 'client-info', name: '浏览器与客户端详细信息', nameEn: 'Browser & Client Info', category: 'network', path: '/httputil/clientinfo', desc: '操作系统、屏幕物理/逻辑分辨率、DPR、网络及 WebGL GPU 硬件信息检测', descEn: 'Detect OS, physical/logical resolution, DPR, network and WebGL GPU info', icon: '🖥️' },
  { id: 'get-ip', name: '获取我的外网 IP', nameEn: 'My Public IP', category: 'network', path: '/httputil/getip', desc: '快速获取当前公网 IPv4 / IPv6 地址及地理位置运营商信息', descEn: 'Get current public IPv4/IPv6 address with geo and ISP info', icon: '📍' },
  { id: 'query-ip', name: 'IP 归属地与运营商查询', nameEn: 'IP Location & ISP Lookup', category: 'network', path: '/httputil/queryip', desc: '输入任意 IPv4 地址，即时查询物理地理位置、经纬度、ASN 编号与服务商', descEn: 'Look up geo location, lat/lng, ASN and ISP for any IPv4 address', icon: '🗺️' },
  { id: 'spider-check', name: '搜索引擎蜘蛛 IP 识别', nameEn: 'Search Engine Spider Detection', category: 'network', path: '/httputil/spider', desc: '百度、谷歌、必应、搜狗、360 等蜘蛛 IP 匹配与反向 DNS 鉴别指南', descEn: 'Identify Baidu/Google/Bing/Sogou/360 spider IPs via matching and reverse DNS', icon: '🕷️' },
  { id: 'cdn-check', name: 'CDN 节点 IP 识别工具', nameEn: 'CDN Node Detection', category: 'network', path: '/httputil/cdn-check', desc: '快速甄别目标 IP 是否属于阿里云、腾讯云、Cloudflare 等 CDN 边缘节点', descEn: 'Check if an IP belongs to Aliyun, Tencent Cloud, Cloudflare and other CDN edges', icon: '🚀' },
  { id: 'ssl-cert', name: 'SSL 证书过期时间查询', nameEn: 'SSL Certificate Expiry Check', category: 'network', path: '/httputil/ssl-cert', desc: '在线探测目标 HTTPS 域名的真实 TLS 证书、颁发机构、到期失效时间与剩余天数', descEn: 'Probe a domain\'s real TLS certificate, issuer, expiry date and remaining days', icon: '🔒' },

  { id: 'user-agent', name: '常用 User-Agent 库与解析', nameEn: 'User-Agent Library & Parser', category: 'docs', path: '/docs/user-agent', desc: '当前浏览器 UA 检测，及 iOS/Android/微信/爬虫蜘蛛高频 UA 速查', descEn: 'Detect the current UA and browse high-frequency iOS/Android/WeChat/crawler UAs', icon: '🌐' },
  { id: 'http-status', name: 'HTTP 状态码速查表', nameEn: 'HTTP Status Code Cheat Sheet', category: 'docs', path: '/docs/http-status', desc: '完整 1xx-5xx HTTP 响应状态码速查与常见排查原因', descEn: 'Full 1xx-5xx HTTP status code reference with common causes', icon: '🚦' },
  { id: 'port-doc', name: '常用网络端口对照表', nameEn: 'Common Network Ports', category: 'docs', path: '/docs/port', desc: 'Web、数据库、Redis、RabbitMQ、Nacos 等常用服务默认端口速查', descEn: 'Default ports for web, databases, Redis, RabbitMQ, Nacos and more', icon: '🚪' },
  { id: 'ascii-doc', name: 'ASCII 码完整对照表', nameEn: 'ASCII Table', category: 'docs', path: '/docs/ascii', desc: '0-127 完整 ASCII 码，十进制、十六进制、二进制与字符含义对照', descEn: 'Complete 0-127 ASCII table: decimal, hex, binary and character meanings', icon: '🔣' },
  { id: 'http-content', name: 'HTTP Content-Type 对照表', nameEn: 'HTTP Content-Type Cheat Sheet', category: 'docs', path: '/docs/http-content', desc: '常见 MIME 类型与 Content-Type 对照速查', descEn: 'Common MIME types and Content-Type quick reference', icon: '📋' },
  { id: 'android-manifest', name: 'AndroidManifest 常用权限字典', nameEn: 'AndroidManifest Permissions', category: 'docs', path: '/docs/android-manifest', desc: 'Android 开发常用权限声明与用途说明速查', descEn: 'Quick reference of common Android permission declarations and purposes', icon: '🤖' },
  { id: 'dev-env', name: '开发环境依赖', nameEn: 'Dev Environment Dependencies', category: 'docs', path: '/docs/dev-env', desc: '常用开发环境搭建与依赖配置速查', descEn: 'Quick reference for common dev environment setup and dependencies', icon: '⚙️' },

  { id: 'chatgpt-tokens', name: 'AI / ChatGPT Token 计数估算', nameEn: 'AI / ChatGPT Token Counter', category: 'othertools', path: '/othertools/chatgpt-tokens', desc: '估算文本的 Token 数量，支持多种模型', descEn: 'Estimate token counts for text with multiple model options', icon: '🤖' },
  { id: 'cron', name: 'Cron 表达式生成/校验', nameEn: 'Cron Generator / Validator', category: 'othertools', path: '/othertools/cron', desc: '可视化生成 Cron 表达式，支持校验与下次执行时间预览', descEn: 'Visually build Cron expressions with validation and next-run preview', icon: '⏰' },
  { id: 'mdeditor', name: 'Markdown 分屏编辑器', nameEn: 'Markdown Live Editor', category: 'othertools', path: '/othertools/mdeditor', desc: 'Markdown 实时预览编辑', descEn: 'Split-screen Markdown editing with live preview', icon: '📝' },
  { id: 'keycode', name: '键盘按键 KeyCode 速查', nameEn: 'Keyboard KeyCode Reference', category: 'othertools', path: '/othertools/keycode', desc: '键盘按键与 keyCode 对照表', descEn: 'Key-to-keyCode lookup table', icon: '⌨️' },
  { id: 'hotnews', name: '今日热榜 · 实时聚焦', nameEn: 'Hot News · Real-time Trending', category: 'othertools', path: '/othertools/hotnews', desc: '聚合 36氪、掘金、知乎、少数派 等平台实时热点', descEn: 'Aggregate real-time trending from 36Kr, Juejin, Zhihu, SSPAI and more', icon: '🔥' },
  { id: 'diff', name: '文本差异对比 (Diff)', nameEn: 'Text Diff', category: 'othertools', path: '/othertools/diff', desc: '两段文本逐行对比，高亮差异', descEn: 'Line-by-line text comparison with highlighted differences', icon: '🔀' },
  { id: 'regex', name: '正则表达式测试', nameEn: 'Regex Tester', category: 'othertools', path: '/othertools/regex', desc: '在线正则表达式匹配测试与分组提取', descEn: 'Online regex matching tests and group extraction', icon: '🔍' },
  { id: 'barcode', name: '条形码在线生成器', nameEn: 'Barcode Generator', category: 'othertools', path: '/othertools/barcode', desc: '生成 Code128、EAN-13 等条形码图片', descEn: 'Generate Code128, EAN-13 and other barcodes', icon: '📊' },
  { id: 'dir-explorer', name: '本地目录文件浏览器', nameEn: 'Local Directory Explorer', category: 'othertools', path: '/filetool/dir-explorer', desc: '纯前端本地目录树浏览与文件管理', descEn: 'Browse and manage local directory trees in-browser', icon: '📁' },
  { id: 'deduplicate', name: '文本去重与多行排序', nameEn: 'Deduplicate & Sort Lines', category: 'othertools', path: '/othertools/deduplicate', desc: '多行文本去重、排序与统计', descEn: 'Deduplicate, sort and count multi-line text', icon: '🧹' },
  { id: 'str-split', name: '字符串批量分割提取', nameEn: 'String Splitter', category: 'othertools', path: '/othertools/str-split', desc: '按分隔符批量分割字符串并提取', descEn: 'Split strings by separators and extract in batch', icon: '✂️' },
  { id: 'regex-create', name: '常用正则表达式代码生成', nameEn: 'Regex Code Generator', category: 'othertools', path: '/othertools/regex-create', desc: '常用正则表达式模板与多语言代码生成', descEn: 'Common regex templates and multi-language code generation', icon: '📝' },
  { id: 'stats', name: '文本深度统计与字数分析', nameEn: 'Text Stats & Word Count', category: 'othertools', path: '/othertools/stats', desc: '字符数、单词数、行数、段落数等多维度统计', descEn: 'Multi-dimensional stats: characters, words, lines, paragraphs', icon: '📊' },

  { id: 'c0xff', name: '数据 0xFF 位运算换算', nameEn: '0xFF Bitwise Math', category: 'iot', path: '/iot/c0xff', desc: '位运算与掩码计算工具', descEn: 'Bitwise operations and mask calculation tool', icon: '🔧' },
  { id: 'hexparse', name: '物联网 16 进制报文解析', nameEn: 'IoT Hex Packet Parser', category: 'iot', path: '/iot/hexparse', desc: '解析物联网设备 16 进制通信报文', descEn: 'Parse 16-hex communication packets of IoT devices', icon: '📡' },

  { id: 'jsdec', name: 'JS 全能解密 (jsdec)', nameEn: 'JS Deobfuscator (jsdec)', category: 'openplatform', path: '/ext/jsdec', desc: 'JavaScript 代码解密与反混淆', descEn: 'JavaScript code decryption and deobfuscation', icon: '🔓' },
  { id: 'jsobfuscator', name: 'JavaScript 代码混淆器', nameEn: 'JavaScript Obfuscator', category: 'openplatform', path: '/ext/jsobfuscator', desc: 'JavaScript 代码混淆加密保护', descEn: 'Obfuscate and protect JavaScript code', icon: '🔐' },
  { id: 'qq-tools', name: 'QQ 互联 API 调试工具', nameEn: 'QQ Connect API Debugger', category: 'openplatform', path: '/ext/qq-tools', desc: 'QQ 互联 API 在线调试', descEn: 'Online debugging for QQ Connect API', icon: '🐧' },
  { id: 'somd5', name: 'SOMD5 在线彩虹表解密', nameEn: 'SOMD5 Rainbow Table Lookup', category: 'openplatform', path: '/ext/somd5', desc: 'MD5 在线彩虹表查询解密', descEn: 'MD5 rainbow-table lookup decryption', icon: '🌈' },
  { id: 'ssleye', name: 'SSL 协议套件探测', nameEn: 'SSL/TLS Suite Probe', category: 'openplatform', path: '/ext/ssleye', desc: '探测目标服务器 SSL/TLS 协议版本与加密套件', descEn: 'Probe a server\'s SSL/TLS protocol versions and cipher suites', icon: '🔒' },
  { id: 'tb-api', name: '淘宝 API 测试工具', nameEn: 'Taobao API Tester', category: 'openplatform', path: '/ext/tb-api', desc: '淘宝开放平台 API 在线测试', descEn: 'Online testing for Taobao Open Platform API', icon: '🛒' },
  { id: 'tb-oauth', name: '淘宝 OAuth2.0 测试工具', nameEn: 'Taobao OAuth 2.0 Tester', category: 'openplatform', path: '/ext/tb-oauth', desc: '淘宝 OAuth2.0 授权流程在线调试', descEn: 'Debug the Taobao OAuth 2.0 authorization flow', icon: '🔑' },
  { id: 'alipay-risk', name: '支付宝 API 风险与安全检测工具', nameEn: 'Alipay API Risk Check', category: 'openplatform', path: '/ext/alipay-risk', desc: '支付宝 API 风险检测与安全扫描', descEn: 'Risk detection and security scan for Alipay API', icon: '🛡️' },
  { id: 'qywx-debug', name: '企业微信 (企业号) 调试工具', nameEn: 'WeCom (WeChat Work) Debugger', category: 'openplatform', path: '/ext/qywx-debug', desc: '企业微信 API 在线调试', descEn: 'Online debugging for WeCom API', icon: '💼' },
  { id: 'weibo-console', name: '新浪微博 API 工具台', nameEn: 'Weibo API Console', category: 'openplatform', path: '/ext/weibo-console', desc: '新浪微博 API 在线调试', descEn: 'Online debugging for Sina Weibo API', icon: '📱' },
  { id: 'wxcard-sign', name: '微信卡券 JSAPI 签名校验工具', nameEn: 'WeChat Card JSAPI Sign', category: 'openplatform', path: '/ext/wxcard-sign', desc: '微信卡券 JSAPI 签名生成与校验', descEn: 'Generate and verify WeChat card JSAPI signatures', icon: '🎫' },
  { id: 'tb-props', name: '淘宝商品属性工具', nameEn: 'Taobao Product Attributes', category: 'openplatform', path: '/ext/tb-props', desc: '淘宝商品属性查询与解析', descEn: 'Query and parse Taobao product attributes', icon: '📦' },
  { id: 'alipay-log', name: '支付宝联调日志排查', nameEn: 'Alipay Integration Logs', category: 'openplatform', path: '/ext/alipay-log', desc: '支付宝联调日志分析与排查', descEn: 'Analyze and troubleshoot Alipay integration logs', icon: '📋' },
  { id: 'alipay-troubleshoot', name: '支付宝开发者自助排查工具', nameEn: 'Alipay Self-service Troubleshooting', category: 'openplatform', path: '/ext/alipay-troubleshoot', desc: '支付宝开放平台常见问题自助排查', descEn: 'Self-service troubleshooting for common Alipay Open Platform issues', icon: '🔧' },
  { id: 'wechat-debug', name: '微信公众平台在线接口调试', nameEn: 'WeChat Official API Debugger', category: 'openplatform', path: '/ext/wechat-debug', desc: '微信公众平台 API 在线调试', descEn: 'Online debugging for WeChat Official Account API', icon: '💬' },
  { id: 'wxjs-sign', name: '微信 JS 接口签名校验工具', nameEn: 'WeChat JS-SDK Sign', category: 'openplatform', path: '/ext/wxjs-sign', desc: '微信 JS-SDK 签名生成与校验', descEn: 'Generate and verify WeChat JS-SDK signatures', icon: '✅' },
  { id: 'wxpay-jsapi-sign', name: '微信支付接口签名校验工具', nameEn: 'WeChat Pay JSAPI Sign', category: 'openplatform', path: '/ext/wxpay-jsapi-sign', desc: '微信支付 JSAPI 签名生成与校验', descEn: 'Generate and verify WeChat Pay JSAPI signatures', icon: '💰' },
  { id: 'wxpay-verify', name: '微信公众平台支付接口调试', nameEn: 'WeChat Pay Debugger', category: 'openplatform', path: '/ext/wxpay-verify', desc: '微信支付接口在线调试', descEn: 'Online debugging for WeChat Pay API', icon: '💳' },
  { id: 'wechat-swagger', name: '微信服务端接口文档及调试工具', nameEn: 'WeChat Server API Doc & Debug', category: 'openplatform', path: '/ext/wechat-swagger', desc: '微信服务端 API 文档与在线调试', descEn: 'WeChat server-side API docs and online debugging', icon: '📖' },

  { id: 'doc-bootstrap', name: 'Bootstrap 3 组件文档', nameEn: 'Bootstrap 3 Docs', category: 'resources', path: '/ext/doc-bootstrap', desc: 'Bootstrap 3 中文文档速查', descEn: 'Bootstrap 3 Chinese quick reference', icon: '📖' },
  { id: 'fontawesome', name: 'FontAwesome 矢量图标库', nameEn: 'FontAwesome Icons', category: 'resources', path: '/ext/fontawesome', desc: 'FontAwesome 图标库浏览与代码生成', descEn: 'Browse FontAwesome and generate icon code', icon: '🎨' },
  { id: 'h5-maker', name: 'H5 模板在线制作', nameEn: 'H5 Template Maker', category: 'resources', path: '/ext/h5-maker', desc: 'H5 页面在线制作工具', descEn: 'Online H5 page maker', icon: '📱' },
  { id: 'runjs', name: 'RunJS 在线前端编辑器', nameEn: 'RunJS Online Editor', category: 'resources', path: '/ext/runjs', desc: '在线 HTML/CSS/JS 编辑与运行', descEn: 'Edit and run HTML/CSS/JS online', icon: '▶️' },
  { id: 'doc-vue2', name: 'Vue.js 官方中文文档', nameEn: 'Vue.js Official Docs', category: 'resources', path: '/ext/doc-vue2', desc: 'Vue 2.x 中文文档速查', descEn: 'Vue 2.x Chinese documentation quick reference', icon: '💚' },
  { id: 'doc-wxpay-openapi', name: '微信支付 OpenAPI 库文档', nameEn: 'WeChat Pay OpenAPI Docs', category: 'resources', path: '/ext/doc-wxpay-openapi', desc: '微信支付 OpenAPI 文档', descEn: 'WeChat Pay OpenAPI documentation', icon: '📖' },
  { id: 'doc-wxpay-v3', name: '微信支付 V3 官方文档', nameEn: 'WeChat Pay V3 Docs', category: 'resources', path: '/ext/doc-wxpay-v3', desc: '微信支付 V3 接口文档', descEn: 'WeChat Pay V3 API documentation', icon: '📖' },
  { id: 'doc-wxmini-api', name: '微信小程序 API 开发文档', nameEn: 'WeChat Mini Program API Docs', category: 'resources', path: '/ext/doc-wxmini-api', desc: '微信小程序 API 文档速查', descEn: 'WeChat Mini Program API reference', icon: '📖' },
  { id: 'doc-alipay-sp', name: '支付宝服务商文档', nameEn: 'Alipay ISV Docs', category: 'resources', path: '/ext/doc-alipay-sp', desc: '支付宝服务商开发文档', descEn: 'Alipay service-provider development docs', icon: '📖' },
  { id: 'doc-wxpay-all', name: '微信支付最全文档', nameEn: 'WeChat Pay Complete Docs', category: 'resources', path: '/ext/doc-wxpay-all', desc: '微信支付全量接口文档', descEn: 'Full WeChat Pay interface documentation', icon: '📖' },
  { id: 'doc-wxpay-sp', name: '微信支付服务商文档', nameEn: 'WeChat Pay ISV Docs', category: 'resources', path: '/ext/doc-wxpay-sp', desc: '微信支付服务商模式文档', descEn: 'WeChat Pay service-provider mode docs', icon: '📖' },
  { id: 'doc-alipay-store', name: '支付宝智慧门店文档', nameEn: 'Alipay Smart Retail Docs', category: 'resources', path: '/ext/doc-alipay-store', desc: '支付宝智慧门店开发文档', descEn: 'Alipay smart-store development docs', icon: '📖' },
  { id: 'doc-wxmini-cfg', name: '微信小程序配置指南', nameEn: 'WeChat Mini Program Config', category: 'resources', path: '/ext/doc-wxmini-cfg', desc: '微信小程序配置文件说明', descEn: 'WeChat Mini Program configuration guide', icon: '📖' },
  { id: 'doc-taobao', name: '淘宝开放平台开发文档', nameEn: 'Taobao Open Platform Docs', category: 'resources', path: '/ext/doc-taobao', desc: '淘宝开放平台 API 文档', descEn: 'Taobao Open Platform API documentation', icon: '📖' },
  { id: 'doc-tencent', name: '腾讯开放平台官方文档', nameEn: 'Tencent Open Platform Docs', category: 'resources', path: '/ext/doc-tencent', desc: '腾讯开放平台开发文档', descEn: 'Tencent Open Platform development docs', icon: '📖' },
  { id: 'doc-wxoffi', name: '微信公众平台开发文档', nameEn: 'WeChat Official Development Docs', category: 'resources', path: '/ext/doc-wxoffi', desc: '微信公众平台开发文档', descEn: 'WeChat Official Account development docs', icon: '📖' },
  { id: 'doc-alipay', name: '支付宝开放平台开发文档', nameEn: 'Alipay Open Platform Docs', category: 'resources', path: '/ext/doc-alipay', desc: '支付宝开放平台开发文档', descEn: 'Alipay Open Platform development docs', icon: '📖' },
  { id: 'font-gen', name: '奇异花样字体生成器', nameEn: 'Fancy Font Generator', category: 'resources', path: '/ext/font-gen', desc: '在线花样字体生成', descEn: 'Generate fancy stylized fonts online', icon: '🔤' },
  { id: 'iconfont', name: '阿里巴巴矢量图标库 (Iconfont)', nameEn: 'Alibaba Iconfont Library', category: 'resources', path: '/ext/iconfont', desc: 'Iconfont 图标库浏览与代码生成', descEn: 'Browse Iconfont and generate icon code', icon: '🎨' },
  { id: 'tb-error', name: '淘宝错误码查询工具', nameEn: 'Taobao Error Code Lookup', category: 'resources', path: '/ext/tb-error', desc: '淘宝开放平台错误码查询', descEn: 'Look up Taobao Open Platform error codes', icon: '❗' },
]

export function getToolsByCategory(categoryId) {
  return tools.filter(t => t.category === categoryId)
}

export function getCategory(categoryId) {
  return categories.find(c => c.id === categoryId)
}

export function getToolByPath(path) {
  return tools.find(t => t.path === path)
}

export function searchTools(keyword) {
  const kw = keyword.toLowerCase().trim()
  if (!kw) return []
  return tools.filter(t =>
    ['name', 'nameEn', 'desc', 'descEn'].some(f => (t[f] || '').toLowerCase().includes(kw)) ||
    t.path.toLowerCase().includes(kw)
  )
}