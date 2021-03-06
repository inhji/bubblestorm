$(document).ready(function() {
    var $input = $('#input');
    var $output = $('#output');

    // Setting up CodeMirror
    var myCodeMirror = CodeMirror($input.get(0), {
        lineNumbers: true,
        matchBrackets: true,
        lineWrapping: true,
        mode:  "gfm",
        theme: "bubblestorm",

        onChange: function() {
            $output.html(marked(myCodeMirror.getValue()));
            Rainbow.color();

            resizeContent();
        },

        onScroll: function () {
            var scrolled = $(".CodeMirror-scroll").scrollTop() / ($(".CodeMirror-scroll")[0].scrollHeight - $(".CodeMirror-scroll").height()) * 100;

            var toScroll = scrolled * ($output[0].scrollHeight - $output.height()) / 100 ;

            $output.scrollTop(toScroll);

        },
    });
      
    function resizeContent() {
        var pageHeight = $(window).height();
        var footerHeight = $(".footer").outerHeight(true);
        var headerHeight = $(".page-header").outerHeight(true);
        // console.log(pageHeight, footerHeight);
        myCodeMirror.setSize(null, pageHeight - footerHeight - headerHeight);
        myCodeMirror.refresh();

        $output.css("height", pageHeight - footerHeight - headerHeight);
    }
        
    $(window).resize(function() {
        resizeContent();
    });

    resizeContent(); 
});
