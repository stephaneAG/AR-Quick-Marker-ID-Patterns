<img width="100" height="100" src="ARhackRepoIcon.png"/>

# AR-Quick-Marker-ID-Patterns
Quick helper lib to generate AR Markers ID Patterns from 0 to 99 directly on a &lt;canvas> without needing images

## Usage & Demo

<a href="https://cdn.rawgit.com/stephaneAG/AR-Quick-Marker-ID-Patterns/b1bae6da/index.html">Online Demo</a>

```html
<!-- in your .html file -->
<canvas width="300" height="300" cross-origin=""></canvas>
<script src="quickMarkerIdPattern.js"></script>
```

```javascript
/* needed javascript */
var cnvs = document.querySelector('canvas');
var ctx = cnvs.getContext('2d');
quickMarkerIdPattern(ctx, 99); // where 99 can be [0..99] ( for now ? .. )
```

<img src="demoExcerpt.png" width="100%" height="auto"/>

See the index.html file for a quick example

## How ?

Interested ? See how I got those .. ;p

<img src="titleIsSelfExplanatory_worksForAllofThem.gif" width="100%" height="auto"/>

.. in other words, <canvas> back & forth ( .. )

ps: if someone is kind enough to provide me the corresponding Hamming code, I'd be happy to implement it as well for HTML5 canvas ( so long .swf utility .. )
