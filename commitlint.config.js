/** @type {import('@commitlint/types').UserConfig} */
const hasChinese = (text) => /[\u4e00-\u9fff]/.test(text ?? '')

export default {
  extends: ['@commitlint/config-conventional'],
  plugins: [
    {
      rules: {
        'subject-has-chinese': ({ subject }) => {
          const ok = hasChinese(subject)
          return [
            ok,
            'subject 须包含中文。示例：feat(starfield): 新增星空隧道动效包',
          ]
        },
      },
    },
  ],
  rules: {
    // 中文说明不做英文大小写限制
    'subject-case': [0],
    // 强制 subject 含中文（优先中文 commit message）
    'subject-has-chinese': [2, 'always'],
    'type-empty': [2, 'never'],
    'subject-empty': [2, 'never'],
    'header-max-length': [2, 'always', 100],
    'body-leading-blank': [2, 'always'],
    'footer-leading-blank': [1, 'always'],
    'type-enum': [
      2,
      'always',
      [
        'feat',
        'fix',
        'docs',
        'style',
        'refactor',
        'perf',
        'test',
        'build',
        'ci',
        'chore',
        'revert',
      ],
    ],
  },
}
