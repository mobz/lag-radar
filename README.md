# LagRadar

> It's a sexy little component for demonstrating performance - or lack of - in your javascript application.

Add this to any javascript application to see how responsive it is. You can see when the app drops below
60fps as the radar sweep changes colour and gets janky.

```
npm i lag-radar
```

* [Get your live demo](https://mobz.github.io/lag-radar/)
* [Extra awesome as Bookmarklet](https://mobz.github.io/lag-radar/bookmarklet.html)
* [Wrapped in a convenient react component](https://www.npmjs.com/package/@gaearon/lag-radar)
* [Add it to storybook](https://storybook.js.org/addons/storybook-addon-lag-radar)

## Usage

The radar is published as a zero dependency es6 javascript module.

```javascript

import lagRadar from 'lag-radar';

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

### To run the demo locally

```
npx http-server
open http://localhost:8080/
```

## Genesis

This version authored by [@mobz](https://github.com/mobz) with ideas and contributions [from others](https://twitter.com/dan_abramov/status/970028229271670784)
for [this talk](https://reactjs.org/blog/2018/03/01/sneak-peek-beyond-react-16.html)
by [dan abramov](https://danabra.mov/) and shared to the world with love.
