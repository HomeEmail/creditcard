// CRUD SQL语句
var panda={
	utvgo_supplier : {
		queryAll: 'select * from utvgo_supplier',
		insert:'INSERT INTO utvgo_supplier(id, name, logo,descript,createBy,editeBy,createTime,updateTime) VALUES(0,?,?,?,?,?,?,?)',
		update:'update utvgo_supplier set name=?, descript=? where id=?'
	},
	utvgo_language : {
		queryAll: 'select * from utvgo_language',
		insert:'INSERT INTO utvgo_language(id, name,descript,createBy,editeBy,createTime,updateTime) VALUES(0,?,?,?,?,?,?)',
		update:'update utvgo_language set name=?, descript=? where id=?'
	},
	utvgo_area : {
		queryAll: 'select * from utvgo_area',
		insert:'INSERT INTO utvgo_area(id, name,descript,createBy,editeBy,createTime,updateTime) VALUES(0,?,?,?,?,?,?)',
		update:'update utvgo_area set name=?, descript=? where id=?'
	},
	utvgo_channel : {
		queryAll: 'select * from utvgo_channel',
		insert:'INSERT INTO utvgo_channel(id, name,descript,createBy,editeBy,createTime,updateTime) VALUES(0,?,?,?,?,?,?)',
		update:'update utvgo_channel set name=?, descript=? where id=?'
	},
	utvgo_labels : {
		queryAll: 'select * from utvgo_labels',
		insert:'INSERT INTO utvgo_labels(id, name,functionType,functionData,descript,createBy,editeBy,createTime,updateTime) VALUES(0,?,?,?,?,?,?,?,?)',
		update:'update utvgo_labels set name=?, descript=? where id=?'
	},
	utvgo_video : {
		queryAll: 'select * from utvgo_video',
		insert:'INSERT INTO utvgo_video(id, name,status,multiSetType,pinyinFirst,prodTime,publicTime,offLineCache,aliasName,authStartTime,authEndTime,isFree,contentType,channelId,suplierId,areaId,languageId,priority,doubanScore,director,mainRole,imageSmall,imageMid,imageBig,descript,createBy,editeBy,auditBy,createTime,updateTime,auditeTime) VALUES(0,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
		update:'update utvgo_video set name=?,status=?,multiSetType=?,pinyinFirst=?,prodTime=?,publicTime=?,offLineCache=?,aliasName=?,authStartTime=?,authEndTime=?,isFree=?,contentType=?,channelId=?,suplierId=?,areaId=?,languageId=?,priority=?,doubanScore=?,director=?,mainRole=?,imageSmall=?,imageMid=?,imageBig=?,descript=?,createBy=?,editeBy=?,auditBy=?,createTime=?,updateTime=?,auditeTime=? where id=?'
	},
	utvgo_video_content : {
		queryAll: 'select * from utvgo_video_content',
		insert:'INSERT INTO utvgo_video_content(pk_id, videoId,title_name,status,priority,isFree,freeTime,video_high_url,video_fluency_url,audioStreamUrl,audioInternetStreamUrl,vod_id,small_image,mid_image,big_image,question_id,createBy,editeBy,auditBy,createTime,updateTime,auditeTime,playTime) VALUES(0,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
		update:'update utvgo_video_content set videoId=?,title_name=?,status=?,priority=?,isFree=?,freeTime=?,video_high_url=?,video_fluency_url=?,audioStreamUrl=?,audioInternetStreamUrl=?,vod_id=?,small_image=?,mid_image=?,big_image=?,question_id=?,createBy=?,editeBy=?,auditBy=?,createTime=?,updateTime=?,auditeTime=?,playTime=? where pk_id=?'
	}

};
module.exports = panda;