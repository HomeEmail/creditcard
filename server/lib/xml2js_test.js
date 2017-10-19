var xml2js = require('xml2js');
var util = require('util');

var obj = {name: "Super", Surname: "Man", age: 23,extra:{a1:1,a2:2,a3:'a3'},ary:['a','b','c',11]};
//json to xml
var builder = new xml2js.Builder();
var xml = builder.buildObject(obj);
console.log(xml);

//xml to json 特别注意xml转成json后得表示
var parser = new xml2js.Parser();
var data = '<root><name date="08/08/2008" time="11:22:02">Super</name><Surname>Man</Surname><age>23</age><extra><a1>1</a1><a2>a2</a2></extra><ary>a</ary><ary>11</ary></root>';
parser.parseString(data, function (err, result) {
	console.log(util.inspect(result.root, false, null));//要使用util.inspect来显示全部节点
	console.log('Done');
	//再从json转成xml会是咋样呢？和data一样
	var xml = builder.buildObject(result.root);
	console.log(xml);
});






// export const someConfig='someConfig';

// export const openAlert = function () {
//     console.log('openAlert');
//     console.log('aaa');

// };

