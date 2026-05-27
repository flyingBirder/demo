function myAxios(config) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        if (config.params) {
            const paramsStr = new URLSearchParams(config.params).toString();
            config.url += `?${paramsStr}`;
        }
        xhr.open(config.method || 'get', config.url);
        xhr.addEventListener('loadend', function () {
            if (xhr.status >= 200 && xhr.status < 300) {
                resolve(JSON.parse(xhr.response));

            } else {
                reject(new Error(xhr.response));
            }
        });
        if (config.data) {
            const dataStr = JSON.stringify(config.data);
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.send(dataStr);
        } else {
            xhr.send();
        }
    });

}