import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

import './style.css'

// Canvas
const canvas = document.querySelector('canvas.webgl')

let camera, scene, renderer

let mesh
const count = 3
const dummy = new THREE.Object3D()
var matrix = new THREE.Matrix4()
// var position = new THREE.Vector3()

camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  0.1,
  100
)

camera.position.set(1, 0, 5)

camera.lookAt(0, 0, 0)

scene = new THREE.Scene()

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

const geometry = new THREE.BoxBufferGeometry(1, 1, 1)
geometry.scale(0.25, 0.25, 0.25)

const material = new THREE.MeshBasicMaterial()

mesh = new THREE.InstancedMesh(geometry, material, count)
scene.add(mesh)

const offset = (count - 1) / 2

for (let i = 0; i < count; i++) {
  // You can set the position of each instance using a stand alone matrix like this:
  matrix.set(1, 0, 0, offset - i, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)
  mesh.setMatrixAt(i, matrix)

  // Or you can use a dummy object to set the position on the local transform matrix like this:

  // dummy.position.set(offset - i, 0, 0)
  // dummy.updateMatrix()
  // mesh.setMatrixAt(i, dummy.matrix)
}

renderer = new THREE.WebGLRenderer({ canvas: canvas })
renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

window.addEventListener('resize', onWindowResize, false)

function onWindowResize () {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()

  renderer.setSize(window.innerWidth, window.innerHeight)
}

function tick () {
  requestAnimationFrame(tick)

  controls.update()

  // if (mesh) {
  //   mesh.getMatrixAt(0, matrix)

  //   position.setFromMatrixPosition(matrix) // extract position form transformationmatrix
  //   position.x += 0.01 // move
  //   matrix.setPosition(position) // write new positon back

  //   mesh.setMatrixAt(0, matrix)

  //   mesh.instanceMatrix.needsUpdate = true
  // }

  renderer.render(scene, camera)
}

tick()
