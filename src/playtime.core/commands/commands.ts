/*
setLocation(x: number, y: number) 
setScale(scale: number) 
changeX(deltaX: number)
changeY(deltaX: number)
move(steps: number)
turn(angle: number)
show()
setAngle(angle: number) 
hide()
glideToPointAngle(x: number, y: number, duration: number, angle: number)      
say(width: number, height: number, quote: string, timeToDisplay: number)
*/

export enum SceneCommandType
{
    setLocation,
    setScale,
    changeX,
    changeY,
    move,
    turn,
    show,
    setAngle,
    hide,
    glideToPointAngle,
    say
}

export interface ISceneCommand
{
    target: any;
    type: SceneCommandType;
    timeSpan: number;  
    args: any  
}

export class SceneCommand implements ISceneCommand
{
    constructor
    (
        public target: any,
        public type: SceneCommandType,
        public timeSpan: number,
        public args: any
    )
    {
    }
}

