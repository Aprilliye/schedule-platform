export default function (date) {
    let month = (date.getMonth()+1) < 10 ? ('0' + (date.getMonth()+1)) : (date.getMonth()+1);
    let day = date.getDate() < 10 ? ('0' + date.getDate()) : date.getDate();
    let dateStr = date.getFullYear() + '-' + month  + '-' + day;
    return dateStr;
}