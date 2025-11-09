# Cafferot (カフェロット)

> ユーザーが自作のカフェロットを展示し、カフェ経営とコミュニティを融合させた2Dゲーム

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18.3-blue)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-6.0-purple)](https://vitejs.dev/)

## 🎮 コンセプト

**カフェロット**は、ブレインロット派生ゲームに「展示＋経営＋コミュニティ＋アクション」を融合させた新しい体験を提供します。

### 主な特徴

- 🎨 **クリエイティブ性**: 自作のキャラクター・音声をその場で作成・展示
- ☕ **カフェ経営**: 展示の価値に応じて売上・人気度が変動
- 🌐 **リアルタイム共有**: WebSocketによる常時接続でコミュニティと繋がる
- 🏆 **価値システム**: 他ユーザーの「採用」数で作品の価値が決定
- ⚡ **アクション要素**: タップ速度で盗んだアイテムの価値が変動

## 🚀 技術スタック

- **フロントエンド**: React 18 + TypeScript 5.7 + Vite 6
- **スタイリング**: Tailwind CSS 4
- **レイアウト**: Flexbox + Absolute Positioning
- **アニメーション**: Framer Motion
- **バックエンド**: FastAPI + Python 3.11+
- **リアルタイム通信**: WebSocket → Nostr（段階的移行予定）
- **パッケージ管理**: uv (Backend) / npm (Frontend)
- **開発環境**: Docker Compose
- **コード品質**: ESLint + Prettier + Husky

## 📦 セットアップ

### 前提条件

- Docker & Docker Compose（推奨）
- または:
  - Python 3.11+ & uv
  - Node.js 20+

### インストール（Docker使用）

```bash
# リポジトリのクローン
git clone https://github.com/kako-jun/cafferot.git
cd cafferot

# Docker Composeで全サービス起動
docker compose up
```

### ローカル開発（Dockerなし）

```bash
# Backend
cd backend
uv sync
source .venv/bin/activate  # Windows: .venv\Scripts\activate
uvicorn app.main:app --reload --port 8080

# Frontend（別ターミナル）
cd frontend
npm install
npm run dev
```

### アクセスURL

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8080
- **API Docs**: http://localhost:8080/docs（FastAPI自動生成）
- **WebSocket**: ws://localhost:8080/ws

## 🛠️ 開発コマンド

### Docker Compose

```bash
# 全サービス起動
docker compose up

# バックグラウンド起動
docker compose up -d

# ログ確認
docker compose logs -f

# 停止
docker compose down
```

### Frontend

```bash
cd frontend

# 開発サーバー起動
npm run dev

# ビルド
npm run build

# プレビュー
npm run preview

# Lint
npm run lint
npm run lint:fix

# フォーマット
npm run format
npm run format:check
```

### Backend

```bash
cd backend

# 開発サーバー起動
uvicorn app.main:app --reload --port 8080

# テスト
uv run pytest

# 型チェック
uv run mypy app
```

## 📁 プロジェクト構造（name-name準拠）

```
cafferot/
├── backend/                   # FastAPI バックエンド
│   ├── app/
│   │   ├── main.py           # FastAPI エントリーポイント
│   │   ├── models.py         # Pydantic モデル
│   │   └── websocket.py      # WebSocket管理
│   ├── Dockerfile
│   └── pyproject.toml        # uv 依存関係
├── frontend/                  # React + Vite フロントエンド
│   ├── src/
│   │   ├── components/
│   │   ├── services/
│   │   └── types/
│   ├── Dockerfile.dev
│   └── package.json
├── compose.yaml              # Docker Compose設定
├── CLAUDE.md                 # 全体実装計画
└── README.md                 # このファイル
```

## 🎯 開発ロードマップ

詳細な実装計画は [CLAUDE.md](./CLAUDE.md) を参照してください。

| フェーズ | 期間 | 内容 |
|---------|------|------|
| 1 | Week 1-2 | 基盤構築 (型定義、プロジェクト構造) |
| 2 | Week 3-4 | カフェ経営システム |
| 3 | Week 5-6 | カフェロット作成機能 |
| 4 | Week 7-8 | コミュニティ機能 |
| 5 | Week 9-10 | WebSocketリアルタイム |
| 6 | Week 11-12 | アクション要素・演出 |
| 7 | Week 13-14 | デプロイ・最適化 |

## 🎮 ゲームシステム (計画)

### カフェ経営
- 店舗のアップグレード (内装、メニュー、展示スペース)
- 常連客システム (来店頻度、客単価、人気度)

### カフェロット展示
- キャラクター描画ツール (Canvas API)
- 音声アップロード機能
- リアルタイムギャラリー

### コミュニティ
- カフェ一覧 (人気順・新着順)
- 訪問・採用システム
- 盗み要素 (タップ速度ゲーム)

## 🤝 コントリビューション

現在、このプロジェクトは初期開発段階です。コントリビューションガイドラインは後日追加予定です。

## 📄 ライセンス

MIT License - 詳細は [LICENSE](LICENSE) を参照してください。

## 👤 作者

**kako-jun**

- GitHub: [@kako-jun](https://github.com/kako-jun)

## 📝 現在の状態

⚠️ **開発初期段階**: 基本的なReact + Vite環境のセットアップが完了しています。ゲーム機能は未実装です。

---

**🚧 This project is currently under active development 🚧**