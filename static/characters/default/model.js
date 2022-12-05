model = {
    backgroundColor: "#FFFFFF",
    bodyColor: "#EEEE00",
    eyeColor: "#FFFFFF",
    eyeSecondaryColor: "#000000",
    mouthColor: "#FF2222",

    render: function (pet, ctx) {
        ctx.save();
        ctx.beginPath();
        switch (pet.state) {
            case States.ANGRY:
                ctx.rect(1024 - pet.width / 3, 512 - pet.height / 5, pet.width, pet.height / 10);
                ctx.clip();
                break;
            case States.HAPPY:
                ctx.rect(1024 - pet.width / 3, 512 - pet.height / 2, pet.width, pet.height / 3);
                ctx.clip();
                break;
        }
        ctx.fillStyle = this.eyeColor;
        ctx.beginPath();
        ctx.ellipse(1024 - pet.width / 5, 512 - pet.height / 5, pet.width / 8, pet.height / 10, 0, 0, 2 * Math.PI);
        ctx.ellipse(1024 + pet.width / 5, 512 - pet.height / 5, pet.width / 8, pet.height / 10, 0, 0, 2 * Math.PI);
        ctx.fill();
        ctx.fillStyle = this.eyeSecondaryColor;
        ctx.beginPath();
        ctx.ellipse(1024 - pet.width / 5, 512 - pet.height / 5, pet.width / 18, pet.height / 18, 0, 0, 2 * Math.PI);
        ctx.ellipse(1024 + pet.width / 5, 512 - pet.height / 5, pet.width / 18, pet.height / 18, 0, 0, 2 * Math.PI);
        ctx.fill();
        ctx.fillStyle = this.eyeSecondaryColor;
        ctx.beginPath();
        ctx.ellipse(1024 - pet.width / 5, 512 - pet.height / 5, pet.width / 18, pet.height / 18, 0, 0, 2 * Math.PI);
        ctx.ellipse(1024 + pet.width / 5, 512 - pet.height / 5, pet.width / 18, pet.height / 18, 0, 0, 2 * Math.PI);
        ctx.fill();
        ctx.restore();
        ctx.save();
        ctx.fillStyle = this.mouthColor;
        ctx.strokeStyle = this.mouthColor;
        ctx.beginPath();
        switch (pet.state) {
            case States.ANGRY:
                ctx.rect(1024 - pet.width / 4, 512 + pet.height / 13, pet.width / 2, pet.height / 8);
                ctx.clip();
                break;
            case States.HAPPY:
                ctx.rect(1024 - pet.width / 4, 512 + pet.height / 5, pet.width / 2, pet.height / 8);
                ctx.clip();
                break;
        }
        ctx.beginPath();
        if (pet.state == States.NORMAL) {
            ctx.lineWidth = 10;
            ctx.moveTo(1024 - pet.width / 4, 512 + pet.height / 5);
            ctx.lineTo(1024 + pet.width / 4, 512 + pet.height / 5);
            ctx.stroke();
        } else {
            ctx.ellipse(1024, 512 + pet.height / 5, pet.width / 4, pet.height / 8, 0, 0, 2 * Math.PI);
            ctx.fill();
        }
        ctx.restore();
    }
}