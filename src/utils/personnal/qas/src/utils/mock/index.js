import Mock from "mockjs";

const Random = Mock.Random;

function getData() {
  let datalist = [];
  for (let i = 0; i < 100; i++) {
    let newData = {
      title: Random.csentence(5, 30), //  Random.csentence( min, max )
      thumbnail_pic_s: Random.dataImage("300x250", "mock的图片"), // Random.dataImage( size, text ) 生成一段随机的 Base64 图片编码
      author_name: Random.cname(), // Random.cname() 随机生成一个常见的中文姓名
      date: Random.date() + " " + Random.time() // Random.date()指示生成的日期字符串的格式,默认为yyyy-MM-dd；Random.time() 返回一个随机的时间字符串
    };
    datalist.push(newData);
  }
  return {
    data: datalist
  };
}
export const data1 = Mock.mock("/webPortalNews/page", function() {
  let datalist = [];
  for (let i = 0; i < 10; i++) {
    let newData = {
      title: Random.csentence(10, 30), //  Random.csentence( min, max )
      content: Random.cparagraph(20, 30), //  Random.cparagraph( min, max )
      sysId: Random.integer(1, 100), //  Random.integer( min, max )
      thumbnail_pic_s: Random.dataImage("300x250", "mock的图片"), // Random.dataImage( size, text ) 生成一段随机的 Base64 图片编码
      author_name: Random.cname(), // Random.cname() 随机生成一个常见的中文姓名
      showTime: Random.date() + " " + Random.time() // Random.date()指示生成的日期字符串的格式,默认为yyyy-MM-dd；Random.time() 返回一个随机的时间字符串
    };
    datalist.push(newData);
  }
  return {
    data: datalist
  };
});

export const data2 = Mock.mock("/webPortalNews/loadByExample", {
  title: Random.csentence(10, 30), //  Random.csentence( min, max )
  content: Random.cparagraph(20, 30), //  Random.cparagraph( min, max )
  sysId: Random.integer(1, 100) //  Random.integer( min, max )
});

export const data3 = Mock.mock("/domian/list", function() {
  let datalist = [];
  for (let i = 0; i < 10; i++) {
    let newData = {
      title: Random.csentence(10, 30), //  Random.csentence( min, max )
      content: Random.cparagraph(20, 30), //  Random.cparagraph( min, max )
      sysId: Random.integer(1, 100), //  Random.integer( min, max )
      thumbnail_pic_s: Random.dataImage("300x250", "mock的图片"), // Random.dataImage( size, text ) 生成一段随机的 Base64 图片编码
      author_name: Random.cname(), // Random.cname() 随机生成一个常见的中文姓名
      showTime: Random.date() + " " + Random.time() // Random.date()指示生成的日期字符串的格式,默认为yyyy-MM-dd；Random.time() 返回一个随机的时间字符串
    };
    datalist.push(newData);
  }
  return {
    data: datalist
  };
});

export const data4 = Mock.mock("/page", {
  key: "2",
  value: "2"
});
