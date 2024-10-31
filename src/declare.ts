const articles =
{
  title: '你好，猫猫',
  content: `先祝贺你23岁生日快乐，这几年来你成长了很多，在工作上已经能独当一面了。
  从以前的路痴和没主见，到现在能拿着手机自己导航和做决定，我真的很开心。
  几年间从寥寥无几的朋友到现在能找到一堆朋友倾述，有这么多朋友做你的坚强的后盾我就放心了，
  再也不用受到病魔的缠绕。
  最近的我坐在电脑面前会想起跟你相遇的那个遥远的晚上，你是满足我对对象的一切幻想，我在学生时期就经常
  幻想有这么一个女朋友，脸圆圆的Lolita外形，非常可爱，我以为我这辈子都没办法遇到，直到见到你。
  你很聪明，和你聊什么东西都能听进去，是一个很好的倾听者，同时同情心还很强。在你上学时期，我印象最深刻的一件事就是
  你帮宿舍换水和拖洗衣机回宿舍，那时候我在想，遇到一位漂亮，懂事又独立的女生，我真的捡到宝了。
  我有时候会做梦，梦到我在马路上走，马路的对面是你，即使没有任何沟通，我们都可以按照一样频率，相同的步伐，心照不宣地向前，
  像两只发出52赫兹的鲸鱼。
  人生旅途总会遇到交叉路口，我的脑中总是想起几米的《向左走，向右走》的封面图，半年来，我知道你的想法却没有去承认。
  说真的，我自己对婚姻这东西也很恐惧，但是我个人是喜欢孩子的。
  我始终希望能和你有个孩子，最好是女孩，那个女孩像你。或许当一个孩子在有爱的环境下成长，她对未来才不至于这么悲观。
  `,
  foot: '贤锋',
  time: '2024-10-16'
}

  ;
function dealArticles(articles: Record<string, string>): string[][] {
  const articlesArr: string[][] = []
  const articlesMap: string[] = []
  let title = articles["title"].padEnd(18, ' ')
  let content = '  ' + articles["content"].replace(/\n/g, '')
  let foot = articles["foot"].padStart(36, ' ')
  let time = articles["time"].padStart(36, ' ')
  articlesMap.push(title)
  const lineBreak = new Set(['。', '！', '？', '：', '，'])
  if (content) {
    let index = 0;
    while (index < content.length) {
      // 尝试获取长度为18的行
      let line = content.substring(index, Math.min(index + 18, content.length));

      // 检查是否需要因为换行符而截断当前行
      if (index + 18 < content.length && lineBreak.has(content[index + 18])) {
        line = content.substring(index, index + 17);
        index += 17;
      } else {
        // 如果行的长度不足18个字符，用空格填充
        if (line.length < 18) {
          line = line.padEnd(18, ' ');
        }
        index += 18;
      }

      // 将处理后的行添加到数组中
      articlesMap.push(line);
    }
  }
  // 添加底部信息和时间
  articlesMap.push(foot)
  articlesMap.push(time)

  // 将文章映射数组分组到文章数组
  articlesMap.forEach((item, i) => {
    const index = Math.floor(i / 13)
    if (!(i % 13)) {
      articlesArr[index] = [item]
    } else {
      articlesArr[index].push(item)
    }
  })
  console.log(articlesArr)
  return articlesArr;
}
export { dealArticles, articles };
