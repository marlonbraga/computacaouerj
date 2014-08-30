/**
 * @class Number
 * @private
 */
/** @method toRadians
 * @private
 * Converts an angle n from degrees to radians
 * @param {Number} n The angle in degrees that you wish to convert
 * @return {Number} the value of n converted to radians
 */
Number.prototype.toRadians = function() {
	return (2 * Math.PI * this) / 360;
}
/**
 * @class JSD
 * This is the "core" class of the jsDiagram framework.  It is a singleton and cannot be created directly.  This class is created automatically when the web page is loaded.
 * The JSD class contains many of the core functions of the library.
 */

JSD = {

	/**
	 * @property {number} version The version number of this application
	 */
	version : 0.1,

	/*getSource: function(obj, spacer, ignoreFunctions){
	return jsdJSON.stringify(obj, function(key, value){
	if (typeof value === 'function') {
	return value.toString();
	//return value.toSource();
	}
	return value;
	}, spacer);

	},
	*/

	/**
	 * @property {Array} diagramCollection An array containing all <code>JSD.diagram.Diagram</code> objects
	 *
	 *
	 */
	diagramCollection : [],

	toolbarCollection : [],

	actionInProgress : '',

	nodeConfigList : "rotate,shadow,minWidth,minHeight,cx,cy,rx,ry,html,height,width,rounded,label,ignoreDefaults,labelAlign,labelConfig[font-size],labelConfig[fill],labelConfig[stroke],labelConfig[stroke-width],labelConfig[font-family],labelConfig[opacity],shape,path,opacity,fill,fillOpacity,freestyle,src,stroke,strokeOpacity,strokeDasharray,strokeWidth",
	containerConfigList : "shadow,minWidth,minHeight,locked,cx,cy,rx,ry,html,height,width,rounded,label,ignoreDefaults,labelAlign,labelConfig[font-size],labelConfig[fill],labelConfig[stroke],labelConfig[stroke-width],labelConfig[font-family],labelConfig[opacity],shape,path,opacity,fill,fillOpacity,freestyle,src,stroke,strokeOpacity,strokeDasharray,strokeWidth,headerPosition,headerConfig[fill],headerConfig[stroke],headerConfig[stroke-width],headerConfig[opacity],title",
	edgeConfigList : "arrowEnd,arrowStart,fromNode,toNode,curve,label,ignoreDefaults,labelOffset[0],labelOffset[1],labelConfig[stroke],labelConfig[stroke-width],labelConfig[font-family],labelConfig[opacity],edgeType,opacity,fill,fillOpacity,freestyle,stroke,strokeOpacity,strokeDasharray,strokeWidth",

	activeTool : 'select',
	
	/** @method */

	setTool : function(tool) {
		for (var i = 0; i < this.diagramCollection.length; i++) {
			var d = this.diagramCollection[i];
			d.newLinks.all.hide();
			d.newText.graphic.hide();
			d.fireEvent("settool", tool);
		}

		if (tool === "edge") {
			this.activeTool = "edge";
			this.actionInProgress = "createNewEdge";
			return
		}

		if (tool === "text") {
			this.activeTool = "text";
			this.actionInProgress = "createNewText";
			return
		}
		//default
		this.activeTool = "select";
		this.actionInProgress = "";
		//for (var i = 0; i < this.diagramCollection.length; i++) {
		//	this.diagramCollection[i].newLinks.all.hide();
		//}

	},

	isTouch : function(test) {
		test = test || "ontouchmove";
		var el = document.createElement('div');
		el.setAttribute(test, 'return;');
		if ( typeof el[test] == "function") {
			return true;
		} else {
			return false
		}
	},

	attrMap : {
		"fillOpacity" : "fill-opacity",
		"strokeOpacity" : "stroke-opacity",
		"strokeDasharray" : "stroke-dasharray",
		"strokeWidth" : "stroke-width",
		"fontFamily" : "font-family",
		"fontSize" : "font-size"
	},

	/**
	 * @method getDiagram
	 * If id param is omitted, then the first diagram object will be returned.
	 * @param {String} id (optional)
	 * id of the JSD.diagram.DiagramXXX
	 * @return {JSD.diagram.Diagram} The JSD.diagram.Diagram object for the given id
	 */
	//parameters:
	// id string [optional]
	// if omitted, this method will return the FIRST diagram object in the JSD.diagramCollection array

	getDiagram : function(id) {
		if (id) {
			for (var i = 0; i < this.diagramCollection.length; i++) {
				if (this.diagramCollection[i].id === id) {
					return this.diagramCollection[i]
				}
			}
		} else {
			var diagram = this.diagramCollection[0];
			if (diagram) {
				return diagram;
			}
		}
		return false;
	},

	isObject : function(obj) {
		if (Object.prototype.toString.call(obj) === '[object Object]') {
			return true
		}
		return false
	},

	fixRotationAngle : function(a) {
		a = parseInt(a);
		if (a >= 360) {
			a = JSD.fixRotationAngle(Math.round(a - 360))
		}
		if (a < 0) {
			a = JSD.fixRotationAngle(Math.round(360 + a))
		}
		return a
	},

	cmpTypes : {},

	/**
	 * @method getDiagramByDomID
	 * @param {String} id id of the DOM element in which the JSD.diagram.Diagram is contained
	 * @return {JSD.diagram.Diagram} The JSD.diagram.Diagram object which is contained in the given DOM id
	 */

	getDiagramByDomID : function(id) {
		if (id) {
			for (var i = 0; i < this.diagramCollection.length; i++) {
				if (this.diagramCollection[i].contentEl === id) {
					return this.diagramCollection[i]
				}
			}
		} else {
			var diagram = this.diagramCollection[0];
			if (diagram) {
				return diagram;
			}
		}
		return false;
	},

	getToolbar : function(id) {
		if (id) {
			for (var i = 0; i < this.toolbarCollection.length; i++) {
				if (this.toolbarCollection[i].id === id) {
					return this.toolbarCollection[i]
				}
			}
		} else {
			var toolbar = this.toolbarCollection[0];
			if (toolbar) {
				return toolbar;
			}
		}
		return false;
	},

	/**
	 * @method apply Copies all the properties of cfg to obj
	 * @param {Object} obj The reciever of the properties
	 * @param {Object} cfg The source of the properties
	 * @return {Object} obj
	 */

	apply : function(obj, cfg) {
		for (var name in cfg) {
			if (cfg.hasOwnProperty(name)) {
				obj[name] = cfg[name];
			}
		}
		return obj
	},
	/**
	 * @method clone Creates a shallow copy of an object
	 * @param {Object} obj The object to be copied
	 * @return {Object} The cloned object
	 */
	clone : function(obj) {
		return JSD.JSON.decode(JSD.JSON.encode(obj))
		/*var src = jsdJSON.stringify(obj, function(key, value){
		 if (typeof value === 'function') {
		 return value.toString();
		 //	return value.toSource();
		 }
		 return value;
		 });

		 return JSD.JSON.decode(src);
		 */
	},

	allIds : [],

	nextIdNum : 1,

	idPrefix : "jsd",

	/**
	 * @property {Object} svgCanvasSize
	 * @private
	 * The default maximum size of the SVG canvas.
	 *_ This private property is used to set the maximum size of the canvas in SVG environments
	 *_ and is necessary in order to make the scroll bars work correctly and will, as a side effect,
	 *_ set an upper limit on the zoom property.<br>
	 * Defaults to:
	 * <pre><code class="prettyprint">{
	 * 	width: 6000,
	 * 	height: 6000
	 * }
	 * </code></pre>
	 * If it is necessary to amend this property, you can do so by setting it before you create your diagram.
	 * <br>For example:
	 * <pre><code class="prettyprint">JSD.svgCanvasSize.width = 4000;
	 * JSD.svgCanvasSize.height = 4000
	 * </code></pre>
	 */

	svgCanvasSize : {
		width : 6000,
		height : 6000
	},

	_getIEversion : function() {
		var ua = window.navigator.userAgent
		var msie = ua.indexOf("MSIE ")

		if (msie > 0)// If Internet Explorer, return version number
			return parseInt(ua.substring(msie + 5, ua.indexOf(".", msie)))
		else// If another browser, return 0
			return 0
	},

	getNextIdNum : function(n) {
		if (arguments.length < 1) {
			n = this.nextIdNum;
		}
		this.nextIdNum = n + 1;
		return n;
	},

	generateId : function(elType) {
		if (!elType) {
			elType = 'el';
		}
		var id = this.idPrefix + "-" + elType + "-" + this.getNextIdNum();
		var ind = this.arrayIndexOf(this.allIds, id);
		if (ind !== -1) {
			id = JSD.generateId(elType);
		}
		return id;
	},

	arrayIndexOf : function(a, obj) {
		var i = a.length;
		while (i--) {
			if (a[i] === obj) {
				return i;
			}
		}
		return -1;
	},

	getMouseCoords : function(evt) {
		if (evt.pageX || evt.pageY) {
			return {
				x : evt.pageX,
				y : evt.pageY
			};
		}
		return {
			x : evt.clientX + document.body.scrollLeft - document.body.clientLeft,
			y : evt.clientY + document.body.scrollTop - document.body.clientTop
		};
	},

	/**
	 * @method getPosition
	 * @param {Dom Element} el The Dom Element you wish to find
	 * @return {Object} Returns an object with x and y property denoting the position of the passed <code>el</code>
	 */

	getPosition : function(el) {
		var left = 0;
		var top = 0;

		while (el.offsetParent) {
			left += el.offsetLeft;
			top += el.offsetTop;
			el = el.offsetParent;
		}

		left += el.offsetLeft;
		top += el.offsetTop;

		return {
			x : left,
			y : top
		};
	},

	getMouseOffset : function(target, evt) {
		var elPos = JSD.getPosition(target);
		var mousePos = JSD.getMouseCoords(evt);
		return {
			x : mousePos.x - elPos.x,
			y : mousePos.y - elPos.y
		};
	},

	ux : {},

	_DOMevents : "click,dblclick,mousedown,mousemove,mouseout,mouseover,mouseup,touchstart,touchmove,touchend,orientationchange,touchcancel,gesturestart,gesturechange,gestureend",

	_myevtsList : "click mouseout mouseover",

	_evtFn : function(myevt, cmp) {
		return function(e) {

			//this.graphic.node.onclick = function(e){

			e = e || window.event;
			var t = e.target || e.srcElement;
			var name = cmp.label || cmp.title;
			//console.log(myevt+' - '+name + ' - TARGET = '+(this===t?'ME':'no'));
			//console.dir(e);

			//if (name === "Rejected") {
			if (e.preventDefault) {
				e.preventDefault()
			} else {
				e.returnValue = false
			}
			if (e.stopPropagation) {
				e.stopPropagation()
			} else {
				e.cancelBubble = true
			}
			var val;
			var success = cmp.fireEvent(myevt, cmp);

			if ( typeof success === "boolean" && !success) {
				return false;
			}

			if (!e.cancelBubble) {
				if (cmp.parent.graphic) {
					//thisNode.parent.graphic.node["on"+myevt](e);
				}
				//else {
				//	thisNode.parent.dom["on" + myevt](e)
				//}
			}
		}
	},

	dragSelectObjectAttr : {
		'stroke-dasharray' : '.',
		fill : '#0f0',
		'fill-opacity' : 0.1
	},

	/*
	 dragSelectStart : function(evt) {
	 console.log('dragSelectStart');
	 evt = evt || window.event;
	 // "this" refers to the object (diagram.background or container) that calls the method,
	 // it does not refer to JSD
	 this.parentObj.focus();
	 //if (JSD.actionInProgress === "") {
	 //evt = evt || window.event;
	 if (evt.preventDefault) {
	 evt.preventDefault()
	 } else {
	 evt.returnValue = false
	 }
	 if (evt.stopPropagation) {
	 evt.stopPropagation()
	 } else {
	 evt.cancelBubble = true
	 }
	 //var relmousePos = JSD.getMouseOffset(this.parentObj.dom, evt);
	 JSD.actionInProgress = 'preDragSelect';
	 //JSD.dragSelectRect = this.parentObj.sheet.rect(relmousePos.x, relmousePos.y, 0, 0).attr(JSD.dragSelectObject);
	 //JSD.dragSelectObject.diagram = this.parentObj;
	 //JSD.dragSelectObject.startPos = JSD.getMouseOffset(this.parentObj.dom, evt);
	 //JSD.dragSelectObject.startPos = {
	 //	x: relmousePos.x,
	 //	y: relmousePos.y
	 //};
	 //JSD.dragSelectRect.mouseup(JSD.dragSelectStop);
	 //}
	 },

	 dragSelectMove : function(evt) {
	 //console.log('dragSelectMove');
	 evt = evt || window.event;
	 var obj = JSD.dragSelectObject;
	 if (JSD.actionInProgress === "preDragSelect") {
	 var npos = JSD.getMouseOffset(obj.diagram.dom, evt);
	 var opos = JSD.dragSelectObject.startPos;
	 if (npos.x !== opos.x || npos.y !== opos.y) {
	 JSD.actionInProgress = "dragSelect";
	 obj.rect = obj.diagram.sheet.rect(obj.startPos.x, obj.startPos.y, 0, 0).attr(obj.attr);
	 obj.rect.mouseup(function() {
	 //console.log('bg.mup');
	 JSD.dragSelectStop();
	 });
	 }
	 }
	 if (JSD.actionInProgress === "dragSelect") {
	 //evt = evt || window.event;
	 //evt.preventDefault();
	 //evt.stopPropagation();
	 var thisDiagram = obj.diagram;
	 var relmousePos = JSD.getMouseOffset(thisDiagram.dom, evt);
	 var x = obj.rect.attr("x");
	 var y = obj.rect.attr("y");
	 var w = relmousePos.x - obj.startPos.x;
	 var h = relmousePos.y - obj.startPos.y;
	 if (w < 0) {
	 x = relmousePos.x;
	 w = -w
	 }
	 if (h < 0) {
	 y = relmousePos.y;
	 h = -h
	 }
	 obj.rect.attr({
	 x : x,
	 y : y,
	 width : w,
	 height : h
	 })
	 }
	 },

	 dragSelectStop : function(evt) {
	 //console.log('dragSelectStop');
	 var obj = JSD.dragSelectObject;
	 evt = evt || window.event;
	 if (JSD.actionInProgress === "dragSelect") {
	 JSD.actionInProgress = '';
	 //console.log('hi');
	 var x = obj.rect.attr("x");
	 var y = obj.rect.attr("y");
	 var w = obj.rect.attr("width");
	 var h = obj.rect.attr("height");

	 var arr = obj.diagram.getNodesInRange(x, y, w, h);
	 for (var i = 0; i < arr.length; i++) {
	 arr[i].focus(true);
	 }

	 if (obj.rect) {
	 obj.rect.remove();
	 obj.rect = null;
	 }
	 delete obj;
	 //delete JSD.dragSelectObject.rect;
	 //console.log("how many? - " + arr.length);
	 }
	 JSD.actionInProgress = '';
	 },
	 */

	getDragProxy : function() {
		if (this.dragProxy) {
			//set defaults
			var dragger = this.dragProxy;
			dragger.style.border = '1px dashed black';
			dragger.shim = 5;
			if (dragger.test) {
				dragger.test.remove()
			}

			return dragger
		} else {
			this.dragProxy = document.createElement('div');
			var dragger = this.dragProxy;
			dragger.setAttribute("id", "JSDDragProxy");
			dragger.style.visibility = "hidden";
			dragger.style.position = 'absolute';
			dragger.style.top = '100px';
			dragger.style.left = '100px';
			dragger.style.height = '100px';
			dragger.style.width = '100px';
			dragger.style.border = '1px dashed black';
			document.body.appendChild(dragger);

			dragger.shim = 5;

			dragger.paper = Raphael("JSDDragProxy", 500, 500);

			dragger.setPosition = function(thisDiagram, mousePos) {
				dragger.style.top = (mousePos.y) + 'px';
				dragger.style.left = (mousePos.x) + 'px';
				var elPos = JSD.getPosition(thisDiagram.dom);
				var relPos = {
					x : (mousePos.x - elPos.x) / thisDiagram.getZoom(),
					y : (mousePos.y - elPos.y) / thisDiagram.getZoom()
				};
				var newTarget = thisDiagram.getDropTargetAt(relPos);
				if (newTarget) {
					newTarget.highlightContainer();
					thisDiagram.targetContainer = newTarget;
					return false;
				}

				thisDiagram.unHighlightContainer();
				return false;
			}
			JSD.mouseUp = function(evt) {
				if (JSD.actionInProgress === 'htmlDrag') {
					JSD.activeButton._shapeDragStop(evt);
					JSD.actionInProgress = "";

					return false;
				}
				var thisBtn = JSD.activeButton;
				var thisDiagram = thisBtn.toolbar ? thisBtn.toolbar.diagram : JSD.getDiagram();
				var z = thisDiagram.getZoom();

				//if(JSD.actionInProgress === ''){
				//	return false
				//}

				JSD.actionInProgress = '';
				dragger.style.visibility = "hidden";

				var btn = JSD.activeButton.shape || JSD.activeButton;
				var graphicType = btn.shapeConfig.type || btn.shapeConfig.graphicType;

				var c = btn.shapeConfig;
				var ct = c.cmpType;
				//if (JSD.getClassByCmpType(ct).prototype.isCmpType("node")) {
				var draggerPos = JSD.getPosition(dragger);
				var diagramPos = JSD.getPosition(thisDiagram.dom);
				var pos = {
					x : (draggerPos.x - diagramPos.x) / z,
					y : (draggerPos.y - diagramPos.y) / z
				};

				if (pos.x < 0 || pos.y < 0) {// || pos.x > thisDiagram.width || pos.y > thisDiagram.height) {
					return;
				}

				var obj = {
					shape : btn.shapeName
				};
				//var obj = btn.shapeConfig;
				//obj.id = JSD.idPrefix +"-node-" + JSD.getNextIdNum();

				if (ct === "edge") {
					obj = JSD.clone(c);
					obj.fromNode[0] += Raphael.snapTo(thisDiagram.snapTo, pos.x + 11);
					obj.fromNode[1] += Raphael.snapTo(thisDiagram.snapTo, pos.y + 11);
					obj.toNode[0] += Raphael.snapTo(thisDiagram.snapTo, pos.x + 11);
					obj.toNode[1] += Raphael.snapTo(thisDiagram.snapTo, pos.y + 11);
				} else {
					if (graphicType === "ellipse") {
						obj.rx = c.rx || (c.width / 2);
						obj.ry = c.ry || (c.height / 2);
						obj.cx = Raphael.snapTo(thisDiagram.snapTo, pos.x + obj.rx);
						obj.cy = Raphael.snapTo(thisDiagram.snapTo, pos.y + obj.ry);
					} else {
						obj.width = c.width || c.pathWidth;
						obj.height = c.height || c.pathHeight;
						obj.x = Raphael.snapTo(thisDiagram.snapTo, pos.x);
						obj.y = Raphael.snapTo(thisDiagram.snapTo, pos.y);
					}
				}

				/** @class JSD.diagram.Diagram */
				var newCfg = obj;
				/** @event */
				thisDiagram.fireEvent("uidragbeforecreate", newCfg);
				/** @class JSD */

				if (thisDiagram.targetContainer) {
					var cmp = thisDiagram.targetContainer.add(obj);
				} else {
					var cmp = thisDiagram.add(obj).focus();
				}
				/** @class JSD.diagram.Diagram */
				/** @event */
				thisDiagram.fireEvent("uidragcreate", cmp);
				/** @class JSD */

			}

			dragger.ontouchend = dragger.onmouseup = function(evt) {
				
				if (JSD.actionInProgress === 'button' || JSD.actionInProgress === 'htmlDrag') {
					evt = evt || window.event;
					JSD.mouseUp(evt);
				}
				
			}
			/*
			 document.onmousedown = function(evt) {
			 console.log('document.onmousedown');
			 if (JSD.actionInProgress === '') {
			 JSD.actionInProgress = 'dragSelect';

			 }
			 }

			 document.onclick = function(evt) {
			 if (JSD.actionInProgress === 'preDragSelect') {
			 JSD.actionInProgress = '';
			 }
			 }

			 document.onmouseup = function(evt) {
			 if (JSD.actionInProgress === 'button' || JSD.actionInProgress === 'htmlDrag') {
			 //console.log('drop doc');
			 evt = evt || window.event;
			 mouseUp(evt);
			 }
			 if (JSD.actionInProgress === 'dragSelect' || JSD.actionInProgress === 'preDragSelect') {
			 JSD.dragSelectStop();
			 return false
			 }
			 }
			 */

			document.ontouchmove = document.onmousemove = function(evt) {
				
				switch (true) {
					case (JSD.actionInProgress === 'button' || JSD.actionInProgress === 'htmlDrag'):
						evt = evt || window.event;
						if (evt.preventDefault) {
							evt.preventDefault()
						} else {
							evt.returnValue = false
						}

						//dragger.style.visibility = "visible";
						var mousePos = JSD.getMouseCoords(evt);

						if (JSD.actionInProgress === 'htmlDrag') {

							var n = JSD.activeButton;
							n = n.parent.locked ? n.parent : n;
							//mousePos.x = Raphael.snapTo(n.diagram.snapTo, mousePos.x - dragger.offset.x);
							//mousePos.y = Raphael.snapTo(n.diagram.snapTo, mousePos.y - dragger.offset.y);
							//dragger.setPosition(n.diagram, mousePos);
							var z = n.diagram.getZoom();
							var dx = (mousePos.x - n.oMousePos.x) / z;
							var dy = (mousePos.y - n.oMousePos.y) / z;

							var box = n.diagram.focusBox;
							//var diagramPos = JSD.getPosition(n.diagram.dom);
							//var xx = Raphael.snapTo(d.snapTo, n.ox + dx);
							//var yy = Raphael.snapTo(d.snapTo, n.oy + dy);

							var xx = (n.ox + dx);
							var yy = (n.oy + dy);
							box.setPosition(xx, yy, box.width, box.height, null, box.r, true);

							var newTarget = n.diagram.getDropTargetAt({
								x : xx,
								y : yy
							});
							if (newTarget) {
								newTarget.highlightContainer();
								n.diagram.targetContainer = newTarget;
							} else {
								n.diagram.targetContainer = null;
								n.diagram.unHighlightContainer()
							}

							return false;

						} else {
							var thisBtn = JSD.activeButton;
							var thisDiagram = thisBtn.toolbar ? thisBtn.toolbar.diagram : JSD.getDiagram();
							if (thisBtn.shape || thisBtn.shapeConfig) {

								mousePos.x = Raphael.snapTo(thisDiagram.snapTo, mousePos.x - dragger.shim);
								mousePos.y = Raphael.snapTo(thisDiagram.snapTo, mousePos.y - dragger.shim);
								dragger.setPosition(thisDiagram, mousePos);
								return false;
							}
						}
						break;
					/*
					 case (JSD.actionInProgress === "preDragSelect" || JSD.actionInProgress === "dragSelect"):
					 JSD.dragSelectMove(evt);
					 break;

					 case (JSD.actionInProgress === "createNewEdge"):
					 var mousePos = JSD.getMouseOffset(JSD.getDiagram().dom, evt)
					 var x = mousePos.x;
					 var y = mousePos.y;
					 JSD.getDiagram().newLinks.showSingle(x, y);

					 //console.log('newLine');

					 break;
					 */
					default:
					//
				}
				/*
				 if (JSD.actionInProgress === 'button' || JSD.actionInProgress === 'htmlDrag') {
				 evt = evt || window.event;
				 //dragger.style.visibility = "visible";
				 var mousePos = JSD.getMouseCoords(evt);

				 if (JSD.actionInProgress === 'htmlDrag') {
				 var n = JSD.activeButton;
				 mousePos.x = Raphael.snapTo(n.diagram.snapTo, mousePos.x - dragger.offset.x);
				 mousePos.y = Raphael.snapTo(n.diagram.snapTo, mousePos.y - dragger.offset.y);
				 dragger.setPosition(n.diagram, mousePos);
				 return false;
				 } else {
				 var thisBtn = JSD.activeButton;
				 var thisDiagram = thisBtn.toolbar ? thisBtn.toolbar.diagram : JSD.getDiagram();
				 if (thisBtn.shape || thisBtn.shapeConfig) {

				 mousePos.x = Raphael.snapTo(thisDiagram.snapTo, mousePos.x - dragger.shim);
				 mousePos.y = Raphael.snapTo(thisDiagram.snapTo, mousePos.y - dragger.shim);
				 dragger.setPosition(thisDiagram, mousePos);
				 return false;
				 }
				 }
				 } else {
				 if (JSD.actionInProgress === "preDragSelect" || JSD.actionInProgress === "dragSelect") {
				 JSD.dragSelectMove(evt);
				 }
				 }
				 */
				return false
			}

			return this.dragProxy
		}
	},

	/**
	 * @method onReady Adds a function to the <tt>window.onload</tt> event which will be called when document is ready.
	 * If a function has been assigned to <tt>window.onload</tt> already, the JSD.onReady method will execute that function first before calling <tt>fn</tt>
	 * @param {Function} fn The function to be called on the event
	 * @return {void}
	 */

	onReady : function(fn) {
		var oldfn = window.onload;
		if ( typeof window.onload === 'function') {
			window.onload = function() {
				if (oldfn) {
					oldfn();
				}
				fn();
			}
		} else {
			window.onload = fn;
		}
	},

	arrowPaths : [["", 0], ["l10,-5 l-3,5 l3,5 l-10,-5 l10,-5", 6], ["l10,-5 l0,10 l-10,-5 l10,-5", 6], ["l10,-5 l2,5 l-2,5 l-10,-5 l10,-5", 6], ["circle", 0], ["l10,-5 l-10,5 l10,5l-10,-5", 0], ["m12.4,-10.7 c-0.25,0 -0.5,0.25 -0.5,0.25c-0.75,0.25 -1.45611,0.27448 -1.75,0.75c-0.13143,0.21266 -0.17336,0.3647 -0.5,0.5c-0.23097,0.09567 -0.80568,0.431 -1.75,1.25c-0.53419,0.4633 -1.04327,0.71318 -1.25,1c-0.32687,0.45349 -0.58092,0.63004 -1,1c-0.67575,0.59654 -0.5,1 -0.5,1c-0.5,0.25 -0.57323,0.57323 -0.75,0.75c-0.17677,0.17677 -0.6147,0.17336 -0.75,0.5c-0.09567,0.23097 -0.25,0.5 -0.5,0.75c-0.25,0.25 -0.32323,0.57323 -0.5,0.75c-0.17677,0.17677 -0.32323,0.07323 -0.5,0.25c-0.17677,0.17677 -0.5,0.25 -0.75,0.5c-0.25,0.25 -0.6147,0.42336 -0.75,0.75c-0.09567,0.23097 -0.25,0.25 -0.25,0.25c0,0.25 -0.07687,0.54651 0.25,1c0.41345,0.57364 0.85471,1.10472 1.25,1.5c0.39529,0.39528 0.83437,0.8275 1.25,1.5c0.18587,0.30075 0.42637,0.58655 1,1c0.4535,0.32686 1.0465,0.42314 1.5,0.75c0.86045,0.62018 1.25,0.75 1.75,1.25c0.25,0.25 1,0.25 2,0.75c0.5,0.25 1,0.5 1,0.75", 0], ["c0,0 0.5,0 0.5,0.25c0,0 0.42336,0.1147 0.75,0.25c0.46194,0.19135 0.75,0.25 1.25,0.25c0.25,0 0.75,0.25 1,0.25c0.25,0 0.5465,-0.07686 1,0.25c0.28682,0.20673 0.5,0.5 0.75,0.5c0.25,0 0.5,0 0.75,0.25c0.25,0.25 0.32323,0.32323 0.5,0.5c0.17677,0.17677 0.07323,0.07323 0.25,0.25c0.17677,0.17677 0.5,0 0.75,0.25c0.25,0.25 0.57323,0.07323 0.75,0.25c0.17677,0.17677 0.32323,0.07323 0.5,0.25c0.17677,0.17677 0.25,0.25 0.5,0.25c0.25,0 0.20594,0.12157 0.75,0.25c0.24331,0.05743 0.25,0.25 0.5,0.25c0.25,0 0.42336,0.1147 0.75,0.25c0.23097,0.09567 0.5,0 0.75,0c0,0 0,0.25 0.25,0.25c0.25,0 0.42336,0.1147 0.75,0.25c0.23097,0.09567 0.5,0 0.5,0c0.25,0 0.32323,0.07323 0.5,0.25c0.17677,0.17677 0,0.25 0.25,0.25l0,0.25l0,0l0,0 m-14,-7 c0.25,-0.25 0.46967,0.28032 1,-0.25c0.17677,-0.17677 1.0465,-0.17314 1.5,-0.5c0.28682,-0.20673 0.53806,-0.05865 1,-0.25c0.32664,-0.1353 0.5,-0.25 0.75,-0.25c0.25,0 0.42336,-0.1147 0.75,-0.25c0.23097,-0.09567 0.76903,-0.15433 1,-0.25c0.32664,-0.1353 0.50669,-0.19257 0.75,-0.25c1.08813,-0.25687 1.25,-0.5 1.5,-0.75c0,0 0.57323,0.17677 0.75,0c0.17677,-0.17677 0.17336,-0.3647 0.5,-0.5c0.23097,-0.09567 0.5,-0.25 0.75,-0.5c0.25,-0.25 0.42336,-0.3647 0.75,-0.5c0.23097,-0.09567 0.40433,-0.01903 0.5,-0.25c0.1353,-0.32664 0.32425,-0.40346 1,-1c0.41908,-0.36996 0.75,-0.25 0.75,-0.25c0.25,0 0.25,-0.25 0.5,-0.25c0.25,0 0.25,-0.25 0.5,-0.25c0.25,0 0.5,-0.25 0.75,-0.25l0,0l0,0", 0], ["", 0], ["m0,-7 l7,7 l-7,7 l-7,-7 l7,-7 l7,7", 0]],

	/**
	 * @method
	 * @private
	 */
	generateEdgePathArray : function(cfg) {
		var cx1, cy1, cx2, cy2, toPort, fromPort, exitSide, entrySide;
		var fromNodeXY, toNodeXY;
		var x1, y1, h1, w1;
		var x2, y2, h2, w2;

		if (cfg.toPort === 'auto' || cfg.fromPort === 'auto') {

			//========================================================================
			if (cfg.fromNode.isNode) {
				if (cfg.fromPort === 'auto') {
					cx1 = cfg.fromNode.getCx();
					cy1 = cfg.fromNode.getCy();
				} else {
					fromNodeXY = cfg.fromNode.getConnectionCoords(cfg.fromPort);
					cx1 = fromNodeXY[0];
					cy1 = fromNodeXY[1];
				}
			} else {
				cx1 = cfg.fromNode[0];
				cy1 = cfg.fromNode[1];
			}

			if (cfg.toNode.isNode) {
				if (cfg.toPort === 'auto') {
					cx2 = cfg.toNode.getCx();
					cy2 = cfg.toNode.getCy();
				} else {
					toNodeXY = cfg.toNode.getConnectionCoords(cfg.toPort);
					cx2 = toNodeXY[0];
					cy2 = toNodeXY[1];
				}
			} else {
				cx2 = cfg.toNode[0];
				cy2 = cfg.toNode[1];
			}

			var center2center = Raphael.angle(cx1, cy1, cx2, cy2);

			switch (true) {

				case (center2center < 45):
				case (center2center > 315):
					fromPort = (cfg.fromPort === "auto") ? "left" : cfg.fromPort;
					toPort = (cfg.toPort === "auto") ? (center2center >= 315 ? "top" : "bottom") : cfg.toPort;
					break;
				case (center2center >= 45 && center2center <= 135):
					fromPort = (cfg.fromPort === "auto") ? "top" : cfg.fromPort;
					toPort = (cfg.toPort === "auto") ? (center2center > 90 ? "left" : "right") : cfg.toPort;
					break;
				case (center2center > 135 && center2center < 225):
					fromPort = (cfg.fromPort === "auto") ? "right" : cfg.fromPort;
					toPort = (cfg.toPort === "auto") ? (center2center > 180 ? "top" : "bottom") : cfg.toPort;
					break;
				case (center2center >= 225 && center2center <= 315):
					fromPort = (cfg.fromPort === "auto") ? "bottom" : cfg.fromPort;
					toPort = (cfg.toPort === "auto") ? (center2center > 270 ? "right" : "left") : cfg.toPort;
					break;
				default:
					fromPort = "left";
					toPort = "right";
			}

			if (cfg.edge) {
				cfg.edge.toPortAuto = toPort;
				cfg.edge.fromPortAuto = fromPort;
			}
		} else {
			fromPort = cfg.fromPort;
			toPort = cfg.toPort;
			//entrySide = cfg.entrySide;
			//exitSide = cfg.exitSide;
		}
		//console.log('entrySide = '+entrySide);
		//console.log('exitSide = '+exitSide);
		if (cfg.fromNode.isNode) {
			fromNodeXY = cfg.fromNode.getConnectionCoords(fromPort);
			exitSide = fromNodeXY[2];
			x1 = fromNodeXY[0];
			y1 = fromNodeXY[1];
			w1 = cfg.fromNode.getWidth();
			h1 = cfg.fromNode.getHeight();
		} else {
			x1 = cfg.fromNode[0];
			y1 = cfg.fromNode[1];
			w1 = cfg.w1 || 0;
			h1 = cfg.h1 || 0;
			exitSide = fromPort;
		}
		if (cfg.toNode.isNode) {
			toNodeXY = cfg.toNode.getConnectionCoords(toPort);
			entrySide = toNodeXY[2];
			x2 = toNodeXY[0];
			y2 = toNodeXY[1];
			w2 = cfg.toNode.getWidth();
			h2 = cfg.toNode.getHeight();
		} else {
			x2 = cfg.toNode[0];
			y2 = cfg.toNode[1];
			w2 = cfg.w2 || 0;
			h2 = cfg.h2 || 0;
			entrySide = toPort;
		}

		var pathArray = [];
		var xa, xb, xmin, margin, ylimit, xlim, ylim;
		var ya, yb, ymin, margin, xlimit, xmid, ymid, ha, hb, wa, wb;
		pathArray[0] = [x1, y1];

		switch (true) {

			case ((exitSide == "left" && entrySide == "right") || (exitSide == "right" && entrySide == "left")):
				if (exitSide == "left" && entrySide == "right") {
					xa = x1;
					xb = x2;
					xmin = (x1 <= (x2 - w2)) ? x1 - 20 : x2 - w2 - 20;
					margin = 20;
				} else {
					xa = x2;
					xb = x1;
					xmin = (x1 >= (x2 + w2)) ? x1 + 20 : x2 + w2 + 20;
					margin = -20;
				}
				if (xa > xb) {
					if (y1 == y2) {
						pathArray[1] = [x2, y2]
					} else {
						xmid = (x1 + x2) / 2;
						//ymid = (y1 + y2) / 2;
						pathArray[1] = [xmid, y1];
						pathArray[2] = [xmid, y2];
						pathArray[3] = [x2, y2]
					}
				} else {
					if (y1 >= y2) {
						ylimit = Math.min((y2 - h2 / 2), (y1 - h1 / 2)) - 20;
					} else {
						ylimit = 20 + Math.max((y2 + h2 / 2), (y1 + h1 / 2));
					}
					//xmin = (x1 <= (x2 - w2)) ? x1 - 20 : x2 - w2 - 20;
					pathArray[1] = [xmin, y1];
					pathArray[2] = [xmin, ylimit];
					pathArray[3] = [x2 + margin, ylimit];
					pathArray[4] = [x2 + margin, y2];
					pathArray[5] = [x2, y2];
				}
				break;
			//================================================================

			case ((exitSide == "left" && entrySide == "top") || (exitSide == "top" && entrySide == "left")):
				if (exitSide == "left" && entrySide == "top") {
					xa = x1;
					xb = x2;
					ya = y1;
					yb = y2;
					ha = h1;
					hb = h2;
					wb = w2;
				} else {
					xa = x2;
					xb = x1;
					ya = y2;
					yb = y1;
					ha = h2;
					hb = h1;
					wb = w1;
				}
				pathArray[0] = [xa, ya];
				margin = 20;
				xlim = Math.min(xa - margin, xb - wb / 2 - margin);
				ylim = Math.min(ya - ha / 2 - margin, yb - margin);

				if (yb >= ya) {
					if (xa >= xb) {
						pathArray[1] = [xb, ya];
						pathArray[2] = [xb, yb];
					} else {
						if (yb - margin >= ya + margin + (ha / 2)) {
							pathArray[1] = [xa - margin, ya];
							pathArray[2] = [xa - margin, yb - margin];
							pathArray[3] = [xb, yb - margin];
							pathArray[4] = [xb, yb]
						} else {
							pathArray[1] = [xa - margin, ya];
							pathArray[2] = [xa - margin, ya - margin - ha / 2];
							pathArray[3] = [xb, ya - margin - ha / 2];
							pathArray[4] = [xb, yb]
						}
					}
				} else {
					if (xa >= xb + wb / 2) {
						xmid = (xa + xb + wb / 2) / 2;
						pathArray[1] = [xmid, ya];
						pathArray[2] = [xmid, yb - margin];
						pathArray[3] = [xb, yb - margin];
						pathArray[4] = [xb, yb];
					} else {
						pathArray[1] = [xlim, ya];
						pathArray[2] = [xlim, ylim];
						pathArray[3] = [xb, ylim];
						pathArray[4] = [xb, yb];
					}
				}
				//console.log('pathArray - '+pathArray);
				if (exitSide == "top" && entrySide == "left") {
					pathArray.reverse();
					//console.log('pathArray(reversed) - '+pathArray);
				}
				break;

			//================================================================

			case ((exitSide == "right" && entrySide == "top") || (exitSide == "top" && entrySide == "right")):
				if (exitSide == "right" && entrySide == "top") {
					xa = x1;
					xb = x2;
					ya = y1;
					yb = y2;
					ha = h1;
					hb = h2;
					wb = w2;
				} else {
					xa = x2;
					xb = x1;
					ya = y2;
					yb = y1;
					ha = h2;
					hb = h1;
					wb = w1;
				}
				pathArray[0] = [xa, ya];
				margin = 20;
				xlim = Math.max(xa + margin, xb + wb / 2 + margin);
				ylim = Math.min(ya - ha / 2 - margin, yb - margin);

				if (yb >= ya) {
					if (xa <= xb) {
						pathArray[1] = [xb, ya];
						pathArray[2] = [xb, yb];
					} else {
						if (yb - margin >= ya + margin + (ha / 2)) {
							pathArray[1] = [xa + margin, ya];
							pathArray[2] = [xa + margin, yb - margin];
							pathArray[3] = [xb, yb - margin];
							pathArray[4] = [xb, yb]
						} else {
							pathArray[1] = [xa + margin, ya];
							pathArray[2] = [xa + margin, ya - margin - ha / 2];
							pathArray[3] = [xb, ya - margin - ha / 2];
							pathArray[4] = [xb, yb]
						}
					}
				} else {
					if (xa <= xb - wb / 2) {
						xmid = (xa + xb - wb / 2) / 2;
						pathArray[1] = [xmid, ya];
						pathArray[2] = [xmid, yb - margin];
						pathArray[3] = [xb, yb - margin];
						pathArray[4] = [xb, yb];
					} else {
						pathArray[1] = [xlim, ya];
						pathArray[2] = [xlim, ylim];
						pathArray[3] = [xb, ylim];
						pathArray[4] = [xb, yb];
					}
				}
				//console.log('pathArray - '+pathArray);
				if (exitSide == "top" && entrySide == "right") {
					pathArray.reverse();
					//console.log('pathArray(reversed) - '+pathArray);
				}
				break;
			//================================================================

			case ((exitSide == "left" && entrySide == "bottom") || (exitSide == "bottom" && entrySide == "left")):
				if (exitSide == "left" && entrySide == "bottom") {
					xa = x1;
					xb = x2;
					ya = y1;
					yb = y2;
					ha = h1;
					hb = h2;
					wb = w2;
				} else {
					xa = x2;
					xb = x1;
					ya = y2;
					yb = y1;
					ha = h2;
					hb = h1;
					wb = w1;
				}
				pathArray[0] = [xa, ya];
				margin = 20;
				xlim = Math.min(xa - margin, xb - wb / 2 - margin);
				ylim = Math.max(ya + ha / 2 + margin, yb + margin);

				if (yb <= ya) {
					if (xa >= xb) {
						pathArray[1] = [xb, ya];
						pathArray[2] = [xb, yb];
					} else {
						if (yb + margin <= ya - margin - (ha / 2)) {
							pathArray[1] = [xa - margin, ya];
							pathArray[2] = [xa - margin, yb + margin];
							pathArray[3] = [xb, yb + margin];
							pathArray[4] = [xb, yb]
						} else {
							pathArray[1] = [xa - margin, ya];
							pathArray[2] = [xa - margin, ya + margin + ha / 2];
							pathArray[3] = [xb, ya + margin + ha / 2];
							pathArray[4] = [xb, yb]
						}
					}
				} else {
					if (xa >= xb + wb / 2) {
						xmid = (xa + xb + wb / 2) / 2;
						pathArray[1] = [xmid, ya];
						pathArray[2] = [xmid, yb + margin];
						pathArray[3] = [xb, yb + margin];
						pathArray[4] = [xb, yb];
					} else {
						pathArray[1] = [xlim, ya];
						pathArray[2] = [xlim, ylim];
						pathArray[3] = [xb, ylim];
						pathArray[4] = [xb, yb];
					}
				}
				//console.log('pathArray - '+pathArray);
				if (exitSide == "bottom" && entrySide == "left") {
					pathArray.reverse();
					//console.log('pathArray(reversed) - '+pathArray);
				}
				break;
			//================================================================

			case ((exitSide == "right" && entrySide == "bottom") || (exitSide == "bottom" && entrySide == "right")):
				if (exitSide == "right" && entrySide == "bottom") {
					xa = x1;
					xb = x2;
					ya = y1;
					yb = y2;
					ha = h1;
					hb = h2;
					wb = w2;
				} else {
					xa = x2;
					xb = x1;
					ya = y2;
					yb = y1;
					ha = h2;
					hb = h1;
					wb = w1;
				}
				pathArray[0] = [xa, ya];
				margin = 20;
				xlim = Math.max(xa + margin, xb + wb / 2 + margin);
				ylim = Math.max(ya + ha / 2 + margin, yb + margin);

				if (yb <= ya) {
					if (xa <= xb) {
						pathArray[1] = [xb, ya];
						pathArray[2] = [xb, yb];
					} else {
						if (yb + margin <= ya - margin - (ha / 2)) {
							pathArray[1] = [xa + margin, ya];
							pathArray[2] = [xa + margin, yb + margin];
							pathArray[3] = [xb, yb + margin];
							pathArray[4] = [xb, yb]
						} else {
							pathArray[1] = [xa + margin, ya];
							pathArray[2] = [xa + margin, ya + margin + ha / 2];
							pathArray[3] = [xb, ya + margin + ha / 2];
							pathArray[4] = [xb, yb]
						}
					}
				} else {
					if (xa <= xb - wb / 2) {
						xmid = (xa + xb - wb / 2) / 2;
						pathArray[1] = [xmid, ya];
						pathArray[2] = [xmid, yb + margin];
						pathArray[3] = [xb, yb + margin];
						pathArray[4] = [xb, yb];
					} else {
						pathArray[1] = [xlim, ya];
						pathArray[2] = [xlim, ylim];
						pathArray[3] = [xb, ylim];
						pathArray[4] = [xb, yb];
					}
				}
				//console.log('pathArray - '+pathArray);
				if (exitSide == "bottom" && entrySide == "right") {
					pathArray.reverse();
					//console.log('pathArray(reversed) - '+pathArray);
				}
				break;

			//================================================================

			case ((exitSide == "right" && entrySide == "right")):
				pathArray[0] = [x1, y1];
				margin = 20;
				xlim = Math.max(x1 + margin, x2 + margin);

				if (y2 < y1 + h1 / 2 && y2 > y1 - h1 / 2) {
					if (y2 > y1) {
						if (x1 > x2) {
							pathArray[1] = [xlim, y1];
							pathArray[2] = [xlim, y1 + h1 / 2 + margin];
							pathArray[3] = [x2 + margin, y1 + h1 / 2 + margin];
							pathArray[4] = [x2 + margin, y2];
							pathArray[5] = [x2, y2];
						} else {
							pathArray[1] = [x1 + margin, y1];
							pathArray[2] = [x1 + margin, y2 + h2 / 2 + margin];
							pathArray[3] = [xlim, y2 + h2 / 2 + margin];
							pathArray[4] = [xlim, y2];
							pathArray[5] = [x2, y2];
						}
					} else {
						if (x1 > x2) {
							pathArray[1] = [xlim, y1];
							pathArray[2] = [xlim, y1 - h1 / 2 - margin];
							pathArray[3] = [x2 + margin, y1 - h1 / 2 - margin];
							pathArray[4] = [x2 + margin, y2];
							pathArray[5] = [x2, y2];
						} else {
							pathArray[1] = [x1 + margin, y1];
							pathArray[2] = [x1 + margin, y2 - h2 / 2 - margin];
							pathArray[3] = [xlim, y2 - h2 / 2 - margin];
							pathArray[4] = [xlim, y2];
							pathArray[5] = [x2, y2];
						}
					}
				} else {
					pathArray[1] = [xlim, y1];
					pathArray[2] = [xlim, y2];
					pathArray[3] = [x2, y2];
				}

				break;
			//================================================================

			case ((exitSide == "left" && entrySide == "left")):
				pathArray[0] = [x1, y1];
				margin = 20;
				xlim = Math.min(x1 - margin, x2 - margin);

				if (y2 < y1 + h1 / 2 && y2 > y1 - h1 / 2) {
					if (y2 > y1) {
						if (x1 < x2) {
							pathArray[1] = [xlim, y1];
							pathArray[2] = [xlim, y1 + h1 / 2 + margin];
							pathArray[3] = [x2 - margin, y1 + h1 / 2 + margin];
							pathArray[4] = [x2 - margin, y2];
							pathArray[5] = [x2, y2];
						} else {
							pathArray[1] = [x1 - margin, y1];
							pathArray[2] = [x1 - margin, y2 + h2 / 2 + margin];
							pathArray[3] = [xlim, y2 + h2 / 2 + margin];
							pathArray[4] = [xlim, y2];
							pathArray[5] = [x2, y2];
						}
					} else {
						if (x1 < x2) {
							pathArray[1] = [xlim, y1];
							pathArray[2] = [xlim, y1 - h1 / 2 - margin];
							pathArray[3] = [x2 - margin, y1 - h1 / 2 - margin];
							pathArray[4] = [x2 - margin, y2];
							pathArray[5] = [x2, y2];
						} else {
							pathArray[1] = [x1 - margin, y1];
							pathArray[2] = [x1 - margin, y2 - h2 / 2 - margin];
							pathArray[3] = [xlim, y2 - h2 / 2 - margin];
							pathArray[4] = [xlim, y2];
							pathArray[5] = [x2, y2];
						}
					}
				} else {
					pathArray[1] = [xlim, y1];
					pathArray[2] = [xlim, y2];
					pathArray[3] = [x2, y2];
				}

				break;

			//================================================================

			case ((exitSide == "top" && entrySide == "top")):
				pathArray[0] = [x1, y1];
				margin = 20;
				ylim = Math.min(y1 - margin, y2 - margin);

				if (x2 < x1 + w1 / 2 && x2 > x1 - w1 / 2) {
					if (x2 > x1) {
						if (y1 < y2) {
							pathArray[1] = [x1, ylim];
							pathArray[2] = [x1 - w1 / 2 - margin, ylim];
							pathArray[3] = [x1 - w1 / 2 - margin, y2 - margin];
							pathArray[4] = [x2, y2 - margin];
							pathArray[5] = [x2, y2];
						} else {
							pathArray[1] = [x1, y1 - margin];
							pathArray[2] = [x2 + w2 / 2 + margin, y1 - margin];
							pathArray[3] = [x2 + w2 / 2 + margin, ylim];
							pathArray[4] = [x2, ylim];
							pathArray[5] = [x2, y2];
						}
					} else {
						if (y1 < y2) {
							pathArray[1] = [x1, ylim];
							pathArray[2] = [x1 - w1 / 2 - margin, ylim];
							pathArray[3] = [x1 - w1 / 2 - margin, y2 - margin];
							pathArray[4] = [x2, y2 - margin];
							pathArray[5] = [x2, y2];
						} else {
							pathArray[1] = [x1, y1 - margin];
							pathArray[2] = [x2 + w2 / 2 + margin, y1 - margin];
							pathArray[3] = [x2 + w2 / 2 + margin, ylim];
							pathArray[4] = [x2, ylim];
							pathArray[5] = [x2, y2];
						}
					}
				} else {
					pathArray[1] = [x1, ylim];
					pathArray[2] = [x2, ylim];
					pathArray[3] = [x2, y2];
				}

				break;

			//================================================================

			case ((exitSide == "bottom" && entrySide == "bottom")):
				pathArray[0] = [x1, y1];
				margin = 20;
				ylim = Math.max(y1 + margin, y2 + margin);

				if (x2 < x1 + w1 / 2 && x2 > x1 - w1 / 2) {
					if (x2 > x1) {
						if (y1 > y2) {
							pathArray[1] = [x1, ylim];
							pathArray[2] = [x1 - w1 / 2 - margin, ylim];
							pathArray[3] = [x1 - w1 / 2 - margin, y2 + margin];
							pathArray[4] = [x2, y2 + margin];
							pathArray[5] = [x2, y2];
						} else {
							pathArray[1] = [x1, y1 + margin];
							pathArray[2] = [x2 + w2 / 2 + margin, y1 + margin];
							pathArray[3] = [x2 + w2 / 2 + margin, ylim];
							pathArray[4] = [x2, ylim];
							pathArray[5] = [x2, y2];
						}
					} else {
						if (y1 > y2) {
							pathArray[1] = [x1, ylim];
							pathArray[2] = [x1 - w1 / 2 - margin, ylim];
							pathArray[3] = [x1 - w1 / 2 - margin, y2 + margin];
							pathArray[4] = [x2, y2 + margin];
							pathArray[5] = [x2, y2];
						} else {
							pathArray[1] = [x1, y1 + margin];
							pathArray[2] = [x2 + w2 / 2 + margin, y1 + margin];
							pathArray[3] = [x2 + w2 / 2 + margin, ylim];
							pathArray[4] = [x2, ylim];
							pathArray[5] = [x2, y2];
						}
					}
				} else {
					pathArray[1] = [x1, ylim];
					pathArray[2] = [x2, ylim];
					pathArray[3] = [x2, y2];
				}

				break;

			//================================================================

			case ((exitSide == "top" && entrySide == "bottom") || (exitSide == "bottom" && entrySide == "top")):
				if (exitSide == "top" && entrySide == "bottom") {
					ya = y1;
					yb = y2;
					ymin = (y1 <= (y2 - h2)) ? y1 - 20 : y2 - h2 - 20;
					margin = 20;
				} else {
					ya = y2;
					yb = y1;
					ymin = (y1 >= (y2 + h2)) ? y1 + 20 : y2 + h2 + 20;
					margin = -20;
				}
				if (ya > yb) {
					if (x1 == x2) {
						pathArray[1] = [x2, y2]
					} else {
						ymid = (y1 + y2) / 2;
						pathArray[1] = [x1, ymid];
						pathArray[2] = [x2, ymid];
						pathArray[3] = [x2, y2]
					}
				} else {
					if (x1 >= x2) {
						xlimit = Math.min((x2 - w2 / 2), (x1 - w1 / 2)) - 20;
					} else {
						xlimit = 20 + Math.max((x2 + w2 / 2), (x1 + w1 / 2));
					}
					//xmin = (x1 <= (x2 - w2)) ? x1 - 20 : x2 - w2 - 20;
					pathArray[1] = [x1, ymin];
					pathArray[2] = [xlimit, ymin];
					pathArray[3] = [xlimit, y2 + margin];
					pathArray[4] = [x2, y2 + margin];
					pathArray[5] = [x2, y2];
				}
				break;
		}

		return pathArray;
	}
};

/**
 * @property {Object} global Provides a reference to the global DOM object
 */

( function() {
		JSD.global = this;
	}());

/**
 * @method createNamespace Creates a namespace and assigns on object to it
 * @param {String} ns The namespace to create
 * @param {Object} obj (optional) The object which will be assigned to the new namespace. If no object is passed in this parameter, a new empty object will be created.
 * @return {Object} obj Returns the passed object
 * <pre><code class="prettyprint">
 *_var myObject = {
 * 	data1: 100,
 * 	data2: 300
 * };
 * JSD.createNamespace("my.namespace.test", myObject);
 * alert(my.namespace.test.data1); // result=100</code></pre>
 */

JSD.createNamespace = function(ns, obj) {
	var a = ns.split(".");
	var base = JSD.global;
	var thisNS;
	for (var i = 0; i < a.length; i++) {
		thisNS = a[i];
		if (!base[thisNS]) {
			if (i === a.length - 1) {
				base[thisNS] = obj || {}
			} else {
				base[thisNS] = {};
			}
		}
		base = base[thisNS];
	}
	//base = obj || {a: 111};
	return base;
}
/**
 * @method getNamespace Returns the namespace object
 * @param {String} ns A string representing namespace that you want to find
 * @return {Object}  The namespace object
 * This method is useful for retrieving a namespace object (or class) if the name of the class/object may vary within the code.
 * Therefore, you can manipulate the name within a string and use this method to get a handle on the actual class/namespace object.
 * <pre><code class="prettyprint">
 * my.namespace.test = {
 * 	data1: 100,
 * 	data2: 300
 * };
 * var myString = "my.namespace.test";
 * var myObject = JSD.getClass(myString);
 * alert(myObject.data2); // result=300</code></pre>
 **/

JSD.getClass = function(ns) {
	if ( typeof ns !== "string") {
		return null
	}
	var a = ns.split(".");
	var base = JSD.global;
	var thisNS;
	for (var i = 0; i < a.length; i++) {
		thisNS = a[i];
		if (!base[thisNS]) {
			return null
		}
		base = base[thisNS];
	}
	//base = obj || {a: 111};
	return base;
}

JSD.getClassByCmpType = function(ct) {
	return JSD.getClass(JSD.cmpTypes[ct])
}
/**
 * @method getClass Returns the namespace object (shorthand for getNamespace)
 * @param {String} ns A string representing namespace that you want to find
 * @return {Object}  The namespace object
 * This method is useful for retrieving a namespace object (or class) if the name of the class/object may vary within the code.
 *_ Therefore, you can manipulate the name within a string and use this method to get a handle on the actual class/namespace object.
 * <pre><code class="prettyprint">
 * my.namespace.test = {
 * 	data1: 100,
 * 	data2: 300
 * };
 * var myString = "my.namespace.test";
 * var myObject = JSD.getClass(myString);
 * alert(myObject.data2); // result=300</code></pre>
 **/

//================================       EXTEND API     ====================================

/**
 * @method extend
 * @param {Class} superClass The Class to be extended
 * @param {Object} config An object containing all the properties / methods to be applied to the new class
 * @return {Class} Returns the newClass which is an extension (or subclass) of the superClass
 */

JSD.extend = function() {
	return function(superClass, config) {
		if ( typeof superClass === "string") {
			config.extend = superClass;
			superClass = JSD.getClass(superClass);
		} else {
			config.extend = superClass.prototype.className;
		}

		var dummyFn = function() {
		};
		//console.log('extend');
		var newClass = config.constructor;
		dummyFn.prototype = superClass.prototype;
		newClass.prototype = new dummyFn();
		//superClass();
		newClass.prototype.constructor = newClass;
		newClass.superclass = superClass.prototype;

		for (var name in config) {
			newClass.prototype[name] = config[name];
		}

		//now update the cmpTypeChain;
		if (config.cmpType) {
			JSD.cmpTypes[config.cmpType] = config.className;
			var list = superClass.prototype["cmpTypeList"] || "";
			list = (list === "") ? config.cmpType : config.cmpType + " " + list;
			newClass.prototype["cmpTypeList"] = list;
		}
		return newClass;
	};
}();

/**
 * @method define Defines a new Class.
 * The <code>config</code> object must contain a "className" property {String} which will become the name for the new class.  According to convention, it should be capitalised
 * (eg. MyClassName or MyPackage.MyClass).  The <code>config</code> object may also contain an "extend" property {String} which is the name of the class which is to be extended.
 * If no "extend" property is included, then the {@link JSD.BaseClass} class will be used.
 *
 * <pre><code class="prettyprint">
 * JSD.define({
 *	className : 'JSD.diagram.myCoolComponent',
 *	cmpType : 'coolComponent',
 *	extend : "JSD.diagram.Node",
 *
 *	constructor : function(config) {
 *		//pre-processing goes here
 *
 *		JSD.diagram.myCoolComponent.superclass.constructor.call(this, config);
 *
 * 		//post-processing goes here
 *	},
 *
 *	newMethod : function(){
 *
 *	}
 *
 * })</code></pre>
 * @param {Object} config An object containing all of the overrides and methods/properties to be applied to the new Class
 * @return {Class} Returns the newClass
 *
 */

JSD.define = function(name, config) {
	if ( typeof name === "object") {
		config = name;
		if (config.className) {
			JSD.define(config.className, config);
		}
	} else {
		var ext = config.extend || 'JSD.BaseClass';
		config.className = name;

		return JSD.createNamespace(name, JSD.extend(ext, config));
	}
};

/**
 * @method create Creates new object from the passed <code>config</code> object.
 * @param {Object} config An object containing all of the configuration options necessary to create the object
 * @return {Object} Returns the instantiated object
 * The <code>config</code> object must contain either a "className" property or a "cmpType" property. This will be used to determine which class to use to create the new object.
 * <pre><code class="prettyprint">
 * var myCoolObject = JSD.create({
 *
 *	className : 'JSD.diagram.myCoolComponent'
 *
 * })</code></pre>

 */

JSD.create = function(cn, config) {
	if ( typeof cn === "object") {
		config = cn;
		cn = config.className
	}

	if (!cn) {
		if (!config.cmpType) {
			return null
		} else {
			cn = JSD.cmpTypes[config.cmpType]
		}
	}
	var obj = JSD.getClass(cn);
	return new obj(config);

}
/*JSD.create({
className: "test.abc.zzz",
str: 'wad up dude!'
});
*/

/**
 * @class JSD.JSON
 */

/**
 * @method encode Converts a javascript object into a JSON formatted string
 * @param {Object} obj The javascript object to convert
 * @return {string}
 *
 */

/**
 * @method decode Converts a JSON formatted string into an Object.  If JSD.JSON.strictDecode is set to false, the string will be
 * _converted (evaluated) using the javascript <tt>eval</tt> function. Alternatively, if JSD.JSON.strictDecode is set to true (the default),
 * _it will only accept a JSON string as defined by the specification at www.json.org and will "parse" the json string
 * _using a modified version of Douglas Crockford's json2 code.
 * @param {string} str The string to be converted
 * @return {Object} The created javascript object
 */

/**
 * @property {boolean} strictDecode Dictates the method of evaluation for json strings.
 * _ If <code class="prettyprint">JSD.JSON.strictDecode</code> is set to false, the string will be
 * _converted (evaluated) using the javascript <tt>eval</tt> function.
 * _ Alternatively, if JSD.JSON.strictDecode is set to true (the default),
 * _it will only accept a JSON string as defined by the specification at www.json.org and will "parse" the json string
 * _using a modified version of Douglas Crockford's json2 code.
 */

JSD.JSON = {
	strictDecode : true,

	decode : function(json) {

		if (JSD.JSON.strictDecode) {
			return json ? JSON.parse(json) : "";
		} else {
			return json ? eval("(" + json + ")") : "";
		}
		return json ? eval("(" + json + ")") : "";
	},
	encode : function(obj, replacer, spacer) {
		return JSON.stringify(obj, replacer, spacer)
	}
};

//==============================        BaseClass API      ==================================

/**
 * @class JSD.BaseClass
 * This class is used as the basis for all classes within the jsDiagram library. This class should not be called directly. It provides event handling methods and properties to each class which inherits it.
 */
JSD.BaseClass = function(config) {
	this.init(config);
}
/**
 * @property {String} className The class name (<tt>String</tt>) of this object. Read Only.
 */

/**
 * @property {String} cmpType The component type (<tt>String</tt>) of this object. Read Only.
 * Possible Values:
 * _<ul>
 * _<li>node</li>
 * _<li>edge</li>
 * _<li>container</li>
 * _<li>diagram</li>
 * _<li>stencil</li>
 * _<li>shape</li></ul>
 * _Read Only.
 */
JSD.BaseClass.prototype.className = "JSD.BaseClass";
//JSD.BaseClass.prototype.cmpType = "base";
//JSD.BaseClass.prototype.cmpTypeList = "base";
//JSD.cmpTypes["base"] = "JSD.BaseClass";

JSD.BaseClass.prototype.init = function(config) {

	// load all the config options into this object
	JSD.apply(this, config);
	if (this.initialised) {
		return
	}

	var eventRegistry = {};

	/**
	 * @method hasListener Checks the <code>eventRegistry</code> for the existance of the given event
	 * @param {String} eventName The name of the event
	 * @return {Boolean} If <code>eventName</code> exists in the <code>eventRegistry</code> then returns <code>true</code>. Otherwise, returns <code>false</code>
	 */

	this.hasListener = function(eventName) {
		if ( typeof eventName === 'string') {
			return eventRegistry.hasOwnProperty(eventName);
		}
		return false;
	},

	/**
	 * @method fireEvent Fires an event.
	 * @param {string} eventName The name of the event to fire
	 * @param {Objects...} arguments Variable number of arguments are sent to handler
	 * @return {boolean} If a handler returns <tt>false</tt>, then this event return false.  By default, this event returns true.
	 *
	 */
	this.fireEvent = function() {
		var event = arguments[0];

		var returnVal, array, func, scope, listener, i, j;
		var type = ( typeof event === 'string') ? event : event.type;
		type = type.toLowerCase();

		if (eventRegistry.hasOwnProperty(type)) {
			array = eventRegistry[type];
			for (var i = 0; i < array.length; i += 1) {
				listener = array[i];
				func = listener.handler;
				scope = listener.scope || this;
				if (arguments.length > 1) {
					var newArg = [];
					for ( j = 1; j < arguments.length; j += 1) {
						newArg.push(arguments[j]);
					}
				}
				return func.apply(scope, newArg || [event]);
			}
		}

		return true;
	};

	this.on = function(type, fn, scope) {

		if ( typeof type === "object") {
			var listenerObj = type;
			for (var name in listenerObj) {
				//type = name;
				if ( typeof listenerObj[name] === "string") {
					listenerObj[name] = eval('(' + listenerObj[name] + ')');
				}

				if ( typeof listenerObj[name] === "function") {
					fn = listenerObj[name]
				} else {
					fn = listenerObj[name].fn
					if (listenerObj[name].scope) {
						scope = listenerObj[name].scope
					}
				}
				this.on(name, fn, scope)
			}
		} else {
			type = type.toLowerCase();
			//console.log('addListener',type);
			var listener = {
				handler : fn
			};
			if (scope) {
				listener.scope = scope
			}
			if (eventRegistry.hasOwnProperty(type)) {
				eventRegistry[type].push(listener);
			} else {
				eventRegistry[type] = [listener];
			}
			//console.log(this.label +"("+type+") "+ eventRegistry[type].length);
			return this;
		}
	};

	this.un = function(type, fn, scope) {
		if (eventRegistry.hasOwnProperty(type)) {
			var e = eventRegistry[type];
			for (var i = 0; i < e.length; i++) {
				if (fn === e[i].handler) {
					e.splice(i, 1);
				}
			}
		}
		return this;
	};

	/**
	 * @method purgeListeners
	 */

	this.purgeListeners = function() {
		this.eventRegistry = {};
		return this;
	}
	/**
	 * @method addListener Defines a function (handler) which will be triggered on a particular event.
	 * @param {String} eventName The name of the event to listen for
	 * @param {Function} handler The method invoked by the listener
	 * @param {Object} scope (optional) The scope (<code class="prettyprint">this</code> reference) in which the handler function will be executed. Defaults to the object which fired the event.
	 * @return {void}
	 * <strong>Example:</strong>
	 * <pre><code class="prettyprint">
	 *_var alertFn = function(){
	 * 	alert('focus event')
	 * };
	 *
	 * myRectangle.addListener('focus', alertFn, this);
	 * </code></pre>
	 *_ This method will also accept a single config object as a parameter. This can be used to add multiple event handlers at once.
	 *_ The object can be in either of the following formats:
	 *_ <pre><code class="prettyprint">
	 *_var focusHandler = function(obj){
	 *	alert(o.label);
	 * }
	 * var lableHandler = function(obj, newValue, oldValue){
	 *	alert('new label = '+newValue);
	 * }
	 *
	 * myShape.addListener({
	 * 	focus : {
	 * 		fn: focusHandler,
	 * 		scope: this
	 * 	},
	 * 	changeLabel : {
	 * 		fn: lableHandler
	 * 	}
	 * });
	 *_ </code></pre>
	 * You can also use the following shorthand format:
	 *_<pre><code class="prettyprint">
	 *_myShape.addListener({
	 * 	focus : function(o){
	 * 		alert(o.label)
	 * 	},
	 * 	changeLabel : function(o, newVal, oldVal){
	 * 		alert('new label = '+newVal)
	 * 	}
	 * });
	 *_ </code></pre>
	 */

	this.addListener = this.on;

	/**
	 * @method on Shorthand for addListener
	 */

	/**
	 * @method un Shorthand for removeListener
	 */

	/**
	 * @method removeListener
	 */

	this.removeListener = this.un;

	// add any listeners
	if (this.listeners) {
		this.on(this.listeners)
	};

	/*
	* @property {Object} eventRegistry
	*/

	// make the eventRegistry public
	this.eventRegistry = eventRegistry;

	this.initialised = true;

	/**
	 * @method getCurrentConfig Returns an object containing the configutration items which would be used to create the component in it's current state
	 * @param {Boolean} itemsOnly (optional) If <code>true</code>, this method returns an array of objects representing the configuration of all items contained within the current component
	 * (eg. if the current component is a {@link JSD.diagram.Diagram} or {@link JSD.diagram.Container}).  If <code>false</code> (the default), this method returns an object representing the configuration of the current component (and may also contain an items array if appropriate).
	 * @return {Object/Array} Object or Array (depending on <code>itemsOnly</code> paramater) containing the configutration items of this component
	 */

	this.getCurrentConfig = function(itemsOnly) {
		var cc = [];
		if (itemsOnly) {
			if (this.items) {
				if (this.items.length > 0) {
					//console.log(this.items.length);
					cc = [];
					for (var i = 0; i < this.items.length; i += 1) {
						cc.push(this.items[i].getCurrentConfig())
					}
					return cc;
				}
			}
			return cc;
		}

		cc = this.currentConfig;
		// rebuild the items member
		if (cc.items) {
			delete cc.items
		}

		if (this.items) {
			if (this.items.length > 0) {
				cc.items = [];
				for (var i = 0; i < this.items.length; i += 1) {
					cc.items.push(this.items[i].getCurrentConfig())
				}
				return cc;
			}
		}
		return cc;
	};

	/**
	 * @method getSource Returns a JSON formatted string representing the current configuration settings for this component
	 * @param {String} spacer (optional)
	 * @param {Boolean} itemsOnly (optional) If <code>true</code>, this method returns an JSON formatted array of objects representing the configuration of all items contained within the current component (eg. if the current component is a JSD.diagram.Diagram or JSD.diagram.Container).  If <code>false</code> (the default), this method returns a JSON formatted object representing the configuration of the current component (and may also contain an items array if appropriate).
	 * @return {String} A JSON formatted string
	 */

	this.getSource = function(spacer, itemsOnly) {
		var cc = this.getCurrentConfig(itemsOnly);
		return JSD.JSON.encode(cc, null, spacer);
	};
};

//===============================         AJAX API        =================================
/**
 * @class JSD.Ajax
 * @extends JSD.BaseClass
 * This is a class for performing AJAX requests. It provides a simple, yet powerful,
 * _ interface for retrieving data from the server without refreshing the web page.
 * _ It is a singleton class and cannot be created directly.  However, because it is a singleton,
 * _ you can change common properties. For example, <code class="prettyprint">JSD.Ajax.url = "defaulturl.php"</code> will set the default url for all requests.
 * _ You can override those default properties in individual requests as necessary.
 *
 *
 * <pre><code class="prettyprint">
 * JSD.Ajax.url = "mydata.php"
 *
 * JSD.Ajax.request({
 * 	success: function(r, o){
 * 		//code on success
 * 	},
 * 	failure: function(r, o){
 * 		//code on failure
 * 	},
 * 	callback: function(o, s, r){
 * 		//code on success OR failure
 * 	}
 * })
 * </code></pre>
 * This class does not support "cross domain" requests. For more complicated implementations you can also use the AJAX methods within your favourite javascript library.
 */

JSD.define({

	className : "JSD._Ajax",
	extend : 'JSD.BaseClass',
	constructor : function(config) {

		JSD._Ajax.superclass.constructor.call(this, config);
	},

	/**
	 * @method request Performs an AJAX server request.  The request method takes one parameter (Object).  An example of an AJAX request would be:
	 * <pre><code class="prettyprint">
	 * _JSD.Ajax.request({
	 * 	url: 'myrequest.php',
	 * 	method: 'GET',
	 * 	success: function(r, o){
	 * 		//code to run on success
	 * 		//r.responseText will yield the actual text returned from the server
	 * 	}
	 * })</code></pre>
	 * _Please note that, by definition, AJAX requests are asyncronous and will return before the request has been completed.
	 * _ Any processing of the response should be carried out in one of the callback functions (success, failure, callback).
	 * @param {Object} config
	 * The config object takes the following configuration options:
	 * <ul>
	 * <li><strong>url:</strong> String (optional)
	 * The url to be used for this request. If this is not defined, the JSD.Ajax.url property will be used.</li>
	 * <li><strong>callback:</strong> Function (optional)
	 * The function which will be called on completion of the request (either success or failure).
	 * _The callback function will be called BEFORE the success or failure functions.
	 * Function will be called with the following paramaters:
	 * 		<ul><li>config: Object<br>The parameter of this request.</li>
	 * _		<li>success: Boolean<br>True if the request succeeded.</li>
	 * _		<li>response: Object<br>The xmlHttp response object.  </li></ul></li>
	 * <li><strong>success:</strong> Function (optional)
	 * The function which will be called on SUCCESS of the request.
	 * _The success function will be called AFTER the callback function.
	 * Function will be called with the following paramaters:
	 * 		<ul><li>response: Object<br>The xmlHttp response object.  </li>
	 * _			<li>config: Object<br>The parameter of this request.</li>
	 * 		</ul></li>
	 * <li><strong>failure:</strong> Function (optional)
	 * The function which will be called on FAILURE of the request.
	 * _The failure function will be called AFTER the callback function.
	 * Function will be called with the following paramaters:
	 * 		<ul><li>response: Object<br>The xmlHttp response object.  </li>
	 * _			<li>config: Object<br>The parameter of this request.</li>
	 * 		</ul></li>
	 * <li><strong>method:</strong> String (optional)
	 * The default HTTP method ("POST" or "GET") for requests. If this is not defined, the JSD.Ajax.method property will be used.
	 * </li>
	 * <li><strong>scope:</strong> Object (optional)
	 * The scope of the callback functions (success, failure and callback).  i.e. the object which the "this" keyword will refer to inside the callback functions. If this is not defined, the JSD.Ajax.scope property will be used.
	 * </li>
	 * <li><strong>params:</strong> Object (optional)
	 * The params to be passed with this request. Params will be added to the url in key/value pairs.
	 * Example:
	 * <pre><code class="prettyprint">
	 * _JSD.Ajax.request({
	 * 	url: 'myrequest.php',
	 * 	success: function(r, o){
	 * 		//code on success
	 * 	},
	 * 	params: {
	 * 		myTitle: 'Mr',
	 * 		myName: 'Bob'
	 * 	}
	 * })
	 * //params will be passed in url as "myrequest.php?myTitle=Mr&myName=Bob"
	 * </code></pre></li></ul>
	 */

	request : function(config) {
		var ajax = this;
		var url = config.url || ajax.url;
		var id = new Date().getTime();
		var disableCache = ajax.disableCaching;
		var method = config.method || ajax.method;
		var scope = config.scope || ajax.scope;
		var timeoutMS = config.timeout || ajax.timeout;
		var params = config.params || "";
		var headers = config.headers || {};

		if ( typeof params !== "string") {
			// must be an object
			var paramArray = [];
			for (var name in params) {
				if (params.hasOwnProperty(name)) {
					paramArray.push(name + "=" + params[name]);
				}
			}
			params = paramArray.join("&");
		}

		url = (method === "GET") ? (url + (url.indexOf("?") === -1 ? "?" : "&") + params) : url;

		if (method === "POST") {
			if (!headers["Content-type"]) {
				headers["Content-type"] = "application/x-www-form-urlencoded";
			}
		}

		if ( typeof config.disableCaching === 'boolean') {
			disableCache = config.disableCaching
		}

		if (disableCache) {
			var cacheParam = (url.indexOf("?") === -1 ? "?" : "&") + "_t=" + id;
			url = url + cacheParam;
		}

		try {
			var xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
		} catch (e) {
			if (window.XMLHttpRequest) {
				var xmlhttp = new XMLHttpRequest();
			} else {
				alert('XMLHttpRequest not supported!');
				return
			}
		}

		xmlhttp.open(method, url, true);

		if (headers) {
			// must be an object
			for (var name in headers) {
				if (headers.hasOwnProperty(name)) {
					xmlhttp.setRequestHeader(name, headers[name]);
				}
			}
		}

		var timeoutFn = setTimeout(function() {
			xmlhttp.abort();
			// Handle timeout situation, e.g. Retry or inform user.
		}, timeoutMS);

		xmlhttp.onreadystatechange = function() {
			clearTimeout(timeoutFn);
			if (xmlhttp.readyState === 4) {

				//xmlhttp.result = JSD.JSON.decode(xmlhttp.responseText);

				var success = (xmlhttp.status === 200 || xmlhttp.status === 0) ? true : false;
				//callback goes here
				//console.log('url = '+url);
				//console.log('xmlhttp.status = '+xmlhttp.status);
				if (config.callback) {
					config.callback.call(scope, config, success, xmlhttp)
				}

				if (success) {
					if (config.success) {
						config.success.call(scope, xmlhttp, config)
					}
				} else {
					if (config.failure) {
						config.failure.call(scope, xmlhttp, config)
					}
				}
			}
		}
		if (method === "POST") {
			xmlhttp.send(params);
		} else {
			xmlhttp.send();
		}
		/*
		 try{
		 xmlhttp.send();
		 }
		 catch(e){
		 return null;
		 }
		 */
		return id;
	},

	/**
	 * @property {String} method The default HTTP method ("POST" or "GET") for requests. (defaults to GET).
	 */
	method : "GET",

	/**
	 * @property {Object} scope The default scope ("this") for all callback functions (success, failure and callback). (defaults to the browser window).
	 */

	scope : window,

	/**
	 * @property {Boolean} disableCaching When set to true, an extra unique paramater will be added to HTTP GET requests (defaults to <tt>true</tt>).
	 */
	disableCaching : true,

	/**
	 * @property {String} url The default url to be used for ajax requests. (defaults to undefined)
	 */

	/**
	 * @property {Number} timeout The timeout in milliseconds to be used for requests. (defaults to 30000).
	 */
	timeout : 30000

});

JSD.Ajax = JSD.create({
	className : "JSD._Ajax"
});

//===============================         Component API        =================================
/**
 * @class JSD.diagram.Component
 * @extends JSD.BaseClass
 * Add description and examples here
 */

JSD.define({
	/**
	 * @cfg
	 * When creating a component using {@link JSD.Create} or when a new component is defined within another (eg. within the {@link JSD.diagram.Diagram#items} configuration option)
	 * 	you must include either <code>className</code> or <code>cmpType</code> in order for the renderer to determine what type of component to create.  See also {@link JSD.define}
	 */
	className : 'JSD.diagram.Component',
	/**
	 * @cfg
	 * When creating a component using {@link JSD.Create} or when a new component is defined within another (eg. within the {@link JSD.diagram.Diagram#items} configuration option)
	 * 	you must include either <code>className</code> or <code>cmpType</code> in order for the renderer to determine what type of component to create.  See also {@link JSD.define}
	 */
	cmpType : 'component',

	extend : "JSD.BaseClass",

	constructor : function(config) {

		JSD.diagram.Component.superclass.constructor.call(this, config);

		if (!this.id) {
			var elType = this.cmpType || "el";
			//var id = JSD.idPrefix+"-" + elType + "-" + JSD.getNextIdNum();//+random
			var id = JSD.generateId(elType);
			if (this.initialConfig && this.currentConfig) {
				this.initialConfig.id = id;
				this.currentConfig.id = id
			}
			this.id = id;
			//return id;
		}

		/**
		 * @property {Object} initialConfig
		 * An object representing the configuration option values as they were when the component was created. See also {@link #getCurrentConfig} for a description of how to retrieve the 'current' configuration settings.
		 */

		JSD.allIds.push(this.id);

		//this.getId = function() {
		//	return this.id;
		//}
	},

	/**
	 * @method focus
	 * @return {Object} this
	 */

	/** @method */
	getId : function() {
		return this.id;
	},

	/**
	 * @cfg {Object} listeners
	 * Specify <tt>true</tt> to ignore any default configuration settings in the Diagram configuration.  Defaults to <tt>false</tt> For example...
	 */

	/**
	 * @cfg {Boolean} ignoreDefaults Specify <tt>true</tt> to ignore any default configuration settings in the
	 * Diagram configuration.  Defaults to <tt>false</tt> For example...
	 */
	ignoreDefaults : false,

	isLocked : function() {
		if (this.parent === this.diagram) {
			return false
		}
		return this.parent.locked
	},

	/**
	 * @method isCmpType Tests whether an object is of a given component type.  Returns <code>true</code> if this
	 * _ object was created from a class with this cmpType.
	 * @param {String} cmpTypeString
	 * @param {Boolean} TopLevelOnly (optional) Restricts the comparison to the top level.
	 *_ If set to true, isCmpType will only check cmpTypeString against the actual cmpType for the class from which
	 *_ this object was created.  If set to false, isCmpType will return <code>true</code> if cmpType exists anywhere
	 *_ along the class inheritance chain (defaults to <code>false</code>)
	 * Example:
	 * <pre><code class="prettyprint">
	 *_//JSD.diagram.Container is a subclass of JSD.diagram.Node
	 *
	 *var myContainer = JSD.Create({
	 *	cmpType: 'container',
	 *	shape: 'myCustomeShape',
	 *	title: 'My Container',
	 *	x: 100,
	 *	y: 100,
	 *	width: 500,
	 *	height: 100
	 *});
	 *
	 * alert(myContainer.isCmpType("container"); 			//returns true;
	 * alert(myContainer.isCmpType("node"); 				//returns true;
	 * alert(myContainer.isCmpType("node", true)); 		//returns false;
	 *_</code></pre>
	 * @return {Boolean}
	 */

	isCmpType : function(type, topLevelOnly) {
		if (topLevelOnly) {
			return type === this.cmpType
		} else {
			return ((this.cmpTypeList.indexOf(type) > -1) ? true : false)
		}
	},

	/**
	 * @method destroy
	 */

	destroy : function(ignoreConnections) {

		this.diagram.destroyCmp(this, !ignoreConnections);
	},

	/**
	 * @method cloneConfig
	 * Creates a new component based on the configuration of this component
	 * @param {Object} overrides
	 * @param {Boolean} initialConfig (optional) If <code>true</code>, the new component will be created based on the config options applied to the cloned component when it was created.  If <code>false</code> (the default), the new component will be created based on the "current" config options of the cloned component.
	 * @return {cmp} The newly created component
	 */

	cloneConfig : function(overrides, initialConfig) {
		if (initialConfig) {
			var newConfig = JSD.clone(this.initialConfig);
		} else {
			var newConfig = JSD.clone(this.getCurrentConfig());
		}
		delete newConfig.id;
		//newConfig.id = JSD.idPrefix +"-node-" + JSD.getNextIdNum();
		if (overrides) {
			JSD.apply(newConfig, overrides);
		}
		var newItem = this.diagram.add(newConfig);
		if (newItem) {
			return newItem;
		}
		return null;
	},

	/** @method */
	getAttr : function(attr) {
		var methodName = "get" + attr.charAt(0).toUpperCase() + attr.substr(1);
		return this[methodName]();
	},

	_getAttr : function(attr) {
		var a = this.currentConfig[attr];
		return ( typeof a === "undefined") ? "Default" : a;
	},

	/** @method */
	getFill : function() {
		return this._getAttr('fill');
	},

	/** @method */
	getFillOpacity : function() {
		if (this.type === "image") {
			return this._getAttr('opacity') || this._getAttr('fillOpacity');
		} else {
			return this._getAttr('fillOpacity');
		}
	},

	/** @method */
	getStroke : function() {
		return this._getAttr('stroke');
	},

	/** @method */
	getStrokeOpacity : function() {
		return this._getAttr('strokeOpacity');
	},

	/** @method */
	getOpacity : function() {
		if (this.type === "image") {
			return this._getAttr('opacity') || this._getAttr('fillOpacity');
		} else {
			return this._getAttr('fillOpacity');
		}
	},

	/** @method */
	getStrokeWidth : function() {
		return this._getAttr('strokeWidth');
	},

	/** @method */
	getStrokeDasharray : function() {
		return this._getAttr('strokeDasharray');
	},

	/** @method
	 * @private
	 */
	getShadow : function() {
		return this._getAttr('shadow');
	},

	/** @method
	 * @private
	 */
	getShadowOffset : function() {
		return this._getAttr('shadowOffset');
	},

	/** @method
	 * @private
	 */
	getShadowFill : function() {
		return this._getAttr('shadowOffset');
	},

	/** @method
	 * @private
	 */
	getShadowFillOpacity : function() {
		return this._getAttr('shadowOffset');
	},

	/** @method */
	getDefault : function(attr) {
		if (this.diagram) {
			var dCmp = (this.diagram[this.cmpType + 'Defaults']) ? this.diagram[this.cmpType + 'Defaults'][attr] : null;
		}
		var dShape = (this.shape) ? this.shape.shapeConfig[attr] : null;
		var dClass = JSD.getClass(this.className).prototype[attr];
		var d = dCmp || dShape || dClass;

		return d
	},

	_updatecurrentconfig : function(attr, val) {
		if ( typeof val === "undefined") {
			// just reapply the current setting;
			val = this[attr];
		} else {
			//alert('string='+val);
			//if ( typeof val === "string" && (val.toLowerCase() === "default" || val.toLowerCase() === "none")) {
			if ( typeof val === "string" && (val.toLowerCase() === "default")) {
				val = this.getDefault(attr);
				delete this.currentConfig[attr]
			} else {
				if (val.isCmpType) {
					val = this.id
				}
				this.currentConfig[attr] = val;
			}
		}
		return val
	},

	/** @method
	 * @private
	 */
	_getRandomPath : function(path) {
		var char1 = path.substring(0, 1);

		var Msections = path.substring(1).split("M");

		if (Msections.length > 1) {
			Msections[0] = this._getRandomPath(char1 + Msections[0]);
			for (var i = 1; i < Msections.length; i++) {
				Msections[i] = this._getRandomPath("M" + Msections[i])
			}
			return Msections.join(" ");
		}

		var sections = path.substring(1).split("m");
		if (sections.length > 1) {
			sections[0] = this._getRandomPath(char1 + sections[0]);
			for (var i = 1; i < sections.length; i++) {
				sections[i] = this._getRandomPath("m" + sections[i])
			}
			return sections.join(" ");
		}

		//for a given path string, this method will return a 'freestyle' random version of the path string
		var tmpLine = this.diagram.sheet.path(path).hide();
		var pt = tmpLine.getPointAtLength(1);
		var x = pt.x;
		var y = pt.y;
		var newPath = char1 + x + "," + y;

		var lastx = x;
		var lasty = y;
		var range = 2;

		for (var i = 1; i < Math.round(tmpLine.getTotalLength() / 10) + 2; i++) {
			pt = tmpLine.getPointAtLength(i * 10);

			//newPath += "c" + x + "," + y + " " + x + "," + y + " " + x + "," + y;
			//newPath += "l" + x + "," + y;
			x1 = Math.round((Math.random() * range) - range / 2);
			y1 = Math.round((Math.random() * range) - range / 2);
			x2 = Math.round((Math.random() * range) - range / 2);
			y2 = Math.round((Math.random() * range) - range / 2);
			x = Math.round((Math.random() * range) - range / 2) + (pt.x - lastx);
			y = Math.round((Math.random() * range) - range / 2) + (pt.y - lasty);
			lastx = pt.x;
			lasty = pt.y;
			newPath += "c" + x1 + "," + y1 + " " + x2 + "," + y2 + " " + x + "," + y;
		}

		tmpLine.remove();
		return newPath
	},

	/** @method */
	setAttr : function(attr, val) {
		//console.log(attr.charAt(0).toUpperCase());
		var methodName = "set" + attr.charAt(0).toUpperCase() + attr.substr(1);
		if (this[methodName]) {
			return this[methodName](val);
		}
		return null;
	},

	set : this.setAttr,

	/** @method */
	setFill : function(val) {
		val = this._updatecurrentconfig('fill', val);
		//this.fill = val;
		this.graphic.attr('fill', ( typeof val === "string" && val.toLowerCase() == "none") ? "none" : val);
		if (this.type === "path" && Raphael.type == "SVG") {
			this._fixPathGradient();
		}
		this.fill = val;
		return this;
	},

	/** @method */
	setFillOpacity : function(val) {
		if (this.type === "image") {
			val = this._updatecurrentconfig('opacity', val);
			this.graphic.attr('opacity', ( typeof val === "string" && val.toLowerCase() == "none") ? "" : val);
			this.opacity = val;
		} else {
			val = this._updatecurrentconfig('fillOpacity', val);
			this.graphic.attr('fill-opacity', ( typeof val === "string" && val.toLowerCase() == "none") ? "" : val);
			if (this.fo) {
				this.fo.style.opacity = val
			}
			this.fillOpacity = val;
			return this;
		}
	},

	/** @method */
	setStroke : function(val) {
		val = this._updatecurrentconfig('stroke', val);
		this.graphic.attr('stroke', ( typeof val === "string" && val.toLowerCase() == "none") ? "" : val);
		this.stroke = val;
		return this;
	},

	/** @method */
	setStrokeOpacity : function(val) {
		val = this._updatecurrentconfig('strokeOpacity', val);
		this.graphic.attr('stroke-opacity', ( typeof val === "string" && val.toLowerCase() == "none") ? "" : val);
		this.strokeOpacity = val;
		return this;
	},

	/** @method */
	setOpacity : function(val) {
		if (this.type === "image") {
			val = this._updatecurrentconfig('opacity', val);
			this.graphic.attr('opacity', ( typeof val === "string" && val.toLowerCase() == "none") ? "" : val);
			this.opacity = val;
		} else {
			val = this._updatecurrentconfig('fillOpacity', val);
			val = this._updatecurrentconfig('strokeOpacity', val);
			this.graphic.attr('fill-opacity', ( typeof val === "string" && val.toLowerCase() == "none") ? "" : val);
			this.graphic.attr('stroke-opacity', ( typeof val === "string" && val.toLowerCase() == "none") ? "" : val);
			if (this.fo) {
				this.fo.style.opacity = val
			}
			this.fillOpacity = val
			this.strokeOpacity = val
		}
		return this;
	},

	/** @method */
	setStrokeDasharray : function(val) {
		val = this._updatecurrentconfig('strokeDasharray', val);
		var def = (Raphael.type === 'VML') ? " " : "";
		this.graphic.attr('stroke-dasharray', ( typeof val === "string" && val.toLowerCase() == "none") ? def : val);
		//this.graphic.animate({'stroke-dasharray': (typeof val === "string" && val.toLowerCase() == "none") ? def : val}, 2000, "<>");
		this.strokeDasharray = val;
		return this;
	},

	/** @method */
	setStrokeWidth : function(val) {
		val = this._updatecurrentconfig('strokeWidth', val);
		this.graphic.attr('stroke-width', ( typeof val === "string" && val.toLowerCase() == "none") ? "" : val);
		this.strokeWidth = val;
		return this;
	},

	/** @cfg */
	labelConfig : {
		"font-size" : 12,
		"font-family" : "tahoma,arial,verdana,sans-serif",
		"font-weight" : "normal",
		"fill" : "#000000"
	},

	/** @cfg */
	fill : "#ffffff",

	/** @cfg */
	fillOpacity : 1,

	/** @cfg */
	stroke : "#000000",

	/** @cfg */
	opacity : 1,

	/** @cfg */
	strokeWidth : 2,

	/** @cfg */
	strokeOpacity : 1,

	/** @cfg */
	strokeDasharray : "None",

	/**
	 * @method setFreestyle
	 * @param {Boolean} val
	 *
	 * @method getFreestyle
	 * @return {Boolean} val
	 *
	 * @cfg {Boolean} freestyle
	 */

	freestyle : false,

	setFreestyle : function(val) {
		val = this._updatecurrentconfig('freestyle', val);
		this.freestyle = val;
		this.render();
		return this
	},

	getFreestyle : function() {
		return this.freestyle
	}
	//stroke: "#000",

	/**
	 * @cfg {Boolean} shadow Specify <tt>true</tt> to render this node with a shadow
	 * @private
	 * The size (or direction) and colour of the shadow can also be amended by using
	 * shadowOffset and shadowFill.
	 * Defaults to <tt>true</tt>.
	 */

	/**
	 * @method
	 * @private

	 setShadow : function(shadow, _hidden) {
	 return // disabled;
	 shadow = this._updatecurrentconfig('shadow', shadow);
	 shadow = ( typeof shadow === "string" && shadow.toLowerCase() === "none") ? false : shadow;
	 if (!shadow) {
	 this.shadowEl.remove();
	 delete this.shadowEl;
	 return
	 }

	 var shadowConfig = {
	 fill : this.shadowFill,
	 "fill-opacity" : this.shadowFillOpacity,
	 stroke : this.shadowFill,
	 "stroke-opacity" : this.shadowFillOpacity
	 }
	 var d = this.diagram;

	 if (!this.shadowEl) {
	 //console.log('!this.shadowEl');
	 this.type = this.graphicType || this.type;
	 switch (this.type) {

	 case "ellipse":
	 var rx = this.rx || this.width;
	 var ry = this.ry || this.height;
	 var cx = this.cx || this.x + rx;
	 var cy = this.cy || this.y + ry;
	 this.shadowEl = d.sheet.ellipse(cx + this.shadowOffset[0], cy + this.shadowOffset[1], rx, ry).hide();
	 break;

	 case "rect":
	 var rnd = this.rounded ? this.rounded : 0;
	 this.shadowEl = d.sheet.rect(this.x + this.shadowOffset[0], this.y + this.shadowOffset[1], this.width, this.height, rnd).hide();
	 break;

	 case "path":
	 this.shadowEl = d.sheet.path(this.path).hide();
	 this.shadowEl.translate(this.x + this.shadowOffset[0], this.y + this.shadowOffset[1])
	 break;

	 default:
	 // code
	 }
	 }
	 this.shadowEl.attr(shadowConfig);
	 this.shadowEl.insertBefore(this.background);
	 if (!_hidden) {
	 this.shadowEl.show()
	 }
	 return this;
	 },

	 setShadowOffset : function(offset) {
	 offset = this._updatecurrentconfig('shadowOffset', offset);
	 offset = ( typeof offset === "string" && offset.toLowerCase() === "none") ? [0, 0] : offset;
	 var oldX = this.shadowOffset[0];
	 var oldY = this.shadowOffset[1];

	 this.shadowOffset[0] = offset[0];
	 this.shadowOffset[1] = offset[1];

	 if (!this.currentConfig.shadowOffset) {
	 //we are setting to default so do not create shadowEl if it doesn't exist already
	 if (!this.shadowEl) {
	 return
	 }
	 }
	 if (!this.shadowEl) {
	 this._setShadow(true, true);
	 this.currentConfig.shadow = true;
	 }
	 var shadowConfig = {
	 fill : this.shadowFill,
	 "fill-opacity" : this.shadowFillOpacity,
	 stroke : this.shadowFill,
	 "stroke-opacity" : this.shadowFillOpacity
	 }

	 this.type = this.graphicType || this.type;
	 switch (this.type) {

	 case "ellipse":
	 var rx = this.rx || this.width;
	 var ry = this.ry || this.height;
	 var cx = this.cx || this.x + rx;
	 var cy = this.cy || this.y + ry;

	 shadowConfig.cx = cx + this.shadowOffset[0];
	 shadowConfig.cy = cy + this.shadowOffset[1];
	 shadowConfig.rx = rx;
	 shadowConfig.ry = ry;
	 this.shadowEl.attr(shadowConfig).show();
	 //background
	 break;

	 case "rect":
	 shadowConfig.x = this.x + this.shadowOffset[0];
	 shadowConfig.y = this.y + this.shadowOffset[1];
	 this.shadowEl.attr(shadowConfig).show();

	 case "path":
	 this.shadowEl.translate(this.shadowOffset[0] - oldX, this.shadowOffset[1] - oldY);
	 break;

	 default:
	 // code
	 };
	 return this;
	 },

	 setShadowFill : function(fill) {
	 fill = this._updatecurrentconfig('shadowFill', fill);
	 fill = ( typeof fill === "string" && fill.toLowerCase() === "none") ? "" : fill;
	 if (!this.currentConfig.shadowFill) {
	 //we are setting to default so do not create shadowEl if it doesn't exist already
	 if (!this.shadowEl) {
	 return
	 }
	 }

	 if (!this.shadowEl) {
	 this.setShadow(true, true);
	 }

	 var shadowConfig = {
	 fill : fill,
	 stroke : fill
	 }
	 this.shadowEl.attr(shadowConfig).show();
	 return this;
	 },

	 /
	 setShadowFillOpacity : function(fillOp) {
	 fillOp = this._updatecurrentconfig('shadowFillOpacity', fill);
	 fillOp = ( typeof fillOp === "string" && fillOp.toLowerCase() === "none") ? "" : fillOp;
	 if (!this.currentConfig.shadowFillOpacity) {
	 //we are setting to default so do not create shadowEl if it doesn't exist already
	 if (!this.shadowEl) {
	 return
	 }
	 }

	 if (!this.shadowEl) {
	 this.setShadow(true, true);
	 this.currentConfig.shadow = true;
	 }

	 var shadowConfig = {
	 "fill-opacity" : fillOp,
	 "stroke-opacity" : fillOp
	 }
	 this.shadowEl.attr(shadowConfig).show();
	 return this;
	 }
	 */

});

//===============================         DIAGRAM API        =================================
/**
 * @class JSD.diagram.Diagram
 * @extends JSD.diagram.Component
 */

JSD.define({
	className : 'JSD.diagram.Diagram',
	cmpType : 'diagram',
	extend : "JSD.diagram.Component",

	constructor : function(config) {

		this.initialConfig = config;
		this.currentConfig = JSD.clone(this.initialConfig);

		//need to capture the items array before it gets overwritten by cfg.items
		//this is used later in 'renderItems'
		this.oldItems = this.items;

		JSD.diagram.Diagram.superclass.constructor.call(this, config);

		/**
		 * @cfg {string} applyTo The id of an already existing <tt>dom</tt> element (usually a <tt>div</tt>)
		 *_into which the diagram will be rendered.  If <tt>applyTo</tt> is not specified, a
		 *_<tt>dom</tt> element will automatically be created but you must then specify <tt>pageX, pageY, width, height</tt>
		 *_in order to specify where the diagram should reside on the web page. The id of an automatically created <tt>dom</tt>
		 *_element will be in the format 'JSDDiagram'+diagram.id and the element will have <tt>position: absolute</tt>
		 */

		/**
		 * @property {HTMLelement} dom The i<tt>dom</tt> element (usually a <tt>div</tt> or <tt>span</tt>)
		 *_ which contains the diagram.  See the config item {@link #applyTo} for further explanation.
		 */

		if (this.applyTo) {
			if ( typeof this.applyTo === 'string') {
				this.dom = document.getElementById(this.applyTo);
				//alert('this.dom.style.width = '+this.dom.style.width);
				//alert('this.dom.style.height = '+this.dom.style.height);
			} else {
				this.dom = this.applyTo;
			}
			this.width = config.width || parseInt(this.dom.style.width);
			this.height = config.height || parseInt(this.dom.style.height);
		} else {
			this.dom = document.createElement("div");
			this.dom.setAttribute('id', 'JSDDiagram' + this.id);
			this.dom.style.top = this.pageX + 'px';
			this.dom.style.left = this.pageY + 'px';
			this.dom.style.height = this.height + 'px';
			this.dom.style.width = this.width + 'px';
			this.dom.style.position = 'absolute';
			document.body.appendChild(this.dom);
		}

		var thisDiagram = this;
		var theDom = this.dom;
		var bdy = document.body;

		document.onkeydown = function(e) {
			e = e || window.event;
			var t = e.target || e.srcElement;
			if (thisDiagram.editMode && t.type !== "textarea") {
				var k;
				if (e.charCode) {
					k = e.charCode;
				} else {
					k = e.keyCode;
				}
				var dx = 0;
				var dy = 0;
				switch (k) {

					case (46):
						//DELETE
						thisDiagram.destroySelectedItems();
						return;
						break;

					case (37):
						//left
						dx = -1;
						break;
					case (38):
						//up
						dy = -1;
						break;
					case (39):
						//right
						dx = 1;
						break;
					case (40):
						//down
						dy = 1;
						break;

					default:
					//ignore
				}
				if (dx !== 0 || dy !== 0) {
					var cmps = thisDiagram.getSelections();
					for (var i = 0; i < cmps.length; i++) {
						var o = cmps[i];
						o.setPosition([o.getX() + dx, o.getY() + dy]);
						o.focus(true);
					}
				}

				//now delete any selected items
			}
		};

		/**
		 * @cfg {Number} width The width in pixels of this diagram. If this config option is not included, then <code>width</code> will default to the
		 * _width value of the DOM element in which the diagram is contained.  See also {@link #minWidth} and {@link #dom}.
		 */

		/**
		 * @cfg {Number} height The height in pixels of this diagram. If this config option is not included, then <code>height</code> will default to the
		 * height value of the DOM element in which the diagram is contained.  See also {@link #minHeight} and {@link #dom}.
		 */

		/**
		 * @cfg {Number} minWidth The minimum width in pixels of this diagram. If this config option is not included, then <code>minWidth</code> will default to the
		 *_ {@link #width} config value or the <code>width</code> value of the DOM element in which the diagram is contained.  See also {@link #width} and {@link #dom}.
		 */

		/**
		 * @cfg {Number} minHeight The minimum height in pixels of this diagram. If this config option is not included, then <code>minHeight</code> will default to the
		 *_ {@link #height} config value or the <code>height</code> value of the DOM element in which the diagram is contained.  See also {@link #height} and {@link #dom}.
		 */

		this.width = this.width || parseFloat(this.dom.style.width);
		this.height = this.height || parseFloat(this.dom.style.height);

		this.minWidth = this.minWidth || this.width;
		this.minHeight = this.minHeight || this.height;

		if (Raphael.type === 'VML') {
			this.sheet = Raphael(this.dom.id, this.width - 4, this.height - 4);
		} else {
			this.dom.internalContainer = document.createElement("div");
			this.dom.internalContainer.setAttribute('id', 'JSDDiagramInternal' + this.id);
			this.dom.internalContainer.style.height = this.height + 'px';
			this.dom.internalContainer.style.width = this.width + 'px';
			this.dom.internalContainer.style.overflow = 'hidden';
			this.dom.appendChild(this.dom.internalContainer);
			this.sheet = Raphael(this.dom.internalContainer.id, JSD.svgCanvasSize.width, JSD.svgCanvasSize.height);
		}

		/**
		 * @property {Object} sheet The <tt>Raphael.Paper</tt> object on which all the raw graphic elements are created.  All components (eg. Nodes ore Edges) are made
		 * _up of multiple <tt>Raphael.Element</tt> graphic elements. For example, a {@link JSD.diagram.Node} may have a label, background, shadow, header, etc. All of these
		 * _elements are created as Raphael.Element objects on the Raphael.Paper object. The <tt>sheet</tt> property provides a reference to the underlying Raphael.Paper object.
		 * _See also the {@link JSD.diagram.Node#graphic node.graphic} and {@link JSD.diagram.Edge#graphic edge.graphic} and <a href="http://www.raphaeljs.com" target="_blank">RaphaelJS</a>.
		 */

		this.dom.parentObj = this;

		this.setZoom(this.zoom);

		// create length custom attr
		this.sheet.customAttributes.length = function(lenFraction) {
			//lenFraction = lenFraction || 1;
			path = this.fullPath;
			totalLen = Raphael.getTotalLength(path);
			len = lenFraction * totalLen;
			var newPath = Raphael.getSubpath(path, 1, len);

			return {
				path : newPath
			};
		};

		/**
		 * @cfg {Boolean} background
		 * If true, a background element will be created.  Defaults to <tt>null</tt>. A reference to the background is available via the {@link #graphic} property.
		 */
		if (this.background) {
			var w = this.width - (this.backgroundPadding * 2) - 1;
			var h = this.height - (this.backgroundPadding * 2) - 1;
			if (Raphael.type === 'VML') {
				//w=w-3;
				//h=h-3;
			}
			var backgroundConfig = {
				width : w,
				height : h,
				x : this.backgroundPadding,
				y : this.backgroundPadding,
				fill : this.fill,
				stroke : this.stroke,
				"stroke-width" : this.strokeWidth,
				"fill-opacity" : this.fillOpacity,
				"stroke-opacity" : this.strokeOpacity,
				"stroke-dasharray" : this.strokeDasharray,
				r : this.rounded
			}

			if (this.src) {
				this.graphic = this.sheet.image().attr(backgroundConfig);
			} else {
				this.graphic = this.sheet.rect().attr(backgroundConfig);
			}

			var diagram = this;
			this.graphic.parentObj = this;
			this.graphic.click(function() {
				diagram.focus();
			});
		}

		this.dom.onclick = function(e) {
			if (JSD.actionInProgress === 'preDragSelect') {
				JSD.actionInProgress = '';
			}

			e = e || window.event;

			var t = e.target || e.srcElement;
			if (!t.parentNode) {
				return
			}
			if (!t.parentNode.parentNode) {
				return
			}
			if (t.parentNode.parentNode === theDom) {
				thisDiagram.focus();
			}
			//console.log('test');
			//if (t === theDom) {
			//	thisDiagram.focus();
			//}
		};

		var dragSelectStart = function(evt) {
			evt = evt || window.event;
			// "this" refers to the object (diagram.background or container) that calls the method,

			//thisDiagram.focus();

			if (evt.preventDefault) {
				evt.preventDefault()
			} else {
				evt.returnValue = false
			}
			if (evt.stopPropagation) {
				evt.stopPropagation()
			} else {
				evt.cancelBubble = true
			}
			var relmousePos = JSD.getMouseOffset(thisDiagram.dom, evt);

			JSD.actionInProgress = 'preDragSelect';
			var obj = thisDiagram.dragSelectObject;

			//JSD.dragSelectRect = this.parentObj.sheet.rect(relmousePos.x, relmousePos.y, 0, 0).attr(JSD.dragSelectObject);
			//JSD.dragSelectObject.diagram = this.parentObj;
			obj.startPos = JSD.getMouseOffset(thisDiagram.dom, evt);
			//JSD.dragSelectObject.startPos = {
			//	x: relmousePos.x,
			//	y: relmousePos.y
			//};
			//JSD.dragSelectRect.mouseup(JSD.dragSelectStop);
			//}
		};

		var dragSelectMove = function(evt) {
			evt = evt || window.event;
			var obj = thisDiagram.dragSelectObject;
			if (JSD.actionInProgress === "preDragSelect") {
				var npos = JSD.getMouseOffset(thisDiagram.dom, evt);
				var opos = obj.startPos;
				if (npos.x !== opos.x || npos.y !== opos.y) {
					JSD.actionInProgress = "dragSelect";
					obj.attr({
						x : obj.startPos.x,
						y : obj.startPos.y
					}).toFront().show();
				}
				thisDiagram.selectedItem = null;
				if (thisDiagram.selectedItems.length > 0) {
					for (var i = 0; i < thisDiagram.selectedItems.length; i++) {
						//d.selectedItems[i]._multiSelectHide();
						thisDiagram.selectedItems[i].blur()
					}
					thisDiagram.selectedItems = [];
				}
			}
			if (JSD.actionInProgress === "dragSelect") {
				//evt = evt || window.event;
				//evt.preventDefault();
				//evt.stopPropagation();
				var relmousePos = JSD.getMouseOffset(thisDiagram.dom, evt);
				var x = obj.attr("x");
				var y = obj.attr("y");
				var w = relmousePos.x - obj.startPos.x;
				var h = relmousePos.y - obj.startPos.y;
				if (w < 0) {
					x = relmousePos.x;
					w = -w
				}
				if (h < 0) {
					y = relmousePos.y;
					h = -h
				}
				obj.attr({
					//x : x,
					//y : y,
					width : w,
					height : h
				})
			}
		};

		var dragSelectStop = function(evt) {

			var obj = thisDiagram.dragSelectObject;
			evt = evt || window.event;
			if (JSD.actionInProgress === "dragSelect") {
				JSD.actionInProgress = '';
				//console.log('hi');
				var x = obj.attr("x");
				var y = obj.attr("y");
				var w = obj.attr("width");
				var h = obj.attr("height");

				var arr = thisDiagram.getNodesInRange(x, y, w, h);
				for (var i = 0; i < arr.length; i++) {
					arr[i].focus(true);
				}

				if (obj) {
					obj.hide();
				}
				//delete JSD.dragSelectObject.rect;
				//console.log("how many? - " + arr.length);
			}
			JSD.actionInProgress = '';
		};

		this.dragSelectObject = this.sheet.rect(0, 0, 0, 0).attr(JSD.dragSelectObjectAttr).hide();
		this.dragSelectObject.mouseup(function() {
			dragSelectStop();
		});

		this.dom.onmousedown = function(evt) {

			if (JSD.actionInProgress === '' && (!JSD.activeTool || JSD.activeTool === '' || JSD.activeTool === 'select')) {
				JSD.actionInProgress = 'preDragSelect';
				dragSelectStart(evt);
			}
		}
		/*this.dom.onclick = function(evt) {
		 if (JSD.actionInProgress === 'preDragSelect') {
		 JSD.actionInProgress = '';
		 }
		 }
		 */

		this.dom.onmousemove = function(evt) {
			switch (true) {

				case (JSD.actionInProgress === "preDragSelect" || JSD.actionInProgress === "dragSelect"):
					dragSelectMove(evt);
					break;

				case (JSD.actionInProgress === "createNewEdge"):
					var mousePos = JSD.getMouseOffset(thisDiagram.dom, evt)
					var x = mousePos.x;
					var y = mousePos.y;
					thisDiagram.newLinks.showSingle(x, y);

					//console.log('newLine');

					break;

				case (JSD.actionInProgress === "createNewText"):
					var mousePos = JSD.getMouseOffset(thisDiagram.dom, evt)
					var x = mousePos.x;
					var y = mousePos.y;
					thisDiagram.newText.show(x, y);

					//console.log('newtext?');

					break;

				default:
				//
			}
			return false
		}

		this.dom.onmouseout = function(evt) {
			//thisDiagram.newText.graphic.hide();
			if (this.timer) {
				clearTimeout(this.timer);
			}
			this.timer = setTimeout("JSD.getDiagram('" + thisDiagram.getId() + "').newText.graphic.hide()", 2000);

		}

		this.dom.ontouchend = this.dom.onmouseup = function(evt) {

			if (JSD.actionInProgress === 'button' || JSD.actionInProgress === 'htmlDrag') {
				//console.log('drop doc');
				evt = evt || window.event;
				JSD.mouseUp(evt);
			}
			if (JSD.actionInProgress === 'dragSelect' || JSD.actionInProgress === 'preDragSelect') {
				dragSelectStop();
				return false
			}
		}

		this.items = [];
		this.nodeCollection = [];
		this.edgeCollection = [];
		//this.groupCollection = [];
		this.stencilCollection = [];
		this._animateRenderNodeCount = 0;
		this._animateRenderNodeTotal = 0;
		this._animateRenderEdgeQueue = [];
		//this.itemCollection = [];

		JSD.diagramCollection.push(this);
		JSD.renderTo = this;

		if (this.autoResize) {
			this.addListener({
				itemMove : function(obj, x, y) {
					this.setSizeFit();
				},
				itemResize : function(obj, w, h) {
					this.setSizeFit();
				}
			});
		}

		if (this.editMode) {
			if (this.editorConfig) {
				this.enableEdit(this.editorConfig);
			} else {
				this.enableEdit();
			}
			/** @event */
			this.fireEvent("editEnabled", "EDIT event test - successful");
		} else {
			this.editMode = false
		};

		if (this.stencil || this.stencils) {
			if (config.items) {
				this.delayedRenderItems = config.items;
			}
		} else {
			if (config.items) {
				this.renderItems(config.items);
			}
		}

		if (this.stencil) {
			this.addStencil(this.stencil);
		}

		if (this.stencils) {
			if (this.stencils.length > 0) {
				this.stencilsToLoad = this.stencils.length;
				for (var i = 0; i < this.stencils.length; i++) {
					this.addStencil(this.stencils[i]);
				}
			}
		};

		if (config.toolbar) {
			this.toolbar = new JSD.toolbar.Toolbar(config.toolbar);
			this.toolbar.diagram = this;
		}

		this.createTooltip();

		JSD.getDragProxy();

		this.newText = {};
		this.newText.graphic = this.sheet.rect(0, 0, 100, 20).attr({
			stroke : "#aaa",
			"stroke-dasharray" : "- ",
			fill : "#ffffff",
			"fill-opacity" : 0.1
		}).hide();

		this.newText.show = function(x, y) {
			this.graphic.attr({
				x : x - 10,
				y : y - 10
			}).toFront().show()
		}

		this.newText.graphic.click(function(e) {
			var newTextCfg = {
				cmpType : "node",
				label : "newText",
				stroke : "none",
				fill : "none",
				strokeOpacity : 0,
				fillOpacity : 0,
				x : this.attr("x"),
				y : this.attr("y"),
				width : 100,
				height : 20
			}
			thisDiagram.fireEvent("uidragbeforecreate", newTextCfg);

			var newTextNode = thisDiagram.add(newTextCfg);
			thisDiagram.editLabelEl(newTextNode)
			JSD.setTool();
			thisDiagram.fireEvent("uidragcreate", newTextNode);
			this.hide();
		});

		this.rendered = true;
		this.fireEvent("render", this);

		/*if (config.items) {
		alert('about to render items - '+this.addStencilInProgress);
		if (this.addStencilInProgress) {
		this.delayedRenderItems = config.items;
		}
		else {
		this.renderItems(config.items);
		}
		}
		*/

		//this.renderItems(config.items);

		//diagram.newLinks.init();
		//return this;
	},
	//background: true,

	/** @cfg */
	backgroundPadding : 0,
	/*backgroundConfig: {
	fill: '#ffffff',
	stroke: '#ffffff',
	fill-opacity': 0,
	stroke-opacity': '#ffffff'
	},
	*/

	/** @cfg */
	rounded : 0,

	/** @cfg */
	itemsRendered : false,

	/** @method */
	setEdgeDefaults : function(defaultsOdj) {
		JSD.apply(this.edgeDefaults, defaultsOdj);
		JSD.apply(this.currentConfig.edgeDefaults, defaultsOdj)
	},

	/** @method */
	setNodeDefaults : function(defaultsOdj) {
		JSD.apply(this.nodeDefaults, defaultsOdj);
		JSD.apply(this.currentConfig.nodeDefaults, defaultsOdj)
	},

	/** @method */
	destroyCmp : function(cmp, ignoreConnections) {

		this.newLinks.all.hide();
		//if has connections, destroy them or reconnect to a point instead of a node
		if (cmp.connectionsFrom) {
			var cons = cmp.connectionsFrom;
			if (cons.length > 0) {
				for (var i = 0; i < cons.length; i++) {
					var con = cons[i];
					if (ignoreConnections) {
						var pt = con.pathArray[0];
						con.setConnection({
							fromNode : pt
						})
					} else {
						this.destroyCmp(con)
					}
					i = i - 1;
				}
			}
		}
		if (cmp.connectionsTo) {
			var cons = cmp.connectionsTo;
			if (cons.length > 0) {
				for (var i = 0; i < cons.length; i++) {
					var con = cons[i];
					if (ignoreConnections) {
						var pt = con.pathArray[con.pathArray.length - 1];
						con.setConnection({
							toNode : pt
						})
					} else {
						this.destroyCmp(con);
					}
					i = i - 1;
				}
			}
		}

		if (cmp.isCmpType("edge")) {
			//console.log('destroy edge - '+(cmp.label||'???'));
			if (cmp.fromNode.connectionsFrom) {
				cmp._deRegisterConnection('from', cmp.fromNode);
			}
			if (cmp.toNode.connectionsTo) {
				cmp._deRegisterConnection('to', cmp.toNode);
			}
		}

		//destroy any items within this cmp
		//cmp.blur();
		if (cmp.items) {
			if (cmp.items.length > 0) {
				for (var i = 0; i = cmp.items.length; i) {
					this.destroyCmp(cmp.items[0], ignoreConnections)
				}
			}
		}
		//destroy any dom elements
		(cmp.htmlEl) ? cmp.htmlEl.innerHTML = "" : "";
		(cmp.fo) ? cmp.fo.innerHTML = "" : "";
		(cmp.body) ? cmp.body.innerHTML = "" : "";
		for (var i = 0; i < cmp.all.length; i++) {
			var r = cmp.all[i];
			r.remove();
			delete r;
		}

		cmp.purgeListeners();
		if (cmp === this.selectedItem) {
			//this.selectedItem = this.diagram;
		}
		if (this.selectedItems.length > 0) {
			for (var i = 0; i < this.selectedItems.length; i++) {
				if (cmp === this.selectedItems[i]) {
					this.selectedItems.splice(i, 1)
				}
			}
		}
		var col;
		//remove from parent.items
		if (cmp.parent !== this) {
			col = cmp.parent.items;
			for (var i = 0; i < col.length; i++) {
				if (cmp === col[i]) {
					col.splice(i, 1)
				}
			}
		}
		//remove from diagram.items
		col = this.items;
		for (var i = 0; i < col.length; i++) {
			if (cmp === col[i]) {
				col.splice(i, 1)
			}
		}

		//remove from diagram.nodeCollection
		col = this.nodeCollection;
		for (var i = 0; i < col.length; i++) {
			if (cmp === col[i]) {
				col.splice(i, 1)
			}
		}

		//remove from diagram.edgeCollection
		col = this.edgeCollection;
		for (var i = 0; i < col.length; i++) {
			if (cmp === col[i]) {
				col.splice(i, 1)
			}
		}

		cmp._multiSelectHide();

	},

	/**
	 * @method
	 * Destroys all components in the diagram.
	 */

	destroyItems : function() {
		var myItems = this.items;
		while (myItems[0]) {
			this.destroyCmp(myItems[0]);
		}
		/*
		 for (var i = 0; i = this.items.length; i) {
		 this.destroyCmp(this.items[0], true);
		 }
		 */
		this.items = [];
		this.nodeCollection = [];
		this.edgeCollection = [];
	},

	/**
	 * @method
	 * Destroys all selected components.
	 */

	destroySelectedItems : function() {
		/** @event */
		this.fireEvent("beforedestroyselecteditems");

		var myItems = this.getSelections();
		while (myItems[0]) {
			this.destroyCmp(myItems[0]);
		}

		this.focus();
		/** @event */
		this.fireEvent("destroyselecteditems");
	},

	/**
	 * @method groupSelectedItems
	 * @return {Group}
	 * Groups all selected components.
	 */

	groupSelectedItems : function() {
		var myItems = this.getSelections();
		/** @event */
		this.fireEvent("beforegroupselecteditems", myItems);

		var newGroupCmp = this.createGroup(myItems);
		/** @event */
		this.fireEvent("groupselecteditems", newGroupCmp);
	},

	/**
	 * @method createGroup
	 * @param {Array} cmps An array of items to be added to the group
	 * @return {Group}
	 * Groups all selected components.
	 */
	createGroup : function(myItems) {
		if (myItems.length > 1) {
			var x = 100000;
			var y = 100000;
			var r = 0;
			var b = 0;
			for (var i = 0; i < myItems.length; i++) {
				var o = myItems[i];
				x = Math.min(x, o.getX());
				y = Math.min(y, o.getY());
				r = Math.max(r, o.getRight());
				b = Math.max(b, o.getBottom());
			}
			var w = r - x;
			var h = b - y;

			var grpCfg = {
				cmpType : "group",
				height : h,
				width : w,
				x : x,
				y : y
			}
			//console.log('myItems[0].parent.id',myItems[0].parent.id);
			var g = myItems[0].parent.add(grpCfg);

			for (var i = 0; i < myItems.length; i++) {
				g.add(myItems[i]);
			}
			g.focus();
			return g
		} else {
			return null
		}

	},

	/** @method	*/

	addStencil : function(stencilConfig) {
		var d = this;
		if (stencilConfig) {
			if ( typeof stencilConfig === 'string') {
				d.addStencilInProgress = true;
				JSD.Ajax.request({
					url : stencilConfig,
					success : function(r, o) {
						var obj = JSD.JSON.decode(r.responseText);
						if ( typeof obj === 'object') {
							d.addStencil(obj);
						}
					}
				})
			} else {
				//@@@@@@
				var success = this.fireEvent("beforeaddstencil", this, stencilConfig);
				//diagram's beforeAddStencil event - handlers are passed 2 params - 1. diagram, 2. stencilConfig object which is about to be rendered
				if ( typeof success === "boolean" && !success) {
					return false;
				}
				//stencilConfig.diagram = this.getId();
				var s = new JSD.stencil.Stencil(stencilConfig);
				this.stencilsToLoad = this.stencilsToLoad - 1;
				this.stencilCollection.push(s);
				if (this.delayedRenderItems && this.stencilsToLoad < 1) {
					this.addStencilInProgress = false;
					this.renderItems(this.delayedRenderItems);
					delete this.delayedRenderItems;
					JSD.renderTo = null;
				}
				return s;
			}
		}
	},

	/** @method	*/
	getStencilById : function(id) {
		for (var i = 0; i < this.stencilCollection.length; i++) {
			if (this.stencilCollection[i].id === id) {
				return this.stencilCollection[i];
			}
		}
		return null;
	},

	/** @method	*/
	getStencil : function(name) {
		for (var i = 0; i < this.stencilCollection.length; i++) {
			if (this.stencilCollection[i].name === name) {
				return this.stencilCollection[i];
			}
		}
		return null;
	},

	/** @method	*/
	getShapeById : function(id) {
		var s;
		for (var i = 0; i < this.stencilCollection.length; i++) {
			s = this.stencilCollection[i].getShapeById(id);
			if (s) {
				return s
			}
		}
		return null;
	},

	/** @method	*/
	getShape : function(name) {
		var s;
		for (var i = 0; i < this.stencilCollection.length; i++) {
			s = this.stencilCollection[i].getShape(name);
			if (s) {
				return s
			}
		}
		return null;
	},

	/** @cfg*/
	animateRender : true,
	/** @cfg*/
	animateRenderDuration : 1000,
	/** @cfg*/
	animateRenderEasing : "<>",

	/** @method	*/
	renderItems : function(items, noQueue) {
		var d = this;
		//this.items = [];

		if (items) {
			if ( typeof items === 'string') {
				JSD.Ajax.request({
					url : items,
					success : function(r, o) {
						//console.log('renderitems');
						var obj = JSD.JSON.decode(r.responseText);
						if ( typeof obj === 'object') {
							d.renderItems(obj)
						}
					}
				})
			} else {
				if (items.length > 0) {
					if (noQueue) {
						this._animationQueue = [];
						this._renderMultiItems = false;
					} else {
						this._animationQueue = [];
						this._renderMultiItems = true;
					}
					var edges = [];
					var oldEdges = [];

					//render all existing (old) nodes first
					//then render edges
					var oldItems = this.items;
					var newItems = items;
					this.items = [];

					//first assign a z-index to each new item
					//it will be removed in the render fn of the object
					for (var i = 0; i < newItems.length; i++) {
						newItems[i].z = i
					}

					var findNewCfg = function(id) {
						//console.log(id);
						for (var j = 0; j < newItems.length; j++) {
							if (newItems[j].id === id) {
								return newItems[j]
							}
						}
						return false
					}
					//process nodes first
					if (oldItems && oldItems.length > 0) {
						//search and replace or destroy old items if necessary
						for (var i = 0; i < oldItems.length; i++) {
							var oldObj = oldItems[i];

							if (oldObj.isCmpType("edge")) {
								//ignore edges for now
								oldEdges.push(oldObj);
							} else {
								var newCfg = findNewCfg(oldObj.id);
								if (newCfg) {
									//update oldObj with newCfg
									this.items.push(oldObj);
									this.add(oldObj);
									oldObj.render(newCfg, true);
									//============
									oldObj.parent.insert(oldObj.z, oldObj);
									delete oldObj.z;
									delete oldObj.initialConfig.z;
									delete oldObj.currentConfig.z;
									//============
									//now remove newCfg from the newItems array so that it does not get processed again
									var ind = JSD.arrayIndexOf(newItems, newCfg);
									if (ind !== -1) {
										newItems.splice(ind, 1);
									}
								} else {
									//no match found for oldObj so destroy it
									oldObj.destroy();
								}
							}
						}
					}

					//now, just create any NODE items left in newItems array
					if (newItems && newItems.length > 0) {
						//console.dir(cfg.items);
						for (var i = 0; i < newItems.length; i++) {
							if (newItems[i].toNode && newItems[i].fromNode) {
								//ignore edges for now
							} else {
								var newObj = this.add(newItems[i]);
								//============
								newObj.parent.insert(newObj.z, newObj);
								delete newObj.z;
								delete newObj.initialConfig.z;
								delete newObj.currentConfig.z;
								//============
							}
						}
					}

					//now render edges only after nodes have been rendered starting with existing (old) edges first
					if (oldEdges && oldEdges.length > 0) {
						//search and replace or destroy old items if necessary
						for (var i = 0; i < oldEdges.length; i++) {
							var oldObj = oldEdges[i];

							if (oldObj.isCmpType("edge")) {
								//only edges
								var newCfg = findNewCfg(oldObj.id);
								if (newCfg) {
									this.items.push(oldObj);
									oldObj.render(newCfg, true);
									//now remove newCfg from the newItems array so that it does not get processed again
									var ind = JSD.arrayIndexOf(newItems, newCfg);
									if (ind !== -1) {
										newItems.splice(ind, 1);
									}
								} else {
									//no match found for oldObj so destroy it
									oldObj.destroy();
								}
							}
						}
					}

					//finally, render any EDEG items left in newItems array
					if (newItems && newItems.length > 0) {
						for (var i = 0; i < newItems.length; i++) {
							if (newItems[i].toNode && newItems[i].fromNode) {
								this.add(newItems[i]);
							}
						}
					}

					/*

					 //render nodes first
					 for (var i = 0; i < items.length; i++) {
					 //render edges after everything else
					 if (items[i].fromNode && items[i].toNode) {
					 edges.push(items[i])
					 } else {
					 if (!this.rendered) {
					 //if diagram is being rendered for 1st time
					 this.add(items[i]);
					 } else {
					 if ( typeof items[i].id === 'string') {
					 //console.log('finding '+items[i].id);
					 var x = d.getNode(items[i].id);
					 if (x) {
					 //console.log('node - render - '+items[i].id);
					 this.add(x);
					 x.render(items[i], true);
					 } else {
					 this.add(items[i]);
					 //console.log('node - add - '+items[i].id);
					 }
					 }
					 }
					 }
					 }

					 //now render edges only after nodes have been rendered
					 for (var i = 0; i < edges.length; i++) {
					 var x = d.getEdge(edges[i].id);
					 if (x) {
					 x.render(edges[i]);
					 } else {
					 this.add(edges[i]);
					 }

					 }
					 */

					var q = this._animationQueue.sort(function(a, b) {
						return a.tabOrder > b.tabOrder
					});

					var rollingAnimate = function(qn) {
						setTimeout(function() {
							q[qn]._animateRender();
							qn++;
							if (qn < q.length) {
								rollingAnimate(qn);
							}
						}, 0)
					}
					if (this._animationQueue.length > 0) {
						rollingAnimate(0);
					}
					this._animationQueue = [];
					this._renderMultiItems = false;

				}
			}
			d.itemsRendered = true;
		}
		//console.dir(this.getCurrentConfig(true));
		//console.dir(this.getCurrentConfig(true));
	},

	_animateRenderEdges : function() {
		var edges = this._animateRenderEdgeQueue;
		var d = this;
		//continue only if all nodes have been rendered
		//console.log('total='+this._animateRenderNodeTotal+' - count='+this._animateRenderNodeCount);
		if (this._animateRenderNodeCount === this._animateRenderNodeTotal) {
			//alert('...');
			for (var i = 0; i < edges.length; i++) {
				var x = d.getEdge(edges[i].id);
				if (x) {
					//console.log('found '+items[i].id);
					x.render(edges[i]);
				} else {
					this.add(edges[i]);
				}

			}
			this._animateRenderEdgeQueue = [];
		}

	},

	save : function(config) {
		config = config || {};

		var d = this;

		config.params = config.params || {};
		config.params.diagramjson = config.params.diagramjson || d.getSource();
		config.url = config.url || d.url;
		config.method = config.method || "POST";
		config.success = config.success ||
		function(r, o) {
			//console.dir(r);
			alert(r.responseText);
		};
		return JSD.Ajax.request(config);
	},

	/** @cfg */
	zoom : 1,

	/** @method	*/
	getZoom : function() {
		return this.zoom;
	},

	/** @method	*/
	setZoom : function(z, exact) {
		z = this._updatecurrentconfig('zoom', z);
		if (!exact) {
			z = Math.round(z * 100) / 100
		}
		this.zoom = z;
		if (Raphael.type === "VML") {
			this.dom.childNodes[0].style.zoom = z;
			//this.dom.style.zoom = z;
		} else {
			//alert(this.dom.style.zoom);
			//if (this.dom.style.zoom !== undefined) {
			//alert('zoom!!!!!!!!');
			//this.dom.style.zoom = z;
			//}

			switch (true) {
				case (this.dom.style.WebkitTransform !== undefined):
					this.dom.style.WebkitTransform = "scale(" + z + ")";
					this.dom.style.WebkitTransformOrigin = "0 0";
					break;
				case (this.dom.style.MozTransform !== undefined):
					this.dom.style.MozTransform = "scale(" + z + ")";
					this.dom.style.MozTransformOrigin = "0 0";
					break;
				case (this.dom.style.OTransform !== undefined):
					this.dom.style.OTransform = "scale(" + z + ")";
					this.dom.style.OTransformOrigin = "0 0";
					break;
				default:
					this.dom.style.zoom = z;
			}

			/*var h = parseFloat(this.dom.internalContainer.style.height);
			 var w = parseFloat(this.dom.internalContainer.style.width);
			 this.dom.internalContainer.style.height = (h*z) + 'px';
			 this.dom.internalContainer.style.width = (w*z) + 'px';
			 this.sheet.canvas.setAttribute('viewBox', '0 0 '+JSD.svgCanvasSize.width/z+' '+JSD.svgCanvasSize.height/z);
			 */
		}
		this.zoom = z;
		//console.log('zoom='+z);
		return this;
	},

	_setWidth : function(w) {
		if (Raphael.type === "VML") {
			w = w - 3;
			this.dom.childNodes[0].style.width = w;
		} else {
			this.dom.internalContainer.style.width = w + 'px';
		}
		return this;
	},

	/** @method	*/
	setWidth : function(w) {
		w = this._updatecurrentconfig('width', w);
		this._setWidth(w).width = w;
		return this;
	},

	_setHeight : function(h) {
		if (Raphael.type === "VML") {
			h = h - 3;
			this.dom.childNodes[0].style.height = h;
		} else {
			this.dom.internalContainer.style.height = h + 'px';
		}
		return this;
	},

	/** @method	*/
	setHeight : function(h) {
		h = this._updatecurrentconfig('height', w);
		this._setHeight(h);
		this.height = h;
		return this;
	},

	_setSize : function(w, h) {
		//console.log('test');
		if (Raphael.type === 'VML') {
			//w=w-3;
			//h=h-3;
			this.sheet.setSize(w, h);
		} else {

			var a = w + 'px';
			var b = h + 'px';
			//console.log([a,b]);

			this.dom.internalContainer.style.width = w + 'px';
			this.dom.internalContainer.style.height = h + 'px';
			//alert('done');
		}
		if (this.graphic) {
			this.graphic.attr({
				width : (w - this.backgroundPadding * 2) - 1,
				height : (h - this.backgroundPadding * 2) - 1
			})
		}
		this.setZoom(this.getZoom());
		return this;
	},

	/** @method	*/
	setSize : function(w, h) {
		w = this._updatecurrentconfig('width', w);
		h = this._updatecurrentconfig('height', h);

		this._setSize(w, h);

		this.width = w;
		this.height = h;
		return this;
	},

	/** @cfg	*/
	autoSize : true,

	/** @method
	 * @private
	 */
	setSizeFit : function(includeDragProxy) {
		var newW = 0;
		var newH = 0;
		var objW, objH;
		var col = [];
		if (includeDragProxy) {
			col = this.nodeCollection.concat(this.edgeCollection, [this.focusEdge.dragProxy]);
		} else {
			col = this.nodeCollection.concat(this.edgeCollection);
		}
		for (var i = 0; i < col.length; i++) {
			if (col[i].getRight) {
				objW = col[i].getRight();
			} else {
				objW = col[i].right
			}
			if (col[i].getBottom) {
				objH = col[i].getBottom()
			} else {
				objH = col[i].bottom
			}

			newW = (objW > newW) ? objW + 25 : newW;
			newH = (objH > newH) ? objH + 25 : newH;
		}

		if (this.autoSize) {
			var w = this.dom.style.width ? parseFloat(this.dom.style.width) : this.width;
			var h = this.dom.style.height ? parseFloat(this.dom.style.height) : this.height;
		} else {
			var w = this.minWidth;
			var h = this.minHeight;
		}
		w = w || 0;
		h = h || 0;
		//alert(JSD.JSON.encode(this.dom.style));
		this._setSize(Math.max(newW, w), Math.max(newH, h));

		//console.log([newW, newH, this.width, this.height]);
		//if (newW > this.width || newH > this.height) {
		//console.log('resize');

		//}
	},

	/** @cfg
	 * @private
	 */
	tooltipClass : 'tooltipContent',

	/** @method
	 * @private
	 */
	setTooltipClass : function(cls) {
		this.tooltip.dom.setAttribute("class", cls);
	},
	/**
	 * @method createTooltip
	 * @private
	 */
	createTooltip : function() {
		var cfg = this.tooltipConfig;
		cfg.x = 0;
		cfg.y = 0;
		cfg.width = 30;
		cfg.height = 15;
		this.tooltip = this.sheet.rect().attr(this.tooltipConfig).hide();
		this.tooltip.mouseover(function(evt) {
			//diagram.tooltipHide();
		})
		this.tooltip.dom = document.createElement('div');
		var ttel = this.tooltip.dom;
		ttel.setAttribute("id", "JSDToolTip" + this.getId());
		if (this.tooltipClass) {
			this.setTooltipClass(this.tooltipClass);
		}
		ttel.style.visibility = "hidden";
		ttel.style.position = 'absolute';
		ttel.style.top = '100px';
		ttel.style.left = '100px';
		ttel.style.height = 'auto';
		ttel.style.width = 'auto';
		//ttel.style.border = '1px dashed green';
		document.body.appendChild(ttel);
	},

	/** @method
	 * @private
	 */
	tooltipHide : function() {
		this.tooltip.dom.style.visibility = "hidden";
		this.tooltip.hide();
	},

	/** @method
	 * @private
	 */

	tooltipShow : function(item, ttPosX, ttPosY) {
		var z = this.getZoom();
		var pad = 3;
		var tt = this.tooltip;
		var ttel = this.tooltip.dom;
		var elPos = JSD.getPosition(this.dom);
		//var ttHTML = item.getTooltipContent();
		ttel.innerHTML = item.getTooltipContent();
		if (ttel.innerHTML === "") {
			return;
		}
		var w1 = ttel.offsetWidth / z;
		var h1 = ttel.offsetHeight / z;
		var nx, ny;
		if (ttPosX && ttPosY) {
			var nx = ttPosX;
			var ny = ttPosYY;
		} else {
			var nx = item.getX() - 5;
			var ny = item.getY() - h1;
		}
		var newPos = {
			x : nx,
			y : ny
		};
		tt.toFront();
		tt.attr({
			width : w1 + pad * 2,
			height : h1 + pad * 2
		});
		tt.show();
		ttel.style.visibility = "visible";
		if (this.animateTooltip) {
			tt.onAnimation(function() {
				ttel.style.left = (tt.attr("x") * z + elPos.x + pad) + "px";
				ttel.style.top = (tt.attr("y") * z + elPos.y + pad) + "px";
			});
			tt.animate(newPos, 300, ">");
		} else {
			tt.attr(newPos);
			ttel.style.left = (nx * z + elPos.x + pad) + "px";
			ttel.style.top = (ny * z + elPos.y + pad) + "px";
		}
	},

	/** @cfg
	 * @private
	 */

	tooltipConfig : {
		r : 5,
		stroke : '#333',
		fill : '90-#1a1a1a-#999',
		'fill-opacity' : 0.5
	},

	/**
	 * @method getDiagramEl Retrieves a diagramComponent for the given id
	 * @param {string} id
	 */
	getDiagramEl : function(id) {
		var el = this.getNode(id);
		if (el) {
			return el
		} else {
			el = this.getEdge(id);
			return el
		}
		return false;
	},

	/**
	 * @method
	 * Shorthand for {@link JSD.diagram.Diagram#getDiagramEl}
	 */
	getCmp : this.getDiagramEl,

	/**
	 * @property {boolean} isDiagram
	 */
	isDiagram : true,

	/** @property
	 * @private
	 */
	selectedItems : [],

	/**
	 * @method getSelected Returns the first selected diagram component
	 * @return {diagramComponent} node/edge
	 */
	getSelected : function() {
		var item = this.selectedItem;
		if (item) {
			if (item.rendered) {
				return item;
			}
		}
		return false;
	},

	/**
	 * @method getSelections Returns an array containing all currently selected diagram components
	 * @return {array} diagramComponents
	 */

	getSelections : function() {
		//array
		return this.selectedItems;
	},

	/**
	 * @method align
	 * Aligns all items in <code>collection</code> according to the value of <code>alignTo</code>.  If <code>alignTo</code> is omitted, defaults to 'center'.
	 * @param {Array} collection
	 * @param {String} alignTo The direction to align the collection of items. Defaults to 'center'.  Allowed values are as follows:
	 <br>- left
	 <br>- center
	 <br>- right
	 <br>- top
	 <br>- middle
	 <br>- bottom
	 */

	align : function(collection, alignTo) {
		collection = collection || this.getSelections();
		alignTo = alignTo || 'center';
		var o;
		var left = 1000000;
		var top = 1000000;
		var right = 0;
		var bottom = 0;
		//first, get the coords
		for (var i = 0; i < collection.length; i++) {
			o = collection[i];
			left = Math.min(left, o.getX());
			right = Math.max(right, o.getRight());
			top = Math.min(top, o.getY());
			bottom = Math.max(bottom, o.getBottom());
		}
		var center = left + ((right - left) / 2);
		var middle = top + ((bottom - top) / 2);
		//now move the objects
		for (var i = 0; i < collection.length; i++) {
			o = collection[i];
			switch (alignTo) {
				case ('left'):
					o.setX(left);
					break;

				case ('center'):
					o.setX(center - o.getWidth() / 2);
					break;

				case ('right'):
					o.setX(right - o.getWidth());
					break;

				case ('top'):
					o.setY(top);
					break;

				case ('middle'):
					o.setY(middle - o.getHeight() / 2);
					break;

				case ('bottom'):
					o.setY(bottom - o.getHeight());
					break;

				default:

			}
			if (o.hasFocus) {
				if (o === this.getSelected()) {
					o.focus(true)
				} else {
					o._multiSelectShow();
				}
			}
		}
	},

	/**
	 * @method
	 * @private
	 */
	editLabelEl : function(thisItem, fnName) {

		//var thisItem = labelEl.parentObj;
		var labelEl = thisItem.labelEl;
		var x, y, h, w;
		if (labelEl) {
			var txtCfg = labelEl.getBBox();
			var oldValue = labelEl.attr("text");
			labelEl.hide();
		} else {
			var txtCfg = thisItem._getCenterPt();
			txtCfg.x = txtCfg.x - 50 / 2;
			txtCfg.y = txtCfg.y - 20 / 2;
			//this._createLabelEl(textPt.x + this.labelOffset[0], textPt.y + his.labelOffset[1], labelString);
			txtCfg.height = 0;
			txtCfg.width = 60;
			var oldValue = "";
		}

		var d = thisItem.diagram;
		var dPos = JSD.getPosition(d.dom);

		if (thisItem.isCmpType("node", true)) {
			x = thisItem.getX();
			y = thisItem.getY();
			h = thisItem.getHeight();
			w = Math.max(thisItem.getWidth(), 100);
		} else {
			h = txtCfg.height + 20;
			w = txtCfg.width + 50;
			x = (txtCfg.x + txtCfg.width / 2) - w / 2;
			y = txtCfg.y;
		}

		var mask = d.sheet.rect(0, 0, 10000, 10000).attr({
			fill : "#aaa",
			'fill-opacity' : 0.2
		});

		var ta = document.getElementById('labelEditorField');
		if (!ta) {
			ta = document.createElement("textarea");
			ta.setAttribute('id', 'labelEditorField');
			ta.className = 'labelEditorTextArea';
		}

		ta.parentObj = thisItem;
		ta.style.left = (x + dPos.x) + 'px';
		ta.style.top = (y + dPos.y) + 'px';
		ta.style.height = h + 'px';
		ta.style.width = w + 'px';
		ta.style.textAlign = 'center';
		ta.style.position = 'absolute';
		ta.onkeypress = function(evt) {
			var key = (window.event) ? event.keyCode : evt.keyCode;
			switch (key) {
				case (27):
					ta.value = oldValue;
					ta.blur();
					break;
			}
		};

		mask.click(function(evt) {
			if (ta) {
				ta.blur();
			}
		});

		ta.onblur = function(evt) {
			var newValue = ta.value;
			if (newValue !== oldValue) {

				var cmp = thisItem;
				/** @event */
				d.fireEvent("uibeforeeditlabel", cmp, oldValue, newValue);
				/** @class JSD.diagram.Component */
				/** @event */
				thisItem.fireEvent("uibeforeeditlabel", thisItem, oldValue, newValue);
				/** @class JSD.diagram.Diagram */

				if (fnName) {
					thisItem[fnName](newValue);
				} else {
					thisItem.setLabel(newValue);
				}
				if (thisItem.isCmpType('node')) {
					thisItem.setLabelAlign(thisItem.labelAlign);
					thisItem.setLabelVerticalAlign(thisItem.labelVerticalAlign);
				}
				/** @event */
				d.fireEvent("uieditlabel", cmp, oldValue, newValue);
				/** @class JSD.diagram.Component */
				/** @event */
				thisItem.fireEvent("uieditlabel", thisItem, oldValue, newValue);
				/** @class JSD.diagram.Diagram */
			}

			if (thisItem.labelEl) {
				thisItem.labelEl.show();
			}
			document.body.removeChild(ta);
			mask.remove();
		}
		ta.value = oldValue;
		document.body.appendChild(ta);
		ta.focus();
		ta.select();
	},

	/**
	 * @method
	 * @private
	 */
	editHtmlEl : function(htmlEl, fnName) {
		var h = htmlEl;
		var thisItem = htmlEl.parentObj;

		var success = this.fireEvent("beforeedithtml", thisItem, h.innerHTML);
		//container's beforeadd event - handlers are passed 2 params - 1. container, 2. item to remove
		if (success === false) {
			return false;
		}

		var d = thisItem.diagram;
		var dPos = JSD.getPosition(d.dom);
		//var oldValue = h.innerHTML.split(">").join(">\n").split("<").join("\n<");
		var oldValue = h.innerHTML;

		h.style.visibility = "hidden";

		var x, y, h, w;
		if (thisItem.isCmpType("node", true)) {
			x = thisItem.getX();
			y = thisItem.getY();
			h = thisItem.getHeight();
			w = thisItem.getWidth();
		} else {
			h = txtCfg.height + 50;
			w = txtCfg.width + 50;
			x = (txtCfg.x + txtCfg.width / 2) - w / 2;
			y = txtCfg.y;
		}

		var mask = d.sheet.rect(0, 0, 10000, 10000).attr({
			fill : "#aaa",
			'fill-opacity' : 0.2
		});

		var ta = document.getElementById('htmlEditorField');
		if (!ta) {
			ta = document.createElement("textarea");
			ta.setAttribute('id', 'htmlEditorField');
			ta.className = 'htmlEditorTextArea';
		}

		ta.parentObj = thisItem;
		ta.style.left = (x + dPos.x) + 'px';
		ta.style.top = (y + dPos.y) + 'px';
		//ta.style.height = 'auto';
		ta.style.height = (h + 20) + 'px';
		ta.style.width = w + 'px';
		ta.style.textAlign = 'left';
		ta.onkeypress = function(evt) {
			var key = (window.event) ? event.keyCode : evt.keyCode;
			switch (key) {
				case (27):
					ta.value = oldValue;
					ta.blur();
					break;
			}
		};
		mask.click(function(evt) {
			if (ta) {
				ta.blur();
			}
		});
		ta.onblur = function(evt) {
			var newValue = ta.value;
			thisItem.setHtml(newValue);

			thisItem.htmlEl.style.visibility = "visible";
			document.body.removeChild(ta);
			mask.remove();
		}
		ta.value = oldValue;
		document.body.appendChild(ta);
		ta.focus();
		ta.select();
	},

	focus : function() {
		this.fireEvent("focus", this);
		this._focus();
	},

	_focus : function() {
		this.hasFocus = true;

		if (this.selectedItem) {
			if (this.selectedItem !== this) {
				this.selectedItem.blur();
			}
			if (this.selectedItems.length > 0) {
				for (var i = 0; i < this.selectedItems.length; i++) {
					this.selectedItems[i].blur();
					//this.selectedItems[i]._multiSelectHide();
				}
			}
		}
		this.selectedItem = null;
		this.selectedItems = [];
		this.fireEvent("focus", this);
		if (this.highlightBox) {
			delete this.highlightedContainer;
			this.highlightBox.remove();
			this.highlightBox = null;
		}
		//this.focusEdge.removeAll();
		if (this.focusEdge) {
			this.focusEdge.hideAll();
		}
		if (this.focusBox) {
			this.focusBox.all.hide();
			this.focusBox.target = this;
		}
	},

	_blur : function() {
		// convenience fn to silently call blur
		this.hasFocus = false;
		if (this.highlightBox) {
			delete this.highlightedContainer;
			this.highlightBox.remove();
			this.highlightBox = null;
		}
		//var col = this.getSelections();
		//for (var i=0; i<col.length; i++){
		//	col[i]._multiSelectHide();
		//}

		//this.focusEdge.removeAll();
		this.focusEdge.hideAll();
		this.focusBox.all.hide();
		this.focusBox.target = {};
	},

	/** @method blur */
	blur : function() {
		this.fireEvent("blur", this);
		this._blur();
	},

	_multiSelectHide : function() {
		//dummy fn
	},

	/** @method */
	getNode : function(id) {
		for (var i = 0; i < this.nodeCollection.length; i++) {
			if (this.nodeCollection[i].id === id) {
				return this.nodeCollection[i]
			}
		}
		return false;
	},

	/** @method */
	getEdge : function(id) {
		for (var i = 0; i < this.edgeCollection.length; i++) {
			if (this.edgeCollection[i].id === id) {
				return this.edgeCollection[i]
			}
		}
		return false;
	},

	_getGroup : function(id) {
		for (var i = 0; i < this.groupCollection.length; i++) {
			if (this.groupCollection[i].id === id) {
				return this.groupCollection[i]
			}
		}
		return false;
	},

	getContainers : function() {
		var a = [];
		var chkContainers = function(c) {
			if (c.isCmpType('container')) {
				a.push(c);
				if (c.items) {
					for (var j = 0; j < c.items.length; j++) {
						chkContainers(c.items[j]);
					}
				}
			}
		}
		for (var i = 0; i < this.items.length; i++) {
			chkContainers(this.items[i]);
		}
		return a;
	},

	setDropTargets : function() {
		this.dropTargets = [];
		var containers = this.getContainers();
		var x;
		//console.log('containers.length = '+containers.length);
		for (var i = 0; i < containers.length; i++) {
			x = {
				target : containers[i],
				x : containers[i].getX(),
				y : containers[i].getY(),
				right : containers[i].getRight(),
				bottom : containers[i].getBottom()
			};
			this.dropTargets.push(x);
		}
	},

	/**
	 * @method getDropTargetAt
	 * @param {object} coords
	 * @return JSD.diagram.Node
	 * @private
	 * the "dropTargets" property gets set in the
	 */
	getDropTargetAt : function(coords) {
		if (this.dropTargets.length > 0) {
			//var relPos = JSD.getMouseOffset(this.body, evt);
			var tgt;
			for (var i = this.dropTargets.length - 1; i > -1; i--) {
				tgt = this.dropTargets[i];
				if ((coords.x > tgt.x) && (coords.x < tgt.right)) {
					if ((coords.y > tgt.y) && (coords.y < tgt.bottom)) {
						//tgt.target.highlightContainer();
						//thisDiagram.targetContainer = tgt.target;
						return tgt.target;
					}
				}
			}
		}
	},

	/**
	 * @method getNodesInRange
	 * This method will return an array of diagram Nodes whose x,y coordinates
	 * _lie within the rectangular zone defined by the paramaters x, y, width, height.
	 *
	 * <p>Creates a new Person, representative of a living human being,
	 in addition to the collection of characteristics that define and
	 distinguish an individual personality; the self.</p>
	 <p>The word can be traced to the latin word <i>persona</i> for
	 "human being," originally "character in a drama," possibly borrowed
	 from the ancient Etruscan word <i>phersu</i> for "mask."</p>
	 *
	 * @param {Number} x
	 * @param {Number} y
	 * @param {Number} width
	 * @param {Number} height
	 * @return Array of items (Nodes/Edges)
	 */

	getNodesInRange : function(x, y, w, h) {
		var arr = [];
		for (var i = 0; i < this.nodeCollection.length; i++) {
			var item = this.nodeCollection[i];
			var ix = item.getX();
			var iy = item.getY();
			if (ix > x && ix < x + w && iy > y && iy < y + h) {
				arr.push(item);
			}
		}
		return arr;
	},

	/** @cfg*/

	editMode : false,

	/** @cfg*/
	editor : {
		createNode : true,
		createEdge : true,
		deleteNode : true,
		deleteEdge : true,
		disconnectEdge : true,
		highlight : {
			stroke : "#aaa",
			"stroke-width" : 2,
			"stroke-dasharray" : "- "
		},
		outline : {
			stroke : "#aaa",
			"stroke-dasharray" : "- "
		},
		focusBox : {
			stroke : "#999",
			fill : "#0ff"
		},

		dragProxy : {
			stroke : "#000000",
			"stroke-dasharray" : "- "
		}
	},

	/** @cfg*/
	snapTo : 1,

	disableEdit : function() {

	},

	/** @method*/

	enableEdit : function(config) {
		//editorConfig = JSD.clone(JSD.diagramEditorConfig);
		if (config) {
			JSD.apply(this.editor, config);
		}

		var diagram = this;
		this.editMode = true;

		// set the default focus elements values
		var focusX = 15;
		var focusY = 15;
		var focusWidth = 100;
		var focusHeight = 100;

		// create the focus elements
		var focusBox = {};
		focusBox.target = {};

		var focusEdge = {};
		var fe = focusEdge;
		fe.target = {};
		fe.pt = [];
		fe.midpt = [];
		fe.targetConnection = {};
		//alert('creating fe.dp');
		//Ext.get('center2').dom.innerHTML += 'creating fe.dp.<br>';

		fe.dragProxy = diagram.sheet.path("M0,0").attr({
			stroke : "#000000",
			"stroke-dasharray" : "- "
		});

		fe.hideAll = function() {
			var fe = focusEdge;
			fe.dragProxy.hide();
			if (fe.pt) {
				for (var i = 0; i < fe.pt.length; i++) {
					if (fe.pt[i]) {
						fe.pt[i].hide();
					}
				}
			}
			if (fe.midpt) {
				for (var i = 0; i < fe.midpt.length; i++) {
					if (fe.midpt[i]) {
						fe.midpt[i].hide();
					}
				}
			}
			if (fe.labelPt) {
				fe.labelPt.hide();
			}
		}
		//-------------------------
		fe.hook = diagram.sheet.rect(0, 0, 8, 8).hide();

		fe.connecters = {};
		var attrs = {
			fill : "#ffffff",
			"fill-opacity" : 0.9
		}
		var pix = 10;
		var autoAttrs = {
			fill : "#ffffff",
			"fill-opacity" : 0,
			stroke : "#00ff00"
			//"stroke-opacity": 0
		}
		var fec = fe.connecters;
		//fec.auto = diagram.sheet.rect(0, 0, 0, 0).attr(autoAttrs).hide();

		/* dk
		fec.auto = diagram.sheet.rect(0, 0, pix, pix).attr(attrs).hide();
		fec.top = diagram.sheet.rect(0, 0, pix, pix).attr(attrs).hide();
		fec.bottom = diagram.sheet.rect(0, 0, pix, pix).attr(attrs).hide();
		fec.left = diagram.sheet.rect(0, 0, pix, pix).attr(attrs).hide();
		fec.right = diagram.sheet.rect(0, 0, pix, pix).attr(attrs).hide();
		dk
		*/

		//fec.center = diagram.sheet.rect(0, 0, pix, pix).attr(attrs).hide();
		fec.all = diagram.sheet.set();
		//fec.all.push(fec.top, fec.bottom, fec.left, fec.right, fec.center);
		//dk fec.all.push(fec.top, fec.bottom, fec.left, fec.right, fec.auto);
		//this.connecters.all.toFront();

		/* dk

		fe.connecters.all.mouseover(function(event) {
		fe.targetConnection.x = this.coords[0];
		fe.targetConnection.y = this.coords[1];
		fe.targetConnection.side = this.coords[2];
		fe.targetConnection.lockedOn = true;
		this.attr({
		stroke : "#00ff00",
		fill : "#00ff00"
		});
		});
		fe.connecters.all.mouseout(function(event) {
		fe.targetConnection.lockedOn = false;
		this.attr({
		stroke : 'black',
		fill : "#ffffff"
		});
		});
		dk
		*/

		// special case for "auto"
		/*
		 fe.connecters.auto.mouseover(function(event){
		 fe.targetConnection.x = this.coords[0];
		 fe.targetConnection.y = this.coords[1];
		 fe.targetConnection.side = this.coords[2];
		 fe.targetConnection.lockedOn = true;
		 this.attr({
		 //stroke: "green",
		 "stroke-opacity": 0.9
		 //fill: "green"
		 });
		 });
		 fe.connecters.auto.mouseout(function(event){
		 fe.targetConnection.lockedOn = false;
		 this.attr({
		 "stroke-opacity": 0
		 //"fill-opacity": 0
		 });
		 });
		 */

		fe.connecters.showAll = function(node, autoOnly) {
			fe.connecters.all.hide();
			var cx, cy;
			var item = node;

			for (var portname in item.ports) {
				if (item.ports.hasOwnProperty(portname)) {
					var realportname = portname;
					//used for center / auto
					portname = (portname === "center" ? "auto" : portname);
					var port = item.ports[realportname];
					if (port) {
						if (!fec[portname]) {
							fec[portname] = diagram.sheet.rect(0, 0, pix, pix).attr(attrs).hide();
							//fec.all.push(fec.top, fec.bottom, fec.left, fec.right, fec.center);
							fec.all.push(fec[portname]);
							//this.connecters.all.toFront();
							fec[portname].mouseover(function(event) {
								fe.targetConnection.x = this.coords[0];
								fe.targetConnection.y = this.coords[1];
								fe.targetConnection.side = this.coords[2];
								fe.targetConnection.lockedOn = true;
								this.attr({
									stroke : "#00ff00",
									fill : "#00ff00"
								});
							});
							fec[portname].mouseout(function(event) {
								fe.targetConnection.lockedOn = false;
								this.attr({
									stroke : 'black',
									fill : "#ffffff"
								});
							});
						}
						var con = fec[portname];
						var portCoords = item.getConnectionCoords(realportname);
						cx = portCoords[0];
						cy = portCoords[1];
						con.attr({
							x : cx - pix / 2,
							y : cy - pix / 2
						});
						con.coords = [cx, cy, portname];
						con.show();
						con.toFront();
					}
				}
			}

			/*
			 if (autoOnly) {
			 fe.connecters.auto.attr({
			 'fill-opacity' : 0.5
			 }).show();
			 } else {
			 fe.connecters.all.show();
			 fe.connecters.auto.show();
			 }
			 fe.connecters.auto.toFront();
			 fe.connecters.all.toFront();
			 */
		}

		fe.connecters.hideAll = function() {
			fe.connecters.all.hide();
			fe.connecters.auto.hide();
		}
		//-------------------------

		var pix = (Raphael.type === "SVG") ? (JSD.isTouch() ? 20 : 7) : 6;

		focusBox.dragProxy = diagram.sheet.rect(10, 10, 50, 50).attr(this.editor.dragProxy);
		focusBox.dragProxy.hide();

		focusBox.outline = diagram.sheet.rect(focusX, focusY, focusWidth, focusHeight).attr(this.editor.outline);
		var fbStrk = this.editor.focusBox.stroke;
		var fbFill = this.editor.focusBox.fill;

		focusBox.spinner = diagram.sheet.ellipse(focusX + (focusWidth / 2), focusY - 20, pix / 2, pix / 2).attr({
			stroke : fbStrk,
			fill : fbFill,
			cursor : "crosshair"
		});
		focusBox.nw = diagram.sheet.ellipse(focusX, focusY, pix / 2, pix / 2).attr({
			stroke : fbStrk,
			fill : fbFill,
			cursor : "nw-resize"
		});
		focusBox.n = diagram.sheet.rect(focusX + (focusWidth / 2) - pix / 2, focusY - pix / 2, pix, pix).attr({
			stroke : fbStrk,
			fill : fbFill,
			cursor : "n-resize"
		});
		focusBox.ne = diagram.sheet.ellipse(focusX + focusWidth, focusY, pix / 2, pix / 2).attr({
			stroke : fbStrk,
			fill : fbFill,
			cursor : "ne-resize"
		});

		focusBox.w = diagram.sheet.rect(focusX - pix / 2, focusY + (focusHeight / 2) - pix / 2, pix, pix).attr({
			stroke : fbStrk,
			fill : fbFill,
			cursor : "w-resize"
		});
		focusBox.e = diagram.sheet.rect(focusX + focusWidth - pix / 2, focusY + (focusHeight / 2) - pix / 2, pix, pix).attr({
			stroke : fbStrk,
			fill : fbFill,
			cursor : "e-resize"
		});

		focusBox.sw = diagram.sheet.ellipse(focusX, focusY + focusHeight, pix / 2, pix / 2).attr({
			stroke : fbStrk,
			fill : fbFill,
			cursor : "sw-resize"
		});
		focusBox.s = diagram.sheet.rect(focusX + (focusWidth / 2) - pix / 2, focusY + focusHeight - pix / 2, pix, pix).attr({
			stroke : fbStrk,
			fill : fbFill,
			cursor : "s-resize"
		});
		focusBox.se = diagram.sheet.ellipse(focusX + focusWidth, focusY + focusHeight, pix / 2, pix / 2).attr({
			stroke : fbStrk,
			fill : fbFill,
			cursor : "se-resize"
		});

		focusBox.dragProxy.getRight = function() {
			return parseInt(focusBox.dragProxy.attr("x")) + parseInt(focusBox.dragProxy.attr("width"))
		}
		focusBox.dragProxy.getBottom = function() {
			return parseInt(focusBox.dragProxy.attr("y")) + parseInt(focusBox.dragProxy.attr("height"))
		}
		focusBox.tooltip = diagram.sheet.text(focusX + (focusWidth / 2), focusY - 40, "tooltip").hide();

		focusBox.all = diagram.sheet.set();
		focusBox.all.push(focusBox.outline, focusBox.spinner, focusBox.nw, focusBox.n, focusBox.ne, focusBox.w, focusBox.e, focusBox.sw, focusBox.s, focusBox.se);
		focusBox.all.hide();

		var shapeResizeStart = function(x, y, evt) {
			evt = evt || window.event;
			if (evt.preventDefault) {
				evt.preventDefault()
			} else {
				evt.returnValue = false
			}
			if (evt.stopPropagation) {
				evt.stopPropagation()
			} else {
				evt.cancelBubble = true
			}

			if (this.attr("cursor") === "") {
				focusBox.target.stopEvent = true;
				return;
			}
			focusBox.target.stopEvent = false;

			var success = focusBox.target.fireEvent("resizedrag", "EDIT event test - successful");
			if ( typeof success === 'boolean' && !success) {
				focusBox.target.stopEvent = true;
				return false;
			}

			var box = focusBox;
			box.minW = box.target.minWidth || 100;
			box.minH = box.target.minHeight || 100;
			box.maxW = box.target.maxWidth || 500;
			box.maxH = box.target.maxHeight || 500;

			box.maxX = box.target.getRight() - box.minW;
			box.maxY = box.target.getBottom() - box.minH;
			box.minX = box.target.getRight() - box.maxW;
			box.minY = box.target.getBottom() - box.maxH;

			box.ox = box.x;
			box.oy = box.y;
			box.oWidth = box.width;
			box.oHeight = box.height;
			box.cx = box.ox + box.oWidth / 2;
			box.cy = box.oy + box.oHeight / 2;

			//var dp = focusBox.dragProxy;
			//dp.minW = focusBox.target.minWidth || 100;
			//dp.minH = focusBox.target.minHeight || 100;
			//dp.maxW = focusBox.target.maxWidth || 500;
			//dp.maxH = focusBox.target.maxHeight || 500;

			//dp.maxX = box.target.getRight() - dp.minW;
			//dp.maxY = box.target.getBottom() - dp.minH;
			//dp.minX = box.target.getRight() - dp.maxW;
			//dp.minY = box.target.getBottom() - dp.maxH;

			//dp.ox = dp.attr("x");
			//dp.oy = dp.attr("y");
			//dp.oWidth = dp.attr("width");
			//dp.oHeight = dp.attr("height");
			//dp.cx = dp.ox + dp.oWidth / 2;
			//dp.cy = dp.oy + dp.oHeight / 2;
			//box.spinner.oangle = Raphael.angle(dp.cx, dp.cy, box.spinner.ox, box.spinner.oy);
			if (this.attr("cursor") === "crosshair") {
				focusBox.tooltip.attr({
					x : box.cx,
					y : box.oy - 40,
					text : "angle : " + box.target.rotate,
					"font-size" : 12,
					"fill-opacity" : 0.5
				}).toFront().show();
				//dp.show();
			}
		};

		var shapeResizeMove = function(dx, dy, x, y, evt) {
			evt = evt || window.event;
			var dpattr;
			if (evt.preventDefault) {
				evt.preventDefault()
			} else {
				evt.returnValue = false
			}
			if (evt.stopPropagation) {
				evt.stopPropagation()
			} else {
				evt.cancelBubble = true
			}
			var z = diagram.getZoom();
			dx = Raphael.snapTo(diagram.snapTo, dx / z);
			dy = Raphael.snapTo(diagram.snapTo, dy / z);
			if (focusBox.target.stopEvent) {
				return false;
			}
			var success = focusBox.target.fireEvent("resizedragmove", dx, dy);
			if ( typeof success === 'boolean' && !success) {
				focusBox.target.stopEvent = true;
				return false;
			}

			//var dp = focusBox.dragProxy;
			var box = focusBox;
			this.angle = box.target.rotate;

			switch (this.attr("cursor")) {
				case "crosshair":

					this.angle = Math.round(Raphael.angle((this.cx + dx), (this.cy + dy), this.targetCx, this.targetCy - 50, this.targetCx, this.targetCy));
					this.angle = JSD.fixRotationAngle(this.angle);
					this.angle = (this.angle < 5 || this.angle > 355) ? 0 : this.angle;

					//console.log([(this.cx+dx), (this.cy+dy), dx, dy, this.angle]);
					//console.log([this.angle, (this.cx - this.targetCx), (this.cy - (this.targetY - 20))]);
					dpattr = {
						x : null,
						y : null,
						width : null,
						height : null
					};
					//focusBox.setPosition(null, null, null, null, null, this.angle);
					focusBox.tooltip.attr({
						x : this.targetCx,
						y : this.targetY - 40,
						text : "angle : " + this.angle,
						"font-size" : 12,
						"fill-opacity" : 0.5
					}).toFront().show();

					/*
					 focusBox.spinner.angle = this.angle;//Raphael.angle(focusBox.dragProxy.cx, focusBox.dragProxy.cy, focusBox.spinner.cx + dx, focusBox.spinner.oy + dy);
					 var deltaAngle = Raphael.snapTo(5, focusBox.spinner.angle - focusBox.spinner.oangle, 5);
					 //console.log('deltaAngle = ' + deltaAngle);
					 focusBox.spinner.nx = focusBox.spinner.ox + dx;
					 focusBox.spinner.ny = focusBox.spinner.oy + dy;
					 if (focusBox.target.rotation) {
					 var rAngle = (deltaAngle - focusBox.target.rotation - 90 < 0) ? deltaAngle - focusBox.target.rotation - 90 + 360 : deltaAngle - focusBox.target.rotation - 90;
					 focusBox.all.rotate(rAngle, focusBox.dragProxy.cx, focusBox.dragProxy.cy);
					 focusBox.dragProxy.rotate(rAngle, focusBox.dragProxy.cx, focusBox.dragProxy.cy);

					 } else {
					 //console.log('2');
					 var r = Raphael.snapTo(5, focusBox.spinner.angle - 90, 1);
					 focusBox.all.rotate(r, focusBox.dragProxy.cx, focusBox.dragProxy.cy);
					 focusBox.dragProxy.rotate(r, focusBox.dragProxy.cx, focusBox.dragProxy.cy);
					 }
					 //thisAngle = (focusBox.target.rotation) ? focusBox.target.rotation : 0;

					 //focusBox.dragProxy.rotate(angle, x1, y1);
					 */
					break;
				case "nw-resize":
					dpattr = {
						x : Math.max(box.minX, Math.min(box.maxX, (box.ox + Math.min(dx, dy)))),
						y : Math.max(box.minY, Math.min(box.maxY, (box.oy + Math.min(dx, dy)))),
						width : Math.min(box.maxW, Math.max(box.minW, (box.oWidth - Math.min(dx, dy)))),
						height : Math.min(box.maxW, Math.max(box.minH, (box.oHeight - Math.min(dx, dy))))
					};
					//dp.attr(dpattr).hide();
					break;
				case "n-resize":
					dpattr = {
						x : box.x,
						y : Math.max(box.minY, Math.min(box.maxY, (box.oy + dy))),
						height : Math.min(box.maxW, Math.max(box.minH, (box.oHeight - dy))),
						width : box.width
					};
					break;
				case "ne-resize":
					dpattr = {
						x : box.x,
						y : Math.max(box.minY, Math.min(box.maxY, (box.oy + Math.min(-dx, dy)))),
						width : Math.min(box.maxW, Math.max(box.minW, (box.oWidth - Math.min(-dx, dy)))),
						height : Math.min(box.maxW, Math.max(box.minH, (box.oHeight - Math.min(-dx, dy))))
					};
					break;
				case "s-resize":
					dpattr = {
						x : box.x,
						y : box.y,
						height : Math.min(box.maxW, Math.max(box.minH, (box.oHeight + dy))),
						width : box.width
					};
					break;
				case "sw-resize":
					dpattr = {
						x : Math.max(box.minX, Math.min(box.maxX, (box.ox + Math.min(dx, -dy)))),
						y : box.y,
						width : Math.min(box.maxW, Math.max(box.minW, (box.oWidth - Math.min(dx, -dy)))),
						height : Math.min(box.maxW, Math.max(box.minH, (box.oHeight - Math.min(dx, -dy))))
					};
					break;
				case "se-resize":
					dpattr = {
						x : box.x,
						y : box.y,
						width : Math.min(box.maxW, Math.max(box.minW, (box.oWidth - Math.min(-dx, -dy)))),
						height : Math.min(box.maxW, Math.max(box.minH, (box.oHeight - Math.min(-dx, -dy))))
					};
					break;
				case "e-resize":
					dpattr = {
						x : box.x,
						y : box.y,
						height : box.height,
						width : Math.min(box.maxW, Math.max(box.minW, (box.oWidth + dx)))
					};
					break;
				case "w-resize":
					dpattr = {
						x : Math.max(box.minX, Math.min(box.maxX, (box.ox + dx))),
						y : box.y,
						width : Math.min(box.maxW, Math.max(box.minW, (box.oWidth - dx))),
						height : box.height
					};
					break;

			}
			focusBox.setPosition(dpattr.x, dpattr.y, dpattr.width, dpattr.height, focusBox.target, this.angle);
			diagram.setSizeFit(true);
			//diagram.sheet.safari();
		};

		var shapeResizeStop = function() {
			/*evt = evt || window.event;

			 if (evt.preventDefault) {
			 evt.preventDefault()
			 } else {
			 evt.returnValue = false
			 }
			 if (evt.stopPropagation) {
			 evt.stopPropagation()
			 } else {
			 evt.cancelBubble = true
			 }
			 */
			var node = focusBox.target;
			if (node.stopEvent) {
				delete node.stopEvent;
				diagram.focusBox.dragProxy.hide();
				return false;
			}
			//var nx = focusBox.dragProxy.attr("x");
			//var ny = focusBox.dragProxy.attr("y");
			//var nWidth = focusBox.dragProxy.attr("width");
			//var nHeight = focusBox.dragProxy.attr("height");
			var nx = focusBox.x;
			var ny = focusBox.y;
			var nWidth = focusBox.width;
			var nHeight = focusBox.height;

			var success = node.fireEvent("resizedragstop", [nx, ny, nWidth, nHeight]);
			if ( typeof success === 'boolean' && !success) {
				delete node.stopEvent;
				diagram.focusBox.dragProxy.hide();
				return false;
			}

			//console.log('nx, ny, nW, nH = '+[nx,ny,nWidth,nHeight]);

			if (this.attr("cursor") === 'crosshair') {

				var angle = this.angle;
				/** @event */
				diagram.fireEvent("uinodedragbeforerotate", node, angle);
				/** @class JSD.diagram.Node
				 * @event
				 */
				node.fireEvent("uidragbeforerotate", node, angle);
				/** @class JSD.diagram.Diagram */

				node.render({
					rotate : angle
				});
				focusBox.tooltip.hide();

				/** @event */
				diagram.fireEvent("uinodedragrotate", node, angle);
				/** @class JSD.diagram.Node
				 * @event
				 */
				node.fireEvent("uidragrotate", node, angle);
				/** @class JSD.diagram.Diagram */

			} else {
				var box = focusBox;
				var dx = nx - box.ox;
				var dy = ny - box.oy;
				var dw = nWidth - box.oWidth;
				var dh = nHeight - box.oHeight;
				/** @event */
				diagram.fireEvent("uinodedragbeforeresize", node, nx, ny, nWidth, nHeight, dx, dy, dw, dh);
				/** @class JSD.diagram.Node */
				/** @event */
				node.fireEvent("uidragbeforeresize", node, nx, ny, nWidth, nHeight, dx, dy, dw, dh);
				/** @class JSD.diagram.Diagram */

				node.setPosition([nx, ny, nWidth, nHeight]);

				/** @event */
				diagram.fireEvent("uinodedragresize", node, nx, ny, nWidth, nHeight, dx, dy, dw, dh);
				/** @class JSD.diagram.Node */
				/** @event */
				node.fireEvent("uidragresize", node, nx, ny, nWidth, nHeight, dx, dy, dw, dh);
				/** @class JSD.diagram.Diagram */

			}

			diagram.focusBox.setPosition(nx, ny, nWidth, nHeight, this.parentObj);

			diagram.focusBox.dragProxy.hide();
			node.focus();
			JSD.actionInProgress = "";
		}

		focusBox.n.drag(shapeResizeMove, shapeResizeStart, shapeResizeStop);
		focusBox.s.drag(shapeResizeMove, shapeResizeStart, shapeResizeStop);
		focusBox.e.drag(shapeResizeMove, shapeResizeStart, shapeResizeStop);
		focusBox.w.drag(shapeResizeMove, shapeResizeStart, shapeResizeStop);
		focusBox.nw.drag(shapeResizeMove, shapeResizeStart, shapeResizeStop);
		focusBox.ne.drag(shapeResizeMove, shapeResizeStart, shapeResizeStop);
		focusBox.sw.drag(shapeResizeMove, shapeResizeStart, shapeResizeStop);
		focusBox.se.drag(shapeResizeMove, shapeResizeStart, shapeResizeStop);
		focusBox.spinner.drag(shapeResizeMove, shapeResizeStart, shapeResizeStop);
		focusBox.spinner.mousedown(function(event) {

			this.cx = this.attr("cx");
			this.cy = this.attr("cy");
			this.targetX = focusBox.target.getX();
			this.targetY = focusBox.target.getY();
			this.targetCx = focusBox.target.getCx();
			this.targetCy = focusBox.target.getCy();
			this.targetR = focusBox.target.rotate;
			if (this.targetR) {
				var rcoords = Raphael.transformPath("M"+this.cx+","+this.cy, "R"+this.targetR+","+this.targetCx+","+this.targetCy)[0];
				this.cx = rcoords[1];
				this.cy = rcoords[2];
			}
		});

		focusBox.setPosition = function(focusX, focusY, focusWidth, focusHeight, node, r, outlineOnly) {

			//this.labelEl.stop().animate(node.animAttr.lAttr, d.animateRenderDuration, d.animateRenderEasing);
			//remove the highlight
			if (diagram.highlightBox) {
				delete diagram.highlightedContainer;
				diagram.highlightBox.remove();
				diagram.highlightBox = null
			}

			if (node) {
				var nodeEditor = node.editor;
				var fbAttrs = {
					//fill: "#cccccc",
					cursor : ""
				};
				focusBox.e.attr(fbAttrs);
				focusBox.w.attr(fbAttrs);
				focusBox.n.attr(fbAttrs);
				focusBox.s.attr(fbAttrs);
				focusBox.ne.attr(fbAttrs);
				focusBox.nw.attr(fbAttrs);
				focusBox.se.attr(fbAttrs);
				focusBox.sw.attr(fbAttrs);

				if (nodeEditor.allowResizeH) {

					focusBox.e.attr({
						//fill: "#00FFFF",
						cursor : "e-resize"
					});
					focusBox.w.attr({
						//fill: "#00FFFF",
						cursor : "w-resize"
					});
				}
				if (nodeEditor.allowResizeV) {
					focusBox.n.attr({
						//fill: "#00FFFF",
						cursor : "n-resize"
					});
					focusBox.s.attr({
						//fill: "#00FFFF",
						cursor : "s-resize"
					});
				}

				if (nodeEditor.allowResize) {
					focusBox.nw.attr({
						//fill: "#00FFFF",
						cursor : "nw-resize"
					});
					focusBox.ne.attr({
						//fill: "#00FFFF",
						cursor : "ne-resize"
					});
					focusBox.sw.attr({
						//fill: "#00FFFF",
						cursor : "sw-resize"
					});
					focusBox.se.attr({
						//fill: "#00FFFF",
						cursor : "se-resize"
					});
				}

				//}
			}

			var t = "";
			if (focusBox.target.allowRotate) {
				r = ( typeof r !== "number") ? ( node ? node.rotate : 0) : r;
				focusBox.r = r;
				var cx = (focusX !== null && focusWidth != null) ? (focusX + (focusWidth / 2)) : focusBox.spinner.targetCx;
				var cy = (focusY !== null && focusHeight != null) ? (focusY + (focusHeight / 2)) : focusBox.spinner.targetCy;
				t = "R" + r + "," + cx + "," + cy;
			}

			if (focusX !== null && focusY !== null && focusWidth !== null && focusHeight !== null) {
				focusBox.x = focusX;
				focusBox.y = focusY;
				focusBox.width = focusWidth;
				focusBox.height = focusHeight;

				focusBox.outline.attr({
					x : focusX,
					y : focusY,
					width : focusWidth,
					height : focusHeight
				}).show();

				if (outlineOnly) {
					focusBox.outline.attr({
						stroke : "#000000"
					})
					/*focusBox.spinner.hide();
					 focusBox.e.hide();
					 focusBox.w.hide();
					 focusBox.n.hide();
					 focusBox.s.hide();
					 focusBox.ne.hide();
					 focusBox.nw.hide();
					 focusBox.se.hide();
					 focusBox.sw.hide();
					 */
				} else {
					focusBox.outline.attr(diagram.editor.outline);

					focusBox.spinner.attr({
						cx : focusX + (focusWidth / 2),
						cy : focusY - 20
						//width : pix / 2,
						//height : pix / 2
					});
					focusBox.nw.attr({
						cx : focusX,
						cy : focusY
						//width : pix / 2,
						//height : pix / 2
					});
					focusBox.n.attr({
						x : focusX + (focusWidth / 2) - pix / 2,
						y : focusY - pix / 2
						//width : pix,
						//height : pix
					});
					focusBox.ne.attr({
						cx : focusX + focusWidth,
						cy : focusY
						//width : pix / 2,
						//height : pix / 2
					});
					focusBox.w.attr({
						x : focusX - pix / 2,
						y : focusY + (focusHeight / 2) - pix / 2
						//width : pix,
						//height : pix
					});
					focusBox.e.attr({
						x : focusX + focusWidth - pix / 2,
						y : focusY + (focusHeight / 2) - pix / 2
						//width : pix,
						//height : pix
					});
					focusBox.sw.attr({
						cx : focusX,
						cy : focusY + focusHeight
						//width : pix / 2,
						//height : pix / 2
					});
					focusBox.s.attr({
						x : focusX + (focusWidth / 2) - pix / 2,
						y : focusY + focusHeight - pix / 2
						//width : pix,
						//height : pix
					});
					focusBox.se.attr({
						cx : focusX + focusWidth,
						cy : focusY + focusHeight
						//width : pix / 2,
						//height : pix / 2
					});
				}
			}

			focusBox.outline.transform(t);
			if (!outlineOnly) {
				focusBox.spinner.transform(t);
				focusBox.e.transform(t);
				focusBox.w.transform(t);
				focusBox.n.transform(t);
				focusBox.s.transform(t);
				focusBox.ne.transform(t);
				focusBox.nw.transform(t);
				focusBox.se.transform(t);
				focusBox.sw.transform(t);
			}

			focusBox.all.show();
			if (!focusBox.target.allowRotate) {
				focusBox.spinner.hide()
			}
		};

		//create newConnectionIcons

		var newLinks = {};
		var nlShape = "l10,-5 l-3,5 l3,5 l-10,-5";
		var nlspc = 5;
		//var nl = newLinks;

		//newLinks.auto = diagram.sheet.path("M0,0").attr({fill: '#aaa'});
		/*newLinks.top = diagram.sheet.path("M0,0").attr({fill: '#aaa'}).hide();
		 newLinks.bottom = diagram.sheet.path("M0,0").attr({fill: '#aaa'}).hide();
		 newLinks.left = diagram.sheet.path("M0,0").attr({fill: '#aaa'}).hide();
		 newLinks.right = diagram.sheet.path("M0,0").attr({fill: '#aaa'}).hide();
		 */

		newLinks.init = function() {

			var defaultEdgeType;
			if (diagram.edgeDefaults) {
				defaultEdgeType = diagram.edgeDefaults.edgeType || "straight";
			}
			newLinks.all = diagram.sheet.set();

			newLinks.center = new JSD.diagram._TempEdge({
				renderTo : diagram.id,
				fromPort : 'auto',
				toPort : 'bottom',
				edgeType : defaultEdgeType,
				arrowHeadShape : 9
			});
			newLinks.all.push(newLinks.center.arrowHead);
			//newLinks.center.arrow.scale(1.2, 1.2);
			//dk 19/11/2012
			/*
			 newLinks.top = new JSD.diagram._TempEdge({
			 renderTo : diagram.id,
			 exitSide : 'top',
			 entrySide : 'bottom',
			 edgeType : defaultEdgeType,
			 arrowHeadShape : 1
			 });
			 newLinks.all.push(newLinks.top.arrowHead);

			 newLinks.bottom = new JSD.diagram._TempEdge({
			 renderTo : diagram.id,
			 exitSide : 'bottom',
			 entrySide : 'top',
			 edgeType : defaultEdgeType,
			 arrowHeadShape : 1
			 });
			 newLinks.all.push(newLinks.bottom.arrowHead);

			 newLinks.left = new JSD.diagram._TempEdge({
			 renderTo : diagram.id,
			 exitSide : 'left',
			 entrySide : 'right',
			 edgeType : defaultEdgeType,
			 arrowHeadShape : 1
			 });
			 newLinks.all.push(newLinks.left.arrowHead);

			 newLinks.right = new JSD.diagram._TempEdge({
			 renderTo : diagram.id,
			 exitSide : 'right',
			 entrySide : 'left',
			 edgeType : defaultEdgeType,
			 arrowHeadShape : 1
			 });
			 newLinks.all.push(newLinks.right.arrowHead);
			 //dk 19/11/2012
			 */

		}

		newLinks.show = function(item) {

			newLinks.all.hide();
			var x, y;
			var defaultEdgeType;
			if (diagram.edgeDefaults) {
				defaultEdgeType = diagram.edgeDefaults.edgeType || "straight";
			}

			for (var portname in item.ports) {
				if (item.ports.hasOwnProperty(portname)) {
					var port = item.ports[portname];
					if (port) {
						if (!newLinks[portname]) {
							newLinks[portname] = new JSD.diagram._TempEdge({
								renderTo : diagram.id,
								//exitSide : 'top',
								//entrySide : 'bottom',
								edgeType : defaultEdgeType,
								arrowHeadShape : 1
							});
							newLinks.all.push(newLinks[portname].arrowHead);
						}
						var lnk = newLinks[portname];
						var portCoords = item.getConnectionCoords(portname);
						var x = portCoords[0];
						var y = portCoords[1];
						var side = portCoords[2];
						var cfg = {
							fromNode : item,
							edgeType : defaultEdgeType
						}

						if (portname === "center") {
							cfg.fromNode = [x, y]
							cfg.toNode = [x, y];
							cfg.fromPort = 'auto';
							cfg.toPort = 'bottom';
						} else {
							cfg.fromPort = portname;
							lnk.fromPort = portname;
							switch(side) {
								case "left" :
									cfg.toNode = [x - 15, y];
									cfg.toPort = 'right';
									break
								case "right" :
									cfg.toNode = [x + 15, y];
									cfg.toPort = 'left';
									break
								case "top" :
									cfg.toNode = [x, y - 15];
									cfg.toPort = 'bottom';
									break
								case "bottom" :
									cfg.toNode = [x, y + 15];
									cfg.toPort = 'top';
									break
							}
						}
						lnk.toPort = cfg.toPort;
						lnk.setConnection(cfg).all.toFront();
						lnk.parentItem = item;
						lnk.arrowHead.show();
					}
				}
			}

			/* dk 19/11/2012
			 //center
			 x = item.getCx();
			 y = (item.getCy());
			 newLinks.center.setConnection({
			 fromNode : [item.getCx(), item.getCy()],
			 toNode : [x, y],
			 edgeType : defaultEdgeType
			 }).all.toFront();
			 newLinks.center.parentItem = item;

			 //top
			 x = item.getCx();
			 y = (item.getY() - 15);
			 newLinks.top.setConnection({
			 fromNode : item,
			 toNode : [x, y],
			 edgeType : defaultEdgeType
			 }).all.toFront();
			 newLinks.top.parentItem = item;

			 //bottom
			 x = item.getCx();
			 y = (item.getBottom() + 15);
			 newLinks.bottom.setConnection({
			 fromNode : item,
			 toNode : [x, y],
			 edgeType : defaultEdgeType
			 }).all.toFront();
			 newLinks.bottom.parentItem = item;

			 //left
			 x = (item.getX() - 15);
			 y = item.getCy();
			 newLinks.left.setConnection({
			 fromNode : item,
			 toNode : [x, y],
			 edgeType : defaultEdgeType
			 }).all.toFront();
			 newLinks.left.parentItem = item;

			 //right
			 x = (item.getRight() + 15)
			 y = item.getCy();
			 newLinks.right.setConnection({
			 fromNode : item,
			 toNode : [x, y],
			 edgeType : defaultEdgeType
			 }).all.toFront();
			 newLinks.right.parentItem = item;

			 if (item.connectionsFrom || item.connectionsTo) {
			 var excludeArray = [];

			 var cons = item.connectionsFrom;
			 if (item.connectionsFrom) {
			 if (cons.length > 0) {
			 for (var i = 0; i < cons.length; i++) {
			 var c = cons[i];
			 if (c.fromNode === item) {
			 excludeArray.push(c.getExitSide())
			 }
			 }
			 }
			 }
			 if (item.connectionsTo) {
			 var cons = item.connectionsTo;
			 if (cons.length > 0) {
			 for (var i = 0; i < cons.length; i++) {
			 var c = cons[i];
			 if (c.toNode === item) {
			 excludeArray.push(c.getEntrySide())
			 }
			 }
			 }
			 }
			 JSD.arrayIndexOf(excludeArray, "top") === -1 ? newLinks.top.arrowHead.show() : "";
			 JSD.arrayIndexOf(excludeArray, "bottom") === -1 ? newLinks.bottom.arrowHead.show() : "";
			 JSD.arrayIndexOf(excludeArray, "left") === -1 ? newLinks.left.arrowHead.show() : "";
			 JSD.arrayIndexOf(excludeArray, "right") === -1 ? newLinks.right.arrowHead.show() : "";
			 newLinks.center.arrowHead.show();
			 } else {
			 newLinks.all.show();
			 //newLinks.all.animate(attrOn, 2000);
			 }
			 dk 19/11/2012
			 */

			if (JSD.timer) {
				clearTimeout(JSD.timer);
			}
			JSD.timer = setTimeout("JSD.getDiagram('" + diagram.getId() + "').newLinks.all.hide()", 2000);
		}

		newLinks.showSingle = function(x, y) {
			var defaultEdgeType;
			if (diagram.edgeDefaults) {
				defaultEdgeType = diagram.edgeDefaults.edgeType || "straight";
			}
			newLinks.right.hide();
			newLinks.left.hide();
			newLinks.top.hide();
			newLinks.bottom.hide();
			newLinks.center.setConnection({
				fromNode : [x, y],
				toNode : [x, y],
				edgeType : defaultEdgeType
			}).all.toFront();
			//newLinks.center.setEdgeType(defaultEdgeType);
			//newLinks.center.parentItem = item;
			newLinks.center.parentItem = null;
			newLinks.center.arrowHead.show();
		};

		newLinks.hide = function() {
			//console.log('newLinks.hide');
			newLinks.all.animate({
				"fill-opacity" : 0
				//"stroke-opacity": 0
			}, 1000, function() {
				newLinks.all.hide()
			});
		}
		//this.arrowHead.attr({path: "M" + x2 + "," + y2 + " " + arrowHeadPath}).show();

		diagram.focusBox = focusBox;
		diagram.focusEdge = focusEdge;
		diagram.newLinks = newLinks;
		diagram.newLinks.init();
	},

	/** @cfg*/
	autoResize : true,

	/** @method
	 * Adds a component (<code>item</code>) to the diagram. If you pass a reference to an existing component, this will be added to the diagram.  If you pass a
	 * _configuration object, a new component will be created and added to the diagram. Fires the {@link #beforeadd} event before the
	 * _component is added and then fires the {@link #event-add} event when complete.
	 * @param {Mixed} item The item you wish to add to the diagram.  This can be either a reference to an existing component which is
	 * _alreaady rendered or a config object which describes the component you wish to create.  Remember that
	 * _the config must contain a value for either the {@link JSD.diagram.Component#className} or {@link JSD.diagram.Component#cmpType} so
	 * _that the renderer knows what type of componenet to create.  See also {@link #addNode}, {@link #addEdge}, {@link #addContainer}.
	 */
	add : function(item) {
		//already added?
		if (item.parent === this) {
			//console.log('already added to diagram - '+(item.label||item.title));
			return item;
		}

		var val;

		/** @event */
		var success = this.fireEvent("beforeadd", this, item);
		//container's beforeadd event - handlers are passed 2 params - 1. container, 2. item to remove
		if ( typeof success === "boolean" && !success) {
			return false;
		}
		if (!item.rendered) {
			val = this._addNew(item);
		} else {
			if (item.parent) {
				//console.log("parent="+item.parent+ "me="+item.label);
				if (item.parent.remove) {
					item.parent.remove(item, false);
				}
			}
			val = this._addExisting(item);
		}
		/**
		 * @event
		 * Fired after a component has been added to this diagram. See the {@link JSD.diagram.Diagram#add} method above for more details.
		 */
		this.fireEvent("add", this, item);
		return val
	},

	/** @method */
	addNode : function(cfg) {
		cfg.cmpType = "node";
		this.add(cfg);
	},

	/** @method */
	addEdge : function(cfg) {
		cfg.cmpType = "edge";
		this.add(cfg);
	},

	/** @method */
	addContainer : function(cfg) {
		cfg.cmpType = "container";
		this.add(cfg);
	},

	_addNew : function(item) {

		var x;
		var cmpType = item.cmpType;
		//console.dir(item);
		if (!cmpType) {
			if (item.shape) {
				if (item.stencil) {
					stencil = this.getStencil(item.stencil)
					cmpType = stencil.getShape(item.shape).shapeConfig.cmpType;
				} else {
					cmpType = this.getShape(item.shape).shapeConfig.cmpType;
				}
			}
		}

		if (cmpType) {
			JSD.renderTo = this;
			item.cmpType = cmpType;
			x = JSD.create(item);
			JSD.renderTo = null;
			/*switch (cmpType) {
			 case "node":
			 JSD.renderTo = this;
			 x = new JSD.diagram.Node(item);
			 //x.parent = this;
			 //this.items.push(x);
			 break;
			 case "container":
			 JSD.renderTo = this;
			 x = new JSD.diagram.Container(item);
			 //x.parent = this;
			 //this.items.push(x);
			 break;
			 case "edge":
			 JSD.renderTo = this;
			 x = new JSD.diagram.Edge(item);
			 //x.parent = this;
			 //this.items.push(x);
			 break;
			 }
			 */
		} else {
			JSD.renderTo = this;
			x = new JSD.diagram.Node(item);
			JSD.renderTo = null;
			//x.parent = this;
			//this.items.push(x);
		}
		return x;
	},

	_addExisting : function(item) {
		// this fn does not remove the item from it's current container
		// so you MUST call this.parent.remove (or _remove) before you call _addExisting
		//item.parent.remove(item, false);
		item.parent = this;
		this.items.push(item);

		for (var i = 0; i < item.all.length; i++) {
			//console.log(i);
			item.all[i].toFront();
		}
		if (item.isCmpType('container') && item.items) {
			if (item.items.length > 0) {
				for (var i = 0; i < item.items.length; i++) {
					for (var j = 0; j < item.items[i].all.length; j++) {
						item.items[i].all[j].toFront();
						item.items[i]._connectionsToFront();
					}
				}
			}
		}
		return item;
	},

	/**
	 * @method remove
	 * Removes an item from this container. Fires the {@link #beforeremove} event before removing, then fires the {@link #event-remove} event after the item has been removed.
	 * @param {Node/Edge} cmp The component to be removed
	 * @param {Boolean} destroy (optional)
	 * @return {Node/Edge} cmp The component that was removed
	 */
	/**
	 * @event beforeremove
	 * Fires before any component (node or edge) is removed from the container. A handler can return false to cancel the remove. See the {@link JSD.diagram.Diagram#remove} method above for more details.
	 * @param {Diagram} diagram
	 * @param {Node/Edge} cmp
	 */

	remove : function(item, destroy) {
		var success = this.fireEvent("beforeremove", this, item);
		//container's beforeremove event - handlers are passed 2 params - 1. container, 2. item to remove
		if (success === false) {
			return false;
		}
		var val = this._remove(item, destroy);

		/**
		 * @event
		 * Fires after a component has been removed from the diagram.  See the {@link JSD.diagram.Diagram#remove} method above for more details.
		 */
		this.fireEvent("remove", this, item);
		return val
	},

	_remove : function(item, destroy) {
		var ind = JSD.arrayIndexOf(this.items, item);
		if (ind !== -1) {
			//console.log('inc');
			this.items.splice(ind, 1);
			//item.parent = item.diagram;
		}
		if (destroy) {
			//item.destroy()
			return false
		} else {
			return item
		}
	},

	_insert : function(num, item) {
		// silent insert
		// this fn does not remove the item from it's current container
		// so you MUST call this.parent.remove (or _remove) before you call _insert

		// make sure we don't get empty items in the array
		num = Math.min(num, this.items.length);
		item.parent = this;
		if (this.items.length === num) {
			this.items.push(item);
			for (var i = 0; i < item.all.length; i++) {
				item.all[i].toFront();
			}
			if (item.isCmpType('container') && item.items.length > 0) {
				for (var i = 0; i < item.items.length; i++) {
					item.items[i].toFront();
				}
			}
		} else {
			var x = this.items[num].all[0];
			for (var i = 0; i < item.all.length; i++) {
				item.all[i].insertBefore(x);
			}
			this.items.splice(num, 0, item)
		}

		return item;
	},

	insert : function(num, item) {
		//inserts an existing child node/edge if this node is a container
		//num is optional - default will append item to end of 'items' array
		//if ((item.isNode || item.isCmpType('edge'))) {

		var success = this.fireEvent("beforeadd", this, item);
		//container's beforeadd event - handlers are passed 2 params - 1. container, 2. item to remove
		if ( typeof success === "boolean" && !success) {
			return false;
		}
		item.parent.remove(item, false);
		var val = this._insert(num, item);
		this.fireEvent("add", this, item);
		return val
	},
	/** @method */
	destroyItem : function(item) {
		for (var i = 0; i < this.all.length; i++) {
			var x = this.items[i];
			x.remove();
		}
	},

	unHighlightContainer : function() {
		if (this.highlightBox) {
			delete this.highlightedContainer;
			delete this.targetContainer;
			this.highlightBox.remove();
			this.highlightBox = null
		}
	}
})

//=================================        NODE API        =====================================
/**
 * @class JSD.diagram.Node
 * @extends JSD.diagram.Component
 */

/**
 * @event resizeDrag Fires before an element resize drag event begins
 * @param {string} cursor The cursor attribute indicating the direction of the resize
 * The handler must return TRUE inorder to continue the event
 */

/**
 * @event resizeDragMove Fires during the resize of an element but before the resize has finished
 * @param {number} dx The number of pixels of movement in the x axis from the beginning of the drag
 * @param {number} dy The number of pixels of movement in the y axis from the beginning of the drag
 * The handler must return TRUE inorder to continue the event
 */

/**
 * @event resizeDragStop Fires when the resize drag event ends but before the element is actually resized.
 * @param {array} [newDimensions] An array containing the proposed new dimensions of the element
 * This event allows the interception of a resize event.  A handler attached to this event can prevent the element from being resized by simply returning FALSE.
 * The handler must return TRUE inorder to continue the event
 */

JSD.define({
	className : "JSD.diagram.Node",
	extend : "JSD.diagram.Component",
	cmpType : 'node',

	constructor : function(cfg) {
		this.initialConfig = cfg;
		this.currentConfig = JSD.clone(this.initialConfig);

		this.render(cfg);

		//add to container if necessary

		if (cfg.parentId) {

			//console.log('cfg.parent = '+cfg.parentId);
			var parentNode = this.diagram.getNode(cfg.parentId);
			if (parentNode) {
				this.parent = parentNode;
				parentNode.items.push(this)
			} else {
				this.parent = this.diagram;
				diagram.items.push(this);
			}
			delete this.currentConfig.parentId;
		} else {
			//console.log('no cfg.parentId - ' + (cfg.label || cfg.title))
			this.parent = this.diagram;
			this.diagram.items.push(this);
		}

	},

	/** @method
	 * This method is called automatically during component creation.  However, it can be called again after creation with a new set of configuration options
	 * _to rebuild the component.
	 * @param {Object} cfg Configuration options
	 */
	render : function(cfg, rebuild) {
		if (rebuild) {
			this.currentConfig = JSD.clone(this.initialConfig);
			//now reset all property values to their default
			var list = JSD[this.cmpType + "ConfigList"] || JSD.nodeConfigList;
			var props = list.split(",");
			for (var i = 0; i < props.length; i++) {
				var p = props[i];
				this[p] = this.getDefault(p);
			}
		}
		//need to make sure that any cfg options which are OBJECTS (eg. labelConfig) are not overwritten in currentConfig
		for (var name in cfg) {
			if (name !== "items") {
				if (JSD.isObject(cfg[name])) {
					if (cfg.hasOwnProperty(name)) {
						if (this.currentConfig[name]) {
							cfg[name] = JSD.apply(this.currentConfig[name], cfg[name]);
						}
					}
				}
			}
		}
		var thisNode = this;
		var cc = this.getCurrentConfig ? this.getCurrentConfig() : this.currentConfig;
		cfg = (!cfg ? cc : (JSD.apply(cc, cfg)));

		if (cfg.renderTo) {
			if ( typeof cfg.renderTo === "string") {
				var diagramId = cfg.renderTo;

				this.diagram = JSD.getDiagram(diagramId);
			} else {
				this.diagram = cfg.renderTo;
				//delete this.renderTo;
			}
		}
		if (!this.diagram) {
			this.diagram = JSD.renderTo;
		}

		/**
		 * @property {Diagram} diagram
		 * A reference to this component's owner {@link JSD.diagram.Diagram}.
		 */
		var diagram = this.diagram;
		diagram._animateRenderNodeTotal += 1;

		//3. apply Stencil settings
		/**
		 * @cfg {String} shape
		 * Optional. The name of the {@link JSD.stencil.Shape Shape} from which additional configuration options will be applied to this component.
		 * _If a {@link JSD.stencil.Shape shape} is included, the {@link JSD.diagram.Diagram Diagram} must have a {@link JSD.stencil.Stencil Stencil} defined.
		 */

		/**
		 * @cfg {String} stencil
		 * Optional. The name of the {@link JSD.stencil.Stencil Stencil} which holds the {@link JSD.stencil.Shape Shape} definition from which additional configuration options will be applied to this component.
		 * _If a stencil config is included, a {@link #shape} config must also be included. The {@link JSD.diagram.Diagram Diagram} must have a {@link JSD.stencil.Stencil Stencil} defined.
		 */
		if (cfg.shape) {
			//console.log(1, this.id, this.strokeWidth);
			//console.log('1cc', this.id, this.currentConfig.strokeWidth);
			if (cfg.stencil) {
				this.stencil = diagram.getStencil(cfg.stencil)
				this.shape = this.stencil.getShape(cfg.shape)
			} else {
				this.shape = this.diagram.getShape(cfg.shape);
			}
			var stencil = this.stencil;
			var shape = this.shape;
			JSD.apply(this, JSD.clone(this.shape.shapeConfig));
			//console.log(2, this.id, this.strokeWidth);
			//console.log('2cc', this.id, this.currentConfig.strokeWidth);
			//cfg.cmpType can be removed as long as cmpType is included on shape definition
			if (this.shape.shapeConfig.cmpType) {
				delete this.currentConfig.cmpType
			}
			//shapeConfig.data will have over-written initialConfig.data
			//so now we must re-apply initialConfig.data
			//if (this.initialConfig.data) {
			//	this.data = JSD.clone(this.initialConfig.data);
			//}

		}

		if (this.oldShape) {
			if (this.oldShape !== this.shape || this.oldStencil !== this.stencil) {
				//if shape has changed, we need to reset all previous shape properties to their default value;

				if (this.graphic) {
					for (var name in this.oldShape.shapeConfig) {
						this[name] = this.getDefault(name);
					}
				}
			}
		}
		this.oldShape = this.shape;
		this.oldStencil = this.stencil || null;

		//2. apply diagram settings
		var defaults = diagram[this.cmpType + 'Defaults'];
		if (defaults && !this.ignoreDefaults) {
			JSD.apply(this, defaults);
		};

		var oldWidth = this.width;
		//used for PATH calculations
		var oldHeight = this.height;

		//need to capture the items array before it gets overwritten by cfg.items
		//this is used later for 'containers'

		this.oldItems = this.items

		JSD.diagram.Node.superclass.constructor.call(this, cfg);

		/**
		 * @property {Shape} shape
		 * If this component was created using a {@link #cfg-shape} config option, the <tt>shape</tt> property will hold a reference to the {@link JSD.stencil.Shape Shape} component.
		 */

		/**
		 * @property {Stencil} stencil
		 * If this component was created using a {@link #cfg-shape} config option, the <tt>stencil</tt> property will hold a reference to the {@link JSD.stencil.Stencil Stencil} which contains the {@link JSD.stencil.Shape Shape}.
		 */

		//we need to re-apply 'shape' to this object because it get's removed in baseclass.init();
		this.stencil = stencil;
		this.shape = shape;

		/**
		 * @cfg {Object} data
		 */

		/**
		 * @property {Object} data
		 *
		 */

		if (this.data) {
			this.currentConfig.data = this.data;
		}
		//if (diagram.nodeDefaults) {
		//	if(diagram.nodeDefaults.listeners){
		//		this.addListener(diagram.nodeDefaults.listeners)
		//	}
		//};

		this.editor = {};

		var editorDefaults = {
			animateMove : false,
			allowResize : true,
			allowResizeH : true,
			allowResizeV : true,
			allowMove : true,
			allowConnection : true,
			allowHtmlEdit : true
		};
		//console.log(3, this.id, this.strokeWidth);
		//console.log('3cc', this.id, this.currentConfig.strokeWidth);
		this.fill = ( typeof this.fill === "string" && this.fill.toLowerCase() == "none") ? "none" : this.fill;
		//console.log(4, this.id, this.strokeWidth);
		//console.log('4cc', this.id, this.currentConfig.strokeWidth);
		this.stroke = ( typeof this.stroke === "string" && this.stroke.toLowerCase() == "none") ? "none" : this.stroke;

		JSD.apply(this.editor, editorDefaults);

		var bgAttr = {
			"fill-opacity" : 0,
			fill : "#ff0000",
			"stroke-opacity" : 0
		}
		var sAttr = {
			fill : this.shadowFill,
			"fill-opacity" : this.shadowOpacity,
			stroke : this.shadowFill,
			"stroke-opacity" : this.shadowOpacity
		}
		this.type = this.graphicType || this.type;

		if (this.type !== "image") {
			var gAttr = {
				//stroke : this.stroke,
				"stroke-opacity" : this.strokeOpacity,
				"stroke-dasharray" : this.strokeDasharray,
				"stroke-width" : this.strokeWidth,
				//fill : this.fill,
				"fill-opacity" : this.fillOpacity
			}
		} else {
			var gAttr = {}
		}

		gAttr.transform = "";
		sAttr.transform = "";

		//if oldfill is 'none' and newfill is 'none', Raphael will flash 'black' when animating
		//so, we only apply/animate fill and stroke if the colour has changed
		var oldFill = (this.graphic) ? this.graphic.attr('fill') : false;
		var oldStroke = (this.graphic) ? this.graphic.attr('stroke') : false;

		if (this.fill !== oldFill) {
			gAttr.fill = this.fill
		}
		if (this.stroke !== oldStroke) {
			gAttr.stroke = this.stroke
		}
		//this.oldFill = this.fill
		//this.oldStroke = this.stroke

		/**
		 * @cfg {String} type
		 * Defines the graphic type of this node.  This option determines which
		 * _RaphaelJS.Element type will be created as the primary graphic element of the node.
		 *
		 * Accepts one of the following values:
		 * <ul>
		 * <li>ellipse <div>Creates a Raphael.ellipse element.  The renderer expects either {@link #rx} and {@link #ry} or {@link #width} and {@link #height} config options.</div></li>
		 * <li>rect <div>Creates a Raphael.rect element.  The renderer expects {@link #width} and {@link #height} config options.</div></li>
		 * <li>path <div>Creates a Raphael.path element.  The renderer expects {@link #path} and also {@link #width} and {@link #height} config options.</div></li>
		 * <li>image <div>Creates a Raphael.image element.  The renderer expects {@link #src} and also {@link #width} and {@link #height} config options.</div></li>
		 * </ul>
		 */

		var textX, textY;

		//this.all = this.all || diagram.sheet.set();
		this.all = diagram.sheet.set();

		if (this.oldType !== this.type) {
			// node has been created already with a different graphicType so remove the old graphic if it exists
			if (this.graphic) {
				if (this.oldType === "ellipse") {
					var oldCx, oldCy, oldRx, oldRy;
					oldCx = this.graphic.attr("cx");
					oldCy = this.graphic.attr("cy");
					oldRx = this.graphic.attr("rx");
					oldRy = this.graphic.attr("ry");
					if (!this.currentConfig.x) {
						this.x = this.currentConfig.x = oldCx - oldRx;
					}
					if (!this.currentConfig.y) {
						this.y = this.currentConfig.y = oldCy - oldRy;
					}
					if (!this.currentConfig.width) {
						this.width = this.currentConfig.width = oldRx * 2;
					}
					if (!this.currentConfig.height) {
						this.height = this.currentConfig.height = oldRy * 2;
					}
					delete this.cx;
					delete this.cy;
					delete this.rx;
					delete this.ry;
					delete this.currentConfig.cx;
					delete this.currentConfig.cy;
					delete this.currentConfig.rx;
					delete this.currentConfig.ry;
				}

				if (this.type === "ellipse") {
					if (!this.currentConfig.cx) {
						this.cx = this.currentConfig.cx = this.x + (this.width / 2);
					}
					if (!this.currentConfig.cy) {
						this.cy = this.currentConfig.cy = this.y + (this.height / 2);
					}
					if (!this.currentConfig.rx) {
						this.rx = this.currentConfig.rx = (this.width / 2);
					}
					if (!this.currentConfig.ry) {
						this.ry = this.currentConfig.ry = (this.height / 2);
					}
					delete this.currentConfig.x;
					delete this.currentConfig.y;
					delete this.currentConfig.width;
					delete this.currentConfig.height;
				}
				this.graphic.remove();
				delete this.graphic;
				if (this.shadowEl) {
					this.shadowEl.remove();
					delete this.shadowEl;
				}
				this._graphicCreated = false;
			}
		}

		/*var props = [];
		 for (x in this){
		 if(this.hasOwnProperty(x)){
		 props.push(x);
		 }
		 }
		 console.dir(props.sort());
		 */

		if (this.width) {
			this.width = this.currentConfig.width = Math.min(this.maxWidth, Math.max(this.minWidth, this.width));
		}
		if (this.height) {
			this.height = this.currentConfig.height = Math.min(this.maxHeight, Math.max(this.minHeight, this.height));
		}
		if (this.rx) {
			this.rx = this.currentConfig.rx = Math.min(this.maxWidth / 2, Math.max(this.minWidth / 2, this.rx));
		}
		if (this.ry) {
			this.ry = this.currentConfig.ry = Math.min(this.maxHeight / 2, Math.max(this.minHeight / 2, this.ry));
		}

		switch (this.type) {

			case "ellipse":
				gAttr.rx = this.rx || this.width / 2;
				gAttr.ry = this.ry || this.height / 2;
				gAttr.cx = this.cx || this.x + this.rx;
				gAttr.cy = this.cy || this.y + this.ry;

				//background
				bgAttr.rx = gAttr.rx + 10;
				bgAttr.ry = gAttr.ry + 10;
				bgAttr.cx = gAttr.cx;
				bgAttr.cy = gAttr.cy;
				//this.background = diagram.sheet.ellipse(cx, cy, rx + 10, ry + 10).hide();
				this.background = this.background || diagram.sheet.ellipse().hide();
				this.background.attr(bgAttr);

				//shadow
				if (this.shadow) {
					sAttr.rx = gAttr.rx;
					sAttr.ry = gAttr.ry;
					sAttr.cx = gAttr.cx + this.shadowOffset[0];
					sAttr.cy = gAttr.cy + this.shadowOffset[1];
					if (!this.shadowEl) {
						this.shadowEl = diagram.sheet.ellipse().hide();
						this.shadowEl.attr({
							cx : gAttr.cx + this.shadowOffset[0],
							cy : gAttr.cy + this.shadowOffset[1],
							rx : 0,
							ry : 0
						});
					}
				} else {
					if (this.shadowEl) {
						this.shadowEl.remove();
						delete this.shadowEl;
					}
				}

				//graphic
				this.graphic = this.graphic || diagram.sheet.ellipse().hide();
				if (!this._graphicCreated) {
					this.graphic.attr({
						cx : gAttr.cx,
						cy : gAttr.cy,
						rx : 0,
						ry : 0
					});
				}

				textX = gAttr.cx;
				textY = gAttr.cy;
				break;

			case "rect":
				var rnd = this.rounded;
				gAttr.x = this.x;
				gAttr.y = this.y;
				gAttr.width = Math.min(this.maxWidth, Math.max(this.minWidth, this.width));
				gAttr.height = Math.min(this.maxHeight, Math.max(this.minHeight, this.height));
				gAttr.r = this.rounded;

				if (this.shadow) {
					sAttr.x = this.x + this.shadowOffset[0];
					sAttr.y = this.y + this.shadowOffset[1];
					sAttr.width = this.width;
					sAttr.height = this.height;
					sAttr.r = this.rounded;

					if (!this.shadowEl) {
						this.shadowEl = this.shadowEl || diagram.sheet.rect().hide();
						this.shadowEl.attr({
							x : gAttr.x + this.shadowOffset[0],
							y : gAttr.y + this.shadowOffset[1],
							width : 0,
							height : 0
						});
					}
				} else {
					if (this.shadowEl) {
						this.shadowEl.remove();
						delete this.shadowEl;
					}
				}
				bgAttr.x = this.x - 10;
				bgAttr.y = this.y - 10;
				bgAttr.width = this.width + 20;
				bgAttr.height = this.height + 20;
				//this.background = diagram.sheet.rect(this.x - 10, this.y - 10, this.width + 20, this.height + 20, rnd).attr(bgAttr).hide();
				//this.graphic = diagram.sheet.rect(this.x, this.y, this.width, this.height, rnd).hide();
				this.background = this.background || diagram.sheet.rect().hide();
				this.background.attr(bgAttr).hide();
				this.graphic = this.graphic || diagram.sheet.rect().hide();
				if (!this._graphicCreated) {
					this.graphic.attr({
						x : gAttr.x,
						y : gAttr.y,
						width : 0,
						height : 0,
						fill : this.fill
					});
					delete gAttr.fill;
				}

				//this.background.toBack();
				textX = this.x + this.width / 2;
				textY = this.y + this.height / 2;
				break;

			case "path":
				var box = Raphael.pathBBox(this.path);

				this.pathWidth = Math.round(box.width);
				//this.pathWidth || this.width;
				this.pathHeight = Math.round(box.height);
				//this.pathHeight || this.height;
				bgAttr.x = this.x - 10;
				bgAttr.y = this.y - 10;
				bgAttr.width = this.width + 20;
				bgAttr.height = this.height + 20;
				if (this.shadow) {
					if (!this.shadowEl) {
						this.shadowEl = diagram.sheet.path().hide();
						this.shadowEl.attr(sAttr).hide();
						this.shadowEl.attr({
							path : "M" + (this.x + this.shadowOffset[0]) + "," + (this.y + this.shadowOffset[1])
							//path : this.path,
							//transform : "T" + (this.x + this.shadowOffset[0]) + "," + (this.y + +this.shadowOffset[1]) + "S0.1,0.1," + (this.x + this.shadowOffset[0]) + "," + (this.y + this.shadowOffset[1])
						});
						//this.shadowEl.translate(this.x + this.shadowOffset[0], this.y + this.shadowOffset[1]);

					}
					sAttr.path = this.path;
				} else {
					if (this.shadowEl) {
						this.shadowEl.remove();
						delete this.shadowEl;
					}
				}
				this.background = this.background || diagram.sheet.rect().hide();
				this.background.attr(bgAttr).hide();
				this.graphic = this.graphic || diagram.sheet.path().hide();

				//=====================================
				this.tmp = diagram.sheet.path().hide();
				this.tmp.attr({
					path : this.path
				});
				//console.log(this.graphic.attr("path"));

				var scale = {
					x : 1,
					y : 1
				};
				//console.log('oldWidth='+oldWidth);
				//console.log('this.width='+this.width);
				if (this.pathWidth) {
					scale.x = this.width / this.pathWidth
				}
				if (this.pathHeight) {
					scale.y = this.height / this.pathHeight
				}

				//this.graphic.attr({transform: "S"+scale.x+","+scale.y+",0,0T"+this.x+","+this.y});

				this.tmp.scale(scale.x, scale.y, 0, 0);
				//this.path = this.tmp.attr("path");
				this.tmp.translate(this.x, this.y);
				//gAttr.path = this.tmp.attr("path");
				gAttr.path = this.path;
				var ox = this.x;
				var oy = this.y;

				gAttr.transform = "T" + this.x + "," + this.y + "S" + scale.x + "," + scale.y + "," + ox + "," + oy;
				//gAttr.transform = "S" + scale.x + "," + scale.y+"T" + this.x + "," + this.y;
				sAttr.transform = "T" + (this.x + this.shadowOffset[0]) + "," + (this.y + +this.shadowOffset[1]) + "S" + scale.x + "," + scale.y + "," + (ox + this.shadowOffset[0]) + "," + (oy + this.shadowOffset[1]);
				//this.tmp.attr("transform");
				this.tmp.remove();
				//=====================================
				if (!this._graphicCreated) {
					//this.graphic.attr({path: "M" + (this.x + this.width / 2) + "," + (this.y + this.height / 2)});
					this.graphic.attr({
						path : "M" + (this.x) + "," + (this.y)
					});
				}

				if (this.freestyle) {
					/**
					 * @property {String} initialPath
					 * @private
					 * used only in conjunction with {@link JSD.diagram.Node} config and {@link JSD.diagram.Node#setFreestyle} method and {@link JSD.diagram.Node#getFreestyle getFreestyle} method
					 */
					this.initialPath = this.path;
					//this.path = this._getRandomPath(this.initialPath);
					var p = Raphael.transformPath(this.initialPath, "S" + scale.x + "," + scale.y + ",0,0").toString();

					//console.log(this._getStretchedPath(p));
					this.path = this._getRandomPath(p);
					//this.graphic.attr({path: this._getStretchedPath(p)});
					gAttr.path = this.path;
					//gAttr.transform = "T" + this.x + "," + this.y;
					gAttr.transform = "T" + this.x + "," + this.y + "S" + scale.x + "," + scale.y + "," + ox + "," + oy;
				} else {
					if (this.initialPath) {
						this.path = this.initialPath
					}
				}

				this.scale = scale;
				textX = this.x + this.width / 2;
				textY = this.y + this.height / 2;
				break;

			case "image":
				this.pathWidth = this.pathWidth || this.width;
				this.pathHeight = this.pathHeight || this.height;
				bgAttr.x = this.x - 10;
				bgAttr.y = this.y - 10;
				bgAttr.width = this.width + 20;
				bgAttr.height = this.height + 20;

				if (this.shadow) {
					sAttr.x = this.x + this.shadowOffset[0];
					sAttr.y = this.y + this.shadowOffset[1];
					sAttr.width = this.width;
					sAttr.height = this.height;
					//sAttr.r = this.rounded;

					if (!this.shadowEl) {
						this.shadowEl = this.shadowEl || diagram.sheet.rect().hide();
						this.shadowEl.attr({
							x : this.x + this.shadowOffset[0],
							y : this.y + this.shadowOffset[1],
							width : 0,
							height : 0
						});
					}
				} else {
					if (this.shadowEl) {
						this.shadowEl.remove();
						delete this.shadowEl;
					}
				}

				/*
				 if (this.shadow) {
				 sAttr.path = this.path;
				 this.shadowEl = this.shadowEl || diagram.sheet.path().hide();
				 this.shadowEl.attr(sAttr).hide();
				 this.shadowEl.translate(this.x + this.shadowOffset[0], this.y + this.shadowOffset[1])
				 } else {
				 if (this.shadowEl) {
				 this.shadowEl.remove();
				 delete this.shadowEl;
				 }
				 }
				 */
				this.background = this.background || diagram.sheet.rect().hide();
				this.background.attr(bgAttr).hide();
				this.graphic = this.graphic || diagram.sheet.image(this.src);
				//gAttr = {}; //need to remove

				this.graphic.attr({
					stroke : ""
				});
				gAttr.src = this.src;
				gAttr.stroke = "";
				gAttr.width = this.width;
				gAttr.height = this.height;
				gAttr.x = this.x;
				gAttr.y = this.y;
				gAttr.opacity = this.opacity;

				//=====================================

				//console.log(this.graphic.attr("path"));

				var scale = {
					x : 1,
					y : 1
				};
				//console.log('oldWidth='+oldWidth);
				//console.log('this.width='+this.width);
				if (this.pathWidth) {

					scale.x = this.width / this.pathWidth
				}
				if (this.pathHeight) {
					scale.y = this.height / this.pathHeight
				}

				//this.graphic.attr({transform: "S"+scale.x+","+scale.y+",0,0T"+this.x+","+this.y});

				//this.tmp.scale(scale.x, scale.y, 0, 0);
				//this.path = this.tmp.attr("path");
				//this.tmp.translate(this.x, this.y);
				//gAttr.path = this.tmp.attr("path");

				var ox = this.x;
				var oy = this.y;

				//gAttr.transform = "T" + this.x + "," + this.y + "S" + scale.x + "," + scale.y + "," + ox + "," + oy;
				//this.tmp.attr("transform");
				//this.tmp.remove();
				//=====================================
				if (!this._graphicCreated) {
					//this.graphic.attr({path: "M" + (this.x + this.width / 2) + "," + (this.y + this.height / 2)});
					this.graphic.attr({
						src : this.src,
						x : this.x,
						y : this.y
					});
				}

				this.scale = scale;
				textX = this.x + this.width / 2;
				textY = this.y + this.height / 2;
				break;

			default:
			// code
		};

		this.transform = gAttr.transform;

		this.animAttr = {
			sAttr : sAttr,
			gAttr : gAttr,
			bgAttr : bgAttr
		};

		//make sure graphic is in correct order
		this.graphic.insertAfter(this.background);
		if (this.shadowEl) {
			this.shadowEl.insertAfter(this.background)
		}

		this.oldType = this.type;
		this._graphicCreated = true;

		this.graphic.node.id = this.id;

		//"stroke-dasharray" will not work in Raphael animate fn so we need to force it
		if (this.strokeDasharray) {
			this.setStrokeDasharray(this.strokeDasharray);
		}

		/*this.all.push(this.background);
		 if(this.shadowEl){
		 this.all.push(this.shadowEl);
		 }
		 this.all.push(this.graphic);
		 */
		if (!this.rendered) {

			//var myevtsList = "click mouseout mouseover";
			var myevts = JSD._myevtsList.split(" ");

			for (var i = 0; i < myevts.length; i++) {
				var myevt = myevts[i];
				this.graphic.node["on" + myevt] = JSD._evtFn(myevt, this)
			}
		}

		//if(this.type==="path"){
		//this.setPosition([this.x, this.y, this.width, this.height]);
		//}
		if (this.isCmpType('container')) {
			this.allowRotate = false;
			if (this.title && this.type === "rect") {
				//this._createHeader(this.title);
				this._setTitle(this.title)
			}
			if (!this.title) {
				if (this.headerEl) {
					this.headerEl.remove();
					this.titleTextEl.remove();
					delete this.headerEl;
					delete this.titleTextEl;
				}
			}
		}

		//before creating labelEl, make sure that the labelConfig has all default values
		var defaultLabelConfig = JSD.clone(this.getDefault("labelConfig"));
		JSD.apply(defaultLabelConfig, this.labelConfig);
		this.labelConfig = defaultLabelConfig;

		if (!this.labelEl) {
			//this.labelEl = diagram.sheet.text(this._getLabelX(), this._getLabelY(), this.label);
			this.labelEl = diagram.sheet.text(this.getCx(), this.getCy(), this.label).attr({
				"font-size" : 1
			}).hide();
			this.labelEl.parentObj = this;

			//this.all.push(this.labelEl);
			//this.labelEl.attr({
			//	"font-size" : this.labelFontSize || 11
			//});
			for (var i = 0; i < myevts.length; i++) {
				var myevt = myevts[i];
				this.labelEl.node["on" + myevt] = JSD._evtFn(myevt, this)
			}
			//lAttr["fill-opacity"] = 1;
		}
		var lAttr = {
			x : this._getLabelX(),
			y : this._getLabelY(),
			text : this.label,
			"fill-opacity" : 1,
			transform : ""
		}

		//text will not animate properly so we have to set it explicitly
		this.labelEl.attr({
			"text" : this.label
		});

		//text-anchor will not animate properly so we have to set it explicitly
		this.labelEl.attr({
			"text-anchor" : (this.labelAlign === "left") ? "start" : ((this.labelAlign === "right") ? "end" : "middle")
		});

		//font-family will not animate so apply it now explicitly
		if (this.labelConfig["font-family"]) {
			this.labelEl.attr({
				"font-family" : this.labelConfig["font-family"]
			});
		}

		//font-weight will not animate so apply it now explicitly
		if (this.labelConfig["font-weight"]) {
			this.labelEl.attr({
				"font-weight" : this.labelConfig["font-weight"]
			});
		}

		//if (this.labelConfig["font-weight"]) {
		//	this.labelEl.attr({
		//		"font-weight" : this.labelConfig["font-weight"]
		//	});
		//}
		//}

		//now apply all other labelConfig properties to lAttr
		JSD.apply(lAttr, this.labelConfig);

		this.animAttr.lAttr = lAttr;
		//this._setLabel(this.label)
		//}

		if (this.html) {
			if (!this.htmlEl) {
				var h = this._createHtmlEl();
			}
		}

		if (this.contentEl) {
			if ( typeof this.contentEl === "object") {
				//is a DOM node
				//console.log('object');
				this.body = this.contentEl;
			} else {
				if ( typeof this.contentEl === "string") {
					this.body = document.getElementById(this.contentEl)
				}
			}
			//alert(Raphael.type);
			//alert("Raphael.vml = "+Raphael.vml);
			if (Raphael.type == "SVG") {
				// create a foreignObject svg element
				//<foreignobject x="10" y="10" width="100" height="150">

				//
				this.fo = document.createElementNS("http://www.w3.org/2000/svg", "foreignObject");
				this.fo.setAttribute('x', this.getX());
				this.fo.setAttribute('y', this.getY());
				//alert(this.body.offsetHeight);
				this.fo.setAttribute('width', this.getWidth());
				this.fo.setAttribute('height', this.getHeight());
				this.fo.style.cursor = 'move';
				//fo.setAttribute('opacity', 0);
				//fo.setAttribute('fill', '#aaaaaa');

				//var fobody = document.createElement("body");
				//fobody.setAttribute('xmlns', "http://www.w3.org/1999/xhtml");
				//fo.appendChild(fobody);
				//fobody.appendChild(this.body);
				this.fo.appendChild(this.body);
				this.graphic.node.parentNode.insertBefore(this.fo, this.graphic.node.nextSibling);
				this.fo.parentObj = this;

				//this.body.style.position = "absolute";
				//this.body.style.left = this.graphic.attr("x") + "px";
				//this.body.style.top = this.graphic.attr("y") + "px";
				if (this.editMode && diagram.editMode) {
					this.body.style.cursor = 'move'
				}
				//this.all.push(this.fo);

			} else {
				this.graphic.node.appendChild(this.body);
				//this.all.push(this.body);
			}

			//this.all.push(this.body)
		}

		this.graphic.parentObj = this;
		this.background.parentObj = this;
		this.background.isBackground = true;

		var thisNode = this;

		/*var fixAngle = function(a) {
		 a = parseInt(a);
		 if (a >= 360) {
		 a = fixAngle(Math.round(a - 360))
		 }
		 if (a < 0) {
		 a = fixAngle(Math.round(360 + a))
		 }
		 return a
		 }this.shadowOffset[0]
		 */

		if (this.rotate && this.allowRotate) {
			this.currentConfig.rotate = this.rotate = JSD.fixRotationAngle(this.rotate);

			if (gAttr.transform === "") {
				gAttr.transform = "R" + this.rotate + "," + this.getCx() + "," + this.getCy();
			} else {
				var translateCoords = Raphael.transformPath("M"+this.x+","+this.y, "R"+this.rotate+","+this.getCx()+","+this.getCy())[0];
				gAttr.transform = "R" + this.rotate + ",0,0S" + this.scale.x + "," + this.scale.y + ",0,0T" + (translateCoords[1]) + "," + (translateCoords[2]);
			}

			//gAttr.transform = "R" + this.rotate + ","+(scale.x*this.width/2)+","+(scale.y*this.height/2) + gAttr.transform;
			//gAttr.transform = gAttr.transform+"R" + this.rotate + ","+(this.width/2)+","+(this.height/2);+"S" +
			//console.log(gAttr.transform);

			if (this.shadowEl) {
				if (sAttr.transform === "") {
					sAttr.transform = "R" + this.rotate + "," + (this.getCx() + this.shadowOffset[0]) + "," + (this.getCy() + this.shadowOffset[1]);
				} else {
					sAttr.transform = "R" + this.rotate + ",0,0S" + this.scale.x + "," + this.scale.y + ",0,0T" + (translateCoords[1] + this.shadowOffset[0]) + "," + (translateCoords[2] + this.shadowOffset[1]);
				}
			}
			if (this.labelEl) {
				lAttr.transform = (lAttr.transform || "") + "R" + this.rotate + "," + this.getCx() + "," + this.getCy();
			}
			//if (this.htmlEl) {
			//	lAttr.transform = (lAttr.transform || "") + "R" + this.rotate + "," + this.getCx() + "," + this.getCy();
			//}
			if (this.headerEl) {
				//lAttr.transform = (lAttr.transform || "") + "R" + this.rotate + "," + this.getCx() + "," + this.getCy();
			}
		}
		//=================================================================================================
		// rebuild this.all
		(this.background) ? this.all.push(this.background) : "";
		(this.shadowEl) ? this.all.push(this.shadowEl) : "";
		(this.graphic) ? this.all.push(this.graphic) : "";
		(this.labelEl) ? this.all.push(this.labelEl) : "";
		(this.fo) ? this.all.push(this.fo) : "";
		(this.htmlEl) ? this.all.push(this.htmlEl) : "";
		(this.body) ? this.all.push(this.body) : "";
		(this.headerEl) ? this.all.push(this.headerEl) : "";
		(this.titleTextEl) ? this.all.push(this.titleTextEl) : "";

		if (!this.rendered) {
			diagram.nodeCollection.push(this);
		}

		if (this.hidden) {
			//this.rendered = true;
			this.all.hide();
		} else {

			if (!this.diagram.animateRender) {
				this.all.show();
				this.graphic.attr(gAttr);
				if (this.labelEl) {
					this.labelEl.attr(lAttr);
				}
				if (this.htmlEl) {
					this.htmlEl.style.visibility = "visible";
				}
				if (this.type === "path" && Raphael.type == "SVG") {
					this._fixPathGradient();
				}

				//this.rendered = true;
			} else {
				//this.diagram._animateRenderNodeQueue.push(this);
				//this.rendered = true;

				if (diagram._renderMultiItems) {
					this.gAttr = gAttr;
					diagram._animationQueue.push(thisNode)
				} else {
					this._animateRender(gAttr);
					var animateConnections = true;
					// reset connections here
				}
			}
		}

		//render any child items
		if (this.isCmpType('container') && (cfg.items || rebuild)) {
			var oldItems = this.oldItems;
			var newItems = cfg.items || [];
			this.items = [];

			//first assign a z-index to each new item
			//it will be removed in the render fn of the object
			for (var i = 0; i < newItems.length; i++) {
				newItems[i].z = i
			}

			var findNewCfg = function(id) {
				//console.log(id);
				for (var j = 0; j < newItems.length; j++) {
					if (newItems[j].id === id) {
						return newItems[j]
					}
				}
				return false
			}
			if (oldItems && oldItems.length > 0) {
				//search and replace or destroy old items if necessary
				for (var i = 0; i < oldItems.length; i++) {
					var oldObj = oldItems[i];
					var newCfg = findNewCfg(oldObj.id);
					if (newCfg) {
						//update oldObj with newCfg
						this.items.push(oldObj);
						this.add(oldObj);
						oldObj.render(newCfg);
						//============
						oldObj.parent.insert(newCfg.z, oldObj);
						delete oldObj.z;
						delete oldObj.initialConfig.z;
						delete oldObj.currentConfig.z;
						//============
						//now remove newCfg from the newItems array so that it does not get processed again
						var ind = JSD.arrayIndexOf(newItems, newCfg);
						if (ind !== -1) {
							//console.log('inc');
							newItems.splice(ind, 1);
						}

					} else {
						//no match found for oldObj so destroy it
						oldObj.destroy();
					}

				}

			}

			//now, just create any items left in newItems array
			if (newItems && newItems.length > 0) {
				//console.dir(cfg.items);
				for (var i = 0; i < newItems.length; i++) {
					//newItems[i].parentId = this.id;
					var newObj = this.add(newItems[i]);
					//============
					newObj.parent.insert(newObj.z, newObj);
					delete newObj.z;
					delete newObj.initialConfig.z;
					delete newObj.currentConfig.z;
					//============
				}
			}

			/*
			 if (cfg.items) {
			 for (var i = 0; i < this.items.length; i++) {
			 if (this.items[i].rendered) {
			 this.diagram.add(this.items[i]);
			 }
			 }
			 this.items = [];

			 if (cfg.items.length > 0) {
			 for (var i = 0; i < cfg.items.length; i++) {

			 var x = diagram.getNode(cfg.items[i].id) || diagram.getEdge(cfg.items[i].id);
			 if (x) {
			 this.add(x);
			 x.render(cfg.items[i]);
			 } else {
			 cfg.items[i].parentId = this.id;
			 this.add(cfg.items[i]);
			 }
			 }
			 }

			 } else {
			 // if rendering a container which already has items
			 if (this.items) {
			 if (this.items.length > 0) {
			 // re-align existing items to the new container position
			 // also need to provide for this container being hidden or collapsed
			 }
			 }
			 }
			 */
		}

		if (this.editMode && this.diagram.editMode) {
			//console.dir(this.editorConfig);
			//this.editorConfig = JSD.clone(this.diagram.editorConfig);
			if (this.editorConfig) {
				this.enableEdit(this.editorConfig);
			} else {
				this.enableEdit();
			}
		}

		/*if (cfg.group){
		 var group = this.diagram.getGroup(cfg.group);
		 if (group) {
		 //parentNode.add(this);
		 this.group = group;
		 this.group.items.push(this);
		 }
		 }
		 */

		if (diagram.autoResize) {
			diagram.setSizeFit();
		}
		if (this.diagram.animateRender && !rebuild) {
			this.refreshConnections(animateConnections);
		}
		this.rendered = true;
		return this;
		//this.renderTo = diagram;
	},

	/** @cfg */
	rotate : 0,

	/** @method */
	setPath : function(path) {
		val = this._updatecurrentconfig('path', path);
		this.render({
			path : val
		});
		return this
	},

	/** @method */

	setLayout : function(cfg) {

		direction = cfg.direction || "vertical";
		align = cfg.align || "center";
		var n = 0;
		var hGap = cfg.verticalSpacer || 30;
		var wGap = cfg.horizontalSpacer || 30;
		var edgeType = cfg.edgeType || this.diagram.edgeDefaults.edgeType;

		thisNode = this;

		var getChildren = function(parent) {
			var cons = parent.connectionsFrom;
			if (cons) {
				parent.children = [];
				for (var j = 0; j < cons.length; j++) {
					var con = cons[j];

					var child = con.toNode;
					//make sure child is not already a parent
					//prevent infinite loop - don't process again
					if (!child.children && child.isCmpType && child.isCmpType("node")) {

						if (edgeType) {
							con.edgeType = con.currentConfig.edgeType = edgeType;
							if (edgeType === "straight") {
								con.exitSide = con.currentConfig.exitSide = "auto";
								con.entrySide = con.currentConfig.entrySide = "auto"
							} else {
								con.fromPort = con.currentConfig.fromPort = (direction === "vertical") ? "bottom" : "right";
								con.toPort = con.currentConfig.toPort = (direction === "vertical") ? "top" : "left";
							}
						}

						//if already processed, then set first con to auto
						if (child.layoutCon) {
							child.layoutCon.exitSide = child.layoutCon.currentConfig.fromPort = "auto";
							child.layoutCon.entrySide = child.layoutCon.currentConfig.toPort = "auto";
						}

						child.layoutParent = parent;
						child.layoutCon = con;
						parent.children.push(child);
						child.layoutWidth = child.getWidth();
						child.layoutHeight = child.getHeight();

						getChildren(child);

						var lw = Math.max(child.layoutWidth, child.getWidth());
						var lh = Math.max(child.layoutHeight, child.getHeight());
						if (j === 0) {
							parent.layoutWidth = lw;
							parent.layoutHeight = lh;
						} else {
							parent.layoutWidth += wGap + lw;
							parent.layoutHeight += hGap + lh;
						}
					}
				}
			}
		}
		getChildren(this);
		//return
		//now, loop thru each level and work out new x,y coords
		var renderLayout = function(parent, dir, al) {
			if (!parent.children) {
				return
			}
			if (direction === "horizontal") {
				var x = parent.getX() + parent.getWidth() + wGap;
				var center = parent.getCy();

				switch (al) {

					case "top":
						var y = parent.getTop();
						break;

					case "bottom":
						var y = parent.getBottom();
						hGap = -1 * Math.abs(hGap);
						break;

					default:
						//center
						var y = center - parent.layoutHeight / 2;
				}

			} else {
				//vertical
				var y = parent.getY() + parent.getHeight() + hGap;
				var center = parent.getCx();

				switch (al) {
					case "left":
						var x = parent.getX();
						break;

					case "right":
						var x = parent.getRight();
						wGap = -1 * Math.abs(wGap);
						break;

					default:
						//center
						var x = center - parent.layoutWidth / 2;
				}
			}

			for (var i = 0; i < parent.children.length; i++) {
				var child = parent.children[i];
				if (direction === "horizontal") {
					var lh = child.layoutHeight || child.getHeight();
					lh = (al === "bottom") ? -lh : lh;
					var dh = (al === "center") ? (lh - child.getHeight()) / 2 : ((al === "top") ? 0 : -child.getHeight());
					child.render({
						x : x,
						y : y + dh
					});
					y = y + hGap + lh;
				} else {
					var lw = child.layoutWidth || child.getWidth();
					lw = (al === "right") ? -lw : lw;
					var dw = (al === "center") ? (lw - child.getWidth()) / 2 : ((al === "left") ? 0 : -child.getWidth());
					child.render({
						x : x + dw,
						y : y
					});
					x = x + wGap + lw;
				}

				renderLayout(child, direction, align);
				//now, clean everything up
				child.children = false;
				child.layoutParent = false;
				child.layoutCon = false;
				child.layoutHeight = false;
				child.layoutWidth = false;
			}
			//clean up children array
			parent.children = false;
		}
		renderLayout(this, direction, align);
	},

	/** @method */
	setShape : function(shape) {
		val = this._updatecurrentconfig('shape', shape);
		this.render({
			shape : shape
		});
		return this
	},

	_fixPathGradient : function() {
		if (Raphael.type !== "SVG") {
			return
		}
		var gradId = this.graphic.node.getAttribute("fill").replace("url(#", "").replace(")", "");
		var gradEl = document.getElementById(gradId);
		if (gradEl) {
			gradEl.setAttribute("gradientTransform", "");
		}
	},

	_animateRender : function() {
		//gAttr = gAttr || this.animAttr.gAttr;

		var d = this.diagram;
		var node = this;
		this.graphic.show();
		node.all.show();
		node.rendered = true;

		/*for (var i = 0; i < this.all.length; i++) {
		 var graphic = this.all[i];
		 var attr = this.animAttr[i];
		 graphic.stop().animate(attr, d.animateRenderDuration, d.animateRenderEasing, function(){
		 node.all.show();
		 });
		 }
		 */
		var ht = this.htmlEl;
		var mytype = this.type;

		this.graphic.stop().animate(this.animAttr.gAttr, d.animateRenderDuration, d.animateRenderEasing, function() {
			node.all.show();
			node.rendered = true;
			if (ht) {
				ht.style.visibility = "visible";
			}
			if (mytype === "path") {
				node._fixPathGradient();
			}
		});
		if (this.labelEl) {
			this.labelEl.stop().animate(node.animAttr.lAttr, d.animateRenderDuration, d.animateRenderEasing);
		}
		if (this.headerEl) {
			this.headerEl.stop().animate(node.animAttr.headerAttr, d.animateRenderDuration, d.animateRenderEasing);
		}
		if (this.shadowEl) {
			this.shadowEl.stop().animate(node.animAttr.sAttr, d.animateRenderDuration, d.animateRenderEasing);
		}
		if (this.titleTextEl) {
			this.titleTextEl.stop().animate(node.animAttr.titleAttr, d.animateRenderDuration, d.animateRenderEasing);
		}
	},
	//htmlClass: "jsd-htmlElement",
	ignoreDefaults : false,
	isNode : true,
	rendered : false,
	isContainer : false,
	hidden : false,

	show : function() {
		this.all.show();
	},

	hide : function() {
		this.all.hide()
	},

	getTooltipContent : function() {
		if (this.tooltip) {
			if ( typeof this.tooltip === "string") {
				var str = this.tooltip;
				var result = "";
				var innerArray;
				if (str.indexOf("[") > -1) {
					var array = str.split("[");
					for (var i = 0; i < array.length; i++) {
						if (array[i].indexOf("]") > -1) {
							innerArray = array[i].split("]");
							result = result + eval("(" + innerArray[0] + ")") + innerArray[1];
						} else {
							result = result + array[i]
						}
					}
					return result;
				}
				return str;
			} else {
				return this.tooltip(this);
			}
		}
		return "";
	},

	/** @class JSD.diagram.Component */
	/** @method toFront
	 * Moves the component to the front of the canvas so that it appears above any other objects.
	 */

	toFront : function(includeConnections) {

		/** @event
		 * Fires just before the component is moved to front of canvas - triggered by the  {@link JSD.diagram.Component#toFront} method.
		 */
		this.fireEvent("beforetofront", this);
		var cmp = this;
		/** @class JSD.diagram.Diagram */
		/** @event */
		this.diagram.fireEvent("beforetofront", cmp);
		/** @class JSD.diagram.Node */

		for (var i = 0; i < this.all.length; i++) {
			this.all[i].toFront();
		}

		// now make sure that this cmp appears in the correct place in the items array
		var currentInd = JSD.arrayIndexOf(this.parent.items, this);
		this.parent.items = this.parent.items.slice(currentInd, currentInd + 1).push(this);
		/*
		 var cons = this.connectionsFrom;
		 if (cons) {
		 for (var i = 0; i < cons.length; i++) {
		 //this.connections[i].setConnection();
		 cons[i].toFront();
		 }
		 }
		 var cons = this.connectionsTo;
		 if (cons) {
		 for (var i = 0; i < cons.length; i++) {
		 //this.connections[i].setConnection();
		 cons[i].toFront();
		 }
		 }
		 */
		if (includeConnections && (this.connectionsFrom || this.connectionTo)) {
			var cons = this.connectionsFrom;
			for (var i = 0; i < cons.length; i++) {
				cons[i].setConnection();
				cons[i].toFront();
			}
			var cons = this.connectionsTo;
			for (var i = 0; i < cons.length; i++) {
				cons[i].setConnection();
				cons[i].toFront();
			}
		}
		/** @class JSD.diagram.Component */
		/** @event */
		this.fireEvent("tofront", this);
		/** @class JSD.diagram.Diagram */
		/** @event */
		this.diagram.fireEvent("tofront", cmp);
		/** @class JSD.diagram.Node */

		return this
	},

	/** @class JSD.diagram.Component */
	/** @method toBack
	 * Moves the component to the back of the canvas so that it appears behind any other objects.
	 */

	toBack : function(ignoreContainer) {

		/** @class JSD.diagram.Component */
		/** @event
		 * Fires just before the component is moved to back of canvas - triggered by the  {@link JSD.diagram.Component#toBack} method.
		 */
		this.fireEvent("beforetoback", this);
		var cmp = this;
		/** @class JSD.diagram.Diagram */
		/** @event */
		this.diagram.fireEvent("beforetoback", cmp);
		/** @class JSD.diagram.Node */

		if (!this.parent.isCmpType('container') || ( typeof ignoreContainer === 'boolean' && ignoreContainer)) {
			if (this.all.length > 0) {
				this.diagram.insert(0, this);
			}
		} else {
			//console.log('toback of container');
			this.parent.insert(0, this);
		}
		if (this.diagram.background) {
			this.diagram.background.toBack();
		}

		/** @class JSD.diagram.Component */
		/** @event */
		this.fireEvent("toback", this);
		/** @class JSD.diagram.Diagram */
		/** @event */
		this.diagram.fireEvent("toback", cmp);
		/** @class JSD.diagram.Node */
	},

	getContainers : function() {
		var a = [];
		for (var i = 0; i < this.items.length; i++) {
			if (this.items[i].isCmpType('container') === true) {
				a.push(this.items[i])
			}
		}
		return a;
	},
	/*
	 fill : "#ffffff",
	 fillOpacity : 1,
	 stroke : "#000000",
	 strokeWidth : 1,
	 strokeOpacity : 1,
	 strokeDasharray : "None",
	 */
	rounded : 0,

	shadow : false,

	/** @method */
	setShadowOffset : function(coordArray) {
		coordArray = this._updatecurrentconfig('shadowOffset', coordArray);
		this.shadowOffset = coordArray;
		this.render();
		return this
	},

	/** @method */
	setShadow : function(state) {
		state = this._updatecurrentconfig('shadow', state);
		this.shadow = state;
		this.render();
		return this
	},

	/** @method */
	setShadowFill : function(fill) {
		fill = this._updatecurrentconfig('shadowFill', fill);
		this.shadowFill = fill;
		this.render();
		return this
	},

	/** @method */
	setShadowOpacity : function(opacity) {
		opacity = this._updatecurrentconfig('shadowOpacity', opacity);
		this.shadowOpacity = opacity;
		this.render();
		return this
	},

	shadowOffset : [6, 6],
	shadowFill : "#aaaaaa",
	shadowOpacity : 0.7,
	/*
	 shadowConfig: {
	 fill: "#aaaaaa",
	 "fill-opacity": 0.25,
	 stroke:"#aaaaaa",
	 "stroke-opacity":0.25
	 },
	 */

	highlightContainer : function() {
		var d = this.diagram;
		this.unHighlightContainer();
		d.highlightBox = d.sheet.rect(this.getX(), this.getY(), this.getWidth(), this.getHeight()).attr(d.editor.highlight);
		d.highlightedContainer = this;
	},

	unHighlightContainer : function() {
		if (this.diagram.highlightBox) {
			delete this.diagram.highlightedContainer;
			this.diagram.highlightBox.remove();
			this.diagram.highlightBox = null;
		}
	},

	showNewLinks : function() {
		this.diagram.newLinks.show(this);
	},

	//private
	alignElements : function() {

		//alignHeader
		if (this.headerEl) {
			var w = this.headerPosition === 'left' ? this.headerSize : this.getWidth();
			var h = this.headerPosition === 'left' ? this.getHeight() : this.headerSize;
			this.headerEl.attr({
				x : this.getX(),
				y : this.getY(),
				width : w,
				height : h
			});

			var w = this.headerPosition === 'left' ? this.headerSize : this.getWidth();
			var h = this.headerPosition === 'left' ? this.getHeight() : this.headerSize;

			if (this.headerPosition === "left") {
				transform = "R" + 270 + ",0,0 T" + (this.getX() + w / 2) + "," + (this.getY() + h / 2);
			} else {
				transform = "T" + (this.getX() + w / 2) + "," + (this.getY() + h / 2);
			}
			this.titleTextEl.attr({
				transform : transform
			});
			/*this.titleTextEl.attr({
			 x: this.getX() + w/2,
			 y: this.getY() + h/2
			 })
			 */
		}

		//alignBackground
		if (this.background) {
			switch (this.graphic.type) {

				case "ellipse":
					this.background.attr({
						cx : this.getCx(),
						cy : this.getCy(),
						rx : (this.getWidth() / 2) + 10,
						ry : (this.getHeight() / 2) + 10
					});
					break;

				case "path":
					this.background.attr({
						x : this.getX(),
						y : this.getY(),
						width : this.getWidth(),
						height : this.getHeight()
					});
					break;

				default:
					this.background.attr({
						x : this.getX() - 10,
						y : this.getY() - 10,
						width : this.getWidth() + 20,
						height : this.getHeight() + 20
					});
			}
		}

		//alignShadowEl:
		if (this.shadowEl) {
			//this.shadowOffset[0];
			switch (this.graphic.type) {
				case "ellipse":
					this.shadowEl.attr({
						cx : this.getCx() + this.shadowOffset[0],
						cy : this.getCy() + this.shadowOffset[1],
						rx : this.getWidth() / 2,
						ry : this.getHeight() / 2
					})
					break;

				case "path":
					//console.log('shadow transform = '+"S"+this.scale.x+","+this.scale.y+",0,0T"+(this.x+this.shadowOffset[0])+","+(this.y+this.shadowOffset[1]));
					this.shadowEl.attr({
						transform : "S" + this.scale.x + "," + this.scale.y + ",0,0T" + (this.x + this.shadowOffset[0]) + "," + (this.y + this.shadowOffset[1])
					});
					break;

				default:
					this.shadowEl.attr({
						x : this.getX() + this.shadowOffset[0],
						y : this.getY() + this.shadowOffset[1],
						width : this.getWidth(),
						height : this.getHeight()
					})
			}

			/*if (this.graphic.type === "ellipse") {
			 this.shadowEl.attr({
			 cx: this.getCx() + this.shadowOffset[0],
			 cy: this.getCy() + this.shadowOffset[1],
			 rx: this.getWidth()/2,
			 ry: this.getHeight()/2
			 })
			 }
			 else {
			 this.shadowEl.attr({
			 x: this.getX() + this.shadowOffset[0],
			 y: this.getY() + this.shadowOffset[1],
			 width: this.getWidth(),
			 height: this.getHeight()
			 })
			 }
			 */
		};

		//alignBody:
		if (this.body) {
			this.body.style.left = this.getX() + "px";
			this.body.style.top = this.getY() + "px";
		}

		if (this.fo) {
			if (this.htmlEl) {
				this.fo.setAttribute('x', this.getX());
				this.fo.setAttribute('y', this.getY());

				if (this.htmlEl.style.width === this.getWidth() + 'px') {
					//alert('same');
					//bug in Safari means that it won't update X/Y if width/height have not changed
					this.htmlEl.style.height = (this.getHeight() + 1) + 'px';
					this.htmlEl.style.width = (this.getWidth() + 1) + 'px';
					this.fo.setAttribute('height', this.getHeight() + 1);
					this.fo.setAttribute('width', this.getWidth() + 1);
				} else {
					this.htmlEl.style.height = this.getHeight() + 'px';
					this.htmlEl.style.width = this.getWidth() + 'px';
					this.fo.setAttribute('height', this.getHeight());
					this.fo.setAttribute('width', this.getWidth());
				}
			}
		} else {
			if (this.htmlEl) {
				//var elPos = JSD.getPosition(this.diagram.dom);
				var relPos = {
					x : (this.getX()) / this.diagram.getZoom(),
					y : (this.getY()) / this.diagram.getZoom()
				};
				this.htmlEl.style.top = relPos.y + 'px';
				this.htmlEl.style.left = relPos.x + 'px';
				this.htmlEl.style.height = this.getHeight() + 'px';
				this.htmlEl.style.width = this.getWidth() + 'px';
			}
		}

		var cx, cy;

		this.alignLabelEl();

		//console.profile();
		this.refreshConnections();
		//console.profileEnd();
	},

	//private
	alignLabelEl : function() {
		if (this.labelEl) {
			this.setLabelAlign(this.labelAlign);
			this.setLabelVerticalAlign(this.labelVerticalAlign);
		}
	},

	//private
	alignChildren : function(dx, dy) {
		//console.log('alignChildren');
		if (this.isCmpType('container') && this.items.length > 0) {
			for (var i = 0; i < this.items.length; i++) {
				var item = this.items[i];
				item.setPosition([item.getX() + dx, item.getY() + dy]);
			}
		}
	},

	/**
	 * @event changeLabel
	 * Fires just before the label is updated. A handler can return <code>false</code> to cancel the update.
	 * @param {Node} <tt>this</tt> object to which the label belongs
	 * @param {String} newValue
	 * @param {String} oldValue
	 */

	labelAlign : "center", // left, center, right
	labelVerticalAlign : "center", // top, middle, bottom, above, below

	_getLabelX : function(val) {
		val = val || this.labelAlign;
		if (this.labelEl) {
			var offset = 5;
			var offsetH = 0;
			if (this.headerEl && this.headerPosition === 'left') {
				offsetH = this.headerSize;
			}
			var labelX = (val === "left") ? this.getX() + offset + offsetH : ((val === "right") ? this.getRight() - offset : this.getCx() + offsetH / 2);
			var anc = (val === "left") ? "start" : ((val === "right") ? "end" : "middle");

			this.labelAlign = val;

			return labelX;

		}
	},

	setLabelAlign : function(val) {
		val = this._updatecurrentconfig('labelAlign', val);
		var labelX = this._getLabelX(val);
		var anc = (val === "left") ? "start" : ((val === "right") ? "end" : "middle");
		if (this.labelEl) {
			this.labelEl.attr({
				x : labelX,
				"text-anchor" : anc
			});
			this.labelAlign = val;
		}
	},

	getLabelConfig : function(attr) {
		if (this.labelEl) {
			return this.labelEl.attr(attr);
		}
		return null
	},

	_getLabelY : function(val) {
		val = val || this.labelVerticalAlign;
		var offset = 3;
		var offsetV = 0;
		var labelY;
		if (this.labelEl) {
			if (this.headerEl && this.headerPosition === 'top') {
				offsetV = this.headerSize;
			}
			var h = this.labelEl.getBBox().height;
			switch (val) {

				case ("top"):
					labelY = this.getY() + offset + h / 2 + offsetV;
					break;
				case ("middle"):
					labelY = this.getCy() + offsetV / 2;
					break;
				case ("bottom"):
					labelY = this.getBottom() - offset - h / 2;
					break;
				case ("above"):
					labelY = this.getY() - 8;
					break;
				case ("below"):
					labelY = this.getBottom() + 8;
					break;
				default:
					labelY = this.getCy();
			}
			this.labelVerticalAlign = val;
			return labelY;
		}
	},

	setLabelVerticalAlign : function(val) {
		val = this._updatecurrentconfig('labelVerticalAlign', val);
		var labelY = this._getLabelY(val);
		if (this.labelEl) {
			this.labelEl.attr({
				y : labelY
			});

		}
		this.labelVerticalAlign = val;
	},

	/**
	 * @cfg
	 * @private
	 */
	allowRotate : true,

	_createHtmlEl : function() {
		var node = this;
		this.allowRotate = false;

		this.graphic.onAnimation(function() {
			var x, y, w, h;
			if (node.type === "path") {
				var box = this.getBBox();
				x = box.x;
				y = box.y;
				w = box.width;
				h = box.height;
			}
			if (node.type === "image" || node.type === "rect") {
				x = this.attr("x");
				y = this.attr("y");
				w = this.attr("width");
				h = this.attr("height");
			}
			if (node.type === "ellipse") {
				var cx = this.attr("cx");
				var cy = this.attr("cy");
				var rx = this.attr("rx");
				var ry = this.attr("ry");
				x = cx - rx;
				y = cy - ry;
				w = rx * 2;
				h = ry * 2;
			}
			if (node.fo) {
				if (Raphael.type === "SVG") {
					node.fo.setAttribute('x', x);
					node.fo.setAttribute('y', y);
					node.fo.setAttribute('width', w);
					node.fo.setAttribute('height', h);
					//var t="";
					//if(node.rotate){
					//	t = "rotate("+node.rotate+" "+node.getCx()+" "+node.getCy()+")";
					//}
					//node.fo.setAttribute('transform', t);
				} else {
					node.fo.style.top = y + "px";
					node.fo.style.left = x + "px";
					node.fo.style.width = w;
					node.fo.style.height = h;
				}

			} else {
				node.fo = null;
				var z = node.diagram.getZoom();
				node.htmlEl.style.top = (y / z) + 'px';
				node.htmlEl.style.left = (x / z) + 'px';
			}
			node.fireEvent("onAnimation", this);
		});

		this.htmlEl = document.createElement('div');

		var h = this.htmlEl;

		h.setAttribute("id", this.getId() + "-html");
		h.style.visibility = "hidden";
		h.style.position = 'absolute';
		h.parentObj = this;
		if (this.htmlClass) {
			h.setAttribute("class", this.htmlClass);
		}

		h.style.fontSize = '0.9em';

		h.style.height = this.getHeight() + 'px';
		h.style.width = this.getWidth() + 'px';
		h.style.padding = "0px";
		h.style.margin = "0px";
		h.style.overflow = 'hidden';
		h.innerHTML = this.html;

		//this.fo = document.createElementNS("http://www.w3.org/2000/svg", "foreignObject");
		if (Raphael.type == "SVG") {
			this.fo = document.createElementNS("http://www.w3.org/2000/svg", "foreignObject");
		} else {
			this.fo = document.createElement("div");
		}
		if (this.fo.style) {
			if (Raphael.type === "SVG") {
				//console.log('fo');
				this.fo.setAttribute('x', this.getX());
				this.fo.setAttribute('y', this.getY());
				//alert(this.body.offsetHeight);
				this.fo.setAttribute('width', this.getWidth());
				this.fo.setAttribute('height', this.getHeight());

				this.graphic.node.parentNode.insertBefore(this.fo, this.graphic.node.nextSibling);
			} else {
				this.fo.style.top = this.getY() + "px";
				this.fo.style.left = this.getX() + "px";
				//alert(this.body.offsetHeight);
				this.graphic.node.appendChild(this.fo);
				this.fo.style.width = this.getWidth();
				this.fo.style.width = this.getHeight()
			}
			this.graphic.node.style.overflow = 'hidden';
			this.fo.style.overflow = 'hidden'
			this.fo.parentObj = this;
			this.fo.appendChild(h);
			this.all.push(this.fo);
		} else {
			this.fo = null;
			var elPos = JSD.getPosition(this.diagram.dom);
			var relPos = {
				x : (this.getX()) / this.diagram.getZoom(),
				y : (this.getY()) / this.diagram.getZoom()
			};
			h.style.top = relPos.y + 'px';
			h.style.left = relPos.x + 'px';

			this.diagram.dom.internalContainer.appendChild(h)
		}

		return h
	},

	setHtml : function(html) {
		var d = this.diagram;
		if (html) {
			if (this.htmlEl) {
				this.htmlEl.innerHTML = html;
				this.html = html;
				this.currentConfig.html = html;
			}
		}
	},

	label : "",

	_setLabel : function(label) {
		var d = this.diagram;

		if (label) {
			if (!this.labelEl) {
				this.labelEl = d.sheet.text().hide();
				var labelAttr = {
					x : this.getCx(),
					y : this.getCy(),
					text : label
				}
				this.labelEl.parentObj = this;
				this.labelEl.set = this.setLabel;
				// create a shortcut to this function
				if (this.editMode && d.editMode) {
					if (!this.labelEl._dblclickeditLabelEl) {
						this.labelEl.dblclick(function(event) {
							d.editLabelEl(this.parentObj);
						});
						this.labelEl._dblclickeditLabelEl = true;
					}
					if (!this.graphic._dblclickeditLabelEl) {
						this.graphic.dblclick(function(event) {
							d.editLabelEl(this.parentObj);
						})
						this.graphic._dblclickeditLabelEl = true;
					}

				}
				this.labelEl.mouseover(function(event) {
					d.tooltipShow(this.parentObj);
				})
				this.all.push(this.labelEl);
				this.animAttr.push(labelAttr);
			}

			var x = this._getLabelX(this.labelAlign);
			var y = this._getLabelY(this.labelVerticalAlign);

			var newValue = label;
			var oldValue = this.labelEl.attr("text");
			if (newValue !== oldValue) {
				var success = this.fireEvent("changelabel", this, newValue, oldValue);
				if ( typeof success === 'boolean' && !success) {
					//newValue = oldValue;
					//console.log(success);
					return false;
				}
			}
			this.label = label;
			this.currentConfig.label = label;

			if (this.labelConfig) {
				this.setLabelConfig(this.labelConfig)
			}
			return {
				x : x,
				y : y,
				text : label
			};
		}
	},

	setLabel : function(label) {
		var lAttr = this._setLabel(label);
		this.labelEl.attr(lAttr);
	},

	setLabelConfig : function(cfg) {
		//first, update currentconfig
		if (!this.currentConfig.labelConfig) {
			this.currentConfig.labelConfig = {}
		}
		JSD.apply(this.currentConfig.labelConfig, cfg);
		JSD.apply(this.labelConfig, cfg);

		//now, remap any propeerty names before applying to the text element
		var map = JSD.attrMap;

		for (var name in cfg) {
			if (cfg.hasOwnProperty(name)) {
				if (map[name]) {
					cfg[map[name]] = cfg[name];
					delete cfg[name];
				}
			}
		}

		this.labelEl.attr(cfg);
	},

	removeLabel : function() {
		if (this.label) {
			delete this.label;
			delete this.currentConfig.label;
		}
		if (this.labelConfig) {
			delete this.labelConfig;
			delete this.currentConfig.labelConfig;
		}
		if (this.labelEl) {
			this.labelEl.remove();
		}
	},

	//private
	refreshConnections : function(animate) {
		if (this.connectionsFrom || this.connectionsTo) {
			var cons = this.connectionsFrom;
			if (cons) {
				for (var i = 0; i < cons.length; i++) {
					var c = cons[i];
					var reset = true;
					var newPathArray;

					if (c.edgeType !== "straight" && c.manualPath === true) {
						//console.log('manual');
						reset = false;
						var limPt = c.pathArray[2];
						var endPt = c.pathArray[0];
						var newEndPt = c.fromNode.getConnectionCoords(c.exitSide);

						reset = (limPt[0] < endPt[0] && newEndPt[0] < limPt[0]) ? true : reset;
						reset = (limPt[0] > endPt[0] && newEndPt[0] > limPt[0]) ? true : reset;
						reset = (limPt[1] < endPt[1] && newEndPt[1] < limPt[1]) ? true : reset;
						reset = (limPt[1] > endPt[1] && newEndPt[1] > limPt[1]) ? true : reset;
						if (!reset) {
							var a = JSD.clone(c.pathArray);
							if (a[1][0] === endPt[0]) {
								//horizontal - so don't change X value
								a[1][0] = newEndPt[0];
							}
							if (a[1][1] === endPt[1]) {
								//vertical - so don't change Y value
								a[1][1] = newEndPt[1];
							}
							a[0][0] = newEndPt[0];
							a[0][1] = newEndPt[1];
							newPathArray = a
						}
					}

					if (animate) {
						if (reset) {
							c.manualPath = false;
							c._setConnection(null, true);
							c._animateRender({
								path : c.path
							});
						} else {
							c._setConnection({
								pathArray : newPathArray
							}, true);
							c._animateRender({
								path : c.path
							});
						}
					} else {
						if (reset) {
							c.manualPath = false;
							c.setConnection();
						} else {
							c.setConnection({
								pathArray : newPathArray
							});
						}
					}
				}
			}
			var cons = this.connectionsTo;
			if (cons) {
				for (var i = 0; i < cons.length; i++) {
					var c = cons[i];
					var reset = true;
					var newPathArray;
					if (c.edgeType !== "straight" && c.manualPath === true) {
						reset = false;
						var limPt = c.pathArray[c.pathArray.length - 3];
						var endPt = c.pathArray[c.pathArray.length - 1];
						var newEndPt = c.toNode.getConnectionCoords(c.entrySide);

						reset = (limPt[0] < endPt[0] && newEndPt[0] < limPt[0]) ? true : reset;
						reset = (limPt[0] > endPt[0] && newEndPt[0] > limPt[0]) ? true : reset;
						reset = (limPt[1] < endPt[1] && newEndPt[1] < limPt[1]) ? true : reset;
						reset = (limPt[1] > endPt[1] && newEndPt[1] > limPt[1]) ? true : reset;
						if (!reset) {
							var a = JSD.clone(c.pathArray);
							if (a[a.length - 2][0] === endPt[0]) {
								//horizontal - so don't change X value
								a[a.length - 2][0] = newEndPt[0];
							}
							if (a[a.length - 2][1] === endPt[1]) {
								//vertical - so don't change Y value
								a[a.length - 2][1] = newEndPt[1];
							}
							a[a.length - 1][0] = newEndPt[0];
							a[a.length - 1][1] = newEndPt[1];
							newPathArray = a
						}
					}
					if (animate) {
						if (reset) {
							c.manualPath = false;
							c._setConnection(null, true);
							c._animateRender({
								path : c.path
							});
						} else {
							c._setConnection({
								pathArray : newPathArray
							}, true);
							c._animateRender({
								path : c.path
								//path : newPathArray
							});
						}
					} else {
						if (reset) {
							c.manualPath = false;
							c.setConnection();
						} else {
							c.setConnection({
								pathArray : newPathArray
							});
						}
					}
				}
			}
		}
	},

	_connectionsToFront : function() {
		if (this.connectionsFrom || this.connectionTo) {
			var cons = this.connectionsFrom;
			if (cons) {
				for (var i = 0; i < cons.length; i++) {
					//this.connections[i].setConnection();
					cons[i].all.toFront();
				}
			}

			var cons = this.connectionsTo;
			if (cons) {
				for (var i = 0; i < cons.length; i++) {
					//this.connections[i].setConnection();
					cons[i].all.toFront();
				}
			}
		}
	},

	type : 'rect',

	x : 700,

	y : 150,

	width : 150,

	height : 40,

	renderTo : '1',

	rounded : 0,

	editMode : true,

	enableEdit : function(editorConfig) {

		/*var str = this.label || this.title;
		 console.log('-------------------------------');
		 console.log(str + ' - editorConfig');
		 console.dir(editorConfig);
		 console.log(str + ' - editor (before)');
		 console.dir(this.editor);
		 */
		if (editorConfig) {
			JSD.apply(this.editor, editorConfig);
		}

		if (this.title) {
			this.headerEl.attr({
				cursor : "move"
			});
			this.titleTextEl.attr({
				cursor : "move"
			});
		} else {
			this.graphic.attr({
				cursor : "move"
			});
			this.background.attr({
				cursor : "move"
			});
		}

		var node = this;
		var n = this;

		// this node
		var d = this.diagram;
		var rightClick = false;

		if (this.labelEl) {
			if (!this.labelEl._dblclickeditLabelEl) {
				this.labelEl.dblclick(function(event) {
					d.editLabelEl(this.parentObj);
				});
				this.labelEl._dblclickeditLabelEl = true
			}
		}
		if (!this.graphic._dblclickeditLabelEl) {
			this.graphic.dblclick(function(event) {
				d.editLabelEl(this.parentObj);
			});
			this.graphic._dblclickeditLabelEl = true
		}
		if (!this.background._dblclickeditLabelEl) {
			this.background.dblclick(function(event) {
				d.editLabelEl(this.parentObj);
			});
			this.background._dblclickeditLabelEl = true
		}

		var shapeDragStart = function(x, y, evt) {
			n = node.parent.locked ? node.parent : node;
			n.rightClick = false;
			evt = evt || window.event;
			if (evt.preventDefault) {
				evt.preventDefault()
			} else {
				evt.returnValue = false
			}
			if (evt.stopPropagation) {
				evt.stopPropagation()
			} else {
				evt.cancelBubble = true
			}
			//console.dir(evt);
			if (evt.button === 2) {
				n.rightClick = true;
				return
			}

			var multiSelect = (evt.ctrlKey) ? true : false;
			var z = d.getZoom();

			n.ox = n.getX();
			n.oy = n.getY();
			//var bb = n.graphic.getBBox();
			//n.ox = bb.x;
			//n.oy = bb.y;
			//console.dir(bb);
			var elPos = JSD.getPosition(d.dom);
			var pos = {
				x : n.ox * z + elPos.x,
				y : n.oy * z + elPos.y
			};
			d.dropTargets = [];
			d.setDropTargets();

			var dragger = JSD.getDragProxy();
			dragger.setPosition(d, pos);
			dragger.style.width = n.getWidth() * z + "px" || "100";
			dragger.style.height = n.getHeight() * z + "px" || "100";
			//dragger.style.width = bb.width * z + "px" || "100";
			//dragger.style.height = bb.height * z + "px" || "100";
			n.focus(multiSelect);

			if (n.parent.isCmpType('container')) {
				n.parent.highlightContainer();
				n.diagram.targetContainer = n.parent;
			}
			//JSD.actionInProgress = 'preDrag';
		};

		var shapeDragMove = function(dx, dy, x, y, evt, position) {
			n = node.parent.locked ? node.parent : node;
			evt = evt || window.event;
			if (evt.preventDefault) {
				evt.preventDefault()
			} else {
				evt.returnValue = false
			}
			if (evt.stopPropagation) {
				evt.stopPropagation()
			} else {
				evt.cancelBubble = true
			}
			//console.dir(evt);
			if (n.rightClick === true) {
				return
			}
			//console.log('shapeDragMove (actionInProgress='+JSD.actionInProgress+')');
			//var z = d.getZoom();
			//var elPos = JSD.getPosition(d.dom);
			//var pos = {
			//	x : (dx === 0 ? (n.ox * z + elPos.x) : Raphael.snapTo(d.snapTo, n.ox * z + dx + elPos.x)),
			//	y : (dy === 0 ? (n.oy * z + elPos.y) : Raphael.snapTo(d.snapTo, n.oy * z + dy + elPos.y))
			//};
			//var dragger = JSD.getDragProxy();
			//if (dx !== 0 || dy !== 0 || dx === null) {
			//	dragger.style.visibility = "visible";
			//}
			var box = n.diagram.focusBox;
			var xx = Raphael.snapTo(d.snapTo, n.ox + dx);
			var yy = Raphael.snapTo(d.snapTo, n.oy + dy);
			box.setPosition(xx, yy, box.width, box.height, null, box.r, true);

			var newTarget = n.diagram.getDropTargetAt({
				x : xx,
				y : yy
			});
			if (newTarget) {
				newTarget.highlightContainer();
				n.diagram.targetContainer = newTarget;
			} else {
				n.diagram.targetContainer = null;
				n.diagram.unHighlightContainer()
			}
			//dragger.setPosition(d, pos);
			//JSD.actionInProgress = 'drag';
		};

		var shapeDragStop = this._shapeDragStop;

		if (this.htmlEl) {
			this.htmlDrag = false;
			var h = this.htmlEl;

			this.htmlEl.ondblclick = function(evt) {
				if (d.editMode && n.editMode && n.editor.allowHtmlEdit) {
					d.editHtmlEl(h);
				}
			}
			if (!this.graphic._dblclick) {
				this.graphic.dblclick(function(evt) {
					if (d.editMode && n.editMode) {
						d.editHtmlEl(h);
					}
				});
				this.graphic._dblclick = true
			}

			/*var htmlEldrag = false;
			 var htmlOX, htmlOY, htmlDX, htmlDY;
			 this.htmlEl.onmousedown = function(evt){
			 htmlOX = n.getX();
			 htmlOY = n.getY();
			 htmlEldrag = true;
			 shapeDragStart(htmlOX, htmlOY, evt)
			 };
			 this.htmlEl.onmousemove = function(evt){
			 htmlDX = n.getX() - htmlOX;
			 htmlDY = n.getY() - htmlOY;
			 if(htmlEldrag){
			 shapeDragMove(htmlDX, htmlDY, null, null, evt);
			 }
			 }
			 this.htmlEl.onmouseup = function(evt){
			 htmlEldrag = false
			 shapeDragStop(evt);
			 }
			 */
			this.htmlEl.onmousedown = function(evt) {
				n = node.parent.locked ? node.parent : node;
				n.rightClick = false;
				evt = evt || window.event;
				//console.dir(evt);
				if (evt.button === 2) {
					n.rightClick = true;
					return
				}
				if (evt.preventDefault) {
					evt.preventDefault()
				} else {
					evt.returnValue = false
				}
				if (evt.stopPropagation) {
					evt.stopPropagation()
				} else {
					evt.cancelBubble = true
				}

				var d = n.diagram;
				var z = d.getZoom();
				d.dropTargets = [];
				var mousePos = JSD.getMouseCoords(evt);
				n.oMousePos = mousePos;
				//var dragger = JSD.getDragProxy();
				n.ox = n.getX();
				n.oy = n.getY();
				//dragger.style.width = n.getWidth() * z + "px" || "100";
				//dragger.style.height = n.getHeight() * z + "px" || "100";
				d.setDropTargets();
				JSD.actionInProgress = 'htmlDrag';
				JSD.activeButton = n;
				var elPos = JSD.getPosition(d.dom);
				var pos = {
					x : n.ox * z + elPos.x,
					y : n.oy * z + elPos.y
				};
				//dragger.offset = {
				//	x : mousePos.x - pos.x,
				//	y : mousePos.y - pos.y
				//}
				//dragger.setPosition(d, pos);
				//dragger.style.visibility = "visible";
				n.focus();
			};

			this.htmlEl.onmousemove = function(evt) {
				evt = evt || window.event;
				//console.dir(evt);
				if (evt.button === 2) {
					n.rightClick = true;
					return
				}
				if (evt.preventDefault) {
					evt.preventDefault()
				} else {
					evt.returnValue = false
				}
				/*

				 if (evt.stopPropagation) {
				 evt.stopPropagation()
				 } else {
				 evt.cancelBubble = true
				 }
				 if(JSD.actionInProgress !== 'htmlDrag'){
				 return false
				 }
				 var mousePos = JSD.getMouseCoords(evt);
				 n = node.parent.locked ? node.parent : node;
				 var d = n.diagram;
				 var z = d.getZoom();
				 n = n.parent.locked ? n.parent : n;
				 var dx = (mousePos.x - n.oMousePos.x)/z;
				 var dy = (mousePos.y - n.oMousePos.y)/z;

				 var box = n.diagram.focusBox;

				 var xx = (n.ox + dx);
				 var yy = (n.oy + dy);
				 box.setPosition(xx, yy, box.width, box.height, null, box.r, true);

				 var newTarget = n.diagram.getDropTargetAt({x :xx, y:yy});
				 if (newTarget) {
				 newTarget.highlightContainer();
				 n.diagram.targetContainer = newTarget;
				 } else {
				 n.diagram.targetContainer = null;
				 n.diagram.unHighlightContainer()
				 }

				 return false;
				 */
			}

			this.htmlEl.ontouchend = this.htmlEl.onmouseup = function(evt) {
				evt = evt || window.event;
				//console.dir(evt);
				if (evt.button === 2) {
					n.rightClick = true;
					return
				}
				if (evt.preventDefault) {
					evt.preventDefault()
				} else {
					evt.returnValue = false
				}
				/*
				 if (evt.stopPropagation) {
				 evt.stopPropagation()
				 } else {
				 evt.cancelBubble = true
				 }

				 if(JSD.actionInProgress !== 'htmlDrag'){
				 return false
				 }

				 n = node.parent.locked ? node.parent : node;
				 n._shapeDragStop(evt);
				 JSD.actionInProgress = "";
				 JSD.activeButton = "";

				 return false;
				 */
			}
		}

		if (this.title) {
			if (!this.headerEl._drag) {
				//if _drag exists then the drag fns have already been applied
				this.headerEl.drag(shapeDragMove, shapeDragStart, shapeDragStop);
			}
			if (!this.titleTextEl._drag) {
				//if _drag exists then the drag fns have already been applied
				this.titleTextEl.drag(shapeDragMove, shapeDragStart, shapeDragStop);
			}

			if (!this.graphic._click) {
				this.graphic.click(function(evt) {
					evt = evt || window.event;
					var multiSelect = (evt.ctrlKey) ? true : false;
					n.focus(multiSelect);
				});
				this.graphic._click = true;
			}

		} else {
			if (!this.graphic._drag) {
				//if _drag exists then the drag fns have already been applied
				this.graphic.drag(shapeDragMove, shapeDragStart, shapeDragStop);
			}
			if (!this.background._drag) {
				//if _drag exists then the drag fns have already been applied
				this.background.drag(shapeDragMove, shapeDragStart, shapeDragStop);
			}

			if (this.labelEl) {
				if (!this.labelEl._drag) {
					//if _drag exists then the drag fns have already been applied
					this.labelEl.drag(shapeDragMove, shapeDragStart, shapeDragStop);
				}
				this.labelEl.attr({
					cursor : "move"
				});
			}
		}
		/*if (!this.background._mouseover) {
		 this.background.mouseover(function(event) {
		 n = node.parent.locked ? node.parent : node;
		 if (n.editor.allowConnection && d.focusEdge.targetConnection.showConnecters && !n.headerEl) {
		 n.highlightConnecters()
		 }

		 });
		 this.background._mouseover = true
		 }
		 */

		if (this.headerEl) {
			this.graphic.mouseover(function(event) {
				//d.newLinks.hide();
			})
		} else {
			if (!this.graphic._mouseover) {
				this.graphic.mouseover(function(event) {
					n = node.parent.locked ? node.parent : node;
					if (n.editor.allowConnection && d.focusEdge.targetConnection.showConnecters) {
						n.highlightConnecters()
					} else {
						n = node.parent.locked ? node.parent : node;
						n.showNewLinks();
					}

				});
				this.graphic._mouseover = true;
			}
			if (!this.background._mouseover) {
				this.background.mouseover(function(event) {
					n = node.parent.locked ? node.parent : node;
					if (n.editor.allowConnection && d.focusEdge.targetConnection.showConnecters) {
						n.highlightConnecters()
					} else {
						n = node.parent.locked ? node.parent : node;
						n.showNewLinks();
					}

				});
				this.background._mouseover = true;
			}

			if (this.labelEl) {
				if (!this.labelEl._mouseover) {
					this.labelEl.mouseover(function(event) {
						n = node.parent.locked ? node.parent : node;
						if (n.editor.allowConnection && d.focusEdge.targetConnection.showConnecters) {
							n.highlightConnecters()
						} else {
							n.showNewLinks();
						}
					});
					this.labelEl._mouseover = true
				}
			}

			/*this.graphic.mouseout(function(event){
			 console.log('this.graphic.mouseout');
			 n.diagram.newLinks.hide();
			 })
			 */
		}

	},
	/*
	 getX: function(relative){
	 var x;
	 switch (this.graphic.type) {
	 case "ellipse":

	 x = this.graphic.attr("cx") - this.graphic.attr("rx")
	 break;

	 case "path":
	 x = this.background.attr("x")
	 break;

	 default:
	 x = this.graphic.attr("x")
	 }
	 if (relative && this.parent.isCmpType('container')) {
	 return x - this.parent.getX()
	 }
	 else {
	 return x
	 }
	 },
	 */

	_shapeDragStop : function() {

		//alert('stop');

		var node = this.parentObj || this;
		n = node.parent.locked ? node.parent : node;
		var d = n.diagram;
		var box = d.focusBox;

		if (n.rightClick === true) {
			return
		}
		/*evt = evt || window.event;
		 if (evt.preventDefault) {
		 evt.preventDefault()
		 } else {
		 evt.returnValue = false
		 }
		 if (evt.stopPropagation) {
		 evt.stopPropagation()
		 } else {
		 evt.cancelBubble = true
		 }
		 */
		JSD.actionInProgress = '';
		/*var z = d.getZoom();
		 var dragger = JSD.getDragProxy();
		 var draggerPos = JSD.getPosition(dragger);
		 var diagramPos = JSD.getPosition(d.dom);
		 dragger.style.visibility = "hidden";
		 var nx = Raphael.snapTo(d.snapTo, (draggerPos.x - diagramPos.x) / z);
		 var ny = Raphael.snapTo(d.snapTo, (draggerPos.y - diagramPos.y) / z);

		 var nWidth = Raphael.snapTo(d.snapTo, parseInt(dragger.style.width) / z);
		 var nHeight = Raphael.snapTo(d.snapTo, parseInt(dragger.style.height) / z);
		 n.ox = Math.round(n.ox);
		 n.oy = Math.round(n.oy);
		 var dx = nx - n.ox;
		 var dy = ny - n.oy;
		 */
		var nx = Raphael.snapTo(d.snapTo, (box.x));
		var ny = Raphael.snapTo(d.snapTo, (box.y));
		var nWidth = Raphael.snapTo(d.snapTo, (box.width));
		var nHeight = Raphael.snapTo(d.snapTo, (box.height));
		var dx = nx - n.ox;
		var dy = ny - n.oy;

		if ((nx == n.ox) && (ny == n.oy)) {
			return;
		}

		var pos;
		if (this.type === "ellipse") {
			pos = {
				cx : nx + (nWidth / 2),
				cy : ny + (nHeight / 2)
			};
		} else {
			pos = {
				x : nx,
				y : ny
			};
		}

		var tc = d.targetContainer;
		if (tc) {
			if (tc !== n.parent) {
				//prevent paradox
				if ((tc !== n) && (tc.parent !== n)) {
					tc.add(n);
				}
				delete tc;
			}
			d.unHighlightContainer();
		} else {
			if (n.parent.isCmpType('container')) {
				n.parent.remove(n);
				d._addExisting(n);
			}
		}

		/** @class JSD.diagram.Diagram */
		/** @event */
		node.diagram.fireEvent("uinodedragbeforemove", node, nx, ny);
		/** @class JSD.diagram.Node */
		/** @event */
		node.fireEvent("uidragbeforemove", node, nx, ny);

		if (n.editor.animateMove) {
			this.onAnimation(function() {
				n.refreshConnections();
				n.alignElements();
			})

			this.animate(pos, 1000, "<", function() {
				n.setPosition([nx, ny]);
			});
		} else {
			n.setPosition([nx, ny]);
			//n.render(pos)
		}

		/** @class JSD.diagram.Diagram */
		/** @event */
		node.diagram.fireEvent("uinodedragmove", node, nx, ny);
		/** @class JSD.diagram.Node */
		/** @event */
		node.fireEvent("uidragmove", node, nx, ny);

		n.focus();
	},

	getX : function(relative) {
		var x;
		switch (this.graphic.type) {
			case "ellipse":
				x = this.cx - this.rx;
				break;

			case "path":
				x = this.x;
				break;

			default:
				x = this.x;
		}
		if (relative && this.parent.isCmpType('container')) {
			return x - this.parent.getX()
		} else {
			return x
		}
	},

	/*
	 getY: function(relative){
	 var y;
	 switch (this.graphic.type) {
	 case "ellipse":

	 y = this.graphic.attr("cy") - this.graphic.attr("ry")
	 break;

	 case "path":
	 y = this.background.attr("y")
	 break;

	 default:
	 y = this.graphic.attr("y")
	 }
	 if (relative && this.parent.isCmpType('container')) {
	 return y - this.parent.getY()
	 }
	 else {
	 return y
	 }
	 },
	 */
	getY : function(relative) {
		var y;
		switch (this.graphic.type) {
			case "ellipse":

				y = this.cy - this.ry;
				break;

			case "path":
				y = this.y;
				break;

			default:
				y = this.y;
		}
		if (relative && this.parent.isCmpType('container')) {
			return y - this.parent.getY()
		} else {
			return y
		}
	},

	getXY : function() {
		var x = this.getX();
		var y = this.getY();
		return [x, y]
	},

	getWidth : function() {
		var w;
		switch (this.graphic.type) {
			case "ellipse":
				//w = this.graphic.attr("rx") * 2
				w = this.rx ? this.rx * 2 : this.width;
				break;

			case "path":
				//w = this.background.attr("width");
				w = this.width;
				break;

			default:
				//w = this.graphic.attr("width");
				w = this.width;
		}
		return w
	},

	getHeight : function() {
		var h;
		switch (this.graphic.type) {
			case "ellipse":
				//h = this.graphic.attr("ry") * 2
				h = this.ry ? this.ry * 2 : this.height;
				break;

			case "path":
				//h = this.background.attr("height");
				h = this.height;
				break;

			default:
				//h = this.graphic.attr("height");
				h = this.height;
		}
		return h
	},

	getLeft : function() {
		return this.getX();
	},

	getRight : function() {
		return this.getX() + this.getWidth();
	},

	getTop : function() {
		return this.getY();
	},

	getBottom : function() {
		return this.getY() + this.getHeight();
	},

	getCx : function() {
		var cx;
		switch (this.graphic.type) {
			case "ellipse":
				//cx = this.graphic.attr("cx");
				cx = this.cx || this.x + this.rx;
				break;

			case "other":
				//code ;
				break;

			default:
				//cx = this.getX()+this.getWidth()/2;
				cx = this.x + this.width / 2;

		}
		return cx
	},

	getCy : function() {
		var cy;
		switch (this.graphic.type) {
			case "ellipse":
				//cy = this.graphic.attr("cy");
				cy = this.cy || this.y + this.ry;
				break;

			case "other":
				//code ;
				break;

			default:
				//cy = this.getY()+this.getHeight()/2;
				cy = this.y + this.height / 2;
		}
		return cy
	},

	getCenter : function() {
		//var cx = this.graphic.getCx();
		//var cy = this.graphic.getCy();
		var cx = this.getCx();
		var cy = this.getCy();
		return [cx, cy]
	},

	ports : {
		left : [0, 0.5],
		right : [1, 0.5],
		top : [0.5, 0],
		bottom : [0.5, 1],
		center : [0.5, 0.5]
	},

	getConnectionCoords : function(port) {
		port = port || "auto"
		var x = this.getX();
		var y = this.getY();
		var h = this.getHeight();
		var w = this.getWidth();
		var portCoords = this.ports[port] || [0.5, 0.5];

		var getSideN = function(pc) {
			var n = 1;
			var xf = pc[0];
			//xfraction;
			var yf = pc[1];
			//yfraction;
			switch (true) {
				case (xf === 0):
					//side = "left";
					n = 1;
					break;
				case (yf === 0):
					//side = "top";
					n = 2;
					break;
				case (xf/yf <= 1 && xf/(1-yf) <= 1):
					//side = "left";
					n = 1;
					break;
				case (xf/yf <= 1 && xf/(1-yf) > 1):
					//side = "bottom";
					n = 4;
					break;
				case (xf/yf > 1 && xf/(1-yf) <= 1):
					//side = "top";
					n = 2;
					break;
				case (xf/yf > 1 && xf/(1-yf) > 1):
					//side = "right";
					n = 3;
					break;
				default :
					//side = "auto"
					n = 1;
			}
			return n
		}
		var sideN = getSideN(portCoords);
		var dx = portCoords[0] * w;
		var dy = portCoords[1] * h;

		var xpt = x + dx;
		var ypt = y + dy;

		if (this.rotate && this.allowRotate) {
			var r = (this.rotate + 45);
			r = Math.ceil((r > 360 ? r - 360 : r ) / 90) - 1;
			sideN = (sideN + r > 4 ? sideN + r - 4 : sideN + r );

			var rcoords = Raphael.transformPath("M"+xpt+","+ypt, "R"+this.rotate+","+this.getCx()+","+this.getCy())[0];

			xpt = rcoords[1];
			ypt = rcoords[2];
		}

		switch (sideN) {
			case 1:
				side = "left";
				break;
			case 2:
				side = "top";
				break;
			case 3:
				side = "right";
				break;
			case 4:
				side = "bottom";
				break;
			default :
				side = "left"
		}
		return [xpt, ypt, side]

	},

	/*getConnectionCoords : function(side) {
	 var x, y;
	 switch (side) {
	 case ("left"):
	 x = this.getLeft();
	 y = this.getTop() + this.getHeight() / 2;
	 break;

	 case ("right"):
	 x = this.getRight();
	 y = this.getTop() + this.getHeight() / 2;
	 break;

	 case ("top"):
	 //direction - bottom2top
	 x = this.getLeft() + this.getWidth() / 2;
	 y = this.getTop();
	 break;

	 case ("bottom"):
	 x = this.getLeft() + this.getWidth() / 2;
	 y = this.getBottom();
	 break;

	 case ("center"):
	 x = this.getCx();
	 y = this.getCy();
	 break;

	 case ("auto"):
	 x = this.getCx();
	 y = this.getCy();
	 }
	 return [x, y];
	 },
	 */
	setRotation : function(deg) {
		//if (cx || cy) {
		//    this.rotate(deg, cx, cy);
		//}
		//else {
		this.graphic.rotate(deg);
		//}
		this.labelEl.rotate(deg);

		this.rotation = this.rotation ? this.rotation + deg : deg;
	},

	setX : function(x) {
		var y = this.getY();
		this.setPosition([x, y]);
	},

	setY : function(y) {
		var x = this.getX();
		this.setPosition([x, y]);
	},
	/*
	 setXxxx: function(x){
	 var y = this.getY();
	 var success = this.fireEvent("beforeMove", this, x, y);
	 if (typeof success === 'boolean' && !success) {
	 return false;
	 }
	 var oldX = this.getX();
	 var attrObj;
	 switch (this.graphic.type) {
	 case "ellipse":
	 attrObj = {
	 cx: x + this.getWidth() / 2
	 };
	 this.graphic.attr(attrObj);
	 this.background.attr(attrObj);
	 this.cx = attrObj.cx;
	 break;

	 case "path":
	 this.all.translate(x - this.getX(), 0);
	 //this.background.scale(sclX, sclY, pos[0],pos[1])
	 break;

	 default:
	 attrObj = {
	 x: x
	 };
	 this.graphic.attr(attrObj);
	 this.background.attr(attrObj);
	 }
	 this.x = x;
	 this.alignElements();
	 if (this.isCmpType('container') && this.items.length>0) {

	 this.alignChildren(0,x-oldX);

	 }

	 this.currentConfig.x = x;
	 this.fireEvent("move", this, x, y);
	 this.diagram.fireEvent("itemMove", this, x, y);

	 return this
	 },

	 setYxxx: function(y){
	 var x = this.getX();
	 var attrObj;
	 var success = this.fireEvent("beforeMove", this, x, y);
	 if (typeof success === 'boolean' && !success) {
	 return false;
	 }
	 var oldY = this.getY();
	 switch (this.graphic.type) {

	 case "ellipse":
	 attrObj = {
	 cy: y + this.getHeight() / 2
	 };
	 this.graphic.attr(attrObj);
	 this.background.attr(attrObj);
	 this.cy = attrObj.cy;
	 break;

	 case "path":
	 this.all.translate(0, y - this.getY());
	 //this.background.scale(sclX, sclY, pos[0],pos[1])
	 break;

	 default:
	 attrObj = {
	 y: y
	 };
	 this.graphic.attr(attrObj);
	 this.background.attr(attrObj);
	 }
	 this.y = y;
	 this.alignElements();
	 if (this.isCmpType('container') && this.items.length>0) {
	 this.alignChildren(0,y-oldY);
	 }
	 this.currentConfig.y = y;
	 this.fireEvent("move", this, x, y);
	 this.diagram.fireEvent("itemMove", this, x, y);
	 return this
	 },
	 */
	getScale : function() {
		if (this.graphic.type === "path") {
			var currentScale = this.scale;
			var sx = Math.round(1000 * currentScale.x) / 1000;
			var sy = Math.round(1000 * currentScale.y) / 1000;
			return {
				x : sx,
				y : sy
			};
		}
		return this.scale || {
			x : 1,
			y : 1
		};

	},

	setScaleX : function(sx, sy, cx, cy) {
		var w = this.getWidth();
		var h = this.getHeight();
		var ox = this.getX();
		var oy = this.getY();
		var nx = ox;
		var ny = oy;

		var nw = sx * w;
		var nh = sy * h;
		//if (cx || cy) {
		var xper = (cx === ox ) ? cx : (cx - ox) / w;
		var yper = (cy === oy ) ? cy : (cy - oy) / h;
		nx = cx - (nw * xper);
		ny = cy - (nh * yper);
		//}

		this.scale = {
			x : sx,
			y : sy
		};

		this.setPosition([nx, ny, nw, nh]);

		if (this.graphic.type === "path") {
			// update the currentConfig only for the PATH type
			// other graphic types are maintained via width & height
		}
	},
	/** @cfg */
	minWidth : 1,

	/** @cfg */
	minHeight : 1,

	/** @cfg */
	maxWidth : 5000,

	/** @cfg */
	maxHeight : 5000,

	setPosition : function(pos) {

		var attrObj;
		if (pos[2] || pos[3]) {
			pos[2] = Math.min(this.maxWidth, Math.max(this.minWidth, pos[2]));
			pos[3] = Math.min(this.maxHeight, Math.max(this.minHeight, pos[3]));

			var success = this.fireEvent("beforeresize", this, pos[2], pos[3]);
			if ( typeof success === 'boolean' && !success) {
				return false;
			}
		}

		var success = this.fireEvent("beforemove", this, pos[0], pos[1]);
		if ( typeof success === 'boolean' && !success) {
			return false;
		}
		var oldPos = this.getXY();
		var rx, ry;

		switch (this.graphic.type) {
			case "ellipse":
				rx = pos[2] / 2 || this.getWidth() / 2;
				ry = pos[3] / 2 || this.getHeight() / 2;
				attrObj = {
					cx : pos[0] + rx,
					cy : pos[1] + ry,
					rx : rx,
					ry : ry
				}
				/*this.graphic.attr(attrObj);
				 this.background.attr(attrObj);
				 this.cx = attrObj.cx;
				 this.cy = attrObj.cy;
				 if (pos[2] || pos[3]) {
				 this.rx = rx;
				 this.ry = ry;
				 }
				 */
				break;

			default:
				attrObj = {
					x : pos[0],
					y : pos[1]
				};
				if (pos[2]) {
					attrObj.width = pos[2];
				}
				if (pos[3]) {
					attrObj.height = pos[3];
				}
		}

		this.render(attrObj);

		var dx = pos[0] - oldPos[0];
		var dy = pos[1] - oldPos[1];

		if (this.items) {
			if (this.isCmpType('container') && this.items.length > 0 && (dx !== 0 || dy !== 0)) {
				this.alignChildren(dx, dy);
				//console.profileEnd();
			}
		}

		if (pos[2] || pos[3]) {
			this.fireEvent("resize", this, pos[2], pos[3]);
			this.diagram.fireEvent("itemresize", this, pos[2], pos[3]);
		}

		this.fireEvent("move", this, pos[0], pos[1]);
		this.diagram.fireEvent("itemmove", this, pos[0], pos[1]);
		return this
	},

	/*setPosition : function(pos) {

	 var attrObj;
	 if (pos[2] || pos[3]) {
	 pos[2] = Math.min(this.maxWidth, Math.max(this.minWidth, pos[2]));
	 pos[3] = Math.min(this.maxHeight, Math.max(this.minHeight, pos[3]));

	 var success = this.fireEvent("beforeResize", this, pos[2], pos[3]);
	 if ( typeof success === 'boolean' && !success) {
	 return false;
	 }
	 }

	 var success = this.fireEvent("beforeMove", this, pos[0], pos[1]);
	 if ( typeof success === 'boolean' && !success) {
	 return false;
	 }
	 var oldPos = this.getXY();
	 var rx, ry;

	 switch (this.graphic.type) {
	 case "ellipse":
	 rx = pos[2] / 2 || this.getWidth() / 2;
	 ry = pos[3] / 2 || this.getHeight() / 2;
	 attrObj = {
	 cx : pos[0] + rx,
	 cy : pos[1] + ry,
	 rx : rx,
	 ry : ry
	 }
	 this.graphic.attr(attrObj);
	 this.background.attr(attrObj);
	 this.cx = attrObj.cx;
	 this.cy = attrObj.cy;
	 if (pos[2] || pos[3]) {
	 this.rx = rx;
	 this.ry = ry;
	 }
	 break;

	 case "path":

	 //this.graphic.translate(pos[0]-this.getX(), pos[1]-this.getY());
	 //if(this.shadowEl){
	 //	this.shadowEl.translate(pos[0]-this.getX(), pos[1]-this.getY());
	 //}
	 if (pos[2] || pos[3]) {
	 var currentScale = this.scale;
	 //console.log('currentScale = '+currentScale);
	 }
	 if (pos[2]) {
	 var sclX = Math.round(1000 * currentScale.x * pos[2] / this.getWidth()) / 1000;
	 this.scale.x = sclX;
	 }
	 if (pos[3]) {
	 var sclY = Math.round(1000 * currentScale.y * pos[3] / this.getHeight()) / 1000;
	 this.scale.y = sclY;
	 }
	 //this.all.scale(sclX, sclY, pos[0],pos[1]);

	 this.x = pos[0];
	 this.y = pos[1];
	 if (pos[2] || pos[3]) {
	 this.width = pos[2];
	 this.height = pos[3];
	 }
	 this.graphic.attr({
	 transform : "S" + this.scale.x + "," + this.scale.y + ",0,0T" + this.x + "," + this.y
	 });
	 break;

	 default:
	 attrObj = {
	 x : pos[0],
	 y : pos[1]
	 };
	 if (pos[2]) {
	 attrObj.width = pos[2];
	 }
	 if (pos[3]) {
	 attrObj.height = pos[3];
	 }
	 this.graphic.attr(attrObj);
	 this.background.attr(attrObj);
	 this.x = pos[0];
	 this.y = pos[1];
	 if (pos[2] || pos[3]) {
	 this.width = pos[2];
	 this.height = pos[3];
	 }
	 }

	 this.alignElements();
	 var dx = pos[0] - oldPos[0];
	 var dy = pos[1] - oldPos[1];

	 if (this.items) {
	 if (this.isCmpType('container') && this.items.length > 0 && (dx !== 0 || dy !== 0)) {
	 this.alignChildren(dx, dy);
	 //console.profileEnd();
	 }
	 }

	 if (pos[2] || pos[3]) {
	 this.fireEvent("resize", this, pos[2], pos[3]);
	 this.diagram.fireEvent("itemResize", this, pos[2], pos[3]);
	 }

	 if (this.graphic.type === 'path') {
	 this.currentConfig.x = pos[0];
	 this.currentConfig.y = pos[1];
	 if (pos[2] || pos[3]) {
	 this.currentConfig.width = pos[2];
	 this.currentConfig.height = pos[3];
	 }
	 } else {
	 JSD.apply(this.currentConfig, attrObj);
	 }
	 this.fireEvent("move", this, pos[0], pos[1]);
	 this.diagram.fireEvent("itemMove", this, pos[0], pos[1]);
	 return this
	 },
	 */

	setWidth : function(w) {
		w = Math.min(this.maxWidth, Math.max(this.minWidth, w));

		var attrObj;
		var h = this.getHeight();
		var success = this.fireEvent("beforeresize", this, w, h);
		if ( typeof success === 'boolean' && !success) {
			return false;
		}
		switch (this.graphic.type) {
			case "ellipse":
				attrObj = {
					rx : w / 2
				};
				this.graphic.attr(attrObj);
				this.background.attr(attrObj);
				this.rx = w / 2;
				break;

			case "path":
				var currentScale = this.scale;
				var sclX = Math.round(1000 * currentScale.x * w / this.getWidth()) / 1000;
				//var sclY = Math.round(1000*currentScale.y * pos[3]/this.getHeight())/1000;

				//this.all.scale(sclX, currentScale.y, this.getX(), this.getY());
				this.scale.x = sclX;
				this.graphic.attr({
					transform : "S" + this.scale.x + "," + this.scale.y + ",0,0T" + this.x + "," + this.y
				});
				break;

			case "other":
				//code ;
				break;

			default:
				attrObj = {
					width : w
				};
				this.graphic.attr(attrObj);
				this.background.attr(attrObj);
		}
		this.width = w;
		this.alignElements();
		this.currentConfig.width = w;
		this.fireEvent("resize", this, w, h);
		this.diagram.fireEvent("itemresize", this, w, h);

		return this
	},

	setRx : function(rx) {
		rx = Math.min(this.maxWidth / 2, Math.max(this.minWidth / 2, rx));
		this.setWidth(rx * 2)
	},

	setRy : function(ry) {
		ry = Math.min(this.maxHeight / 2, Math.max(this.minHeight / 2, ry));
		this.setHeight(ry * 2)
	},

	setHeight : function(h) {
		h = Math.min(this.maxHeight, Math.max(this.minHeight, h));
		var attrObj;
		var w = this.getWidth();
		var success = this.fireEvent("beforeresize", this, w, h);
		if ( typeof success === 'boolean' && !success) {
			return false;
		}
		switch (this.graphic.type) {
			case "ellipse":
				attrObj = {
					ry : h / 2
				};
				this.graphic.attr(attrObj);
				this.background.attr(attrObj);
				this.ry = h / 2;
				break;

			case "path":
				var currentScale = this.scale;
				//var sclX = Math.round(1000*currentScale.x * w/this.getWidth())/1000;
				var sclY = Math.round(1000 * currentScale.y * h / this.getHeight()) / 1000;

				//this.all.scale(currentScale.x, sclY, this.getX(), this.getY());
				this.scale.y = sclY;
				this.graphic.attr({
					transform : "S" + this.scale.x + "," + this.scale.y + ",0,0T" + this.x + "," + this.y
				});
				break;

			case "other":
				//code ;
				break;

			default:
				attrObj = {
					height : h
				};
				this.graphic.attr(attrObj);
				this.background.attr(attrObj);
		}
		this.height = h;
		this.alignElements();
		this.currentConfig.height = h;
		this.fireEvent("resize", this, w, h);
		this.diagram.fireEvent("itemresize", this, w, h);

		return this
	},

	highlightConnecters : function(autoOnly) {
		var d = this.diagram;
		var fe = d.focusEdge;
		if (d.focusEdge.targetConnection.node) {
			if (fe.targetConnection.node.isNode) {
				fe.targetConnection.node.removeConnecters()
			}
		}
		fe.targetConnection.node = this;
		fe.connecters.showAll(this);

		return true;
	},

	removeConnecters : function() {
		var d = this.diagram;
		var fe = d.focusEdge;
		fe.connecters.hideAll();

	},

	setRotationX : function(deg) {
		node.rotate(deg);
		node.labelEl.rotate(deg);
		node.shadowEl.rotate(deg);
		node.rotation = deg;
	},

	//showMultiSelect:
	_multiSelectShow : function() {

		var msc = this.multiSelectCorners;
		if (msc) {
			//console.log('this.getX(),this.getLeft() = ' +[this.getX(),this.getLeft()] )
			msc.outline.attr({
				x : this.getX(),
				y : this.getY(),
				width : this.getWidth(),
				height : this.getHeight()
			}).show();
			msc.tl.attr({
				cx : this.getLeft(),
				cy : this.getTop()
			}).show();
			msc.tr.attr({
				cx : this.getRight(),
				cy : this.getTop()
			}).show();
			msc.bl.attr({
				cx : this.getLeft(),
				cy : this.getBottom()
			}).show();
			msc.br.attr({
				cx : this.getRight(),
				cy : this.getBottom()
			}).show();
		} else {
			this.multiSelectCorners = {};
			var msc = this.multiSelectCorners;
			var cornerAttr = {
				fill : "#00ffff",
				stroke : "#000"
			};
			msc.outline = this.diagram.sheet.rect(this.getX(), this.getY(), this.getWidth(), this.getHeight()).attr(this.diagram.editor.outline);
			msc.tl = this.diagram.sheet.circle(this.getLeft(), this.getTop(), 3).attr(cornerAttr);
			msc.tr = this.diagram.sheet.circle(this.getRight(), this.getTop(), 3).attr(cornerAttr);
			msc.bl = this.diagram.sheet.circle(this.getLeft(), this.getBottom(), 3).attr(cornerAttr);
			msc.br = this.diagram.sheet.circle(this.getRight(), this.getBottom(), 3).attr(cornerAttr);
		}

	},

	_multiSelectHide : function() {
		var msc = this.multiSelectCorners;
		if (msc) {
			msc.outline.hide();
			msc.tl.hide();
			msc.tr.hide();
			msc.bl.hide();
			msc.br.hide();
		}
	},

	focus : function(multiselect) {
		document.body.focus();

		var d = this.diagram;
		this.fireEvent("focus", this);
		d.fireEvent("focusitem", d, this);
		this._focus(multiselect)
	},

	_focus : function(multiselect) {
		// convienence fn to silently call focus;
		var d = this.diagram;

		if (multiselect) {
			//first, change the selection handles on the last selected item
			if (d.selectedItem) {
				if (!d.selectedItem.isCmpType('diagram')) {
					d.selectedItem._multiSelectShow();
				}
			}
			d.focusEdge.hideAll();
			d.focusBox.all.hide();
			d.focusBox.target = {};
			if (!this.hasFocus) {
				d.selectedItems.push(this);
			}
		} else {
			//d._blur();
			if (d.selectedItems.length > 0) {
				for (var i = 0; i < d.selectedItems.length; i++) {
					//d.selectedItems[i]._multiSelectHide();
					d.selectedItems[i].blur()
				}
			}
			d.selectedItems = [this];
		}

		this.hasFocus = true;
		d.selectedItem = this;

		var fb = d.focusBox;
		fb.target = this;
		this.ox = this.getX();
		this.oy = this.getY();
		var dragWidth = this.getWidth();
		var dragHeight = this.getHeight();

		/*if(this.rotatex){
		var tmp = this.diagram.sheet.rect(this.ox,this.oy, dragWidth, dragHeight).hide().transform("R"+this.rotate);
		console.log('attrs=', [tmp.attr("x"), tmp.attr("y"), tmp.attr("width"), tmp.attr("height")])
		var bb = tmp.getBBox();//Raphael.transformPath("M"+this.ox+","+this.oy+"l"+(dragWidth)+",0l0,"+(dragHeight)+"l-"+dragWidth+",0z", "R"+this.rotate));
		tmp.remove();
		//console.log("M"+this.ox+","+this.oy+"l"+(dragWidth)+",0l0,"+(dragHeight)+"l-"+dragWidth+",0z");
		//console.log(Raphael.transformPath("M"+this.ox+","+this.oy+"l"+(dragWidth)+",0l0,"+(dragHeight)+"l-"+dragWidth+",0z", "R"+this.rotate));
		console.dir(bb);
		//var bb = tmp.getBBox();
		this.ox = bb.x;
		this.oy = bb.y;
		dragWidth = bb.width;
		dragHeight = bb.height;
		}
		*/
		//var bb = this.graphic.getBBox();
		//var tmp = this.diagram.sheet.rect(this.getX(), this.getY(), this.getWidth(), this.getHeight()).hide().transform("R"+this.rotate);
		//var tmpbb = tmp.getBBox();
		//bb=tmpbb;
		//this.ox = bb.x;
		//this.oy = bb.y;
		var dragX = this.ox;
		var dragY = this.oy;
		//var dragWidth = bb.width;
		//var dragHeight = bb.height;

		/*
		 fb.dragProxy.attr({
		 x : dragX,
		 y : dragY,
		 width : dragWidth,
		 height : dragHeight
		 });
		 */

		fb.setPosition(dragX, dragY, dragWidth, dragHeight, this);
		fb.all.toFront();
		fb.dragProxy.toFront();

		//if (this.rotation) {
		//	fb.all.rotate(this.rotation, dragX + dragWidth / 2, dragY + dragHeight / 2);
		//	fb.rotation = this.rotation;
		//	fb.dragProxy.rotate(this.rotation, dragX + dragWidth / 2, dragY + dragHeight / 2);
		//}

	},

	_blur : function() {
		// convienence fn to silently call blur
		this.hasFocus = false;
		this._multiSelectHide();

		this.diagram._blur();
	},

	blur : function() {
		this.fireEvent("blur", this);
		this._blur();
	},

	animate : function(animCfg) {

	}
});

//=================================      CONTAINER API      ====================================
/**
 * @class JSD.diagram.Container
 * @extends JSD.diagram.Node
 */
//JSD.diagram.Container = JSD.extend(JSD.diagram.Node, {
JSD.define({
	className : "JSD.diagram.Container",
	extend : "JSD.diagram.Node",
	cmpType : 'container',

	constructor : function(cfg) {
		JSD.diagram.Container.superclass.constructor.call(this, cfg);
	},

	/**
	 * @cfg {Boolean} containerCfgTest This is just a test cfg object
	 */

	isContainer : true,
	ignoreDefaults : false,

	/**
	 * @method getNode Finds a node within this container.
	 * @param {String} id The id of the node that you wish to find
	 * @return {Node}
	 */

	getNode : function(id) {
		for (var i = 0; i < this.items.length; i++) {
			if (this.items[i].id === id) {
				return this.items[i]
			}
		}
		return false;
	},

	add : function(item) {

		//already added?
		if (item.parent === this) {
			return item
		}

		var val;
		var success = this.fireEvent("beforeadd", this, item);
		//container's beforeadd event - handlers are passed 2 params - 1. container, 2. item to remove
		if ( typeof success === "boolean" && !success) {
			return false;
		}
		if (this.isCmpType('container')) {
			if (!item.rendered) {
				item.parentId = this.id;
				val = this._addNew(item);
			} else {
				if ( typeof item.parent !== "string") {
					if (item.parent) {
						item.parent.remove(item, false);
					}
				}
				val = this._addExisting(item);
			}
		}
		this.fireEvent("add", this, item);
		return val
	},

	_addNew : function(item) {
		item.parentId = this.id;
		//parentID is not documented
		var x = this.diagram._addNew(item);
		//x.parent = this;
		//this.items.push(x);
		return x;
		/*
		 if (item.xtype) {
		 switch (item.xtype) {
		 case "node":
		 JSD.renderTo = this.diagram;
		 x = new JSD.diagram.Node(item);
		 x.parent = this;
		 this.items.push(x);
		 break;
		 case "edge":
		 JSD.renderTo = this.diagram;
		 x = new JSD.diagram.Edge(item);
		 x.parent = this;
		 this.items.push(x);
		 break;
		 }
		 }
		 else {
		 JSD.renderTo = this.diagram;
		 x = new JSD.diagram.Node(item);
		 x.parent = this;
		 this.items.push(x);
		 }
		 return x;
		 */
	},

	_addExisting : function(item) {
		item.parent = this;
		if (!this.items) {
			this.items = []
		}
		this.items.push(item);

		for (var i = 0; i < item.all.length; i++) {
			item.all[i].toFront();
		}
		if (item.isCmpType('container') && item.items) {
			if (item.items.length > 0) {
				for (var i = 0; i < item.items.length; i++) {
					for (var j = 0; j < item.items[i].all.length; j++) {
						item.items[i].all[j].toFront();
						item.items[i]._connectionsToFront();
					}
				}
			}
		}
		item.refreshConnections();
		/*if (item.connectionsFrom || item.connectionsTo) {
		 var cons = item.connectionsFrom;
		 if (cons) {
		 for (var i = 0; i < cons.length; i++) {
		 //this.connections[i].setConnection();
		 //cons[i].toFront();
		 cons[i].setConnection();
		 }
		 }
		 var cons = item.connectionsTo;
		 if (cons) {
		 for (var i = 0; i < cons.length; i++) {
		 //this.connections[i].setConnection();
		 //cons[i].toFront();
		 cons[i].setConnection();
		 }
		 }
		 }
		 */
		return item;
	},

	/**
	 * @method remove Removes an item from this container. Fires the beforeremove event before removing, then fires the remove event after the item has been removed.
	 * @param {node/edge} item
	 * @param {boolean} destroy (optional)
	 * @return {node/edge} item The item that was removed
	 */
	/**
	 * @event beforeremove Fires before any item (node or edge) is removed from the container. A handler can return false to cancel the remove.
	 * @param {node} container
	 * @param {item} itemToRemove
	 */

	locked : false,

	remove : function(item, destroy) {
		var success = this.fireEvent("beforeremove", this, item);
		//container's beforeremove event - handlers are passed 2 params - 1. container, 2. item to remove
		if ( typeof success === "boolean" && !success) {
			return false;
		}
		var val = this._remove(item, destroy);
		this.fireEvent("remove", this, item);
		return val
	},

	_remove : function(item, destroy) {
		// silent remove
		var ind = JSD.arrayIndexOf(this.items, item);
		if (ind !== -1) {
			this.items.splice(ind, 1);
			item.parent = item.diagram;
		}
		if (destroy) {
			//item.destroy()
			return false
		} else {
			return item;
		}
	},

	insert : function(num, item) {
		//inserts an existing child node/edge if this node is a container
		//num is optional - default will append item to end of 'items' array

		// make sure we don't get empty items in the array
		num = Math.min(num, this.items.length);
		if (this.isCmpType('container')) {
			item.parent.remove(item, false);
			item.parent = this;
			if (this.items.length === num) {
				this.items.push(item);
				for (var i = 0; i < item.all.length; i++) {
					item.all[i].toFront();
				}
				if (item.isCmpType('container') && item.items.length > 0) {
					for (var i = 0; i < item.items.length; i++) {
						item.items[i].toFront();
					}
				}
			} else {
				//console.log('clip-rect = '+item.labelEl.attr("clip-rect"));
				//console.log('X,Y,W,H = '+[item.getX(),item.getY(),item.getWidth(),item.getHeight()])

				var x = this.items[num].all[0];
				for (var i = 0; i < item.all.length; i++) {
					item.all[i].insertBefore(x);
				}
				this.items.splice(num, 0, item)
			}

			return item;
		}
	},

	headerSize : 25,
	headerPosition : 'top',
	headerConfig : {
		opacity : 0.2,
		fill : "#99ccff"
	},

	titleConfig : {
		"font-size" : 11,
		"font-family" : "tahoma,arial,verdana,sans-serif"
	},

	setHeaderSize : function(val) {
		val = this._updatecurrentconfig('headerSize', val);
	},
	/**
	 * @event changeTitle
	 * @param {node} The <tt>JSD.diagram.Node</tt> object to which the title belongs
	 * @param {string} newValue
	 * @param {string} oldValue
	 * Fires just before the title is updated. A handler can return false to cancel the update.
	 */

	/*_createHeader: function(strTitle){
	 var d = this.diagram;
	 var w = this.headerPosition==='left' ? this.headerSize : this.getWidth();
	 var h = this.headerPosition==='left' ? this.getHeight() : this.headerSize;
	 //val = this._updatecurrentconfig('header', val);
	 if (this.headerEl) {
	 return
	 }

	 strTitle = strTitle || this.title;
	 var rnd = this.rounded || 0;
	 this.headerEl = d.sheet.rect(this.getX(), this.getY(), w, h, rnd).attr(this.headerConfig).hide();
	 this.titleTextEl = d.sheet.text(this.getX() + w / 2, this.getY() + h / 2, strTitle).hide();
	 this.headerEl.parentObj = this;
	 this.titleTextEl.parentObj = this;
	 if (this.headerPosition === "left") {
	 this.titleTextEl.rotate(270);
	 }

	 this.all.push(this.headerEl);
	 this.all.push(this.titleTextEl);

	 if (this.editMode && d.editMode) {
	 this.titleTextEl.dblclick(function(event){
	 this.parentObj.diagram.editLabelEl(this, 'setTitle');
	 });
	 this.headerEl.dblclick(function(event){
	 //console.log('dclk');
	 this.parentObj.diagram.editLabelEl(this.parentObj.titleTextEl, 'setTitle');
	 })
	 }
	 },
	 */

	_setTitle : function(strTitle) {
		if (this.header === false || this.type !== "rect") {
			this.headerEl.remove();
			delete this.headerEl;
			return
		}
		strTitle = this._updatecurrentconfig('title', strTitle);
		var d = this.diagram;
		var w = this.headerPosition === 'left' ? this.headerSize : this.getWidth();
		var h = this.headerPosition === 'left' ? this.getHeight() : this.headerSize;
		var transform = "";

		if (!this.headerEl) {
			//this._createHeader(strTitle)
			var x = this.getX();
			var y = this.getY();
			this.headerEl = d.sheet.rect(x, y, 0, 0, this.rounded || 0).hide();
			//.attr(this.headerConfig)
			this.titleTextEl = d.sheet.text(0, 0, strTitle).hide();
			this.headerEl.parentObj = this;
			this.titleTextEl.parentObj = this;
			this.all.push(this.headerEl);
			this.all.push(this.titleTextEl);
			if (this.editMode && d.editMode) {
				this.titleTextEl.dblclick(function(event) {
					this.parentObj.diagram.editLabelEl(this.parentObj, 'setTitle');
				});
				this.headerEl.dblclick(function(event) {
					//console.log('dclk');
					this.parentObj.diagram.editLabelEl(this.parentObj, 'setTitle');
				})
			}
			if (this.headerPosition === "left") {
				transform = "R" + 270 + ",0,0 T" + x + "," + y;
			} else {
				transform = "T" + x + "," + y;
			}
			this.titleTextEl.attr({
				transform : transform
			});

			var myevts = JSD._myevtsList.split(" ");

			for (var i = 0; i < myevts.length; i++) {
				var myevt = myevts[i];
				this.headerEl.node["on" + myevt] = JSD._evtFn(myevt, this);
				this.titleTextEl.node["on" + myevt] = JSD._evtFn(myevt, this)
			}

		}

		this.animAttr.headerAttr = {
			x : this.getX(),
			y : this.getY(),
			width : w,
			height : h,
			r : this.rounded || 0
		}

		if (this.headerPosition === "left") {
			transform = "R" + 270 + ",0,0 T" + (x + w / 2) + "," + (y + h / 2);
		} else {
			transform = "T" + (x + w / 2) + "," + (y + h / 2);
		}
		this.animAttr.titleAttr = {
			text : strTitle,
			transform : transform
		};

		if (this.headerPosition === "left") {
			//this.titleTextEl.rotate(270, this.getX() + w / 2, this.getY() + h / 2);
			this.animAttr.titleAttr.transform = "R" + 270 + ",0,0 T" + (this.getX() + w / 2) + "," + (this.getY() + h / 2);
		}

		if (this.titleConfig) {
			JSD.apply(this.animAttr.titleAttr, this.titleConfig)
		}
		if (this.headerConfig) {
			JSD.apply(this.animAttr.headerAttr, this.headerConfig)
		}

	},

	setTitle : function(strTitle) {
		if (this.header === false || this.type !== "rect") {
			return
		}

		if (this.titleTextEl) {
			var newValue = strTitle;
			var oldValue = this.titleTextEl.attr("text");
			if (newValue !== oldValue) {
				var success = this.fireEvent("changetitle", this, newValue, oldValue);
				if ( typeof success === 'boolean' && !success) {
					//newValue = oldValue;
					return false;
				}
			}
		}

		this._setTitle(strTitle);

		this.headerEl.attr(this.animAttr.headerAttr).show();
		this.titleTextEl.attr(this.animAttr.titleAttr).show();

		this.title = strTitle;
		this.alignElements();

		//this.fireEvent('titlechange', this, strTitle);
	},

	setTitleConfig : function(cfg) {
		this.titleConfig = cfg;
		this.currentConfig.titleConfig = cfg;
		this.titleTextEl.attr(cfg);
	}
});

//=================================      GROUP API      ====================================
/**
 * @class JSD.diagram.Group
 * @extends JSD.diagram.Container
 */
//JSD.diagram.Container = JSD.extend(JSD.diagram.Node, {
JSD.define({
	className : "JSD.diagram.Group",
	extend : "JSD.diagram.Container",
	cmpType : 'group',

	constructor : function(cfg) {
		JSD.diagram.Group.superclass.constructor.call(this, cfg);
	},

	fill : "none",
	stroke : "none",
	locked : true,

	/** @method	 */
	unGroup : function() {
		/** @event */
		this.fireEvent("beforeungroup", this);

		/** @class JSD.diagram.Diagram */
		var groupCmp = this;
		/** @event */
		this.diagram.fireEvent("beforeungroup", groupCmp);
		/** @class JSD.diagram.Group */

		var p = this.parent;
		this.blur();
		while (this.items.length) {
			var o = this.items[0];
			p.add(o);
			o.focus(true);
		}
		var ungroupedItemsArray = this.diagram.selectedItems;
		/** @class JSD.diagram.Diagram */
		/** @event */
		this.diagram.fireEvent("ungroup", ungroupedItemsArray);
		/** @class JSD.diagram.Group */

		this.destroy();
	}
})

//=================================        EDGE API        =====================================
/**
 * @class JSD.diagram.Edge
 * @extends JSD.diagram.Component
 */
//JSD.diagram.Edge = JSD.extend(JSD.diagram.Component, {
JSD.define({
	className : 'JSD.diagram.Edge',
	cmpType : 'edge',
	extend : "JSD.diagram.Component",

	constructor : function(cfg) {
		this.initialConfig = cfg;
		this.currentConfig = JSD.clone(this.initialConfig);

		this.render(cfg)
	},

	render : function(cfg, rebuild) {

		if (rebuild) {
			this.currentConfig = JSD.clone(this.initialConfig);
			//now reset all property values to their default
			var props = JSD.edgeConfigList.split(",");
			for (var i = 0; i < props.length; i++) {
				var p = props[i];
				this[p] = this.getDefault(p);
			}
		}

		//need to make sure that any cfg options which are OBJECTS (eg. labelConfig) are not overwritten in currentConfig
		for (var name in cfg) {
			if (JSD.isObject(cfg[name])) {
				if (cfg.hasOwnProperty(name)) {
					if (this.currentConfig[name]) {
						cfg[name] = JSD.apply(this.currentConfig[name], cfg[name]);
					}
				}
			}
		}

		cfg = (!cfg ? this.currentConfig : (JSD.apply(this.currentConfig, cfg)));

		if (cfg.renderTo) {
			if ( typeof cfg.renderTo === "string") {
				var diagramId = cfg.renderTo;

				this.diagram = JSD.getDiagram(diagramId);
			} else {
				this.diagram = cfg.renderTo;
				//delete this.renderTo;
			}
		}
		if (!this.diagram) {
			this.diagram = JSD.renderTo;
		}

		/**
		 * @property {JSD.diagram.Diagram} diagram The JSD.diagram.Diagram element in which this node is contained.
		 * Read only.
		 */

		var diagram = this.diagram;
		var thisEdge = this;

		//2. apply diagram settings
		var defaults = diagram[this.cmpType + 'Defaults'];
		if (defaults && !this.ignoreDefaults) {
			JSD.apply(this, defaults);
		};
		//if (!this.rendered) {
		JSD.diagram.Edge.superclass.constructor.call(this, cfg);
		//}
		/*
		 this.fill = diagram.defaults.fill;
		 this.edgeType = diagram.defaults.edgeType;
		 this.exitSide = diagram.defaults.exitSide;
		 this.entrySide = diagram.defaults.entrySide;
		 this.curve = diagram.defaults.curve;
		 */

		/*cfg.fill = cfg.fill ? cfg.fill : diagram.defaults.fill;
		 cfg.edgeType = cfg.edgeType ? cfg.edgeType : diagram.defaults.edgeType;
		 cfg.exitSide = cfg.exitSide ? cfg.exitSide : diagram.defaults.exitSide;
		 cfg.entrySide = cfg.entrySide ? cfg.entrySide : diagram.defaults.entrySide;
		 cfg.curve = cfg.curve ? cfg.curve : diagram.defaults.curve;
		 */

		this.parent = this.diagram;

		if ( typeof cfg.fromNode === 'string') {
			this.fromNode = diagram.getNode(cfg.fromNode)
		}
		if ( typeof cfg.toNode === 'string') {
			this.toNode = diagram.getNode(cfg.toNode)
		}

		if (!this.rendered) {
			this.graphic = diagram.sheet.path("M0,0").hide();

			this.graphic.parentObj = this;
			this.background = diagram.sheet.path("M0,0").attr({
				//stroke: '#000',
				"stroke-opacity" : 0.001,
				"stroke-width" : 15
			}).hide();

			this.background.parentObj = this;
			this.background.isBackground = true;
			this.all = diagram.sheet.set();
			this.all.push(this.graphic, this.background);

			//var myevtsList = "click mouseout mouseover";
			var myevts = JSD._myevtsList.split(" ");

			for (var i = 0; i < myevts.length; i++) {
				var myevt = myevts[i];
				this.graphic.node["on" + myevt] = JSD._evtFn(myevt, this);
				this.background.node["on" + myevt] = JSD._evtFn(myevt, this)
			}
		}

		this.animAttr = {};
		this._setConnection(null, this.diagram.animateRender);
		//console.log(this.id+" rendered = "+this.rendered);
		if (!this.rendered) {
			this.graphic.attr({
				path : "M" + this.pathArray[0][0] + "," + this.pathArray[0][1],
				length : 0
			});
			//make label tiny so that it will animate properly
			if (this.labelEl) {
				this.labelEl.attr({
					"font-size" : 0
				});
				this.labelEl.background.attr({
					width : 0,
					height : 0
				})
			}
		}
		this.graphic.fullPath = this.actualPath || this.path;

		var gAttr = {
			stroke : this.stroke,
			"opacity" : this.opacity || this.strokeOpacity,
			"stroke-dasharray" : this.strokeDasharray,
			"stroke-width" : this.strokeWidth,
			"stroke-linecap" : this.strokeLinecap,
			//fill: this.fill,
			//"fill-opacity": this.fillOpacity,
			//path: this.path
			path : this.actualPath || this.path
		};

		if (!this.isCmpType('_tempedge')) {
			this.graphic.attr({
				"arrow-end" : this.arrowEnd || "none",
				"arrow-start" : this.arrowStart || "none"
			});
		}
		if (this.graphic.attr("length") === 0) {
			gAttr.length = 1
		}
		var bgAttr = {
			"fill-opacity" : 0,
			fill : "#ff0000",
			"stroke-opacity" : 0,
			path : this.path
		}

		this.background.attr({
			path : this.path
		})

		this.animAttr.gAttr = gAttr;
		this.animAttr.bgAttr = bgAttr;

		if (this.editMode && this.diagram.editMode) {
			this.enableEdit();
			this.background.attr({
				cursor : 'move'
			});
		}

		if (!this.isCmpType('_tempedge')) {
			if (!this.rendered) {
				diagram.edgeCollection.push(this);
				diagram.items.push(this);
			}
		}

		if (this.hidden) {
			this.rendered = true;
		} else {
			if (!this.diagram.animateRender) {
				//console.log('go');
				this.all.show();
				this.graphic.attr(gAttr).show();
				this.rendered = true;
			} else {
				//this.graphic.attr({
				//	"path": "M" + this.pathArray[0][0] + "," + this.pathArray[0][1]
				//});
				this.rendered = true;

				if (diagram._renderMultiItems) {
					diagram._animationQueue.push(this)
				} else {
					this._animateRender();
				}
			}
		}

		return this;
	},

	_animateRender : function(gAttr) {
		var gAttr = gAttr || this.animAttr.gAttr;
		var lAttr = this.animAttr.labelAttr;
		//console.dir(lAttr);
		var lBGAttr = this.animAttr.labelBGAttr;
		//var newPath = this.path;
		var edge = this;
		var d = this.diagram;
		//console.log(newPath);
		//console.log(this.pathArray[0][0]+"," + this.pathArray[0][1]);
		//this.graphic.attr({
		//	"path": "M" + this.pathArray[0][0] + "," + this.pathArray[0][1]
		//});
		this.all.hide();
		this.graphic.show();
		this.graphic.stop().animate(gAttr, d.animateRenderDuration, d.animateRenderEasing, function() {
			edge.all.show();
			edge.background.attr({
				path : gAttr.path
			});
			if (edge.arrowHead) {
				var newAttr = {
					path : edge.arrowHeadPath,
					"stroke-width" : edge.getStrokeWidth(),
					fill : edge.freestyle ? "none" : edge.fill
				}
				edge.arrowHead.show();
				edge.arrowHead.attr(newAttr)
			}
			if (edge.arrowTail) {
				var newAttr = {
					path : edge.arrowTailPath,
					"stroke-width" : edge.getStrokeWidth(),
					fill : edge.freestyle ? "none" : edge.fill
				}
				edge.arrowTail.show();
				edge.arrowTail.attr(newAttr)
			}
		});

		/*if (this.arrowHead) {
		 var newAttr = {
		 path : this.arrowHeadPath,
		 "stroke-width": this.getStrokeWidth(),
		 fill : this.freestyle ? "none" : this.fill
		 }

		 //if (this.freestyle){
		 //	newAttr["stroke-width"] = this.getStrokeWidth;
		 //} else {
		 //	newAttr["stroke-width"] = 1;
		 //}

		 if (this.arrowHeadTransform) {
		 //console.log('before='+this.arrowHead.attr('transform').toString())
		 newAttr.transform = this.arrowHeadTransform
		 //console.log('after='+this.arrowHeadTransform.toString())
		 }
		 this.arrowHead.show();
		 this.arrowHead.stop().animate(newAttr, d.animateRenderDuration, d.animateRenderEasing, function() {
		 if (edge.label === "Reject") {
		 //console('')
		 //alert('done')
		 }
		 });
		 }
		 if (this.arrowTail) {
		 this.arrowTail.show();
		 this.arrowTail.stop().animate({
		 path : this.arrowTailPath,
		 transform : this.arrowTailTransform
		 }, d.animateRenderDuration, d.animateRenderEasing, function() {
		 });
		 }
		 */
		if (this.label) {
			this.labelEl.show();
			this.labelEl.stop().animate(lAttr, d.animateRenderDuration, d.animateRenderEasing, function() {
				//console.log('done')
				//console.log(this.label + 'labelEl done');
				//thisEdge.labelEl.show();
			});
			this.labelEl.background.show();
			this.labelEl.background.stop().animate(lBGAttr, d.animateRenderDuration, d.animateRenderEasing, function() {
				//console.log('done')
				edge.all.show();
				//thisEdge.labelEl.show();
			});
		}

		this.rendered = true;
	},

	ignoreDefaults : false,

	//editable: true,

	/**
	 * @property {Boolean} editMode Readonly. Returns <tt>true</tt> if this element can be edited via the diagram.editor user interface.
	 * If diagram.editMode is also true (diagram.editMode has been set to true in config, this property may still return true but will.
	 */

	/**
	 * @method enableEdit
	 * sets editMode to true
	 */
	editMode : true,

	editorConfig : {
		deleteEdge : true,
		disconnectEdge : true
	},

	hide : function() {
		this.all.hide();
		//this.blur();
	},

	show : function() {
		this.all.show();
	},

	hidden : false,

	enableEdit : function() {
		if (this.diagram.editMode) {
			var diagram = this.diagram;
			var edge = this;
			var fe = this.diagram.focusEdge;
			//alert('wait...');
			//Ext.get('center2').dom.innerHTML += 'wait...<br>';
			var dp = this.diagram.focusEdge.dragProxy;

			var edgeDragStart = function(x, y, evt) {
				evt = evt || window.event;
				if (evt.preventDefault) {
					evt.preventDefault()
				} else {
					evt.returnValue = false
				}
				if (evt.stopPropagation) {
					evt.stopPropagation()
				} else {
					evt.cancelBubble = true
				}

				var multiSelect = (evt.ctrlKey) ? true : false;

				// "this" = the underlying (edge.graphic) Raphael element oOR the edge.background
				this.parentObj.focus(multiSelect);
				dp.dx = 0;
				dp.dy = 0;
				dp.attr({
					path : this.parentObj.graphic.attr("path")
				});

				var b = 0;
				var r = 0;
				var pa = this.parentObj.pathArray;
				for (var i = 0; i < pa.length; i++) {
					if (pa[i][1] > b) {
						b = pa[i][1]
					}
					if (pa[i][0] > r) {
						r = pa[i][0]
					}
				}
				dp.or = r;
				dp.ob = b;
				dp.right = r;
				dp.bottom = b;

			};
			var edgeDragMove = function(dx, dy, x, y, evt) {
				evt = evt || window.event;
				if (evt.preventDefault) {
					evt.preventDefault()
				} else {
					evt.returnValue = false
				}
				if (evt.stopPropagation) {
					evt.stopPropagation()
				} else {
					evt.cancelBubble = true
				}

				var z = this.parentObj.diagram.getZoom();
				dx = Raphael.snapTo(diagram.snapTo, dx / z);
				dy = Raphael.snapTo(diagram.snapTo, dy / z);
				//target.pathArray[0]

				dp.dx = dx;
				dp.dy = dy;
				if (dx === 0 && dy === 0) {
					return;
				}
				dp.right = dp.or + dx;
				dp.bottom = dp.ob + dy;
				dp.show();
				dp.toFront();
				dp.attr({
					path : this.parentObj.graphic.attr("path"),
					transform : "t" + dx + "," + dy
				});
				//dp.translate(dx, dy);
				this.parentObj.diagram.setSizeFit(true);

			};
			var edgeDragStop = function(evt) {
				evt = evt || window.event;

				var e = edge;
				var d = e.diagram;
				if (e.rightClick === true) {
					return
				}
				if (evt.preventDefault) {
					evt.preventDefault()
				} else {
					evt.returnValue = false
				}
				if (evt.stopPropagation) {
					evt.stopPropagation()
				} else {
					evt.cancelBubble = true
				}
				//console.dir(e);
				//this.parentObj.graphic.setConnection

				var dx = dp.dx;
				var dy = dp.dy;
				if (Math.abs(dx) < 6 && Math.abs(dy) < 6) {
					dp.hide();
					dp.attr({
						transform : ""
					});
					return;
				}
				var fromX = this.parentObj.pathArray[0][0] + dx;
				var fromY = this.parentObj.pathArray[0][1] + dy;
				var len = this.parentObj.pathArray.length;
				var toX = this.parentObj.pathArray[len - 1][0] + dx;
				var toY = this.parentObj.pathArray[len - 1][1] + dy;
				for (var i = 0; i < len; i++) {
					this.parentObj.pathArray[i][0] += dx;
					this.parentObj.pathArray[i][1] += dy;
				}
				var newCfg = {
					pathArray : this.parentObj.pathArray,
					fromNode : [fromX, fromY],
					toNode : [toX, toY]
				};
				/** @class JSD.diagram.Diagram */
				/** @event */
				d.fireEvent("uiedgedragbeforemove", e, newCfg.fromNode, newCfg.toNode, newCfg.pathArray);
				/** @class JSD.diagram.Edge */
				/** @event */
				e.fireEvent("uidragbeforemove", e, newCfg.fromNode, newCfg.toNode, newCfg.pathArray);

				this.parentObj.setConnection(newCfg);

				dp.hide();
				dp.attr({
					transform : ""
				});
				/** @class JSD.diagram.Diagram */
				/** @event */
				d.fireEvent("uiedgedragmove", e, newCfg.fromNode, newCfg.toNode, newCfg.pathArray);
				/** @class JSD.diagram.Edge */
				/** @event */
				e.fireEvent("uidragmove", e, newCfg.fromNode, newCfg.toNode, newCfg.pathArray);

				this.parentObj.focus();
			};

			if (!edge.graphic._dblclick) {
				edge.graphic.dblclick(function(event) {
					diagram.editLabelEl(edge);
				});
				edge.graphic._dblclick = true;
			}
			if (!edge.background._dblclick) {
				edge.background.dblclick(function(event) {
					diagram.editLabelEl(edge);
				});
				edge.background._dblclick = true;
			}
			if (edge.labelEL) {
				if (!edge.labelEl._dblclick) {
					edge.labelEl.dblclick(function(event) {
						diagram.editLabelEl(edge);
						//this.parentObj.diagram.editLabelEl(this.parentObj);
					});
					edge.labelEl._dblclick = true;
				}
			}
			if (!this._drag) {
				this.all.drag(edgeDragMove, edgeDragStart, edgeDragStop);
				this._drag = true;
			}
			JSD.actionInProgress = '';
		}
	},

	//arrowHeadShape: 1,
	// 1 - 5;
	arrowHeadSize : 2,
	arrowTailSize : 2,
	// 1 - 5;

	setEdgeType : function(type) {
		type = this._updatecurrentconfig('edgeType', type);
		this.edgeType = type;
		delete this.pathArray;
		this.setConnection();
		this.focus();
	},

	rendered : false,

	toFront : function() {
		//this.parent.add(this);
		this.fireEvent("beforetofront", this);
		this.diagram.fireEvent("beforetofront", this);

		this.parent._remove(this, false);
		this.parent._addExisting(this);

		this.fireEvent("tofront", this);
		this.diagram.fireEvent("tofront", this);
		//container's tofront event - handlers are passed 2 params - 1. container, 2. item to remove
		return this
	},

	toBack : function(ignoreContainer) {
		this.fireEvent("beforetoback", this);
		this.diagram.fireEvent("beforetoback", this);

		if (!this.parent.isCmpType('container') || ( typeof ignoreContainer === 'boolean' && ignoreContainer)) {
			if (this.all.length > 0) {
				this.diagram.insert(0, this);
			}
		} else {
			//console.log('toback of container');
			this.parent.insert(0, this);
		}
		if (this.diagram.background) {
			this.diagram.background.toBack();
		}

		this.fireEvent("beforetoback", this);
		this.diagram.fireEvent("beforetoback", this);
	},

	/**
	 * @cfg {Boolean} editMode
	 * If the diagram containing this element has <tt>editMode</tt> also set to <tt>true</tt> then
	 * this element will be editable via the user interface i.e. users can drag, connect, disconnect, edit label etc. See
	 * editorConfig for more editor options. Diagram.editMode will override this option. Defaults to <tt>true</tt>.
	 * @cfg {Object} editorConfig
	 * Defaults to {deleteEdge: true, disconnectEdge: true}

	 * @property {Boolean} isEdge
	 * Read-only. This property can be used to interogate this item to see whether it is an <tt>edge</tt> object
	 */

	setStroke : function(val) {
		//if(!val){return this};
		val = val || this.stroke;

		this.graphic.attr({
			stroke : val
			//	fill : val
		});
		if (this.arrowHead) {
			this.arrowHead.attr({
				stroke : val
			});
		}
		if (this.arrowTail) {
			this.arrowTail.attr({
				stroke : val
			});
		}
		this.stroke = val;
		this.currentConfig.stroke = val;
		return this;
	},

	/*
	 setStrokeDasharray : function(val) {
	 val = val || this.strokeDasharray;
	 this.graphic.attr({
	 "stroke-dasharray" : val
	 });
	 this.strokeDasharray = val;
	 this.currentConfig.strokeDasharray = val;
	 return this;
	 },
	 */

	setStrokeOpacity : function(val) {
		val = val || this.strokeOpacity;
		if (this.arrowHead) {
			this.arrowHead.attr({
				"stroke-opacity" : val
			});
		}
		if (this.arrowTail) {
			this.arrowTail.attr({
				"stroke-opacity" : val
			});
		}
		this.graphic.attr({
			"stroke-opacity" : val
		});
		this.strokeOpacity = val;
		this.currentConfig.strokeOpacity = val;
		return this;
	},

	setStrokeWidth : function(val) {
		val = val || this.strokeWidth;
		this.graphic.attr({
			"stroke-width" : val
		});
		this.strokeWidth = val;
		this.currentConfig.strokeWidth = val;
		return this;
	},

	setFill : function(val) {
		val = val || this.fill;
		if (this.arrowHead) {
			this.arrowHead.attr({
				fill : val
			});
		}
		if (this.arrowTail) {
			this.arrowTail.attr({
				fill : val
			});
		}
		this.graphic.attr({
			fill : val
		});
		this.fill = val;
		this.currentConfig.fill = val;
		return this;
	},

	setFillOpacity : function(val) {
		val = val || this.fillOpacity;
		if (this.arrowHead) {
			this.arrowHead.attr({
				"fill-opacity" : val
			});
		}
		if (this.arrowTail) {
			this.arrowTail.attr({
				"fill-opacity" : val
			});
		}
		this.fillOpacity = val;
		this.currentConfig.fillOpacity = val;
		return this;
	},

	/**
	 * @method
	 * Returns the X coordinate furthest from the diagram origin point.
	 * @return {Number} The right-most
	 */
	getRight : function() {
		var r = 0;
		var pa = this.pathArray;
		for (var i = 0; i < pa.length; i++) {
			if (pa[i][0] > r) {
				r = pa[i][0]
			}
		}
		return r
	},

	/**
	 * @method
	 * Returns the Y coordinate furthest from the diagram origin point.
	 * @return {Number} The right-most
	 */
	getBottom : function() {
		var b = 0;
		var pa = this.pathArray;
		for (var i = 0; i < pa.length; i++) {
			if (pa[i][1] > b) {
				b = pa[i][1]
			}
		}
		return b
	},

	fill : "#000000",
	fillOpacity : 1,
	stroke : "#000000",
	strokeWidth : 3,
	strokeOpacity : 1,

	/**
	 * @cfg {String} strokeLinecap
	 * Determines the "stroke-linecap" attribute of this edge/path
	 */
	strokeLinecap : 'butt',

	//fill: '#000',

	/**
	 * @cfg {String} edgeType
	 * The 'shape' of this edge. Defaults to 'orthogonal'. Accepted values are:
	 * <ul>
	 * 	<li>straight</li>
	 * <li>orthogonal (can be used in conjunction with the {@link #curve} config option to create rounded corners)</li>
	 * <li>curved</li></ul>
	 * _See also {@link #setEdgeType}.
	 */
	edgeType : 'orthogonal', // straight

	/**
	 * @cfg {String} entrySide
	 * The connection point for the end-point of this edge.
	 * _For example, if entrySide = 'top', then this edge will connect to it's end-point from the top.
	 * _Defaults to 'auto'.
	 * Accepted values are as follows:
	 * <ul>
	 * _<li>auto
	 * <div></div></li>
	 * _<li>top</li>
	 * _<li>bottom</li>
	 * _<li>left</li>
	 * _<li>right</li>
	 * _<li>center</li></ul>

	 * @cfg {String} exitSide
	 * The connection point for the start-point of this edge.
	 * _For example, if exitSide = 'top', then this edge will connect to it's start-point from the top.
	 * _Defaults to 'auto'.
	 * Accepted values are as follows:
	 * <ul>
	 * _<li>auto
	 * <div></div></li>
	 * _<li>top</li>
	 * _<li>bottom</li>
	 * _<li>left</li>
	 * _<li>right</li>
	 * _<li>center</li></ul>
	 */

	fromPort : 'auto',
	toPort : 'auto',

	/**
	 * @cfg {Number} curve
	 * This config option is valid only when the {@link #edgeType} option is set to 'orthogonal'. Determines the radius (in pixels) of the rounded-corners of this edge. Defauls to 0 (zero)
	 */
	curve : 0,

	/**
	 * @event changeLabel
	 * @param {Edge} <tt>JSD.diagram.Edge</tt> object to which the label belongs
	 * @param {String} newValue
	 * @param {String} oldValue
	 * Fires just before the label is updated. A handler can return false to cancel the update.
	 */

	//labelConfig : {
	//	"font-size" : 11,
	//	"font-family" : "tahoma,arial,verdana,sans-serif"
	//},

	_getCenterPt : function() {
		var tmp = this.diagram.sheet.path(this.path).hide();
		var len = Raphael.snapTo(1, tmp.getTotalLength(), 1);
		var textPt = tmp.getPointAtLength(Math.round(len / 2));

		tmp.remove();
		return textPt
	},

	/**
	 * @method setLabel
	 * Sets the label string of this edge.
	 * @param {String} label
	 * @return {Edge} thisEdge
	 */
	setLabel : function(labelString, hideMe) {
		//hideMe is a private param
		var diagram = this.diagram;
		this.label = labelString;
		if (!this.labelEl) {
			var textPt = this._getCenterPt();
			this._createLabelEl(textPt.x + this.labelOffset[0], textPt.y + this.labelOffset[1], labelString);
			var labelAttr = {
				"fill-opacity" : 1
			}
			JSD.apply(labelAttr, this.labelConfig);

			var labelBGAttr = {
				"fill-opacity" : 1
			}
			this.labelEl.attr(labelAttr);
			this.labelEl.background.attr(labelBGAttr);
			/*
			 this.labelEl = diagram.sheet.text(textPt.x, textPt.y, labelString).hide();
			 this.labelEl.set = this.setLabel;
			 if(this.editMode && this.diagram.editMode){
			 this.labelEl.dblclick(function(event){
			 this.parentObj.diagram.editLabelEl(this)
			 })
			 this.graphic.dblclick(function(event){
			 this.parentObj.diagram.editLabelEl(this.parentObj.labelEl);
			 })
			 }

			 if (this.labelConfig){
			 this.setLabelConfig(this.labelConfig)
			 }
			 this.all.push(this.labelEl);
			 //this.textbox = diagram.sheet.text();
			 var txtCfg = this.labelEl.getBBox();
			 this.labelEl.background = diagram.sheet.rect(txtCfg.x - 2, txtCfg.y, txtCfg.width + 4, txtCfg.height).attr({
			 fill: "#ffffff",
			 //"fill-opacity": 0,
			 stroke: "#ffffff",
			 "stroke-opacity": 0
			 }).hide();

			 this.labelEl.parentObj = this;
			 //this.labelEl.all = diagram.sheet.set();
			 //this.labelEl.all.push(this.labelEl, this.labelEl.background)
			 this.labelEl.insertAfter(this.labelEl.background);
			 //this.textbox.attr({fill: "#cccccc"});
			 this.label = labelString;
			 this.all.push(this.labelEl.background);

			 var myevts = JSD._myevtsList.split(" ");

			 for (var i = 0; i < myevts.length; i++) {
			 var myevt = myevts[i];
			 this.labelEl.node["on"+myevt] = JSD._evtFn(myevt, this)
			 }
			 */

		} else {
			var newValue = labelString;
			var oldValue = this.labelEl.attr("text");
			if (newValue !== oldValue) {
				var success = this.fireEvent("changelabel", this, newValue, oldValue);
				if (success === false) {
					//newValue = oldValue;
					//console.log(success);
					return false;
				}
			}
			this.labelEl.attr({
				text : labelString
			});
			var txtCfg = this.labelEl.getBBox();
			this.labelEl.background.attr({
				x : txtCfg.x - 2,
				y : txtCfg.y,
				width : txtCfg.width + 4,
				height : txtCfg.height
			})
		}
		this.currentConfig.label = labelString;
		//if (!hideMe && !this.hidden) {
		this.labelEl.show();
		this.labelEl.background.show()
		return this
		//}
	},

	/**
	 * @method setLabelConfig
	 * @param {Object} config
	 * @return {Edge} thisEdge
	 * The attributes to apply to the label (Raphael object).
	 */

	setLabelConfig : function(cfg) {
		this.labelConfig = cfg;
		this.labelEl.attr(cfg);
		return this
	},

	setLabelText : function(labelTxt) {
		this.labelEl.attr({
			text : labelTxt
		});
		//this.currentConfig.label = labelTxt;
	},

	/**
	 * @cfg {Array} labelOffset
	 * Array of coordinates representing the position of the label relative to center point of the line. Defaults to [0,0].
	 */
	labelOffset : [0, 0],

	/**
	 * @method setLabelPositionXXX
	 * @param {Array} labelOffset
	 * @return {Edge} thisEdge
	 * A method to allow reposition of label relative to center point of the line. See also {@link #cfg-labelOffset} config option.
	 * _Takes a 2 dimensional array as paramater denoting the horizontal and vertical offset.
	 * For example, to move the label 10 pixels to the left and
	 * 20 pixels below the center of the line:
	 * -
	 * -    myConnection.setLabelPosition([-10, 20]);
	 * -
	 */

	setLabelPosition : function(offset) {
		if (offset) {
			this.labelOffset = offset;
			//this.currentConfig.offset = offset;
		} else {
			//delete (this.currentConfig.offset);
			offset = this.labelOffset || [0, 0];
		}
		var len = Math.round(this.graphic.getTotalLength());
		var textPt = this.graphic.getPointAtLength(Math.round(len / 2));
		this.labelEl.attr({
			x : textPt.x + offset[0],
			y : textPt.y + offset[1]
		})
		var txtCfg = this.labelEl.getBBox();
		this.labelEl.background.attr({
			x : txtCfg.x - 2,
			y : txtCfg.y,
			width : txtCfg.width + 4,
			height : txtCfg.height
		});
		this.labelEl.toFront();

		return this

	},

	/**
	 * @method setConnection
	 * Connects this edge element to node elements or to diagram co-ordinates.<br>
	 * @param {Object} config
	 * The config object accepts the following properties:
	 * <ul>
	 * _<li>{@link #fromNode}</li>
	 * _<li>{@link #toNode}</li>
	 * _<li>{@link #exitSide}</li>
	 * _<li>{@link #entrySide}</li>
	 * _<li>{@link #fill}</li>
	 * _<li>{@link #freestyle}</li>
	 * _<li>{@link #edgeType}</li>
	 * _<li>{@link #curve}</li>
	 * _<li>{@link #pathArray}</li>
	 * </ul>
	 * @return void
	 *
	 */
	setConnection : function(cfg, animate) {
		this._setConnection(cfg);
		/*this.background.attr({
		 path: this.path
		 });
		 this.graphic.attr({
		 path: this.adjustedPath
		 //stroke: cfg.fill,
		 //"stroke-width": 1
		 });
		 */
		if (this.labelEl) {
			//this try/catch block is necessary to get round
			//an error that occurs in the getLengthFactory and getPointAtSegmentLength function
			//in raphael.js library - seems to occur only during animation
			try {
				this.setLabelPosition();
			} catch (err) {
				//console.log("error - " + err);
			}
		}

		//console.log('parent = '+this.toNode.parent.id);
		return this;
	},

	_setConnection : function(cfg, animate) {
		//sets everything except the path of the .graphic element
		var diagram = this.diagram;
		cfg = cfg || {};
		var thisConnection = this;

		cfg.fromNode = cfg.fromNode || this.fromNode;
		cfg.toNode = cfg.toNode || this.toNode;

		this._updatecurrentconfig('fromNode', (cfg.fromNode.isNode) ? cfg.fromNode.id : cfg.fromNode);
		this._updatecurrentconfig('toNode', (cfg.toNode.isNode) ? cfg.toNode.id : cfg.toNode);
		//cfg.exitSide = this._updatecurrentconfig('exitSide', cfg.exitSide);
		//cfg.entrySide = this._updatecurrentconfig('entrySide', cfg.entrySide);
		cfg.fromPort = this._updatecurrentconfig('fromPort', cfg.fromPort);
		cfg.toPort = this._updatecurrentconfig('toPort', cfg.toPort);
		cfg.edgeType = this._updatecurrentconfig('edgeType', cfg.edgeType);
		cfg.curve = this._updatecurrentconfig('curve', cfg.curve);
		this.edgeType = cfg.edgeType;

		cfg.edge = this;

		if ( typeof cfg.toNode === 'string') {
			cfg.toNode = diagram.getNode(cfg.toNode)
		}
		if ( typeof cfg.fromNode === 'string') {
			cfg.fromNode = diagram.getNode(cfg.fromNode)
		}

		if (cfg.fromNode.isNode) {
			cfg.fromPort = (cfg.fromNode.ports[cfg.fromPort] ? cfg.fromPort : 'auto');
			cfg.fromPort = this._updatecurrentconfig('fromPort', cfg.fromPort);
		}
		if (cfg.toNode.isNode) {
			cfg.toPort = (cfg.toNode.ports[cfg.toPort] ? cfg.toPort : 'auto');
			cfg.toPort = this._updatecurrentconfig('toPort', cfg.toPort);
		}

		var pathArray, arrowHeadAngle, crv, x, y, path;

		if (cfg.pathArray) {
			pathArray = cfg.pathArray
			this.currentConfig.pathArray = cfg.pathArray;
		} else {
			pathArray = [];
			delete this.currentConfig.pathArray;
			if (this.edgeType === "straight") {
				var fromNodeXY;
				var toNodeXY;
				if (cfg.fromNode.isNode) {
					fromNodeXY = cfg.fromNode.getConnectionCoords(cfg.fromPort);
				} else {
					fromNodeXY = cfg.fromNode
				}
				if (cfg.toNode.isNode) {
					toNodeXY = cfg.toNode.getConnectionCoords(cfg.toPort);
				} else {
					toNodeXY = cfg.toNode
				}

				pathArray[0] = fromNodeXY;
				pathArray[1] = toNodeXY;
				arrowHeadAngle = Raphael.angle(fromNodeXY[0], fromNodeXY[1], toNodeXY[0], toNodeXY[1]);

				var dw, dh, tan, sin, cos, mW, mH, deg, rx, ry, r, w, h;
				if (cfg.fromNode.isNode && (cfg.fromPort === 'center' || cfg.fromPort === 'auto')) {
					deg = arrowHeadAngle;
					tan = Math.tan(deg.toRadians());
					mW = ((fromNodeXY[0] - toNodeXY[0]) / Math.abs(fromNodeXY[0] - toNodeXY[0])) || 1;
					mH = ((fromNodeXY[1] - toNodeXY[1]) / Math.abs(fromNodeXY[1] - toNodeXY[1])) || -1;

					var gtype = (cfg.fromNode.graphic.type);

					switch (gtype) {

						case ('ellipse'):
							sin = Math.sin(deg.toRadians());
							cos = Math.cos(deg.toRadians());
							rx = cfg.fromNode.getWidth() / 2;
							ry = cfg.fromNode.getHeight() / 2;
							r = rx * ry / Math.sqrt(Math.pow(ry * cos, 2) + Math.pow(rx * sin, 2))
							dh = r * sin;
							dw = r * cos;
							pathArray[0][0] = fromNodeXY[0] - dw;
							pathArray[0][1] = fromNodeXY[1] - dh;
							break;
						/*
						 case ('rhombus'):
						 w = cfg.fromNode.getWidth() / 2;
						 h = cfg.fromNode.getHeight() / 2;
						 mW = 1;
						 mH = 1;
						 tanA = h / w;
						 switch (true) {
						 case (deg > 90 && deg <= 180):
						 deg = 180 - arrowHeadAngle;
						 tan = Math.tan(deg.toRadians());
						 mW = -1;
						 mH = -1;
						 break;
						 case (deg > 180 && deg <= 270):
						 deg = arrowHeadAngle - 180;
						 tan = Math.tan(deg.toRadians());
						 mW = -1;
						 break;
						 case (deg > 270 && deg <= 360):
						 deg = 360 - arrowHeadAngle;
						 tan = Math.tan(deg.toRadians());
						 mH = -1;
						 }

						 dw = mW * (w * tanA / (tan + tanA) || 0);
						 dh = mH * ((tan === 0 ? 1 : dw * tan || h));
						 pathArray[0][0] = fromNodeXY[0] - dw;
						 pathArray[0][1] = fromNodeXY[1] - dh;
						 break;
						 */
						case ('path'):
							//path - get the intersection of the line which joins the center points and the node.path
							var c2cpath = "M" + fromNodeXY[0] + "," + fromNodeXY[1] + ",L" + toNodeXY[0] + "," + toNodeXY[1];
							var t = cfg.fromNode.graphic.attr("transform");
							var p = cfg.fromNode.graphic.attr("path");
							var tp = Raphael.transformPath(p, t);
							var inter = Raphael.pathIntersection(c2cpath, Raphael.transformPath(p, t));

							var lineLen = 10000000;
							var interX = fromNodeXY[0];
							var interY = fromNodeXY[1];
							for (var i = 0; i < inter.length; i++) {
								var tmpLine = "M" + inter[i].x + "," + inter[i].y + ",L" + toNodeXY[0] + "," + toNodeXY[1];
								var tmpLen = Raphael.getTotalLength(tmpLine);
								if (tmpLen < lineLen) {
									lineLen = tmpLen;
									interX = inter[i].x;
									interY = inter[i].y;
								}
							}

							pathArray[0][0] = interX;
							pathArray[0][1] = interY;
							break;

						default:
							//bestFit = 'rect';
							dw = cfg.fromNode.getWidth() / 2 * mW;
							dh = Math.round(tan * dw * 10) / 10;
							if (Math.abs(dh) > cfg.fromNode.getHeight() / 2) {
								dh = cfg.fromNode.getHeight() / 2 * mH;
								dw = Math.round(dh / tan * 10) / 10;
							}
							pathArray[0][0] = fromNodeXY[0] - dw;
							pathArray[0][1] = fromNodeXY[1] - dh;
					}
				}

				if (cfg.toNode.isNode && (cfg.toPort === 'center' || cfg.toPort === 'auto')) {
					deg = 360 - arrowHeadAngle;
					tan = Math.tan(deg.toRadians());
					mW = ((toNodeXY[0] - fromNodeXY[0]) / Math.abs(toNodeXY[0] - fromNodeXY[0])) || 1;
					mH = ((toNodeXY[1] - fromNodeXY[1]) / Math.abs(toNodeXY[1] - fromNodeXY[1])) || -1;

					var gtype = (cfg.toNode.graphic.type);

					switch (gtype) {

						case ('ellipse'):
							sin = Math.sin(deg.toRadians());
							cos = Math.cos(deg.toRadians());
							rx = cfg.toNode.getWidth() / 2;
							ry = cfg.toNode.getHeight() / 2;
							r = rx * ry / Math.sqrt(Math.pow(ry * cos, 2) + Math.pow(rx * sin, 2))
							dh = r * sin;
							dw = -r * cos;
							pathArray[1][0] = toNodeXY[0] - Math.round(dw);
							pathArray[1][1] = toNodeXY[1] - Math.round(dh);
							break;
						/*
						 case ('rhombus'):
						 deg = arrowHeadAngle;
						 tan = Math.tan(deg.toRadians());
						 w = cfg.toNode.getWidth() / 2;
						 h = cfg.toNode.getHeight() / 2;
						 mW = -1;
						 mH = 1;
						 tanA = h / w;
						 switch (true) {
						 case (deg > 180 && deg <= 270):
						 deg = arrowHeadAngle - 180;
						 tan = Math.tan(deg.toRadians());
						 mW = 1;
						 //mH = 1;
						 break;
						 case (deg > 270 && deg <= 360):
						 deg = 360 - arrowHeadAngle;
						 tan = Math.tan(deg.toRadians());
						 mH = -1;
						 break;
						 case (deg > 90 && deg <= 180):
						 deg = 180 - arrowHeadAngle;
						 tan = Math.tan(deg.toRadians());
						 mW = 1;
						 mH = -1;
						 break;
						 }
						 dw = mW * (w * tanA / (tan + tanA) || 0);
						 dh = mH * ((tan === 0 ? 1 : dw * tan || h));
						 break;
						 */
						case ('path'):
							//path - get the intersection of the line which joins the center points and the node.path
							var c2cpath = "M" + fromNodeXY[0] + "," + fromNodeXY[1] + ",L" + toNodeXY[0] + "," + toNodeXY[1];
							var t = cfg.toNode.graphic.attr("transform");
							var p = cfg.toNode.graphic.attr("path");
							var tp = Raphael.transformPath(p, t);
							var inter = Raphael.pathIntersection(c2cpath, Raphael.transformPath(p, t));

							var lineLen = 10000000;
							var interX = toNodeXY[0];
							var interY = toNodeXY[1];
							for (var i = 0; i < inter.length; i++) {
								var tmpLine = "M" + inter[i].x + "," + inter[i].y + ",L" + fromNodeXY[0] + "," + fromNodeXY[1];
								var tmpLen = Raphael.getTotalLength(tmpLine);
								if (tmpLen < lineLen) {
									lineLen = tmpLen;
									interX = inter[i].x;
									interY = inter[i].y;
								}
							}

							pathArray[1][0] = interX;
							pathArray[1][1] = interY;
							break;
						default:
							//bestFit = 'rect'
							dw = cfg.toNode.getWidth() / 2 * mW;
							dh = -Math.round(tan * dw * 10) / 10;
							if (Math.abs(dh) > cfg.toNode.getHeight() / 2) {
								dh = cfg.toNode.getHeight() / 2 * mH;
								dw = -Math.round(dh / tan * 10) / 10;
							}
							pathArray[1][0] = toNodeXY[0] - Math.round(dw);
							pathArray[1][1] = toNodeXY[1] - Math.round(dh);
					}

				}
			} else {
				pathArray = JSD.generateEdgePathArray(cfg);
				

				switch (this.getToPort()) {
					case ("left"):
						arrowHeadAngle = 180;
						break;
					case ("right"):
						arrowHeadAngle = 0;
						break;
					case ("top"):
						arrowHeadAngle = 270;
						break;
					case ("bottom"):
						arrowHeadAngle = 90;
						break;
				}
			}
		}

		crv = this.edgeType === "curve" ? null : cfg.curve;
		//console.log(this.label+" - "+pathArray.length);
		for (var i = 0; i < pathArray.length; i++) {

			x = pathArray[i][0];
			y = pathArray[i][1];
			var mx;
			var my;

			if (crv === 0) {
				if (i === 0) {
					path = "M" + pathArray[i][0] + "," + pathArray[i][1];
				}
				path = path + "L" + x + "," + y;
			} else {
				if (i === 0) {
					path = "M" + pathArray[i][0] + "," + pathArray[i][1];
				} else {
					if (this.edgeType === "curve") {
						//are there at least 2 more pts to process?
						if (i < pathArray.length - 2) {
							mx = (pathArray[i][0] + pathArray[i + 1][0]) / 2;
							my = (pathArray[i][1] + pathArray[i + 1][1]) / 2;
							path = path + " Q" + x + "," + y + " " + mx + "," + my;
							//i = i + 1; // skip;
						} else {
							path = path + " Q" + pathArray[pathArray.length - 2][0] + "," + pathArray[pathArray.length - 2][1] + " " + pathArray[pathArray.length - 1][0] + "," + pathArray[pathArray.length - 1][1];
							i = pathArray.length;
						}

					} else {
						// orthogonal
						if (!(i === pathArray.length - 1)) {
							var crvFrom = [pathArray[i - 1][0], pathArray[i - 1][1]];
							var crvTo = [pathArray[i + 1][0], pathArray[i + 1][1]];

							var dx = crvFrom[0] - crvTo[0];
							var dy = crvFrom[1] - crvTo[1];
							var deltaX = Math.abs(dx) / dx;
							var deltaY = Math.abs(dy) / dy;

							if ((y == crvFrom[1])) {
								//y has NOT changed so we must be moving horizontally
								path = path + "L" + (x + (deltaX * Math.min(crv, Math.abs(dx) / 2))) + "," + y + " Q" + x + "," + y + " " + x + "," + (y - (deltaY * Math.min(crv, Math.abs(dy) / 2)));
							} else {
								//y has changed so we are moving vertically
								path = path + "L" + x + "," + (y + (deltaY * Math.min(crv, Math.abs(dy) / 2))) + " Q" + x + "," + y + " " + (x - (deltaX * Math.min(crv, Math.abs(dx) / 2))) + "," + y;
							}
						} else {
							path = path + "L" + x + "," + y;
						}
					}
				}

			}
		}

		this.pathArray = pathArray;

		// ================freestyle=================
		if (this.freestyle) {

			path = this._getRandomPath(path);

		}
		// ================end freestyle=================

		this.path = path;
		this.actualPath = path;

		//find out if new fromNode or new toNode has changed;
		if (this.cmpType !== '_tempedge') {
			if (this.fromNode !== cfg.fromNode && this.fromNode !== cfg.toNode) {
				this._deRegisterConnection('from', this.fromNode)
			}
			if (this.toNode !== cfg.toNode && this.toNode !== cfg.fromNode) {
				this._deRegisterConnection('to', this.toNode)
			}
			if (cfg.fromNode.isNode) {
				this._registerConnection('from', cfg.fromNode);
			}
			if (cfg.toNode.isNode) {
				this._registerConnection('to', cfg.toNode);
			}
		}

		this.fromNode = cfg.fromNode;
		this.toNode = cfg.toNode;
		this.fromPort = cfg.fromPort;
		this.toPort = cfg.toPort;
		//this.fill = cfg.fill;
		this.curve = cfg.curve;

		//=================== edge label ==============
		if (this.label) {
			if (!this.labelEl) {
				this._createLabelEl(this.pathArray[0][0], this.pathArray[0][1], this.label);
			}

			var centerPt = this._getCenterPt();

			var labelAttr = {
				x : centerPt.x + this.labelOffset[0],
				y : centerPt.y + this.labelOffset[1],
				text : this.label,
				"fill-opacity" : 1,
				"font-size" : this.labelConfig["font-size"],
				"font-weight" : this.labelConfig["font-weight"],
				"font-family" : this.labelConfig["font-family"],
				"fill" : this.labelConfig["fill"] || "#000000"
			}

			//font-family will not animate so apply it now explicitly
			if (this.labelConfig) {
				if (this.labelConfig["font-family"]) {
					this.labelEl.attr({
						"font-family" : this.labelConfig["font-family"]
					});
				}
				if (this.labelConfig["font-weight"]) {
					this.labelEl.attr({
						"font-weight" : this.labelConfig["font-weight"]
					});
				}
			}
			//font-weight will not animate so apply it now explicitly

			JSD.apply(labelAttr, this.labelConfig);

			//var dx = labelAttr.x - this.labelEl.attr("x");
			//var dy = labelAttr.y - this.labelEl.attr("y");
			var dx = 0;
			var dy = 0;

			var tmpTextEl = diagram.sheet.text().attr(labelAttr);
			//var txtCfg = this.labelEl.getBBox();
			var txtCfg = tmpTextEl.getBBox();
			tmpTextEl.remove();
			var labelBGAttr = {
				x : txtCfg.x - 2 + dx,
				y : txtCfg.y + dy,
				width : txtCfg.width + 4,
				height : txtCfg.height,
				"fill-opacity" : 1
			}
			this.animAttr.labelAttr = labelAttr;
			this.animAttr.labelBGAttr = labelBGAttr;
		} else {
			if (this.labelEl) {
				this.labelEl.background.remove();
				this.labelEl.remove();
				delete this.labelEl;
			}
		}
		//=================== END edge label ==============

		if (this.isCmpType('_tempedge')) {
			if (this.arrowHeadShape) {
				this.setArrowHeadShape(this.arrowHeadShape, true, animate);
			}
			if (this.arrowTailShape) {
				this.setArrowTailShape(this.arrowTailShape, true, animate);
			}
		}

		if (this.editMode && this.diagram.editMode) {
			this.graphic.attr({
				cursor : "move"
			});
		}

		if (!animate) {
			this.background.attr({
				path : this.actualPath || this.path
			});
			this.graphic.attr({
				path : this.actualPath || this.path
			});
		}
		//=================== end edge label ==============

		return this;
	},

	_createLabelEl : function(x, y, label) {
		var diagram = this.diagram;
		var edge = this;
		
		this.labelEl = diagram.sheet.text(x, y, label).hide();
		this.label = label;
		this.labelEl.attr({
			"fill-opacity" : 0,
			"font-size" : this.labelConfig["font-size"],
			"font-family" : this.labelConfig["font-family"]
		});
		this.labelEl.set = this.setLabel;
		if (this.editMode && this.diagram.editMode) {
			if (!edge._dblclick) {
				if (!this.labelEl._dblclick) {
					this.labelEl.dblclick(function(event) {
						this.parentObj.diagram.editLabelEl(this.parentObj)
					});
					this.labelEl._dblclick = true
				}
				if (!this.graphic._dblclick) {
					this.graphic.dblclick(function(event) {
						diagram.editLabelEl(edge);
					});
					this.graphic._dblclick = true
				}
				if (!this.background._dblclick) {
					this.background.dblclick(function(event) {
						diagram.editLabelEl(edge);
					});
					this.background._dblclick = true
				}
			}

		}

		//if (this.labelConfig) {
		//	this.setLabelConfig(this.labelConfig)
		//}
		this.all.push(this.labelEl);
		//this.textbox = diagram.sheet.text();
		var txtCfg = this.labelEl.getBBox();
		this.labelEl.background = diagram.sheet.rect(txtCfg.x - 2, txtCfg.y, txtCfg.width + 4, txtCfg.height).attr({
			fill : "#ffffff",
			"fill-opacity" : 0,
			stroke : "#ffffff",
			"stroke-opacity" : 0
		}).hide();

		this.labelEl.parentObj = this;
		//this.labelEl.all = diagram.sheet.set();
		//this.labelEl.all.push(this.labelEl, this.labelEl.background)
		this.labelEl.insertAfter(this.labelEl.background);
		//this.textbox.attr({fill: "#cccccc"});
		this.all.push(this.labelEl.background);

		var myevts = JSD._myevtsList.split(" ");
		for (var i = 0; i < myevts.length; i++) {
			var myevt = myevts[i];
			this.labelEl.node["on" + myevt] = JSD._evtFn(myevt, this)
		}
	},

	/**
	 * @cfg {String} arrowEnd
	 * Defines the shape and size of the 'marker' at the end-point of this edge. Certain keywords are used to define shape and can be combined with some optional size indicators.
	 *
	 * Shape is defined by one of the following values:<ul>
	 * _<li>classic</li>
	 * _<li>block</li>
	 * _<li>open</li>
	 * _<li>oval</li>
	 * _<li>diamond</li>
	 * _<li>none</li>
	 * _</ul>
	 * _Marker size can be further defined using any combination of 2 size indicators.
	 *
	 * For width:<ul>
	 * _<li>wide</li>
	 * _<li>narrow</li>
	 * _</ul>For length:<ul>
	 * _<li>long</li>
	 * _<li>short</li></ul>
	 * _For example, basic arrow head marker may be defined <tt>arrowStart : "classic"</tt>.
	 * However, combining optional size indicators may provide further refinement as follows <tt>arrowStart : "diamond-narrow-long"</tt>
	 */

	/**
	 * @cfg {String} arrowStart
	 * Defines the shape and size of the 'marker' at the start-point of this edge. Certain keywords are used to define shape and can be combined with some optional size indicators.
	 *
	 * Shape is defined by one of the following values:<ul>
	 * _<li>classic</li>
	 * _<li>block</li>
	 * _<li>open</li>
	 * _<li>oval</li>
	 * _<li>diamond</li>
	 * _<li>none</li>
	 * _</ul>
	 * _Marker size can be further defined using any combination of 2 size indicators.
	 *
	 * For width:<ul>
	 * _<li>wide</li>
	 * _<li>narrow</li>
	 * _</ul>For length:<ul>
	 * _<li>long</li>
	 * _<li>short</li></ul>
	 * _For example, basic arrow head marker may be defined <tt>arrowEnd : "classic"</tt>.
	 * However, combining optional size indicators may provide further refinement as follows <tt>arrowEnd : "diamond-narrow-long"</tt>
	 */

	/**
	 * @method setArrowEnd Sets the shape/size of the arrow at the end-point of this edge.
	 * @param {String} arrowShape
	 * _A number of predefined shapes are available. See {@link #arrowStart} and {@link #arrowEnd} for details of accepted values.
	 * @return {Edge} thisEdge
	 */

	setArrowEnd : function(val) {
		val = this._updatecurrentconfig('arrowEnd', val);
		this.graphic.attr({
			"arrow-end" : ( typeof val === "string" && val.toLowerCase() == "none") ? "none" : val
		});
		this.arrowEnd = val;
		return this;
	},

	/**
	 * @method setArrowStart Sets the shape/size of the arrow at the start-point of this edge.
	 * @param {String} arrowShape
	 * _A number of predefined shapes are available. See {@link #arrowStart} and {@link #arrowEnd} for details of accepted values.
	 * @return {Edge} thisEdge
	 */

	setArrowStart : function(val) {
		val = this._updatecurrentconfig('arrowStart', val);
		this.graphic.attr({
			"arrow-start" : ( typeof val === "string" && val.toLowerCase() == "none") ? "none" : val
		});
		this.arrowStart = val;
		return this;
	},

	/**
	 * @method getArrowHeadAngle
	 * The angle in degrees of this <tt>edge</tt> at it's end-point
	 * @private
	 * @return {Number} deg
	 */
	getArrowHeadAngle : function() {
		var a;
		var pa = this.pathArray;

		switch (this.edgeType) {
			case 'straight':
				a = Raphael.angle(pa[0][0], pa[0][1], pa[1][0], pa[1][1]);
				break;
			case 'curve':
				var len = Raphael.getTotalLength(this.path)
				var pt1 = Raphael.getPointAtLength(this.path, len - 7);
				var pt2 = Raphael.getPointAtLength(this.path, len);
				a = Raphael.angle(pt1.x, pt1.y, pt2.x, pt2.y);
				//tmp.remove();
				break;
			default:
				//orthogonal
				switch (this.getToPort()) {
					case ("left"):
						a = 180;
						break;
					case ("right"):
						a = 0;
						break;
					case ("top"):
						a = 270;
						break;
					case ("bottom"):
						a = 90;
						break;
				}
		}
		return a
	},

	/**
	 * @method
	 * The angle in degrees of this <tt>edge</tt> at it's start-point
	 * @private
	 * @return {Number} deg
	 */
	getArrowTailAngle : function() {
		var a;
		var pa = this.pathArray;

		switch (this.edgeType) {
			case 'straight':
				a = Raphael.angle(pa[1][0], pa[1][1], pa[0][0], pa[0][1]);
				break;
			case 'curve':
				var len = Raphael.getTotalLength(this.path)
				var pt1 = Raphael.getPointAtLength(this.path, 7);
				var pt2 = Raphael.getPointAtLength(this.path, 1);
				a = Raphael.angle(pt1.x, pt1.y, pt2.x, pt2.y);
				//tmp.remove();
				break;
			default:
				//orthogonal
				switch (this.getFromPort()) {
					case ("left"):
						a = 180;
						break;
					case ("right"):
						a = 0;
						break;
					case ("top"):
						a = 270;
						break;
					case ("bottom"):
						a = 90;
						break;
				}
		}
		return a
	},
	/**
	 * @method setArrowHeadShape Sets the shape of the arrow at the end-point of this edge.
	 * @private
	 * @param {Number} arrowShape A number of predefined shapes are available. See {@link #arrowHeadShape} and {@link #arrowTailShape} for details of accepted values.
	 * @return {Edge} thisEdge
	 */

	setArrowHeadShape : function(n, hide, animate) {
		this._setArrowShape(n, "head", hide, animate);
		return this
	},

	/**
	 * @method setArrowTailShape Sets the shape of the arrow at the start-point of this edge.
	 * @private
	 * @param {Number} arrowShape A number of predefined shapes are available. See {@link #arrowHeadShape} and {@link #arrowTailShape} for details of accepted values.
	 * @return {Edge} thisEdge
	 */
	setArrowTailShape : function(n, hide, animate) {
		this._setArrowShape(n, "tail", hide, animate);
		return this
	},

	_setArrowShape : function(n, direction, hide, animate) {
		if (direction === "head") {
			var shp = this.arrowHeadShape;
			var sz = this.arrowHeadSize;
			var arrow = this.arrowHead;
			var pa = this.pathArray;
			var pt = Raphael.getPointAtLength(this.path, Raphael.getTotalLength(this.path));
			if (this.freestyle) {
				var x = pt.x;
				var y = pt.y;
			} else {
				var x = pa[pa.length - 1][0];
				var y = pa[pa.length - 1][1];
			}

			var x2 = pa[0][0];
			var y2 = pa[0][1];
			var offx = this.arrowHeadOffset || 0;
			var ang = this.getArrowHeadAngle();
			//console.log('----------'+this.id+'--------------');
			//console.log(ang);
			//var ang = pt.alpha;
			//console.log(ang);
			//console.log(' ');
		} else {
			var shp = this.arrowTailShape;
			var sz = this.arrowTailSize;
			var arrow = this.arrowTail;
			var pa = this.pathArray;
			var pt = Raphael.getPointAtLength(this.path, 1);
			if (this.freestyle) {
				var x = pt.x;
				var y = pt.y;
			} else {
				var x = pa[0][0];
				var y = pa[0][1];
			}
			var x2 = x;
			//pa[pa.length - 1][0];
			var y2 = y;
			//pa[pa.length - 1][1];
			var offx = this.arrowTailOffset || 0;
			var ang = this.getArrowTailAngle();
			//console.log('----------'+this.id+'--------------');
			//console.log(ang);
			//var ang = pt.alpha;
			//console.log(ang);
			//console.log(' ');
		}
		n = n || shp;

		var s = sz;

		if (n === "none") {
			if (arrow) {
				arrow.remove();
				delete arrow;
			}
			return
		}

		if (!arrow) {
			arrow = this.diagram.sheet.path("M" + x2 + "," + y2).attr({
				fill : this.freestyle ? "none" : this.fill,
				stroke : this.stroke,
				"stroke-opacity" : this.strokeOpacity,
				"fill-opacity" : this.freestyle ? 0 : this.fillOpacity
				//"stroke-dasharray": this.strokeDasharray,
				//"stroke-linecap": this.strokeLinecap,
				//transform: "S1,1,0,0R" + this.getArrowHeadAngle() + ",0,0T" + x2 + "," + y2
			}).hide();

			arrow.parentObj = this;
			arrow.target = this;
			// required only for _tempEdge;
			if (direction === "head") {
				this.arrowHead = arrow
			} else {
				this.arrowTail = arrow
			}
			this.all.push(arrow);
		}

		var arrowPath = JSD.arrowPaths[n][0];
		/*
		 switch (n) {
		 case 1:
		 var arrowHeadPath = "l10,-5 l-3,5 l3,5 l-10,-5";
		 break;
		 case 9:
		 var arrowHeadPath = "m0,-7 l7,7 l-7,7 l-7,-7 l7,-7";
		 break;
		 default:
		 var arrowHeadPath = "l10,-5 l-3,5 l3,5 l-10,-5";
		 };
		 */

		if (arrowPath === "circle") {
			var r = 3;
			//arrowPath = "M" + (x) + "," + (y-r) + "A"+r+","+r+",0,1,1,"+(x+offx-0.1)+","+(y-r)+" z";
			arrowPath = "M0," + (0 - r) + "A" + r + "," + r + ",0,1,1," + (0 - 0.1) + "," + (0 - r) + " z";
		}

		//var tmp = this.diagram.sheet.path("M"+(x+offx)+","+y+ arrowPath).hide();
		//var tmp = this.diagram.sheet.path("M0,0"+ arrowPath);
		arrowPath = "M0,0" + arrowPath;

		//console.dir(tmp.attrs);
		//tmp.scale(1,1,0,0);
		//tmp.attr({path: "M" + (x+offx) + "," + y + " " + arrowPath});

		//arrow.scale(1,1,x,y);
		//arrow.attr({path: "M" + (x+offx) + "," + y + " " + arrowPath});
		//console.log(arrow.attr("transform"));
		//console.log(arrow.attr("path"));
		//console.log("-------------------");

		var scl = (s + 1) * 0.5;

		//var trn = "S"+scl+","+scl+",0,0 R"+this.getArrowHeadAngle()+",0,3 T"+x+","+y;
		//tmp.scale(scl,scl,0,0);
		//tmp.scale(scl,scl,0,0);
		if (direction === "head") {
			var trn = "S" + scl + "," + scl + ",0,0R" + ang + ",0,0T" + x + "," + y;
			arrowPath = Raphael.transformPath(arrowPath, trn);
			trn = "";
			this.arrowHeadTransform = trn;
			this.arrowHeadShape = n;
			this.arrowHeadPath = arrowPath;
			//tmp.attr("path");

		} else {
			var trn = "S" + scl + "," + scl + ",0,0R" + ang + ",0,0T" + x + "," + y;
			arrowPath = Raphael.transformPath(arrowPath, trn);
			trn = "";
			this.arrowTailTransform = trn;
			this.arrowTailShape = n;
			this.arrowTailPath = arrowPath;
			//tmp.attr("path");
			//var tmppath = Raphael.getSubpath(this.path, pad, Raphael.getTotalLength(this.path));
			//var tmppath = Raphael.getSubpath(this.graphic.attr("path"), pad, Raphael.getTotalLength(this.graphic.attr("path")));
		}

		var tailpad = 0;
		var headpad = 0;

		if (JSD.arrowPaths[this.arrowTailShape]) {
			tailpad = (JSD.arrowPaths[this.arrowTailShape][1] * (s + 1) * 0.5);
			//(s+1)*0.5
		}
		if (JSD.arrowPaths[this.arrowHeadShape]) {
			headpad = (JSD.arrowPaths[this.arrowHeadShape][1] * (s + 1) * 0.5);
			//(s+1)*0.5
		}

		//var tmppath = Raphael.getSubpath(this.path, tailpad, Raphael.getTotalLength(this.path) - headpad);
		//var tmppath = this.arrowTailPath || "" + this.path + "L"+(this.arrowHeadPath || "") + "M" + this.pathArray[0][0] + "," + this.pathArray[0][1];
		this.actualPath = this.path;

		if (animate) {
			arrow.show();
		} else {
			arrow.attr({
				path : arrowPath,
				fill : this.freestyle ? "none" : this.fill,
				stroke : this.stroke,
				"stroke-width" : this.getStrokeWidth(),
				transform : trn
			}).show();
			//if (this.freestyle){
			//	arrow.attr({"stroke-width": 2});
			//} else {
			//	arrow.attr({"stroke-width": 1});
			//}
			//this.background.attr({
			//	path : this.path
			//});
			//this.graphic.attr({
			//	path : this.path
			//});
		}

	},

	/**
	 * @method setArrowHeadSize Sets the size of the arrow at the end-point of this edge.
	 * @private
	 * @param {Number} arrowSize An integer representing the scale of the arrow. See {@link #arrowHeadSize} and {@link #arrowTailSize} for further details.
	 * @return {Edge} thisEdge
	 */
	setArrowHeadSize : function(s, animate) {
		this.arrowHeadSize = s;
		this._setArrowShape(this.arrowHeadShape, "head");
		this.currentConfig.arrowHeadSize = s;
		return this
	},

	/**
	 * @method setArrowTailSize Sets the size of the arrow at the start-point of this edge.
	 * @private
	 * @param {Number} arrowSize An integer representing the scale of the arrow. See {@link #arrowHeadSize} and {@link #arrowTailSize} for further details.
	 * @return {Edge} thisEdge
	 */
	setArrowTailSize : function(s, animate) {
		this.arrowTailSize = s;
		this._setArrowShape(this.arrowTailShape, "tail");
		this.currentConfig.arrowTailSize = s;
		return this
	},

	isEdge : true,

	_deRegisterConnection : function(direction, node) {
		direction = direction.charAt(0).toUpperCase() + direction.substr(1);
		var cons = node['connections' + direction];
		if (!cons) {
			return;
		}
		for (var i = 0; i < cons.length; i++) {
			if (this === cons[i]) {
				cons.splice(i, 1);
				return
			}
		}
	},

	_registerConnection : function(direction, node) {
		direction = direction.charAt(0).toUpperCase() + direction.substr(1);

		if (!node['connections' + direction]) {
			node['connections' + direction] = [];
		}

		var alreadyRegistered = false;
		var cons = node['connections' + direction];
		for (var i = 0; i < cons.length; i++) {
			if (this === cons[i]) {
				alreadyRegistered = true
			};
		}
		if (!alreadyRegistered) {
			cons.push(this);
		}
	},
	/** @method */
	getToPort : function() {
		if (this.toPort === "auto") {
			return this.toPortAuto
		}
		return this.toPort
	},

	/** @method */
	getFromPort : function() {
		if (this.fromPort === "auto") {
			return this.fromPortAuto
		}
		return this.fromPort
	},

	_edgeConnectStart : function(x, y, evt) {
		evt = evt || window.event;
		if (evt.preventDefault) {
			evt.preventDefault()
		} else {
			evt.returnValue = false
		}
		if (evt.stopPropagation) {
			evt.stopPropagation()
		} else {
			evt.cancelBubble = true
		}

		var edge = this.target;
		var fe = edge.diagram.focusEdge;
		//console.log('_test');
		// "this" is the Raphael ELement (graphic)
		var path = "M" + (this.target.pathArray.join("L"));

		//exception for _tempedge
		if (edge.cmpType === '_tempedge') {
			JSD.actionInProgress = "preDrag";
			// remove the "createNewEdge" from the actionInProgress;
			this.ox = edge.toNode[0] - 3;
			//this.ox = x-3;
			//this.proxy.pathArray[this.index][0];
			this.oy = edge.toNode[1] - 3;
			//this.oy = y-3;
			//this.proxy.pathArray[this.index][1];
			//console.log(this.ox);
			if (edge.parentItem) {
				if (edge.parentItem.editor.allowConnection) {
					edge.parentItem.editor.allowConnection = null;
				}
			}
		} else {
			this.ox = this.attr("cx") - 3;
			//this.proxy.pathArray[this.index][0];
			this.oy = this.attr("cy") - 3;
			//this.proxy.pathArray[this.index][1];
		}
		fe.hook.attr({
			x : this.ox,
			y : this.oy
		}).show();
		fe.hook.dx = 0;
		fe.hook.dy = 0;

		if (this.target.edgeType === "curve") {
			var curvePath = "";
			var a = this.target.pathArray;

			for (var i = 0; i < a.length; i++) {
				var x = a[i][0];
				var y = a[i][1];

				if (i === 0) {
					curvePath = "M" + x + "," + y;
				} else {
					//are there at least 2 more pts to process?
					if (i < a.length - 2) {
						mx = (a[i][0] + a[i + 1][0]) / 2;
						my = (a[i][1] + a[i + 1][1]) / 2;
						curvePath = curvePath + " Q" + x + "," + y + " " + mx + "," + my;
						//i = i + 1; // skip;
					} else {
						curvePath = curvePath + " Q" + a[a.length - 2][0] + "," + a[a.length - 2][1] + " " + a[a.length - 1][0] + "," + a[a.length - 1][1];
						i = a.length;
					}
				}
			}
		}

		fe.dragProxy.pathArray = this.target.pathArray;
		fe.dragProxy.attr({
			path : (this.target.edgeType === "curve") ? curvePath : path
		}).show();
		fe.dragProxy.toFront();
		/*this.newline = diagram.sheet.path(path).attr({
		 stroke: "#ff0000",
		 "stroke-dasharray": "- "
		 });
		 this.newline.pathArray = this.target.pathArray;
		 */
	},

	_edgeConnectMove : function(dx, dy, _x, _y, evt) {
		evt = evt || window.event;
		if (evt.preventDefault) {
			evt.preventDefault()
		} else {
			evt.returnValue = false
		}
		if (evt.stopPropagation) {
			evt.stopPropagation()
		} else {
			evt.cancelBubble = true
		}

		var edge = this.target;
		var diagram = edge.diagram;
		var fe = diagram.focusEdge;
		var z = diagram.getZoom();
		var w, h;
		var newPathCfg, newPathArray;
		dx = Raphael.snapTo(diagram.snapTo, dx / z);
		dy = Raphael.snapTo(diagram.snapTo, dy / z);
		//target.pathArray[0]

		fe.hook.dx = dx;
		fe.hook.dy = dy;
		if (dx === 0 && dy === 0) {
			return;
		}

		var tc = diagram.focusEdge.targetConnection;
		tc.showConnecters = true;
		if (tc.lockedOn) {
			if (tc.node) {
				if (tc.node.isNode) {
					w = tc.node.getWidth();
					h = tc.node.getHeight();
				}
				w = 0;
				h = 0;
			}

			fe.hook.attr({
				x : (tc.x - 4),
				y : (tc.y - 4)
			});

			if (this.target.edgeType === 'straight') {
				var fromNodeXY;
				var toNodeXY;
				if (this.target.fromNode.isNode) {
					fromNodeXY = this.target.fromNode.getConnectionCoords(this.target.fromPort);
				} else {
					fromNodeXY = this.target.fromNode
				}
				if (this.target.toNode.isNode) {
					toNodeXY = this.target.toNode.getConnectionCoords(this.target.toPort);
				} else {
					toNodeXY = this.target.toNode
				}
				if (this.index == 0) {
					newPathArray = [[tc.x, tc.y], toNodeXY];
				} else {
					newPathArray = [fromNodeXY, [tc.x, tc.y]];
				}
			} else {
				if (this.index == 0) {
					if (tc.side === 'auto') {
						newPathCfg = {
							fromNode : tc.node || [tc.x, tc.y],
							toNode : this.target.toNode.rendered ? this.target.toNode : fe.dragProxy.pathArray[fe.dragProxy.pathArray.length - 1],
							fromPort : tc.side,
							toPort : this.target.toPort,
							edge : this.target
						}
					} else {
						newPathCfg = {
							fromNode : tc.node || [tc.x, tc.y],
							w1 : w,
							h1 : h,
							toNode : this.target.toNode.rendered ? this.target.toNode : fe.dragProxy.pathArray[fe.dragProxy.pathArray.length - 1],
							w2 : this.target.toNode.rendered ? this.target.toNode.getWidth() : 0,
							h2 : this.target.toNode.rendered ? this.target.toNode.getHeight() : 0,
							fromPort : tc.side,
							toPort : this.target.toPort,
							edge : this.target
						}
					}
				} else {
					if (tc.side === 'auto') {
						newPathCfg = {
							fromNode : this.target.fromNode.rendered ? this.target.fromNode : fe.dragProxy.pathArray[0],
							toNode : tc.node || [tc.x, tc.y],
							fromPort : this.target.fromPort,
							toPort : tc.side,
							edge : this.target
						}
					} else {
						newPathCfg = {
							fromNode : this.target.fromNode.rendered ? this.target.fromNode : fe.dragProxy.pathArray[0],
							w1 : this.target.fromNode.rendered ? this.target.fromNode.getWidth() : 0,
							h1 : this.target.fromNode.rendered ? this.target.fromNode.getHeight() : 0,
							toNode : tc.node || [tc.x, tc.y],
							w2 : w,
							h2 : h,
							fromPort : this.target.fromPort,
							toPort : tc.side,
							edge : this.target
						}
					}
				}
				newPathArray = JSD.generateEdgePathArray(newPathCfg);
			}

			if (this.target.edgeType === "curve") {
				var curvePath = "";
				var a = newPathArray;

				for (var i = 0; i < a.length; i++) {
					var x = a[i][0];
					var y = a[i][1];

					if (i === 0) {
						curvePath = "M" + x + "," + y;
					} else {
						//are there at least 2 more pts to process?
						if (i < a.length - 2) {
							mx = (a[i][0] + a[i + 1][0]) / 2;
							my = (a[i][1] + a[i + 1][1]) / 2;
							curvePath = curvePath + " Q" + x + "," + y + " " + mx + "," + my;
							//i = i + 1; // skip;
						} else {
							curvePath = curvePath + " Q" + a[a.length - 2][0] + "," + a[a.length - 2][1] + " " + a[a.length - 1][0] + "," + a[a.length - 1][1];
							i = a.length;
						}
					}
				}
			}

			fe.dragProxy.pathArray = newPathArray;
			fe.dragProxy.attr({
				path : (this.target.edgeType === "curve") ? curvePath : "M" + newPathArray.join("L")
			})
			return;
		}

		fe.hook.attr({
			x : (this.ox + dx),
			y : (this.oy + dy)
		});
		if (this.target.edgeType === 'straight') {
			var fromNodeXY, toNodeXY, exitSide, entrySide;

			if (this.target.fromNode.isNode) {
				fromNodeXY = this.target.fromNode.getConnectionCoords(this.target.fromPort);
			} else {
				fromNodeXY = this.target.fromNode
			}
			if (this.target.toNode.isNode) {
				toNodeXY = this.target.toNode.getConnectionCoords(this.target.toPort);
			} else {
				toNodeXY = this.target.toNode
			}
			if (this.index == 0) {
				newPathArray = [[this.ox + dx + 4, this.oy + dy + 4], toNodeXY];
			} else {
				newPathArray = [fromNodeXY, [this.ox + dx + 4, this.oy + dy + 4]];
			}

		} else {
			if (this.index == 0) {
				//if (th)
				newPathCfg = {
					fromNode : [this.ox + dx + 4, this.oy + dy + 4],
					w1 : 0,
					h1 : 0,
					toNode : this.target.toNode,
					w2 : this.target.toNode.rendered ? this.target.toNode.getWidth() : 0,
					h2 : this.target.toNode.rendered ? this.target.toNode.getHeight() : 0,
					fromPort : this.target.fromPort || 'auto',
					toPort : this.target.toPort
				}
			} else {
				newPathCfg = {
					fromNode : this.target.fromNode,
					w1 : this.target.fromNode.rendered ? this.target.fromNode.getWidth() : 0,
					h1 : this.target.fromNode.rendered ? this.target.fromNode.getHeight() : 0,
					toNode : [this.ox + dx + 4, this.oy + dy + 4],
					w2 : 0,
					h2 : 0,
					fromPort : this.target.fromPort,
					toPort : this.target.toPort || 'auto'
				}
			}
			newPathArray = JSD.generateEdgePathArray(newPathCfg);
		}

		if (this.target.edgeType === "curve") {
			var curvePath = "";
			var a = newPathArray;

			for (var i = 0; i < a.length; i++) {
				var x = a[i][0];
				var y = a[i][1];

				if (i === 0) {
					curvePath = "M" + x + "," + y;
				} else {
					//are there at least 2 more pts to process?
					if (i < a.length - 2) {
						mx = (a[i][0] + a[i + 1][0]) / 2;
						my = (a[i][1] + a[i + 1][1]) / 2;
						curvePath = curvePath + " Q" + x + "," + y + " " + mx + "," + my;
						//i = i + 1; // skip;
					} else {
						curvePath = curvePath + " Q" + a[a.length - 2][0] + "," + a[a.length - 2][1] + " " + a[a.length - 1][0] + "," + a[a.length - 1][1];
						i = a.length;
					}
				}
			}
		}
		//console.log(newPathArray);
		//console.log((this.target.edgeType === "curve") ? curvePath : "M" + newPathArray.join("L"));

		fe.dragProxy.pathArray = newPathArray;
		fe.dragProxy.attr({
			path : (this.target.edgeType === "curve") ? curvePath : "M" + newPathArray.join("L")
		});

	},

	_edgeConnectStop : function() {
		var edge = this.target;
		var diagram = edge.diagram;
		var fe = diagram.focusEdge;
		var tc = fe.targetConnection;

		if (tc.node) {
			if (tc.node.isNode) {
				//console.log('remove conns')
				tc.node.removeConnecters();
				//tc.removeConnecters();
			}
		}
		var dx = fe.hook.dx;
		var dy = fe.hook.dy;
		if (dx === 0 && dy === 0) {
			fe.hook.hide();
			fe.dragProxy.hide();
			tc.showConnecters = false;
			return;
		}

		var newCfg = {}

		if (tc.lockedOn) {
			if (this.index === 0) {
				//console.log('diagram.focusEdge.targetConnection.side = '+diagram.focusEdge.targetConnection.side);
				this.target.exitSide = tc.side;
				newCfg = {
					fromNode : tc.node,
					fromPort : (tc.node.ports[tc.side] ? tc.side : 'auto')
				};
			} else {
				//console.log('diagram.focusEdge.targetConnection.side = '+diagram.focusEdge.targetConnection.side);
				this.target.entrySide = tc.side;
				newCfg = {
					toNode : tc.node,
					toPort : (tc.node.ports[tc.side] ? tc.side : 'auto')
				};
			}
			//this.target.registerConnection(tc.node);
		} else {
			//disconnect from node and connect to coords instead
			if (this.index == 0) {
				newCfg = {
					fromNode : fe.dragProxy.pathArray[0]
				};
			} else {
				newCfg = {
					toNode : fe.dragProxy.pathArray[fe.dragProxy.pathArray.length - 1]
				};
			}
		}
		/** @class JSD.diagram.Diagram */
		/** @event */
		diagram.fireEvent("uiedgedragbeforeconnect", edge, newCfg);
		/** @class JSD.diagram.Edge */
		/** @event */
		edge.fireEvent("uidragbeforeconnect", edge, newCfg);

		this.target.setConnection(newCfg);

		fe.dragProxy.hide();
		fe.hook.hide();
		tc.showConnecters = false;
		tc = {};

		/** @class JSD.diagram.Diagram */
		/** @event */
		diagram.fireEvent("uiedgedragconnect", edge, newCfg);
		/** @class JSD.diagram.Edge */
		/** @event */
		edge.fireEvent("uidragconnect", edge, newCfg);

		this.target.focus();
		JSD.actionInProgress = "";
	},

	//_multiSelectArray: [],

	_multiSelectHide : function() {
		var msa = this._multiSelectArray;
		if (msa) {
			for (var i = 0; i < msa.length; i++) {
				msa[i].hide();
			}
		}
	},

	_multiSelectShow : function() {
		var d = this.diagram;
		var pix = (Raphael.type === "SVG") ? (JSD.isTouch() ? 20 : 7) : 6;
		this._multiSelectArray = this._multiSelectArray || [];
		var msa = this._multiSelectArray;

		for (var i = 0; i < this.pathArray.length; i++) {
			var x = this.pathArray[i][0];
			var y = this.pathArray[i][1];
			attrXXX = {
				stroke : "#0000ff",
				fill : "#ff0000"
			};
			if (!msa[i]) {
				msa[i] = d.sheet.circle(x, y, pix / 2, pix / 2).attr(attrXXX);
			} else {
				msa[i].attr({
					cx : x,
					cy : y
				}).show()
			}
		}

		/*
		 var msc = this.multiSelectCorners;
		 if (msc) {
		 //console.log('this.getX(),this.getLeft() = ' +[this.getX(),this.getLeft()] )
		 msc.outline.attr({
		 x: this.getX(),
		 y: this.getY()
		 }).show();
		 msc.tl.attr({
		 cx: this.getLeft(),
		 cy: this.getTop()
		 }).show();
		 msc.tr.attr({
		 cx: this.getRight(),
		 cy: this.getTop()
		 }).show();
		 msc.bl.attr({
		 cx: this.getLeft(),
		 cy: this.getBottom()
		 }).show();
		 msc.br.attr({
		 cx: this.getRight(),
		 cy: this.getBottom()
		 }).show();
		 }
		 else {
		 this.multiSelectCorners = {};
		 var msc = this.multiSelectCorners;
		 var cornerAttr = {
		 fill: "#aaf",
		 stroke: "#000"
		 };
		 msc.outline = this.diagram.sheet.rect(this.getX(), this.getY(), this.getWidth(), this.getHeight()).attr(this.diagram.editor.outline);
		 msc.tl = this.diagram.sheet.circle(this.getLeft(), this.getTop(), 3).attr(cornerAttr);
		 msc.tr = this.diagram.sheet.circle(this.getRight(), this.getTop(), 3).attr(cornerAttr);
		 msc.bl = this.diagram.sheet.circle(this.getLeft(), this.getBottom(), 3).attr(cornerAttr);
		 msc.br = this.diagram.sheet.circle(this.getRight(), this.getBottom(), 3).attr(cornerAttr);
		 }
		 */
	},

	focus : function(multiselect) {
		var d = this.diagram;
		this.fireEvent("focus", this);
		d.fireEvent("focusitem", d, this);

		this.hasFocus = true;

		if (multiselect) {
			//first, change the selection handles on the last selected item
			if (d.selectedItem) {
				if (!d.selectedItem.isCmpType('diagram')) {
					d.selectedItem._multiSelectShow();
				}
			}
			d.focusEdge.hideAll();
			d.focusBox.all.hide();
			d.focusBox.target = {};
			d.selectedItems.push(this);
		} else {
			d._blur();
			if (d.selectedItems.length > 0) {
				for (var i = 0; i < d.selectedItems.length; i++) {
					d.selectedItems[i]._multiSelectHide();
				}
			}
			d.selectedItems = [this];
		}

		d.selectedItem = this;

		var edge = this;

		var fe = d.focusEdge;

		var getManualPath = function(dragPt, dx, dy) {
			var qtrway, qtrway1, qtrway2;
			// copy the existing pathArray array
			// it is an array of arrays so we need to do a deep copy;
			//var a = dragPt.target.pathArray.slice(0);
			var a = JSD.clone(dragPt.target.pathArray);

			if (dragPt.attr("cursor") == "n-resize") {
				switch (true) {
					case (a.length == 2):
						//straight line
						qtrway1 = (a[1][0] - a[0][0]) / 4 + a[0][0];
						qtrway2 = (a[0][0] - a[1][0]) / 4 + a[1][0];
						a.splice(1, 0, [qtrway1, a[0][1]], [qtrway1, a[0][1]], [qtrway2, a[0][1]], [qtrway2, a[0][1]]);
						a[2][1] = a[2][1] + dy;
						a[3][1] = a[3][1] + dy;
						break;
					case (dragPt.index == 0):
						qtrway = (a[dragPt.index + 1][0] - a[dragPt.index][0]) / 4 + a[dragPt.index][0];
						a.splice(1, 0, [qtrway, a[dragPt.index][1]], [qtrway, a[dragPt.index][1]]);
						a[dragPt.index + 2][1] = a[dragPt.index + 2][1] + dy;
						a[dragPt.index + 3][1] = a[dragPt.index + 3][1] + dy;
						break;
					case (dragPt.index == a.length - 2):
						qtrway = (a[dragPt.index][0] - a[dragPt.index + 1][0]) / 4 + a[dragPt.index + 1][0];
						a.splice(a.length - 1, 0, [qtrway, a[dragPt.index][1]], [qtrway, a[dragPt.index][1]]);
						a[a.length - 3][1] = a[a.length - 3][1] + dy;
						a[a.length - 4][1] = a[a.length - 4][1] + dy;
						break;
					default:
						a[dragPt.index][1] = a[dragPt.index][1] + dy;
						a[dragPt.index + 1][1] = a[dragPt.index + 1][1] + dy;
				}
			} else {
				//console.log('dragPt.index = ' + dragPt.index);
				//console.log('a.length = ' + a.length);
				switch (true) {
					case (a.length == 2):
						//console.log('before  - a = ' + a);
						//straight line
						qtrway1 = (a[1][1] - a[0][1]) / 4 + a[0][1];
						qtrway2 = (a[0][1] - a[1][1]) / 4 + a[1][1];
						//console.log('qtrway1 = ' + qtrway1);
						//console.log('qtrway2 = ' + qtrway2);
						a.splice(1, 0, [a[0][0], qtrway1], [a[0][0], qtrway1], [a[0][0], qtrway2], [a[0][0], qtrway2]);
						// console.log('during  - a = ' + a);
						a[2][0] = a[2][0] + dx;
						a[3][0] = a[3][0] + dx;
						// console.log('after   - a = ' + a);

						//console.log('last');

						break;
					case (dragPt.index == 0):
						qtrway = (a[dragPt.index + 1][1] - a[dragPt.index][1]) / 4 + a[dragPt.index][1];
						a.splice(1, 0, [a[dragPt.index][0], qtrway], [a[dragPt.index][0], qtrway]);
						a[dragPt.index + 2][0] = a[dragPt.index + 2][0] + dx;
						a[dragPt.index + 3][0] = a[dragPt.index + 3][0] + dx;
						break;
					case (dragPt.index == a.length - 2):
						qtrway = (a[dragPt.index][1] - a[dragPt.index + 1][1]) / 4 + a[dragPt.index + 1][1];
						a.splice(a.length - 1, 0, [a[dragPt.index][0], qtrway], [a[dragPt.index][0], qtrway]);
						a[a.length - 3][0] = a[a.length - 3][0] + dx;
						a[a.length - 4][0] = a[a.length - 4][0] + dx;
						break;
					default:
						a[dragPt.index][0] = a[dragPt.index][0] + dx;
						a[dragPt.index + 1][0] = a[dragPt.index + 1][0] + dx;
				}
			}
			return a
		};

		var edgeResizeStart = function(x, y, evt) {
			evt = evt || window.event;
			if (evt.preventDefault) {
				evt.preventDefault()
			} else {
				evt.returnValue = false
			}
			if (evt.stopPropagation) {
				evt.stopPropagation()
			} else {
				evt.cancelBubble = true
			}

			fe.dragProxy.attr({
				path : this.target.graphic.attr("path")
			});
			fe.dragProxy.show();
			fe.dragProxy.toFront();
			this.dx = 0;
			this.dy = 0;

		}
		var edgeResizeMove = function(dx, dy, x, y, evt) {
			evt = evt || window.event;
			if (evt.preventDefault) {
				evt.preventDefault()
			} else {
				evt.returnValue = false
			}
			if (evt.stopPropagation) {
				evt.stopPropagation()
			} else {
				evt.cancelBubble = true
			}

			var z = d.getZoom();
			dx = dx / z;
			dy = dy / z;
			if (dx !== 0 || dy !== 0) {
				var pt1, pt2, pt3, pt4
				var target = this.target;
				var pathArray = target.pathArray;
				var path = "";
				if (target.edgeType === "curve") {

					pathArray = getManualPath(this, dx, dy);

					for (var i = 0; i < pathArray.length; i++) {

						var x = pathArray[i][0];
						var y = pathArray[i][1];
						var mx;
						var my;

						if (i === 0) {
							path = "M" + x + "," + y;
						} else {
							//are there at least 2 more pts to process?
							if (i < pathArray.length - 2) {
								mx = (x + pathArray[i + 1][0]) / 2;
								my = (y + pathArray[i + 1][1]) / 2;
								path = path + " Q" + (x) + "," + (y) + " " + (mx) + "," + (my);
							} else {
								x = pathArray[pathArray.length - 2][0];
								y = pathArray[pathArray.length - 2][1];
								mx = pathArray[pathArray.length - 1][0];
								my = pathArray[pathArray.length - 1][1];
								path = path + " Q" + (x) + "," + (y) + " " + (mx) + "," + (my);
								i = pathArray.length;
							}

						}
					}
				} else {
					pt1 = target.pathArray[this.index];
					if (this.attr("cursor") == "n-resize") {
						pt2 = [target.pathArray[this.index][0], target.pathArray[this.index][1] + dy];
						pt3 = [target.pathArray[this.index + 1][0], target.pathArray[this.index][1] + dy];
					} else {
						pt2 = [target.pathArray[this.index][0] + dx, target.pathArray[this.index][1]];
						pt3 = [target.pathArray[this.index][0] + dx, target.pathArray[this.index + 1][1]];
					}
					pt4 = target.pathArray[this.index + 1];
					path = "M" + pt1 + "," + pt2 + "," + pt3 + "," + pt4;
					//}
					//diagram.focusEdge.dragProxy.show();
					//diagram.focusEdge.dragProxy.toFront();

				}

				fe.dragProxy.attr({
					path : path
				})
			}
			this.dx = dx;
			this.dy = dy;
		}
		var edgeResizeStop = function() {
			var target = this.target;

			if (this.dx !== 0 || this.dy !== 0) {
				var newPathArray = getManualPath(this, this.dx, this.dy);

				/** @class JSD.diagram.Diagram */
				/** @event */
				d.fireEvent("uiedgedragbeforeresize", target, newPathArray);
				/** @class JSD.diagram.Edge */
				/** @event */
				target.fireEvent("uidragbeforeresize", newPathArray);

				target.manualPath = true;
				target.setConnection({
					pathArray : newPathArray
				});

				/** @class JSD.diagram.Diagram */
				/** @event */
				d.fireEvent("uiedgedragresize", target, newPathArray);
				/** @class JSD.diagram.Edge */
				/** @event */
				target.fireEvent("uidragresize", newPathArray);

			}
			fe.dragProxy.hide();
			//target.customised = true;
			target.focus();
			JSD.actionInProgress = '';
			//target.test();
		}
		var edgeConnectStart = this._edgeConnectStart;
		var edgeConnectMove = this._edgeConnectMove;
		var edgeConnectStop = this._edgeConnectStop;

		// "this" = diagram.edge object
		//document.getElementById("sourceCode").innerHTML = "currentConfig = " + JSD.JSON.encode(this.currentConfig) + "<br/>initialConfig   &nbsp;&nbsp;&nbsp= " + JSD.JSON.encode(this.initialConfig)+"<br/>listeners = "+this.initialConfig.listeners.quit;

		//alert('test');
		//diagram.focusEdge.removeAll();
		d.focusEdge.hideAll();

		var pix = (JSD.isTouch() ? 20 : 7);
		var x, y, attrXXX, prevX, prevY;

		for (var i = 0; i < edge.pathArray.length; i++) {
			x = edge.pathArray[i][0];
			y = edge.pathArray[i][1];
			attrXXX = {
				stroke : this.diagram.editor.focusBox.stroke,
				fill : this.diagram.editor.focusBox.fill
			};
			if (!fe.pt[i]) {
				fe.pt[i] = d.sheet.circle(x, y, pix / 2, pix / 2).attr(attrXXX).attr({
					cursor : "crosshair"
				});
				fe.pt[i].drag(edgeConnectMove, edgeConnectStart, edgeConnectStop);
				fe.pt[i].index = i;
				fe.pt[i].proxy = {};
			} else {
				fe.pt[i].attr({
					cx : x,
					cy : y
				})
				fe.pt[i].target = false;
				fe.pt[i].toFront();
			}

			if (i == 0 || i == edge.pathArray.length - 1) {
				fe.pt[i].target = edge;
			}

			if (this.edgeType === 'curve') {
				if (i === 0 || i === edge.pathArray.length - 1) {
					fe.pt[i].show();
				} else {
					fe.pt[i].hide()
				}
			} else {
				fe.pt[i].show()
			}

			if (i > 0 && this.edgeType !== 'straight') {
				//path = path + "L" + x + "," + y;
				prevX = edge.pathArray[i - 1][0];
				prevY = edge.pathArray[i - 1][1];
				if (x - prevX == 0) {
					//vertical
					if (!fe.midpt[i - 1]) {
						fe.midpt[i - 1] = d.sheet.rect(x - pix / 2, (prevY + (y - prevY) / 2) - pix / 2, pix, pix).attr(attrXXX).attr({
							cursor : "w-resize"
						});
						fe.midpt[i - 1].index = i - 1;
						fe.midpt[i - 1].drag(edgeResizeMove, edgeResizeStart, edgeResizeStop);
					} else {
						fe.midpt[i - 1].attr({
							x : x - pix / 2,
							y : (prevY + (y - prevY) / 2) - pix / 2,
							cursor : "w-resize"
						});
					}
				} else {
					//horizontal
					if (!fe.midpt[i - 1]) {
						fe.midpt[i - 1] = d.sheet.rect((prevX + (x - prevX) / 2) - pix / 2, y - pix / 2, pix, pix).attr(attrXXX).attr({
							cursor : "n-resize"
						});
						fe.midpt[i - 1].index = i - 1;
						fe.midpt[i - 1].drag(edgeResizeMove, edgeResizeStart, edgeResizeStop);
					} else {
						fe.midpt[i - 1].attr({
							x : (prevX + (x - prevX) / 2) - pix / 2,
							y : y - pix / 2,
							cursor : "n-resize"
						})
					}

				}

				fe.midpt[i - 1].target = this;
				fe.midpt[i - 1].toFront();
				//fe.midpt[i - 1].show();

				if (this.edgeType === 'curve') {
					if (fe.midpt[i - 1].index === 0 || fe.midpt[i - 1].index === edge.pathArray.length - 2) {
						fe.midpt[i - 1].hide();
					} else {
						fe.midpt[i - 1].show()
					}
				} else {
					fe.midpt[i - 1].show()
				}
			};
		};
		// ----- label ------

		var labelDragStart = function() {
			// this refers to diagram.focusEdge.labelPt
			this.ox = this.attr("cx");
			this.oy = this.attr("cy");
			this.nx = this.ox;
			this.ny = this.oy;
			this.tmpLine = d.sheet.path().attr({
				"stroke-dasharray" : "- "
			});
		};
		var labelDragMove = function(dx, dy) {
			var z = d.getZoom();
			dx = dx / z;
			dy = dy / z;
			this.nx = Math.round(this.ox + dx);
			this.ny = Math.round(this.oy + dy);
			if (this.nx !== this.ox || this.ny !== this.oy) {
				this.tmpLine.attr({
					path : "M" + this.ox + "," + this.oy + "L" + this.nx + "," + this.ny
				})
			}

		};
		var labelDragStop = function() {
			if (this.nx !== this.ox || this.ny !== this.oy) {
				var len = Raphael.snapTo(1, this.parentObj.graphic.getTotalLength(), 1);
				var textPt = this.parentObj.graphic.getPointAtLength(Math.round(len / 2));
				this.parentObj.labelOffset = [Math.round(this.nx - textPt.x), Math.round(this.ny - textPt.y)];
				this.parentObj.setLabelPosition(this.parentObj.labelOffset);
			}
			this.tmpLine.remove();
			this.parentObj.focus();
		};

		if (this.label) {
			//console.log(this.labelOffset);
			var textPt = this.graphic.getPointAtLength(Math.round(this.graphic.getTotalLength() / 2));
			var offset = this.labelOffset || [0, 0];

			if (!fe.labelPt) {
				fe.labelPt = d.sheet.circle(textPt.x + offset[0], textPt.y + offset[1], (pix - 1) / 2, (pix - 1) / 2).attr({
					stroke : "#000000",
					fill : "#ffff00"
				}).attr({
					cursor : "move"
				});
				fe.labelPt.drag(labelDragMove, labelDragStart, labelDragStop)
			} else {
				fe.labelPt.attr({
					cx : textPt.x + offset[0],
					cy : textPt.y + offset[1]
				});
				fe.labelPt.toFront();
				fe.labelPt.show();
			}
			fe.labelPt.parentObj = this;
		}

		//d.focusEdge.outline = d.path(path).attr({
		//    stroke: "#00FFFF",
		//    "stroke-dasharray": "- "
		//});
		d.focusBox.all.hide();
		d.focusBox.dragProxy.hide();
	},

	_blur : function() {
		// convienence fn to silently call blur
		this.hasFocus = false;
		this._multiSelectHide();
		this.diagram._blur();
	},

	/** @method */
	blur : function() {
		this.fireEvent("blur", this);
		this._blur();
	}
});

//=================================        _TempEDGE API        =====================================
/**
 * @class JSD.diagram._TempEdge
 * @private
 * @extends JSD.diagram.Edge
 */
//JSD.diagram._TempEdge = JSD.extend(JSD.diagram.Edge, {
JSD.define({
	className : 'JSD.diagram._TempEdge',
	cmpType : '_tempedge',
	extend : 'JSD.diagram.Edge',

	constructor : function(config) {

		JSD.diagram._TempEdge.superclass.constructor.call(this, config);

		//first, remove this object from the diagram's collection arrays
		// so that it does not show up as a "real" diagram component
		var diagram = this.diagram;
		var ec = this.diagram.edgeCollection;
		for (var i = 0; i < ec.length; i++) {
			if (ec[i] === this) {
				ec.splice(i, 1);
			}
		}

		var items = this.diagram.items;
		for (var i = 0; i < items.length; i++) {
			if (items[i] === this) {
				items.splice(i, 1);
			}
		}

		//this.graphic.mouseover(this.focus());
		//this.arrow.mouseover(this.focus());
		var edge = this;
		//console.log('edge.fill='+edge.fill);

		if (this.arrowHead) {
			this.arrowHead.drag(this._edgeConnectMove, this._edgeConnectStart, this.createEdge);
			this.arrowHead.mouseover(function(e) {
				if (JSD.timer) {
					clearTimeout(JSD.timer);
				}
				//this.scale(1.2, 1.2);
				this.attr({
					stroke : '#000000',
					//fill: '#00ffff',
					"stroke-opacity" : 1,
					"fill-opacity" : 1
					//transform: "S1.2,1.2"
				});
			});
			this.arrowHead.mouseout(function(e) {
				//console.log('edge.fill='+edge.fill);
				//this.scale(1, 1);
				this.attr({
					"stroke-opacity" : edge.strokeOpacity,
					"fill-opacity" : edge.fillOpacity
				});
				if (JSD.timer) {
					clearTimeout(JSD.timer);
				}
				JSD.timer = setTimeout("JSD.getDiagram('" + diagram.getId() + "').newLinks.all.hide()", 2000);
			});
		}
	},

	ignoreDefaults : true,
	editMode : false,
	//fill: "90-#99ccff-#fff",
	//fill: "99ccff",
	fill : "#ffffff",
	fillOpacity : 0.3,
	stroke : '#000000',
	strokeOpacity : 0.3,
	fromNode : [0, 0],
	toNode : [100, 100],
	arrowHeadSize : 1,
	hidden : true,

	createEdge : function() {
		var edge = this.target;
		var diagram = edge.diagram;
		var fe = diagram.focusEdge;
		var tc = fe.targetConnection;

		//exception for _tempedge

		if (edge.parentItem) {
			if (edge.parentItem.editor.allowConnection === null) {
				edge.parentItem.editor.allowConnection = true;
			}
		}

		if (tc.node) {
			if (tc.node.isNode) {
				//console.log('remove conns')
				tc.node.removeConnecters();
				//tc.removeConnecters();
			}
		}
		var dx = fe.hook.dx;
		var dy = fe.hook.dy;
		if (dx === 0 && dy === 0) {
			fe.hook.hide();
			fe.dragProxy.hide();
			tc.showConnecters = false;
			return;
		}

		if (tc.lockedOn) {

			//console.log('diagram.focusEdge.targetConnection.side = '+diagram.focusEdge.targetConnection.side);
			//this.target.entrySide = tc.side;
			/*this.target.setConnection({
			 toNode: tc.node,
			 entrySide: tc.side
			 });
			 this.target.registerConnection(tc.node);
			 */
			var newCfg = {
				cmpType : 'edge',
				fromNode : edge.parentItem ? edge.parentItem.id : fe.dragProxy.pathArray[0], //edge.fromNode.id,
				toNode : tc.node.id,
				toPort : tc.side,
				fromPort : edge.fromPort
				//animate : false
			};
		} else {
			var newCfg = {
				cmpType : 'edge',
				fromNode : edge.parentItem ? edge.parentItem.id : fe.dragProxy.pathArray[0],
				fromPort : edge.fromPort,
				toNode : fe.dragProxy.pathArray[fe.dragProxy.pathArray.length - 1]
				//animate : false
			};
		}

		diagram.fireEvent("uidragbeforecreate", newCfg);

		var newEdge = diagram.add(newCfg);
		diagram.fireEvent("uidragcreate", newEdge);

		if (JSD.activeTool === "edge") {
			JSD.actionInProgress = "createNewEdge"
		} else {
			JSD.actionInProgress = "";
		}
		this.target.hide();
		fe.dragProxy.hide();
		fe.hook.hide();
		tc.showConnecters = false;
		tc = {};
		//newEdge.focus();
		diagram.newLinks.all.hide();
		//this.target.focus();

	}
});

//===============================         TOOLBAR API        =================================
/**
 * @class JSD.toolbar.Toolbar
 * This class is incomplete and has been marked as "private".  Future versions of JSD will be able to fully utilise the Toolbar package.
 * @private
 * @extends JSD.BaseClass
 */
//JSD.toolbar = {};

//JSD.toolbar.Toolbar = JSD.extend(JSD.BaseClass, {
JSD.define({
	className : 'JSD.toolbar.Toolbar',
	cmpType : 'toolbar',
	extend : 'JSD.BaseClass',

	constructor : function(config) {

		this.initialConfig = config;
		this.currentConfig = JSD.clone(this.initialConfig);

		JSD.toolbar.Toolbar.superclass.constructor.call(this, config);

		this.items = [];

		this.setDiagram(this.diagram);

		this.dom = document.getElementById(this.contentEl);

		JSD.toolbarCollection.push(this);

		var dragger = JSD.getDragProxy();

		/*
		var mouseUp = function(evt){
		var thisBtn = JSD.activeButton;
		var thisDiagram = thisBtn.toolbar.diagram;

		JSD.actionInProgress = 'button';
		dragger.style.visibility = "hidden";

		if (JSD.activeButton.shape.shapeConfig.cmpType === 'node') {
		var draggerPos = JSD.getPosition(dragger);
		var diagramPos = JSD.getPosition(thisDiagram.dom);
		var pos = {
		x: draggerPos.x - diagramPos.x,
		y: draggerPos.y - diagramPos.y
		};

		if(pos.x<0 || pos.y<0 || pos.x>thisDiagram.width || pos.y>thisDiagram.height){
		return;
		}

		var obj = JSD.activeButton.shape.shapeConfig;
		obj.id = "xxx" + JSD.getNextIdNum();
		obj.x = pos.x;
		obj.y = pos.y;

		if (thisDiagram.targetContainer) {
		thisDiagram.targetContainer.add(obj)
		}
		else {
		thisDiagram.add(obj).focus();
		}
		}
		}

		dragger.onmouseup = function(evt){
		if (JSD.actionInProgress === 'button') {
		//console.log('drop dragger');
		evt = evt || window.event;
		mouseUp(evt);
		}
		}

		document.onmouseup = function(evt){
		if (JSD.actionInProgress === 'button') {
		//console.log('drop doc');
		evt = evt || window.event;
		mouseUp(evt);
		}
		}

		document.onmousemove = function(evt){
		if (JSD.actionInProgress === 'button') {
		evt = evt || window.event;
		//dragger.style.visibility = "visible";

		var thisBtn = JSD.activeButton;
		var thisDiagram = thisBtn.toolbar.diagram;
		if (thisBtn.shape) {
		var mousePos = JSD.getMouseCoords(evt);
		mousePos.x = Raphael.snapTo(thisDiagram.snapTo, mousePos.x - dragger.shim);
		mousePos.y = Raphael.snapTo(thisDiagram.snapTo, mousePos.y - dragger.shim);
		dragger.setPosition(thisDiagram, mousePos);
		return false;
		}
		};
		}
		*/

		//JSD.diagramCollection.push(this);
		//JSD.renderTo = this;

		//render any child items
		if (config.items) {
			if (config.items.length > 0) {
				for (var i = 0; i < config.items.length; i++) {
					this.add(config.items[i]);
				}
			}
		};
	},

	className : 'JSD.toolbar.Toolbar',
	cmpType : 'toolbar',
	width : 500,
	height : 25,
	buttonSize : [25, 25],
	//orientation: 'horizontal',

	setDiagram : function(diagram) {
		if (diagram) {
			if (diagram.isCmpType('diagram')) {
				this.diagram = diagram;
			} else {
				var diagramId = diagram;
				this.diagram = JSD.getDiagram(diagramId);
			}
		} else {
			this.diagram = JSD.renderTo;
		}
	},

	add : function(btnConfig) {
		var btn = new JSD.toolbar.Button(btnConfig);
		btn.toolbar = this;
		return btn;
	}
});

/**
 * @class JSD.toolbar.Button
 * @private
 * * This class is incomplete and has been marked as "private".  Future versions of JSD will be able to fully utilise the Toolbar package.
 * @extends JSD.BaseClass
 */

//===============================         BUTTON API        =================================

//JSD.toolbar.Button = JSD.extend(JSD.BaseClass, {
JSD.define({
	className : 'JSD.toolbar.Button',
	cmpType : 'button',
	extend : 'JSD.BaseClass',

	constructor : function(config) {
		this.initialConfig = config;
		this.currentConfig = JSD.clone(this.initialConfig);

		JSD.toolbar.Button.superclass.constructor.call(this, config);

		if (this.toolbar) {
			if (this.toolbar.rendered) {
				this.toolbar = config.toolbar;
			} else {
				toolbarId = config.toolbar;
				this.toolbar = JSD.getToolbar(toolbarId);
			}
		} else {
			this.toolbar = JSD.getToolbar();
		}

		var btnImg = document.createElement("img");
		btnImg.setAttribute('src', config.icon);
		btnImg.setAttribute('alt', 'na');
		btnImg.width = '' + this.toolbar.buttonSize[0];
		btnImg.height = '' + this.toolbar.buttonSize[1];
		btnImg.style.position = 'relative';

		this.dom = btnImg;
		var thisBtn = this;

		this.dom.onmousedown = function(evt) {

			evt = evt || window.event;
			var d = thisBtn.toolbar.diagram;

			d.dropTargets = [];

			if (thisBtn.handler) {
				thisBtn.handler(thisBtn, d);
			} else {
				if (thisBtn.shape.shapeConfig.cmpType === 'node') {
					var dragger = JSD.getDragProxy();
					dragger.style.width = thisBtn.shape.shapeConfig.width + "px" || "100";
					dragger.style.height = thisBtn.shape.shapeConfig.height + "px" || "100";
					d.setDropTargets();
					JSD.actionInProgress = 'button';
					JSD.activeButton = thisBtn;
					var mousePos = JSD.getMouseCoords(evt);
					mousePos.x = Raphael.snapTo(d.snapTo, mousePos.x - dragger.shim);
					mousePos.y = Raphael.snapTo(d.snapTo, mousePos.y - dragger.shim);
					dragger.setPosition(d, mousePos);
					dragger.style.visibility = "visible";
				} else {
					if (thisBtn.edge) {

					}
				}
			}
			return false;
		};

		this.toolbar.dom.appendChild(this.dom);
	},

	getIcon : function() {
		return this.icon;
	},

	setIcon : function(newIcon) {

	}
});

//===============================         STENCIL API        =================================
/**
 * @class JSD.stencil.Stencil
 * A stencil is a collection of {@link JSD.stencil.Shape Shape} objects.
 * _In it's simplest form, a <tt>Stencil</tt>
 * _is simply a collection of {@link JSD.stencil.Shape Shape} configurations which can be reused without
 * _having to redefine the component's configuration.  However, if the {@link #applyTo} option is supplied,
 * _the Stencil will be created as a graphical element on the document with each Shape being created as a 'draggable' graphic allowing
 * _users to create new components from the Shape by simply dragging the shape onto the diagram.
 * @extends JSD.BaseClass
 */
//JSD.stencil = {};

//JSD.stencil.Stencil = JSD.extend(JSD.BaseClass, {
JSD.define({
	className : 'JSD.stencil.Stencil',
	cmpType : 'stencil',
	extend : 'JSD.BaseClass',
	constructor : function(config) {
		this.isStencil = true;
		this.initialConfig = config;
		this.currentConfig = JSD.clone(this.initialConfig);

		JSD.stencil.Stencil.superclass.constructor.call(this, config);

		/**
		 * @cfg {String} applyTo
		 * Optional.  The id of a DOM node element (eg. a <tt>DIV</tt> element)
		 * _which already exists in the document. If supplied, the stencil will
		 * _automatically create inside the DOM element a graphic representation
		 * _of each {@link JSD.stencil.Shape Shape} listed in the {@link #items}
		 * _array within the <tt>Stencil</tt>. A reference to the container element
		 * _will be available in the {@link #dom} property.
		 * _If omitted, the stencil will still be created but will...
		 */

		if (this.applyTo) {
			this.dom = document.getElementById(this.applyTo);

			if (this.dom) {
				this.width = config.width || (parseInt(this.dom.style.width) || 150);
				this.height = config.height || parseInt(this.dom.style.height);
				//if(this.columns > 1){
				//	this.hideLabels = true;
				//}
				this._oldShapeX = this.shapeX;
				/*
				 else {
				 this.dom = document.createElement("div");
				 this.dom.setAttribute('id', 'JSDStencil'+this.id);
				 this.dom.style.top = this.pageX + 'px';
				 this.dom.style.left = this.pageY  + 'px';
				 this.dom.style.height = this.height + 'px';
				 this.dom.style.width = this.width + 'px';
				 this.dom.style.position = 'absolute';
				 document.body.appendChild(this.dom);
				 }
				 */
				this.sheet = Raphael(this.dom.id, this.width, this.height);
				/**
				 * @cfg {Object} backgroundConfig
				 * Optional. An object containing RaphaelJS config options which will create a graphic element to be used as background for the stencil.
				 * _If the backgroundConfig object includes a <tt>src</tt> option, this will be used as the url
				 * _to an image which will be used as background to the stencil.  If a background is created, it can be accessed via the {@link #background} property.
				 * _If <tt>backgroundConfig</tt> is omitted, no background will be created.
				 * For example:
				 * <pre><code class="prettyprint">
				 * 	EXAMPLE GOES HERE
				 * </code></pre>
				 *
				 */
				if (this.backgroundConfig) {
					this.backgroundConfig.width = parseInt(this.width);
					this.backgroundConfig.height = parseInt(this.height);
					this.backgroundConfig.x = 0;
					this.backgroundConfig.y = 0;

					if (this.backgroundConfig.src) {
						this.background = this.sheet.image().attr(this.backgroundConfig);
					} else {
						this.background = this.sheet.rect().attr(this.backgroundConfig);
					}

					this.background.parentObj = this;
					this.background.click(function() {
						//this.parentObj.focus();
					})
				}
			}
		}
		this.items = [];
		//if (config.diagram) {
		//this.diagram = JSD.getDiagram(config.diagram);
		//}
		this._addShapes(config.items);
		//return this;
	},
	/**
	 * @cfg {Array} items
	 * Required.  An array of {@link JSD.stencil.Shape Shape} configurations.
	 */
	items : [],

	_addShapes : function(shapes) {
		if (shapes) {
			if (shapes.length > 0) {
				for (var i = 0; i < shapes.length; i++) {
					this.add(shapes[i]);
				}
			}
		};
	},

	getShapeConfig : function(name) {

	},

	add : function(config) {
		if (config.shapeConfig.cmpType === 'node' || config.shapeConfig.cmpType === 'container') {
			this.addNodeShape(config)
		}
		if (config.shapeConfig.cmpType === 'edge') {
			this.addEdgeShape(config)
		}
	},

	addNodeShape : function(config) {
		JSD.renderToStencil = this;
		var x = new JSD.stencil.Shape(config);
		this.items.push(x);
		delete JSD.renderToStencil;
	},

	addEdgeShape : function(config) {
		JSD.renderToStencil = this;
		var x = new JSD.stencil.Shape(config);
		this.items.push(x);
		delete JSD.renderToStencil;
	},

	/** @method */
	getShape : function(shapeName) {
		for (var i = 0; i < this.items.length; i++) {
			if (this.items[i].shapeName === shapeName) {
				return this.items[i];
			}
		}
		return null;
	},

	/** @method */
	getShapeById : function(id) {
		for (var i = 0; i < this.items.length; i++) {
			if (this.items[i].id === id) {
				return this.items[i];
			}
		}
		return null;
	},
	/** @cfg */
	showShapeLabel : true,

	shapeX : 10,
	shapeY : 10,

	/** @cfg */
	columns : 1,
	_column : 1, // PRIVATE - used only during render of stencils

	/** @cfg */
	shapeSize : 30,

	/** @cfg */
	shapeGap : 20,

	/** @cfg */
	plain : false,

	/** @cfg */
	hideLabels : false
});

//===============================         SHAPE API        =================================
/**
 * @class JSD.stencil.Shape
 * @extends JSD.BaseClass
 */

//JSD.stencil.Shape = JSD.extend(JSD.BaseClass, {
JSD.define({
	className : 'JSD.stencil.Shape',
	cmpType : 'shape',
	extend : 'JSD.BaseClass',

	constructor : function(config) {

		this.initialConfig = config;
		this.currentConfig = JSD.clone(this.initialConfig);

		JSD.stencil.Shape.superclass.constructor.call(this, config);
		this.stencil = JSD.renderToStencil;
		if (this.stencil.dom) {
			this.render();
		}
	},

	className : 'JSD.stencil.Shape',
	cmpType : 'shape',

	//available config options

	/**
	 * @cfg {Object} shapeConfig
	 * Required. An object representing a set of configuration options. These config options will be applied to any component
	 * _which has a 'shape' config option matching {@link #shapeName}. The <tt>shapeConfig</tt> object can contain any
	 * _option which is a valid cfg option for {@link JSD.diagram.Node Node} or {@link JSD.diagram.Container Container}.
	 * <br>For example:
	 * <pre><code class="prettyprint">
	 * 	EXAMPLE GOES HERE
	 * </code></pre>
	 */
	/**
	 * @property
	 * An object representing a set of configuration options. These config options will be applied to any component
	 * _which has a 'shape' config option matching {@link #shapeName}. The <tt>shapeConfig</tt> object can contain any
	 * _option which is a valid cfg option for {@link JSD.diagram.Node Node} or {@link JSD.diagram.Container Container}.  See {@link #cfg-shapeConfig} above.
	 */
	shapeConfig : {},

	/**
	 * @cfg {String} shapeName
	 * Required. The name of the <tt>Shape</tt> object. When a component is being rendered, if it has a {@link JSD.diagram.Node#cfg-shape shape} option defined,
	 * _that <tt>shape</tt> value will be used to find a matching Shape object and retrieve the {@link #shapeConfig} options.
	 */

	/**
	 * @property
	 * The name of the <tt>Shape</tt> object. When a component is being rendered, if it has a {@link JSD.diagram.Node#cfg-shape shape} option defined,
	 * _that <tt>shape</tt> value will be used to find a matching Shape object on a Stencil and retrieve the {@link #shapeConfig} options.
	 */
	shapeName : "",

	/**
	 * @cfg {String} shapeDesc
	 * If the stencil which contains this shape is being rendered to a DOM element (see {@link JSD.stencil.Stencil#cfg-applyTo Shape.applyTo})
	 * _then the <tt>shapeDesc</tt> option will be used as the label of the shape.
	 */

	/**
	 *
	 * @property {String} shapeDesc
	 * Read only. If the stencil which contains this shape is being rendered to a DOM element (see {@link JSD.stencil.Stencil#cfg-applyTo Shape.applyTo})
	 * _then the <tt>shapeDesc</tt> will be used as the label of the shape.
	 */

	render : function() {

		var c = {
			fill : "#ffffff",
			fillOpacity : 1,
			stroke : "#000000",
			opacity : 1,
			strokeWidth : 1,
			strokeOpacity : 1,
			strokeDasharray : "None"
		}

		c = JSD.apply(c, this.shapeConfig);

		//var c = this.shapeConfig;
		var s = this.stencil;
		var x, y, w, h, g, rnd, configW, configH, t, tx, ty;
		var maskAttr = {
			cursor : 'move',
			stroke : '#fff',
			'stroke-opacity' : 0.01,
			fill : '#fff',
			'fill-opacity' : 0.01
		};

		x = s.shapeX;
		y = s.shapeY;
		w = s.shapeSize;
		h = s.shapeSize;
		var gType = c.graphicType || c.type;

		if (gType === "path" || c.cmpType === "edge") {
			var p = "";
			if (c.cmpType === "edge") {

				if (c.edgeType !== "straight") {
					var a = JSD.generateEdgePathArray(c);

					for (var i = 0; i < a.length; i++) {
						if (i === 0) {
							p = "M" + a[i]
						} else {
							p += "L" + a[i]
						}
					}
				} else {
					p = "M" + c.fromNode + "L" + c.toNode;
				}
			} else {
				p = c.path
			}

			var box = Raphael.pathBBox(p);

			var pathWidth = Math.round(box.width);
			var pathHeight = Math.round(box.height) || 3;
		}

		configW = pathWidth || (c.width || c.rx * 2);
		configH = pathHeight || (c.height || c.ry * 2);

		var scale = (s.shapeSize / Math.max(configW, configH));

		if (configW !== configH) {
			var adj = s.shapeSize - Math.min(configW, configH) * scale;
			if (configW < configH) {
				x = x + adj / 2;
			}
			if (configH < configW) {
				y = y + adj / 2;
			}
		}
		var nextY = y + s.shapeSize + s.shapeGap + (!s.hideLabels ? 15 : 0);
		var nextX = x + s.shapeSize + s.shapeGap;
		if (!s.height || (nextY > s.height)) {
			s.sheet.setSize(s.width, nextY);
			s.height = nextY;
		}
		if (!s.width || (nextX > s.width)) {
			s.sheet.setSize(nextX, s.height);
			s.width = nextX;
		}

		if (this.shapeIcon) {
			g = s.sheet.image(this.shapeIcon, x, y, c.width, c.height).hide();
			g.scale(scale, scale, x, y);
		} else {

			if (c.cmpType === "edge") {
				g = s.sheet.path(p).hide();
				g.attr({
					transform : "S" + scale + "," + scale + ",0,0T" + x + "," + y,
					"arrow-end" : c.arrowEnd,
					"arrow-start" : c.arrowStart
				});
				delete g.fill;

			} else {
				switch (c.type) {

					case "ellipse":
						var rx = c.rx;
						var ry = c.ry;
						var cx = x + c.rx;
						var cy = y + c.ry;
						g = s.sheet.ellipse(cx, cy, rx, ry).hide();
						g.scale(scale, scale, x, y);
						break;

					case "rect":
						rnd = c.rounded ? c.rounded : 0;
						g = s.sheet.rect(x, y, c.width, c.height, rnd).hide();

						if (c.isContainer) {
							var headPos = c.headerPosition || JSD.diagram.Container.prototype.headerPosition;
							var headAttr = JSD.clone(c.headerConfig || JSD.diagram.Container.prototype.headerConfig);
							headAttr['stroke-opacity'] = 0.3;
							var headW = headPos === 'left' ? 50 : c.width;
							var headH = headPos === 'left' ? c.height : 50;
							if (!s.plain) {
								this.headerEl = s.sheet.rect(x, y, headW, headH, rnd).attr(headAttr).hide();
							} else {
								this.headerEl = s.sheet.rect(x, y, headW, headH, rnd).hide();
							}
						}

						g.scale(scale, scale, x, y);
						break;

					case "path":
						g = s.sheet.path(c.path).hide();
						g.attr({
							transform : "S" + scale + "," + scale + ",0,0T" + x + "," + y
						});
						//g.translate(x, y);
						break;

					case "image":
						g = s.sheet.image(this.shapeConfig.src, x, y, c.width * scale, c.height * scale).hide();
						//g.scale(scale, scale, x, y);
						//g.attr({
						//	width: c.width * scale,
						//	height: c.height * scale
						//})
						//g.attr({
						//	transform : "S" + scale + "," + scale + "," + x + "," + y
						//});
						break;

					default:
				};
			}
		}

		if (c.html) {
			this.htmlEl = document.createElement('div');

			var h = this.htmlEl;

			//h.setAttribute("id",-html-stencilshape");
			h.style.visibility = "hidden";
			h.style.position = 'absolute';
			//h.parentObj = this;
			if (c.htmlClass) {
				h.setAttribute("class", c.htmlClass);
			}

			h.style.height = c.height + 'px';
			h.style.width = c.width + 'px';
			h.style.padding = "0px";
			h.style.margin = "0px";
			h.style.overflow = 'hidden';
			h.innerHTML = c.html;

			if (Raphael.type == "SVG") {
				this.fo = document.createElementNS("http://www.w3.org/2000/svg", "foreignObject");
			} else {
				this.fo = document.createElement("div");
			}
			//this.fo = document.createElementNS("http://www.w3.org/2000/svg", "foreignObject");
			if (this.fo.style) {
				if (Raphael.type === "SVG") {
					this.fo.setAttribute('x', x);
					this.fo.setAttribute('y', y);
					//alert(this.body.offsetHeight);
					this.fo.setAttribute('width', c.width);
					this.fo.setAttribute('height', c.height);
					this.fo.style.overflow = 'hidden'
					g.node.parentNode.insertBefore(this.fo, g.node.nextSibling);
					g.node.style.overflow = 'hidden';
					this.fo.parentObj = this;
					this.fo.appendChild(h);
				} else {
					this.fo.style.top = y + 'px';
					this.fo.style.left = x + 'px';

					this.fo.style.className = "testtesttest";
					g.node.appendChild(this.fo);
					g.node.style.overflow = 'hidden';
					this.fo.parentObj = this;
					this.fo.appendChild(h);
				}
				//this.all.push(this.fo);
			} else {
				this.fo = null;
				//var elPos = JSD.getPosition(s.dom);
				var relPos = {
					x : x,
					y : y
				};
				h.style.top = relPos.y + 'px';
				h.style.left = relPos.x + 'px';

				s.dom.appendChild(h)
			}

			h.style.visibility = "visible";

			var z = scale;
			if (Raphael.type === "VML") {
				h.style.zoom = z;
				if (JSD._getIEversion() === 8) {
					//IE8 zoom doesn't work properly so we have to fix width/height
					h.style.width = Math.round(c.width / z);
					h.style.height = Math.round(c.height / z);
				}
			} else {
				switch (true) {
					case (s.dom.style.WebkitTransform !== undefined):
						h.style.WebkitTransform = "scale(" + z + ")";
						h.style.WebkitTransformOrigin = "0 0";
						break;
					case (s.dom.style.MozTransform !== undefined):
						h.style.MozTransform = "scale(" + z + ")";
						h.style.MozTransformOrigin = "0 0";
						break;
					case (s.dom.style.OTransform !== undefined):
						h.style.OTransform = "scale(" + z + ")";
						h.style.OTransformOrigin = "0 0";
						break;
					default:
						h.style.zoom = z;
				}
			}
		}

		this.mask = s.sheet.rect(s.shapeX, s.shapeY, s.shapeSize, s.shapeSize).attr(maskAttr).hide();

		if (!s.plain) {
			g.attr({
				fill : c.fill || ""
			})
			if (c.type !== "image") {
				g.attr({
					stroke : c.stroke || "#000",
					"stroke-dasharray" : c.strokeDasharray || ""
				});
			}

			if (c.strokeWidth) {
				g.attr({
					"stroke-width" : c.strokeWidth
				});
			}
		}

		g.attr({
			cursor : "move"
		});
		var txAnchor = "start";
		if (s.columns === 1) {
			tx = s.shapeX + (s.shapeSize + 5);
			ty = s.shapeY + (s.shapeSize / 2);
			txAnchor = "start";
		} else {
			tx = s.shapeX + (s.shapeSize / 2);
			ty = s.shapeY + (s.shapeSize + 10);
			txAnchor = "middle";
		}

		this.graphic = g;
		this.all = s.sheet.set();
		this.all.push(this.graphic)
		if (this.headerEl) {
			this.headerEl.scale(scale, scale, x, y);
			this.all.push(this.headerEl)
		}
		this.all.push(this.mask);

		if (!s.hideLabels) {
			if (Raphael.type === "SVG") {
				//var tmpC = s.sheet.ellipse(tx, ty, 8, 2);
				//this.textEl = s.sheet.text(tx, ty, this.shapeDesc || this.shapeName).attr({
				//	'text-anchor': txAnchor,
				//	cursor: 'move'
				//}).hide();

				this.textEl = s.sheet.text().hide();
				var textElAttr = {
					x : tx,
					y : ty,
					text : this.shapeDesc || this.shapeName,
					'text-anchor' : txAnchor,
					cursor : 'move'
				}
				this.textEl.attr(textElAttr);

				this.all.push(this.textEl)
			} else {
				this.textEl = s.sheet.text(tx, ty + 3, this.shapeDesc || this.shapeName).attr({
					'text-anchor' : txAnchor,
					cursor : 'move'
				}).hide();
				this.textMask = s.sheet.rect(tx, s.shapeY + 3, this.textEl.getBBox().width, this.textEl.getBBox().height).attr(maskAttr).hide();
				this.all.push(this.textEl, this.textMask);
			}
		}

		this.all.show();

		if (s._column < s.columns) {
			s._column = s._column + 1
			s.shapeX += s.shapeSize + s.shapeGap;
		} else {
			s._column = 1;
			s.shapeY += s.shapeSize + s.shapeGap + (!s.hideLabels ? 15 : 0);
			s.shapeX = s._oldShapeX
		}

		var thisBtn = this;

		this.all.mousedown(function(evt) {

			evt = evt || window.event;
			if (evt.preventDefault) {
				evt.preventDefault()
			} else {
				evt.returnValue = false
			}
			if (evt.stopPropagation) {
				evt.stopPropagation()
			} else {
				evt.cancelBubble = true
			}

			//evt.preventDefault();
			//evt.stopPropagation();
			var d = thisBtn.stencil.diagram || JSD.getDiagram();
			var z = d.getZoom();
			d.dropTargets = [];

			if (thisBtn.handler) {
				thisBtn.handler(thisBtn, d);
			} else {
				var c = thisBtn.shapeConfig;
				var ct = c.cmpType;
				var gt = c.graphicType || c.type;
				//if (JSD.getClassByCmpType(ct).prototype.isCmpType("node")) {
				var dragger = JSD.getDragProxy();

				var dragW, dragH;
				if (c.cmpType === "edge") {
					dragW = (pathWidth) * z;
					dragH = (pathHeight) * z;
					var ggg = thisBtn.graphic.attr();
					delete ggg.transform;
					delete ggg.fill;
					ggg.transform = "T15,15";
					ggg.opacity = 0.5;
					dragger.style.border = '0px';
					dragger.shim = 30;
					if (dragger.test) {
						dragger.test.remove()
					}
					dragger.test = dragger.paper.path();
					dragger.test.attr(ggg);
				} else {

					switch (gt) {
						case "path":
							dragW = (c.width || c.pathWidth) * z;
							dragH = (c.height || c.pathHeight) * z;
							break;
						default:
							dragW = (c.width || c.rx * 2) * z;
							dragH = (c.height || c.ry * 2) * z
					}
				}
				dragger.style.width = dragW + "px" || "100";
				dragger.style.height = dragH + "px" || "100";
				d.setDropTargets();
				JSD.actionInProgress = 'button';
				JSD.activeButton = thisBtn;
				var mousePos = JSD.getMouseCoords(evt);
				mousePos.x = Raphael.snapTo(d.snapTo, mousePos.x - dragger.shim);
				mousePos.y = Raphael.snapTo(d.snapTo, mousePos.y - dragger.shim);
				dragger.setPosition(d, mousePos);
				dragger.style.visibility = "visible";

			}
			return false;
		});

	}
});

//end