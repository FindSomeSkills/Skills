// 三个页面（会话索引、技能审计、De-AI Kit）的文案在各自组件里，FAQ 单独放这里。
export const FAQ_EXTRA = {
  en: {
    doctor: [
      ['Why is a session on disk but missing from the list?', 'The index never recorded it: an interrupted process, a failed index write, or a changed path slug all leave it invisible.'],
      ['Does the fix delete data?', 'No. It adds the missing index entries; session files stay untouched.'],
      ['Which platforms does it cover?', 'Windows, macOS and Linux — the session directory layout is the same.'],
    ],
    skills: [
      ['How is the token cost computed?', 'It counts the characters in each skill SKILL.md and converts them to tokens, then ranks them.'],
      ['Should I delete the top-ranked skill?', 'Not automatically. Keep what you use often; archive what is both large and rarely loaded.'],
      ['Is skill content uploaded?', 'No. Only local files are read.'],
    ],
    kit: [
      ['Does it score my writing?', 'No. It lists mechanical markers: template transitions, absolute claims, gradient text, spacing off the grid.'],
      ['Does a clean report mean the text is good?', 'No. It means no known trap was hit.'],
      ['Does it handle English?', 'Yes — Chinese and English rules are maintained separately.'],
    ],
  },
  zh: {
    doctor: [
      ['为什么会话在磁盘上却不在列表里？', '索引没记录它：进程中断、索引写入失败、路径 slug 变化，都会让它消失。'],
      ['修复会删数据吗？', '不会。只补索引条目，会话文件原样保留。'],
      ['支持哪些平台？', 'Windows、macOS、Linux，会话目录结构一致。'],
    ],
    skills: [
      ['token 成本怎么算的？', '读每个技能 SKILL.md 的字符数，换算成 token，再排名。'],
      ['排名高就要删吗？', '不一定。常用的留着，又大又少用的考虑归档。'],
      ['技能内容会上传吗？', '不会，只读本地文件。'],
    ],
    kit: [
      ['它给我的文章打分吗？', '不打分。只列机械标记：模板过渡词、绝对化断言、渐变文字、间距不在栅格。'],
      ['报告干净说明写得好吗？', '不说明。只能说明没踩到已知的坑。'],
      ['支持英文内容吗？', '支持，中英规则分开维护。'],
    ],
  },
};
