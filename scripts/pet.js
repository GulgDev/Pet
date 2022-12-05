const States = {
    NORMAL: 0,
    SCREAMING: 1,
    ANGRY: 2,
    HAPPY: 3
};

const Characters = {
    default: "default",
    cat: "cat",
    wheatley: "wheatley"
};

let sounds;
let model;

class Pet {
    constructor(canvas, character) {
        this.canvas = canvas;
        this.width = 512;
        this.height = 512;
        this.character = character;
        this.playingSounds = [];
        this.greetings = [];
        this.scream = [];
        this.angry = [];
        this.happy = [];
        let soundsScript = document.createElement("script");
        soundsScript.addEventListener("load", () => {
            for (let path of sounds.greetings) {
                this.greetings.push(new Audio(`static/characters/${character}/sound/${path}.mp3`));
            }
            for (let path of sounds.scream) {
                let audio = new Audio(`static/characters/${character}/sound/${path}.mp3`);
                audio.loop = true;
                this.scream.push(audio);
            }
            for (let path of sounds.angry) {
                this.angry.push(new Audio(`static/characters/${character}/sound/${path}.mp3`));
            }
            for (let path of sounds.happy) {
                this.happy.push(new Audio(`static/characters/${character}/sound/${path}.mp3`));
            }
        });
        soundsScript.src = `static/characters/${character}/sound/sounds.js`;
        document.documentElement.appendChild(soundsScript);
        this.changeState(States.NORMAL);
        this.model = null;
        let modelScript = document.createElement("script");
        modelScript.addEventListener("load", () => {
            this.model = model;
        });
        modelScript.src = `static/characters/${character}/model.js`;
        document.documentElement.appendChild(modelScript);
        let isStretching = false;
        let startX = 0;
        let startY = 0;
        this.mousedownEventListener = (event) => {
            event.preventDefault();
            event.stopPropagation();
            [startX, startY] = this.toCanvasPosition(event.clientX, event.clientY);
            if (this.isPet(startX, startY)) {
                isStretching = true;
                this.changeState(States.ANGRY);
            }
        };
        canvas.addEventListener("mousedown", this.mousedownEventListener);
        this.mousemoveEventListener = (event) => {
            event.preventDefault();
            event.stopPropagation();
            if (isStretching) {
                let [x, y] = this.toCanvasPosition(event.clientX, event.clientY);
                this.width = Math.abs(512 + (startX > 1024 ? x - startX : startX - x) * 2);
                this.height = Math.abs(512 + (startY > 512 ? y - startY : startY - y) * 2);
                if (Math.abs(512 - this.width) > 64 || Math.abs(512 - this.height) > 64) {
                    this.changeState(States.SCREAMING);
                }
                this.render();
            }
        };
        canvas.addEventListener("mousemove", this.mousemoveEventListener);
        this.mouseupEventListener = (event) => {
            event.preventDefault();
            event.stopPropagation();
            isStretching = false;
            if (this.state == States.SCREAMING) {
                this.changeState(States.NORMAL);
            }
        };
        canvas.addEventListener("mouseup", this.mouseupEventListener);
        canvas.addEventListener("mouseout", this.mouseupEventListener);
        this.renderInterval = setInterval(() => {
            if (!isStretching) {
                this.width += Math.round((512 - this.width) / 8);
                if (Math.abs(512 - this.width) < 8) {
                    this.width = 512;
                }
                this.height += Math.round((512 - this.height) / 8);
                if (Math.abs(512 - this.height) < 8) {
                    this.height = 512;
                }
            }
            this.render();
        }, 10);
    }

    toCanvasPosition(x, y) {
        return [
            (x - this.canvas.offsetLeft) / this.canvas.clientWidth * 2048,
            (y - this.canvas.offsetTop) / this.canvas.clientHeight * 1024
        ];
    }

    isPet(x, y) {
        return x >= 1024 - this.width / 2 && x <= 1024 + this.width / 2 &&
            y >= 512 - this.height / 2 && y <= 512 + this.height / 2;
    }

