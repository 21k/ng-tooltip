angular.module('ngToolTip', []).directive('tooltips', ['$timeout',
    function ($timeout) {
        var defaultStyle = {
            background: "#666",
            color: "#fff",
            maxWidth: "300px",
            maxHeight: "200px"
        };
        var timer;
        var styles = function (config) {
            var pCon = {
                display: "block",
                background: config.background,
                color: config.color,
                borderRadius: "5px",
                padding: "10px",
                position: "absolute",
                zIndex: "11111111"
            };

            var con = {
                overflow: "hidden",
                wordWrap: "break-word",
                maxWidth: config.maxWidth,
                maxHeight: config.maxHeight,
                minWidth: "40px",
                minHeight: "20px"
            };
            var diag = {
                position: "absolute",
                border: "10px solid rgba(0, 0, 0, 0)"
            };
            var border = "10px solid " + config.background;
            var direction = {
                right: {
                    style: {
                        borderRight: border,
                        marginTop: "-10px",
                        left: "-20px",
                        top: "50%"
                    },
                    margin: {
                        width: 0,
                        height: -0.5,
                        height_: 0.5,
                        width_: 1,
                        paddingWidth: 1,
                        paddingHeight: 0
                    }

                },
                bottom: {
                    style: {
                        borderBottom: border,
                        marginLeft: "-10px",
                        top: "-20px",
                        left: "50%"
                    },
                    margin: {
                        width: -0.5,
                        height: 0,
                        height_: 1,
                        width_: 0.5,
                        paddingWidth: 0,
                        paddingHeight: 1
                    }
                },
                top: {
                    style: {
                        borderTop: border,
                        marginLeft: "-10px",
                        bottom: "-20px",
                        left: "50%"
                    },
                    margin: {
                        width: -0.5,
                        height: -1,
                        height_: 0,
                        width_: 0.5,
                        padding: -1,
                        paddingWidth: 0,
                        paddingHeight: -1
                    }
                },
                left: {
                    style: {
                        borderLeft: border,
                        marginTop: "-10px",
                        right: "-20px",
                        top: "50%"
                    },
                    margin: {
                        width: -1,
                        height: -0.5,
                        height_: 0.5,
                        width_: 0,
                        paddingWidth: -1,
                        paddingHeight: 0
                    }
                }
            };
            return {
                direction: direction,
                con: con,
                diag: diag,
                pCon: pCon
            }
        };
        var showHint = function (mystyles, scope, ele) {
            var tooltip__ = angular.element("#tooltip__");
            var tooltip__con = angular.element("#tooltip__con");
            var tooltip__diag = angular.element("#tooltip__diag");
            $timeout.cancel(timer);
            if (scope.tooltips.close === false && tooltip__.is(":visible"))
                tooltip__.hide();
            else {
                var pos = ele.offset();
                var direction = mystyles.direction[["top", "left", "bottom", "right"].indexOf(scope.tooltips.place) > -1 ? scope.tooltips.place : "top"];
                tooltip__con
                    .removeAttr("style")
                    .css(mystyles.con);
                if (scope.tooltips.html === true)
                    tooltip__con.html(scope.tooltips.title);
                else
                    tooltip__con.text(scope.tooltips.title);

                tooltip__diag
                    .removeAttr("style")
                    .css(mystyles.diag)
                    .css(direction.style);
                tooltip__
                    .removeAttr("style")
                    .css(mystyles.pCon)
                    .css({
                        top: pos.top + direction.margin.height * tooltip__.outerHeight() + direction.margin.height_ * ele.outerHeight() + 20 * direction.margin.paddingHeight + "px",
                        left: pos.left + direction.margin.width * tooltip__.outerWidth() + direction.margin.width_ * ele.outerWidth() + 20 * direction.margin.paddingWidth + "px"
                    })
                    .show();
            }

        };
        var hideHint = function (scope) {
            if (scope.tooltips.close === false || scope.tooltips.timeout == undefined || scope.tooltips.timeout == 0 || isNaN(parseInt(scope.tooltips.timeout)))
                angular.element("#tooltip__").hide();
            else timer=$timeout(function () {
                    angular.element("#tooltip__").hide()
            }, parseInt(scope.tooltips.timeout))
        };
        return {
            restrict: 'A',
            scope: {tooltips: "="},
            link: function (scope, ele, attrs) {
                var myStyle = angular.extend({}, defaultStyle, scope.tooltips.style || {});
                var mystyles = styles(myStyle);
                if (!angular.element("#tooltip__").length) {
                    angular.element("body").append("<div id='tooltip__' style='display:none'><div id='tooltip__close'></div><div id='tooltip__con'></div><div id='tooltip__diag'></div></div>")
                }
                if (scope.tooltips.close == undefined || scope.tooltips.close) {
                    ele.bind("mouseenter", function () {
                        showHint(mystyles, scope, ele)
                    }).bind("mouseleave", function () {
                        hideHint(scope)
                    });
                }
                else {
                    ele.bind("click", function () {
                        showHint(mystyles, scope, ele)
                    });
                }
            }
        }
    }
]);
