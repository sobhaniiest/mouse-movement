var data = '';

const debounce = function (fn, delay) {
    let timer;
    return function() {
        let context = this,
            args = arguments;
        clearTimeout(timer);
        timer = setTimeout(() => {
            fn.apply(context, args);
        }, delay);
    }
}

const setCoordinates = (event) => {
    let x = event.pageX;
    let y = event.pageY;
    data = data + '(' + x + ','  + y + ');';
}

const getCoordinates = debounce(setCoordinates, 200);

(function(history) {
    var pushState = history.pushState;   
    history.pushState = function(state) {
      console.log('URL Changed');
      data = data + '(user,' + 'Unique Key)' + ';';
      data = data + '(page,' + location.pathname + ');';
      data = data + '(width,' + window.outerWidth + ');';
      data = data + '(height,' + window.outerHeight + ');';
      console.log(data);
      data = '';
      return pushState.apply(history, arguments);
    };

    window.addEventListener('popstate', (event) => {
        data = data + '(user,' + 'Unique Key)' + ';';
        data = data + '(page,' + location.pathname + ');';
        data = data + '(width,' + window.outerWidth + ');';
        data = data + '(height,' + window.outerHeight + ');';
        console.log(data);
        data = '';
    });

})(window.history);


function mousemovement() {
    let body = document.querySelector('body')
                .addEventListener('mouseover', function(event) {
                    getCoordinates(event);
                })
}

module.exports.mousemovement = mousemovement;