    changeState(state) {
        if (state == this.state) {
            return;
        }
        this.stopSound(this.scream);
        this.state = state;
        switch (state) {
            case States.SCREAMING:
                this.playSound(this.scream);
                break;
            case States.ANGRY:
                this.playSound(this.angry).then(() => {
                    if (state == this.state) {
                        this.changeState(States.NORMAL);
                    }
                });
                break;
            case States.HAPPY:
                this.playSound(this.happy).then(() => {
                    if (state == this.state) {
                        this.changeState(States.NORMAL);
                    }
                });
                break;
        }
        this.render();
    }

    playSound(sound) {
        return new Promise((resolve) => {
            this.stopSounds();
            this.playingSounds.push(sound);
            let audio = sound[Math.floor(Math.random() * sound.length)];
            audio.addEventListener("pause", () => {
                let index = this.playingSounds.indexOf(sound);
                if (index > -1) {
                    this.playingSounds.splice(index, 1);
                }
            }, {once: true});
            let play = () => {
                audio.play().then(() => {
                    audio.addEventListener("pause", resolve);
                }).catch(() => {
                    setTimeout(play, 10);
                });
            };
            play();
        });
    }

    stopSound(sound) {
        for (let audio of sound) {
            audio.pause();
            audio.currentTime = 0;
        }
    }

    stopSounds() {
        for (let sound of this.playingSounds) {
            this.stopSound(sound);
        }
    }

    render() {
        if (this.model == null) {
            return setTimeout(this.render.bind(this), 100);
        }
        this.canvas.style.backgroundColor = this.model.backgroundColor;
        let ctx = this.canvas.getContext("2d");
        ctx.fillStyle = this.model.bodyColor;
        ctx.strokeStyle = this.model.bodyColor;
        ctx.clearRect(0, 0, 2048, 1024);
        ctx.beginPath();
        ctx.ellipse(1024, 512, this.width / 2, this.height / 2, 0, 0, 2 * Math.PI);
        ctx.fill();
        this.model.render.apply(this.model, [this, ctx]);
        /* ctx.fillStyle = "#FFFFFF";
        ctx.strokeStyle = "#FFFFFF";
        ctx.beginPath();
        ctx.ellipse(1024 - this.width / 4, 512 - this.height / 5, 48, 48, 0, 0, 2 * Math.PI);
        ctx.ellipse(1024 + this.width / 4, 512 - this.height / 5, 48, 48, 0, 0, 2 * Math.PI);
        ctx.fill();
        ctx.fillStyle = "#000000";
        ctx.strokeStyle = "#000000";
        ctx.beginPath();
        ctx.ellipse(1024 - this.width / 4, 512 - this.height / 5, 12, 12, 0, 0, 2 * Math.PI);
        ctx.ellipse(1024 + this.width / 4, 512 - this.height / 5, 12, 12, 0, 0, 2 * Math.PI);
        ctx.fill();
        ctx.fillStyle = "#FF0000";
        ctx.strokeStyle = "#FF0000";
        ctx.beginPath();
        switch (this.facialExpression) {
            case FacialExpressions.SAD:
                ctx.ellipse(1024, 512 + this.height / 5, this.width / 4, 96, 0, Math.PI, 2 * Math.PI);
                break;
            case FacialExpressions.SURPRISED:
                ctx.ellipse(1024, 512 + this.height / 5, this.width / 4, 96, 0, 0, 2 * Math.PI);
            case FacialExpressions.HAPPY:
                ctx.ellipse(1024, 512 + this.height / 5, this.width / 4, 96, 0, 0, Math.PI);
                break;
        }
        ctx.fill(); */
    }
    
    goodbye() {
        this.stopSounds();
        clearInterval(this.renderInterval);
        this.canvas.removeEventListener("mousedown", this.mousedownEventListener);
        this.canvas.removeEventListener("mousemove", this.mousemoveEventListener);
        this.canvas.removeEventListener("mouseup", this.mouseupEventListener);
        this.canvas.removeEventListener("mouseout", this.mouseupEventListener);
    }
}