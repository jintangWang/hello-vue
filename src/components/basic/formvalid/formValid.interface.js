//v1.0
	require('./jquery.formValid');
	
	var fmValid = {};
	
	fmValid.formValid = function(_box,config){
		var $p = $(_box || document);
		$p.addClass('formValidGrid');
		$p.formValid(config);
	};
	fmValid.formShowErrorMessage = function(_box,id,tips){
		var $p = $(_box || document);
		$p.showErrorMessage(id,tips);
	};
	fmValid.formShowTipMessage = function(_box,id,tips){
			var $p = $(_box || document);
			$p.showTipMessage(id,tips);
	};
	fmValid.formAddSuccessClass = function(_box,id){
			var $p = $(_box || document);
			$p.addSuccessClass(id);
	};
	fmValid.formBeforeSubmitCheck = function(_box){
			var $p = $(_box || document);
			return $p.beforeSubmitCheck();
	};
	fmValid.getInputIdFailedSubmit = function(_box){
		var $p = $(_box || document);
		return $p.getFailSubmitId();
	};
	fmValid.checkValue = function(_box)
	{
		var $p = $(_box || document);
		return new $p.checkValue;
	};
	fmValid.checkValid = function()
	{
		return $.checkValid();
	};
	
	module.exports = fmValid;
	
	if(typeof(furnace) !== 'undefined'){
		furnace.clone(fmValid);
	}
