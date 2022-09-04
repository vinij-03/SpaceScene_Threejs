import './style.css'
import * as THREE from 'three'
import { MapControls, OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

//scene
const scene = new THREE.Scene();


//camera
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

//renderer
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('.webgl')
});
renderer.setSize( window.innerWidth, window.innerHeight );
// renderer.setPixelRatio( window.devicePixelRatio );
camera.position.setZ(30);
renderer.render( scene, camera );

//geometry
const geometry = new THREE.TorusGeometry( 10, 1, 20, 100 );
const material = new THREE.MeshStandardMaterial( { color: 0x006E7F } );
const torus = new THREE.Mesh( geometry, material );
scene.add( torus );


//lights
const pointlight= new THREE.PointLight(0xffffff);
pointlight.position.set( 15,-15,100);
const abientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointlight);
// scene.add(abientLight);



//light helper
const lightHelper = new THREE.PointLightHelper(pointlight);
scene.add(lightHelper);

//grid helper
const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(gridHelper);

//
function addStar(){
    const geometry = new THREE.SphereGeometry(0.25, 24, 24);
    const material = new THREE.MeshStandardMaterial({color: 0xffffff});
    const star = new THREE.Mesh(geometry, material);
    const [x,y,z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));
    star.position.set(x,y,z);
    scene.add(star);
}
Array(200).fill().forEach(addStar);

//spcae texture
const spactexture= new THREE.TextureLoader().load('space.jpg');
scene.background = spactexture;

//texture element
const texture = new THREE.TextureLoader().load('img.jpg');
const normaltexture = new THREE.TextureLoader().load('normal.jpg');
const text = new THREE.Mesh(
    new THREE.SphereGeometry(5, 59, 32),
    new THREE.MeshStandardMaterial({
        map: texture,
        normalMap: normaltexture

    })
)
scene.add(text);

const moonTexture = new THREE.TextureLoader().load('moon.jpg');


//orbit controls
const controls= new OrbitControls(camera, renderer.domElement);

function animate(){
    requestAnimationFrame( animate );
    torus.rotation.x += 0.001;
    torus.rotation.y += 0.005;
    torus.rotation.z += 0.001;
    torus.position.x += 0.005;
    torus.position.y+= 0.005;
    text.position.x+=0.005;
    text.position.y+=0.005;
    text.rotation.x+=0.01;
    text.rotation.y+=0.01;
    text.rotation.z+=0.01;
    controls.update();
    renderer.render( scene, camera );
}
animate();
