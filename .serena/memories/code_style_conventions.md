# Code Style and Conventions

## TypeScript Configuration
- **Target**: ES2020
- **Module**: ESNext (bundler resolution)
- **JSX**: react-jsx
- **Strict Mode**: Enabled
- **No Unused Locals/Parameters**: Enabled
- **No Fallthrough Cases**: Enabled

## Prettier Configuration
- **セミコロン**: なし (`semi: false`)
- **引用符**: シングルクォート (`singleQuote: true`)
- **タブ幅**: 2スペース (`tabWidth: 2`)
- **末尾カンマ**: ES5互換 (`trailingComma: "es5"`)
- **行幅**: 80文字 (`printWidth: 80`)
- **アロー関数括弧**: 必要時のみ (`arrowParens: "avoid"`)
- **プラグイン**: Tailwind CSS用プラグイン使用

## ESLint Rules
- **React Hooks**: 推奨ルール適用
- **React Refresh**: コンポーネントエクスポートの警告
- **未使用変数**: エラー（アンダースコアプレフィックスは除外）
- **Prettier統合**: eslint-config-prettierでフォーマット競合を回避

## Naming Conventions
- **コンポーネント**: PascalCase (例: `App.tsx`, `CafeShop.tsx`)
- **ファイル名**: コンポーネントはPascalCase、その他はkebab-case
- **変数・関数**: camelCase
- **定数**: UPPER_SNAKE_CASE（グローバル定数の場合）
- **型定義**: PascalCase

## Import Order
1. React関連のインポート
2. サードパーティライブラリ
3. 内部コンポーネント
4. スタイルファイル

例:
```typescript
import { useState } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
```

## Component Structure
- Functional Componentsを使用
- Hooksは関数コンポーネントの先頭で宣言
- JSX内では明確な構造を保つ
- 条件付きレンダリングは三項演算子または論理ANDを使用
