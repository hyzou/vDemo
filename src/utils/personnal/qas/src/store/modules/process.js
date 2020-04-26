//进度管理数据存储模块

const processTable = {
  state: {
    table_data: []
  },
  getters: {
    get_processData: function(state) {
      return state.table_data;
    }
  },
  mutations: {
    set_processData(state, rows) {
      state.table_data = rows;
    }
  },
  actions: {
    set_processData(context, data) {
      let rows = data.rows;
      context.commit("set_processData", rows);
    }
  }
};
export default processTable;
