let time = new Date();
let now = (time.getHours()*60+time.getMinutes())*60+time.getSeconds();
if ((today != 6 && today !=0 && now>(12*60+55)*60) || (today == 6 && now>(14*60+15)*60) || (today == 0)) {
    tsParticles.load("tsparticles", {
        "fullScreen": {
        "zIndex": 1
        },
        "emitters": [
        {
            "life": {
                "duration": 0.1,
                "count": 1,
            },
            "position": {
            "x": 0,
            "y": 45
            },
            "rate": {
            "quantity": 100,
            "delay": 0.15
            },
            "particles": {
            "move": {
                "direction": "top-right",
                "outModes": {
                "top": "none",
                "left": "none",
                "default": "destroy"
                }
            }
            }
        },
        {
            "life": {
                "duration": 0.1,
                "count": 1,
            },
            "position": {
            "x": 100,
            "y": 45
            },
            "rate": {
            "quantity": 100,
            "delay": 0.15
            },
            "particles": {
            "move": {
                "direction": "top-left",
                "outModes": {
                "top": "none",
                "right": "none",
                "default": "destroy"
                }
            }
            }
        }
        ],
        "particles": {
        "color": {
            "value": [
            "rgba(240,5,127,1)",
            "rgba(0,98,173,1)",
            "rgba(0,156,66,1)"
            ]
        },
        "move": {
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
        "number": {
            "value": 0
        },
        "opacity": {
            "value": 1
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
        "tilt": {
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
        "size": {
            "value": {
            "min": 3,
            "max": 5
            },
            "animation": {
            "enable": true,
            "startValue": "min",
            "count": 1,
            "speed": 16,
            "sync": true
            }
        },
        "roll": {
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
        "wobble": {
            "distance": 30,
            "enable": true,
            "speed": {
            "min": -7,
            "max": 7
            }
        },
        "shape": {
            "type": "square",
            "options": {}
        }
        }
    });
}