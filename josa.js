(function(){
  var	_f = [
    function(string) { //을/를 구분
      return _hasJong(string) ? '을' : '를';
    },
    function(string){ //은/는 구분
      return _hasJong(string) ? '은' : '는';
    },
    function(string){ //이/가 구분
      return _hasJong(string) ? '이' : '가';
    },
    function(string){ //와/과 구분
      return _hasJong(string) ? '과' : '와';
    },
    function(string){ //으로/로 구분
      return _hasJong(string) ? (_noRieulJong(string) ? '으로' : '로') : '로';
    }
  ],
    _formats = {
      '을/를' : _f[0],
      '을' : _f[0],
      '를' : _f[0],
      '을를' : _f[0],
      '은/는' : _f[1],
      '은' : _f[1],
      '는' : _f[1],
      '은는' : _f[1],
      '이/가' : _f[2],
      '이' : _f[2],
      '가' : _f[2],
      '이가' : _f[2],
      '와/과' : _f[3],
      '와' : _f[3],
      '과' : _f[3],
      '와과' : _f[3],
      '으로/로' : _f[4],
      '으로' : _f[4],
      '로' : _f[4],
      '으로로' : _f[4]
    };

  function _hasJong(string){ //string의 마지막 글자가 받침을 가지는지 확인
    string = string.charCodeAt(string.length - 1);
    return (string - 0xac00) % 28 > 0;
  }

  function _noRieulJong(string){ //string의 마지막 글자가 리을 받침이 아닌 다른 받침을 가지는지 확인
    string = string.charCodeAt(string.length - 1);
    return (string - 0xac08) % 28 > 0;
  }

  var josa = {
    c: function(word, format){
      if (typeof _formats[format] === 'undefined') throw 'Invalid format!';
      return _formats[format](word);
    },
    r: function(word, format) {
      return word + josa.c(word, format);
    }
  };

  if (typeof define == 'function' && define.amd) {
    define(function(){
      return josa;
    });
  } else if (typeof module !== 'undefined') {
    module.exports = josa;
  } else {
    window.Josa = josa;
  }
})();
