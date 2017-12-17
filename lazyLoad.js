var ExposureLoad = (function(){
    var winHeight = $(window).height();
    var Exposure = function($nodeList,loadNode){
        this.node = $nodeList;
        this.load = loadNode;
        this.checked();
        this.bind();
    };
    Exposure.prototype.bind = function(){
        _this = this;
        var clock;
        $(window).on('scroll',function(){
            if(clock){
                clearTimeout(clock);
            }
            clock = setTimeout(function(){
                _this.checked();
            },300);
        });  
    };
    Exposure.prototype.checked = function(){
        var _this = this;
        this.node.each(function(){
            if(_this.isVisible($(this)) && !this.loaded){
            _this.load($(this));
            this.loaded = true;
        }
        }); 
    };
    Exposure.prototype.isVisible = function($node){
        var offsetTop = $node.offset().top;
        var height = $node.height();
        if(winHeight + $(window).scrollTop() > offsetTop && offsetTop + height > $(window).scrollTop()){
            return true;
        }
            return false;
    };
    return{
        create : function(nodeList,loadNoad){
            new Exposure(nodeList,loadNoad);
        }
    };
})();
ExposureLoad.create($('.load'),function($node){
    $node.attr('src',$node.attr('data-src'));
});