_**دراسة عن مكتبة**_ _**Three.js**_

**عبد الرحمن رحال** (٤) - **محمد معراوي** (٦) - **محمد حمزة الشمالي** (٩)

# تمهيد

يدرس هذا البحث مكتبة Three.js، ويقدم تعريفًا موجزًا عنها وعن مبادئ استخامها. كما يقارنها بغيرها من مكتبات التصميم ثلاثي الأبعاد التي تستخدم واجهة البرمجيات WebGL من شعبية الاستخدام والمساهمات في التطوير ومن حيث المواقع التي تستخدم كلًا منهم. ثم ينٍفذ برنامجا يستخدم فيه مبادئ المكتبة ويدرس تجربة التطوير ويشرح هذه الأساسيات.

ويذكر عددًا من مجالات استخدام المكتبة ويقدم بعض النماذج الواقعية عليها.
# مقدمة

...تمهيد وكلام عن الرسم ثلاثي الأبعاد

  

هي مكتبة للرسم ثلاثي الأبعاد داخل متصفحات الويب، وهي كما هو ظاهر من اسمها مبنية بلغة ، والتي تصدرت اللغات الأكثر استخداما وفقًا لإحصائية موقع …، وكنتيجة لشهرة اللغة وتوفر متصفحات الويب على كل الأجهزة فإن هذا يجعل مكتبة مستخدمة بشكل كبير نظرًا لاستهدافها شريحة عريضة من المستخدمي الويب والمبرمجين على حد سواء.

  

بدأ مشروع المكتبة عام ٢٠١٠ كبرمجية مفتوحة المصدر على موقع واسم كاتبها Ricardo Cabello ،وما زالت التحديثات والتطويرات من المجتمع تصلها بشكل كثيف، وقد حصلت إلى وقت كتابة هذا البحث على أكثر من ١٠٢ ألف نجمة على الموقع بفارق أكثر من ٧٠ ألف نجمة عن أقرب نظيراتها Babylon.js وأكثر من ٤٤ ألف إيداع مجتمعي على الكود، وعدد من المساهمين يقارب الألفين. مثل هذه الأرقام تجعل منها اختيار موثوق ومستقر في المستقبل.

  

وقد برزت العديد من الاستخدامات المفيدة والباهرة للمكتبة في برمجيات الويب، كالنماذج ثلاثية الأبعاد للبضائع المتاجر الإلكترونية، واستخدامها لتصوير رؤية قريبة للواقع في الخرائط وتصاوير الكرة الأرضية لعرض الإحصائيات أو أحوال الطقس في البلدان، ثم استخدامها في لبرمجة الألعاب العابرة للأنظمة والتي تعمل على كل جهاز فيه متصفح ويب، وما هذه الأمثلة إلا غيض من فيض الإمكانيات التي تتيحها المكتبة.

  

تستخدم الواجهة البرمجية … التي يفتح لها قناة للتواصل مع معالج الرسوميات، وواجهة تتسم بشدة انخفاض مستواها ومرونة في نتاج تطبيقاتها ولكن كتابة البرمجيات بهذه الواجهة صعب جدًا إذ تكتفي برسم النقاط والخطوط والمثلثات []، لتنفيذ رسومات يسيرة بكود الـ نحتاج إلى عدد كبير جدًا من الأسطر البرمجية، ولما كانت هذه التجربة غير مريحة لعموم المبرمجين أتت مكتبة لتحل محل طبقة عالية المستوى لتقلل عدد الأسطر التي يحتاجها إنشاء الرسوميات من خلال ما تقدمه من إجرائيات وأغراض شائعة الاستخدام.

