const DURATIONS = {
    circlePath: 0.55,
    middlePathHeadStart: 0.45
  };
  
  const EASINGS = {
    middlePathOut: Power3.easeOut,
    middlePathIn: RoughEase.ease.config({
      template: Power0.easeNone,
      strength: 1.5,
      points: 10,
      taper: "none",
      randomize: false,
      clamp: false
    }),
    circlePath: Power3.easeOut
  };
  
  const CLASS_NAMES = {
    iconContainer: 'icon-container-svg--toggle-to-x-circular-spin',
    iconRoot: 'icon-root-svg--toggle-to-x-circular-spin',
    icon: 'icon',
    iconPaths: {
      menuTopLeftToXBottomRight: 'icon-path icon-path--menu-tl-to-x-br',
      menuMiddle: 'icon-path icon-path--menu-middle',
      menuBottomRightToXTopRight: 'icon-path icon-path--menu-br-to-x-tr'
    },
    controlPoints: {
      menu: {
        topLeft: 'menu-control-point menu-control-point--tl',
        topRight: 'menu-control-point menu-control-point--tr',
        bottomLeft: 'menu-control-point menu-control-point--bl',
        bottomRight: 'menu-control-point menu-control-point--br'
      },
      x: {
        topLeft: 'x-control-point x-control-point--tl',
        topRight: 'x-control-point x-control-point--tr',
        bottomLeft: 'x-control-point x-control-point--bl',
        bottomRight: 'x-control-point x-control-point--br'
      }
    }
  };
  
  const DOM_REFS = {};
  const MEASUREMENTS = {};
  
  const Icon = (function Icon() {
  
    let isShowingMenu = true;
    let isAnimating = false;
  
    let masterTL;
  
    function cacheDOMRefs() {
      const iconContainer = document.querySelector(`.${CLASS_NAMES.iconContainer}`);
  
      DOM_REFS.iconContainer = iconContainer;
      DOM_REFS.iconRoot = iconContainer.getElementsByClassName(CLASS_NAMES.iconRoot)[0];
      DOM_REFS.icon = iconContainer.getElementsByClassName(CLASS_NAMES.icon)[0];
      DOM_REFS.iconPaths = {
        menuTopLeftToXBottomRight: iconContainer.getElementsByClassName(CLASS_NAMES.iconPaths.menuTopLeftToXBottomRight)[0], // menu top / the part of the "x" that starts (left-to-right) at the top-left
        menuMiddle: iconContainer.getElementsByClassName(CLASS_NAMES.iconPaths.menuMiddle)[0],
        menuBottomRightToXTopRight: iconContainer.getElementsByClassName(CLASS_NAMES.iconPaths.menuBottomRightToXTopRight)[0], // menu top / the part of the "x" that starts (left-to-right) at the bottom-left
      };
      DOM_REFS.controlPoints = {
        menu: {
          topLeft: iconContainer.getElementsByClassName(CLASS_NAMES.controlPoints.menu.topLeft)[0],
          topRight: iconContainer.getElementsByClassName(CLASS_NAMES.controlPoints.menu.topRight)[0],
          bottomLeft: iconContainer.getElementsByClassName(CLASS_NAMES.controlPoints.menu.bottomLeft)[0],
          bottomRight: iconContainer.getElementsByClassName(CLASS_NAMES.controlPoints.menu.bottomRight)[0],
        },
        x: {
          topLeft: iconContainer.getElementsByClassName(CLASS_NAMES.controlPoints.x.topLeft)[0],
          topRight: iconContainer.getElementsByClassName(CLASS_NAMES.controlPoints.x.topRight)[0],
          bottomLeft: iconContainer.getElementsByClassName(CLASS_NAMES.controlPoints.x.bottomLeft)[0],
          bottomRight: iconContainer.getElementsByClassName(CLASS_NAMES.controlPoints.x.bottomRight)[0],
        }
      };
    }
  
    function registerListeners() {
      DOM_REFS.iconContainer.addEventListener('click', toggleIcon, false);
    }
  
    function onToggleToXComplete() {
      isAnimating = false;
      isShowingMenu = false;
    }
  
    function onToggleToHamburgerComplete() {
      isAnimating = false;
      isShowingMenu = true;
    }
  
    function toggleIcon() {
      if (!isAnimating) {
        isAnimating = true;
  
        if (isShowingMenu) {
          // Animate to the "x" playing the TL from its beginning
          masterTL.play(0);
  
        } else {
          // Reverse back to the menu state.
          // NOTE: 0 tell `reverse` to set the playhead at the end of the TL --
          // and and then wind back from there.
          masterTL.reverse(0);
        }
      }
    }
  
    function cacheMeasurements() {
      const {
        controlPoints: {
          menu: menuControlPoints,
          x: xControlPoints
        },
        iconPaths
      } = DOM_REFS;
  
      const topLeftMenuXPos = Number(menuControlPoints.topLeft.getAttribute('cx'));
      const topRightMenuXPos = Number(menuControlPoints.topRight.getAttribute('cx'));
      const bottomLeftMenuXPos = Number(menuControlPoints.bottomLeft.getAttribute('cx'));
      const bottomRightMenuXPos = Number(menuControlPoints.bottomRight.getAttribute('cx'));
  
      const topMenuPathDistance = _computePointDistance(menuControlPoints.topLeft, menuControlPoints.topRight);
      const topDownXPathDistance = _computePointDistance(xControlPoints.topLeft, xControlPoints.bottomRight);
  
      const bottomMenuPathDistance = _computePointDistance(menuControlPoints.bottomLeft, menuControlPoints.bottomRight);
      const bottomUpXPathDisance = _computePointDistance(xControlPoints.bottomRight, xControlPoints.topLeft);
  
      const menuTopLeftToXBottomRightDistance = iconPaths.menuTopLeftToXBottomRight.getTotalLength();
      const menuBottomRightToXTopRightDistance = iconPaths.menuBottomRightToXTopRight.getTotalLength();
  
      MEASUREMENTS.topPathStartingDrawPct = (
        topMenuPathDistance /
        menuTopLeftToXBottomRightDistance
      ) * 100;
      MEASUREMENTS.bottomPathStartingDrawPct = (
        bottomMenuPathDistance /
        menuBottomRightToXTopRightDistance
      ) * 100;
      MEASUREMENTS.topDownXDrawPct = (
        topDownXPathDistance /
        menuTopLeftToXBottomRightDistance
      ) * 100;
      MEASUREMENTS.bottomUpXDrawPct = (
        bottomUpXPathDisance /
        menuBottomRightToXTopRightDistance
      ) * 100;
    }
  
    function prepareStartState() {
      TweenMax.set(
        DOM_REFS.iconPaths.menuTopLeftToXBottomRight, {
          drawSVG: `${100 - MEASUREMENTS.topPathStartingDrawPct}% 100%`,
          transformOrigin: '50% 50%'
        }
      );
      TweenMax.set(
        DOM_REFS.iconPaths.menuBottomRightToXTopRight, {
          drawSVG: `100% ${100 - MEASUREMENTS.bottomPathStartingDrawPct}%`,
          transformOrigin: '50% 50%'
        }
      );
      TweenMax.set(
        DOM_REFS.iconContainer, {
          opacity: 1,
          visibility: 'visible'
        }
      );
    }
  
    function makeCirclingPathTL(pathElem, endDrawPercentage) {
      const TL = new TimelineMax({});
  
      TL.to(pathElem, DURATIONS.circlePath, {
        drawSVG: `${endDrawPercentage}%`,
        ease: EASINGS.circlePath
      }, 0);
      TL.to(pathElem, DURATIONS.circlePath * 0.25, {
        scaleX: 0.7
      }, 0);
      TL.to(pathElem, DURATIONS.circlePath * 0.25, {
        scaleX: 1
      }, `${DURATIONS.circlePath * 0.25}`);
  
      return TL;
    }
  
    function makeMiddlePathTL() {
      const {
        iconPaths: {
          menuMiddle
        }
      } = DOM_REFS;
      const TL = new TimelineMax();
  
      TL.set(menuMiddle, {
        transformOrigin: '50% 50%',
        immediateRender: false
      }, 0);
      TL.to(menuMiddle, DURATIONS.middlePathHeadStart * 0.2, {
        scaleX: 1.25,
        ease: EASINGS.middlePathOut
      }, 0);
      TL.to(menuMiddle, DURATIONS.middlePathHeadStart * 0.2, {
        scaleX: 1,
        ease: EASINGS.middlePathOut
      });
      TL.to(menuMiddle, ((DURATIONS.middlePathHeadStart * 0.6) + DURATIONS.circlePath), {
        drawSVG: '50% 50%',
        ease: EASINGS.middlePathIn
      });
  
      return TL;
    }
  
    function makeToggleTL() {
      const TL = new TimelineMax();
      const {
        topDownXDrawPct: topMenuPathEndDrawPct,
        bottomUpXDrawPct: bottomMenuPathEndDrawPct
      } = MEASUREMENTS;
      const {
        iconPaths: {
          menuTopLeftToXBottomRight: topMenuPathElem,
          menuBottomRightToXTopRight: bottomMenuPathElem
        }
      } = DOM_REFS;
  
      TL.add(makeMiddlePathTL(), '0');
      TL.add([
        makeCirclingPathTL(topMenuPathElem, topMenuPathEndDrawPct),
        makeCirclingPathTL(bottomMenuPathElem, bottomMenuPathEndDrawPct),
      ], DURATIONS.middlePathHeadStart);
  
      return TL;
    }
  
    function initMasterTL() {
  
      masterTL = new TimelineMax({
        paused: true,
        onComplete: onToggleToXComplete,
        onReverseComplete: onToggleToHamburgerComplete
      });
  
      masterTL.add(makeToggleTL());
    }
  
    function run() {
      cacheDOMRefs();
      cacheMeasurements();
      prepareStartState();
      registerListeners();
      initMasterTL();
    }
  
    return {
      run
    };
  
  }());
  
  /**
   * Pythagorous FTW
   */
  function _computePointDistance(p1, p2) {
    const {
      sqrt,
      abs
    } = Math;
    const a = abs(p1.getAttribute('cx') - p2.getAttribute('cx'));
    const b = abs(p1.getAttribute('cy') - p2.getAttribute('cy'));
  
    return sqrt(a * a + b * b);
  }
  
  Icon.run();