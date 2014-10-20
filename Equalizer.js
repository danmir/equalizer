
(function($) {
    $.fn.setupEqualizer = function(options) {
        // Default parameters
        var settings = $.extend({
            'timeout': 1000,
            'colWidth': 2
        }, options);

        function setEqualizer(selector, timeout, colWidth) {
            if (!colWidth) {
                colWidth = 1;
            }
            $(selector).css({
                verticalAlign: 'bottom',
                lineHeight: $(selector).height() + 'px'
            });

            // Кол-во столбиков
            var colQuantity = Math.ceil($(selector).width() / colWidth);
            var cols = new Array(colQuantity);
            for (var i = 0; i < cols.length; i++) {
                var span = $('<span/>').appendTo(selector);
                span.css({
                    verticalAlign: 'bottom',
                    display: 'inline-block',

                    fontSize: 0,
                    lineHeight: 0,

                    width: colWidth,
                    background: 'pink',
                    borderTop: '2px solid red'
                });
            }

            run_equalizer(selector, timeout);
        }

        function set_cols_height(selector, timeout) {
            var colHeight = Math.round($(selector).parent().height() * Math.random());
            $(selector).animate({ // Изменяем высоту произвольно
                    height: colHeight
                }, timeout / 2,
                'linear',
                function() { // Возвращаем высоту обратно
                    $(selector).animate({
                            height: selector.parent().height() / 2
                        }, timeout / 2,
                        'linear',
                        function() {
                            set_cols_height($(this), timeout);
                        }
                    )
                }
            )
        }

        function run_equalizer(selector, timeout) {
            $(selector).find('span').each(function(i) {
                set_cols_height($(this), timeout);
            });
        }

        this.each(function() {
            setEqualizer($(this), settings.timeout, settings.colWidth);
        })
    }
})(jQuery);