/**
 * Created with JetBrains WebStorm.
 * User: kastalski
 * Date: 14/02/13
 * Time: 10:30
 * To change this template use File | Settings | File Templates.
 */
requirejs.config({
    baseUrl: 'js/lib',
    paths: {
        app: '../app',
        'jquery': 'https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min',
        'underscore': 'http://underscorejs.org/underscore'
    }
})

requirejs(['jquery', 'underscore', 'app/loadCalcComponents'],
    function ($, _, loadCalcComponents) {
    })