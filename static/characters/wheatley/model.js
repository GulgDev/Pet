model = {
    backgroundColor: "#000022",
    bodyColor: "#EEEEEE",
    secondaryColor: "#BBBBBB",
    eyeColor: "#4444FF",
    eyeSecondaryColor: "#8888FF",
    eyeTertiaryColor: "#EEEEFF",

    render: function (pet, ctx) {
        ctx.fillStyle = this.secondaryColor;
        ctx.strokeStyle = this.secondaryColor;
        ctx.lineWidth = 20;
        ctx.save();
        ctx.ellipse(1024, 512, pet.width / 2, pet.height / 2, 0, 0, 2 * Math.PI);
        ctx.clip();
        ctx.beginPath();
        ctx.moveTo(1024 - pet.width / 5, 512 - pet.height / 5);
        ctx.lineTo(1024 - pet.width / 2, 512 - pet.height / 2);
        ctx.moveTo(1024 + pet.width / 5, 512 - pet.height / 5);
        ctx.lineTo(1024 + pet.width / 2, 512 - pet.height / 2);
        ctx.stroke();
        ctx.restore();
        ctx.save();
        ctx.beginPath();
        switch (pet.state) {
            case States.ANGRY:
                ctx.rect(1024 - pet.width / 2, 512 - pet.height / 4, pet.width, pet.height / 2);
                ctx.clip();
                break;
            case States.HAPPY:
                ctx.rect(1024 - pet.width / 2, 512 - pet.height / 2, pet.width, pet.height / 2);
                ctx.clip();
                break;
        }
        ctx.beginPath();
        if (pet.state == States.SCREAMING) {
            ctx.ellipse(1024, 512, pet.width / 3, pet.height / 2.25, 0, 0, 2 * Math.PI);
        } else {
            ctx.ellipse(1024, 512, pet.width / 3, pet.height / 3, 0, 0, 2 * Math.PI);
        }
        ctx.fill();
        ctx.restore();
        ctx.save();
        ctx.beginPath();
        switch (pet.state) {
            case States.ANGRY:
                ctx.rect(1024 - pet.width / 2, 512 - pet.height / 5, pet.width, pet.height / 2.5);
                ctx.clip();
                break;
            case States.HAPPY:
                ctx.rect(1024 - pet.width / 2, 512 - pet.height / 3, pet.width, pet.height / 3.5);
                ctx.clip();
                break;
        }
        ctx.fillStyle = this.eyeColor;
        ctx.beginPath();
        if (pet.state == States.SCREAMING) {
            ctx.ellipse(1024, 512, pet.width / 3.5, pet.height / 2.75, 0, 0, 2 * Math.PI);
        } else {
            ctx.ellipse(1024, 512, pet.width / 3.5, pet.height / 3.5, 0, 0, 2 * Math.PI);
        }
        ctx.fill();
        ctx.fillStyle = this.eyeSecondaryColor;
        ctx.beginPath();
        ctx.ellipse(1024, 512, pet.width / 6, pet.height / 6, 0, 0, 2 * Math.PI);
        ctx.fill();
        ctx.fillStyle = this.eyeTertiaryColor;
        ctx.beginPath();
        ctx.ellipse(1024, 512, pet.width / 8, pet.height / 8, 0, 0, 2 * Math.PI);
        ctx.fill();
        ctx.restore();
    }
}