import Vue from "vue";
import { get, post } from "./axios";

Vue.prototype.$get = get;
Vue.prototype.$post = post;

const qas_api = {
  getDicDataTree(param) {
    return new Promise(function(resolve, reject) {
      get({
        url: "/_data/basic/dictionary/tree",
        fnc: resolve,
        rej: reject,
        param: param
      });
    });
  },
  //获取不同字典及字典内容信息
  getDicData(param) {
    return new Promise(function(resolve, reject) {
      get({
        url: "/_data/frame/ref/list",
        fnc: resolve,
        rej: reject,
        param: param
      });
    });
  },
  //获取字典信息
  getDic(type) {
    return new Promise(function(resolve, reject) {
      get({
        url: "/_data/frame/ref/list?_refKey=dict&busintypeid=" + type,
        fnc: resolve,
        rej: reject
      });
    });
  },
  //获取状态
  getOverFlag() {
    return new Promise(function(resolve, reject) {
      get({
        url: "/_data/task/plan/findOverFlagList",
        fnc: resolve,
        rej: reject
      });
    });
  },
  //获取判定等级
  getGrade() {
    return new Promise(function(resolve, reject) {
      get({
        url: "/_data/bas/criterialTag/findGradBusin",
        fnc: resolve,
        rej: reject
      });
    });
  },
  //获取任务扦样地区
  getSampleArea(param) {
    return new Promise(function(resolve, reject) {
      get({
        url: "/_data/task/samplingTask/findSampleDistrict",
        fnc: resolve,
        rej: reject,
        param: param
      });
    });
  },
  //获取任务扦样人
  getSampler(param) {
    return new Promise(function(resolve, reject) {
      get({
        url: "/_data/task/samplingTask/findSampleEosorgList",
        fnc: resolve,
        rej: reject,
        param: param
      });
    });
  },
  //获取任务扦样库点
  getSampleStorePoint(param) {
    return new Promise(function(resolve, reject) {
      get({
        url: "/_data/task/samplingStock/findStorePoint",
        fnc: resolve,
        rej: reject,
        param: param
      });
    });
  },
  //根据计划id获取计划的品种分类
  getPlanGrainBreedType(param) {
    return new Promise(function(resolve, reject) {
      get({
        url: "_data/task/sampleRequest/findProductAndGrainBreed", ///findBreedTypesByPlanId
        fnc: resolve,
        rej: reject,
        param: param
      });
    });
  },
  /**基础数据👇**/
  //获取检测指标树列表
  getTestTargetlist(param) {
    return new Promise(function(resolve, reject) {
      get({
        url: "/_data/base/item/tree",
        fnc: resolve,
        rej: reject,
        param: param
      });
    });
  },
  //获取单条指标数据
  getSingleTestTarget(param) {
    return new Promise(function(resolve, reject) {
      get({
        url: "/_data/base/item/loadByExample",
        fnc: resolve,
        rej: reject,
        param: param
      });
    });
  },
  //插入检测指标
  addTestTarget(param) {
    return new Promise(function(resolve, reject) {
      post({
        url: "/_data/base/item/insertItem",
        fnc: resolve,
        rej: reject,
        param: param
      });
    });
  },
  //修改检测指标
  updateTestTarget(param) {
    return new Promise(function(resolve, reject) {
      post({
        url: "/_data/base/item/updateItem",
        fnc: resolve,
        rej: reject,
        param: param
      });
    });
  },
  //单条删除检测指标
  deleteSingleTestTarget(param) {
    return new Promise(function(resolve, reject) {
      post({
        url: "/_data/base/item/removeItem",
        fnc: resolve,
        rej: reject,
        param: param
      });
    });
  },
  //获取检测项目树
  getTestProjectlist(param) {
    return new Promise(function(resolve, reject) {
      get({
        url: "/_data/base/itemType/tree",
        fnc: resolve,
        rej: reject,
        param: param
      });
    });
  },
  //获取检测项目树
  getSingleTestProject(param) {
    return new Promise(function(resolve, reject) {
      get({
        url: "/_data/base/itemType/loadByExample",
        fnc: resolve,
        rej: reject,
        param: param
      });
    });
  },
  //增加检测项目指标(itemType 表中数据)
  addTestProject(param) {
    return new Promise(function(resolve, reject) {
      post({
        url: "/_data/base/itemType/add",
        fnc: resolve,
        rej: reject,
        param: param
      });
    });
  },
  //删除检测项目指标（包含级联删除下级及检测指标）
  deleteSingleTestProject(param) {
    return new Promise(function(resolve, reject) {
      post({
        url: "/_data/base/itemType/deleteType",
        fnc: resolve,
        rej: reject,
        param: param
      });
    });
  },

  //获取检测标准列表
  getStdlist(param) {
    return new Promise(function(resolve, reject) {
      get({
        // url: "/_data/std/std/page",
        url: "/_data/std/std/pageStds",
        fnc: resolve,
        rej: reject,
        param: param
      });
    });
  },
  //根据type类型分为 新增标准/检测方法基本信息
  addStd(param) {
    return new Promise(function(resolve, reject) {
      post({
        url: "/_data/std/std/addStd",
        fnc: resolve,
        rej: reject,
        param: param
      });
    });
  },
  //更新检测标准
  updateStd(param) {
    return new Promise(function(resolve, reject) {
      post({
        url: "/_data/std/std/updateStd",
        fnc: resolve,
        rej: reject,
        param: param
      });
    });
  },
  //删除检测标准
  deleteStd(param) {
    return new Promise(function(resolve, reject) {
      post({
        url: "/_data/std/std/deleteStd",
        fnc: resolve,
        rej: reject,
        param: param
      });
    });
  },
  //批量禁用检测标准
  batchUpdate(param) {
    return new Promise(function(resolve, reject) {
      post({
        url: "/_data/std/std/batchUpdate",
        fnc: resolve,
        rej: reject,
        param: param
      });
    });
  },
  //获取单条显示标准基础信息
  getSingleStd(param) {
    return new Promise(function(resolve, reject) {
      get({
        url: "/_data/std/std/loadStd",
        fnc: resolve,
        rej: reject,
        param: param
      });
    });
  },
  //添加检测指标标准值
  addSingleStdSet(param) {
    return new Promise(function(resolve, reject) {
      post({
        url: "/_data/std/itemCriteria/addStdItemCriteria",
        fnc: resolve,
        rej: reject,
        param: param
      });
    });
  },
  //修改检测指标标准值
  updateSingleStdSet(param) {
    return new Promise(function(resolve, reject) {
      post({
        url: "/_data/std/itemCriteria/updateStdItemCriteria",
        fnc: resolve,
        rej: reject,
        param: param
      });
    });
  },
  //获取单条标准设定的基础信息
  getStdBindTargetlist(param) {
    return new Promise(function(resolve, reject) {
      get({
        url: "/_data/std/itemCriteria/listStdItemCriteria",
        fnc: resolve,
        rej: reject,
        param: param
      });
    });
  },
  //获取检测指标树列表
  getStdToBindTargetlist(param) {
    return new Promise(function(resolve, reject) {
      get({
        url: "/_data/std/std/tree",
        fnc: resolve,
        rej: reject,
        param: param
      });
    });
  },
  //获取单条标准设定的基础信息
  getStdBindSingleTargetInfo(param) {
    return new Promise(function(resolve, reject) {
      get({
        url: "/_data/std/itemCriteria/loadStdItemCriteria",
        fnc: resolve,
        rej: reject,
        param: param
      });
    });
  },
  //删除检测指标标准值
  deleteStdSet(param) {
    return new Promise(function(resolve, reject) {
      post({
        url: "/_data/std/itemCriteria/deleteStdItemCriteria",
        fnc: resolve,
        rej: reject,
        param: param
      });
    });
  },

  //获取分类条件列表
  getTaglist(param) {
    return new Promise(function(resolve, reject) {
      get({
        // url: "/_data/bas/criterialTag/page",
        url: "/_data/bas/criterialTag/pageBasCriTags",
        fnc: resolve,
        rej: reject,
        param: param
      });
    });
  },
  //新增分类条件
  addTag(param) {
    return new Promise(function(resolve, reject) {
      post({
        url: "/_data/bas/criterialTag/insertTag",
        fnc: resolve,
        rej: reject,
        param: param
      });
    });
  },
  //更新分类条件
  updateTag(param) {
    return new Promise(function(resolve, reject) {
      post({
        url: "/_data/bas/criterialTag/updateTag",
        fnc: resolve,
        rej: reject,
        param: param
      });
    });
  },
  //单条删除分类条件
  deleteTag(param) {
    return new Promise(function(resolve, reject) {
      post({
        url: "/_data/bas/criterialTag/removeTag",
        fnc: resolve,
        rej: reject,
        param: param
      });
    });
  },
  //批量删除分类条件
  mutideleteTag(param) {
    return new Promise(function(resolve, reject) {
      post({
        url: "/_data/bas/criterialTag/batchDelete",
        fnc: resolve,
        rej: reject,
        param: param
      });
    });
  },
  //1级粮食品种
  gradeLevel() {
    return new Promise(function(resolve, reject) {
      get({
        url: "/_data/basic/grainbreed/listBylevel?level=1",
        fnc: resolve,
        rej: reject
      });
    });
  },
  //获取所有指标判定标准分类条件
  getStdConditions() {
    return new Promise(function(resolve, reject) {
      get({
        url: "/_data/bas/criterialTag/getTagsBybreedAndDic",
        fnc: resolve,
        rej: reject
      });
    });
  },
  //根据标准值获取指定的指标判定标准分类条件
  getStdBindConditions(param) {
    return new Promise(function(resolve, reject) {
      get({
        url: "/_data/bas/criterialTag/getTagsByStdId",
        fnc: resolve,
        rej: reject,
        param: param
      });
    });
  },
  // 获取检测项的判断结果字典项
  getProjectResults(params) {
    return new Promise(function(resolve, reject) {
      get({
        url: "/_data/base/judgeDict/dics",
        fnc: resolve,
        rej: reject,
        param: params
      });
    });
  },
  // 添加检测项的判断结果
  addProjectResults(params) {
    return new Promise(function(resolve, reject) {
      post({
        url: "/_data/base/judgeDict/insertJudgeDict",
        fnc: resolve,
        rej: reject,
        param: params
      });
    });
  },
  // 修改检测项的判断结果
  updateProjectResults(params) {
    return new Promise(function(resolve, reject) {
      post({
        url: "/_data/base/judgeDict/updateJudgeDict",
        fnc: resolve,
        rej: reject,
        param: params
      });
    });
  },
  // 删除检测项的判断结果
  deleteProjectResults(params) {
    return new Promise(function(resolve, reject) {
      post({
        url: "/_data/base/judgeDict/removeJudgeDict",
        fnc: resolve,
        rej: reject,
        param: params
      });
    });
  },
  // 获取检测项的判断结果信息（展示）
  getProjectResultsInfoById(params) {
    return new Promise(function(resolve, reject) {
      get({
        url: "/_data/base/judgeDict/loadByExample",
        fnc: resolve,
        rej: reject,
        param: params
      });
    });
  },
  /**基础数据👆**/
  //退出
  logout() {
    return new Promise(function(resolve, reject) {
      post({
        url: "/logout",
        fnc: resolve,
        rej: reject
      });
    });
  },
  /**根据传入的地区id以及地区树形结构数据获取以传入地区id为顶点的树形数据，传入的树形结构数据参照store的地区树形数据
   * 返回数据结果参照store的地区树形数据
   * @param {string} districtCode 地区编码
   * @param {array} treeData 地区树形数据,数据结构参照store里的地区树形数据
   * */
  getDistrictTreeByNode(districtCode, treeData) {
    const queue = [];
    let subTree = [];
    if (!districtCode || !treeData) {
      return subTree;
    }
    for (let i in treeData) {
      let node = treeData[i];
      if (node !== null) {
        queue.push(node);
        while (queue.length > 0) {
          const item = queue.shift();
          if (item.id == districtCode) {
            subTree.push(item);
            break;
          }
          if (item.children) {
            Array.from(item.children).forEach(child => {
              queue.push(child);
            });
          }
        }
      }
    }
    return subTree;
  },
  //下载
  createDownloadUrl(downloadPath, fileId) {
    if (!fileId) {
      return "";
    }
    return downloadPath + "/_data/frame/fbfile/download?fbFileId=" + fileId;
  },
  //文件显示路径
  createFileShowUrl(downloadPath, fileId) {
    if (!fileId) {
      return "";
    }
    return downloadPath + "/_data/frame/fbfile/show?fbFileId=" + fileId;
  },
  createOfficeFileUrl(downloadPath, fileId, fileName) {
    if (!fileId) {
      return "";
    }
    let fileUrl = this.createDownloadUrl(downloadPath, fileId);
    fileUrl = fileUrl
      ? "http://" +
        window.location.host +
        fileUrl +
        "&fileName=" +
        encodeURIComponent(fileName)
      : fileUrl;
    return downloadPath + "/_view/common/util/officeView?src=" + fileUrl;
  },
  //预览附件方法
  reviewFile(baseUrl, scopeRow, callbackParam) {
    if (scopeRow.fileName.lastIndexOf(".") == -1) {
      return false;
    }
    //根据文件名称解析
    let filetype = scopeRow.fileName.substring(
      scopeRow.fileName.lastIndexOf(".") + 1
    );
    // let filetype = fileArray.length > 1 ? fileArray[1] : "";
    if (!filetype) {
      return false;
    }
    //图片预览
    if (
      filetype.toLowerCase() == "jpg" ||
      filetype.toLowerCase() == "jpeg" ||
      filetype.toLowerCase() == "png" ||
      filetype.toLowerCase() == "gif"
    ) {
      callbackParam.imageCallback();
      return false;
    }
    if (filetype.toLowerCase() == "pdf") {
      callbackParam.pdfCallback();
      //pdf
      return false;
    }
    if (
      filetype.toLowerCase() == "doc" ||
      filetype.toLowerCase() == "docx" ||
      filetype.toLowerCase() == "xls" ||
      filetype.toLowerCase() == "xlsx" ||
      filetype.toLowerCase() == "ppt" ||
      filetype.toLowerCase() == "pptx"
    ) {
      //其他文档
      window.open(
        this.createOfficeFileUrl(baseUrl, scopeRow.fileId, scopeRow.fileName)
      );
    } else {
      //其他
      this.createDownloadUrl(baseUrl, scopeRow.fileId);
    }
  },
  /**根据传入的地区id以及地区树形结构数据获取传入地区id的描述，传入的树形结构数据参照store的地区树形数据
   * 返回数据结果参照store的地区树形数据
   * @param {string} districtCode 地区编码
   * @param {array} treeData 地区树形数据,数据结构参照store里的地区树形数据
   * */
  getDistrictDspByCode(districtCode, treeData) {
    const queue = [];
    let subTree = "";
    if (!districtCode || !treeData) {
      return subTree;
    }
    for (let i in treeData) {
      let node = treeData[i];
      if (node !== null) {
        queue.push(node);
        while (queue.length > 0) {
          const item = queue.shift();
          if (item.id == districtCode) {
            subTree = item.text;
            break;
          }
          if (item.children) {
            Array.from(item.children).forEach(child => {
              queue.push(child);
            });
          }
        }
      }
    }
    return subTree;
  },
  /**统计分析管理*/
  //获得统计汇总配置
  getStatRulePageList(params) {
    return new Promise(function(resolve, reject) {
      get({
        url: "/_data/statistical/ruleSetting/getRulePage",
        fnc: resolve,
        rej: reject,
        param: params
      });
    });
  },
  //添加汇总配置
  addSummaryRule(param) {
    return new Promise(function(resolve, reject) {
      post({
        url: "/_data/statistical/ruleSetting/insertInfo",
        fnc: resolve,
        rej: reject,
        param: param
      });
    });
  },
  //批量删除汇总配置信息
  batchDeleteSummaryRule(param) {
    return new Promise(function(resolve, reject) {
      post({
        url: "/_data/statistical/ruleSetting/batchRemove",
        fnc: resolve,
        rej: reject,
        param: param
      });
    });
  },
  //修改汇总配置信息
  updateSummaryRule(param) {
    return new Promise(function(resolve, reject) {
      post({
        url: "/_data/statistical/ruleSetting/updateInfo",
        fnc: resolve,
        rej: reject,
        param: param
      });
    });
  },
  //删除汇总配置信息
  deleteSummaryRule(param) {
    return new Promise(function(resolve, reject) {
      post({
        url: "/_data/statistical/ruleSetting/removeInfo",
        fnc: resolve,
        rej: reject,
        param: param
      });
    });
  },
  //获取报表地址
  getReportServer() {
    return new Promise(function(resolve, reject) {
      post({
        url: "/_data/basic/property/report",
        fnc: resolve,
        rej: reject
      });
    });
  },
  //获取区域树
  getDistrictTree() {
    return new Promise(function(resolve, reject) {
      get({
        url: "/_data/basic/district2/treeByUser",
        fnc: resolve,
        rej: reject
      });
    });
  },

  //更新样品任务信息
  updateSampleTask(param) {
    return new Promise(function(resolve, reject) {
      post({
        url: "/_data/task/samplingTask/updateSamplingTask",
        fnc: resolve,
        rej: reject,
        param: param
      });
    });
  }
};

export default qas_api;
