import { useEffect, useRef } from 'react'

const VERT = 'attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}'

const FRAG = `
precision highp float;
uniform vec2 uR;uniform float uT;uniform vec2 uM;uniform float uI;
float h21(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453123);}
float vn(vec2 p){
  vec2 i=floor(p);vec2 f=fract(p);f=f*f*(3.-2.*f);
  float a=h21(i),b=h21(i+vec2(1.,0.)),c=h21(i+vec2(0.,1.)),d=h21(i+vec2(1.,1.));
  return mix(mix(a,b,f.x),mix(c,d,f.x),f.y);
}
float fbm(vec2 p){
  float v=0.;float a=.5;
  for(int i=0;i<5;i++){v+=a*vn(p);p=p*2.03+vec2(11.3,7.9);a*=.5;}
  return v;
}
void main(){
  vec2 uv=gl_FragCoord.xy/uR;
  vec2 p=(gl_FragCoord.xy*2.-uR)/min(uR.x,uR.y);
  float t=uT*.05;
  p+=(uM-.5)*vec2(.3,.2);
  vec2 q=vec2(fbm(p+t),fbm(p+vec2(5.2,1.3)-t*.8));
  vec2 r=vec2(fbm(p+q*3.2+vec2(1.7,9.2)+t*.35),fbm(p+q*3.2+vec2(8.3,2.8)-t*.28));
  float f=fbm(p+r*2.4);
  vec3 col=vec3(.012,.012,.026);
  col=mix(col,vec3(.14,.08,.38),smoothstep(.15,.9,f));
  col=mix(col,vec3(.03,.30,.42),.6*smoothstep(.35,.95,q.y));
  col=mix(col,vec3(.36,.22,.72),.5*smoothstep(.4,1.,r.x)*f);
  col=mix(col,vec3(.07,.52,.44),.35*smoothstep(.55,1.,r.y));
  col*=(.35+f*1.05)*uI;
  float vg=1.-.5*dot(uv-.5,uv-.5)*2.2;
  col*=max(vg,0.);
  gl_FragColor=vec4(col,1.);
}`

/**
 * Fullscreen WebGL "aurora" — fbm-warped nebula ribbons drifting on a near-black
 * field, subtly following the cursor. Renders at reduced resolution for perf,
 * pauses offscreen, and degrades to a static frame under prefers-reduced-motion.
 */
export function Aurora({ className = '', intensity = 1 }: { className?: string; intensity?: number }) {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const gl = canvas.getContext('webgl', {
      antialias: false,
      depth: false,
      stencil: false,
      alpha: false,
      powerPreference: 'high-performance',
    }) as WebGLRenderingContext | null
    if (!gl) return

    const mk = (type: number, src: string) => {
      const s = gl.createShader(type)!
      gl.shaderSource(s, src)
      gl.compileShader(s)
      return s
    }
    const prog = gl.createProgram()!
    gl.attachShader(prog, mk(gl.VERTEX_SHADER, VERT))
    gl.attachShader(prog, mk(gl.FRAGMENT_SHADER, FRAG))
    gl.linkProgram(prog)
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return
    gl.useProgram(prog)

    const buf = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buf)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)
    const loc = gl.getAttribLocation(prog, 'p')
    gl.enableVertexAttribArray(loc)
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0)

    const uR = gl.getUniformLocation(prog, 'uR')
    const uT = gl.getUniformLocation(prog, 'uT')
    const uM = gl.getUniformLocation(prog, 'uM')
    const uI = gl.getUniformLocation(prog, 'uI')
    gl.uniform1f(uI, intensity)

    const mouse = { x: 0.5, y: 0.5, cx: 0.5, cy: 0.5 }
    let visible = true
    let raf = 0

    const resize = () => {
      const s = Math.min(window.devicePixelRatio || 1, 1.6) * 0.55
      canvas.width = Math.max(1, Math.round(canvas.clientWidth * s))
      canvas.height = Math.max(1, Math.round(canvas.clientHeight * s))
      gl.viewport(0, 0, canvas.width, canvas.height)
      gl.uniform2f(uR, canvas.width, canvas.height)
    }
    resize()
    window.addEventListener('resize', resize)

    const onMouse = (e: MouseEvent) => {
      mouse.x = e.clientX / window.innerWidth
      mouse.y = 1 - e.clientY / window.innerHeight
    }
    window.addEventListener('mousemove', onMouse)

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
    })
    io.observe(canvas)

    const t0 = performance.now()
    const frame = () => {
      raf = requestAnimationFrame(frame)
      if (!visible || document.hidden) return
      mouse.cx += (mouse.x - mouse.cx) * 0.04
      mouse.cy += (mouse.y - mouse.cy) * 0.04
      gl.uniform2f(uM, mouse.cx, mouse.cy)
      gl.uniform1f(uT, (performance.now() - t0) / 1000)
      gl.drawArrays(gl.TRIANGLES, 0, 3)
    }

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gl.uniform2f(uM, 0.5, 0.5)
      gl.uniform1f(uT, 14)
      gl.drawArrays(gl.TRIANGLES, 0, 3)
    } else {
      frame()
    }

    return () => {
      cancelAnimationFrame(raf)
      io.disconnect()
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMouse)
      gl.getExtension('WEBGL_lose_context')?.loseContext()
    }
  }, [intensity])

  return <canvas ref={ref} className={className} aria-hidden="true" />
}
