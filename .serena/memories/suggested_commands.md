# Suggested Commands

## Development Commands

### 開発サーバー起動
```bash
npm run dev
```
- ポート3000で開発サーバーを起動
- 自動的にブラウザが開きます

### ビルド
```bash
npm run build
```
- TypeScriptコンパイル + Viteビルド
- `dist/`ディレクトリに出力
- ソースマップ生成あり

### プレビュー
```bash
npm run preview
```
- ビルド後のプロジェクトをプレビュー

## Code Quality Commands

### Lint
```bash
npm run lint          # リントチェック
npm run lint:fix      # リントエラーを自動修正
```

### Format
```bash
npm run format        # コード整形
npm run format:check  # 整形チェックのみ
```

## Git Workflow

### Husky Setup
```bash
npm run prepare
```
- Git hooksのセットアップ

### Pre-commit Hook
コミット前に自動実行:
- `*.{ts,tsx}`: ESLint + Prettier
- `*.{css,md,json}`: Prettier

## Task Completion Checklist
タスク完了時は以下を実行:
1. `npm run lint` - リントエラーがないか確認
2. `npm run format:check` - コード整形を確認
3. `npm run build` - ビルドが成功するか確認
4. Git commit (pre-commit hookが自動実行)

## System Commands (Linux)
- `ls -la` - ファイル一覧表示
- `grep -r "pattern" src/` - ファイル内検索
- `find src/ -name "*.tsx"` - ファイル検索
- `git status` - Git状態確認
- `git log --oneline -10` - 最近のコミット確認
