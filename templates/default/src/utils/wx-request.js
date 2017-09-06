export default function request(url, {
    method = 'GET',
    body,
    headers,
    hawk = true,
    noCache = false
}) {
    return new Promise(function(resolve, reject) {
        wx.request({
            url: url,
            method: method,
            data: body,
            header: headers, 
            success: function(res){
                resolve({response: res.data});
            },
            fail: function(err) {
                // fail
                reject(err);
            },
            complete: function() {
                // complete
            }
        });
    })
}