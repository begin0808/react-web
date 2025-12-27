import React, { useState, useEffect } from 'react';
import { Terminal, Copy, Check, ChevronRight, Cpu, Globe, Rocket, Github, Layers, Code, Save, Zap, AlertTriangle, Wrench, XCircle, Info, ExternalLink, AlertCircle, FileJson, FileCode, Command, ArrowUp } from 'lucide-react';

// --- Data Content from the User's Document & CSV ---
// Added 'mode' to code blocks: 'command' | 'full' | 'partial'
const docData = [
  {
    id: 1,
    title: "前置準備",
    subtitle: "SYSTEM INITIALIZATION",
    icon: <Cpu className="w-6 h-6" />,
    content: [
      {
        type: "text",
        text: "在開始執行任務前，請確保您的終端設備已安裝以下核心模組："
      },
      {
        type: "checklist",
        items: [
          { 
            label: "Node.js (LTS 版本)", 
            desc: "核心執行環境", 
            url: "https://nodejs.org/",
            details: "★ 請下載左邊的 **LTS (長期維護版)**，比 Current 版更穩定。\n★ 安裝過程選項全部維持預設，一路按 **Next** 到底即可。"
          },
          { 
            label: "VS Code", 
            desc: "程式碼編輯器", 
            url: "https://code.visualstudio.com/",
            details: "★ 最熱門的開發工具。\n★ 安裝後建議點擊左側「擴充套件」圖示，搜尋 **Chinese** 安裝繁體中文語言包。"
          },
          { 
            label: "Git", 
            desc: "版本控制工具", 
            url: "https://git-scm.com/",
            details: "★ Windows 用戶請下載 **64-bit Git for Windows Setup**。\n★ 安裝過程會有很多複雜選項，**請全部維持預設值**，一直按 Next 直到完成。"
          },
          { 
            label: "GitHub 帳號", 
            desc: "已註冊並驗證 Email", 
            url: "https://github.com/",
            details: "★ 註冊後，**務必去信箱收取驗證信**並啟用帳號。\n★ 若未驗證 Email，稍後將無法建立 Repository。"
          }
        ]
      }
    ]
  },
  {
    id: 2,
    title: "建立新專案",
    subtitle: "INITIATE PROJECT",
    icon: <Layers className="w-6 h-6" />,
    content: [
      {
        type: "step",
        stepTitle: "1. 建立 GitHub 倉庫 (Repository)",
        text: (
          <>
            登入 <a href="https://github.com" target="_blank" rel="noreferrer" className="text-cyan-400 hover:text-cyan-300 hover:underline border-b border-cyan-500/30">GitHub</a>，點擊右上角 + -&gt; New repository。<br/>
            Repository name: 輸入專案名稱 (例如 【專案名稱】)。(建議全小寫，無空格)<br/>
            設定為 Public，點擊 Create repository。<br/>
            ⚠️ 保留網頁不要關掉，稍後需要 HTTPS 網址。
          </>
        )
      },
      {
        type: "step",
        stepTitle: "2. 在本機建立 Vite 專案",
        text: "打開 VS Code，開啟終端機 (Terminal Ctrl + `)，依序執行："
      },
      {
        type: "code",
        lang: "bash",
        mode: "command",
        code: `# 1. 建立專案 (將 【專案名稱】 換成你的專案名稱)
npm create vite@latest 【專案名稱】 -- --template react

# 2. 進入資料夾 (★超級重要)
cd 【專案名稱】

# 3. 安裝基礎依賴
npm install`
      },
      {
        type: "warning",
        text: "如果出現 Use rolldown-vite? 請選 No。\nSelect a variant 請選 JavaScript。"
      }
    ]
  },
  {
    id: 3,
    title: "環境設定",
    subtitle: "INSTALL MODULES",
    icon: <Zap className="w-6 h-6" />,
    content: [
      {
        type: "step",
        stepTitle: "1. 安裝 Tailwind CSS",
        text: "必須指定安裝 v3 版本，避免 v4 預覽版導致錯誤。"
      },
      {
        type: "code",
        lang: "bash",
        mode: "command",
        code: `npm install -D tailwindcss@3.4.17 postcss autoprefixer
npx tailwindcss init -p`
      },
      {
        type: "step",
        stepTitle: "2. 安裝功能套件 & 發布工具",
        text: "安裝圖示庫與 GitHub Pages 發布工具。"
      },
      {
        type: "code",
        lang: "bash",
        mode: "command",
        code: `# 安裝圖示庫
npm install lucide-react

# 安裝發布工具 (必裝)
npm install gh-pages --save-dev`
      },
      {
        type: "step",
        stepTitle: "3. 設定 Tailwind Config",
        text: "修改 tailwind.config.js，更新 content 區塊："
      },
      {
        type: "code",
        lang: "javascript",
        mode: "full", // Explicitly marking as safe to full replace
        code: `/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}`
      },
      {
        type: "step",
        stepTitle: "4. 設定 index.css",
        text: "清空 src/index.css，貼上以下內容："
      },
      {
        type: "code",
        lang: "css",
        mode: "full",
        code: `@tailwind base;
@tailwind components;
@tailwind utilities;`
      }
    ]
  },
  {
    id: 4,
    title: "專案配置",
    subtitle: "SYSTEM CONFIG",
    icon: <SettingsIcon />,
    content: [
      {
        type: "step",
        stepTitle: "1. 修改 vite.config.js",
        text: "設定 base 路徑，讓 GitHub Pages 讀取正確資源。"
      },
      {
        type: "code",
        lang: "javascript",
        mode: "full",
        code: `import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/【專案名稱】/',  // ★注意：改成你的 Repository 名稱，前後加斜線
})`
      },
      {
        type: "step",
        stepTitle: "2. 修改 package.json",
        text: "加入 homepage 與 scripts 指令。"
      },
      {
        type: "code",
        lang: "json",
        mode: "partial", // Important warning
        code: `{
  "name": "【專案名稱】",
  "homepage": "https://您的GitHub帳號.github.io/專案名稱",

  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "eslint .",
    "preview": "vite preview",
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}`
      },
      {
        type: "warning",
        text: "保留您原本的 lint 和 preview 指令，以及 dependencies 區塊。\n只需「加入」homepage 欄位與 predeploy/deploy 指令即可。"
      }
    ]
  },
  {
    id: 5,
    title: "開發與程式碼",
    subtitle: "DEVELOPMENT",
    icon: <Code className="w-6 h-6" />,
    content: [
      {
        type: "step",
        stepTitle: "1. 引入外部 CDN (選用)",
        text: "這是一個「相容性捷徑」。若您需要使用 MQTT.js 且想避免複雜的 Vite 設定，請在 index.html 加入此行。\n❌ 若您的專案不需要 MQTT，請直接跳過此步驟。"
      },
      {
        type: "code",
        lang: "html",
        mode: "partial",
        code: `<head>
  <!-- ... 其他 meta ... -->
  <title>Vite + React</title>
  
  <!-- ★★★ 僅在需要 MQTT 時加入 ★★★ -->
  <script src="https://unpkg.com/mqtt/dist/mqtt.min.js"></script>
</head>`
      },
      {
        type: "step",
        stepTitle: "2. 主程式開發 & 測試",
        text: "修改 src/App.jsx 貼入程式碼，接著在終端機啟動測試："
      },
      {
        type: "code",
        lang: "bash",
        mode: "command",
        code: `npm run dev`
      },
      {
        type: "text",
        text: "伺服器啟動後，請打開瀏覽器前往 http://localhost:5173 進行測試。"
      }
    ]
  },
  {
    id: 6,
    title: "首次發布",
    subtitle: "DEPLOYMENT V1",
    icon: <Rocket className="w-6 h-6" />,
    content: [
      {
        type: "step",
        stepTitle: "1. Git 初始化 (本機端)",
        text: "這些指令是通用的，您可以放心地一次複製貼上執行。"
      },
      {
        type: "code",
        lang: "bash",
        mode: "command",
        code: `git init
git add .
git commit -m "Initial commit"
git branch -M main`
      },
      {
        type: "step",
        stepTitle: "2. 連結 GitHub (★請先修改)",
        text: "⚠️ 這一步不能直接執行！請先複製到筆記本，將網址換成您自己的 Repository 網址後，再貼入終端機。"
      },
      {
        type: "code",
        lang: "bash",
        mode: "command",
        code: `git remote add origin https://github.com/您的帳號/專案名稱.git
git push -u origin main`
      },
      {
        type: "step",
        stepTitle: "3. 執行發布指令",
        text: "這會將編譯後的檔案推送到 gh-pages 分支。"
      },
      {
        type: "code",
        lang: "bash",
        mode: "command",
        code: `npm run deploy`
      }
    ]
  },
  {
    id: 7,
    title: "Pages 設定",
    subtitle: "FINAL CONFIG",
    icon: <Globe className="w-6 h-6" />,
    content: [
      {
        type: "text",
        text: "回到 GitHub 專案頁面 -> Settings -> Pages。"
      },
      {
        type: "checklist",
        items: [
          { label: "Build and deployment", desc: "選擇 Branch" },
          { label: "分支選擇", desc: "改為 gh-pages (不是 main)" },
          { label: "Save", desc: "儲存設定" }
        ]
      },
      {
        type: "text",
        text: "等待約 1~2 分鐘，重新整理，上方出現網址即成功！"
      },
      {
        type: "code",
        lang: "Success URL",
        mode: "command",
        code: "https://帳號名稱.github.io/專案名稱/"
      }
    ]
  },
  {
    id: 8,
    title: "日後更新",
    subtitle: "MAINTENANCE",
    icon: <Save className="w-6 h-6" />,
    content: [
      {
        type: "text",
        text: "修改程式碼後，執行以下兩步更新網站："
      },
      {
        type: "code",
        lang: "bash",
        mode: "command",
        code: `# 1. 同步原始碼
git add .
git commit -m "Update feature"
git push

# 2. 發布新版網頁
npm run deploy`
      }
    ]
  },
  {
    id: 9,
    title: "常見錯誤排除",
    subtitle: "SYSTEM DIAGNOSTICS",
    icon: <AlertTriangle className="w-6 h-6" />,
    content: [
      {
        type: "text",
        text: "如果任務執行失敗，請對照以下錯誤日誌進行修復："
      },
      {
        type: "troubleshooting",
        items: [
          {
            error: "remote: Repository not found.",
            cause: "GitHub 網站上還沒建立這個倉庫，或是網址打錯了。",
            solution: "確認 GitHub 網站上有建立該專案，且網址完全一致。"
          },
          {
            error: "npm error Missing script: \"build\"",
            cause: "package.json 裡的 build 指令不見了",
            solution: "補回 \"build\": \"vite build\""
          },
          {
            error: "[vite]: Rollup failed to resolve import \"lucide-react\"",
            cause: "程式碼用了套件但沒安裝",
            solution: "執行 npm install lucide-react"
          },
          {
            error: "網頁打開一片白 / 404",
            cause: "vite.config.js 的 base 路徑設錯",
            solution: "檢查 base 是否為 '/專案名稱/'"
          },
          {
            error: "網頁顯示 README 文件",
            cause: "GitHub Pages 設定錯分支",
            solution: "去 Settings -> Pages 把分支改成 gh-pages"
          },
          {
            error: "樣式沒出來 (只有醜醜的字)",
            cause: "Tailwind 沒設定好",
            solution: "檢查 tailwind.config.js 的 content 和 index.css 的 @tailwind"
          },
          {
            error: "PostCSS plugin error",
            cause: "安裝到 v4 版 Tailwind",
            solution: "執行 npm install -D tailwindcss@3.4.17 降版"
          },
          {
            error: "git push 錯誤 (refspec master)",
            cause: "本地分支名為 main 但推送到 master",
            solution: "改用 git push -u origin main"
          },
          {
            error: "找不到初始化存放庫按鈕",
            cause: "VS Code 未開啟專案資料夾",
            solution: "使用 File -> Open Folder 開啟 【專案名稱】 資料夾"
          }
        ]
      }
    ]
  }
];

