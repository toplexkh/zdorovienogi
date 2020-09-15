function Newrphus() {

    this.init = function() {
        var this_ = this;

        document.onkeypress = function() {
            var e = arguments[0] || window.event;
            var code = e.keyCode?e.keyCode:(e.which?e.which:e.charCode);
            if (e.ctrlKey && (code == 13 || code == 10)) {
                var text = this_.getSelectedText();

                this_.sendReport(text);
            }
        }

        if (window.jQuery) {
            $(function(){ $('.newrphus').show(); });
        }
    }

    this.sendReport = function(text) {
        if (text !== undefined && text.length < 1000 && text.length >= 4) {
            this.ajax('/spelling', 'POST', function(r) {
                alert('Спасибо за внимательность. Опечатка отправлена нашим редакторам.');
            }, 'text='+encodeURIComponent(text)+'&url='+encodeURIComponent(location.href?location.href:'')+'&YII_CSRF_TOKEN='+$('body').attr('token'));
        }
    }

    this.ajax = function(url, requestType, callback, queryString) {
        var ids = ['MSXML2.XMLHTTP.3.0',
                   'MSXML2.XMLHTTP',
                   'Microsoft.XMLHTTP'],
        xhr;

        // Simplification of this check while essentially doing the same thing
        if (window.XMLHttpRequest) {
          xhr = new XMLHttpRequest();
        } else {
          for (var i = 0; i < ids.length; i++) {
            try {
              xhr = new ActiveXObject(ids[i]);
              break;
            } catch(e) {}
          }
        }
        // Calling a function to return a function is redundant.
        // Do what you're trying to with as little extra as possible.
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4 && xhr.status == 200) {
                callback(xhr);
            }
        };
        xhr.open(requestType, url, true);
        if (requestType.toUpperCase() === 'GET') {
          // When initiating a get request, the send function needs no arguments at all.
          xhr.send();
        } else if (requestType.toUpperCase() === 'POST') {
          xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
          xhr.send(queryString);
        }
    }

    this.getSelectedText = function() {
        var txt = '';

        if (window.getSelection) {
            txt = window.getSelection().toString();
        } else if (document.getSelection) {
            txt = document.getSelection();
        } else if (document.selection) {
            txt = document.selection.createRange().text;
        }

        return txt;
    }
};

(function(window, document) {
    var newrphus = new Newrphus;
    newrphus.init();
}(window, document));