/**
 * Created with JetBrains WebStorm.
 * User: kastalski
 * Date: 13/02/13
 * Time: 14:47
 * To change this template use File | Settings | File Templates.
 */
requirejs(['CalculatorOptions'],
    function (options) {
        $(document).ready(function() {
            $('.calculator').calculator(options)
        })
    }

)