// --- Sub-components ---

function SettingsIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.1a2 2 0 0 1-1-1.72v-.51a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>
  );
}

const CodeBlock = ({ code, lang, mode }) => {
  const [copied, setCopied] = useState(false);

  // Helper to determine badge style based on mode
  const getBadge = () => {
    switch (mode) {
      case 'full':
        return {
          icon: <FileCode size={12} />,
          text: "可全選複製 (Full Replace)",
          color: "text-green-400 border-green-500/30 bg-green-500/10"
        };
      case 'partial':
        return {
          icon: <FileJson size={12} />,
          text: "需部分修改 (Partial Update)",
          color: "text-amber-400 border-amber-500/30 bg-amber-500/10"
        };
      case 'command':
        return {
          icon: <Command size={12} />,
          text: "終端機指令 (Terminal)",
          color: "text-blue-400 border-blue-500/30 bg-blue-500/10"
        };
      default:
        return {
          icon: <Terminal size={12} />,
          text: "Source Code",
          color: "text-cyan-300"
        };
    }
  };

  const badge = getBadge();

  const handleCopy = () => {
    const textArea = document.createElement("textarea");
    textArea.value = code;
    
    textArea.style.position = "fixed";
    textArea.style.left = "-9999px";
    textArea.style.top = "0";
    document.body.appendChild(textArea);
    
    textArea.focus();
    textArea.select();

    try {
      const successful = document.execCommand('copy');
      if (successful) {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } else {
        console.error("Fallback copy failed.");
      }
    } catch (err) {
      console.error("Fallback copy error:", err);
    }
    
    document.body.removeChild(textArea);
  };

  return (
    <div className="relative mt-4 mb-6 group rounded-lg overflow-hidden border border-cyan-500/30 bg-black/80 shadow-[0_0_15px_rgba(34,211,238,0.1)]">
      {/* Header bar */}
      <div className="flex justify-between items-center px-4 py-2 bg-cyan-900/20 border-b border-cyan-500/20">
        <div className="flex items-center space-x-3">
          {/* Language Label */}
          <div className="flex items-center space-x-2">
             <span className="text-xs font-mono text-gray-400 uppercase">{lang}</span>
          </div>
          {/* Mode Badge */}
          {mode && (
            <div className={`flex items-center space-x-1 px-2 py-0.5 rounded text-[10px] font-bold border ${badge.color}`}>
              {badge.icon}
              <span>{badge.text}</span>
            </div>
          )}
        </div>
        <button 
          onClick={handleCopy}
          className="flex items-center space-x-1 text-xs text-cyan-400 hover:text-cyan-200 transition-colors"
        >
          {copied ? <Check size={14} /> : <Copy size={14} />}
          <span>{copied ? 'COPIED' : 'COPY'}</span>
        </button>
      </div>
      <div className="p-4 overflow-x-auto">
        <pre className="font-mono text-sm text-gray-300 leading-relaxed whitespace-pre">
          {code}
        </pre>
      </div>
    </div>
  );
};

