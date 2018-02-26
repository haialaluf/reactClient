/**
 * Created by haialaluf on 26/12/2017.
 */
export default {
    
    parseDate(date, template) {
        const fullYear = String(date.getFullYear());
        let month = date.getMonth() + 1;
        month = month > 10 ? String(month) : '0' + String(month);
        let day = date.getDate();
        day = day > 10 ? String(day) : '0' + String(day);
        let hour = date.getHours();
        hour = hour > 10 ? String(hour) : '0' + String(hour);
        let minutes = date.getMinutes() ;
        minutes = minutes > 10 ? String(minutes) : '0' + String(minutes);
        return template.replace('YYYY', fullYear).replace('yyyy', fullYear)
            .replace('MM', month).replace('mm', month)
            .replace('DD', day).replace('dd', day)
            .replace('HH', hour).replace('hh', hour)
            .replace('MM', minutes).replace('mm', minutes);
    },
    
    dataURLtoBlob(dataurl) {
        var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new Blob([u8arr], {type: mime});
    },

    blobToDataURL(blob) {
        const isDataUrl = (url) => url.substring && url.substring(0,5) === 'data:';
        return new Promise((resolve, reject) => {
            if (isDataUrl(blob)) {
                resolve(blob);
            } else {
                let reader = new FileReader();
                reader.onload = (e) => {
                    resolve(e.target.result);
                };
                reader.readAsDataURL(blob);    
            }
        });
    },

    setDefaultColors(colors, keys) {
        keys.forEach((key) => {
            colors[key] = colors[key] || '#000000';
        });
        colors.background = colors.background || '#ffffff';
        return colors
    },

    isDataUrl(url) {
        return url.substring && url.substring(0,5) === 'data:'
    },

    removeFunctionsFromObject(obj) {
        Object.keys(obj).forEach(key => {
            if (typeof obj[key] === 'function'){
                delete obj[key]; 
            }
        })
        return obj;
    }

}
