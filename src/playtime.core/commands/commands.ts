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

*/

export interface ISceneCommand
{
    someMethod: any;
    timeSpan: number;  
    args: any;
    instance: any
}

export class SceneCommand implements ISceneCommand
{    
    constructor
    (
        public instance: any,
        public someMethod: any,        
        public timeSpan: number,
        public args: Array<any>,        
    )
    {
    }
}