const PhaseCard = ({ data, index }) => {
  return (
    <div className="relative w-full max-w-4xl mx-auto mb-16 animate-fade-in-up" style={{ animationDelay: `${index * 100}ms` }}>
      {/* Decorative connecting line */}
      <div className="absolute -left-4 md:-left-12 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-500/50 to-purple-500/50 hidden md:block"></div>
      <div className="absolute -left-[3.25rem] top-8 w-6 h-6 bg-black border-2 border-cyan-500 rounded-full flex items-center justify-center hidden md:flex z-10 shadow-[0_0_10px_#22d3ee]">
        <span className="text-[10px] text-cyan-300 font-bold">{data.id}</span>
      </div>

      <div className="relative bg-slate-900/60 backdrop-blur-md border border-cyan-500/30 rounded-xl p-6 md:p-8 hover:border-cyan-400/60 transition-all duration-300 shadow-[0_0_20px_rgba(0,0,0,0.5)] group overflow-hidden">
        {/* Holographic shine effect */}
        <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
        
        {/* Header */}
        <div className="flex items-start justify-between mb-6 border-b border-gray-700/50 pb-4">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-cyan-900/30 rounded-lg text-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.2)]">
              {data.icon}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-purple-300">
                {data.title}
              </h2>
              <p className="text-xs tracking-[0.2em] text-cyan-600 font-bold uppercase mt-1">
                PHASE {String(data.id).padStart(2, '0')} // {data.subtitle}
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-4">
          {data.content.map((item, idx) => (
            <div key={idx}>
              {item.type === 'text' && (
                <div className="text-gray-300 leading-relaxed mb-2">
                  {/* Handle React Nodes correctly if item.text is JSX */}
                  {React.isValidElement(item.text) ? item.text : <p>{item.text}</p>}
                </div>
              )}
              {item.type === 'checklist' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
                  {item.items.map((check, cIdx) => (
                    <div key={cIdx} className="flex items-start space-x-3 p-3 bg-black/40 rounded border border-gray-700/50 hover:border-cyan-500/30 transition-colors h-full">
                      <div className="mt-1 min-w-[16px] h-4 rounded-sm border border-cyan-500/50 bg-cyan-900/20 flex items-center justify-center">
                        <Check size={10} className="text-cyan-400" />
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-medium text-gray-200">
                          {check.url ? (
                            <a href={check.url} target="_blank" rel="noreferrer" className="text-cyan-400 hover:text-cyan-300 hover:underline flex items-center gap-1 group/link">
                              {check.label} <ExternalLink size={12} className="opacity-70 group-hover/link:opacity-100 transition-opacity" />
                            </a>
                          ) : (
                            check.label
                          )}
                        </div>
                        <div className="text-xs text-gray-500">{check.desc}</div>
                        {/* New Details Section */}
                        {check.details && (
                           <div className="mt-2 text-[11px] text-gray-400 bg-gray-800/50 p-2 rounded border-l-2 border-cyan-500/50 leading-relaxed whitespace-pre-line flex items-start gap-2">
                             <AlertCircle size={12} className="shrink-0 mt-0.5 text-cyan-500" />
                             <span>{check.details}</span>
                           </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {item.type === 'step' && (
                <div className="mt-6 mb-2">
                  <h3 className="flex items-center text-lg font-semibold text-white mb-2">
                    <ChevronRight size={18} className="text-purple-400 mr-2" />
                    {item.stepTitle}
                  </h3>
                  <div className="text-gray-400 text-sm pl-7">
                     {/* Handle React Nodes for steps too */}
                     {React.isValidElement(item.text) ? item.text : <p className="whitespace-pre-line">{item.text}</p>}
                  </div>
                </div>
              )}
              {item.type === 'code' && (
                <div className="pl-0 md:pl-6">
                  <CodeBlock code={item.code} lang={item.lang} mode={item.mode} />
                </div>
              )}
              {item.type === 'warning' && (
                <div className="mt-4 p-4 border-l-4 border-yellow-500 bg-yellow-500/10 rounded-r text-sm text-yellow-200">
                  <strong className="block text-yellow-400 mb-1">WARNING // 注意事項</strong>
                  <div className="whitespace-pre-line opacity-90">{item.text}</div>
                </div>
              )}
              {item.type === 'troubleshooting' && (
                <div className="grid grid-cols-1 gap-4 mt-4">
                  {item.items.map((err, eIdx) => (
                    <div key={eIdx} className="bg-black/40 border border-red-500/30 rounded-lg overflow-hidden group/error hover:border-red-500/60 transition-colors">
                      <div className="px-4 py-3 bg-red-950/20 border-b border-red-900/30 flex items-start gap-3">
                        <XCircle size={18} className="text-red-500 shrink-0 mt-0.5" />
                        <div>
                          <div className="text-xs text-red-400 font-mono mb-1">ERROR SIGNAL</div>
                          <div className="text-sm font-bold text-red-100">{err.error}</div>
                        </div>
                      </div>
                      <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <div className="text-xs text-gray-500 mb-1 font-mono">ROOT CAUSE</div>
                          <div className="text-gray-300">{err.cause}</div>
                        </div>
                        <div>
                          <div className="text-xs text-cyan-500 mb-1 font-mono flex items-center gap-1">
                            <Wrench size={12} /> RESOLUTION PROTOCOL
                          </div>
                          <div className="text-cyan-100">{err.solution}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const Header = () => (
  <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-lg border-b border-cyan-900/50">
    <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <div className="w-2 h-8 bg-cyan-500 rounded-sm shadow-[0_0_10px_#22d3ee]"></div>
        <h1 className="text-xl font-bold tracking-wider text-white">
          REACT<span className="text-cyan-400">.DEPLOY</span>
        </h1>
      </div>
      <div className="flex items-center space-x-4">
        <a href="https://github.com" target="_blank" rel="noreferrer" className="flex items-center space-x-2 px-4 py-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors text-sm text-white">
          <Github size={16} />
          <span className="hidden sm:inline">GitHub</span>
        </a>
      </div>
    </div>
  </header>
);

const Hero = () => (
  <div className="relative pt-32 pb-20 px-4 overflow-hidden">
    {/* Animated Background Grid */}
    <div className="absolute inset-0 z-0 opacity-20 pointer-events-none" 
         style={{ 
           backgroundImage: 'linear-gradient(rgba(34, 211, 238, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(34, 211, 238, 0.1) 1px, transparent 1px)', 
           backgroundSize: '40px 40px',
           transform: 'perspective(500px) rotateX(60deg) translateY(-100px) scale(1.5)'
         }}>
    </div>

    <div className="max-w-4xl mx-auto text-center relative z-10">
      <div className="inline-block px-3 py-1 mb-6 rounded-full border border-cyan-500/30 bg-cyan-900/10 text-cyan-300 text-xs font-mono tracking-widest shadow-[0_0_10px_rgba(34,211,238,0.2)] animate-pulse">
        SYSTEM STATUS: ONLINE
      </div>
      <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 tracking-tight leading-tight">
        React 開發與發布<br />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]">
          標準作業手冊
        </span>
      </h1>
      <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
        GitHub Pages 版 · Vite 架構 · 自動化部署
        <br/>
        專為現代前端開發者設計的標準化流程。
      </p>
      
      <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
        <button onClick={() => document.getElementById('phase-1').scrollIntoView({ behavior: 'smooth' })} className="px-8 py-4 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-lg shadow-[0_0_20px_rgba(8,145,178,0.4)] transition-all transform hover:scale-105 flex items-center space-x-2">
          <Rocket size={20} />
          <span>START MISSION</span>
        </button>
      </div>
    </div>
  </div>
);

// --- New Scroll To Top Component ---
const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Toggle visibility depending on scroll position
  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Scroll smoothly to top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <div className="fixed bottom-8 right-8 z-50 transition-all duration-300">
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="bg-cyan-600 hover:bg-cyan-500 text-white p-3 rounded-full shadow-[0_0_20px_rgba(8,145,178,0.6)] transition-all duration-300 hover:scale-110 hover:shadow-[0_0_30px_rgba(34,211,238,0.8)] focus:outline-none focus:ring-2 focus:ring-cyan-400"
          aria-label="Back to Top"
        >
          <ArrowUp size={24} />
        </button>
      )}
    </div>
  );
};

const Footer = () => (
  <footer className="border-t border-gray-800 bg-black py-12 text-center text-gray-500 text-sm relative overflow-hidden">
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50"></div>
    <p>React Deployment Protocol // GitHub Pages Edition</p>
    <p className="mt-2 font-mono text-xs opacity-50">DESIGNED FOR DEVELOPERS</p>
  </footer>
);

export default function App() {
  return (
    <div className="min-h-screen bg-[#050505] text-gray-100 font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
      <style>{`
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
        }
        /* Custom Scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        ::-webkit-scrollbar-track {
          background: #0f172a;
        }
        ::-webkit-scrollbar-thumb {
          background: #334155;
          border-radius: 4px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #475569;
        }
      `}</style>

      <Header />
      
      <main className="relative">
        <Hero />
        
        <div className="max-w-7xl mx-auto px-4 md:px-6 pb-20 relative z-10">
          <div className="flex flex-col items-center">
            {docData.map((phase, index) => (
              <div key={phase.id} id={`phase-${phase.id}`} className="w-full">
                <PhaseCard data={phase} index={index} />
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
      <ScrollToTop />
    </div>
  );
}