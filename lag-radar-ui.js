/**
 * lagRadar
 * Licence: ISC copyright: @mobz 2018
 */

export default function lagRadarUI() {
  const global = this;
  if(global._killLagRadarUI) {
    global._killLagRadarUI();
    return;
  }
  const $style = document.createElement('style');
  $style.appendChild(document.createTextNode(`
    BODY #lagRadarBM.lagRadarBM-radar {
      font-family: Futura, "Trebuchet MS", sans-serif;
      font-style: normal;
      text-align: center;
      font-size: 16px;
    }
    .lagRadarBM-radar {
      position: fixed;
      z-index: 999999;
      top: 100px;
      left: 100px;
      user-select: none;
    }
    .lagRadarBM-radar.active {
      outline: 3px dotted rgba(100,100,100,0.5);
      cursor: ns-resize;
    }
    .lagRadarBM-radar.active .lagRadarBM-title,
    .lagRadarBM-radar:hover .lagRadarBM-title {
      visibility: visible;
    }
    .lagRadarBM-title {
      position: absolute;
      display: flex;
      width: 210px;
      left: calc(50% - 210px/2);
      box-sizing: content-box;
      height: 24px;
      line-height: 24px;
      top: calc(50% - 24px/2);
      visibility: hidden;
      color: #8f8;
      background-color: #080;
      border: 2px solid #0b0;
      border-radius: 10px;
      opacity: 0.85;
    }
    .lagRadarBM-title > * {
      padding: 0 10px;
    }
    .lagRadarBM-title > .active,
    .lagRadarBM-title > *:hover {
      background: #4a0;
      color: #efd;
    }
    .lagRadarBM-title > *:first-child {
      border-radius: 8px 0 0 8px;
    }
    .lagRadarBM-title > *:last-child {
      border-radius: 0 8px 8px 0;
    }
    .lagRadarBM-close {
      cursor: pointer;
    }
    .lagRadarBM-label {
      flex-grow: 1;
      cursor: -webkit-grab;
      cursor: grab;
    }
    .lagRadarBM-label.active {
      cursor: -webkit-grabbing;
      cursor: grabbing;
    }
    .lagRadarBM-rsize {
      line-height: 19px;
      cursor: ns-resize;
    }
    .lagRadarBM-sweep {
      pointer-events: none;
    }
  `));
  function $e(cls, children = []) {
    const el = document.createElement('div');
    el.className = 'lagRadarBM-' + cls;
    children.forEach( child => el.appendChild( child ) );
    return el;
  }

  const $close = $e('close', [ document.createTextNode('\u00D7') ]);
  const $rsize = $e('rsize', [ document.createTextNode('\u25f3') ]);
  const $label = $e('label', [ document.createTextNode('lag-radar' )]);
  const $title = $e('title', [ $rsize, $label, $close ] );
  const $sweep = $e('sweep');
  const $radar = $e('radar', [ $style, $title, $sweep ] );

  $radar.id = 'lagRadarBM';
  const RESIZE = 1, MOVE = 2;
  let mode = null, origSize = 300, size = 300, offsetX, offsetY;
  const mouseDown = ev => {
    if(mode === null) {
      if(ev.target === $label) {
        mode = MOVE;
        offsetX = $radar.offsetLeft - ev.screenX;
        offsetY = $radar.offsetTop - ev.screenY;
      } else if(ev.target === $rsize) {
        mode = RESIZE;
        offsetY = size - ev.screenY;
        $radar.classList.add('active');
      }
      ev.target.classList.add('active');
      document.addEventListener('mousemove', mouseMove);
      document.addEventListener('mouseup', mouseUp);
    }
  };
  const mouseUp = ev => {
    mode = null;
    document.removeEventListener('mousemove', mouseMove);
    document.removeEventListener('mouseup', mouseUp);
    $label.classList.remove('active');
    $rsize.classList.remove('active');
    $radar.classList.remove('active');
  };
  const mouseMove = ev => {
    if(mode === MOVE) {
      $radar.style.left = offsetX + ev.screenX + 'px';
      $radar.style.top = offsetY + ev.screenY + 'px';
    } else if(mode === RESIZE) {
      size = Math.max(16, offsetY + ev.screenY);
      $radar.style.height = size + 'px';
      $radar.style.width = size + 'px';
      $sweep.style.zoom = (size / origSize);
    }
  };
  $title.addEventListener('mousedown', mouseDown);
  document.body.appendChild( $radar );
  const destroy = lagRadar({
    parent: $sweep
  });
  global._killLagRadarUI = function() {
    $radar.remove();
    destroy();
    delete global._killLagRadarUI;
  };
  $close.addEventListener('click', global._killLagRadarUI );
};
