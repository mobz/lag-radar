# LagRadar

> It's a sexy little lag radar for demonstrating performance - or lack of.

LagRadar allows user to receive a visual indication when framrate drops below 60FPS.

[Demo](https://mobz.github.io/lag-radar/)

## Usage

The radar is published as a zero dependency es6 javascript module.

```javascript

import lagRadar from './lag-radar.js';

const destroy = lagRadar({
  frames: 50,    // number of frames to draw, more = worse performance
  speed: 0.0017, // how fast the sweep moves (rads per ms)
  size: 300,     // outer frame px
  inset: 3,      // circle inset px
  parent: document.body, // DOM node to attach to
});

// later ...
destroy();
```

It also exposes css class hooks for styling the radar

### To run the demo

```
npm install
npm start
open http://localhost:9080/
```

## Genesis

This version authored by [@mobz](https://twitter.com/mobz) with ideas and contributions [from others](https://twitter.com/dan_abramov/status/970028229271670784)
for [this talk](https://reactjs.org/blog/2018/03/01/sneak-peek-beyond-react-16.html)
by [@dan_abramov](https://twitter.com/dan_abramov) and shared to the world with love.
