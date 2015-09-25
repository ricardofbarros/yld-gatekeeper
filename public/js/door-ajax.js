function DoorAjax () {
  if (typeof XMLHttpRequest !== 'undefined') {
    this.xhr = new XMLHttpRequest()
  } else {
    var versions = [
      'MSXML2.XmlHttp.6.0',
      'MSXML2.XmlHttp.5.0',
      'MSXML2.XmlHttp.4.0',
      'MSXML2.XmlHttp.3.0',
      'MSXML2.XmlHttp.2.0',
      'Microsoft.XmlHttp'
    ]

    for (var i = 0; i < versions.length; i++) {
      try {
        this.xhr = new ActiveXObject(versions[i])
        break
      } catch (e) {}
    }
  }
}

DoorAjax.prototype.open = function (callback) {
  var self = this

  this.xhr.open('POST', '', true)
  this.xhr.onreadystatechange = function () {
    if (self.xhr.readyState === 4) {
      callback(self.xhr.status)
    }
  }

  this.xhr.setRequestHeader('Content-type', 'application/json')
  this.xhr.send()
}
