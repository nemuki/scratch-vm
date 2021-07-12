const formatMessage = require('format-message');
const ArgumentType = require('../../extension-support/argument-type');
const BlockType = require('../../extension-support/block-type');
const Cast = require('../../util/cast');
const log = require('../../util/log');

class Scratch3Roomlatch {
    constructor (runtime) {
        this.runtime = runtime;
        this._result = "";
        this._url    = "";
    }

    getInfo () {
        return {
            id: 'roomlatch',
            name: 'Roomlatch コントロール',
            blocks: [
                {
                    opcode: 'writeLog',
                    blockType: BlockType.COMMAND,
                    text: 'ログ [TEXT]',
                    arguments: {
                        TEXT: {
                            type: ArgumentType.STRING,
                            defaultValue: "Hello Roomba!"
                        }
                    }
                },
                {
                    opcode: 'setUrl',
                    blockType: BlockType.COMMAND,
                    text: '送信先を[URL]に設定',
                    arguments: {
                        URL: {
                            type: ArgumentType.STRING,
                            defaultValue: "localhost"
                        }
                    }
                },
                {
                    opcode: 'goStraight',
                    blockType: BlockType.COMMAND,
                    text: '[SECONDS]秒進む',
                    arguments: {
                        SECONDS: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 1
                        }
                    }
                },
                {
                    opcode: 'turnLeft',
                    blockType: BlockType.COMMAND,
                    text: '[ANGLE]度左に回る',
                    arguments: {
                        ANGLE: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 45
                        }
                    }
                },
                {
                    opcode: 'turnRight',
                    blockType: BlockType.COMMAND,
                    text: '[ANGLE]度右に回る',
                    arguments: {
                        ANGLE: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 45
                        }
                    }
                },
                {
                    opcode: 'returnHome',
                    blockType: BlockType.COMMAND,
                    text: 'ホームに戻る'
                },
                {
                    opcode: 'getResult',
                    blockType: BlockType.REPORTER,
                    text: '結果',
                }
            ],
            menus: {
            }
        };
    }

    writeLog(args) {
        const text = Cast.toString(args.TEXT);
        log.log(text);
    }

    setUrl(args) {
        const url = Cast.toString(args.URL);
        this._url = url;
    }

    getResult() {
        return this._result;
    }

    goStraight(args) {
        const seconds = Cast.toNumber(args.SECONDS);
        const code    = this._url + "gostraight=" + seconds;
        var pr = fetch(code).then(res => res.text()).then(body => this._result = body);
        return pr;
    }

    turnLeft(args) {
        const angle = Cast.toNumber(args.ANGLE);
        const code  = this._url + "turnleft=" + angle;
        var pr = fetch(code).then(res => res.text()).then(body => this._result = body);
        return pr;
    }

    turnRight(args) {
        const angle = Cast.toNumber(args.ANGLE);
        const code  = this._url + "turnright=" + angle;
        var pr = fetch(code).then(res => res.text()).then(body => this._result = body);
        return pr;
    }

    returnHome() {
        const code    = this._url + "gohome";
        var pr = fetch(code).then(res => res.text()).then(body => this._result = body);
        return pr;
    }
}

module.exports = Scratch3Roomlatch;