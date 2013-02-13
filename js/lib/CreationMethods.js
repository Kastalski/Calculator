/**
 * Created with JetBrains WebStorm.
 * User: kastalski
 * Date: 13/02/13
 * Time: 14:10
 * To change this template use File | Settings | File Templates.
 */
define({
    createInput : function($this) {
        var $input = $('<div/>', {'class': 'calc_input'})
        $this.append($input)
    },
    createOnOffButtons : function($this) {
        var $buttonsOnOff = $('<div/>', {'class': 'on_off_panel'})
        var $onButton = $('<input/>', {type: 'button', 'button-data': 'on', id: 'on', 'class': 'onOff_buttons', value: 'on'})
        var $offButton = $('<input/>', {type: 'button', 'button-data': 'off', id: 'off', 'class': 'onOff_buttons', value: 'off'})
        $onButton.appendTo($buttonsOnOff)
        $offButton.appendTo($buttonsOnOff)
        $buttonsOnOff.appendTo($this)
    },
    createNumberButtons : function ($this) {
        var $numbersPanel = $('<div/>', {'class': 'numbers_panel'})
        for (var i = 9; i >= 0; i--) {
            var $button = $('<input/>', {type: 'button', 'button-data': i, 'class': 'number_buttons', value: i})
            $numbersPanel.append($button)
            if ((i - 1) % 3 == 0) {
                $numbersPanel.append($('<br/>'))
            }
        }
        $('<center/>').append($numbersPanel).appendTo($this)
    },
    createOperationButtons : function($this) {
        var $operationPanel = $('<div/>', {'class' : 'operation_panel'})
        $('<input/>', {type: 'button', 'button-data': 'divide', 'class': 'math_operations', value: '/'}).appendTo($operationPanel)
        $('<input/>', {type: 'button', 'button-data': 'multiply', 'class': 'math_operations', value: '*'}).appendTo($operationPanel)
        $operationPanel.append($('<br/>'))
        $('<input/>', {type: 'button', 'button-data': 'minus', 'class': 'math_operations', value: '-'}).appendTo($operationPanel)
        $('<input/>', {type: 'button', 'button-data': 'plus', 'class': 'math_operations', value: '+'}).appendTo($operationPanel)
        $operationPanel.append($('<br/>'))
        $('<input/>', {type: 'button', 'button-data': 'equal', 'class': 'math_operations equal', value: '='}).appendTo($operationPanel)
        $operationPanel.appendTo($this)
    },
    createSpinner: function($this) {
        var $spinnerPanel = $('<div/>', {'class': 'spinner_panel', text: 'Wait Please'})
        $spinnerPanel.appendTo($this)
    },
    createHistory: function($this) {
        var $historyPanel = $('<div/>', {'class': 'historyList'})
        $('<ul/>', {id: 'historyList'}).appendTo($historyPanel)
        $this.after($historyPanel)
    }
})