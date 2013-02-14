/**
 * Created with JetBrains WebStorm.
 * User: kastalski
 * Date: 12/02/13
 * Time: 17:48
 * To change this template use File | Settings | File Templates.
 */
(function( $ ) {
    var Operations = {
        divide : ' /',
        multiply : ' *',
        minus : ' -',
        plus : ' +',
        equal : ' ='
    }
    var Params = {
        x1: '',
        x2: '',
        operation: ''
    }
    var LengthField = 8
    var methods = {
        init : function( options ) {
            if (options != null) {
                methods.mergeCalcOptions(options)
            }
            var $this = $(this)
            methods.createInput($this)
            methods.createOnOffButtons($this)
            methods.createNumberButtons($this)
            methods.createOperationButtons($this)
            methods.createSpinner($this)
            methods.createHistory($this)
            methods.onCalculator()
        },
        mergeCalcOptions: function(options) {
            var lengthField = options.lengthField
            if (lengthField != null && /^[2-9]{1}$/.test(lengthField)) {
                LengthField = lengthField
            }

            var creationMethods = options.creationMethods
            if (creationMethods != null) {
                $.extend(methods, creationMethods)
            }

            var helperMethods = options.helperMethods
            if (helperMethods != null) {
                $.extend(methods, helperMethods)
            }
        },
        createInput : function($this) {	},
        createOnOffButtons : function($this) { },
        createNumberButtons : function ($this) { },
        createOperationButtons : function($this) { },
        createSpinner: function($this) { },
        createHistory: function($this) { },
        enterNumber : function () {
            var currentDigit = $(this).attr('button-data')
            var $calcInput = $('.calc_input')
            var curInputString = $calcInput.text()
            if (Params.x1 != '' && Params.operation == '') {
                $calcInput.text(currentDigit)
                Params.x1 = ''
                return
            }
            if (!methods.isNumber(curInputString)) {
                $calcInput.text(currentDigit)
                return
            }
            if (curInputString.length == 1 && curInputString == '0') {
                $calcInput.text(currentDigit)
                return
            }
            curInputString += currentDigit
            var wholeLength = curInputString.split('.')[0].replace('-', '').length
            if (wholeLength > LengthField) {
                return
            }
            $calcInput.text(curInputString)
        },
        enterOperation : function () {
            var currentOperation = $(this).attr('button-data')
            var $calcInput = $('.calc_input')
            var curInputString = $calcInput.text()
            if (!methods.isNumber(curInputString)) {
                curInputString = curInputString.slice(0, curInputString.length - 1) + Operations[currentOperation]
                $calcInput.text(curInputString)
                if (currentOperation == 'equal') {
                    Params.x2 = Params.x1
                    methods.calculate('')
                } else {
                    Params.operation = currentOperation
                }
                return
            }
            if (Params.x1 == '') {
                Params.x1 = curInputString
            } else if (Params.operation != '') {
                Params.x2 = curInputString
            }
            if (Params.x2 == '' && currentOperation == 'equal') {
                return
            }
            if (currentOperation == 'equal') {
                methods.calculate('')
                return
            }
            if (Params.x1 != '' && Params.x2 != '')
            {
                methods.calculate(currentOperation)
                return
            }
            curInputString += Operations[currentOperation]
            Params.operation = currentOperation
            $calcInput.text(curInputString)
        },
        onCalculator : function () {
            $('.calc_input').text('0')
            $('#on').unbind('click.calculator').bind('click.calculator', methods.onCalculator)
            $('#off').unbind('click.calculator').bind('click.calculator', methods.offCalculator)
            $('.number_buttons').unbind('click.calculator').bind('click.calculator', methods.enterNumber)
            $('.math_operations').unbind('click.calculator').bind('click.calculator', methods.enterOperation)
            methods.clearVariables()
        },
        offCalculator : function () {
            $('.calc_input').text(' ')
            $('#off').unbind('click.calculator')
            $('.number_buttons').unbind('click.calculator')
            $('.math_operations').unbind('click.calculator')
            methods.clearHistory()
        },
        clearVariables : function() {
            jQuery.each(Params, function(index) { Params[index] = '' })
        },
        clearHistory: function() {
            $('#historyList').children().detach()
        },
        calculate : function (nextOperation) {
            methods.showSpinner()
            jQuery.ajax({
                type: 'get',
                url: 'http://train.eu01.aws.af.cm/calc.php',
                dataType: 'jsonp',
                data: Params,
                success: function(data) {
                    if ( isNaN(parseFloat(data.result)) ) {
                        methods.onCalculator()
                        return
                    }
                    methods.addHisoryItem(data.result)
                    methods.clearVariables()
                    var $calcInput = $('.calc_input')
                    var inputValue = data.result.toString()
                    var breakedNumber = inputValue.split('.')
                    var wholeLength = breakedNumber[0].replace('-', '').length
                    var decimalLength = (breakedNumber[1] == null)? 0 : breakedNumber[1].length
                    if (wholeLength > LengthField) {
                        methods.onCalculator()
                        return
                    }
                    if (decimalLength > 0) {
                        if (wholeLength == LengthField) {
                            inputValue = inputValue.toString().slice(0, LengthField)
                        } else {
                            var roundKoef = Math.pow(10, LengthField - 1)
                            inputValue = Math.round(inputValue * roundKoef) / roundKoef
                            var index = inputValue / Math.abs(inputValue)
                            inputValue = index * (index * inputValue).toString().slice(0, LengthField + 1)
                        }
                    }
                    Params.x1 = data.result
                    if (nextOperation != '') {
                        Params.operation = nextOperation
                        inputValue += Operations[nextOperation]
                    }
                    $calcInput.text(inputValue)
                },
                complete: function() {
                    methods.hideSpinner()
                },
                error: function() {
                    methods.onCalculator()
                }
            })
        },
        showSpinner: function() {
            $('.calculator').addClass('opacity50').find('*').addClass('opacity50')
            $('.spinner_panel').fadeIn('slow')
        },
        hideSpinner: function() {
            $('.calculator').removeClass('opacity50').find('*').removeClass('opacity50')
            $('.spinner_panel').fadeOut('slow')
        },
        addHisoryItem: function(result) {
            var historyItem = _.template('<%=x1%> <%=op%> <%=x2%> = <%=result%>')
            var historyValues = {
                x1:Params.x1,
                op:Operations[Params.operation],
                x2:Params.x2,
                result:result
            }
            $('<li/>', {text: historyItem(historyValues)}).appendTo('#historyList')
        },
        isNumber : function (string) { return true }
    }
    $.fn.calculator = function(method) {
        if ( methods[method] ) {
            return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ))
        } else if ( typeof method === 'object' || ! method ) {
            return methods.init.apply( this, arguments )
        }
    }
})(jQuery)