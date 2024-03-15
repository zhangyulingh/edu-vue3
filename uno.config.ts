import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetUno,
  transformerVariantGroup,
  transformerDirectives,
} from 'unocss'

export default defineConfig({
  theme: {
    colors: {
      primary: 'var(--primary-color)',
    },
    borderRadius: {
      lg: '5px',
    },
  },
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      extraProperties: { display: 'inline-block' },
    }),
  ],
  shortcuts: [
    ['wrapper', 'mx-5 xl:w-1200px 2xl:w-1400px xl:mx-a'],
    ['tips', 'text-black text-op-60'],
  ],
  transformers: [transformerVariantGroup(), transformerDirectives()],
  rules: [
    [
      /bg-img-([\w-]+)/,
      ([_, name]) => {
        return {
          'background-image': `url(../images/bg-${name}.png)`,
          'background-repeat': 'no-repeat',
        }
      },
    ],
  ],
})
