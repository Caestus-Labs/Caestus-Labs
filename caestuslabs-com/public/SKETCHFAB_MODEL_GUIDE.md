# How to Use the Actual Quest 3 Model from Sketchfab

## Option 1: Download and Use Locally (Recommended)

1. **Download the Model:**
   - Go to: https://sketchfab.com/3d-models/meta-quest-3-65a813833dc04eeeb7d33bdca58c184c
   - Click "Download 3D Model" button
   - Select "Autoconverted format (glTF)" - this works best with Three.js
   - Save the downloaded files to `/public/models/quest3/`

2. **Update Quest3Model.tsx to use GLTF:**

```tsx
import { useGLTF } from '@react-three/drei'

export default function Quest3Model() {
  const { nodes, materials } = useGLTF('/models/quest3/scene.gltf')

  // Use the loaded model
  return (
    <primitive
      object={nodes.Scene}
      scale={0.01}
      // Add your animations here
    />
  )
}
```

## Option 2: Use Sketchfab Embed (Quick but Limited)

Add this to your component:

```html
<div className="sketchfab-embed-wrapper">
  <iframe
    title="Meta Quest 3"
    frameborder="0"
    allowfullscreen
    mozallowfullscreen="true"
    webkitallowfullscreen="true"
    allow="autoplay; fullscreen; xr-spatial-tracking"
    xr-spatial-tracking
    execution-while-out-of-viewport
    execution-while-not-rendered
    web-share
    src="https://sketchfab.com/models/65a813833dc04eeeb7d33bdca58c184c/embed?autostart=1&ui_controls=0&ui_infos=0&ui_inspector=0&ui_stop=0&ui_watermark=0&ui_watermark_link=0">
  </iframe>
</div>
```

## Free Quest Models Available:

1. **Meta Quest 3 by Elin** (Best quality)
   - ID: 65a813833dc04eeeb7d33bdca58c184c
   - License: CC Attribution (free with credit)

2. **Quest 3 by Redcodi**
   - ID: e5c334a9598c4e85bb182eebf15a2e32
   - License: CC Attribution

3. **Meta Quest 3 VR headset by Valger**
   - ID: e89e479f32364c8da12c8cc171e91810
   - License: CC Attribution

## Attribution Required:
When using these models, add credit:
"Meta Quest 3 model by [Creator Name] on Sketchfab"