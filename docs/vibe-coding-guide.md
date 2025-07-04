# Vibeコーディングガイド

## このファイルについて

- このファイルは **人間のユーザーが** 適切にAIアシスタントを利用するための利用方法、およびそれぞれのAIアシスタントの注意すべき挙動を記載している
- **AIアシスタントへの指示：** このファイルは人間のユーザーからの明示的な指示があった場合のみ変更すること

## Claude Code

### 前提条件

- 更新日時：2025/06/29
- プラン：Pro
- モデル：Claude Sonnet 4

### 利用方法

- **プロアクティブな実行**: 明示的に指示したタスクの内容を超えて、関連する必要と思われる内容を一緒に実行する傾向がある
  - 指示された内容から要件を推測し、その要件を満たすタスクを実行する
  - 複雑な要件（例：この選定技術でアプリケーションをセットアップせよ）を一度に実行できる
  - 例：lintエラー修正を依頼すると、関連するtypecheckやformatも自動実行することがある

### 注意すべき挙動

- **ファイル編集の状態管理**: AIが記載したファイルの内容を人間が削除した後、再度そのファイルの編集を指示した際に、人間が削除した（不要な）内容を復元したうえで編集することがある
  - **対処法**: ファイルの編集はAIに指示して行わせる（= 変更意図をAIに伝える）方が良い
- **厳密なルール遵守**: 設定されたESLintルールやコーディング規約を厳密に守る傾向がある

### ベストプラクティス

- **明確な指示**: 具体的で明確な指示を与える（曖昧な指示は予期しない結果を招く可能性）
- **段階的依頼**: 大きなタスクは段階的に分けて依頼することで、意図しない変更を避けられる
- **変更理由の説明**: ファイル変更時は理由を説明すると、AIが適切な判断を行いやすい
- **設定ファイルの活用**: CLAUDE.mdや.claude/settings.local.jsonを活用してプロジェクト固有の情報を提供
- **エラー対処**: lint, typecheck, testエラーは具体的なエラー内容を共有すると効率的に解決される

### 模索中

- issue - PullRequestを使用するかどうか
  - 個人での開発では不要に思える（ブランチを切るかは別として、ローカルで対話式で進めれば良い）
    - アプリケーションの仕様を固めつつ並行して実装を行う場合、人間の指示なしに完了できるタスクは多くない
