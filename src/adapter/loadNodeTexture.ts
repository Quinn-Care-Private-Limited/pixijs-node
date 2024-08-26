import canvasModule from 'canvas';
import {
    DOMAdapter,
    extensions,
    ExtensionType,
    getResolutionOfUrl,
    path,
    Texture,
    TextureSource,
} from 'pixi.js';
import { NodeCanvasElement } from './NodeCanvasElement';

import type { LoaderParser, ResolvedAsset } from 'pixi.js';

const { loadImage } = canvasModule;
const validImages = ['.jpg', '.png', '.jpeg', '.svg'];

/** loads our textures into a node canvas */
export const loadNodeTexture = {
    extension: ExtensionType.LoadParser,

    test(url: string): boolean
    {
        return validImages.includes(path.extname(url).toLowerCase());
    },

    async load(url: string, asset: ResolvedAsset): Promise<Texture>
    {
        const adapter = DOMAdapter.get();
        const data = await adapter.fetch(url);
        const image = await loadImage(Buffer.from(await data.arrayBuffer()));
        const canvas = new NodeCanvasElement(image.width, image.height);
        const ctx = canvas.getContext('2d');

        ctx?.drawImage(image as unknown as CanvasImageSource, 0, 0);
        const texture = Texture.from(canvas as unknown as TextureSource, {
            resolution: getResolutionOfUrl(url),
            ...asset.data,
        });

        return texture;
    },

    unload(texture: Texture): void
    {
        texture.destroy(true);
    },
} as LoaderParser<Texture>;

extensions.add(loadNodeTexture);