![](file:///tmp/lu26301vj3.tmp/lu26301vpt_tmp_7909a00a.png) _Figure :_ _عدد الأسطر البرمجية لبناء مكعب باستخدام_ _webgl api_

  

  

٢٨٨ سطرًا لكتابة مكعب سهل وبحجم ثابت لايتغير مع تغير عرض الشاشة، بينما بإلامكان إنشاء مثال أفضل بعدد أقل ولغة عالية باستخدام three.js كما هو ظاهر في الصورة أدناه.

  

![](file:///tmp/lu26301vj3.tmp/lu26301vpt_tmp_445396ec.png) _شكل ١__:_ _عدد الأسطر البرمجية لبناء مكعب باستخدام_ _three.js_

  

  

وفقًا لموقع builtwith فإن أكثر من ١٧٠٠٠ موقع حيّ ومسجل يستخدم three.js وأكثر من ١٨٠٠٠٠ سبق واستخدم المكتبة، وقد كانت فيما مضى لا يستخدمها إلا قلة من المواقع. ومن ينظر إلى الساحة التقنية اليوم، وما يستجد فيها من تقنيات تعتمد الرسم الثلاثي الأبعاد يعلم أن الحاجة إلى المكتبة واستخدامها سيستمر في ازدياد، وكما أصبحت كثير من تقنيات الـ3D كما الـ VR والواقع الافتراضي والنظارات الواقع المعزز واقعا معاشًا، فإنه سيصبح واقعًا في الويب أيضا. 


# تجربة التطوير في ThreeJS

## إعداد مشهد العرض
سنضيف بعضًا من المكونات التجهيزية والتي لا تظهر بشكل مباشر في العرض ولكنها ضرورية لإظهار العناصر الأساسية بشكل جيد.
```javascript
import * as THREE from "three";

// هو الحاوية لبقية عناصر المشهد
const scene = new THREE.Scene();
// كاميرا منظورية (شبيهة بالنظر الطبيعي عند الإنسان)
const camera = new THREE.PerspectiveCamera(
  75, // زاوية مجال الرؤية
  window.innerWidth / window.innerHeight, // نسبة العرض إلى الطول
  0.1, // سطح الرؤية القريب
  1000,// سطح الرؤية البعيد
);

// المصيّر الذي يحول الرسومات إلى مشهد حي
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
// الـ`domElement` يمثل الـ canvas في الـ html
document.body.appendChild(renderer.domElement);
```

النيجة: إضافة عنصر الـ`canvas` فارغ إلى الصفحة
![[screenshot_2024_11_06_07_29_22.webp]]

# تحريك المشهد
حتى نجعل المصيّر يعيد رسم المشهد لمواكبة التغيرات ورسمها على الشاشة سنضيف إجرائية الـ `renderer.setAnimationLoop` وذلك بإضافة ما يلي
```javascript
function animate() {
  renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);
```
*بدون هذه الخطوة، لن تُرسم أي من العناصر على الشاشة لأن الكاميرا غير مربوطة بالمشهد*
## إضافة غرض إلى المشهد
كما في كثير من مكتبات الرسم ثلاثي الأبعاد فإن لكل غرض في واقع المشهد له أمرين
- `Geometry`: وهي التي تحدد شكل الغرض (مكعب، كرة، ...إلخ)
- `Material`: هي المادة التي تغطي الأبعاد وتعطي الغرض لونه، كما تحدد خصائص تلقي الغرض للضوء وغيرها.
ولإنشاء الغرض نستدعي الـ `Mesh` وهو الغرض نفسه (بدمج الـ‌Geomtry & Material)
عندها يصبح بإمكاننا استدعاء الإجرائيات التي يوفرها Three.js API للوصول أو تعديل تموضع وحركة الغرض في مساحة العرض
وهذا مثال يغطي ما سبق وذكرناه عن الإطار العام لإنشاء الأغرض
```javascript
// شكل مستطيلي يمثل المساحة التي تجري عليها الكرة
const planeGeomtry = new THREE.PlaneGeometry(20, 30);
// الـ StrandardMaterial يفيد في استقبال وعكس الغرض للظلال عكس الـ basicMaterial الذي لا يوفر هذه الخصائص
const planeMaterial = new THREE.MeshStandardMaterial({
  color: "darkgreen",
  side: THREE.DoubleSide,
});
// إنشاء الغرض بدمج الشكل والمادة
const plane = new THREE.Mesh(planeGeomtry, planeMaterial);

// تعديل حركات وتموضع مساحة اللعب من خلال الإجرائيات الـObject
plane.rotation.x = -0.5 * Math.PI;
plane.receiveShadow = true;
// إضافته إلى المشهد الذي سبق وأنشآناه
scene.add(plane);
```

النتيجة: السطح الذي أضفناه لم يظهر بسبب انعدام الإضاءة (الـ standardMaterial تحتاج ضوء لتظهر)، كما نحتاج إلى إبعاد تنحية الكميرا إلى الخلف لتلقط العناصر المضافة بشكل صحيح.
![[screenshot_2024_11_06_07_45_51.webp]]

## إضافة ضوء وتعديل موضع الكميرا
نضيف ضوءا من نوع ambientLight ليجعل كل العناصر مضائة بدون استثناء، كما نسحب الكميرا إلى الخلف والأعلى لنحصل على لقطة أفضل للمشهد.
```javascript
camera.position.set(0, 8, 25);
const ambientLight = new THREE.ambientLight();
scene.add(ambientLight);
```

النتيجة:
![[screenshot_2024_11_06_07_53_44.webp]]
## إضافة بقية الأغراض اللازمة
بنفس الطريقة إنشاء وإضافة مساحة اللعب إلى المشهد ننشئ ما نحتاجه من مكونات
```javascript
const planeGeomtry = new THREE.PlaneGeometry(20, 30);
// ....
scene.add(plane);

const tableGeometry = new THREE.BoxGeometry(22, 32, 10);
// ....
scene.add(table);

const sphereGeometry = new THREE.SphereGeometry(0.5);
// ....
scene.add(ball);

// ....
scene.add(paddle1);
scene.add(paddle2);

// ....
scene.add(pillar1);
scene.add(pillar2);

// ....
scene.add(ground);

```

النتيجة:
![[screenshot_2024_11_06_07_56_12.webp]]

## إضافات لتسهيل وإصلاح الأخطاء في المشهد
الكميرا الثابتة تمنعنا من رؤية المكونات التي أضفناها فيما إن كانت كما أردنا لها أن تكون، وأيضا هناك بعض القيم التي نحتاج إلى تغييرها باستمرار لداعي الاختبار والتجربة.
نضيف إمكانية تحريك الكميرا باستخدام بعض المتحكمات المضمنة في المكتبة:
```javascript
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const orbit = new OrbitControls(camera, renderer.domElement);
scene.add(orbit);

camera.position.set(0, 8, 25);
orbit.update(); // !نحتاج إلى تحديث الموضع في المتحكم عند كل تعديل يدوي لموضع الكميرا

```

نضيف مكتبة dat.gui لتعديل قيم المتحولات بشكل آني وقت التشغيل:
```javascript
import * as dat from "dat.gui";

// واجهة صغيرة في أعلى يمين الشاشة للتحكم بالقيم التي نختارها
const gui = new dat.GUI();
const options = {
  planeColor: "#00ff00",
};

plane.material.color.set(options.planeColor);
// إضافة حدث لمراقبة التغيرات في لون السطح وإجراء التعديل المناسب لتغييره
gui.addColor(options, "planeColor").onChange(e => plane.material.color.set(e));
```
## الأضواء
توفر Three.js أنوعا عدة من الأضواء ولكل منها سلوك مختلف
- `ambientLight`: الضوء
- `spotLight`
- `directionalLight`
نضيف ضوء من نوع spot أعلى  الطاولة بإضافة ما يلي:
```javascript
const spotLight = new THREE.SpotLight(0xffffff, 100);
spotLight.position.set(0, 10, 0);
spotLight.castShadow = true;
scene.add(spotLight);

// خطوط تساعد في معرفة الموضع والمساحة التي يغطيها الضوء
const sLightHelper = new THREE.SpotLightHelper(spotLight);
scene.add(sLightHelper);

scene.add(spotLight);
```

النتيجة:
![[screenshot_2024_11_06_08_12_15.webp]]

## نضيف الدوال تحريك الكرة والمضارب:
دالة الanimate ستدعي هذه الدوال بشكل دوري، وهذه الدوال هي التي تتحكم بحركة الكرة والمضارب، هنا قسم من الكود يوضح عمل الـballLogic funciton:
```javascript
function animate() {
// ....
  ballLogic();
  paddleLogic();
  cpuPaddleLogic();
  playerPaddleLogic();
}

let paddle1DirX = 0;
let paddle2DirX = 0;
let paddleSpeed = 0.2;

let ballDirX = 1;
let ballDirZ = 1;
let ballSpeed = 0.1;

function ballLogic() {
  if (ball.position.z <= -15) {
    resetBall(2);
  } else if (ball.position.z >= 15) {
    resetBall(1);
  } else if (ball.position.x <= -10) {
    ballDirX = -ballDirX;
  } else if (ball.position.x >= 10) {
    ballDirX = -ballDirX;
  }

  ball.position.x += ballDirX * ballSpeed;
  ball.position.z += ballDirZ * ballSpeed;
}
// ...
```

## النتيجة المبدئية
حتى الآن حصلنا على طاولة وكرة تتحرك والمضارب تضرب هذه الكرة وتغير اتجاهها والgif في الأسفل يوضح ذلك
لكن نحتاج إلى تجربة الميزات الأخرى لتحسين تجربة اللعب وهو فعلناه في الفقرات التالية
![[output.gif]]
