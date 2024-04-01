// インストール
self.addEventListener('install', function (e) {
  console.info('install', e);
  e.waitUntil(self.skipWaiting());
});

// アクティベート
self.addEventListener('activate', function (e) {
  console.info('activate', e);
});

// フェッチ
self.addEventListener('fetch', function (e) {
  console.info('fetch', e);
});

// onmessageイベントハンドラーでメインスレッドからのメッセージを受け取る
self.onmessage = (event) => {
  // メインスレッドからOffscreenCanvasを受け取る
  const offscreenCanvas = event.data.canvas;

  console.log(offscreenCanvas);

  // 以降、offscreenCanvasは通常のCanvasと同様に処理ができる
  if (offscreenCanvas.getContext) {
    var ctx = offscreenCanvas.getContext('2d');

    ctx.beginPath();
    ctx.moveTo(60, 60); //最初の点の場所
    ctx.lineTo(30, 90); //2番目の点の場所
    ctx.lineTo(90, 90); //3番目の点の場所
    ctx.closePath(); //三角形の最後の線 closeさせる

    ctx.strokeStyle = 'rgb(0,0,0)'; //枠線の色
    ctx.stroke();

    ctx.fillStyle = 'rgb(255,0,0)'; //塗りつぶしの色
    ctx.fill();
  }
};
