(() => {
  const parts = ["app-part1.txt", "app-part2.txt", "app-ownership.txt", "app-sharelink.txt", "app-part3.txt"];
  Promise.all(parts.map(path => fetch(path, {cache: "no-cache"}).then(r => {
    if (!r.ok) throw new Error(`Failed to load ${path}`);
    return r.text();
  }))).then(code => {
    // app-part2 intentionally ends inside selectCharacter(), while app-part3
    // starts with the closing brace. Close that function before loading the
    // standalone feature modules, then remove app-part3's original leading brace.
    const part3 = code[4].replace(/^\s*}\s*/, "\n");
    const source = code[0] + code[1] + "\n  }\n" + code[2] + code[3] + part3;
    (0, eval)(source);
  }).catch(err => {
    console.error(err);
    document.body.insertAdjacentHTML("beforeend", '<p style="padding:16px;text-align:center">程序加载失败，请刷新页面重试。</p>');
  });
})();
