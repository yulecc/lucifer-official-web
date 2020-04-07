import MarkdownIt from 'markdown-it'
const md = new MarkdownIt()

function render(s) {
  return md.render(s[0])
}

export default [
  {
    id: '01',
    name: '第一章',
    list: [
      {
        title: '代码1.1.1',
        codes: [
          {
            language: 'Python',
            content: render`
  \`\`\`python
  def sum(n):
      res = 0
      for i in range(1, n + 1):
          res += i
      return res
  \`\`\`
        `
          },
          {
            language: 'Java',
            content: render`
  \`\`\`java
  class Solution {
    public int sum(int n) {
      int res = 0;
      for (int i = 0; i < n; i++) {
        res += i;
      }
      return res;
    }
  }
  \`\`\`
            `
          },
          {
            language: 'C++',
            content: render`
  \`\`\`c++
  int sum(int n) {
    int res = 0;
    for (int i = 0; i < n; i++) {
      res += i;
    }
    return res;
  }
  
  \`\`\`
  
            `
          },
          {
            language: 'JavaScript',
            content: render`
  \`\`\`js
  function sum(n) {
    let res = 0;
    for (let i = 0; i < n; i++) {
      res += i;
    }
    return res;
  }
  
  \`\`\`
            `
          }
        ]
      },
      {
        title: '代码1.1.2',
        codes: [
          {
            language: 'Python',
            content: render`
  \`\`\`python
  def sum(n):
      res = 0
      for i in range(1, n + 1):
          res += i
      return res
  \`\`\`
        `
          },
          {
            language: 'Java',
            content: render`
  \`\`\`java
  class Solution {
    public int sum(int n) {
      int res = 0;
      for (int i = 0; i < n; i++) {
        res += i;
      }
      return res;
    }
  }
  \`\`\`
            `
          },
          {
            language: 'C++',
            content: render`
  \`\`\`c++
  int sum(int n) {
    int res = 0;
    for (int i = 0; i < n; i++) {
      res += i;
    }
    return res;
  }
  
  \`\`\`
  
            `
          },
          {
            language: 'JavaScript',
            content: render`
  \`\`\`js
  function sum(n) {
    let res = 0;
    for (let i = 0; i < n; i++) {
      res += i;
    }
    return res;
  }
  
  \`\`\`
            `
          }
        ]
      }
    ]
  },
  {
    id: '02',
    name: '第二章'
  },
  {
    id: '03',
    name: '第三章'
  },
  {
    id: '04',
    name: '第四章'
  },
  {
    id: '05',
    name: '第五章'
  },
  {
    id: '06',
    name: '第六章'
  },
  {
    id: '07',
    name: '第七章'
  },
  {
    id: '08',
    name: '第八章'
  },
  {
    id: '09',
    name: '第九章'
  },
  {
    id: '10',
    name: '第十章'
  },
  {
    id: '11',
    name: '第十一章'
  },
  {
    id: '12',
    name: '第十二章'
  },
  {
    id: '13',
    name: '第十三章'
  },
  {
    id: '14',
    name: '第十四章'
  },
  {
    id: '15',
    name: '第十五章'
  },
  {
    id: '16',
    name: '第十六章'
  },
  {
    id: '17',
    name: '第十七章'
  },
  {
    id: '18',
    name: '第十八章'
  },
  {
    id: '19',
    name: '第十九章'
  },
  {
    id: '20',
    name: '第二十章'
  }
]
