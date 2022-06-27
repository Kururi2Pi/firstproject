input.onButtonPressed(Button.A, function () {
    if (isRunning) {
        isRunning = 0
    } else {
        isRunning = 1
    }
})
// driveMode
// 0: 停止
// 1: 前進
// 2: 後進
// 11: 左前進
// 12: 右前進
// 13: 前進中速
// 21: 左後進
// 22: 右後進
// 23: 中速後進
function motorDrive (driveMode: number) {
    MaxSpeed = 130
    MiddleSpeed = 100
    CurveSpeed = MiddleSpeed - 20
    if (driveMode == 1) {
        maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, MaxSpeed)
        maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, MaxSpeed)
        basic.showArrow(ArrowNames.North)
    } else if (driveMode == 2) {
        maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CCW, MaxSpeed)
        maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CCW, MaxSpeed)
        basic.showArrow(ArrowNames.South)
    } else if (driveMode == 11) {
        maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, CurveSpeed)
        maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, MaxSpeed)
        basic.showArrow(ArrowNames.NorthEast)
    } else if (driveMode == 12) {
        maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, MaxSpeed)
        maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, CurveSpeed)
        basic.showArrow(ArrowNames.NorthWest)
    } else if (driveMode == 21) {
        maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CCW, MiddleSpeed)
        maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CCW, MaxSpeed)
        basic.showArrow(ArrowNames.SouthEast)
    } else if (driveMode == 22) {
        maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CCW, MaxSpeed)
        maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CCW, CurveSpeed)
        basic.showArrow(ArrowNames.SouthWest)
    } else if (driveMode == 13) {
        maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, MiddleSpeed)
        maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, MiddleSpeed)
        basic.showLeds(`
            # . . . #
            # # . # #
            # . # . #
            # . . . #
            # . . . #
            `)
    } else if (driveMode == 23) {
        maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CCW, MiddleSpeed)
        maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CCW, MiddleSpeed)
        basic.showLeds(`
            # . . . #
            # # . # #
            # . # . #
            # . . . #
            # . . . #
            `)
    } else {
        maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, 0)
        maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, 0)
        basic.showIcon(IconNames.EigthNote)
    }
}
let length_cm = 0
let CurveSpeed = 0
let MiddleSpeed = 0
let MaxSpeed = 0
let isRunning = 0
music.playSoundEffect(music.createSoundEffect(WaveShape.Sawtooth, 5000, 0, 255, 0, 500, SoundExpressionEffect.None, InterpolationCurve.Linear), SoundExpressionPlayMode.UntilDone)
isRunning = 0
basic.forever(function () {
    length_cm = maqueen.Ultrasonic(PingUnit.Centimeters)
    if (isRunning) {
        if (length_cm <= 10) {
            motorDrive(0)
        } else if (length_cm <= 20) {
            motorDrive(13)
        } else {
            motorDrive(1)
        }
    } else {
        motorDrive(0)
    }
})
