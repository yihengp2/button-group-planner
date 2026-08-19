(() => {
  const parts = ["app-part1.txt", "app-part2.txt", "app-ownership.txt", "app-part3.txt"];
  Promise.all(parts.map(path => fetch(path, {cache: "no-cache"}).then(r => {
    if (!r.ok) throw new Error(`Failed to load ${path}`);
    return r.text();
  }))).then(code => {
    (0, eval)(code.join(""));
  }).catch(err => {
    console.error(err);
    document.body.insertAdjacentHTML("beforeend", '<p style="padding:16px;text-align:center">程序加载失败，请刷新页面重试。</p>');
  });
})();
