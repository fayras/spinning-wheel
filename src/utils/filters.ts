import { Filter } from "@pixi/core";

export class CrossHatchFilter extends Filter {
  static vertex = `
    attribute vec2 aVertexPosition;
    attribute vec2 aTextureCoord;

    uniform mat3 projectionMatrix;

    varying vec2 vTextureCoord;

    void main(void)
    {
        gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);
        vTextureCoord = aTextureCoord;
    }
  `;

  static fragment = `
    precision mediump float;

    varying vec2 vTextureCoord;

    uniform sampler2D uSampler;

    void main(void) {
      vec4 currentColor = texture2D(uSampler, vTextureCoord);
      float lum = length(texture2D(uSampler, vTextureCoord.xy).rgb);
      float alpha = 0.5;
      gl_FragColor = currentColor;
      vec4 color = vec4(0.0, 0.0, 0.0, 1.0);

      if(lum < 0.7) {
        color = vec4(1.0, 1.0, 1.0, 1.0);
      }

      if (
        mod(gl_FragCoord.x + gl_FragCoord.y - 5.0, 10.0) == 0.0
        || mod(gl_FragCoord.x - gl_FragCoord.y - 5.0, 10.0) == 0.0
      )
        {
          gl_FragColor = vec4(mix(currentColor.rgb, color.rgb, currentColor.a * alpha), currentColor.a);
        }
    }
  `;

  constructor() {
    super(CrossHatchFilter.vertex, CrossHatchFilter.fragment);
  }
}
