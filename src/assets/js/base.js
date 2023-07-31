// 处理视图宽度边界情况
(function (window, document) {
  function setMaxView() {
    var docEl = document.documentElement;
    // var root = document.getElementById('root');
    var deviceWidth = docEl.clientWidth;
    // root.style.maxWidth = '750px';
    if (deviceWidth >= 750) {
      docEl.style.fontSize = '75px';
    }
  }
  setMaxView();
  window.addEventListener('resize', setMaxView);
  window.addEventListener('pageshow', function (e) {
    if (e.persisted) {
      setMaxView();
    }
  });
})(window, document);
