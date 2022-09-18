import moment from 'moment'

class Utils {

    /**
     * 
     * @param {moment} - input  
     * @param {*}
     */

    static formatStringsToDate = (dates) => dates.map((date) => moment(date));

    /**
     * 
     * @param {string} utcDate
     * @param {string} format
     * @returns {string}
     */
    static formatUTCDateToString = (utcDate, format = undefined) => moment(utcDate).format(format ? format : 'lll');

}

export default Utils