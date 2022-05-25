// https://pixijs.io/customize/

// Renderer plugins.
import { BatchRenderer, Renderer } from '@pixi/core';
Renderer.registerPlugin('batch', BatchRenderer);
import { InteractionManager } from '@pixi/interaction';
Renderer.registerPlugin('interaction', InteractionManager);

// Application plugins.
import { Application } from '@pixi/app';
import { TickerPlugin } from '@pixi/ticker';
Application.registerPlugin(TickerPlugin);

import { Game } from './core/game';
import { GameScene } from './scenes/game-scene';

window.onload = (): void => {
  const game = new Game({
    width: window.innerWidth,
    height: window.innerHeight,
    color: 0x333333,
    resolution: window.devicePixelRatio,
    scenes: {
      'game-scene': GameScene,
    },
  });

  window.addEventListener('resize', () =>
    game.resize(window.innerWidth, window.innerHeight),
  );

  game.load('game-scene');
  game.resize(window.innerWidth, window.innerHeight);
};
