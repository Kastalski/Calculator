/**
 * Created with JetBrains WebStorm.
 * User: kastalski
 * Date: 13/02/13
 * Time: 14:12
 * To change this template use File | Settings | File Templates.
 */
function HelperMethods() {
    return {
        isNumber : function (string) {
            return !isNaN(parseFloat(string)) && isFinite(string)
        }
    }
}