	;(function($){
		//定义一个数组记录表单验证的情况
		var arr = [];
		//得到元素的输入值
		var getVal=function(id){
			return $.trim($('#'+id).val());
		};
		var getValNoRs=function(id){
			return $('#'+id).val();
		};
		//元素是否需要进行非空验证
		var checkNul = function(id){
			if(typeof($('#'+id).attr('checkNull'))=='undefined')
			{
				return false;
			}
			else
			{
				if($('#'+id).attr('checkNull')=='yes')
				{
					return true;
				}
			}
		};
		var _globaloptions = {
			ignoreHidden:false,
			tipsCustom:false
		};
		var tipsModeArr = {};
		//获取所在form表单的tipsCustom为truhe还是false,为true时表示自定义的提示方式
		var tipsMode = function(formId){
			return tipsModeArr[formId];
		};
		var checkInput = new checkValue();
		$.fn.extend({
			//选择需要验证的表单
			"formValid":function(value){
				if(typeof(value) != 'undefined')
				{
					var value = $.extend({},_globaloptions,value);
				}
				else
				{
					var value = _globaloptions;
				}
				tipsModeArr[$(this).attr('id')] = value.tipsCustom;
				var ignoreHidden = value.ignoreHidden;
				//输入框获得焦点后的输入提示
				bindTips(this);

				checkBind(this,ignoreHidden);
				return this;
			},
			//获取提交失败的元素ID
			"getFailSubmitId":function(){
				var failArr=[];
				$("[checkType]",this).each(function(){
					if($(this).hasClass('errorTipsColor')){
						failArr.push($(this).attr("id"))
					}
				});

				return failArr;
			},
			//提交表单之前的统一验证
			"beforeSubmitCheck":function(){
				//点击提交的时候数组清零
				arr.length = 0;

				//表单全部含有checkType属性元素的验证,formValid方法中已执行
				$("[checkType]",this).blur();
				var flag = false;
				//检验数组中是否有false，确定表单是否有元素内容输入错误
				return in_array(flag,arr);
			},
			//
			"showErrorMessage":showErrorMessage,
			"showTipMessage":showTipMessage,
			"addSuccessClass":successAndHideTips,
			"checkValue":function(){var check = new checkValue();return check;}
		});

		//需要提示信息的元素
		function bindTips(obj)
		{
			var formId = $(obj).attr('id');
			$("[formtips]",obj).focusin(function(){
				if($(this).attr('ignore')!='yes'||typeof($(this).attr('ignore'))=='undefined')
				{
					var objId = $(this).attr('id');
					var tips = $(this).attr('formtips');
					if(tips === '')
					{
						tips = '请输入正确信息';
					}
					if($(this).attr('type')=='checkbox')
					{
						var thisGroup = $(this).attr('checkGroup');
						objId = $('[checkGroup="'+thisGroup+'"]:eq(0)').attr('id');
					}
					var msgWrapId = 'msg_'+objId;
					if($('#'+msgWrapId).length<1&&!tipsMode(formId))
					{
						var msgWrapClass;
						if($(this).attr('type')=='checkbox')
						{
							msgWrapClass = "tipMsgWrap checkboxGroupWrap";
						}
						else
						{
							msgWrapClass = "tipMsgWrap";
						}
						var msgWrap = "<span class='"+msgWrapClass+"' id='"+msgWrapId+"'></span>";
						$("#"+objId).before(msgWrap);
					}

					showTipMessage(objId, tips, formId);
				}
			}).focusout(function(){
				if(typeof($(this).attr('checkType'))=='undefined'||$(this).attr('checkType')=='custom')
				{
					var objId = $(this).attr('id');
					if($(this).attr('type')=='checkbox')
					{
						var thisGroup = $(this).attr('checkGroup');
						objId = $('[checkGroup="'+thisGroup+'"]:eq(0)').attr('id');
					}
					addSuccessClass(objId,formId);
				}
			});
		}
		//需验证的元素对应验证方法
		function checkBind(obj,ignoreHidden)
		{
			var formId = $(obj).attr('id');
			$("[checkType]",obj).each(function(){
				var id = $(this).attr('id');
				if($(this).attr('type')=='checkbox')
				{
					var thisGroup = $(this).attr('checkGroup');
					id = $('[checkGroup="'+thisGroup+'"]:eq(0)').attr('id');
				}
				var checkNullArr=$(this).attr('checkType').split(',');
				var msgWrap='';
				var pObj = $(this).parent();
				if(!in_array('isNull',checkNullArr))
				{
					var checkNull = 'notNullCheck';
					$(this).addClass(checkNull);
				}
				var msgWrapId = "msg_"+id;
				if(pObj.find('#'+msgWrapId).length>0 || tipsMode(formId))
				{
					msgWrap += '';
				}
				else
				{
					var msgWrapClass;
					if($(this).attr('type')=='checkbox')
					{
						msgWrapClass = "tipMsgWrap checkboxGroupWrap";
					}
					else
					{
						msgWrapClass = "tipMsgWrap";
					}
					msgWrap += "<span class='"+msgWrapClass+"' id='"+msgWrapId+"'></span>";
				}
				$('#'+id).before(msgWrap);
			});
			$("[checkType]",obj).blur(function(){
				var $this = $(this);
				if($this.attr('checkType')!='custom')
				{
					if($this.attr('type')=='checkbox')
					{
						var thisGroup = $this.attr('checkGroup');
						var thisid = $('[checkGroup="'+thisGroup+'"]:eq(0)').attr('id');
						$this = $('#'+thisid);
					}
					if(ignoreHidden)
					{
						if($this.attr('ignore')!='yes'&&$this.css('display')!='none')
						{

							checkVal($this,formId);
						}
					}
					else
					{
						if($(this).attr('ignore')!='yes')
						{
							checkVal($this,formId);
						}
					}
				}
			});
			$("[checkType]",obj).focusin(function(){
				if(typeof($(this).attr('formtips'))=='undefined')
				{
					var objId = $(this).attr('id');
					if($(this).attr('type')=='checkbox')
					{
						var thisGroup = $(this).attr('checkGroup');
						objId = $('[checkGroup="'+thisGroup+'"]:eq(0)').attr('id');
					}
					$('#msg_'+objId).html('');
				}
			});
		}
		//错误信息提示
		function showErrorMessage(id, msg,formID)
		{
			var formID = formID||$(this).attr('id');
			var objHeight = $('#'+id).height();
			$('#'+id).addClass('errorTipsColor');
			var id = "msg_" + id;
			var msgLength = msg.length;
			var tipWidth = (msgLength)*12;
			var imgInputTip;
			imgInputTip = '<div class="errorTips">'+msg+'</div><div class="tipErr">&#9670;</div>';
			if(tipsMode(formID))
			{
				imgInputTip = '<div class="errorTipsCustom">'+msg+'</div>';
			}
			$("#" + id).html(imgInputTip);
			$('#'+id).css('display','inline-block');
			arr.push(false);
		}
		//提示信息
		function showTipMessage(id, msg,formID)
		{
			var formID = formID||$(this).attr('id');
			var id = "msg_" + id;
			var imgInputTip = '<div class="formTip">'+msg+'</div><div class="tipFixed">&#9670;</div>';
			if(tipsMode(formID))
			{
				imgInputTip = '<div class="formTipCustom">'+msg+'</div>';
			}
			$("#" + id).html(imgInputTip);
			$('#'+id).css('display','inline-block');
		}
		//填写正确后调用
		function addSuccessClass(id,formID)
		{
			var msgid = "msg_" + id;

			if(tipsMode(formID))
			{
				var rightTips = '<div class="rightTipCustom"></div>';
				$('#'+msgid).html(rightTips);
				$('#'+id).removeClass('errorTipsColor');
			}
			else
			{
				//加入这个判断，防止已经添加验证规则的元素，又在验证流程中需要调用showErrorMessage方法时，元素不弹出提示框
				if($('#'+msgid).children('.errorTips').length<=0)
				{
					$('#'+id).removeClass('errorTipsColor');
					$('#'+msgid).hide();
				}
			}

			arr.push(true);
		}
		//外部调用的方法，与上一个方法的区别是，因为要外部调用，不用判断，用这个直接隐藏提示，否则如果上一个方法外部调用，因为不是在焦点失去和获得的时候有一个过程，而是直接控制，在经过判断时就会无法取出错误提示
		function successAndHideTips(id)
		{
			var msgid = "msg_" + id;
			if(tipsMode($(this).attr('id')))
			{
				var rightTips = '<div class="rightTipCustom"></div>';
				$('#'+msgid).html(rightTips);
				$('#'+id).removeClass('errorTipsColor');
			}
			else
			{
				$('#'+id).removeClass('errorTipsColor');
				$('#'+msgid).hide();
			}
			arr.push(true);
		}
		function checkVal(obj,formId)
		{
			var objCheckType = obj.attr('checkType');
			var id = obj.attr('id');
			var flagAllCheck;
			var tipMsg;

			if(typeof(obj.attr('errMsg'))!='undefined')
			{
				tipMsg = obj.attr('errMsg');
			}
			if(objCheckType)
			{
				var checkArr = objCheckType.split(',');
				var hasAjaxCheck = in_array('ajaxCheck',checkArr);
				if(!hasAjaxCheck)
				{
					var arrIndex = $.inArray('ajaxCheck',checkArr);
					checkArr.splice(arrIndex,1);
					checkArr.push('ajaxCheck');
				}
				for(var i=0;i<checkArr.length;i++)
				{
					//	var flagAllCheckFun = checkInput[checkArr[i]];
					if(checkArr[i]!='ajaxCheck')
					{
						flagAllCheck = eval("checkInput."+checkArr[i]+"(id)");
						if(flagAllCheck)
						{
							addSuccessClass(id,formId);
						}
						else
						{
							if(typeof(obj.attr('errMsg'))=='undefined')
							{
								tipMsg = checkErrMsg(checkArr[i]);
							}
							if(obj.attr('type')=='checkbox')
							{
								tipMsg = "至少勾选一项！";
							}
							showErrorMessage(id, tipMsg,formId);
							break;
						}
					}
					else
					{
						//	flagAllCheckFun(id,formId);
						eval("checkInput."+checkArr[i]+"(id,formId)");
					}

				}
			}
		}
		//根据验证类型对应errorMsg
		function checkErrMsg(objCheckType)
		{
			var tipMsg;
			switch (objCheckType)
			{
				case 'isEmail':
					tipMsg = 'email格式不对';break;
				case 'isNull':
					tipMsg = '内容不能为空';break;
				case 'conLength':
					tipMsg = '内容长度不对(注：一中文字占三个单位长度)';break;
				case 'isIP':
					tipMsg = 'IP格式错误';break;
				case 'regVal':
					tipMsg = '格式错误';break;
				case 'numberScope':
					tipMsg = '所输入内容大小不合适';break;
				case 'passwordRecheck':
					tipMsg = '两次输入不一致';break;
				case 'checkPhone':
					tipMsg = '电话格式不对';break;
				case 'isMobilePhone':
					tipMsg = '手机号码格式不对';break;
				case 'isPort':
					tipMsg = '端口号格式不对';break;
				case 'ajaxCheck':
					tipMsg = '该值已存在';break;
				default:
					tipMsg = '不符合格式要求';
			}
			return tipMsg;
		}
		//数组中是否含有某元素
		function in_array(value,arr)
		{
			for(var i=0;i<arr.length;i++)
			{
				if(arr[i] == value)
					return false;
			}
			return true;
		}
		$.extend({
			checkValid:function(){
				var ck = new checkValue();
				return ck;
			}
		});

		/***********规则验证函数*****************/
		function checkValue()
		{

			//非空
			this.isNull=function(id)
			{
				var checkVal = getVal(id);
				if(checkVal === '')
				{
					return false;
				}
				else
				{
					return true;
				}
			};
			//密码一致性
			this.passwordRecheck=function(id)
			{
				var checkVal = getVal(id);
				var recheckObjId = $('#'+id).attr('recheckId');
				if(typeof(recheckObjId)!='undefined')
				{
					var recheckVal = getVal(recheckObjId);
					if(checkVal == recheckVal)
					{
						return true;
					}
					else
					{
						return false;
					}
				}
			};
			//email
			this.isEmail=function(id)
			{
				var checkVal = getVal(id);
				var reg = /^[-_A-Za-z0-9]+@([_A-Za-z0-9]+\.)+[A-Za-z0-9]{2,3}$/;

				if(reg.test(checkVal) || checkVal === '')
				{
					return true;
				}
				else
				{
					return false;
				}
			};
			//逗号隔开的邮件组
			this.emailGroup=function(id)
			{
				var checkVal = getVal(id);
				var reg = /^[-_A-Za-z0-9]+@([_A-Za-z0-9]+\.)+[A-Za-z0-9]{2,3}(,[-_A-Za-z0-9]+@([_A-Za-z0-9]+\.)+[A-Za-z0-9]{2,3}){0,}$/;

				if(reg.test(checkVal)||checkVal === '')
				{
					return true;
				}
				else
				{
					return false;
				}
			};
			//长度限制
			this.conLength=function(id)
			{
				var checkVal = getVal(id);
				var minlength = $('#'+id).attr('minlength');
				var maxlength = $('#'+id).attr('maxlength');

				if (typeof checkVal != "string"){
					checkVal += "";
				}
				var lengthStr = checkVal.replace(/[^\x00-\xff]/g,"01p").length;

				if(lengthStr>maxlength||lengthStr<minlength)
				{
					return false;
				}
				else
				{
					return true;
				}
			};
			//ipv4
			this.isIPv4=function (id)
			{
				var checkVal = getVal(id);
				var checkArr = [];
				var reg=/^(\d+)\.(\d+)\.(\d+)\.(\d+)$/g;
				var flag = false;
				if($('#'+id).attr('allowMulti')){//如果允许多个值都验证
					checkArr = checkVal.split(',');
					if(checkArr.length>1 && checkVal.indexOf("~")!=-1){
						return flag;
					}
				}

				if(checkVal === '')
				{
					flag = true;
				}
				else if(checkArr.length==0)//不带allowMulti属性时
				{
					flag=checkPerIP(reg,checkVal)
				}
				else if(checkArr.length>0&&checkArr.length<=50)
				{
					flag=checkMultiIP(reg,checkArr);
				}
				else if(checkArr.length>50)
				{
					flag=false;
				}
				return flag;
			};
			function checkMultiIP(reg,Arr){
				var result=true;
				var l=Arr.length;
				var temObj={};
				for (var i=0;i<l;i++){//重复性检验
					temObj[Arr[i]]=true;
				}
				if(Object.getOwnPropertyNames(temObj).length!=l){
					result=false;
					return result;
				}

				for (var j=0;j<l;j++){
					// reg.lastIndex=0;
					result=checkPerIP(reg,Arr[j]);
				}
				return result;
			}
			function checkPerIP(reg,checkVal){
				var flag=false;
				reg.lastIndex=0;
				if(checkVal.indexOf('~')!=-1){//检测192.168.1.1~192.168.1.100这种类型的ip
					var durArr = checkVal.split('~');
					if(durArr.length!==2){
						return flag;
					}
					reg.lastIndex=0;
					if(reg.test(durArr[0])){
						if( RegExp.$1 <256 && RegExp.$2<256 && RegExp.$3<256 && RegExp.$4<256)
						{
							var regArrStart=[RegExp.$1,RegExp.$2,RegExp.$3,RegExp.$4];
							reg.lastIndex=0;
							if(reg.test(durArr[1])){
								if( RegExp.$1 <256 && RegExp.$2<256 && RegExp.$3<256 && RegExp.$4<256)
								{
									var regArrEnd=[RegExp.$1,RegExp.$2,RegExp.$3,RegExp.$4];
									var l=regArrStart.length;
									for(j=0;j<l-1;j++){
										if(regArrStart[j]!=regArrEnd[j]){
											return flag;
										}
									}
									if(regArrEnd[l-1]-regArrStart[l-1]>=1){
										flag=true;
									}
								}
							}
						}
					}
				}else if(reg.test(checkVal)){
					if( RegExp.$1 <256 && RegExp.$2<256 && RegExp.$3<256 && RegExp.$4<256)
					{
						flag = true;
					}
				}
				return flag;
			}
			//IP
			this.isIP=function (id)
			{
				var checkVal = getVal(id);
				var reg=/^(\d+)\.(\d+)\.(\d+)\.(\d+)$/g;
				var ipv6 = /^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$/;
				var flag = false;
				if(checkVal === '')
				{
					flag = true;
				}
				else if(reg.test(checkVal))
				{
					if( RegExp.$1 <256 && RegExp.$2<256 && RegExp.$3<256 && RegExp.$4<256)
					{
						flag = true;
					}
					else
					{
						flag = false;
					}
				}
				else if(ipv6.test(checkVal))
				{
					flag = true;
				}
				return flag;
			};
			//网址
			this.isDomain=function (id)
			{
				var checkVal = getVal(id);
				var regExp = /^((https?|ftp|news):\/\/)?([a-z]([a-z0-9\-]*[\.。])+([a-z]{2}|aero|arpa|biz|com|coop|edu|gov|info|int|jobs|mil|museum|name|nato|net|org|pro|travel)|(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5]))(\/[a-z0-9_\-\.~]+)*(\/([a-z0-9_\-\.]*)(\?[a-z0-9+_\-\.%=&]*)?)?(#[a-z][a-z0-9_]*)?$/;
				if(regExp.test(checkVal) || this.isIP(id) || checkVal==='' )
				{
					return true;
				}
				return false;
			};
			/*************/
			//电话
			this.checkPhone=function (id)
			{
				var checkVal = getVal(id);
				var phoneRegWithArea = /^[0][1-9]{2,3}-[0-9]{5,10}$/;
				var phoneRegNoArea = /^[1-9]{1}[0-9]{5,8}$/;
				if ( checkVal.length > 9 ) {
					if ( phoneRegWithArea.test(checkVal)||checkVal === '' ) {
						return true;
					}
					else {
						return false;
					}
				}
				else {
					if ( phoneRegNoArea.test( checkVal )||checkVal === '') {
						return true;
					}
					else {
						return false;
					}
				}
			};
			//邮编
			this.isPostcode=function (id)
			{
				var checkVal = getVal(id);
				var re= /^[1-9][0-9]{5}$/;
				if(re.test(checkVal)||checkVal === '')
				{
					return true;
				}
				return false;
			};
			//手机号码
			this.isMobilePhone=function (id)
			{
				var checkVal = getVal(id);
				var re= /^(13[0-9]|15[0|1|2|3|5|6|7|8|9]|18[0-9]|17[6|7|8])\d{8}$/;
				if(re.test(checkVal)||checkVal === '')
				{
					return true;
				}
				return false;
			};
			//正整数
			this.isNumber=function (id)
			{
				var checkVal = getVal(id);
				var reg = new RegExp("^[1-9][0-9]*$");
				if(reg.test(checkVal)||checkVal === '')
				{
					return true;
				}
				else
				{
					return false;
				}

			};
			//0或正数
			this.positiveNumber=function (id)
			{
				var checkVal = getVal(id);
				if (checkVal>=0 ||checkVal === '')
				{
					return true;
				}
				else
				{
					return false;
				}
			};
			//自然数
			this.isNaturalNumber=function (id)
			{
				var checkVal = getVal(id);
				var re = "^[0-9]+$";
				var re = new RegExp(re);
				if ((checkVal.search(re) != - 1) ||checkVal === '')
				{
					return true;
				}
				else
				{
					return false;
				}
			};
			//整数
			this.isInteger=function (id)
			{
				var checkVal = getVal(id);
				var re = /^[-]{0,1}[0-9]{1,}$/;
				if(re.test(checkVal)||checkVal === '')
				{
					return true;
				}
				return false;
			};
			//端口号
			this.isPort=function (id)
			{
				var checkVal = getVal(id);
				var re = /^[-]{0,1}[0-9]{1,}$/;
				if((re.test(checkVal)&& checkVal < 65536&&checkVal>0)||checkVal === '')
				{
					return true;
				}
				return false;
			};
			//由字母和数字组成
			this.isNumberOrLetter=function (id)
			{
				var checkVal = getVal(id);
				var regu = "^[0-9a-zA-Z]+$";
				var re = new RegExp(regu);
				if(re.test(checkVal)||checkVal === '')
				{
					return true;
				}
				return false;
			};
			//数字或字母或汉字
			this.numberOrLetterOrCC=function (id)
			{
				var checkVal = getVal(id);
				var regu = "^[a-zA-Z0-9_\u4e00-\u9fa5]+$";
				var re = new RegExp(regu);
				if(re.test(checkVal)||checkVal == '')
				{
					return true;
				}
				return false;
			};
			//oma的name规则
			this.OMAName = function(id)
			{
				var checkVal = getVal(id);
				var reg = /^[A-Za-z0-9\-\_\.\u4e00-\u9fa5]+$/g;
				if((reg.test(checkVal)&&checkVal.length<=30)||checkVal === '')
				{
					return true;
				}
				return false;
			};
			this.ipOMAScope = function(id)
			{

				var checkVal = getVal(id);
				var strWords = '';
				function isIpScope(who)
				{
					var scope = who.replace('/\s/g','');
					if(scope == '*')
					{
						return true;
					}
					if(isIpCheck(scope))
					{
						return true;
					}
					var bIsExtString = false;
					var strWords = '';
					for(var i=0;i<scope.length;i++)
					{
						if(scope.charAt(i) != '*' && scope.charAt(i) != '-' && scope.charAt(i) != '[' && scope.charAt(i) != ']' && scope.charAt(i) != ',' && scope.charAt(i) != '.' && isNaN(scope.charAt(i)))
							return false;
						switch(scope.charAt(i))
						{
							case '[':
								if( bIsExtString )
								{
									return false;
								}
								bIsExtString = true;
								break;
							case ']':
								bIsExtString = false;
								break;
							case '\r':
							case '\n':
							case ',':
								if( bIsExtString )break;
								strWords += ';';
								continue;
							default:
								break;
						}
						strWords += scope.charAt(i);
					}

					var ips= []; //定义一数组
					var subIps = [];
					ips=strWords.split(";"); //字符分割
					var isint = /^\d+$/;
					for (var k=0;k<ips.length ;k++ )
					{
						if(ips[k] == '*')
							continue;
						if(isIpCheck(ips[k]))
							continue;
						if(ips[k].split(".").length != 4)
							return false;
						subIps = ips[k].split(".");


						if(!isint.test(subIps[0]))
							return false;
						if(!isint.test(subIps[1]))
							return false;
						if(subIps[0] === 0 || subIps[0]>255 || subIps[1]>255)
							return false;

						for (var j=2;j<subIps.length ;j++ )
						{
							if(subIps[j] == '*')
								continue;
							if(isint.test(subIps[j]) && subIps[j] > 255)
								return false;
							else if(!isint.test(subIps[j]))
							{
								if(subIps[j].split("[").length != 2 || subIps[j].split("]").length != 2)
									return false;
								var tmp = subIps[j].split("[")[1].split("]")[0];
								for (var l=0;l<tmp.split(",").length;l++ )
								{
									var v1 = tmp.split(",")[l];
									if(isint.test(v1) && v1>255)
										return false;
									else if(!isint.test(v1))
									{
										var v2= v1.split("-");
										if(v2.length != 2)
											return false;
										if( parseInt(v2[0]) >= parseInt(v2[1]) || v2[0] > 255 || v2[1] > 255)
											return false;
									}
								}
							}
						}
					}
					return true;
				}

				function isIpCheck(data)
				{
					if(/^((([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5]))$/.test(data))
						return true;
					else
						return false;
				}
				return isIpScope(checkVal)||checkVal === '';
			};
			//数字范围
			this.numberScope=function (id)
			{
				var checkVal = getVal(id);
				if(checkVal === '')
				{
					return true;
				}
				else if(this.isInteger(id))
				{
					var minNumber = $('#'+id).attr('minNum')-0;
					var maxNumber = $('#'+id).attr('maxNum')-0;
					if(checkVal<minNumber||checkVal>maxNumber)
					{
						return false;
					}
					else
					{
						return true;
					}
				}
				else
				{
					return false;
				}
			};

			//密码
			this.psw=function (id)
			{
				var checkVal = getVal(id);
				var re= /\~|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\-|\_|\+|\=/;
				if(checkVal.search(re)!=-1||checkVal === '')
				{
					return true;
				}
				return false;
			};


			/******密码相关*******/
			//含数字
			this.hasNum = function(id)
			{
				var checkVal = getVal(id);
				var reg = /[0-9]/;
				if(reg.test(checkVal)||checkVal === '')
				{
					return true;
				}
				return false;
			};

			//含小写字母
			this.hasLowerLetter = function(id)
			{
				var checkVal = getVal(id);
				var reg = /[a-z]/;
				if(reg.test(checkVal)||checkVal === '')
				{
					return true;
				}
				return false;
			};



			//含大写字母
			this.hasUpperLetter = function(id)
			{
				var checkVal = getVal(id);
				var reg = /[A-Z]/;
				if(reg.test(checkVal)||checkVal === '')
				{
					return true;
				}
				return false;
			};
			//含特殊字符
			this.hasSpecChar = function(id)
			{
				var checkVal = getVal(id);
				var re= /\~|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\-|\_|\+|\=|\{|\}|\[|\]|\||\\|\:|\;|\"|\'|\<|\>|\,|\.|\?|\/|\`/;
				if(checkVal.search(re)!=-1||checkVal === '')
				{
					return true;
				}
				return false;

			};

			//不含特殊字符
			this.hasnotSpecChar = function(id)
			{
				var checkVal = getVal(id);
				var re= /\~|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\-|\_|\+|\=|\{|\}|\[|\]|\||\\|\:|\;|\"|\'|\<|\>|\,|\.|\?|\/|\`/;
				if(checkVal.search(re)==-1||checkVal == '')
				{
					return true;
				}
				return false;

			};

			/*************/


			//0~100
			this.perNum=function (id)
			{
				var checkVal = getVal(id)-0;
				if ((checkVal>=0&&checkVal <=100)||checkVal === '')
				{
					return true;
				}
				else
				{
					return false;
				}
			};
			this.ajaxCheck=function (id,formId)
			{
				var checkVal = getVal(id);
				var sendData = $('#'+id).serializeObject();
				var ajaxConfig= $('#'+id).attr('ajaxUrl');
				ajaxConfig = JSON.parse(ajaxConfig);
				var ajaxUrl = ajaxConfig.url;
				var ajaxTips = ajaxConfig.tip;
				var relationId = ajaxConfig.relationID;
				var ignoreDefaultVal = ajaxConfig.ignoreDefaultVal||false;
				if(typeof relationId != 'undefined')
				{
					for(var i=0;i<relationId.length;i++)
					{
						sendData = $.extend({}, sendData, $('#'+relationId[i]).serializeObject());
					}
				}
				if(checkVal === '')
				{
					return true;
				}

				else
				{
					if(ignoreDefaultVal)
					{
						if(checkVal == $.trim($('#'+id).get(0).defaultValue))
						{
							return true;
						}
					}
					$.ajax({
						type:'POST',
						dataType: 'json',
						contentType: 'application/json',
						url : ajaxUrl,
						global:false,
						async:false,
						data : JSON.stringify(sendData),
						success : function(dataVal) {
							if(dataVal)
							{
								addSuccessClass(id,formId);
							}
							else
							{
								showErrorMessage(id, ajaxTips,formId);
							}
						}
					});
				}
			};
			/******************/
			//自定义验证正则，取reg属性的值作为正则表达式验证
			this.regVal=function (id)
			{
				var checkVal = getVal(id);
				var reg = eval($('#'+id).attr('reg'));
				if(reg.test(checkVal)||checkVal === '')
				{
					return true;
				}
				return false;
			};
			this.checkboxGroup = function(id)
			{
				var thisGroup = $('#'+id).attr('checkGroup');
				if(!$('[checkGroup='+thisGroup+']:checked').length)
				{
					return false;
				}
				return true;
			};
			//含有< >
			this.hasTag=function (id)
			{
				var checkVal = getVal(id);
				var re = /<\/?.+?>/;
				if(checkVal === '')
				{
					return true;
				}
				else if(re.test(checkVal))
				{
					return false;
				}
				else
				{
					return true;
				}

			};
			this.customFuns=function(id)
			{
				var checkVal = getVal(id);
				var funs = $('#'+id).attr('funs');
				var flag = eval(funs);
				return flag;
			};
		}

	})(jQuery);
