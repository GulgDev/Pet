model = {
    backgroundColor: "#FFFFFF",
    bodyColor: "#777777",
    secondaryColor: "#444444",
    eyeColor: "#FFFFFF",
    eyeSecondaryColor: "#44AA44",
    mouthColor: "#FF4444",
    mouthSecondaryColor: "#FF8888",

    render: function (pet, ctx) {
        ctx.save();
        ctx.beginPath();
        switch (pet.state) {
            case States.ANGRY:
                ctx.rect(1024 - pet.width / 3, 512 - pet.height / 4, pet.width, pet.height / 20);
                ctx.clip();
                break;
            case States.HAPPY:
                ctx.rect(1024 - pet.width / 3, 512 - pet.height / 4.5, pet.width, pet.height / 15);
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
        ctx.lineWidth = 10;
        ctx.beginPath();
        ctx.moveTo(1024, 512 + pet.height / 5);
        ctx.lineTo(1024, 512);
        ctx.stroke();
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
            ctx.moveTo(1024 - pet.width / 4, 512 + pet.height / 5);
            ctx.lineTo(1024 + pet.width / 4, 512 + pet.height / 5);
            ctx.stroke();
        } else {
            ctx.ellipse(1024, 512 + pet.height / 5, pet.width / 4, pet.height / 8, 0, 0, 2 * Math.PI);
            ctx.fill();
        }
        ctx.restore();
        ctx.fillStyle = this.mouthSecondaryColor;
        ctx.beginPath();
        ctx.ellipse(1024, 512, pet.width / 12, pet.height / 18, 0, 0, 2 * Math.PI);
        ctx.fill();
        ctx.save();
        ctx.globalCompositeOperation = "destination-over";
        ctx.beginPath();
        ctx.rect(1024 - pet.width / 2.5, 512 - pet.height / 2.5, pet.width / 1.25, pet.height / 2.25);
        ctx.fill();
        ctx.fillStyle = this.secondaryColor;
        ctx.beginPath();
        ctx.rect(1024 - pet.width / 2.25, 512 - pet.height / 2.25, pet.width / 1.125, pet.height / 2.25);
        ctx.fill();
        ctx.globalCompositeOperation = "source-over";
        ctx.restore();
    }
}