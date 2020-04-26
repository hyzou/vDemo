let validateScore = (rule, value, callback) => {
  value.forEach(element => {
    if (!element.adminScore) {
      callback(new Error("请填写评分"));
    }
  });
  callback();
};

let rule = {
  scoreListStr: [{ validator: validateScore }, { required: true }]
};

export default {
  rule
};
