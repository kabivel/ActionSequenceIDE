/*
 * @author https://twitter.com/blurspline / https://github.com/zz85
 * See post @ http://www.lab4games.net/zz85/blog/2014/11/15/resizing-moving-snapping-windows-with-js-css/
 * converted to a class by SergeofBIBEK
 */

new MOVER(document.getElementById("dragMe"), document.getElementById("ghostpane"));
new MOVER(document.getElementById("codeMirrorHolder"), document.getElementById("ghostpane2"), 30);


"use strict";

function MOVER(pane1, ghostpane1, headerHeight) {

    this.headerHeight = headerHeight;
    // Minimum resizable area
    this.minWidth = 203;
    this.minHeight = 153;

    // Thresholds
    this.FULLSCREEN_MARGINS = -3000;
    this.MARGINS = 10;

    // End of what's configurable.
    this.clicked = null;
    this.onRightEdge; 
    this.onBottomEdge; 
    this.onLeftEdge; 
    this.onTopEdge;

    this.rightScreenEdge; 
    this.bottomScreenEdge;

    this.preSnapped;

    this.b; 
    this.x; 
    this.y;

    this.redraw = false;

    this.pane = pane1;
    this.ghostpane = ghostpane1;

    this.setBounds = function(element, x, y, w, h) {
        element.style.left = x + 'px';
        element.style.top = y + 'px';
        element.style.width = w + 'px';
        element.style.height = h + 'px';
    }

    this.hintHide = function() {
        this.setBounds(this.ghostpane, this.b.left, this.b.top, this.b.width, this.b.height);
        this.ghostpane.style.opacity = 0;

    }

    this.setListeners = function(){

        var self = this;
        // Mouse events
        this.pane.addEventListener('mousedown', function(e){self.onMouseDown(e);});
        document.addEventListener('mousemove', function(e){self.onMove(e);});
        document.addEventListener('mouseup', function(e){self.onUp(e);});

        // Touch events	
        this.pane.addEventListener('touchstart', function(e){self.onTouchDown(e);});
        document.addEventListener('touchmove', function(e){self.onTouchMove(e);});
        document.addEventListener('touchend', function(e){self.onTouchEnd(e);});
    }

    this.setListeners();

    this.onTouchDown = function(e) {
        this.onDown(e.touches[0]);
        e.preventDefault();
    }

    this.onTouchMove = function(e) {
        this.onMove(e.touches[0]);		
    }

    this.onTouchEnd = function(e) {
        if (e.touches.length ==0) this.onUp(e.changedTouches[0]);
    }

    this.onMouseDown = function(e) {
        this.onDown(e);
        e.preventDefault();
    }

    this.onDown = function(e) {
        this.calc(e);

        var isResizing = this.onRightEdge || this.onBottomEdge || this.onTopEdge || this.onLeftEdge;

        this.clicked = {
            x: this.x,
            y: this.y,
            cx: e.clientX,
            cy: e.clientY,
            w: this.b.width,
            h: this.b.height,
            isResizing: isResizing,
            isMoving: !isResizing && this.canMove(),
            onTopEdge: this.onTopEdge,
            onLeftEdge: this.onLeftEdge,
            onRightEdge: this.onRightEdge,
            onBottomEdge: this.onBottomEdge
        };
    }

    this.canMove = function() {
        if(!this.headerHeight)
        {
            return this.x > 0 && this.x < this.b.width && this.y > 0 && this.y < this.b.height;
        }
        else
        {
            return this.x > 0 && this.x < this.b.width && this.y > 0 && this.y < this.b.height && this.y < this.headerHeight;
        }
    }

    this.calc = function(e) {
        this.b = this.pane.getBoundingClientRect();
        this.x = e.clientX - this.b.left;
        this.y = e.clientY - this.b.top;

        this.onTopEdge = this.y < this.MARGINS;
        this.onLeftEdge = this.x < this.MARGINS;
        this.onRightEdge = this.x >= this.b.width - this.MARGINS;
        this.onBottomEdge = this.y >= this.b.height - this.MARGINS;

        this.rightScreenEdge = window.innerWidth;
        this.bottomScreenEdge = window.innerHeight;
    }

    this.e;

    this.onMove = function(ee) {
        this.calc(ee);

        this.e = ee;

        this.redraw = true;
    }

    this.animate = function() {

        requestAnimationFrame(this.animate.bind(this));

        if (!this.redraw) return;

        this.redraw = false;

        if (this.clicked && this.clicked.isResizing) {

            if (this.clicked.onRightEdge) this.pane.style.width = Math.max(this.x, this.minWidth) + 'px';
            if (this.clicked.onBottomEdge) this.pane.style.height = Math.max(this.y, this.minHeight) + 'px';

            if (this.clicked.onLeftEdge) {
                var currentWidth = Math.max(this.clicked.cx - this.e.clientX  + this.clicked.w, this.minWidth);
                if (currentWidth > this.minWidth) {
                    this.pane.style.width = currentWidth + 'px';
                    this.pane.style.left = this.e.clientX + 'px';	
                }
            }

            if (this.clicked.onTopEdge) {
                var currentHeight = Math.max(this.clicked.cy - this.e.clientY  + this.clicked.h, this.minHeight);
                if (currentHeight > this.minHeight) {
                    this.pane.style.height = currentHeight + 'px';
                    this.pane.style.top = this.e.clientY + 'px';	
                }
            }

            this.hintHide();

            return;
        }

        if (this.clicked && this.clicked.isMoving) {

            if (this.b.top < this.FULLSCREEN_MARGINS || this.b.left < this.FULLSCREEN_MARGINS || this.b.right > window.innerWidth - this.FULLSCREEN_MARGINS || this.b.bottom > window.innerHeight - this.FULLSCREEN_MARGINS) {
                this.setBounds(this.ghostpane, 0, 0, window.innerWidth, window.innerHeight);
                this.ghostpane.style.opacity = 0.2;
            } else if (this.b.top < this.MARGINS) {
                this.setBounds(this.ghostpane, 0, 0, window.innerWidth, window.innerHeight / 2);
                this.ghostpane.style.opacity = 0.2;
            } else if (this.b.left < this.MARGINS) {
                this.setBounds(this.ghostpane, 0, 0, window.innerWidth / 2, window.innerHeight);
                this.ghostpane.style.opacity = 0.2;
            } else if (this.b.right > this.rightScreenEdge) {
                this.setBounds(this.ghostpane, window.innerWidth / 2, 0, window.innerWidth / 2, window.innerHeight);
                this.ghostpane.style.opacity = 0.2;
            } else if (this.b.bottom > this.bottomScreenEdge) {
                this.setBounds(this.ghostpane, 0, window.innerHeight / 2, window.innerWidth, window.innerWidth / 2);
                this.ghostpane.style.opacity = 0.2;
            } else {
                this.hintHide();
            }

            if (this.preSnapped) {
                this.setBounds(this.pane,
                               this.e.clientX - this.preSnapped.width / 2,
                               this.e.clientY - Math.min(this.clicked.y, this.preSnapped.height),
                               this.preSnapped.width,
                               this.preSnapped.height
                              );
                return;
            }

            // moving
            this.pane.style.top = (this.e.clientY - this.clicked.y) + 'px';
            this.pane.style.left = (this.e.clientX - this.clicked.x) + 'px';

            return;
        }

        // This code executes when mouse moves without clicking

        // style cursor
        if (this.onRightEdge && this.onBottomEdge || this.onLeftEdge && this.onTopEdge) {
            this.pane.style.cursor = 'nwse-resize';
        } else if (this.onRightEdge && this.onTopEdge || this.onBottomEdge && this.onLeftEdge) {
            this.pane.style.cursor = 'nesw-resize';
        } else if (this.onRightEdge || this.onLeftEdge) {
            this.pane.style.cursor = 'ew-resize';
        } else if (this.onBottomEdge || this.onTopEdge) {
            this.pane.style.cursor = 'ns-resize';
        } else if (this.canMove()) {
            this.pane.style.cursor = 'move';
        } else {
            this.pane.style.cursor = 'default';
        }
    }

    this.animate();

    this.onUp = function(e) {
        this.calc(e);

        if (this.clicked && this.clicked.isMoving) {
            // Snap
            var snapped = {
                width: this.b.width,
                height: this.b.height
            };

            if (this.b.top < this.FULLSCREEN_MARGINS || this.b.left < this.FULLSCREEN_MARGINS || this.b.right > window.innerWidth - this.FULLSCREEN_MARGINS || this.b.bottom > window.innerHeight - this.FULLSCREEN_MARGINS) {
                this.setBounds(this.pane, 0, 20, window.innerWidth, (window.innerHeight + 20));
                this.preSnapped = snapped;
            } else if (this.b.top < this.MARGINS) {
                this.setBounds(this.pane, 0, 20, window.innerWidth, (window.innerHeight + 20) / 2);
                this.preSnapped = snapped;
            } else if (this.b.left < this.MARGINS) {
                this.setBounds(this.pane, 0, 20, window.innerWidth / 2, (window.innerHeight + 20));
                this.preSnapped = snapped;
            } else if (this.b.right > this.rightScreenEdge) {
                this.setBounds(this.pane, window.innerWidth / 2, 20, window.innerWidth / 2, (window.innerHeight + 20));
                this.preSnapped = snapped;
            } else if (this.b.bottom > this.bottomScreenEdge) {
                this.setBounds(this.pane, 0, (window.innerHeight + 20) / 2, window.innerWidth, window.innerWidth / 2);
                this.preSnapped = snapped;
            } else {
                this.preSnapped = null;
            }

            this.hintHide();

        }

        this.clicked = null;

    }

}
