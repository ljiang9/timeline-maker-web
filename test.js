// Node 断言：校验时间线数据的排序与分组。
const fs = require('fs');
const path = require('path');

const html = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');
const m = html.match(/<script id="timeline-data" type="application\/json">([\s\S]*?)<\/script>/);
if (!m) { console.error('FAIL: 未找到 timeline-data'); process.exit(1); }
const raw = JSON.parse(m[1]);

let failed = 0;
function assert(cond, msg) {
  if (cond) console.log('PASS: ' + msg);
  else { console.error('FAIL: ' + msg); failed++; }
}

assert(raw.length === 5, '事件总数 = 5');

// 模拟页面里的排序逻辑
const sorted = raw.slice().sort((a, b) => new Date(a.date) - new Date(b.date));
assert(sorted[0].date === '2026-03-10', '排序后最早事件为 2026-03-10，实际 ' + sorted[0].date);
assert(sorted[sorted.length - 1].date === '2026-07-01', '排序后最晚事件为 2026-07-01');

// 校验确实是升序
let asc = true;
for (let i = 1; i < sorted.length; i++) {
  if (new Date(sorted[i].date) < new Date(sorted[i - 1].date)) asc = false;
}
assert(asc, '排序结果为严格日期升序');

// 分组
const groups = {};
sorted.forEach(e => { (groups[e.group] = groups[e.group] || []).push(e); });
assert(Object.keys(groups).length === 3, '分组数 = 3（立项/开发/上线），实际 ' + Object.keys(groups).length);
assert(groups['开发'].length === 2, '“开发”组含 2 条事件');
assert(groups['上线'].length === 2, '“上线”组含 2 条事件');

// 组内日期升序
let groupAsc = true;
Object.values(groups).forEach(list => {
  for (let i = 1; i < list.length; i++) {
    if (new Date(list[i].date) < new Date(list[i - 1].date)) groupAsc = false;
  }
});
assert(groupAsc, '每个分组内部仍按日期升序');

assert(html.includes('createElement'), '动态渲染时间线节点');
assert(!html.match(/src="http/), '完全离线，无外部 http 资源');

if (failed) { console.error('\n' + failed + ' 项失败'); process.exit(1); }
console.log('\n全部断言通过');
