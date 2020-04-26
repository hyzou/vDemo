let rule = {
  scoreListStr: {
    type: "array",
    required: true,
    fields: {
      0: {
        type: "object",
        required: true,
        fields: {
          selfScore: { required: true, message: "请填写自评分" }
        }
      }
    },
    message: "请填写自评分"
  }
};
export default {
  rule
};
