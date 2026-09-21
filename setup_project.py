from pathlib import Path

PROJECT_NAME = "TamWeb"

folders = [
    "css",
    "css/scenes",
    "js",
    "js/core",
    "js/scenes",
    "js/components",
    "assets",
    "assets/images",
    "assets/audio",
    "assets/fonts",
]

files = [
    "index.html",
    "css/main.css",
    "css/variables.css",
    "css/animations.css",
    "js/main.js",
    "js/core/SceneManager.js",
    "js/core/InputManager.js",
    "js/core/AudioManager.js",
    "js/core/TransitionManager.js",
    "js/scenes/SunsetScene.js",
    "js/components/Sun.js",
    "js/components/Mountain.js",
    "js/components/Tree.js",
    "js/components/CameraButton.js",
    "README.md",
]

root = Path(PROJECT_NAME)

# Crear carpetas
for folder in folders:
    (root / folder).mkdir(parents=True, exist_ok=True)

# Crear archivos vacíos
for file in files:
    path = root / file
    path.touch(exist_ok=True)

print()
print(f"✓ Proyecto creado: {root.resolve()}")
print()

for folder in folders:
    print(f"📁 {folder}/")

for file in files:
    print(f"📄 {file}")

print()
print("✓ Estructura creada correctamente.")