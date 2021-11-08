const fs = require('fs');
fs.readFile('./raw.json', (err, res) => {
  output = {
    "problem": []
  };
  const raw = JSON.parse(res)["系统题库（2021-11-07）"];
  for (i in raw) {
    type = raw[i]["题型"];
    pro = raw[i]["题目"];
    opt = raw[i]["选项"];
    ans = raw[i]["答案"];
    ans_arr = new Array();
    if (type == "单选题" || type == "多选题") {
      opt_arr = opt.split("|");
      for (i = 0; i < ans.length; i++)
        ans_arr.push(opt_arr[ans[i].charCodeAt() - 'A'.charCodeAt()]);
    } else {
      ans_arr.push(ans);
    }
    output["problem"].push({
      "pro": pro,
      "ans": ans_arr
    });
  }
  fs.writeFile('./data.json', JSON.stringify(output), err => {
    if (err) {
      console.log(err);
      return;
    }
  });
});