let size = [];
if (navigator.userAgent.match(/(iPhone|iPod|iPad)/i)) {
    size = [outerWidth*0.04-2, outerWidth*0.04]
}
else {
    size = [outerWidth*0.015-2, outerWidth*0.015]
}

let particlesContainer;

tsParticles
  .load({
    "fullScreen": {
        "zIndex": 1
    },
    // fpsLimit: 60,
    particles: {
      number: {
        value: 0
      },
      color: {
        value: [
            "rgba(240,5,127,1)",
            "rgba(0,98,173,1)",
            "rgba(0,156,66,1)"
            ]
      },
      shape: {
        type: "square",
        options: {
        }
      },
      size: {
        value: { min: size[0], max: size[1] }
        // value: outerWidth*0.01
      },
      life: {
        duration: {
          sync: true,
          value: 7
        },
        count: 1
      },
      move: {
        "decay": 0.05,
        "direction": "top",
        "enable": true,
        "gravity": {
        "enable": true
        },
        "outModes": {
        "top": "none",
        "default": "destroy"
        },
        "speed": {
        "min": 10,
        "max": 50
        }
    },
      "rotate": {
        "value": {
        "min": 0,
        "max": 360
        },
        "direction": "random",
        "animation": {
        "enable": true,
        "speed": 30
        }
    },
      tilt: {
        "direction": "random",
        "enable": true,
        "value": {
        "min": 0,
        "max": 360
        },
        "animation": {
        "enable": true,
        "speed": 30
        }
    },
      roll: {
        "darken": {
        "enable": true,
        "value": 25
        },
        "enable": true,
        "speed": {
        "min": 5,
        "max": 15
        }
    },
      wobble: {
        distance: 30,
        enable: true,
        move: true,
        speed: {
          min: -7,
          max: 7
        }
      }
    },
    detectRetina: true,
    emitters: []
  })
  .then((container) => {
    particlesContainer = container;
  });

dummy.addEventListener(touchEvent, () => {
  if (particlesContainer && particlesContainer.addEmitter) {
    particlesContainer.addEmitter(
      {
        direction: "top-right",
        startCount: 20,
        life: {
          count: 1,
          duration: 1,
          delay: 0
        },
        rate: {
          delay: 10,
          quantity: 100
        },
        size: {
          width: 0,
          height: 0
        },
        "position": {
          "x": 0,
          "y": 45
          }
      },
    );
    particlesContainer.addEmitter(
        {
          direction: "top-left",
          startCount: 20,
          life: {
            count: 1,
            duration: 1,
            delay: 0
            },
          rate: {
            delay: 10,
            quantity: 100
            },
          size: {
            width: 0,
            height: 0
            },
          "position": {
            "x": 100,
            "y": 45
            }
        },
      );
  }
});