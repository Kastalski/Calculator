/**
 * Created with JetBrains WebStorm.
 * User: kastalski
 * Date: 12/02/13
 * Time: 17:47
 * To change this template use File | Settings | File Templates.
 */
define({
    isNumber : function (string) {
        return !isNaN(parseFloat(string)) && isFinite(string)
    }
})