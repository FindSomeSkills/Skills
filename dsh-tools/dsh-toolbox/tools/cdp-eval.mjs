// CDP 小工具：node cdp-eval.mjs [url|targetId|-] "<expression>"
// 打印表达式结果；异常也会打印出来，避免静默 undefined。
const [target, expr] = process.argv.slice(2);
const list = await (await fetch('http://127.0.0.1:9222/json/list')).json();
const pages = list.filter((t) => t.type === 'page');
const page = pages.find((t) => t.id === target) ?? pages[0];
if (!page) { console.error('没有页面目标'); process.exit(1); }

const ws = new WebSocket(page.webSocketDebuggerUrl);
let id = 0;
const pending = new Map();
const send = (method, params = {}) =>
  new Promise((resolve) => { const i = ++id; pending.set(i, resolve); ws.send(JSON.stringify({ id: i, method, params })); });

ws.addEventListener('message', (e) => {
  const m = JSON.parse(e.data);
  if (m.id && pending.has(m.id)) { pending.get(m.id)(m); pending.delete(m.id); }
});
await new Promise((r) => ws.addEventListener('open', r));

await send('Runtime.enable');
if (target && target !== '-') {
  await send('Page.enable');
  await send('Page.navigate', { url: target });
  await new Promise((r) => setTimeout(r, 5000));
}

const res = await send('Runtime.evaluate', { expression: expr, returnByValue: true, awaitPromise: true, userGesture: true });
if (res.result?.exceptionDetails) {
  console.error('EXCEPTION: ' + (res.result.exceptionDetails.exception?.description ?? JSON.stringify(res.result.exceptionDetails)));
} else {
  const v = res.result?.result?.value;
  console.log(v === undefined ? '[undefined]' : typeof v === 'string' ? v : JSON.stringify(v, null, 2));
}
ws.close();
