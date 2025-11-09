# Cafferot - Project Overview

## Project Purpose
カフェロット (Cafferot) は、ブレインロット派生の2Dゲームです。ユーザーが自作のキャラクターや音声を作成・展示し、カフェ経営とコミュニティを融合させたゲームです。

### 主な特徴
- **展示システム**: ユーザーが描いたブレインロットを自分のカフェに展示
- **価値システム**: 他ユーザーの「採用」数で価値が決定
- **カフェ経営**: 展示の価値に応じて売上・人気度が変動
- **WebSocketによるリアルタイム共有**: 全ユーザーがリアルタイムで展示を閲覧・共有可能
- **コミュニティ機能**: カフェ訪問、展示採用、盗み要素など

## Tech Stack
- **フロントエンド**: React 18.3.1 + TypeScript 5.7.3
- **ビルドツール**: Vite 6.0.11
- **スタイリング**: Tailwind CSS 4.1.17
- **リンター**: ESLint 9.18.0 + TypeScript ESLint 8.20.0
- **フォーマッター**: Prettier 3.4.2
- **Git Hooks**: Husky 9.1.7 + lint-staged 16.2.6
- **将来実装予定**: WebSocket (リアルタイム通信用)

## Project Structure
```
cafferot/
├── src/
│   ├── main.tsx          # エントリーポイント
│   ├── App.tsx           # メインアプリケーションコンポーネント
│   ├── App.css           # アプリケーションスタイル
│   ├── index.css         # グローバルスタイル
│   └── vite-env.d.ts     # Vite型定義
├── index.html            # HTMLテンプレート
├── package.json          # プロジェクト依存関係
├── vite.config.ts        # Vite設定
├── tsconfig.json         # TypeScript設定
├── eslint.config.js      # ESLint設定
├── .prettierrc           # Prettier設定
├── tailwind.config.js    # Tailwind CSS設定
└── .husky/               # Git hooks
```

## Current Status
プロジェクトは初期セットアップ段階です。基本的なReact + Viteの構成は完了していますが、カフェロットのゲーム機能は未実装です。
