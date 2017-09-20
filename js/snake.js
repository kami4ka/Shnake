export default class Snake {
    constructor(tileCount, miner) {
        this.xHead = 10;
        this.yHead = 10;
        this.xVelosity = 1;
        this.yVelosity = 0;
        this.trail = [];
        this.tail = 4;
        this.foodInside = 0;
        this.tileCount = tileCount;
        this.miner = miner;
        this.hashes = miner.getTotalHashes();
        this.tailColors = ['green', 'white', 'blue', 'lime', 'chocolate', 'DeepPink', 'PaleVioletRed', 'SeaShell'];
        this.tailColor = this.tailColors[3];
    }

    update() {
        if (this.foodInside > 0) {
            this.tailColor = this.tailColors[Math.floor(Math.random() * this.tailColors.length)];
        } else {
            this.tailColor = 'lime';
        }

        const totalHashes = this.miner.getTotalHashes();
        console.log('Total:' + totalHashes);
        console.log('Hashes:' + this.hashes);
        console.log('Inside:' + this.foodInside);
        if (totalHashes > this.hashes + this.foodInside) {
            this.foodInside = 0;
            this.hashes = totalHashes;
            this.miner.stop();
        }

        this.trail.push({ x: this.xHead, y: this.yHead});

        this.xHead += this.xVelosity;
        this.yHead += this.yVelosity;

        if (this.xHead < 0) {
            this.xHead = this.tileCount - 1;
        }
        if (this.xHead > this.tileCount - 1) {
            this.xHead = 0;
        }
        if (this.yHead < 0) {
            this.yHead = this.tileCount - 1;
        }
        if (this.yHead > this.tileCount - 1) {
            this.yHead = 0;
        }

        while (this.trail.length > this.tail) {
            this.trail.shift();
        }
    }

    updateDirection(evt) {
        switch(evt.keyCode) {
            case 37:
                if (this.xVelosity !== 1) {
                    this.xVelosity = -1;
                    this.yVelosity = 0;
                }
                break;
            case 38:
                if (this.yVelosity !== 1) {
                    this.xVelosity = 0;
                    this.yVelosity = -1;
                }
                break;
            case 39:
                if (this.xVelosity !== -1) {
                    this.xVelosity = 1;
                    this.yVelosity = 0;
                }
                break;
            case 40:
                if (this.yVelosity !== -1) {
                    this.xVelosity = 0;
                    this.yVelosity = 1;
                }
                break;
        }
    }
}