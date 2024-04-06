const dayjs = require('dayjs') 
const formatDateStamp = (datetime) =>{

    return dayjs(datetime).format("DD/MM/YYYY HH:mm:ss")
}

module.exports = formatDateStamp