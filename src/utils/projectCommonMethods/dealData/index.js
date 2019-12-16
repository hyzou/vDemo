export default (envObj, params, mainId, defaultBtns, formatData) => {
  return new Promise(resolve => {
    params.rows.map(item => {
      if (!mainId) {
        mainId = "sysId";
      }
      let operateBtns = [];
      if (item.processinstId) {
        let operateBtnItem = {
          id: item.processinstId,
          text: "查看流程",
          type: "checkflow"
        };
        operateBtns.push(operateBtnItem);
        if (item.userActiveTasks && item.userActiveTasks.length > 0) {
          item.userActiveTasks.map(task => {
            let taskObj = {
              id: {
                sysId: item[mainId],
                taskId: task.id,
                processinstId: item.processinstId
              },
              text: task.name
            };
            let hasOtherBtns = true;
            if (task.formKey) {
              if (task.formKey.indexOf("{") != -1) {
                let formkeyObj = JSON.parse(task.formKey);
                taskObj.type = formkeyObj.action;
              } else {
                taskObj.type = task.formKey;
                hasOtherBtns = false;
              }
              operateBtns.push(taskObj);
            }
            if (
              hasOtherBtns &&
              task.userTaskActions &&
              task.userTaskActions.length > 0
            ) {
              task.userTaskActions.map(action => {
                let actionObj = {
                  id: {
                    sysId: item[mainId],
                    basMemberId: item.basMemberId,
                    taskId: task.id,
                    processinstId: item.processinstId,
                    userAction: action.value
                  },
                  text: action.text,
                  type: "complete"
                };
                operateBtns.push(actionObj);
              });
            }
          });
        }
      } else {
        if (!defaultBtns || defaultBtns.length == 0) {
          operateBtns = [
            {
              id: item[mainId],
              text: "编辑",
              type: "edit"
            },
            {
              id: item[mainId],
              text: "删除",
              type: "remove"
            }
          ];
        } else {
          operateBtns = JSON.parse(JSON.stringify(defaultBtns));
          operateBtns.map(btn => {
            btn.id = item[mainId];
          });
        }
      }
      item.operateBtns = item.operateBtns ? item.operateBtns : operateBtns;
      // if (item.flowComments && item.flowComments.length > 0) {
      //   item.flowComments.map(comment => {
      //     comment.time = envObj.$globalFnc.dateStampFormat(comment.time);
      //   });
      // }
      if (formatData) {
        formatData.map(formatItem => {
          let type = formatItem.type ? formatItem.type : "";
          item[formatItem.formated] = envObj.$globalFnc[formatItem.formatFnc](
            item[formatItem.needformat],
            type
          );
        });
      }
    });
    envObj.tablelistSettings.tableDatas = params.rows;
    if (params.total && envObj.paginationSettings) {
      envObj.paginationSettings.totalNumbers = parseInt(params.total);
    }
    resolve(envObj);
  });
};
